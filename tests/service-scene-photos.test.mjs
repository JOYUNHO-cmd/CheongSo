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

const filename = fileURLToPath(new URL('../src/components/service-pages/ServiceScenePhotos.tsx', import.meta.url));
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const loaded = new Module(filename);
loaded.filename = filename;
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
loaded.require = createRequire(filename);
loaded._compile(compiled, filename);
const { ServiceScenePhotos } = loaded.exports;
const render = props => new JSDOM(renderToStaticMarkup(React.createElement(ServiceScenePhotos, props))).window.document;

// Catches wrong service/section selection, missing captions, and lost mobile source.
test('event scope renders only its scope photo with a mobile source and caption', () => {
  const doc = render({path:'/행사장청소/',section:'scope'});
  const photos = doc.querySelectorAll('figure');
  assert.equal(photos.length, 1);
  assert.match(photos[0].querySelector('img').src, /event-booth\.webp$/);
  assert.match(photos[0].querySelector('source').srcset, /event-booth-640\.webp/);
  assert.ok(photos[0].querySelector('figcaption').textContent.length > 20);
  assert.equal(photos[0].querySelector('img').getAttribute('loading'), 'lazy');
});

test('process selects the work scene rather than repeating the scope image', () => {
  const doc = render({path:'/행사장청소/',section:'process'});
  assert.match(doc.querySelector('img')?.src ?? '', /event-detail-wiping\.webp$/);
});

test('an unmapped service leaves no empty photo wrapper', () => {
  assert.equal(render({path:'/없는서비스/',section:'scope'}).body.innerHTML, '');
});
