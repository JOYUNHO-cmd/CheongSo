import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("업체 서비스 지역을 과거 사례 목록에서 추정하지 않는다", () => {
  const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /import\s+.*regionalPages/);
  assert.doesNotMatch(layout, /areaServed\s*:/);
  assert.match(layout, /siteConfig\.naverPlaceUrl/);
  assert.match(layout, /microsoft-clarity/);
});

test("모바일 상담 바 뒤로 페이지 끝과 앵커를 읽을 공간을 유지한다", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /padding-bottom: calc\(76px \+ env\(safe-area-inset-bottom\)\)/);
  assert.match(css, /scroll-padding-bottom: calc\(76px \+ env\(safe-area-inset-bottom\)\)/);
});
