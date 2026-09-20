import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import OfficeCleaningLanding from "@/components/service-pages/OfficeCleaningLanding";
import GovernmentCleaningLanding from "@/components/service-pages/GovernmentCleaningLanding";
import SchoolCleaningLanding from "@/components/service-pages/SchoolCleaningLanding";
import FactoryCleaningLanding from "@/components/service-pages/FactoryCleaningLanding";
import KitchenCleaningLanding from "@/components/service-pages/KitchenCleaningLanding";
import HoodCleaningLanding from "@/components/service-pages/HoodCleaningLanding";
import RegularCleaningLanding from "@/components/service-pages/RegularCleaningLanding";
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
import MoveInCleaningLanding from "@/components/service-pages/MoveInCleaningLanding";
import MovingCleaningLanding from "@/components/service-pages/MovingCleaningLanding";
import ResidentialCleaningLanding from "@/components/service-pages/ResidentialCleaningLanding";
import NewConstructionCleaningLanding from "@/components/service-pages/NewConstructionCleaningLanding";
import CompletionCleaningLanding from "@/components/service-pages/CompletionCleaningLanding";
import InteriorCleaningLanding from "@/components/service-pages/InteriorCleaningLanding";
import PremiumCleaningLanding from "@/components/service-pages/PremiumCleaningLanding";
import { serviceProfiles, findService, servicePath } from "@/lib/service-profiles";
import { serviceCategories } from "@/lib/services-data";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
// 목록 밖 주소는 아래 조회에서 404로 처리합니다. 한글 경로도 같은 조회를 거칩니다.
export const dynamicParams = true;
export function generateStaticParams() { return serviceProfiles.map(s => ({ service: s.slug })); }
type Props = { params: Promise<{ service: string }> };

// 상세 콘텐츠를 직접 작성한 서비스는 여기서 커스텀 메타데이터/컴포넌트로 분기합니다.
const customLandingPages: Record<string, { title: string; description: string; component: () => React.ReactElement }> = {
  "입주청소": {
    title: "입주청소 비용·청소 범위·예약 안내 | 찐청소",
    description: "찐청소 입주청소의 비용과 공간별 청소 범위를 안내합니다. 면적·현장 상태에 따른 견적 기준, 추가 비용 조건, 작업 절차와 이삿짐 반입 전 준비사항을 확인하고 희망 일정으로 상담하세요.",
    component: () => <MoveInCleaningLanding />,
  },
  "이사청소": {
    title: "이사청소 비용·청소 범위·당일 일정 안내 | 찐청소",
    description: "찐청소 이사청소의 비용과 공간별 작업 범위를 안내합니다. 기존 주택의 주방 기름때·욕실 물때·창틀 먼지를 확인하고, 퇴거와 이삿짐 반입 일정에 맞춰 견적을 상담하세요.",
    component: () => <MovingCleaningLanding />,
  },
  "거주청소": {
    title: "거주청소 비용·살고 있는 집 청소 범위·예약 안내 | 찐청소",
    description: "짐과 가구가 있는 집의 거주청소를 안내합니다. 찐청소가 주방·욕실·창틀·바닥의 오염과 접근 조건을 확인하고, 물품 이동 범위와 필요한 인원·작업 시간을 반영해 견적을 상담합니다.",
    component: () => <ResidentialCleaningLanding />,
  },
  "신축청소": {
    title: "신축청소 비용·준공청소 범위·공사 후 청소 안내 | 찐청소",
    description: "찐청소 신축청소의 비용과 작업 범위를 안내합니다. 공사 분진·마감 잔여물·보양재의 상태를 확인하고, 건물 내부와 공용부 등 요청 구역을 공사·인계 일정에 맞춰 상담합니다.",
    component: () => <NewConstructionCleaningLanding />,
  },
  "준공청소": {
    title: "준공청소 비용·공사 후 청소 범위·견적 안내 | 찐청소",
    description: "찐청소 준공청소의 비용과 작업 범위를 안내합니다. 공사 분진·보양재·마감 잔여물을 확인하고, 전용 공간과 공용부의 청소를 공정 종료·검수·인계 일정에 맞춰 상담합니다.",
    component: () => <CompletionCleaningLanding />,
  },
  "인테리어청소": {
    title: "인테리어청소 비용·리모델링 후 청소 범위 | 찐청소",
    description: "찐청소 인테리어청소의 비용과 작업 범위를 안내합니다. 전체·부분 리모델링 후 분진과 마감 잔여물, 남아 있는 가구와 생활 오염을 확인하고 입주·영업 일정에 맞춰 상담합니다.",
    component: () => <InteriorCleaningLanding />,
  },
  "프리미엄청소": {
    title: "프리미엄청소 비용·정밀청소·냄새 제거·새집증후군 관리 | 찐청소",
    description: "정밀청소부터 냄새 제거와 새집증후군 관리까지. 찐청소가 특허받은 약품과 장비를 활용해 공간 상태에 맞는 작업을 안내합니다. 서비스 구성과 비용, 작업 후 입주 일정을 확인하세요.",
    component: () => <PremiumCleaningLanding />,
  },
  "사무실청소": {
    title: "사무실청소 비용·청소 범위·정기청소 안내 | 찐청소",
    description: "찐청소 사무실청소의 기본 범위와 견적 기준을 확인하세요. 집기와 바닥 코팅을 제외한 내부 청소부터 정기청소까지, 현장 상태와 필요한 인원·작업 시간에 맞춰 안내합니다.",
    component: () => <OfficeCleaningLanding />,
  },
  "관공서청소": {
    title: "관공서청소 비용·청소 범위·정기관리 안내 | 찐청소",
    description: "찐청소 관공서청소의 견적 기준과 작업 범위를 안내합니다. 민원실·사무공간·복도·화장실 등 요청 구역을 확인하고, 기관 운영시간과 출입 조건에 맞춰 일회성 청소와 정기관리를 상담합니다.",
    component: () => <GovernmentCleaningLanding />,
  },
  "학교청소": {
    title: "학교청소 비용·교실 청소 범위·방학 대청소 안내 | 찐청소",
    description: "찐청소 학교청소의 비용 기준과 공간별 작업 범위를 안내합니다. 교실·복도·계단·화장실 청소부터 책걸상 작업과 바닥 코팅 구분까지, 학사 일정과 현장 상태에 맞춰 상담하세요.",
    component: () => <SchoolCleaningLanding />,
  },
  "공장청소": {
    title: "공장청소 비용·바닥·유니트쿨러·기계설비청소 | 찐청소",
    description: "공장 바닥의 기름때·분진부터 유니트쿨러 내부 세척과 기계설비청소까지. 찐청소가 설비 구조, 오염 상태, 생산 일정에 맞춰 작업 범위와 비용을 안내합니다.",
    component: () => <FactoryCleaningLanding />,
  },
  "주방청소": {
    title: "주방청소 비용·업소 기름때·청소 범위 안내 | 찐청소",
    description: "찐청소 업소 주방청소의 비용과 작업 범위를 안내합니다. 바닥·벽면·조리 공간의 기름때, 후드와 주방기기의 세척 범위를 확인하고 영업 일정에 맞춰 견적을 상담하세요.",
    component: () => <KitchenCleaningLanding />,
  },
  "후드청소": {
    title: "후드청소 비용·업소 주방 후드·필터 청소 안내 | 찐청소",
    description: "찐청소 업소용 후드청소의 비용과 작업 범위를 안내합니다. 후드 본체·필터·기름받이의 오염 상태를 확인하고, 덕트 작업과의 차이 및 영업 일정에 맞춘 청소를 상담하세요.",
    component: () => <HoodCleaningLanding />,
  },
  "정기청소": {
    title: "정기청소 비용·방문 주기·사무실·상가 관리 안내 | 찐청소",
    description: "찐청소 정기청소의 비용 기준과 방문 주기, 회차별 작업 범위를 안내합니다. 사무실·상가 등 공간의 이용 상태에 맞춰 필요한 인원과 작업 시간을 정하고 정기관리 견적을 상담하세요.",
    component: () => <RegularCleaningLanding />,
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
  return buildMetadata({ title, description, keywords, path: servicePath(s.name) });
}
export default async function Page({ params }: Props) {
  const s = findService((await params).service); if (!s) notFound();
  const custom = customLandingPages[s.name];
  if (custom) return custom.component();
  return <ServiceLanding service={s} />;
}
