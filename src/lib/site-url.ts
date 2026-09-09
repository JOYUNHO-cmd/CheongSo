// 실제 연결된 대표 도메인만 지정합니다. 예시 도메인 cheongso.kr은 연결 후 변경합니다.
export const siteUrl = (process.env.SITE_URL || "https://cheong-so.vercel.app").replace(/\/$/, "");
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
