import { serviceProfiles, type ServiceProfile } from './service-profiles';

// 검색 제목과 화면 제목을 같은 서비스 어휘로 관리합니다.
const topics: Record<string, string> = {
  '원룸청소': '원룸·오피스텔 입주와 퇴실 정리',
  '부분청소': '주방·욕실·창틀 선택 청소',
  '외창청소': '아파트·상가 바깥 유리 세척',
  '입주청소': '신축 아파트·빌라 입주 준비',
  '이사청소': '빈집 주방·욕실 묵은 때 제거',
  '거주청소': '생활 중인 집의 주방·욕실 대청소',
  '신축준공청소': '공사 분진 제거와 건물 인계 준비',
  '인테리어청소': '리모델링 후 분진과 마감 잔여물 정리',
  '프리미엄청소': '정밀청소와 새집 냄새 관리',
  '사무실청소': '사무실 입주 대청소와 분진 제거',
  '상가청소': '매장 오염 세척과 입점·퇴거 정리',
  '관공서청소': '공공기관 청사·민원실 대청소',
  '학교청소': '교실·복도 방학 대청소',
  '공장청소': '바닥 기름때·분진과 설비 세척',
  '주방청소': '식당 바닥·벽면·조리대 기름때 제거',
  '후드청소': '업소 후드·필터 기름때 세척',
  '정기청소': '사무실·상가 주기별 청결 관리',
  '소독&방역': '공간 소독과 해충 방제',
  '냄새악취제거': '담배·반려동물 냄새와 원인 오염 관리',
  '곰팡이제거': '벽지·베란다 오염과 습기 원인 확인',
  '화재청소': '그을음·탄 냄새 제거와 복구 상담',
  '특수청소': '화재·침수·적치 오염별 작업 상담',
  '침수청소': '침수 오염 세척·건조·소독',
  '쓰레기집청소': '폐기물처리·바닥청소와 소독',
  '유품정리': '보관 물품 분류와 수거·청소',
  '고독사청소': '현장 인계 후 오염 정리·소독·탈취',
  '폐기물처리': '가구·집기 수거와 반출',
  '외벽청소': '건물 석재·타일·패널 세척',
  '행사장청소': '행사 전후 정리와 대관 반납 준비',
  '석재청소': '대리석·화강석 오염 세척',
  '바닥본드제거': '철거 후 접착제 제거와 마무리 세척',
  '바닥왁스코팅': '바닥 세척·왁스 박리와 재코팅',
  '마루코팅': '마루 재질과 기존 마감에 맞춘 코팅',
  '나노코팅': '포세린타일 바닥 세척과 코팅',
  '콩자갈청소': '카페·매장 바닥 틈새 오염 세척',
  '바닥청소': '데코타일·타일 묵은 때 세척',
};

export const specialService: ServiceProfile = {
  name: '특수청소', slug: '특수청소', category: 'special',
  headline: '특수청소, 현장 상황에 맞는 작업부터 확인합니다',
  intro: '화재·침수 피해나 쓰레기 적치, 유품정리와 고독사 현장의 오염을 상황별로 상담합니다. 현장 출입 가능 여부와 보관할 물품을 먼저 확인하고 필요한 청소와 처리 범위를 정합니다.',
  scope: ['현장 상황과 출입 조건 확인', '보관·처리할 물품과 오염 구역 구분', '상황에 맞는 청소·소독·냄새 제거 상담'],
  check: '오염 종류, 피해 범위, 물품량, 출입·반출 조건',
  limitation: '안전 점검과 현장 인계가 필요한 경우 관련 절차를 먼저 확인합니다. 철거·복원과 폐기물 처리의 포함 여부는 선택한 서비스와 현장별 견적에서 구분합니다.',
};

export function serviceLead(keyword: string, original: string) {
  return original.startsWith(keyword) ? original : `${keyword}, ${original}`;
}

export function serviceSearchCopy(service: ServiceProfile | string, regionLabel?: string) {
  const s = typeof service === 'string'
    ? [...serviceProfiles, specialService].find(item => item.name === service)
    : service;
  if (!s) throw new Error(`서비스 카피를 찾을 수 없습니다: ${service}`);
  const keyword = regionLabel ? `${regionLabel} ${s.name}` : s.name;
  const topic = topics[s.name];
  if (!topic) throw new Error(`서비스 검색 주제가 없습니다: ${s.name}`);
  return {
    keyword,
    title: `${keyword} ${topic}·비용·견적 | 찐청소`,
    heading: `${keyword}, ${topic}`,
    intro: serviceLead(keyword, s.intro),
    description: `${keyword} ${topic} 안내. ${s.check}에 따라 ${s.name}비용과 작업 범위를 확인하고, 현장 사진과 희망 일정으로 ${s.name}견적을 상담합니다.`,
  };
}
