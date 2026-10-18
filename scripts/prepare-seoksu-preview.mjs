// Only encode selected local originals into website copies; never change source files.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = 'C:/Users/johyu/Desktop/사진들/쓰레기집/222882518709_안양 쓰레기집 청소 바쁘신 직장인을 위한 당일처리 서비스';
const output = path.resolve('public/images/regional-trash/seoksu-test');
const photos = [
  ['청소 전/007_living_전_hanjip_anyang_c38034bb.png', 'room-before'],
  ['청소 후/023_living_후_hanjip_anyang_c38034bb.png', 'room-after'],
  ['청소 전/005_bathroom_전_hanjip_anyang_c38034bb.png', 'bathroom-before'],
  ['청소 후/018_bathroom_후_hanjip_anyang_c38034bb.png', 'bathroom-after'],
  ['청소 전/013_fridge_전_hanjip_anyang_c38034bb.png', 'fridge-before'],
  ['청소 후/022_fridge_후_hanjip_anyang_c38034bb.png', 'fridge-after'],
];
await fs.mkdir(output, { recursive: true });
for (const [source, name] of photos) {
  const result = await sharp(path.join(root, source)).rotate().webp({ quality: 88 }).toFile(path.join(output, `${name}.webp`));
  console.log(name, result.width, result.height, result.size);
}
