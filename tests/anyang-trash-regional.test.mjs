import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const path = '/쓰레기집청소/경기도-안양시/';
const record = JSON.parse(readFileSync(new URL('../src/lib/regional-pages.json', import.meta.url), 'utf8'))
  .find(p => p.service === '쓰레기집청소' && p.region === '경기도-안양시');

async function page() {
  const res = await fetch(base + encodeURI(path));
  assert.equal(res.status, 200);
  return new JSDOM(await res.text()).window.document;
}

test('Anyang trash-house page shows the recorded field case with its own photos and limits', async () => {
  const doc = await page();
  const cases = doc.querySelector('#cases');
  assert.ok(cases);
  const text = cases.textContent;
  for (const fact of ['만안구', '다세대주택', '4명 · 8시간', '도배 교체']) assert.ok(text.includes(fact), fact);
  const images = [...cases.querySelectorAll('img')].map(img => img.getAttribute('alt'));
  assert.equal(images.length, record.media.length);
  assert.ok(images.every(Boolean));
  for (const media of record.media) assert.equal((await fetch(base + media.src)).status, 200, media.src);
  assert.equal(doc.querySelector('#local').querySelectorAll('img').length, 0);
  for (const link of doc.querySelectorAll('nav[aria-label="목차"] a')) {
    const section = doc.querySelector(link.hash);
    assert.ok(section, link.hash);
    assert.ok(section.querySelector('[data-back-to-contents]'), link.hash);
  }
  assert.ok(cases.querySelector('a[href="/쓰레기집청소/"]'));
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr' + encodeURI(path));
});

test('Anyang trash-house FAQ matches structured data and the page is discoverable', async () => {
  const doc = await page();
  const data = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
  const faq = data.find(item => item['@type'] === 'FAQPage');
  const visible = [...doc.querySelectorAll('#faq details')].map(el => [el.querySelector('summary').textContent, el.querySelector('p').textContent]);
  assert.deepEqual(faq.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), visible);
  for (const [question] of record.faq) assert.ok(visible.some(([q]) => q === question), question);
  assert.ok(data.find(item => item['@type'] === 'Service'));
  assert.ok(data.find(item => item['@type'] === 'BreadcrumbList'));
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.ok(sitemap.includes('https://www.cheongso.co.kr' + encodeURI(path)) || sitemap.includes('https://www.cheongso.co.kr' + path));
  const parent = new JSDOM(await (await fetch(base + encodeURI('/쓰레기집청소/'))).text()).window.document;
  assert.ok(parent.querySelector(`a[href="${path}"]`));
});
