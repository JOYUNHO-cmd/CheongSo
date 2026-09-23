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
import NewConstructionCompletionCleaningLanding from "@/components/service-pages/NewConstructionCompletionCleaningLanding";
import InteriorCleaningLanding from "@/components/service-pages/InteriorCleaningLanding";
import PremiumCleaningLanding from "@/components/service-pages/PremiumCleaningLanding";
import StudioCleaningLanding from "@/components/service-pages/StudioCleaningLanding";
import PartialCleaningLanding from "@/components/service-pages/PartialCleaningLanding";
import ExteriorWindowCleaningLanding from "@/components/service-pages/ExteriorWindowCleaningLanding";
import DisinfectionCleaningLanding from "@/components/service-pages/DisinfectionCleaningLanding";
import OdorRemovalLanding from "@/components/service-pages/OdorRemovalLanding";
import MoldRemovalLanding from "@/components/service-pages/MoldRemovalLanding";
import ExteriorWallCleaningLanding from "@/components/service-pages/ExteriorWallCleaningLanding";
import EventCleaningLanding from "@/components/service-pages/EventCleaningLanding";
import StoneCleaningLanding from "@/components/service-pages/StoneCleaningLanding";
import { serviceProfiles, findService, servicePath } from "@/lib/service-profiles";
import { serviceCategories } from "@/lib/services-data";
import { buildMetadata } from "@/lib/seo";
import representativeImages from "@/lib/service-representative-images.json";
import { siteConfig } from "@/lib/site-config";
// 목록 밖 주소는 아래 조회에서 404로 처리합니다. 한글 경로도 같은 조회를 거칩니다.
export const dynamicParams = true;
export function generateStaticParams() { return serviceProfiles.map(s => ({ service: s.slug })); }
type Props = { params: Promise<{ service: string }> };

// 상세 콘텐츠를 직접 작성한 서비스는 여기서 커스텀 메타데이터/컴포넌트로 분기합니다.
const customLandingPages: Record<string, { title: string; description: string; component: () => React.ReactElement }> = {
  "원룸청소": {
    title: "원룸·오피스텔 청소 비용과 입주·퇴실 범위 | 찐청소",
    description: "입주 전 빈 원룸인지, 살고 있는 오피스텔인지, 퇴실 후 정리가 필요한 방인지 알려주세요. 찐청소는 주방 기름때, 욕실 물때, 창틀 먼지와 옵션 가전의 상태를 나눠 확인하고 필요한 작업을 안내합니다.",
    component: () => <StudioCleaningLanding />,
  },
  "부분청소": {
    title: "부분청소 비용·화장실·주방·창틀 선택 청소 | 찐청소",
    description: "집 전체는 괜찮은데 욕실 물때나 주방 기름때, 창틀 먼지가 신경 쓰이시나요? 찐청소는 필요한 구역을 지정해 오염과 재질을 살펴보고 작업 범위를 안내합니다. 집 전체 청소가 필요한지부터 고민하지 않으셔도 됩니다.",
    component: () => <PartialCleaningLanding />,
  },
  "외창청소": {
    title: "아파트·상가 유리창 외창청소 비용과 범위 | 찐청소",
    description: "아파트 베란다 유리가 뿌옇거나 상가 전면 유리에 빗물 자국이 남아 있나요? 찐청소는 창 구조와 접근 조건, 유리와 필름 상태를 확인한 뒤 바깥 면의 청소 가능 범위를 안내합니다.",
    component: () => <ExteriorWindowCleaningLanding />,
  },
  "소독&방역": {
    title: "소독·방역 비용·바퀴벌레·빈대·쥐 방제 | 찐청소",
    description: "벌레를 발견한 위치, 반복되는 시간과 공간 용도를 알려주세요. 소독업 신고를 마친 찐청소는 공간·표면 소독과 바퀴벌레·개미·빈대·모기, 쥐 방제를 구분해 상담합니다. 실제 진행한 소독 내용에 따른 소독증명서 발급도 가능합니다.",
    component: () => <DisinfectionCleaningLanding />,
  },
  "냄새악취제거": {
    title: "냄새·악취 제거 비용·담배·반려동물 냄새 상담 | 찐청소",
    description: "집에 밴 담배 냄새, 강아지·고양이 소변 냄새, 반복되는 실내 악취가 고민이신가요? 찐청소는 냄새가 느껴지는 위치와 오염된 소재, 발생 이력을 확인해 청소와 탈취 범위를 안내합니다.",
    component: () => <OdorRemovalLanding />,
  },
  "곰팡이제거": {
    title: "벽지·베란다 곰팡이제거 비용과 작업 범위 | 찐청소",
    description: "벽지 모서리, 베란다 창 주변이나 천장에 곰팡이가 다시 생기나요? 찐청소는 오염 범위와 마감재 상태, 누수·결로 이력을 확인해 제거 가능한 부분과 교체·보수가 필요한 부분을 나눠 안내합니다.",
    component: () => <MoldRemovalLanding />,
  },
  "외벽청소": {
    title: "건물 외벽청소 비용·석재·타일·패널 세척 | 찐청소",
    description: "창 아래 검은 줄과 외벽에 쌓인 먼지, 빗물 자국이 남아 있나요? 찐청소는 석재·타일·패널 등 마감재 상태와 건물 높이, 접근 조건을 확인해 작업 가능한 면과 세척 범위를 안내합니다.",
    component: () => <ExteriorWallCleaningLanding />,
  },
  "행사장청소": {
    title: "행사장청소 비용·전시·공연·행사 후 정리 | 찐청소",
    description: "전시장 부스 주변 먼지, 공연장 객석 아래 쓰레기, 취식 구역의 바닥 오염을 구역별로 확인합니다. 찐청소는 행사 전·종료 후 작업과 운영 중 관리 필요 여부를 나눠 상담하고, 철거와 대관 반납 일정에 맞춰 범위를 정합니다.",
    component: () => <EventCleaningLanding />,
  },
  "석재청소": {
    title: "대리석·화강석 청소 및 얼룩 제거 비용 | 찐청소",
    description: "닦아도 남는 대리석 얼룩, 부분적으로 짙어진 화강석 바닥이 고민이신가요? 찐청소는 석재 종류와 표면 마감, 오염 이력을 확인해 일반 세척과 별도 얼룩 처리 범위를 안내합니다.",
    component: () => <StoneCleaningLanding />,
  },
  "입주청소": {
    title: "입주청소 비용·신축 아파트·빌라 청소 범위 | 찐청소",
    description: "신축 아파트의 수납장 가루와 창틀 먼지, 욕실과 바닥에 남은 오염을 살펴 새 생활을 준비합니다. 찐청소는 입주할 집의 구조와 마감 상태를 확인하고, 기본 청소와 추가 요청을 구분해 안내합니다.",
    component: () => <MoveInCleaningLanding />,
  },
  "이사청소": {
    title: "이사청소 비용·빈집 기름때·욕실 물때 청소 | 찐청소",
    description: "이전 거주자가 사용하던 주방 기름때, 욕실 물때와 가구가 빠진 자리의 먼지를 살펴봅니다. 찐청소는 기존 거주자의 퇴거와 이삿짐 반입 사이에 작업 가능한 시간을 확인해 이사청소를 안내합니다.",
    component: () => <MovingCleaningLanding />,
  },
  "거주청소": {
    title: "거주청소 비용·살고 있는 집 대청소 범위 | 찐청소",
    description: "살고 있는 아파트나 주택의 주방 기름때, 욕실 물때, 가구 주변 먼지가 쌓였나요? 찐청소는 생활용품과 가구 배치를 고려해 접근 가능한 구역을 나누고, 물품 이동과 청소 범위를 먼저 정합니다.",
    component: () => <ResidentialCleaningLanding />,
  },
  "신축준공청소": {
    title: "신축준공청소 비용·건물 공사 분진·인계 청소 | 찐청소",
    description: "공사가 끝난 건물의 바닥·창틀 분진, 보양재와 마감 잔여물을 확인합니다. 찐청소는 실내 전용 공간과 복도·계단 등 공용부를 나눠 작업 범위를 정하고, 공정 종료와 검수·인계 일정에 맞춰 상담합니다.",
    component: () => <NewConstructionCompletionCleaningLanding />,
  },
  "인테리어청소": {
    title: "인테리어청소 비용·리모델링 후 공사 먼지 청소 | 찐청소",
    description: "주방·욕실·창호 공사 뒤 주변 방까지 먼지가 퍼졌거나, 리모델링 후 바닥과 수납장에 분진이 남았나요? 찐청소는 공사한 구역과 주변으로 오염이 번진 구역을 나눠 인테리어청소 범위를 안내합니다.",
    component: () => <InteriorCleaningLanding />,
  },
  "프리미엄청소": {
    title: "프리미엄청소·새집 냄새 제거·새집증후군 관리 | 찐청소",
    description: "신축 입주나 인테리어 이후 먼지뿐 아니라 새집 냄새도 신경 쓰이시나요? 찐청소 프리미엄청소는 정밀청소, 냄새 제거, 특허받은 약품과 장비를 활용한 새집증후군 관리를 함께 구성합니다. 현장별 적용 범위와 이용 재개 조건을 안내합니다.",
    component: () => <PremiumCleaningLanding />,
  },
  "사무실청소": {
    title: "사무실청소 비용·입주 대청소·바닥 분진 제거 | 찐청소",
    description: "이전할 사무실의 공사 먼지나 사용 중인 사무실 바닥의 묵은 때가 신경 쓰이시나요? 찐청소의 일회성 사무실청소는 집기와 바닥 코팅을 제외한 전체 내부가 기본입니다. 디퓨저, 창틀과 안전조치를 확인한 시스템박스·배전반 분진까지 세부 범위를 안내합니다.",
    component: () => <OfficeCleaningLanding />,
  },
  "관공서청소": {
    title: "관공서·공공기관 청소 비용과 청사 작업 범위 | 찐청소",
    description: "민원실 바닥의 보행 오염, 청사 복도·계단의 먼지와 화장실 청소를 구역별로 살펴봅니다. 찐청소는 기관 운영시간, 출입 절차와 담당 부서의 요구 범위를 확인해 일회성 대청소와 정기관리를 상담합니다.",
    component: () => <GovernmentCleaningLanding />,
  },
  "학교청소": {
    title: "학교청소 비용·교실·복도·방학 대청소 범위 | 찐청소",
    description: "교실 바닥의 묵은 때와 창틀 먼지, 복도·계단과 화장실 오염을 살펴 개학 준비에 필요한 범위를 정합니다. 찐청소는 책걸상 배치, 돌봄·방과후 운영과 교내 공사 일정을 고려해 학교청소를 안내합니다.",
    component: () => <SchoolCleaningLanding />,
  },
  "공장청소": {
    title: "공장청소 비용·바닥 기름때·유니트쿨러 세척 | 찐청소",
    description: "공장 바닥에 쌓인 기름때와 분진, 창고 통로 오염을 생산 일정에 맞춰 정리합니다. 찐청소는 유니트쿨러 내부·외부 세척과 기계설비청소도 상담하며, 공간 청소와 설비별 작업 비용을 나눠 안내합니다.",
    component: () => <FactoryCleaningLanding />,
  },
  "주방청소": {
    title: "업소·식당 주방청소 비용·기름때 제거 범위 | 찐청소",
    description: "닦아도 끈적이는 주방 바닥, 조리대와 벽면에 쌓인 기름때가 고민이신가요? 찐청소는 음식점·업소의 주방 구조와 기기 배치, 오염 상태를 확인하고 영업 일정에 맞춰 작업 범위를 안내합니다.",
    component: () => <KitchenCleaningLanding />,
  },
  "후드청소": {
    title: "업소용·식당 후드청소 비용·필터 기름때 제거 | 찐청소",
    description: "후드 표면의 끈적임과 필터에 쌓인 기름때, 기름받이 오염을 구분해 살펴봅니다. 찐청소는 업소용 주방 후드의 크기와 구조, 분리 가능한 부품을 확인하고 영업 종료·조리 준비 시간에 맞춰 청소를 상담합니다.",
    component: () => <HoodCleaningLanding />,
  },
  "정기청소": {
    title: "정기청소 비용·사무실·상가·계단 관리 | 찐청소",
    description: "사무실 바닥과 휴게 공간, 건물 계단과 화장실처럼 자주 쓰는 구역을 주기적으로 관리합니다. 찐청소는 필요한 인원과 작업 시간, 방문 횟수를 기준으로 매회 작업과 주기별 집중 청소를 나눠 안내합니다.",
    component: () => <RegularCleaningLanding />,
  },
  "화재청소": {
    title: "화재청소·복구 비용·그을음과 탄 냄새 제거 | 찐청소",
    description: "화재가 난 방이나 주방뿐 아니라 주변 공간에 번진 그을음과 탄 냄새도 함께 확인해야 합니다. 찐청소는 현장 출입과 안전조치가 확인된 뒤 잔여물 수거, 청소, 필요한 철거·복원과 마무리 청소를 연결해 상담합니다.",
    component: () => <FireCleaningLanding />,
  },
  "침수청소": {
    title: "침수청소 비용·반지하·상가 건조와 소독 | 찐청소",
    description: "물이 빠진 뒤에도 바닥에 오염이 남고 벽과 가구가 젖어 있나요? 찐청소 침수청소는 침수 오염 청소에 건조·소독·냄새 제거를 기본으로 포함합니다. 피해 소재와 현장 상태를 보고 필요한 철거·복원은 별도 견적으로 안내합니다.",
    component: () => <FloodCleaningLanding />,
  },
  "쓰레기집청소": {
    title: "쓰레기집청소 비용·원룸 정리·폐기물 처리 | 찐청소",
    description: "원룸이나 집 안에 쓰레기와 생활용품이 쌓여 어디부터 정리할지 막막하신가요? 찐청소는 보관할 물건을 먼저 확인하고 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행합니다. 요청 시 비대면 진행과 상세한 작업 전후 사진 전달이 가능합니다.",
    component: () => <TrashHouseCleaningLanding />,
  },
  "유품정리": {
    title: "유품정리 비용·집 정리·수거와 청소 안내 | 찐청소",
    description: "고인이 생활하시던 집의 옷과 가구, 서류를 어디서부터 정리해야 할지 고민되실 수 있습니다. 찐청소는 권한 있는 의뢰인과 보관·처리 기준을 정하고, 수거·폐기물 처리·청소·소독·냄새 제거를 함께 진행합니다.",
    component: () => <LegacyItemsCleaningLanding />,
  },
  "고독사청소": {
    title: "고독사 특수청소 비용·오염·냄새 제거 안내 | 찐청소",
    description: "현장 출입과 작업 가능 여부를 확인한 뒤 남겨진 물품과 오염 구역을 살펴봅니다. 찐청소는 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행하며, 자재 철거·복원이 필요한 경우 별도 비용을 안내합니다.",
    component: () => <LonelyDeathCleaningLanding />,
  },
  "폐기물처리": {
    title: "폐기물처리 비용·가구 수거·사무실 물품 정리 | 찐청소",
    description: "이사 후 남은 가구나 사무실 정리 중 나온 물품을 처리해야 하나요? 찐청소는 수거 대상과 물량을 확인해 직접 수집·운반하고, 종류에 맞는 협력 처리업체와 연계합니다. 반출 조건과 처리 비용을 구분해 안내합니다.",
    component: () => <WasteDisposalLanding />,
  },
  "바닥본드제거": {
    title: "바닥본드제거 비용·데코타일·장판 접착제 제거 | 찐청소",
    description: "바닥재를 걷어낸 뒤 본드와 끈적이는 접착제가 남았나요? 찐청소는 새 타일을 시공할 바탕인지 기존 바닥을 다시 사용할 것인지 먼저 확인합니다. 협의한 본드 제거와 마무리 세척은 기본이며, 바닥재 철거는 별도입니다.",
    component: () => <FloorAdhesiveRemovalLanding />,
  },
  "바닥왁스코팅": {
    title: "바닥왁스코팅 비용·데코타일 세척·박리 안내 | 찐청소",
    description: "사무실이나 학원 바닥을 닦아도 칙칙하거나 기존 왁스에 때가 겹쳐 보이나요? 찐청소는 바닥 재질과 기존 피막 상태를 살펴 세척·박리 필요 여부와 코팅 범위를 나눠 안내합니다.",
    component: () => <FloorWaxCoatingLanding />,
  },
  "마루코팅": {
    title: "마루코팅 비용·강마루·강화마루 적용 안내 | 찐청소",
    description: "마루가 칙칙해졌거나 표면 관리가 필요해 코팅을 고민하고 계신가요? 찐청소는 마루 종류와 제조사 관리 기준, 기존 마감과 손상 상태를 확인해 적용 가능 여부를 안내합니다.",
    component: () => <FloorWoodCoatingLanding />,
  },
  "나노코팅": {
    title: "포세린타일 바닥 나노코팅 비용과 시공 범위 | 찐청소",
    description: "포세린타일 바닥을 닦아도 발자국과 얼룩이 남아 코팅을 고민하고 계신가요? 찐청소 나노코팅은 포세린타일 바닥 전문입니다. 오염 원인과 기존 코팅, 제품 적합성을 확인해 필요한 세척과 시공 범위를 안내합니다.",
    component: () => <NanoCoatingLanding />,
  },
  "바닥청소": {
    title: "바닥청소 비용·데코타일·포세린타일 세척 | 찐청소",
    description: "사무실 데코타일의 묵은 때, 매장 타일의 발자국과 줄눈 오염이 고민이신가요? 찐청소는 바닥 재질과 기존 코팅, 집기 배치를 확인해 세척 범위와 필요한 작업을 안내합니다.",
    component: () => <FloorCleaningLanding />,
  },
  "콩자갈청소": {
    title: "콩자갈 바닥청소 비용·카페·매장 오염 세척 | 찐청소",
    description: "콩자갈 틈에 먼지와 음료 오염이 남거나 출입구 주변이 짙어졌나요? 찐청소는 자갈 고정 상태, 기존 마감과 실내외 환경을 확인해 세척 가능한 범위와 마무리 방법을 안내합니다.",
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
  const image = (representativeImages as Record<string, { src: string; alt: string; width: number; height: number }>)[s.slug];
  return buildMetadata({ title, description, keywords, path: servicePath(s.name), image });
}
export default async function Page({ params }: Props) {
  const s = findService((await params).service); if (!s) notFound();
  const custom = customLandingPages[s.name];
  if (custom) return custom.component();
  return <ServiceLanding service={s} />;
}
