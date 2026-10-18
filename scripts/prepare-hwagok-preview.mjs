// User confirmed these are actual Hwagok photos. Classify by visible content, not filename.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = 'C:/Users/johyu/Desktop/사진들/쓰레기집/222886638037_서울 강서구 화곡동 8평 원룸 1인가구 쓰레기집 비대면 당일작업';
const output = path.resolve('public/images/regional-trash/hwagok-test');
const photos = [
  ['청소 전/008_eaab1d170d_가상시안_전_검토필요.jpg', 'room-before'],
  ['청소 후/022_05c1449877_가상시안_후_검토필요.jpg', 'room-after'],
  ['청소 전/028_1d4f08925b_가상시안_후_검토필요.jpg', 'bathroom-before'],
  ['청소 후/019_8a7e10ffb6_가상시안_후_검토필요.jpg', 'bathroom-after'],
];
await fs.mkdir(output, { recursive: true });
for (const [source, name] of photos) {
  const result = await sharp(path.join(root, source)).rotate().webp({ quality: 88 }).toFile(path.join(output, `${name}.webp`));
  console.log(name, result.width, result.height, result.size);
}
