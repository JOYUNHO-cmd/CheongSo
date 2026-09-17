import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import OfficeCleaningLanding from "@/components/service-pages/OfficeCleaningLanding";
import FireCleaningLanding from "@/components/service-pages/FireCleaningLanding";
import FloodCleaningLanding from "@/components/service-pages/FloodCleaningLanding";
import TrashHouseCleaningLanding from "@/components/service-pages/TrashHouseCleaningLanding";
import LegacyItemsCleaningLanding from "@/components/service-pages/LegacyItemsCleaningLanding";
import LonelyDeathCleaningLanding from "@/components/service-pages/LonelyDeathCleaningLanding";
import WasteDisposalLanding from "@/components/service-pages/WasteDisposalLanding";
import FloorAdhesiveRemovalLanding from "@/components/service-pages/FloorAdhesiveRemovalLanding";
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
    title: "화재청소·화재복원 비용과 작업 범위 | 찐청소",
    description: "화재 잔여물 수거와 철거부터 그을음·냄새 제거, 복원 인테리어와 준공청소까지. 찐청소의 화재청소 견적 기준과 진행 절차를 확인하고 현장에 필요한 작업을 상담하세요.",
    component: () => <FireCleaningLanding />,
  },
  "침수청소": {
    title: "침수청소 비용·건조·소독·복원 안내 | 찐청소",
    description: "찐청소 침수청소는 건조·소독·냄새 제거까지 기본 비용에 포함됩니다. 필요한 인원과 장비·약품에 따른 견적 기준, 작업 범위와 진행 절차를 확인하세요. 철거와 복원 인테리어는 별도 견적으로 진행합니다.",
    component: () => <FloodCleaningLanding />,
  },
  "쓰레기집청소": {
    title: "쓰레기집청소 비용·폐기물 처리·비대면 청소 | 찐청소",
    description: "쓰레기 수거와 폐기물 처리부터 청소·소독·냄새 제거까지. 찐청소의 쓰레기집청소 기본 범위와 견적 기준을 확인하세요. 비대면 진행이 가능하며, 상세한 작업 전후 사진을 전달해 드립니다.",
    component: () => <TrashHouseCleaningLanding />,
  },
  "유품정리": {
    title: "유품정리 비용·폐기물 처리·비대면 진행 안내 | 찐청소",
    description: "찐청소 유품정리는 수거·폐기물 처리·청소·소독·냄새 제거까지 기본으로 포함합니다. 보관할 유품과 처리할 물품을 먼저 확인하며, 요청 시 비대면 진행과 상세한 전후 사진 전달이 가능합니다.",
    component: () => <LegacyItemsCleaningLanding />,
  },
  "고독사청소": {
    title: "고독사청소 비용·유품정리·특수청소 안내 | 찐청소",
    description: "찐청소 고독사청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 기본으로 포함합니다. 비대면 진행과 상세 전후 사진 전달이 가능하며, 필요한 철거·복원은 별도 견적으로 진행합니다.",
    component: () => <LonelyDeathCleaningLanding />,
  },
  "폐기물처리": {
    title: "폐기물처리 비용·가구 수거·이사폐기물 안내 | 찐청소",
    description: "찐청소는 폐기물을 직접 수집·운반하고 협업 처리업체와 연계해 처리합니다. 품목과 물량, 반출 조건에 따른 비용을 확인하세요. 반출 후 청소와 비대면 진행이 가능하며 상세한 전후 사진을 보내드립니다.",
    component: () => <WasteDisposalLanding />,
  },
  "바닥본드제거": {
    title: "바닥본드제거 비용·데코타일·카펫 접착제 제거 | 찐청소",
    description: "찐청소는 새 타일 시공 전 본드제거와 기존 바닥 재사용을 위한 접착제 제거를 진행합니다. 사용 목적과 바닥 상태에 따른 비용을 확인하세요. 마무리 세척은 기본 포함이며, 바닥재 철거는 기본 비용에서 제외됩니다.",
    component: () => <FloorAdhesiveRemovalLanding />,
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
