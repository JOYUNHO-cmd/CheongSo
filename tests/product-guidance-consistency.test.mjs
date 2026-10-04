import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';

async function load(path) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  return new JSDOM(await response.text()).window.document;
}

test('home product safety answer matches its schema and explains product-specific use conditions', async () => {
  const doc = await load('/');
  const answer = [...doc.querySelectorAll('[data-faq-category] details')]
    .find(item => item.querySelector('summary').textContent.includes('사용하는 세제나 약품이 안전한가요?'))
    ?.querySelector('p').textContent;
  assert.ok(answer, 'the safety answer is available in the initial HTML');
  assert.match(answer, /제품별 사용 조건/);
  assert.match(answer, /환기·건조·사용 재개/);
  assert.match(answer, /아이와 반려동물/);
  assert.doesNotMatch(answer, /무해|인증 제품만|인증 약품만/);
  const faq = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap(item => JSON.parse(item.textContent))
    .find(item => item['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.find(item => item.name === '사용하는 세제나 약품이 안전한가요?').acceptedAnswer.text, answer);
});

test('pricing product guidance does not contradict conditional safety guidance', async () => {
  const doc = await load('/pricing/');
  const hygiene = doc.querySelector('[data-pricing-category][id="hygiene"]');
  assert.ok(hygiene, 'all pricing category content is available in the initial HTML');
  assert.match(hygiene.textContent, /제품 사용 조건 확인/);
  assert.match(hygiene.textContent, /환기·건조·사용 재개/);
  assert.doesNotMatch(hygiene.textContent, /인체에 무해|반려동물에게 안전|인증 약품만/);
  assert.match(hygiene.textContent, /코팅의 포함 여부와 작업 범위는 견적 시 확인/);
  const special = doc.querySelector('[data-pricing-category][id="special"]');
  assert.doesNotMatch(special.textContent, /완벽하게 정상화|100% 비밀 보장|오존 중화 탈취/);
  assert.match(special.textContent, /출입·환기·사용 재개/);
  const floor = doc.querySelector('[data-pricing-category][id="floor"]');
  assert.doesNotMatch(floor.textContent, /내구성 보증|오염 침투를 차단|스크래치 및 들뜸 방지/);
  assert.match(floor.textContent, /2코팅 이상 기본 시공/);
  assert.match(floor.textContent, /유지 기간은 현장의 사용 조건에 따라 달라집니다/);
});
