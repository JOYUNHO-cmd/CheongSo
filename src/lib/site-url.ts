// 실제 배포의 리디렉션 목적지와 canonical·사이트맵을 일치시킵니다.
const configuredUrl = new URL(process.env.SITE_URL || "https://www.cheongso.co.kr");
if (configuredUrl.hostname === "cheongso.co.kr") configuredUrl.hostname = "www.cheongso.co.kr";
export const siteUrl = configuredUrl.origin;
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
