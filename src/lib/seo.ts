import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// 페이지별 메타데이터(제목·설명·OG·canonical·키워드·저자)를 한 곳에서 일관되게 생성합니다.
// openGraph.images는 지정하지 않으면 루트 레이아웃의 기본 이미지를 그대로 물려받습니다.
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  /** 페이지 주제와 직접 관련된 키워드만 소수(5~10개) 지정하세요. 남용 시 스팸으로 간주될 수 있습니다. */
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
