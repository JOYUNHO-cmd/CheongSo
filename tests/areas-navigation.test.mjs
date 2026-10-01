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
  assert.deepEqual(links.map(a => a.getAttribute('href')), [
    '/바닥-왁스-코팅/경기도-안양시/',
    '/주방청소/경기도-안양시/',
    '/쓰레기집청소/경기도-안양시/',
    '/신축준공청소/경기도-안양시/',
    '/사무실청소/경기도-안양시/',
    '/곰팡이제거/경기도-안양시/',
    '/침수청소/경기도-안양시/',
    '/바닥-왁스-코팅/경기도-성남시-분당구/',
    '/곰팡이제거/경기도-성남시-분당구/',
    '/화재청소/경기도-성남시-분당구/',
    '/바닥-왁스-코팅/경기도-성남시/',
    '/바닥-왁스-코팅/경기도-성남시-판교/',
    '/바닥-왁스-코팅/경기도-과천시/',
    '/인테리어청소/경기도-과천시/',
    '/상가청소/경기도-의왕시/',
    '/신축준공청소/경기도-의왕시/',
    '/사무실청소/경기도-의왕시/',
    '/바닥-왁스-코팅/경기도-의왕시/',
    '/신축준공청소/경기도-안산시/',
    '/바닥-본드-제거/경기도-안산시/',
    '/쓰레기집청소/경기도-안산시/',
    '/바닥-왁스-코팅/경기도-안산시/',
    '/인테리어청소/경기도-안산시/',
    '/유품정리/경기도-안산시/',
    '/신축준공청소/경기도-군포시/',
    '/쓰레기집청소/경기도-군포시/',
    '/인테리어청소/경기도-군포시/',
    '/바닥-왁스-코팅/경기도-군포시/',
    '/사무실청소/경기도-군포시/',
    '/냄새-악취-제거/경기도-군포시/',
    '/신축준공청소/경기도-수원시/',
    '/바닥-왁스-코팅/경기도-수원시/',
    '/사무실청소/경기도-수원시-영통구/',
    '/인테리어청소/경기도-수원시-영통구/',
    '/고독사청소/경기도-수원시/',
    '/주방청소/경기도-수원시/',
    '/냄새-악취-제거/경기도-수원시/',
    '/신축준공청소/경기도-용인시/',
    '/바닥-본드-제거/경기도-용인시/',
    '/바닥-왁스-코팅/경기도-용인시/',
    '/인테리어청소/경기도-용인시/',
    '/곰팡이제거/경기도-용인시/',
    '/관공서청소/경기도-용인시/',
    '/학교청소/경기도-용인시/',
    '/공장청소/경기도-시흥시/',
    '/인테리어청소/경기도-양주시/',
    '/인테리어청소/경기도-남양주시/',
    '/인테리어청소/경기도-화성시-동탄구/',
    '/고독사청소/경기도-이천시/',
    '/고독사청소/경기도-부천시/',
    '/인테리어청소/경기도-부천시/',
    '/주방청소/경기도-부천시/',
    '/침수청소/경기도-부천시/',
    '/인테리어청소/경기도-의정부시/',
    '/쓰레기집청소/경기도-의정부시/',
    '/주방청소/경기도-의정부시/',
    '/화재청소/경기도-김포시/',
    '/사무실청소/경기도-고양시/',
    '/공장청소/경기도-고양시/',
    '/냄새-악취-제거/경기도-고양시/',
    '/사무실청소/경기도-화성시/',
    '/주방청소/경기도-화성시/',
    '/후드청소/경기도-화성시/',
    '/화재청소/경기도-화성시/',
    '/인테리어청소/경기도-평택시/',
    '/곰팡이제거/경기도-광주시/',
    '/화재청소/인천광역시-검단구/',
    '/쓰레기집청소/인천광역시-검단구/',
    '/화재청소/인천광역시-남동구/',
    '/쓰레기집청소/인천광역시-남동구/',
    '/바닥-왁스-코팅/인천광역시-남동구/',
    '/화재청소/인천광역시-부평구/',
    '/쓰레기집청소/인천광역시-부평구/',
    '/화재청소/인천광역시-미추홀구/',
    '/쓰레기집청소/인천광역시-미추홀구/',
    '/고독사청소/인천광역시-미추홀구/',
    '/바닥-왁스-코팅/인천광역시-미추홀구/',
    '/화재청소/인천광역시-연수구/',
    '/쓰레기집청소/인천광역시-연수구/',
    '/사무실청소/인천광역시-서해구/',
    '/신축준공청소/인천광역시-제물포구/',
    '/주방청소/인천광역시-미추홀구/',
    '/후드청소/인천광역시-연수구/',
    '/침수청소/인천광역시-남동구/',
    '/인테리어청소/서울특별시-서초구/',
    '/고독사청소/서울특별시-도봉구/',
    '/유품정리/서울특별시-용산구/',
    '/바닥-왁스-코팅/서울특별시-서초구/',
    '/바닥-왁스-코팅/서울특별시-송파구/',
    '/바닥-왁스-코팅/서울특별시-구로구/',
    '/바닥-왁스-코팅/서울특별시-강남구/',
    '/바닥-왁스-코팅/서울특별시-동대문구/',
    '/인테리어청소/서울특별시-성동구/',
    '/인테리어청소/서울특별시-강남구/',
    '/인테리어청소/서울특별시-종로구/',
    '/인테리어청소/서울특별시-성북구/',
    '/인테리어청소/서울특별시-은평구/',
    '/인테리어청소/서울특별시-금천구/',
    '/인테리어청소/서울특별시-강동구/',
    '/인테리어청소/서울특별시-용산구/',
    '/행사장청소/서울특별시-송파구/',
    '/사무실청소/서울특별시-강남구/',
    '/사무실청소/서울특별시-서초구/',
    '/사무실청소/서울특별시-종로구/',
    '/사무실청소/서울특별시-용산구/',
    '/인테리어청소/서울특별시-영등포구/',
    '/인테리어청소/서울특별시-동대문구/',
    '/상가청소/서울특별시-서초구/',
    '/신축준공청소/서울특별시-구로구/',
    '/주방청소/서울특별시-서초구/',
    '/주방청소/서울특별시-영등포구/',
    '/후드청소/서울특별시-영등포구/',
    '/침수청소/서울특별시-서초구/',
  ]);
  for (const link of links) {
    assert.ok(link.querySelector('img[alt]'));
    assert.equal((await fetch(base + encodeURI(link.getAttribute('href')))).status, 200);
  }
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr/areas/');
  assert.ok((await (await fetch(base + '/sitemap.xml')).text()).includes('https://www.cheongso.co.kr/areas/'));
});
