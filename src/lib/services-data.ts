export type ServiceCategory = {
  slug: string;
  number: string;
  title: string;
  description: string;
  items: string[];
};

// 개별 서비스 항목으로 바로 이동하기 위한 고유 앵커 id
export function itemAnchor(categorySlug: string, itemIndex: number) {
  return `${categorySlug}-${itemIndex}`;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "easy",
    number: "01",
    title: "간편청소",
    description: "혼자 하기 번거로운 생활 공간을 가볍게 정리해 드립니다.",
    items: ["원룸청소", "부분청소", "외창청소"],
  },
  {
    slug: "moving",
    number: "02",
    title: "이사·입주청소",
    description: "이사, 입주, 신축·준공 시점에 필요한 전문 인력의 꼼꼼한 청소입니다.",
    items: ["입주청소", "이사청소", "거주청소", "신축청소", "준공청소", "인테리어청소", "프리미엄청소"],
  },
  {
    slug: "commercial",
    number: "03",
    title: "사업장청소",
    description: "사무실, 관공서, 학교, 공장 등 다양한 사업장을 관리합니다.",
    items: ["사무실청소", "관공서청소", "학교청소", "공장청소", "주방청소", "후드청소"],
  },
  {
    slug: "hygiene",
    number: "04",
    title: "위생·방역케어",
    description: "눈에 보이지 않는 유해물질과 냄새까지 세심하게 관리합니다.",
    items: ["새집증후군 시공", "소독&방역", "냄새악취제거"],
  },
  {
    slug: "special",
    number: "05",
    title: "특수청소",
    description: "일반 청소로 해결되지 않는 특수한 상황을 전문적으로 처리합니다.",
    items: ["화재청소", "침수청소", "쓰레기집청소", "유품정리", "고독사청소", "폐기물처리"],
  },
  {
    slug: "exterior",
    number: "06",
    title: "외부·공간청소",
    description: "건물 외벽부터 행사 공간, 석재까지 폭넓게 관리합니다.",
    items: ["외벽청소", "행사장청소", "석재청소"],
  },
  {
    slug: "floor",
    number: "07",
    title: "바닥시공",
    description: "오염과 손상을 막고 바닥에 새 생명을 불어넣는 시공입니다.",
    items: ["바닥본드제거", "바닥왁스코팅", "마루코팅", "나노코팅", "바닥청소"],
  },
];
