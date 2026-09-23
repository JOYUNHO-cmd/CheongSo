import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel packages its own server output; standalone is for self-hosting.
  output: process.env.VERCEL ? undefined : "standalone",
  trailingSlash: true,
  async redirects() {
    // Preserve the old service URLs after their content was consolidated.
    return [
      ["/신축청소/", "/신축준공청소/"],
      ["/준공청소/", "/신축준공청소/"],
      ["/새집증후군-시공/", "/프리미엄청소/"],
    ].map(([source, destination]) => ({
      source: encodeURI(source),
      destination: encodeURI(destination),
      permanent: true,
    }));
  },
  // 모든 이미지가 이미 webp로 사전 최적화된 로컬 정적 파일이라 서버 측
  // 재처리가 불필요하고, Vercel 이미지 최적화 요청량 제한에 걸려 일부
  // 기기에서 이미지가 로드되지 않는 문제가 있어 최적화를 끈다.
  images: { unoptimized: true },
  /* config options here */
};

export default nextConfig;
