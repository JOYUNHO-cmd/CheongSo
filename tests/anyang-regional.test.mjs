import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const path = '/바닥-왁스-코팅/경기도-안양시/';
async function page() {
  const res = await fetch('http://127.0.0.1:3101' + encodeURI(path));
  assert.equal(res.status, 200);
  return new JSDOM(await res.text()).window.document;
}
test('Anyang evidence includes five attributed local pairs and working section navigation', async () => {
  const doc = await page();
  assert.equal(doc.querySelectorAll('#cases article').length, 5);
  assert.equal(doc.querySelector('#cases article').getAttribute('data-case'), 'floor-wax-g28');
  for (const id of ['27', '28', '29', '30', '31']) {
    const card = doc.querySelector(`#cases [data-case="floor-wax-g${id}"]`);
    assert.ok(card);
    assert.equal(card.querySelectorAll('img').length, 2);
    assert.ok(card.querySelector(`a[href*="item=floor-wax-g${id}"]`));
  }
  for (const link of doc.querySelectorAll('nav[aria-label="목차"] a')) {
    const section = doc.querySelector(link.hash);
    assert.ok(section);
    assert.ok(section.querySelector('[data-back-to-contents]'));
  }
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr'+encodeURI(path));
});
test('Anyang price questions use the same answers in visible FAQ and structured data', async () => {
  const doc = await page();
  const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap(el => JSON.parse(el.textContent)).find(item => item['@type'] === 'FAQPage');
  const visible = [...doc.querySelectorAll('#faq details')].map(el => [el.querySelector('summary').textContent, el.querySelector('p').textContent]);
  assert.ok(visible.length >= 5);
  assert.deepEqual(schema.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), visible);
  assert.ok(doc.querySelector('#estimate [data-regional-estimate]'));
  assert.ok(doc.title.includes('비용'));
});
