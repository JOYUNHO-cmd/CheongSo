import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
function loadTs(filename) {
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = createRequire(filename);
  loaded.require = spec => spec.startsWith('@/')
    ? loadTs(path.join(root, 'src', spec.slice(2) + '.ts'))
    : nativeRequire(spec);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
  return loaded.exports;
}
const { buildMetadata } = loadTs(path.join(root, 'src/lib/seo.ts'));

test('a supplied service photo replaces the default in both share cards', () => {
  const result = buildMetadata({title: '사무실청소', description: '작업 범위', path: '/사무실청소/',
    image: {src: '/images/hero-bg/office-hero.webp', alt: '사무실 작업 현장', width: 1200, height: 630}});
  assert.equal(result.openGraph.images[0].url, 'https://www.cheongso.co.kr/images/hero-bg/office-hero.webp');
  assert.equal(result.openGraph.images[0].alt, '사무실 작업 현장');
  assert.equal(result.openGraph.images[0].width, 1200);
  assert.equal(result.twitter.images[0], 'https://www.cheongso.co.kr/images/hero-bg/office-hero.webp');
});

test('pages without a service photo retain the default and their canonical', () => {
  const result = buildMetadata({title: '안내', description: '안내', path: '/about'});
  assert.equal(result.openGraph.images[0].url, 'https://www.cheongso.co.kr/videos/hero-poster.jpg');
  assert.equal(result.alternates.canonical, 'https://www.cheongso.co.kr/about/');
});
