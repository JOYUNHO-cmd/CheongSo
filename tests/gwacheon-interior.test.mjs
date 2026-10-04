import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const path = '/인테리어청소/경기도-과천시/';

test('Gwacheon interior page exposes the confirmed pub case, photos, navigation and matching FAQ schema', async () => {
  const response = await fetch(base + encodeURI(path));
  assert.equal(response.status, 200);
  const doc = new JSDOM(await response.text()).window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1').textContent, '과천 인테리어청소, 술집 주방·흡연실 실제 사례');
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr' + encodeURI(path));
  assert.equal(doc.querySelectorAll('[data-gwacheon-interior-body] figure').length, 7);
  assert.equal(doc.querySelectorAll('[data-gwacheon-interior-body] img[alt*="과천 술집"]').length, 7);
  assert.equal(doc.body.textContent.includes('사진 크게 보기'), false);
  assert.ok(doc.body.textContent.includes('3명 · 9시간'));
  assert.ok(doc.body.textContent.includes('주방 기름때'));
  assert.ok(doc.body.textContent.includes('흡연실 니코틴'));
  assert.deepEqual([...doc.querySelectorAll('#case [data-service-links] a')].map(link => link.getAttribute('href')), [
    '/주방청소/', '/후드청소/', '/냄새-악취-제거/', '/외창청소/', '/폐기물처리/', '/정기청소/',
  ]);
  assert.ok(doc.body.textContent.includes('실내 구역의 바닥청소'));
  const odorLink = doc.querySelector('#related a[href="/냄새-악취-제거/"]');
  assert.ok(odorLink, 'related odor service uses its published URL');
  assert.equal(doc.querySelector('#related a[href="/냄새악취제거/"]'), null);
  assert.equal((await fetch(base + encodeURI(odorLink.getAttribute('href')))).status, 200);

  const items = [...doc.querySelectorAll('#faq details')];
  assert.equal(items.length, 6);
  assert.ok(items.every(item => !item.hasAttribute('open')));
  const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
  assert.deepEqual(
    schema.find(item => item['@type'] === 'FAQPage').mainEntity.map(item => [item.name, item.acceptedAnswer.text]),
    items.map(item => [item.querySelector('summary').textContent, item.querySelector('p').textContent]),
  );
  assert.equal(schema.find(item => item['@type'] === 'Service').areaServed.name, '경기도 과천시');
  assert.ok(schema.find(item => item['@type'] === 'BreadcrumbList'));

  for (const link of doc.querySelectorAll('nav[aria-label="페이지 목차"] a')) {
    const section = doc.querySelector(link.hash);
    assert.ok(section, link.hash);
    assert.ok(section.querySelector('a[href="#service-toc"]'), link.hash);
  }
  assert.equal((await fetch(base + encodeURI('/인테리어청소/'))).status, 200);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.ok(sitemap.includes(encodeURI(path)) || sitemap.includes(path));
});
