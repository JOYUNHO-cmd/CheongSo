import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const base = process.argv[2] || "http://localhost:3100";
const origin = (process.env.SITE_URL || "https://cheong-so.vercel.app").replace(/\/$/, "");
const get = async path => { const r = await fetch(new URL(path, base)); return { status: r.status, html: await r.text() }; };
const siteMap = await get("/sitemap.xml");
assert.equal(siteMap.status, 200);
const urls = [...siteMap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replaceAll("&amp;", "&"));
assert.equal(urls.length, new Set(urls).size, "중복 사이트맵 주소");
const expectedRegional = JSON.parse(readFileSync("src/lib/regional-pages.json", "utf8")).filter(p => p.reviewed);
assert.equal(urls.length, 6 + 33 + expectedRegional.length);
const staticPaths = new Set(["/", "/about/", "/contact/", "/services/", "/pricing/", "/reviews/"]);
for (let i = 0; i < urls.length; i += 5) {
  await Promise.all(urls.slice(i, i + 5).map(async url => {
    assert.ok(url.startsWith(origin + "/"), "잘못된 대표 도메인");
    const path = new URL(url).pathname;
    const { status, html } = await get(path);
    assert.equal(status, 200, path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1: ${path}`);
    assert.ok(/<title>[^<]+<\/title>/.test(html), `title: ${path}`);
    assert.ok(/<meta name="description" content="[^"]+"/.test(html), `description: ${path}`);
    assert.ok(!html.includes("1588-0000") && !html.includes("info@cheongso.co.kr") && !html.includes("신청이 접수되었습니다."), `임시 정보: ${path}`);
    if (!staticPaths.has(path)) {
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      assert.ok(canonical, `canonical: ${path}`);
      assert.equal(decodeURI(canonical[1]), decodeURI(url));
      const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
      assert.equal(data[0][0]["@type"], "Service");
      for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `목차 링크: ${path}#${id}`);
    }
  }));
}
for (const path of ["/없는서비스/", "/바닥-왁스-코팅/없는지역/", "/바닥-왁스-코팅/서울특별시-강남구/"]) assert.equal((await get(path)).status, 404, `미발행 주소: ${path}`);
const baseline = execFileSync("git", ["show", "90f0634c15b3dd20a40f89d30cb8c8fcccdb4a53:src/lib/site-config.ts"], { encoding: "utf8" });
const current = readFileSync("src/lib/site-config.ts", "utf8");
for (const key of ["nameEn", "heroHeadline", "heroSubcopy", "heroClosing"]) {
  const pattern = new RegExp(`  ${key}: ([^\\n]+)`);
  assert.equal(current.match(pattern)?.[1].trim(), baseline.match(pattern)?.[1].trim(), `메인 문구 변경: ${key}`);
}
console.log(`PASS: ${urls.length} pages, 33 services, ${expectedRegional.length} regional page(s), metadata, H1, TOC, unpublished 404, hero preserved`);
