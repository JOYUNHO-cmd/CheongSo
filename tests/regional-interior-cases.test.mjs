import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const cases = [
  {
    path: '/인테리어청소/경기도-양주시/',
    h1: '양주 인테리어청소, 레드랩 댄스스튜디오 실제 사례',
    area: '경기도 양주시', marker: '4명 · 8시간', imageAlt: '양주',
    fact: '사다리의 바닥 접촉 부분에 장갑을 여러 겹 끼워',
    figures: 6,
  },
  {
    path: '/인테리어청소/경기도-남양주시/',
    h1: '화도읍 인테리어청소, 카페 실제 사례',
    area: '경기도 남양주시', marker: '3명 · 9시간', imageAlt: '화도읍',
    fact: '옥상 청소도 진행했습니다',
    figures: 6,
  },
  {
    path: '/인테리어청소/서울특별시-서초구/',
    h1: '서초 인테리어청소, 스튜디오 실제 사례',
    area: '서울특별시 서초구', marker: '4명 · 8시간', imageAlt: '서초',
    fact: '짐을 옮겨가며 진행해야 해서',
    figures: 6,
  },
  {
    path: '/인테리어청소/경기도-화성시-동탄구/',
    h1: '동탄 인테리어청소, BAR 실제 사례',
    area: '경기도 화성시 동탄구', marker: '3명 · 8시간', imageAlt: '동탄',
    fact: '폐기물 처리로 마무리했습니다',
    figures: 9,
  },
];

for (const page of cases) {
  test(`${page.imageAlt} interior page preserves the confirmed case, photos, FAQ and schema`, async () => {
    const response = await fetch(base + encodeURI(page.path));
    assert.equal(response.status, 200);
    const doc = new JSDOM(await response.text()).window.document;
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelector('h1').textContent, page.h1);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr' + encodeURI(page.path));
    assert.ok(doc.body.textContent.includes(page.marker));
    assert.ok(doc.body.textContent.includes(page.fact));
    assert.equal(doc.querySelectorAll('[data-regional-interior-body] figure').length, page.figures);
    assert.equal(doc.querySelectorAll('#case figure').length, 3);
    assert.equal(doc.querySelectorAll(`[data-regional-interior-body] img[alt*="${page.imageAlt}"]`).length, page.figures * 2);
    assert.equal(new Set([...doc.querySelectorAll('#photos img, #case img')].map(img => img.getAttribute('src'))).size, page.figures);

    const faqItems = [...doc.querySelectorAll('#faq details')];
    assert.equal(faqItems.length, 6);
    assert.ok(faqItems.every(item => !item.hasAttribute('open')));
    const schema = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
    assert.deepEqual(
      schema.find(item => item['@type'] === 'FAQPage').mainEntity.map(item => [item.name, item.acceptedAnswer.text]),
      faqItems.map(item => [item.querySelector('summary').textContent, item.querySelector('p').textContent]),
    );
    assert.equal(schema.find(item => item['@type'] === 'Service').areaServed.name, page.area);
    assert.ok(schema.find(item => item['@type'] === 'BreadcrumbList'));

    for (const link of doc.querySelectorAll('nav[aria-label="페이지 목차"] a')) {
      const section = doc.querySelector(link.hash);
      assert.ok(section, link.hash);
      assert.ok(section.querySelector('a[href="#service-toc"]'), link.hash);
    }
    const sitemap = await (await fetch(base + '/sitemap.xml')).text();
    assert.ok(sitemap.includes(encodeURI(page.path)) || sitemap.includes(page.path));
  });
}
