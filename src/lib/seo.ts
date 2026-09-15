import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// 페이지별 메타데이터(제목·설명·OG·canonical)를 한 곳에서 일관되게 생성합니다.
// openGraph.images는 지정하지 않으면 루트 레이아웃의 기본 이미지를 그대로 물려받습니다.
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      title: fullTitle,
      description,
    },
  };
}
