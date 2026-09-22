import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "C:/Users/PC/Desktop/홈페이지2 이미지 사용/전후 사진 업로드 폴더";
const OUT_DIR = "public/images/gallery-v2";
const DATA_OUT = "src/lib/gallery-data.json";

const CATEGORIES = [
  { dir: "건물복원청소", slug: "restoration", label: "건물복원청소" },
  { dir: "곰팡이제거", slug: "mold", label: "곰팡이제거" },
  { dir: "공장청소", slug: "factory", label: "공장청소" },
  { dir: "관공서", slug: "government", label: "관공서청소" },
  { dir: "기타청소", slug: "etc", label: "기타청소" },
  { dir: "매장&백화점청소", slug: "store", label: "매장·백화점청소" },
  { dir: "바닥(마루코팅)", slug: "floor-wood", label: "마루코팅" },
  { dir: "바닥(본드제거)", slug: "floor-adhesive", label: "바닥본드제거" },
  { dir: "바닥(오일폴티스)", slug: "floor-poultice", label: "바닥 오일폴티스" },
  { dir: "바닥(왁스코팅)", slug: "floor-wax", label: "바닥왁스코팅" },
  { dir: "바닥(콩자갈)", slug: "floor-pebble", label: "콩자갈청소" },
  { dir: "바닥(타일작업)", slug: "floor-tile", label: "바닥타일작업" },
  { dir: "사무실청소", slug: "office", label: "사무실청소" },
  { dir: "시트지제거", slug: "sheet-removal", label: "시트지제거" },
  { dir: "신축 준공청소", slug: "new-construction", label: "신축·준공청소" },
  { dir: "어닝청소", slug: "awning", label: "어닝청소" },
  { dir: "외벽청소", slug: "exterior-wall", label: "외벽청소" },
  { dir: "인테리어청소", slug: "interior", label: "인테리어청소" },
  { dir: "입주청소", slug: "move-in", label: "입주청소" },
  { dir: "주방청소", slug: "kitchen", label: "주방청소" },
  { dir: "침수청소", slug: "flood", label: "침수청소" },
  { dir: "특수청소", slug: "special", label: "특수청소" },
  { dir: "화재청소", slug: "fire", label: "화재청소" },
  { dir: "후드청소", slug: "hood", label: "후드청소" },
];

// 접미사(전/후)가 단어 순서까지 다르게 붙은 예외 항목을 수동으로 짝지어줍니다.
const MANUAL_PAIRS = {
  "공장청소": [
    { before: "시흥공장내부천장벽면청소 전.jpg", after: "시흥공장내부벽면천장청소 후.jpg", title: "시흥 공장 내부 천장·벽면 청소" },
  ],
};

function pairFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
  const before = {};
  const after = {};
  for (const f of files) {
    const m = f.match(/^(.*?)\s*(전|후)\.(jpe?g|png)$/i);
    if (!m) continue;
    const [, title, tag] = m;
    const key = title.trim();
    if (tag === "전") before[key] = f; else after[key] = f;
  }
  const pairs = [];
  for (const key of Object.keys(before)) {
    if (after[key]) pairs.push({ title: key, before: before[key], after: after[key] });
  }
  return pairs;
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const result = [];
let totalPairs = 0;

for (const cat of CATEGORIES) {
  const dir = path.join(SRC_ROOT, cat.dir);
  if (!fs.existsSync(dir)) { console.log("MISSING DIR", cat.dir); continue; }
  const pairs = pairFiles(dir);
  for (const extra of MANUAL_PAIRS[cat.dir] || []) pairs.push(extra);

  const items = [];
  for (let i = 0; i < pairs.length; i++) {
    const { title, before, after } = pairs[i];
    const idx = String(i + 1).padStart(2, "0");
    const id = `${cat.slug}-g${idx}`;
    const beforeOut = `${id}-before.webp`;
    const afterOut = `${id}-after.webp`;
    const beforeSrc = path.join(dir, before);
    const afterSrc = path.join(dir, after);
    const beforeImg = await sharp(beforeSrc).rotate().resize({ width: 800, withoutEnlargement: true });
    const afterImg = await sharp(afterSrc).rotate().resize({ width: 800, withoutEnlargement: true });
    await beforeImg.webp({ quality: 80 }).toFile(path.join(OUT_DIR, beforeOut));
    await afterImg.webp({ quality: 80 }).toFile(path.join(OUT_DIR, afterOut));
    const beforeMeta = await sharp(path.join(OUT_DIR, beforeOut)).metadata();
    const afterMeta = await sharp(path.join(OUT_DIR, afterOut)).metadata();
    items.push({
      id,
      title,
      before: beforeOut,
      after: afterOut,
      beforeWidth: beforeMeta.width,
      beforeHeight: beforeMeta.height,
      afterWidth: afterMeta.width,
      afterHeight: afterMeta.height,
    });
  }
  totalPairs += items.length;
  result.push({ slug: cat.slug, label: cat.label, items });
  console.log(cat.dir, "->", items.length, "pairs done");
}

fs.writeFileSync(DATA_OUT, JSON.stringify(result, null, 2) + "\n");
console.log("TOTAL PAIRS PROCESSED:", totalPairs);
