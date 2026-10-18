import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const base = process.env.SEOKSU_PREVIEW_URL || 'http://127.0.0.1:3104';
test('화곡동 미리보기의 사실·사진·FAQ·탐색·색인 제외 검증', async () => {
  const res = await fetch(`${base}/preview/hwagok-trash/`);
  assert.equal(res.status, 200);
  const doc = new JSDOM(await res.text()).window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1);
  for (const value of [doc.title, doc.querySelector('h1').textContent, doc.querySelector('[data-case-summary]').textContent, doc.querySelector('meta[name=description]').content]) assert.match(value, /^강서구 쓰레기집청소/);
  const description = doc.querySelector('meta[name=description]').content;
  assert.doesNotMatch(description, /4명|8시간|8평/);
  for (const keyword of ['화곡동', '등촌동', '가양동', '쓰레기집청소비용', '쓰레기집청소견적']) assert.ok(description.includes(keyword));
  assert.match(doc.querySelector('article').textContent, /4명이 8시간/);
  assert.match(doc.querySelector('article').textContent, /악취가 있었고, 청소 동선에도 조금 불편함/);
  assert.doesNotMatch(doc.querySelector('article').textContent, /사진 크게 보기|대표님이 확인|100%/);
  assert.match(doc.querySelector('meta[name=robots]').content, /noindex/);
  const images = [...doc.querySelectorAll('article img')];
  assert.equal(images.length, 4);
  assert.equal(new Set(images.map(i => i.src)).size, 4);
  for (const img of images) {
    assert.match(img.alt, /화곡동 쓰레기집청소/);
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
  for (const href of new Set([...doc.querySelectorAll('article a[href^="/"]')].map(a => a.getAttribute('href')))) assert.equal((await fetch(base + href)).status, 200, href);
  assert.ok(!(await (await fetch(`${base}/sitemap.xml`)).text()).includes('/preview/hwagok-trash/'));
});
