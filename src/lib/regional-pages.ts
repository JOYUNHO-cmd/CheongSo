import records from "./regional-pages.json";
import importedRecords from "./regional-imports.json";
export type RegionalPage = {
  service: string; region: string; title: string; description: string; heading: string; intro: string;
  sections: { heading: string; body: string }[];
  media: { type: "image" | "video"; src: string; alt: string; caption: string; width?: number; height?: number; poster?: string }[];
  fieldCase?: {
    heading: string;
    lead: string;
    facts: [string, string][];
    steps: { heading: string; body: string; media?: string[] }[];
    note: string;
  };
  faq?: [string, string][];
  reviewed: boolean;
  publicationId?: string;
};
// prebuild/predev가 문서와 실제 미디어 파일을 검증한 뒤 승인된 외부 문서를
// 정적 JSON으로 준비합니다. public은 CDN에서 제공될 수 있으므로 서버 요청에서
// 로컬 파일을 조회하지 않습니다. 초안과 업로드 원본은 공개 데이터에 넣지 않습니다.
const allRecords = [...records, ...importedRecords] as RegionalPage[];
export const regionalPages = allRecords.filter(p => p.reviewed);
export const regionalPath = (page: Pick<RegionalPage, "service" | "region">) => `/${page.service}/${page.region}/`;
