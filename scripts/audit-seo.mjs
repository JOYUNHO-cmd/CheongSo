import { JSDOM } from 'jsdom';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

// Fetch raw HTML: no JS execution, no form submissions, no external resource loading.
const base = process.argv[2] || 'http://localhost:3000';
const output = process.argv[3] || '.qa/seo-audit.json';
const expectedOrigin = 'https://www.cheongso.co.kr';
const staticPages = new Set(['/', '/about/', '/contact/', '/pricing/', '/services/', '/reviews/']);
const get = async (path, options = {}) => {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000), ...options });
  return { status: response.status, url: response.url, headers: Object.fromEntries(response.headers), text: await response.text() };
};
const sitemap = await get('/sitemap.xml');
if (sitemap.status !== 200) throw new Error(`sitemap: ${sitemap.status}`);
const xml = new JSDOM(sitemap.text, { contentType: 'text/xml' });
const urls = [...xml.window.document.querySelectorAll('loc')].map(el => el.textContent);
const report = { base, checkedAt: new Date().toISOString(), pages: [], errors: [], robots: (await get('/robots.txt')).text };
if (new Set(urls).size !== urls.length) report.errors.push('Duplicate sitemap URLs');
const normalize = text => (text || '').replace(/\s+/g, '').normalize('NFC');
const flatten = data => Array.isArray(data) ? data.flatMap(flatten) : data?.['@graph'] ? flatten(data['@graph']) : [data];
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(urls.slice(i, i + 4).map(async url => {
    const path = new URL(url).pathname;
    const r = await get(path);
    const dom = new JSDOM(r.text, { url: new URL(path, base).href });
    const doc = dom.window.document;
    const errors = [];
    const meta = selector => doc.querySelector(selector)?.getAttribute('content') || '';
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
      try { return flatten(JSON.parse(el.textContent)); } catch { errors.push('Invalid JSON-LD'); return []; }
    });
    const faq = schemas.filter(s => s?.['@type'] === 'FAQPage').flatMap(s => s.mainEntity);
    const service = schemas.find(s => s?.['@type'] === 'Service');
    const breadcrumbs = schemas.find(s => s?.['@type'] === 'BreadcrumbList');
    doc.querySelectorAll('script,style').forEach(el => el.remove());
    const body = normalize(doc.body.textContent);
    if (r.status !== 200) errors.push(`HTTP ${r.status}`);
    if (new URL(url).origin !== expectedOrigin) errors.push('Sitemap origin differs from live destination');
    if (!canonical || decodeURI(canonical) !== decodeURI(expectedOrigin + path)) errors.push('Canonical differs from live destination');
    if (doc.querySelectorAll('h1').length !== 1) errors.push('H1 count is not 1');
    if (!doc.title) errors.push('Missing title');
    if (!meta('meta[name="description"]')) errors.push('Missing description');
    if (!meta('meta[property="og:image"]')) errors.push('Missing og:image');
    if (meta('meta[name="twitter:title"]') !== doc.title) errors.push('Twitter title differs from page');
    if (!meta('meta[name="twitter:image"]')) errors.push('Missing twitter:image');
    if (!staticPages.has(path) && (!service || !breadcrumbs)) errors.push('Service or breadcrumb schema missing');
    if (doc.querySelectorAll('img:not([alt])').length) errors.push('Image alt attribute missing');
    if (service && decodeURI(service.url || '') !== decodeURI(expectedOrigin + path)) errors.push('Service schema URL differs from canonical');
    if (breadcrumbs && decodeURI(breadcrumbs.itemListElement?.at(-1)?.item || '') !== decodeURI(expectedOrigin + path)) errors.push('Breadcrumb destination differs from canonical');
    if (/noindex/i.test(meta('meta[name="robots"]') + (r.headers['x-robots-tag'] || ''))) errors.push('Published page is noindex');
    const absentAnswers = faq.filter(qa => !body.includes(normalize(qa.acceptedAnswer?.text)));
    if (absentAnswers.length) errors.push(`${absentAnswers.length} schema FAQ answers absent from HTML`);
    const missingAssets = [...doc.querySelectorAll('img[src],video[poster],source[src]')].flatMap(el => {
      const src = el.getAttribute('src') || el.getAttribute('poster');
      if (!src?.startsWith('/') || src.startsWith('/_next/')) return [];
      return existsSync(resolve('public', '.' + decodeURI(src.split('?')[0]))) ? [] : [src];
    });
    if (missingAssets.length) errors.push(`Missing local assets: ${[...new Set(missingAssets)].join(', ')}`);
    const brokenAnchors = [...doc.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).filter(id => id && !doc.getElementById(decodeURI(id)));
    if (brokenAnchors.length) errors.push(`Broken anchors: ${[...new Set(brokenAnchors)].join(', ')}`);
    const localBusiness = schemas.find(s => s?.['@type'] === 'LocalBusiness');
    if (localBusiness && !localBusiness.address) errors.push('LocalBusiness has no address');
    if (path === '/pricing/' && doc.querySelectorAll('article').length !== 7) errors.push('Not all 7 pricing categories in HTML');
    const links = [...new Set([...doc.querySelectorAll('a[href]')].map(a => new URL(a.href)).filter(u => u.origin === new URL(base).origin && !u.pathname.includes('.')).map(u => u.pathname.endsWith('/') ? u.pathname : u.pathname + '/'))];
    report.pages.push({ path: decodeURI(path), status: r.status, title: doc.title, description: meta('meta[name="description"]'), canonical, schemaTypes: schemas.map(s => s?.['@type']), faqCount: faq.length, absentAnswers: absentAnswers.length, htmlBytes: Buffer.byteLength(r.text), links, errors });
    dom.window.close();
  }));
}
const paths = new Set(urls.map(url => new URL(url).pathname));
for (const field of ['title', 'description']) {
  const values = report.pages.map(page => page[field]);
  const duplicates = [...new Set(values.filter((value,index) => values.indexOf(value) !== index))];
  if (duplicates.length) report.errors.push(`Duplicate ${field}: ${duplicates.join(', ')}`);
}
const extraLinks = [...new Set(report.pages.flatMap(p => p.links))].filter(path => !paths.has(path));
for (const path of extraLinks) { const r = await get(path); if (r.status !== 200) report.errors.push(`Internal link ${path}: ${r.status}`); }
for (const path of ['/없는서비스/', '/바닥-왁스-코팅/없는지역/', '/바닥-왁스-코팅/서울특별시-강남구/']) {
  const r = await get(path);
  if (r.status !== 404) report.errors.push(`Unpublished route ${path}: ${r.status}`);
}
report.pages.sort((a,b) => a.path.localeCompare(b.path));
report.summary = { pages: report.pages.length, pagesWithErrors: report.pages.filter(p => p.errors.length).length, errors: report.errors, issueCounts: {} };
for (const page of report.pages) for (const error of page.errors) report.summary.issueCounts[error] = (report.summary.issueCounts[error] || 0) + 1;
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.summary, null, 2));
if (process.argv.includes('--strict') && (report.summary.pagesWithErrors || report.errors.length)) process.exitCode = 1;
