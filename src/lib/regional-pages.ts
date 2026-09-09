import records from "./regional-pages.json";
import regions from "./phase-regions.json";
import { findService } from "./service-profiles";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
export type RegionalPage = {
  service: string; region: string; title: string; description: string; heading: string; intro: string;
  sections: { heading: string; body: string }[];
  media: { type: "image" | "video"; src: string; alt: string; caption: string }[];
  reviewed: boolean;
  publicationId?: string;
};
const directory = resolve("content/regional");
const imported: RegionalPage[] = existsSync(directory) ? readdirSync(directory).filter(f => /^[a-f0-9]{64}\.json$/.test(f)).map(f => JSON.parse(readFileSync(resolve(directory, f), "utf8"))) : [];
const allRecords = [...records, ...imported] as RegionalPage[];
// 공개용 데이터만 읽습니다. 관리자 초안이나 업로드 원본은 이 파일에 연결하지 않습니다.
const seen = new Set<string>();
for (const page of allRecords) {
  const key = `${page.service}/${page.region}`;
  if (seen.has(key)) throw new Error(`중복 지역 주소: ${key}. 새 문서를 추가하지 말고 기존 문서를 갱신하세요.`);
  seen.add(key);
  if (!findService(page.service) || !regions.regions.some(r => r.region === page.region)) throw new Error(`현재 서비스·지역 범위 밖의 문서: ${key}`);
  if (typeof page.reviewed !== "boolean") throw new Error(`검토 상태 누락: ${key}`);
  if (!page.reviewed) continue;
  if (![page.title, page.description, page.heading, page.intro].every(v => typeof v === "string" && v.trim()) || !Array.isArray(page.sections) || !page.sections.length || page.sections.some(s => !s.heading?.trim() || !s.body?.trim())) throw new Error(`지역 문서 내용 누락: ${key}`);
  if (!Array.isArray(page.media)) throw new Error(`미디어 목록 누락: ${key}`);
  for (const media of page.media) {
    const pattern = media.type === "image" ? /^\/images\/[\p{L}\p{N}_/.-]+\.(webp|jpg|jpeg|png)$/u : media.type === "video" ? /^\/videos\/[\p{L}\p{N}_/.-]+\.(mp4|webm)$/u : null;
    if (!pattern?.test(media.src) || media.src.includes("..") || !media.alt?.trim() || !media.caption?.trim() || !existsSync(resolve("public", `.${media.src}`))) throw new Error(`미디어 파일 또는 설명 확인 필요: ${key}`);
  }
}
export const regionalPages = allRecords.filter(p => p.reviewed);
export const regionalPath = (page: Pick<RegionalPage, "service" | "region">) => `/${page.service}/${page.region}/`;
