import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';

async function pageText(path) {
  const response = await fetch(base + encodeURI(path));
  assert.equal(response.status, 200, `${path} should load`);
  return new JSDOM(await response.text()).window.document.body.textContent;
}

test('interior and completion cleaning identify floor cleaning as included work', async () => {
  const [interior, completion] = await Promise.all([
    pageText('/인테리어청소/'),
    pageText('/신축준공청소/'),
  ]);

  assert.ok(interior.includes('실내 바닥청소는 인테리어청소의 기본 범위에 포함됩니다'));
  assert.ok(completion.includes('실내 바닥청소는 신축준공청소의 기본 범위에 포함됩니다'));
});

test('trash-house cleaning identifies waste disposal and floor cleaning as included work', async () => {
  const trashHouse = await pageText('/쓰레기집청소/');

  assert.ok(trashHouse.includes('수거·폐기물 처리·실내 청소(바닥청소 포함)·소독·냄새 제거'));
});
