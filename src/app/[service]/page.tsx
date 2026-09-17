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
import FloorWaxCoatingLanding from "@/components/service-pages/FloorWaxCoatingLanding";
import FloorWoodCoatingLanding from "@/components/service-pages/FloorWoodCoatingLanding";
import NanoCoatingLanding from "@/components/service-pages/NanoCoatingLanding";
import FloorCleaningLanding from "@/components/service-pages/FloorCleaningLanding";
import PebbleFloorCleaningLanding from "@/components/service-pages/PebbleFloorCleaningLanding";
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
    title: "사무실청소 비용·청소 범위·정기청소 안내 | 찐청소",
    description: "찐청소 사무실청소의 기본 범위와 견적 기준을 확인하세요. 집기와 바닥 코팅을 제외한 내부 청소부터 정기청소까지, 현장 상태와 필요한 인원·작업 시간에 맞춰 안내합니다.",
    component: () => <OfficeCleaningLanding />,
  },
  "화재청소": {
    title: "화재청소·화재복원 비용과 작업 범위 | 찐청소",
    description: "화재 잔여물 수거와 철거부터 그을음·냄새 제거, 복원 인테리어와 준공청소까지. 찐청소의 화재청소 견적 기준과 진행 절차를 확인하고 현장에 필요한 작업을 상담하세요.",
    component: () => <FireCleaningLanding />,
  },
  "침수청소": {
    title: "침수청소 비용·건조·소독·침수복구 안내 | 찐청소",
    description: "침수 후 남은 오염부터 건조·소독·냄새 제거까지, 찐청소의 기본 작업에 포함됩니다. 현장별 견적 기준과 진행 순서를 확인하세요. 필요한 철거와 복원도 별도 견적으로 연결해 진행합니다.",
    component: () => <FloodCleaningLanding />,
  },
  "쓰레기집청소": {
    title: "쓰레기집청소 비용·폐기물 처리·비대면 청소 | 찐청소",
    description: "쓰레기 수거와 폐기물 처리부터 청소·소독·냄새 제거까지. 찐청소의 쓰레기집청소 기본 범위와 견적 기준을 확인하세요. 비대면 진행이 가능하며, 상세한 작업 전후 사진을 전달해 드립니다.",
    component: () => <TrashHouseCleaningLanding />,
  },
  "유품정리": {
    title: "유품정리 비용·처리 범위·비대면 진행 안내 | 찐청소",
    description: "남길 유품과 정리할 물건을 구분하는 것부터 시작합니다. 찐청소는 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행하며, 비대면 진행과 상세한 작업 전후 사진 전달이 가능합니다.",
    component: () => <LegacyItemsCleaningLanding />,
  },
  "고독사청소": {
    title: "고독사청소 비용·유품정리·냄새 제거 안내 | 찐청소",
    description: "고독사 현장 청소와 유품정리를 안내합니다. 찐청소는 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행합니다. 비대면 진행과 상세한 전후 사진 전달이 가능하며, 철거·복원은 별도 견적으로 상담합니다.",
    component: () => <LonelyDeathCleaningLanding />,
  },
  "폐기물처리": {
    title: "폐기물처리 비용·수거·운반·비대면 안내 | 찐청소",
    description: "폐기물처리, 물건 사진과 위치부터 알려주세요. 찐청소가 직접 수집·운반하고 협력 처리업체와 연계합니다. 품목별 가능 여부와 비용을 안내하며, 비대면 진행과 작업 전후 사진 전달, 별도 청소 상담이 가능합니다.",
    component: () => <WasteDisposalLanding />,
  },
  "바닥본드제거": {
    title: "바닥본드제거 비용·데코타일·카펫 접착제 제거 | 찐청소",
    description: "바닥본드제거는 새 타일 시공용인지 기존 바닥 재사용용인지에 따라 작업 범위와 비용이 달라집니다. 찐청소는 마무리 세척을 기본으로 진행하며, 바닥재 철거는 별도 비용으로 안내합니다.",
    component: () => <FloorAdhesiveRemovalLanding />,
  },
  "바닥왁스코팅": {
    title: "바닥왁스코팅 비용·박리·건조 시간 안내 | 찐청소",
    description: "사무실·학원·상가 바닥왁스코팅, 바닥 재질과 기존 코팅 상태부터 확인하세요. 찐청소가 세척·박리 필요 여부, 견적 기준, 건조와 사용 재개 일정, 작업 후 관리 방법을 안내합니다.",
    component: () => <FloorWaxCoatingLanding />,
  },
  "마루코팅": {
    title: "마루코팅 비용·시공 가능 여부·관리 안내 | 찐청소",
    description: "마루코팅 전, 마루 종류와 기존 마감 상태부터 확인하세요. 찐청소가 시공 가능 여부, 세척과 코팅 범위, 견적 기준, 건조·가구 반입 일정과 작업 후 관리 방법을 안내합니다.",
    component: () => <FloorWoodCoatingLanding />,
  },
  "나노코팅": {
    title: "포세린타일 나노코팅 비용·바닥 청소·관리 안내 | 찐청소",
    description: "찐청소는 포세린타일 바닥 나노코팅을 전문으로 진행합니다. 기존 오염과 표면 상태를 확인해 세척·코팅 범위, 비용, 건조와 사용 재개 일정을 안내합니다. 유리·수전·상판 등 다른 부위는 시공하지 않습니다.",
    component: () => <NanoCoatingLanding />,
  },
  "바닥청소": {
    title: "바닥청소 비용·타일 세척·작업 범위 안내 | 찐청소",
    description: "닦아도 남는 바닥 찌든 때와 얼룩, 재질과 오염 상태부터 확인하세요. 찐청소가 바닥청소 범위와 견적 기준, 집기 이동과 작업 일정을 안내합니다. 코팅·본드 제거·보수는 필요한 경우 별도로 상담합니다.",
    component: () => <FloorCleaningLanding />,
  },
  "콩자갈청소": {
    title: "콩자갈청소 비용·바닥 세척·관리 안내 | 찐청소",
    description: "콩자갈 사이에 낀 먼지와 찌든 때, 바닥 상태부터 확인하세요. 찐청소가 오염과 자갈 고정 상태, 물 사용 여건을 확인해 세척 범위와 비용, 건조·영업 재개 일정을 안내합니다.",
    component: () => <PebbleFloorCleaningLanding />,
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
