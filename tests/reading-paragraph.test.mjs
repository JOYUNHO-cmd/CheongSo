import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Module, { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
const filename = fileURLToPath(new URL('../src/components/service-pages/ReadingParagraph.tsx', import.meta.url));
function render(props) {
  const mod = new Module(filename);
  const native = createRequire(filename);
  mod.require = spec => spec.endsWith('.module.css') ? { sentence: 'sentence', breath: 'breath' } : native(spec);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
  return new JSDOM(renderToStaticMarkup(React.createElement(mod.exports.ReadingParagraph, props))).window.document.querySelector('p');
}
test('sentence layout retains every character including prices, punctuation and spacing', () => {
  const text = '면적은 50.5평입니다.  코팅은 별도인가요? 네, 별도입니다.';
  const p = render({ children: text });
  assert.equal(p.textContent, text);
  assert.deepEqual([...p.children].map(el => el.textContent), ['면적은 50.5평입니다.  ', '코팅은 별도인가요? ', '네, 별도입니다.']);
});
test('editor-chosen breath boundaries preserve wording and order exactly', () => {
  const text = '집기를 청소하지 않더라도 주변 바닥을 나누어 작업하고, 좁은 틈과 모서리를 살핍니다.';
  const p = render({ children: text, breakAfter: ['않더라도 ', '작업하고, '] });
  assert.equal(p.textContent, text);
  assert.deepEqual([...p.firstElementChild.children].map(el => el.textContent), ['집기를 청소하지 않더라도 ', '주변 바닥을 나누어 작업하고, ', '좁은 틈과 모서리를 살핍니다.']);
});
test('existing inline links and paragraph attributes survive presentation changes', () => {
  const p = render({ id: 'example', className: 'note', children: ['자세한 범위는 ', React.createElement('a', { href: '/services/', key: 'link' }, '서비스 안내'), '에서 확인하세요.'] });
  assert.equal(p.id, 'example');
  assert.equal(p.className, 'note');
  assert.equal(p.querySelector('a').getAttribute('href'), '/services/');
  assert.equal(p.textContent, '자세한 범위는 서비스 안내에서 확인하세요.');
});
