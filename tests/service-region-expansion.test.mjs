import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { JSDOM } from 'jsdom';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';
const origin = 'https://www.cheongso.co.kr';
const source = readFileSync(new URL('../src/lib/service-profiles.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('profiles.ts', source, ts.ScriptTarget.Latest, true);
const rows = ast.statements.filter(ts.isVariableStatement).flatMap(s => s.declarationList.declarations).find(d => d.name.getText(ast) === 'rows').initializer.elements;
const names = [...rows.map(row => row.elements[0].text), '특수청소'];
const overrides = JSON.parse(readFileSync(new URL('../src/lib/service-slugs.json', import.meta.url), 'utf8'));
const priorities = ['화재청소', '특수청소', '침수청소', '쓰레기집청소', '유품정리', '고독사청소', '폐기물처리', '바닥왁스코팅', '바닥청소', '냄새악취제거', '곰팡이제거'];
async function get(path) {
  const response = await fetch(base + encodeURI(path));
  return { response, doc: new JSDOM(await response.text()).window.document };
}
function fields(doc, keyword, path) {
  assert.ok(doc.title.startsWith(keyword), `${path}: title ${doc.title}`);
  assert.equal(doc.querySelectorAll('h1').length, 1, path);
  const h1 = doc.querySelector('h1');
  assert.ok(h1.textContent.startsWith(keyword), `${path}: h1`);
  assert.ok(h1.nextElementSibling.textContent.trim().startsWith(keyword), `${path}: lead`);
  assert.ok(doc.querySelector('meta[name="description"]').content.startsWith(keyword), `${path}: description`);
  assert.equal(decodeURI(doc.querySelector('link[rel="canonical"]').href), origin + path);
}
for (const name of names) test(`서비스 메인 키워드 선두: ${name}`, async () => {
  const path = `/${overrides[name] || name}/`;
  const { response, doc } = await get(path);
  assert.equal(response.status, 200);
  fields(doc, name, path);
});
for (const name of priorities) test(`지역 안내와 하위 페이지 연결: ${name}`, async () => {
  const slug = overrides[name] || name;
  const { response, doc } = await get(`/${slug}/areas/`);
  assert.equal(response.status, 200);
  const links = [...doc.querySelectorAll('main ul a')].map(a => decodeURI(a.getAttribute('href'))).filter(href => href.startsWith(`/${slug}/`));
  assert.ok(links.length >= 286);
  assert.ok(links.every(href => !href.includes(' ')));
  assert.ok(!links.some(href => href.includes('경상북도-군위군')));
  assert.ok(links.includes(`/${slug}/충청북도-청주시/`));
  assert.equal(new Set(links).size, links.length);
  for (const suffix of ['경기도-안양시-평촌', '경기도-군포시-산본', '인천광역시-연수구-송도']) assert.ok(links.includes(`/${slug}/${suffix}/`));
  const path = `/${slug}/경기도-안양시-평촌/`;
  const guide = await get(path);
  assert.equal(guide.response.status, 200);
  fields(guide.doc, `평촌 ${name}`, path);
  assert.match(guide.doc.querySelector('meta[name="robots"]').content, /noindex/);
  assert.ok(guide.doc.querySelector(`a[href="/${slug}/"]`));
  const schemas = [...guide.doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => JSON.parse(script.textContent));
  assert.ok(schemas.some(item => item['@type'] === 'Service' && item.name === `평촌 ${name}`));
  assert.ok(schemas.some(item => item['@type'] === 'BreadcrumbList'));
});
test('기존 지역 사례 우선 및 신규 상담 초안 사이트맵 제외', async () => {
  const { doc } = await get('/바닥-왁스-코팅/경기도-안양시/');
  assert.doesNotMatch(doc.querySelector('meta[name="robots"]')?.content || '', /noindex/);
  assert.ok(doc.querySelectorAll('main img').length > 0);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.ok(decodeURI(sitemap).includes('/특수청소/'));
  assert.ok(decodeURI(sitemap).includes('/화재청소/areas/'));
  assert.ok(!decodeURI(sitemap).includes('/화재청소/경기도-안양시-평촌/'));
});
test('목록 밖 지역과 미지원 서비스 조합은 404', async () => {
  for (const path of ['/화재청소/없는지역/', '/없는서비스/경기도-안양시/', '/주방청소/경기도-안양시-평촌/', '/주방청소/areas/']) {
    assert.equal((await fetch(base + encodeURI(path))).status, 404, path);
  }
});
test('공개한 적 없는 이전 지역 표기와 공백 주소는 중복 페이지를 만들지 않음', async () => {
  for (const from of ['경상북도-군위군', '충청북도-청주시 상당구']) {
    const response = await fetch(base + encodeURI(`/화재청소/${from}/`), { redirect: 'manual' });
    assert.equal(response.status, 404);
  }
});
