import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const base = process.env.SEOKSU_PREVIEW_URL || 'http://127.0.0.1:3104';
test('석수동 테스트 사례는 확인된 기록·사진과 동일한 FAQ를 제공하고 색인에서 제외된다', async () => {
  const res = await fetch(`${base}/preview/seoksu-trash/`);
  assert.equal(res.status, 200);
  const doc = new JSDOM(await res.text()).window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1);
  for (const text of [doc.title, doc.querySelector('h1').textContent, doc.querySelector('[data-case-summary]').textContent, doc.querySelector('article header p:not([data-case-summary])').textContent, doc.querySelector('meta[name="description"]').content]) {
    assert.match(text, /^안양 쓰레기집청소/);
  }
  assert.match(doc.title, /만안구 석수동/);
  for (const text of [doc.querySelector('meta[name="description"]').content, doc.querySelector('article header p:not([data-case-summary])').textContent]) {
    assert.doesNotMatch(text, /4명|6시간/);
    for (const keyword of ['석수동', '안양동', '박달동', '쓰레기집청소비용', '쓰레기집청소견적']) assert.ok(text.includes(keyword));
  }
  assert.match(doc.querySelector('meta[name=robots]').content, /noindex/);
  assert.match(doc.querySelector('main').textContent, /4명이 6시간/);
  assert.match(doc.querySelector('main').textContent, /만안구 석수동/);
  assert.doesNotMatch(doc.querySelector('main').textContent, /사진 크게 보기|대표님이 확인|100%/);
  const images = [...doc.querySelectorAll('article img')];
  assert.equal(images.length, 6);
  assert.equal(new Set(images.map(i => i.src)).size, 6);
  for (const img of images) {
    assert.match(img.alt, /석수동 쓰레기집청소/);
    assert.equal((await fetch(base + img.getAttribute('src'))).status, 200);
  }
  const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)).find(s => s['@type'] === 'FAQPage');
  const details = [...doc.querySelectorAll('#faq details')];
  assert.equal(details.length, 4);
  for (const [i, detail] of details.entries()) {
    assert.equal(detail.querySelector('p').textContent, schema.mainEntity[i].acceptedAnswer.text);
    assert.equal(detail.hasAttribute('open'), false);
  }
  for (const a of doc.querySelectorAll('article a[href^="#"]')) assert.ok(doc.querySelector(a.getAttribute('href')));
  assert.ok(!(await (await fetch(`${base}/sitemap.xml`)).text()).includes('/preview/seoksu-trash/'));
});
