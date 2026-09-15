import type { Metadata } from "next";
import { Noto_Sans_KR, Nanum_Brush_Script, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationBotLoader from "@/components/consultation/ConsultationBotLoader";
import MobileQuickContact from "@/components/MobileQuickContact";
import { siteUrl, absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import phaseRegions from "@/lib/phase-regions.json";

// 실제로 인프라가 갖춰진 서비스 지역(시/도)만 지역 검색 최적화용 데이터에 반영합니다.
const servedProvinces = [...new Set(phaseRegions.regions.map((r) => r.province))];

// 히어로 타이틀 등 최초 화면(LCP)에 실제로 쓰이는 굵기(700/900)만 우선 프리로드합니다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});
// 본문 등 저빈도 굵기(400/500)는 렌더링 차단 경로에서 빼기 위해 프리로드하지 않습니다.
const notoSansKrRegular = Noto_Sans_KR({
  variable: "--font-noto-sans-kr-regular",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

// 손글씨 로고/서명용 폰트를 next/font로 자체 호스팅해 렌더링 차단 요소(외부 @import)를 제거
// 최초 화면에 필수적이지 않은 장식 폰트라 프리로드는 끄고, 필요할 때 지연 로드되게 둡니다.
const nanumBrush = Nanum_Brush_Script({
  variable: "--font-brush-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});
const nanumPen = Nanum_Pen_Script({
  variable: "--font-pen-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;
const defaultOgImage = { url: absoluteUrl("/videos/hero-poster.jpg"), width: 1920, height: 1080, alt: siteConfig.name };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: siteConfig.description,
  keywords: ["찐청소", "청소업체", "입주청소", "이사청소", "특수청소", "바닥시공", "전국청소", "청소 견적", "위생관리"],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: siteUrl,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [defaultOgImage.url],
  },
  other: {
    "geo.region": "KR",
    "geo.placename": "대한민국",
  },
  verification: {
    google: "sClb7-Z59NfZqApNmnWpUSVUk55Opm6GqRAsWr161VU",
    // 네이버 서치어드바이저에서 발급받은 소유 확인 코드를 NAVER_SITE_VERIFICATION 환경변수로 설정하면 자동 반영됩니다.
    ...(process.env.NAVER_SITE_VERIFICATION
      ? { other: { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION } }
      : {}),
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteUrl,
  logo: absoluteUrl("/logo.png"),
  image: defaultOgImage.url,
  description: siteConfig.description,
  telephone: siteConfig.phoneRaw,
  priceRange: "$$",
  areaServed: servedProvinces.map((province) => ({ "@type": "AdministrativeArea", name: province })),
  founder: siteConfig.ceo ? { "@type": "Person", name: siteConfig.ceo } : undefined,
  sameAs: [siteConfig.kakaoUrl].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${notoSansKrRegular.variable} ${nanumBrush.variable} ${nanumPen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsultationBotLoader />
        <MobileQuickContact />
      </body>
    </html>
  );
}
