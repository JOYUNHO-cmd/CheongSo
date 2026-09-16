import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import OfficeCleaningLanding from "@/components/service-pages/OfficeCleaningLanding";
import FireCleaningLanding from "@/components/service-pages/FireCleaningLanding";
import FloodCleaningLanding from "@/components/service-pages/FloodCleaningLanding";
import TrashHouseCleaningLanding from "@/components/service-pages/TrashHouseCleaningLanding";
import { serviceProfiles, findService, servicePath } from "@/lib/service-profiles";
import { serviceCategories } from "@/lib/services-data";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
// 목록 밖 주소는 아래 조회에서 404로 처리합니다. 한글 경로도 같은 조회를 거칩니다.
export const dynamicParams = true;
export function generateStaticParams() { return serviceProfiles.map(s => ({ service: s.slug })); }
type Props = { params: Promise<{ service: string }> };

// 상세 콘텐츠를 직접 작성한 서비스는 여기서 커스텀 메타데이터/컴포넌트로 분기합니다.
const customLandingPages: Record<string, { title: string; description: string; component: () => React.ReactElement }> = {
  "사무실청소": {
    title: "사무실청소 비용·범위·정기청소 견적 안내 | 찐청소",
    description: "찐청소 사무실청소는 집기와 바닥 코팅을 제외한 전체 내부를 기본으로 합니다. 필요한 인원과 장비·약품을 기준으로 산정하는 청소 비용, 정기청소 견적과 예약 절차를 안내합니다.",
    component: () => <OfficeCleaningLanding />,
  },
  "화재청소": {
    title: "화재청소·화재복원 비용과 진행 절차 | 찐청소",
    description: "찐청소는 화재 잔여물 수거와 피해 부분 철거부터 화재청소, 그을음·냄새 제거, 복원 인테리어와 준공청소까지 진행합니다. 현장별 작업 범위와 견적 기준, 복원 절차를 확인하세요.",
    component: () => <FireCleaningLanding />,
  },
  "침수청소": {
    title: "침수청소 비용·건조·소독·복원 안내 | 찐청소",
    description: "찐청소 침수청소는 건조·소독·냄새 제거까지 기본 비용에 포함됩니다. 필요한 인원과 장비·약품에 따른 견적 기준, 작업 범위와 진행 절차를 확인하세요. 철거와 복원 인테리어는 별도 견적으로 진행합니다.",
    component: () => <FloodCleaningLanding />,
  },
  "쓰레기집청소": {
    title: "쓰레기집청소 비용·폐기물 처리·비대면 청소 안내 | 찐청소",
    description: "찐청소 쓰레기집청소는 수거·폐기물 처리·소독·냄새 제거까지 기본으로 포함합니다. 요청 시 비대면 진행이 가능하며 상세한 청소 전후 사진을 보내드립니다. 작업 범위와 비용, 예약 절차를 확인하세요.",
    component: () => <TrashHouseCleaningLanding />,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findService((await params).service); if (!s) notFound();
  const custom = customLandingPages[s.name];
  const title = custom?.title ?? `${s.name} | 작업 범위·견적 안내 | 찐청소`;
  const description = custom?.description ?? s.intro;
  const category = serviceCategories.find(c => c.slug === s.category);
  const keywords = [s.name, `${s.name} 가격`, `${s.name} 비용`, `${s.name} 견적`, category?.title, siteConfig.name].filter((v): v is string => !!v);
  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    alternates: { canonical: absoluteUrl(servicePath(s.name)) },
    openGraph: { title, description, url: absoluteUrl(servicePath(s.name)), locale: "ko_KR", type: "website" },
  };
}
export default async function Page({ params }: Props) {
  const s = findService((await params).service); if (!s) notFound();
  const custom = customLandingPages[s.name];
  if (custom) return custom.component();
  return <ServiceLanding service={s} />;
}
