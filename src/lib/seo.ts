import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

export const defaultOgImage = {
  url: absoluteUrl("/videos/hero-poster.jpg"),
  alt: siteConfig.name,
};

// 페이지별 메타데이터(제목·설명·OG·canonical·키워드·저자)를 한 곳에서 일관되게 생성합니다.
// Next.js의 중첩 메타데이터는 덮어써지므로 이미지도 페이지마다 명시합니다.
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** 주제 분류용입니다. Google 검색 순위 신호로 사용되지 않습니다. */
  keywords?: string[];
  image?: { src: string; alt: string; width: number; height: number };
}): Metadata {
  const fullTitle = title.endsWith(`| ${siteConfig.name}`) ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = new URL(absoluteUrl(path));
  if (!canonicalUrl.pathname.endsWith("/")) canonicalUrl.pathname += "/";
  const canonical = canonicalUrl.href;
  const shareImage = image ? { url: absoluteUrl(image.src), alt: image.alt, width: image.width, height: image.height } : defaultOgImage;
  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type: "website",
      locale: "ko_KR",
      siteName: siteConfig.name,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
