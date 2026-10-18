import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const cases = JSON.parse(readFileSync('src/lib/trash-batch-01.json', 'utf8'));
const photoSets = JSON.parse(readFileSync('src/lib/trash-batch-01-photos.json', 'utf8'));
test('all available case photos are included with explicit stages and existing photos preserved', () => {
  const counts = [9,12,12,13,9,20,24,16,7,23];
  cases.forEach((c,i) => {
    const photos=photoSets[c.slug];
    assert.equal(photos.length,counts[i]);
    assert.equal(new Set(photos.map(p=>p.src)).size,photos.length);
    for(const p of photos){assert.ok(existsSync(`public${p.src}`));assert.ok(p.stage);assert.doesNotMatch(JSON.stringify(p), /가상시안|연출|후보정/);}
    for(const p of c.photos){const actual=photos.find(x=>x.src===p.src);assert.ok(actual);assert.equal(actual.alt,p.alt);assert.equal(actual.caption,p.caption);}
  });
});
const expected = [[5,8],[4,9],[3,8],[3,8],[7,9],[5,9],[5,9],[3,6],[5,9],[5,8]];
test('ten distinct previews retain confirmed staffing and clean public photo names', () => {
  assert.equal(cases.length, 10);
  assert.equal(new Set(cases.map(c => c.slug)).size, 10);
  cases.forEach((c,i) => {
    assert.deepEqual([c.crew,c.hours], expected[i]);
    for (const key of ['title','heading','summary','description','intro']) {
      assert.ok(c[key].startsWith(`${c.area} 쓰레기집청소`), `${c.slug}: ${key}`);
    }
    for (const p of c.photos) {
      assert.ok(existsSync(`public${p.src}`));
      assert.ok(p.width > 0 && p.height > 0);
      assert.doesNotMatch(JSON.stringify(p), /가상시안|연출|후보정/);
    }
  });
});
test('previews remain noindex and preserve native FAQ and uncropped images', () => {
  const page = readFileSync('src/app/preview/trash-batch/[slug]/page.tsx','utf8');
  const component = readFileSync('src/components/service-pages/TrashBatchLanding.tsx','utf8');
  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*false/);
  assert.match(component, /<details/);
  assert.match(component, /h-auto w-full/);
  assert.doesNotMatch(component, /사진 크게 보기|object-cover/);
});
