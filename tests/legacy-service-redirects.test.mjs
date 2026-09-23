import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';
const moves = [
  ['/신축청소/', '/신축준공청소/'],
  ['/준공청소/', '/신축준공청소/'],
  ['/새집증후군-시공/', '/프리미엄청소/'],
];

for (const [source, destination] of moves) {
  test(`${source} permanently redirects to ${destination} and preserves query`, async () => {
    const response = await fetch(base + source + '?utm_source=legacy', { redirect: 'manual' });
    assert.equal(response.status, 308);
    const target = new URL(response.headers.get('location'), base);
    assert.equal(decodeURI(target.pathname), destination);
    assert.equal(target.search, '?utm_source=legacy');
    const page = await fetch(target);
    assert.equal(page.status, 200);
    const document = new JSDOM(await page.text()).window.document;
    assert.equal(decodeURI(document.querySelector('link[rel="canonical"]').href),
      'https://www.cheongso.co.kr' + destination);
  });
}

test('deleted reviews stay 404 instead of redirecting to an unrelated page', async () => {
  assert.equal((await fetch(base + '/reviews/', { redirect: 'manual' })).status, 404);
});
