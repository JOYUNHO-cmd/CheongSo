import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
test('mobile offers three discovery links without duplicating its consultation actions', async () => {
  const doc = new JSDOM(await (await fetch(base)).text()).window.document;
  for (const label of ['주요 안내', '모바일 주요 안내']) {
    const nav = doc.querySelector(`nav[aria-label="${label}"]`);
    assert.ok(nav, label);
    assert.deepEqual([...nav.querySelectorAll('a')].map(a => a.getAttribute('href')), label === '모바일 주요 안내' ? ['/gallery/', '/areas/', '/about/'] : ['/gallery/', '/areas/', '/pricing/', '/about/', '/contact/']);
  }
  assert.ok(doc.querySelector('#reviews'));
  assert.ok(doc.querySelector('footer a[href="/#reviews"]'));
  assert.equal(doc.querySelectorAll('nav[aria-label="모바일 주요 안내"] a svg[aria-hidden="true"]').length, 3);
  const toggles = doc.querySelectorAll('#mobile-menu-overlay button[aria-expanded="false"]');
  assert.equal(toggles.length, 7);
  for (const toggle of toggles) assert.equal(toggle.querySelectorAll('[data-category-arrows] svg').length, 3);
});

test('region directory links directly to the real Anyang page and is discoverable', async () => {
  const res = await fetch(base + '/areas/');
  assert.equal(res.status, 200);
  const doc = new JSDOM(await res.text()).window.document;
  const links = [...doc.querySelectorAll('a[data-region-card]')];
  assert.deepEqual(links.map(a => a.getAttribute('href')), ['/바닥-왁스-코팅/경기도-안양시/', '/주방청소/경기도-안양시/', '/쓰레기집청소/경기도-안양시/', '/쓰레기집청소/경기도-군포시/', '/바닥-왁스-코팅/경기도-수원시/', '/사무실청소/경기도-수원시-영통구/']);
  for (const link of links) {
    assert.ok(link.querySelector('img[alt]'));
    assert.equal((await fetch(base + encodeURI(link.getAttribute('href')))).status, 200);
  }
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr/areas/');
  assert.ok((await (await fetch(base + '/sitemap.xml')).text()).includes('https://www.cheongso.co.kr/areas/'));
});
