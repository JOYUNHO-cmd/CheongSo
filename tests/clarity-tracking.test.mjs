import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("root layout loads the Microsoft Clarity project exactly once", async () => {
  const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

  assert.equal(layout.match(/yo5g06xb3i/g)?.length, 1);
  assert.equal(layout.match(/id="microsoft-clarity"/g)?.length, 1);
  assert.match(layout, /https:\/\/www\.clarity\.ms\/tag\//);
  assert.match(layout, /<head>[\s\S]*microsoft-clarity[\s\S]*<\/head>/);
});
