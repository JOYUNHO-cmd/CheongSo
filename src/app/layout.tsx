import type { Metadata } from "next";
import { Noto_Sans_KR, Nanum_Brush_Script, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationBotLoader from "@/components/consultation/ConsultationBotLoader";
import MobileQuickContact from "@/components/MobileQuickContact";
import { siteUrl, absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { defaultOgImage } from "@/lib/seo";

// 한 패밀리 안에서 본문과 제목 굵기를 선택합니다. 분리하면 본문에도 700이 적용됩니다.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
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

const defaultTitle = `${siteConfig.name} | 입주·이사청소·사업장청소·특수청소·바닥시공`;
const defaultDescription = "찐청소의 입주·이사청소, 사업장청소, 특수청소, 바닥시공. 작업 범위·가격 기준·현장 사진을 확인하고 견적을 상담하세요.";
const clarityProjectId = "yo5g06xb3i";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
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
    description: defaultDescription,
    url: siteUrl,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage.url],
  },
  other: {
    "geo.region": "KR",
    "geo.placename": "대한민국",
  },
  verification: {
    google: "sClb7-Z59NfZqApNmnWpUSVUk55Opm6GqRAsWr161VU",
    other: {
      "naver-site-verification": [
        "fe4c8205531b56fe1f25b4ec59355e26caddc83b",
        "36e2b575b85f34bdbe15e6e05ac5afeb35c29eb2",
      ],
    },
  },
};

// 화면에 공개된 업체 정보와 동일한 값을 제공합니다. 미확인 영업시간·좌표는 넣지 않습니다.
// 지역 페이지 작성용 목록은 실제 출동 가능 지역의 증거로 사용하지 않습니다.
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteUrl,
  logo: absoluteUrl("/logo.png"),
  image: defaultOgImage.url,
  description: siteConfig.description,
  telephone: siteConfig.phoneRaw,
  email: siteConfig.email,
  address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressCountry: "KR" },
  areaServed: { "@type": "AdministrativeArea", name: "경기도" },
  identifier: { "@type": "PropertyValue", propertyID: "사업자등록번호", value: siteConfig.businessNumber },
  founder: siteConfig.ceo ? { "@type": "Person", name: siteConfig.ceo } : undefined,
  sameAs: [siteConfig.kakaoUrl].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${nanumBrush.variable} ${nanumPen.variable} h-full antialiased`}>
      <head>
        <script
          id="microsoft-clarity"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityProjectId}");`,
          }}
        />
      </head>
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
