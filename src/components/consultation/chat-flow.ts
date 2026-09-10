// 상담 문구와 선택지를 이 파일에서 수정하세요. 외부 챗봇 연결은 없습니다.
export const situations = [
  {
    id: "new",
    label: "입주를 앞두고 있어요",
    icon: "🏠",
    reply: "새집에서의 시작을 준비하고 계시군요. 입주 전 필요한 청소를 함께 살펴볼게요.",
    services: ["입주청소", "입주청소 + 추가 관리 상담"],
  },
  {
    id: "move",
    label: "이사를 앞두고 있어요",
    icon: "📦",
    reply: "이사 전 빈집 청소와 이사 후 정리가 필요한 부분을 구분하면 상담이 쉬워져요.",
    services: ["이사청소", "이사 후 부분청소"],
  },
  {
    id: "living",
    label: "지금 거주 중인 집이에요",
    icon: "🛋️",
    reply: "살고 있는 집은 짐과 가구가 있는 상태를 고려해 작업 범위를 확인해야 해요.",
    services: ["거주 공간 전체청소", "주방·욕실 부분청소", "원하는 구역 상담"],
  },
  {
    id: "interior",
    label: "인테리어를 마쳤어요",
    icon: "🛠️",
    reply: "공사 후 남은 분진과 오염, 마감재 상태를 확인하는 청소 상담을 도와드릴게요.",
    services: ["인테리어 후 청소", "공사한 구역 부분청소"],
  },
  {
    id: "shop",
    label: "매장 청소가 고민이에요",
    icon: "🏪",
    reply: "매장 업종과 영업시간, 바닥 재질에 맞춰 필요한 작업을 확인해 보세요.",
    services: ["매장 전체청소", "매장 바닥 관리", "정기관리 가능 여부 상담"],
  },
  {
    id: "office",
    label: "사무실 청소가 고민이에요",
    icon: "🏢",
    reply: "사무 공간과 공용 구역, 집기 배치를 기준으로 필요한 청소 범위를 정리해 볼게요.",
    services: ["사무실 전체청소", "사무실 바닥 관리", "정기관리 가능 여부 상담"],
  },
  {
    id: "family",
    label: "가족을 위해 공간관리를 하고 싶어요",
    icon: "💙",
    reply: "가족이 자주 사용하는 공간 중 신경 쓰이는 부분부터 골라 주세요.",
    services: ["생활 공간 청소", "주방·욕실 관리", "특정 오염 상담"],
  },
  {
    id: "travel",
    label: "여행을 앞두고 있어요",
    icon: "🧳",
    reply: "여행 전후 중 청소가 필요한 시점과 관리할 공간을 함께 정리해 보세요.",
    services: ["여행 전 정리·청소 상담", "여행 후 청소 상담"],
  },
  {
    id: "party",
    label: "집들이를 앞두고 있어요",
    icon: "🎉",
    reply: "손님을 맞이할 거실과 주방, 욕실을 중심으로 필요한 청소를 골라 보세요.",
    services: ["집들이 전 전체청소", "거실·주방·욕실 부분청소"],
  },
  {
    id: "pet",
    label: "반려동물이 있어요",
    icon: "🐾",
    reply: "털이나 얼룩처럼 신경 쓰이는 오염과 반려동물의 생활 공간을 상담 시 알려 주세요.",
    services: ["반려동물 생활 공간 청소", "얼룩·냄새 관련 상담"],
  },
] as const;
export type Choice = { value: string; label: string };
export type Prompt = {
  text: string;
  title: string;
  options: Choice[];
  note?: string;
};
const options = (labels: readonly string[]): Choice[] =>
  labels.map((label) => ({ value: label, label }));
export function getPrompt(answers: Choice[]): Prompt | null {
  const situation = situations.find((s) => s.id === answers[0]?.value);
  switch (answers.length) {
    case 0:
      return {
        title: "상황 선택",
        text: "안녕하세요, 찐청소입니다 😊\n어떤 상황에 맞는 청소를 찾고 계세요?",
        options: situations.map((s) => ({ value: s.id, label: s.label })),
      };
    case 1:
      return {
        title: "서비스 선택",
        text: situation?.reply || "필요한 서비스를 선택해 주세요.",
        note: "아래 항목은 상담 주제입니다. 실제 작업 가능 여부와 범위는 담당자 확인이 필요해요.",
        options: options([...(situation?.services || []), "어떤 서비스가 필요한지 상담받기"]),
      };
    case 2:
      return {
        title: "지역 선택",
        text: "청소가 필요한 곳은 어느 지역인가요?",
        note: "지역 선택만으로 방문 가능 여부가 확정되지는 않아요. 상세 주소는 전화 상담에서 알려 주세요.",
        options: options(["서울", "경기", "인천", "그 외 지역", "아직 정하지 않았어요"]),
      };
    case 3:
      return {
        title: "면적 선택",
        text: "공간의 전체 면적은 어느 정도인가요?",
        note: "대략적인 평수를 선택해도 괜찮아요.",
        options: options([
          "10평 미만",
          "10~19평",
          "20~29평",
          "30~39평",
          "40~49평",
          "50평 이상",
          "평수를 잘 모르겠어요",
        ]),
      };
    case 4:
      return {
        title: "일정 선택",
        text: "언제쯤 청소가 필요하세요?",
        note: "희망 시기만 정리하는 단계이며 예약은 확정되지 않아요.",
        options: options([
          "가능하면 빨리",
          "1주 이내",
          "2주 이내",
          "한 달 이내",
          "날짜를 상담하고 싶어요",
        ]),
      };
    default:
      return null;
  }
}
export function choose(answers: Choice[], value: string): Choice[] {
  const option = getPrompt(answers)?.options.find((o) => o.value === value);
  return option ? [...answers, option] : answers;
}
export function summaryText(answers: Choice[]): string {
  const labels = ["상황", "희망 서비스", "지역", "면적", "희망 시기"];
  return [
    "찐청소 상담 준비 내용",
    ...answers.map((a, i) => `${labels[i]}: ${a.label}`),
    "※ 아직 접수·예약되지 않았습니다. 작업 가능 여부와 금액은 상담 후 확인합니다.",
  ].join("\n");
}
export const chatFaq = [
  {
    question: "가격은 얼마인가요?",
    answer:
      "공간 면적, 오염 정도, 짐 유무와 작업 범위에 따라 달라져요. 선택형 상담에서 조건을 정리한 뒤 전화로 최종 견적을 확인해 주세요. 이 상담창에서는 확정 금액을 계산하지 않습니다.",
  },
  {
    question: "여기서 예약이 완료되나요?",
    answer:
      "아니요. 이곳은 필요한 서비스를 알아보고 상담 내용을 정리하는 자동안내입니다. 실제 예약은 찐청소 담당자와 날짜·금액·작업 범위를 확인한 후 진행해 주세요.",
  },
  {
    question: "작업 시간과 준비사항이 궁금해요",
    answer:
      "공간 크기와 작업 종류에 따라 시간이 달라져요. 상담 시 짐 유무, 출입 방법, 주차와 물·전기 사용 가능 여부를 알려 주시면 작업 준비에 도움이 됩니다.",
  },
  {
    question: "선택한 내용이 저장되나요?",
    answer:
      "선택 내용은 현재 화면에서만 사용하며 서버로 전송하거나 저장하지 않습니다. 새로고침하면 초기화돼요. 전화 연결 시에도 선택 내용이 자동으로 전달되지는 않습니다.",
  },
];
