import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const origin = 'https://www.cheongso.co.kr';
const records = JSON.parse(readFileSync(new URL('../src/lib/regional-pages.json', import.meta.url), 'utf8'))
  .filter(p => p.reviewed && p.fieldCase);

async function load(path) {
  const res = await fetch(base + encodeURI(path));
  assert.equal(res.status, 200, path);
  return new JSDOM(await res.text()).window.document;
}

test('regional field-case pages exist', () => {
  assert.ok(records.length >= 2);
});

for (const record of records) {
  const path = `/${record.service}/${record.region}/`;

  test(`${path} shows its recorded case, own photos and limits, separate from general guidance`, async () => {
    const doc = await load(path);
    const cases = doc.querySelector('#cases');
    assert.ok(cases);
    for (const [, value] of record.fieldCase.facts) assert.ok(cases.textContent.includes(value), value);
    const images = [...cases.querySelectorAll('img')];
    assert.equal(images.length, record.media.length);
    assert.ok(images.every(img => img.getAttribute('alt')));
    for (const media of record.media) assert.equal((await fetch(base + media.src)).status, 200, media.src);
    assert.equal(doc.querySelector('#local').querySelectorAll('img').length, 0);
    for (const link of doc.querySelectorAll('nav[aria-label="목차"] a')) {
      const section = doc.querySelector(link.hash);
      assert.ok(section, link.hash);
      assert.ok(section.querySelector('[data-back-to-contents]'), link.hash);
    }
    assert.ok(cases.querySelector(`a[href="/${record.service}/"]`));
    assert.equal(doc.querySelector('link[rel="canonical"]').href, origin + encodeURI(path));
  });

  test(`${path} FAQ matches structured data and the page is discoverable`, async () => {
    const doc = await load(path);
    const data = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
    const faq = data.find(item => item['@type'] === 'FAQPage');
    const visible = [...doc.querySelectorAll('#faq details')].map(el => [el.querySelector('summary').textContent, el.querySelector('p').textContent]);
    assert.deepEqual(faq.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), visible);
    for (const [question] of record.faq ?? []) assert.ok(visible.some(([q]) => q === question), question);
    assert.ok(data.find(item => item['@type'] === 'Service'));
    assert.ok(data.find(item => item['@type'] === 'BreadcrumbList'));
    const sitemap = await (await fetch(base + '/sitemap.xml')).text();
    assert.ok(sitemap.includes(origin + encodeURI(path)) || sitemap.includes(origin + path));
    const parent = await load(`/${record.service}/`);
    assert.ok(parent.querySelector(`a[href="${path}"]`), 'parent service page links to the regional page');
    const areas = await load('/areas/');
    assert.ok(areas.querySelector(`a[data-region-card][href="${path}"]`), 'areas directory lists the regional page');
  });
}
