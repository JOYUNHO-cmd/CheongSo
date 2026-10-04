import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
const cases = [
  {
    path: '/바닥-왁스-코팅/경기도-성남시-분당구/',
    h1: '분당 바닥왁스코팅, 데코타일 사무실 실제 사례',
    area: '경기도 성남시 분당구',
    marker: '6명 · 9시간',
    imageAlt: '분당',
  },
  {
    path: '/바닥-왁스-코팅/경기도-성남시/',
    h1: '성남 바닥왁스코팅, 100평 지식산업센터 퇴거청소 사례',
    area: '경기도 성남시',
    marker: '3명 · 8시간',
    imageAlt: '성남',
  },
  {
    path: '/바닥-왁스-코팅/경기도-성남시-판교/',
    h1: '판교 바닥왁스코팅, 돌타일처럼 보이는 데코타일 사례',
    area: '경기도 성남시 판교',
    marker: '3명 · 6시간',
    imageAlt: '판교',
  },
  {
    path: '/바닥-왁스-코팅/경기도-과천시/',
    h1: '과천 바닥왁스코팅, 지식산업센터 바닥 페인트 제거 사례',
    area: '경기도 과천시',
    marker: '3명 · 7시간',
    imageAlt: '과천',
  },
];

for (const page of cases) {
  test(`${page.imageAlt} wax page preserves the confirmed case, photos, FAQ and schema`, async () => {
    const response = await fetch(base + encodeURI(page.path));
    assert.equal(response.status, 200);
    const doc = new JSDOM(await response.text()).window.document;
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelector('h1').textContent, page.h1);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://www.cheongso.co.kr' + encodeURI(page.path));
    assert.ok(doc.body.textContent.includes(page.marker));
    assert.doesNotMatch(doc.body.textContent, /대표님이|대표님은|대표가 확인|대표가 기록/);
    assert.equal(doc.querySelectorAll('[data-regional-wax-case] figure').length, 6);
    assert.equal(doc.querySelectorAll(`[data-regional-wax-case] img[alt*="${page.imageAlt}"]`).length, 12);
    const adhesiveLink = doc.querySelector('#related a[href="/바닥-본드-제거/"]');
    assert.ok(adhesiveLink, 'related adhesive removal uses its published URL');
    assert.equal(doc.querySelector('#related a[href="/바닥본드제거/"]'), null);
    assert.equal((await fetch(base + encodeURI(adhesiveLink.getAttribute('href')))).status, 200);

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
