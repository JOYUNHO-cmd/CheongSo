import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { prepareRegionalPages, serviceSlugs } from '../scripts/prepare-regional-pages.mjs';
import { validateRegionalPages } from '../scripts/lib/regional-content.mjs';

const readJson = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
function loadTypeScript(path, dependencies) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true } }).outputText;
  const exports = {};
  runInNewContext(code, {
    exports,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `unexpected runtime dependency: ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}

function page(overrides = {}) {
  return {
    service: '바닥-왁스-코팅', region: '경기도-안양시', reviewed: true,
    title: '안양 바닥 작업 사례', description: '실제 현장의 오염과 작업 과정을 사진으로 소개합니다.',
    heading: '안양 바닥 작업 사례', intro: '사무실 바닥을 세척한 사례입니다.',
    sections: [{ heading: '상담 준비', body: '전체 사진을 보내주세요.' }],
    media: [{ type: 'image', src: '/images/case.webp', alt: '바닥 작업 전', caption: '작업 전 오염 상태' }],
    ...overrides,
  };
}
const options = {
  services: new Set(['바닥-왁스-코팅']), regions: new Set(['경기도-안양시', '경기도-군포시']),
  fileExists: path => ['/images/case.webp', '/videos/case.mp4', '/videos/poster.jpg'].includes(path),
};

test('regional runtime data loads without public files, content directories, or filesystem access', () => {
  const base = readJson('../src/lib/regional-pages.json');
  const imported = [page({ region: '경기도-군포시', publicationId: 'approved-import' }), page({ reviewed: false, region: 'draft' })];
  const runtime = loadTypeScript('../src/lib/regional-pages.ts', {
    './regional-pages.json': base,
    './regional-imports.json': imported,
  });
  assert.equal(runtime.regionalPages.length, base.filter(p => p.reviewed).length + 1);
  assert.ok(runtime.regionalPages.some(p => p.publicationId === 'approved-import'));
  assert.ok(runtime.regionalPages.every(p => p.reviewed));
  assert.equal(runtime.regionalPath(page()), '/바닥-왁스-코팅/경기도-안양시/');
});

test('all existing service URLs retain their slugs after sharing overrides with the build validator', () => {
  const categories = loadTypeScript('../src/lib/services-data.ts', {});
  const profiles = loadTypeScript('../src/lib/service-profiles.ts', {
    './services-data': categories,
    './service-slugs.json': readJson('../src/lib/service-slugs.json'),
  });
  const previousOverrides = { '소독&방역': '소독-방역', '냄새악취제거': '냄새-악취-제거', '바닥본드제거': '바닥-본드-제거', '바닥왁스코팅': '바닥-왁스-코팅' };
  const buildSlugs = serviceSlugs();
  for (const profile of profiles.serviceProfiles) {
    const expected = previousOverrides[profile.name] || profile.name;
    assert.equal(profile.slug, expected, profile.name);
    assert.equal(profiles.servicePath(profile.name), `/${expected}/`, profile.name);
    assert.ok(buildSlugs.has(expected), expected);
  }
  assert.equal(buildSlugs.size, profiles.serviceProfiles.length);
});

test('regional prevalidation accepts natural descriptions and rejects duplicate, incomplete, and unknown records', () => {
  assert.doesNotThrow(() => validateRegionalPages([page()], options));
  assert.throws(() => validateRegionalPages([page(), page()], options), /중복 지역 주소/);
  assert.throws(() => validateRegionalPages([page({ service: '없는서비스' })], options), /서비스·지역 범위/);
  assert.throws(() => validateRegionalPages([page({ region: '없는지역' })], options), /서비스·지역 범위/);
  assert.throws(() => validateRegionalPages([page({ reviewed: undefined })], options), /검토 상태/);
  assert.throws(() => validateRegionalPages([page({ intro: '' })], options), /내용 누락/);
  assert.throws(() => validateRegionalPages([page({ faq: [['질문', '']] })], options), /FAQ 내용/);
  assert.throws(() => validateRegionalPages([page({ fieldCase: { heading: '사례', lead: '내용', note: '주의사항', facts: [['현장', '사무실']], steps: [{ heading: '청소', body: '설명', media: ['/images/unknown.webp'] }] } })], options), /실제 사례/);
});

test('regional prevalidation rejects missing files, escaped media paths, and missing video posters', () => {
  for (const src of ['/images/missing.webp', '/images/../case.webp', '/images/%2e%2e/case.webp', '/images\\case.webp', 'https://example.com/case.webp']) {
    assert.throws(() => validateRegionalPages([page({ media: [{ type: 'image', src, alt: '상태', caption: '설명' }] })], options), /미디어 파일/, src);
  }
  assert.throws(() => validateRegionalPages([page({ media: [{ type: 'video', src: '/videos/case.mp4', alt: '작업 영상', caption: '작업 중', poster: '/videos/missing.jpg' }] })], options), /미디어 파일/);
  assert.throws(() => validateRegionalPages([page({ media: [{ type: 'video', src: '/videos/case.mp4', alt: '작업 영상', caption: '작업 중', poster: '/videos/../poster.jpg' }] })], options), /미디어 파일/);
  assert.doesNotThrow(() => validateRegionalPages([page({ media: [{ type: 'video', src: '/videos/case.mp4', alt: '작업 영상', caption: '작업 중', poster: '/videos/poster.jpg' }] })], options));
});

test('publication preparation bundles approved imports and validates files relative to the project root', t => {
  const root = mkdtempSync(join(tmpdir(), 'cheongso-regional-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const directory of ['src/lib', 'content/regional', 'public/images']) mkdirSync(resolve(root, directory), { recursive: true });
  const json = (path, value) => writeFileSync(resolve(root, path), JSON.stringify(value));
  writeFileSync(resolve(root, 'src/lib/service-profiles.ts'), 'const rows = [["바닥왁스코팅", "제목"]];');
  json('src/lib/service-slugs.json', { '바닥왁스코팅': '바닥-왁스-코팅' });
  json('src/lib/phase-regions.json', { regions: [{ region: '경기도-안양시' }, { region: '경기도-군포시' }] });
  json('src/lib/regional-pages.json', [page()]);
  writeFileSync(resolve(root, 'public/images/case.webp'), 'fixture-image');
  const published = page({ region: '경기도-군포시', publicationId: 'published' });
  json(`content/regional/${'a'.repeat(64)}.json`, published);
  // Files outside the publication naming convention never become public data.
  json('content/regional/admin-draft.json', { private: true });
  assert.deepEqual(prepareRegionalPages(root), { reviewed: 2, imported: 1 });
  assert.deepEqual(JSON.parse(readFileSync(resolve(root, 'src/lib/regional-imports.json'), 'utf8')), [published]);
  json(`content/regional/${'a'.repeat(64)}.json`, { ...published, reviewed: false, media: [] });
  assert.deepEqual(prepareRegionalPages(root), { reviewed: 1, imported: 0 });
  assert.deepEqual(JSON.parse(readFileSync(resolve(root, 'src/lib/regional-imports.json'), 'utf8')), []);
  json('src/lib/regional-pages.json', [page({ media: [{ type: 'image', src: '/images/missing.webp', alt: '설명', caption: '설명' }] })]);
  assert.throws(() => prepareRegionalPages(root), /미디어 파일/);
});
