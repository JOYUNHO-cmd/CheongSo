// 상단 표의 답변을 다시 쓰지 않고, 서비스별 질문과 상세 안내로 연결합니다.
const questions: Record<string, string> = {
  "사무실청소": "사무실 전체 청소, 어디까지 맡길 수 있을까요?",
  "정기청소": "얼마나 자주, 어느 구역을 관리하면 될까요?",
  "바닥청소": "이 얼룩은 세척으로 해결할 수 있을까요?",
  "바닥-왁스-코팅": "우리 바닥도 왁스코팅이 가능한가요?",
  "나노코팅": "포세린타일 바닥에 코팅이 필요할까요?",
  "침수청소": "물이 빠진 뒤, 어디부터 정리해야 할까요?",
  "쓰레기집청소": "수거부터 청소까지, 어디까지 맡기면 될까요?",
  "폐기물처리": "이 물건도 수거할 수 있을까요?",
  "유품정리": "무엇을 남기고 어떻게 정리할지부터 함께 확인합니다",
  "고독사청소": "현장 정리가 필요한 상황이라면, 진행 범위부터 확인하세요",
  "바닥-본드-제거": "본드 제거 후 바닥을 어떻게 사용하실 계획인가요?",
  "마루코팅": "우리 집 마루 상태에도 코팅이 맞을까요?",
  "콩자갈청소": "콩자갈 틈새의 오염, 어디까지 청소할 수 있을까요?",
  "석재청소": "화강석·대리석 얼룩, 세척할 부분과 손상된 부분을 구분하세요",
  "관공서청소": "운영에 맞춰 필요한 청소 구역부터 정해 보세요",
  "학교청소": "교실·복도 청소, 어떤 일정과 범위로 진행할까요?",
  "공장청소": "공장 내부와 설비, 어느 부분의 청소가 필요하신가요?",
  "주방청소": "기름때가 쌓인 주방, 어디까지 청소할까요?",
  "후드청소": "후드·필터·덕트 중 어디까지 작업할 수 있을까요?",
  "외벽청소": "외벽의 재질과 높이에 맞는 청소 범위를 확인하세요",
  "외창청소": "창밖 오염, 접근 가능한 범위부터 확인하세요",
  "입주청소": "입주 전에 어떤 구역을 청소하는지 먼저 확인하세요",
  "이사청소": "이삿짐 반입 전, 필요한 청소 범위를 확인하세요",
  "거주청소": "살고 있는 집도 필요한 구역부터 청소할 수 있을까요?",
  "신축준공청소": "공사가 끝나는 시점에 맞춰 청소 범위를 정해 보세요",
  "인테리어청소": "공사 후 남은 분진과 잔여물, 어디까지 정리할까요?",
  "프리미엄청소": "정밀청소와 냄새 관리, 내 공간에 필요한 작업은 무엇일까요?",
  "원룸청소": "빈방인지 생활 중인 방인지에 따라 범위를 확인하세요",
  "부분청소": "집 전체가 아니어도, 필요한 구역부터 확인하세요",
  "소독-방역": "소독과 해충 방제, 어떤 작업이 필요하신가요?",
  "냄새-악취-제거": "어디서 어떤 냄새가 나는지부터 살펴봅니다",
  "곰팡이제거": "보이는 곰팡이와 습기 원인, 무엇을 확인해야 할까요?",
  "행사장청소": "행사 전·중·후, 어느 단계의 청소가 필요하신가요?",
};

export type EntryGuide = { path: string; toc: readonly (readonly [string, string])[] };

export function ServiceEntryGuide({ path, toc }: EntryGuide) {
  const heading = questions[path.replace(/^\/+|\/+$/g, "")];
  if (!heading) return null;
  const evidence = toc.find(([id]) => ["cases", "photos", "results", "certificate"].includes(id));
  const links = [toc.find(([id]) => id === "scope"), toc.find(([id]) => id === "estimate"), evidence].filter(item => item !== undefined);
  return <div data-service-entry className="mt-5 mb-6 border-l-4 border-brand pl-4 sm:pl-5">
    <h3 className="text-lg font-bold text-brand-dark">{heading}</h3>
    <nav aria-label="처음 확인할 내용" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
      {links.map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">{label} →</a>)}
    </nav>
  </div>;
}
