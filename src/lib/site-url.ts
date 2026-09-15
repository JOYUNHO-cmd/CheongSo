// 실제 연결된 대표 도메인. SITE_URL 환경변수가 설정되어 있으면 그 값을 우선합니다.
export const siteUrl = (process.env.SITE_URL || "https://cheongso.co.kr").replace(/\/$/, "");
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
