import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');

test('hero renders only one mobile background playback instance and keeps desktop/inline video', () => {
  const source = read('src/components/HeroVideo.tsx');
  const ast = ts.createSourceFile('HeroVideo.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const players = [];
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === 'BackgroundVideo') players.push(node.getText(ast));
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert.equal(players.filter(node => node.includes('media="(max-width: 767px)"')).length, 1);
  assert.equal(players.filter(node => node.includes('media="(min-width: 768px)"')).length, 1);
  assert.equal(players.filter(node => /\binline\s*\/>/.test(node)).length, 1);
  assert.match(source, /poster="\/videos\/hero-poster.jpg"/);
  assert.match(source, /preload="none"/);
  assert.match(source, /shouldPlay && sources\.map/);
  assert.match(source, /const shouldPlay = active && readyToPlay && \(!waitForInteraction \|\| interacted\)/);
  const mobilePlayer = players.find(node => node.includes('media="(max-width: 767px)"'));
  assert.match(mobilePlayer, /\bwaitForInteraction\s*\/>/);
  assert.ok(players.filter(node => !node.includes('media="(max-width: 767px)"')).every(node => !node.includes('waitForInteraction')));
  assert.match(source, /document\.readyState === "complete"/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /const MOBILE_SOURCES = \["\/videos\/hero-mobile\.mp4"\]/);
  assert.match(source, /const HD_SOURCES = \["\/videos\/hero-hd\.mp4", "\/videos\/hero-web\.mp4"\]/);
  const mobileBytes = readFileSync(new URL('../public/videos/hero-mobile.mp4', import.meta.url));
  assert.ok(mobileBytes.length < 2_000_000, '모바일 영상은 2MB 미만이어야 합니다');
  assert.ok(mobileBytes.indexOf(Buffer.from('moov')) < mobileBytes.indexOf(Buffer.from('mdat')), '재생 메타데이터가 영상 데이터 앞에 있어야 합니다');
});

test('mobile playback has no large-video fallback and active playback is not reset with load()', () => {
  const source = read('src/components/HeroVideo.tsx');
  const ast = ts.createSourceFile('HeroVideo.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const videoLoads = [];
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 'video.load') videoLoads.push(node);
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'MOBILE_SOURCES') {
      assert.ok(ts.isArrayLiteralExpression(node.initializer));
      assert.deepEqual(node.initializer.elements.map(item => item.text), ['/videos/hero-mobile.mp4']);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert.equal(videoLoads.length, 1);
  let branch = videoLoads[0].parent;
  while (branch && !ts.isIfStatement(branch)) branch = branch.parent;
  assert.ok(branch);
  assert.equal(branch.expression.getText(ast), '!shouldPlay');
  assert.match(branch.thenStatement.getText(ast), /video\.pause\(\)/);
  assert.match(branch.thenStatement.getText(ast), /return;/);
});

test('consultation dialog and its stylesheet are requested only after opening', () => {
  const loader = read('src/components/consultation/ConsultationBotLoader.tsx');
  const bot = read('src/components/consultation/ConsultationBot.tsx');
  assert.match(loader, /dynamic\(\(\) => import\("@\/components\/consultation\/ConsultationBot"\)/);
  assert.match(loader, /requested && <ConsultationBot open=\{open\}/);
  assert.doesNotMatch(loader, /import [^\n]*chatbot\.css/);
  assert.match(bot, /import "\.\/chatbot\.css"/);
  for (const control of ['openConsultationBot', 'closeConsultationBot', 'toggleConsultationBot']) assert.ok(loader.includes(control));
  assert.match(loader, /addEventListener\("open-consultation-bot", openBot\)/);
  assert.doesNotMatch(bot, /Floating launcher|jjin-launcher-wrapper/);
  assert.match(bot, /previous\.focus\(\{ preventScroll: true \}\)/);
  assert.match(bot, /e\.key === "Tab"/);
  assert.doesNotMatch(bot, /선택 내용은 (?:저장하거나 전송하지|전송·저장되지) 않습니다/);
  assert.equal(bot.match(/선택 내용은 자동 전송되지 않습니다\./g)?.length, 2);
  assert.equal(bot.match(/상담 내용 이메일로 보내기를 누르면 찐청소로 전달됩니다\./g)?.length, 2);
});

test('mobile telephone, Kakao and automated consultation share a reachable bottom dock', () => {
  const dock = read('src/components/MobileQuickContact.tsx');
  const launcherCss = read('src/components/consultation/ConsultationLauncher.module.css');
  const globalCss = read('src/app/globals.css');
  assert.match(dock, /mobile-contact-dock fixed inset-x-0 bottom-0/);
  assert.match(dock, /href=\{`tel:\$\{siteConfig\.phoneRaw\}`\}/);
  assert.match(dock, /href=\{siteConfig\.kakaoUrl\}/);
  assert.match(dock, /dispatchEvent\(new Event\("open-consultation-bot"\)\)/);
  assert.equal(dock.match(/min-h-11/g)?.length, 3);
  assert.doesNotMatch(dock, /calc\(25%|flex-col|usePathname/);
  assert.match(launcherCss, /@media \(max-width: 767px\)\s*\{\s*\.wrapper \{ display: none; \}/);
  assert.match(globalCss, /padding-bottom: calc\(76px \+ env\(safe-area-inset-bottom\)\)/);
  assert.match(globalCss, /scroll-padding-bottom: calc\(76px \+ env\(safe-area-inset-bottom\)\)/);
});

test('home trust copy wraps at narrow widths without changing its text or clipping overflow', () => {
  const source = read('src/components/home/TrustConcerns.tsx');
  assert.doesNotMatch(source, /whitespace-nowrap|overflow-x-hidden/);
  assert.match(source, /grid min-w-0 items-center/);
  assert.match(source, /min-w-0 break-keep whitespace-normal/);
  for (const text of [
    '궁금한 것들은 다! 찐하게 말씀드립니다',
    '어디까지 청소하는지, 짐은 옮겨야 하는지,',
    '비용은 어떻게 측정이 되는지..',
    '찐 청소는 현장마다 필요한 작업은 구체적으로',
    '별도 확인할 부분은 미리 말씀드립니다',
    '포함 구역과 별도 작업을 나눠 확인합니다',
    '면적뿐 아니라 소재, 오염, 동선을 함께 봅니다',
    '협의한 작업과 이후 관리 방법을 확인합니다',
  ]) assert.ok(source.includes(text), text);
});

test('other home explanations allow mobile wrapping and preserve original copy', () => {
  const pricing = read('src/components/home/PricingTransparency.tsx');
  const features = read('src/components/home/TrustFeatures.tsx');
  const home = read('src/app/page.tsx');
  assert.doesNotMatch(pricing, /whitespace-nowrap|overflow-x-hidden/);
  assert.match(features, /group min-w-0/);
  assert.equal(features.match(/whitespace-normal tracking-tight sm:whitespace-nowrap/g)?.length, 2);
  for (const text of [
    '견적에도 이유가 있어야, 고객님 마음이 편합니다',
    '같은 평수여도 짐의 양과 바닥 재질, 오염 상태는 다릅니다',
    '필요한 작업을 먼저 정리하고 그에 맞는 비용을 협의합니다',
    '작업가능시간, 건조시간, 별도 세척&반출',
  ]) assert.ok(pricing.includes(text), text);
  assert.match(home, /className="block break-keep whitespace-normal sm:inline">등록된 자격증 자료를 확인하실 수 있습니다\./);
  assert.match(home, /className="block break-keep whitespace-normal sm:inline">이미지를 누르면 크게 볼 수 있어요/);
});

test('shared headings and category descriptions do not force mobile text outside their bounds', () => {
  assert.doesNotMatch(read('src/components/SectionHeading.tsx'), /whitespace-nowrap/);
  assert.doesNotMatch(read('src/components/ServiceCategoryGrid.tsx'), /whitespace-nowrap/);
  const header = read('src/components/Header.tsx');
  assert.match(header, /aria-label="전체 메뉴 열기"/);
  assert.match(header, /hidden min-\[360px\]:inline">전체 <\/span>메뉴/);
});
