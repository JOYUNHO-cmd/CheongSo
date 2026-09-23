import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module, { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
const root = fileURLToPath(new URL('../src/', import.meta.url));
function load(filename) {
  const mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const native = createRequire(filename);
  mod.require = spec => {
    if (!spec.startsWith('@/')) return native(spec);
    const base = path.join(root, spec.slice(2));
    return load(fs.existsSync(base + '.tsx') ? base + '.tsx' : base + '.ts');
  };
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
  return mod.exports;
}
const Footer = load(path.join(root, 'components/Footer.tsx')).default;
const render = () => new JSDOM(renderToStaticMarkup(React.createElement(Footer))).window.document;
test('footer exposes clickable verified contact details and preserves business identity', () => {
  const doc = render();
  assert.equal(doc.querySelector('a[href="mailto:danger3662@naver.com"]')?.textContent, 'danger3662@naver.com');
  assert.equal(doc.querySelector('a[href="tel:01098828882"]')?.textContent, '010.9882.8882');
  assert.ok(doc.querySelector('address')?.textContent.includes('군포시 도마교동 463 1층'));
  assert.ok(doc.querySelector('footer').textContent.includes('862-57-00848'));
});
test('footer offers distinct navigation groups with actual service destinations', () => {
  const doc = render();
  assert.equal(doc.querySelectorAll('footer nav').length, 2);
  const destinations = [...doc.querySelectorAll('a')].map(a => decodeURI(a.getAttribute('href')).replace(/\/$/, ''));
  for (const route of ['/gallery/', '/services#easy', '/services#moving', '/services#commercial', '/services#hygiene', '/services#special', '/services#exterior', '/services#floor']) {
    assert.ok(destinations.includes(route.replace(/\/$/, '')), route);
  }
  assert.equal(doc.querySelectorAll('nav[aria-label="하단 주요 서비스"] a').length, 7);
});
