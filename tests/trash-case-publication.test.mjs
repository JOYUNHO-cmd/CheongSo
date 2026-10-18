import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';
for (const [region, slug, keyword, hours, count] of [['경기도-안양시-만안구','seoksu','안양 쓰레기집청소','6시간',6],['서울특별시-강서구','hwagok','강서구 쓰레기집청소','8시간',4]]) {
  test(`${region} 사례 정식 발행 및 승인 미리보기 보존`, async () => {
    const path = `/쓰레기집청소/${region}/`;
    const res = await fetch(base + encodeURI(path));
    assert.equal(res.status, 200);
    const doc = new JSDOM(await res.text()).window.document;
    assert.equal(doc.querySelectorAll('h1').length, 1);
    for (const value of [doc.title,doc.querySelector('h1').textContent,doc.querySelector('[data-case-summary]').textContent,doc.querySelector('meta[name=description]').content]) assert.ok(value.startsWith(keyword));
    assert.equal(decodeURI(doc.querySelector('link[rel=canonical]').href), 'https://www.cheongso.co.kr'+path);
    assert.doesNotMatch(doc.querySelector('meta[name=robots]')?.content || '', /noindex/);
    assert.doesNotMatch(doc.querySelector('article').textContent, /검토용 미리보기/);
    assert.match(doc.querySelector('#case').textContent, new RegExp('4명.*'+hours));
    const preview = new JSDOM(await (await fetch(base+`/preview/${slug}-trash/`)).text()).window.document;
    for (const id of ['case','photos','scope','estimate','faq','contact']) assert.equal(doc.querySelector(`#${id}`).textContent,preview.querySelector(`#${id}`).textContent);
    assert.equal(doc.querySelectorAll('article img').length,count);
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>JSON.parse(s.textContent));
    for(const type of ['Service','BreadcrumbList','FAQPage']) assert.ok(schemas.some(s=>s['@type']===type));
    const faq = schemas.find(s=>s['@type']==='FAQPage');
    for(const [i,detail] of [...doc.querySelectorAll('#faq details')].entries()) assert.equal(detail.querySelector('p').textContent,faq.mainEntity[i].acceptedAnswer.text);
    const sitemap = decodeURI(await (await fetch(base+'/sitemap.xml')).text());
    assert.ok(sitemap.includes(path));
    assert.ok(!sitemap.includes('/preview/'));
    const directory = new JSDOM(await (await fetch(base+'/쓰레기집청소/areas/')).text()).window.document;
    assert.ok([...directory.querySelectorAll('a')].some(a=>decodeURI(a.getAttribute('href')||'')===path));
  });
}
test('기존 안양시 4명 8시간 사례를 변경하지 않는다',async()=>{
  const doc=new JSDOM(await(await fetch(base+encodeURI('/쓰레기집청소/경기도-안양시/'))).text()).window.document;
  assert.match(doc.querySelector('main').textContent,/4명.*8시간/);
  assert.ok(doc.querySelector('img[src*="anyang-trash-house"]'));
});
