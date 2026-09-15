import type { Metadata } from "next";
import { Noto_Sans_KR, Nanum_Brush_Script, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationBot from "@/components/consultation/ConsultationBot";
import MobileQuickContact from "@/components/MobileQuickContact";
import { siteUrl, absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

// 손글씨 로고/서명용 폰트를 next/font로 자체 호스팅해 렌더링 차단 요소(외부 @import)를 제거
const nanumBrush = Nanum_Brush_Script({
  variable: "--font-brush-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const nanumPen = Nanum_Pen_Script({
  variable: "--font-pen-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;
const defaultOgImage = { url: absoluteUrl("/videos/hero-poster.jpg"), width: 1920, height: 1080, alt: siteConfig.name };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: siteConfig.description,
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
  // 네이버 서치어드바이저에서 발급받은 소유 확인 코드를 NAVER_SITE_VERIFICATION 환경변수로 설정하면 자동 반영됩니다.
  ...(process.env.NAVER_SITE_VERIFICATION
    ? { verification: { other: { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION } } }
    : {}),
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
  areaServed: { "@type": "Country", name: "대한민국" },
  sameAs: [siteConfig.kakaoUrl].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${nanumBrush.variable} ${nanumPen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsultationBot />
        <MobileQuickContact />
      </body>
    </html>
  );
}
