import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const parse = (path, kind = ts.ScriptKind.TS) => ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, kind);

function config(env) {
  const code = ts.transpileModule(read('next.config.ts'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  runInNewContext(code, { exports, process: { env } });
  return exports.default;
}

function fontCalls() {
  const ast = parse('src/app/layout.tsx', ts.ScriptKind.TSX);
  const calls = new Map();
  const names = ['Noto_Sans_KR', 'Nanum_Brush_Script', 'Nanum_Pen_Script'];
  function visit(node) {
    if (ts.isCallExpression(node) && names.includes(node.expression.getText(ast))) {
      const name = node.expression.getText(ast);
      assert.ok(ts.isObjectLiteralExpression(node.arguments[0]), `${name} options must remain explicit`);
      const properties = new Map(node.arguments[0].properties.map(property => {
        assert.ok(ts.isPropertyAssignment(property), `${name} options must not hide overrides in spreads`);
        return [property.name.getText(ast), property.initializer];
      }));
      const existing = calls.get(name) || [];
      existing.push(properties);
      calls.set(name, existing);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return calls;
}

test('production keeps cacheable external CSS and does not enable local-only worker settings on Vercel', () => {
  for (const env of [{}, { VERCEL: '1' }, { VERCEL: '1', CHEONGSO_LOCAL_WORKER_THREADS: '0' }]) {
    const actual = config(env);
    assert.notEqual(actual.experimental?.inlineCss, true);
    assert.equal(actual.experimental?.workerThreads, undefined);
    assert.equal(actual.experimental?.useTypeScriptCli, undefined);
    assert.equal(actual.experimental?.cpus, undefined);
    assert.notEqual(actual.typescript?.ignoreBuildErrors, true);
    assert.equal(actual.trailingSlash, true);
    assert.equal(actual.images.unoptimized, true);
    assert.equal(actual.output, env.VERCEL ? undefined : 'standalone');
  }
  const local = config({ CHEONGSO_LOCAL_WORKER_THREADS: '1' });
  assert.notEqual(local.experimental.inlineCss, true);
  assert.equal(local.experimental.workerThreads, true);
  assert.equal(local.experimental.useTypeScriptCli, false);
  assert.equal(local.experimental.cpus, 2);
  assert.notEqual(local.typescript?.ignoreBuildErrors, true);
});

test('one self-hosted Noto Sans KR instance retains all existing body and heading weights', () => {
  const calls = fontCalls();
  assert.equal(calls.get('Noto_Sans_KR')?.length, 1);
  const options = calls.get('Noto_Sans_KR')[0];
  assert.equal(options.get('weight')?.text, 'variable');
  assert.equal(options.get('variable')?.text, '--font-noto-sans-kr');
  assert.equal(options.get('display')?.text, 'swap');
  assert.notEqual(options.get('preload')?.kind, ts.SyntaxKind.FalseKeyword);
  assert.ok(ts.isArrayLiteralExpression(options.get('subsets')));
  assert.deepEqual(options.get('subsets').elements.map(item => item.text), ['latin']);

  const fontData = JSON.parse(read('node_modules/next/dist/compiled/@next/font/dist/google/font-data.json'))['Noto Sans KR'];
  assert.ok(fontData.weights.includes('variable'));
  const weightAxis = fontData.axes.find(axis => axis.tag === 'wght');
  for (const weight of [400, 500, 700, 900]) {
    assert.ok(weightAxis.min <= weight && weight <= weightAxis.max, `existing weight ${weight} must remain supported`);
  }
});

test('decorative font families keep their 400 weight, swap display and disabled preloading', () => {
  const calls = fontCalls();
  for (const [name, variable] of [
    ['Nanum_Brush_Script', '--font-brush-script'],
    ['Nanum_Pen_Script', '--font-pen-script'],
  ]) {
    assert.equal(calls.get(name)?.length, 1);
    const options = calls.get(name)[0];
    assert.equal(options.get('variable')?.text, variable);
    assert.equal(options.get('weight')?.text, '400');
    assert.equal(options.get('display')?.text, 'swap');
    assert.equal(options.get('preload')?.kind, ts.SyntaxKind.FalseKeyword);
  }
  const layout = read('src/app/layout.tsx');
  for (const expression of ['notoSansKr.variable', 'nanumBrush.variable', 'nanumPen.variable']) assert.ok(layout.includes(expression));
  assert.match(layout, /from "next\/font\/google"/);
  assert.doesNotMatch(layout, /https?:\/\/fonts\.(?:googleapis|gstatic)\.com/);
});

test('font optimization preserves the original CSS family variables and fallback order', () => {
  const css = read('src/app/globals.css');
  for (const declaration of [
    '--font-sans: var(--font-noto-sans-kr);',
    '--font-brush: var(--font-brush-script), var(--font-pen-script), cursive;',
    '--font-signature: var(--font-pen-script), var(--font-brush-script), cursive;',
    'font-family: var(--font-sans), Arial, Helvetica, sans-serif;',
    'font-family: var(--font-brush-script), var(--font-pen-script), cursive, sans-serif;',
    'font-family: var(--font-pen-script), var(--font-brush-script), cursive, sans-serif;',
  ]) assert.ok(css.includes(declaration), declaration);
});

// Run after the production build, not against next dev or stale build output:
// CHEONGSO_VERIFY_CRITICAL_BUILD=1 node --test tests/critical-styles.test.mjs
// inlineCss was removed after measured SSR/RSC duplication substantially grew
// this site's first-response HTML without a confirmed performance benefit.
// Keep the variable-font improvement and independently cacheable CSS instead.
test('production SSR links to emitted CSS with variable fonts and reachable font files', {
  skip: process.env.CHEONGSO_VERIFY_CRITICAL_BUILD !== '1' ? 'enable CHEONGSO_VERIFY_CRITICAL_BUILD=1 after a fresh production build' : false,
}, async t => {
  const requiredFiles = JSON.parse(read('.next/required-server-files.json'));
  assert.notEqual(requiredFiles.config.experimental.inlineCss, true, 'stale inline-CSS production build');
  for (const page of ['index.html', 'services.html', '바닥-왁스-코팅/경기도-안양시.html', '인테리어청소/경기도-과천시.html']) {
    await t.test(page, () => {
      const html = read(`.next/server/app/${page}`);
      const dom = new JSDOM(html);
      try {
        const document = dom.window.document;
        assert.equal(document.querySelectorAll('style[data-href][data-precedence="next"]').length, 0, 'built CSS must not be duplicated inline in SSR');
        const links = [...document.querySelectorAll('link[rel="stylesheet"][href*="/_next/"]')];
        assert.ok(links.length > 0, 'production SSR must link to its emitted stylesheets');
        const pageUrl = `https://www.cheongso.co.kr${page === 'index.html' ? '/' : `/${page.slice(0, -'.html'.length)}/`}`;
        const seen = new Set();
        const resources = links.map(link => {
          const href = link.getAttribute('href');
          assert.ok(!seen.has(href), `duplicate stylesheet resource: ${href}`);
          seen.add(href);
          const url = new URL(href, pageUrl);
          assert.ok(url.pathname.startsWith('/_next/static/') && url.pathname.endsWith('.css'), `unexpected CSS resource: ${url.pathname}`);
          const path = resolve(root, '.next', decodeURIComponent(url.pathname.slice('/_next/'.length)));
          assert.ok(existsSync(path), `missing emitted stylesheet: ${url.pathname}`);
          const content = readFileSync(path, 'utf8');
          assert.ok(content.trim().length > 0, `empty emitted stylesheet: ${url.pathname}`);
          return { url, content };
        });
        const cssText = resources.map(resource => resource.content).join('\n');

        const faces = [...cssText.matchAll(/@font-face\s*\{[^}]*\}/g)].map(match => match[0]);
        const notoFaces = faces.filter(face => /font-family:\s*["']?Noto Sans KR["']?;/.test(face));
        assert.ok(notoFaces.length > 0, 'Noto Sans KR must remain in the rendered CSS');
        const signatures = new Set();
        for (const face of notoFaces) {
          assert.match(face, /font-weight:\s*100\s+900(?:;|\})/);
          assert.match(face, /font-display:\s*swap(?:;|\})/);
          const signature = [face.match(/src:([^;]+)/)?.[1], face.match(/unicode-range:([^}]+)/)?.[1]].join('|');
          assert.ok(!signatures.has(signature), 'the same Noto source/subset must not be emitted once per former weight');
          signatures.add(signature);
        }
        for (const family of ['Nanum Brush Script', 'Nanum Pen Script']) assert.ok(faces.some(face => face.includes(`font-family:${family};`)), family);

        const fontPreloads = [...document.querySelectorAll('link[rel="preload"][as="font"]')];
        assert.equal(fontPreloads.length, 1, 'only the body font latin subset should be preloaded');
        const resolvedFonts = new Set();
        for (const resource of resources) {
          for (const match of resource.content.matchAll(/url\((?:["']?)([^\s)'";]+)(?:["']?)\)/g)) {
            if (!/\.woff2(?:[?#]|$)/.test(match[1])) continue;
            // External CSS resolves relative font URLs against its own URL,
            // not the document URL, including on nested Korean service paths.
            const pathname = new URL(match[1], resource.url).pathname;
            assert.ok(pathname.startsWith('/_next/static/media/'), `font URL must resolve to a self-hosted asset: ${match[1]}`);
            assert.ok(existsSync(resolve(root, '.next', decodeURIComponent(pathname.slice('/_next/'.length)))), `missing emitted font: ${pathname}`);
            resolvedFonts.add(pathname);
          }
        }
        const preloadPath = new URL(fontPreloads[0].getAttribute('href'), pageUrl).pathname;
        assert.ok(resolvedFonts.has(preloadPath), 'the preloaded font must be used by the emitted CSS');
      } finally {
        dom.window.close();
      }
    });
  }
});
