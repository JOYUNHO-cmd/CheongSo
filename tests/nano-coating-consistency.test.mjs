import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("nano-coating content consistently limits the service to porcelain-tile floors", async () => {
  const [profile, landing, pricing] = await Promise.all([
    readSource("src/lib/service-profiles.ts"),
    readSource("src/components/service-pages/NanoCoatingLanding.tsx"),
    readSource("src/lib/pricing-guide-data.ts"),
  ]);

  assert.match(profile, /찐청소 나노코팅은 포세린타일 바닥 전문입니다/);
  assert.match(landing, /찐청소의 나노코팅 대상은 포세린타일 바닥입니다/);
  assert.match(pricing, /name: "포세린타일 바닥 나노코팅"/);
  assert.match(pricing, /바닥 상태와 제품 적합성을 확인한 뒤\|세척·코팅 범위와 관리 조건 안내/);

  const nanoPricing = pricing.match(
    /name: "포세린타일 바닥 나노코팅"[\s\S]*?(?=\n\s*\},)/,
  )?.[0];
  assert.ok(nanoPricing, "나노코팅 가격 안내를 찾을 수 있어야 합니다.");
  assert.doesNotMatch(nanoPricing, /폴리싱|원천 차단|반영구/);
});
