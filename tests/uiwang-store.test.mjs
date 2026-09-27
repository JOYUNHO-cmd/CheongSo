import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const path = '/상가청소/경기도-의왕시/';

test('Uiwang store page exposes the confirmed case, photos, navigation and matching FAQ schema', async () => {
  const response = await fetch(base + encodeURI(path));
  assert.equal(response.status, 200);
  const doc = new JSDOM(await response.text()).window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1').textContent, '의왕 상가청소, 내손동 상가 복원청소 실제 사례');
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr' + encodeURI(path));
  assert.equal(doc.querySelectorAll('[data-uiwang-store-body] figure').length, 6);
  assert.equal(doc.querySelectorAll('[data-uiwang-store-body] img[alt*="의왕 내손동"]').length, 12);
  assert.ok(doc.body.textContent.includes('3명 · 9시간'));

  const items = [...doc.querySelectorAll('#faq details')];
  assert.equal(items.length, 6);
  assert.ok(items.every(item => !item.hasAttribute('open')));
  const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
  assert.deepEqual(
    schema.find(item => item['@type'] === 'FAQPage').mainEntity.map(item => [item.name, item.acceptedAnswer.text]),
    items.map(item => [item.querySelector('summary').textContent, item.querySelector('p').textContent]),
  );
  assert.equal(schema.find(item => item['@type'] === 'Service').areaServed.name, '경기도 의왕시');
  assert.ok(schema.find(item => item['@type'] === 'BreadcrumbList'));

  for (const link of doc.querySelectorAll('nav[aria-label="페이지 목차"] a')) {
    const section = doc.querySelector(link.hash);
    assert.ok(section, link.hash);
    assert.ok(section.querySelector('a[href="#service-toc"]'), link.hash);
  }
  assert.equal((await fetch(base + encodeURI('/상가청소/'))).status, 200);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.ok(sitemap.includes(encodeURI(path)) || sitemap.includes(path));
});
