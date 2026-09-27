import gallery from "@/lib/gallery-data.json";

export type AreaCasePhoto = { label: string; src: string; alt: string; width: number; height: number; position?: string };
export type AreaCase = {
  href: string;
  province: string;
  region: string;
  service: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  photos: AreaCasePhoto[];
};

// 광역 → 시·군 → 서비스 순서는 아래 목록에 처음 나온 순서를 따른다.
// 새 사례는 areaCases에 한 줄 추가하면 선택지와 건수가 자동으로 반영된다.

const waxPhoto = gallery.find(category => category.slug === "floor-wax")!.items.find(item => item.id === "floor-wax-g28")!;
const pair = (labels: readonly [string, string], srcs: readonly [string, string], alt: string): AreaCasePhoto[] =>
  labels.map((label, i) => ({ label, src: srcs[i], alt: `${alt} · ${label}`, width: 900, height: 1200 }));
const beforeAfter = ["작업 전", "작업 후"] as const;
const caseEyebrow = "실제 작업 사례 · 비용과 견적 기준";

export const areaCases: AreaCase[] = [
  {
    href: "/바닥-왁스-코팅/경기도-안양시/", province: "경기도", region: "안양시", service: "바닥왁스코팅",
    eyebrow: "실제 작업 사진 · 비용과 견적 기준", title: "안양 바닥왁스코팅",
    body: "학원·음식점·업무시설·사무실의 작업 전후 사진을 확인하세요. 한식뷔페 현장에서 두꺼운 왁스를 박리하고 집기를 나눠 옮기며 작업한 과정도 담았습니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: [
      { label: "작업 전", src: `/images/gallery-v2/${waxPhoto.before}`, alt: `${waxPhoto.title} · 작업 전`, width: waxPhoto.beforeWidth, height: waxPhoto.beforeHeight },
      { label: "작업 후", src: `/images/gallery-v2/${waxPhoto.after}`, alt: `${waxPhoto.title} · 작업 후`, width: waxPhoto.afterWidth, height: waxPhoto.afterHeight },
    ],
  },
  {
    href: "/주방청소/경기도-안양시/", province: "경기도", region: "안양시", service: "주방청소",
    eyebrow: "실제 작업 사진 · 작업 범위와 견적 기준", title: "안양 주방청소",
    body: "배달 돈까스 주방의 튀김기·후드·기기 아래 사진을 살펴보세요. 내부 세척과 기기 이동 등 별도 확인 항목, 견적 조건과 상담 준비사항을 안내합니다.",
    cta: "안양 주방 사진과 견적 기준 보기",
    photos: [
      { label: "튀김기", src: "/images/anyang-kitchen/003.jpg", alt: "튀김기 테두리와 안쪽 벽면에 갈색·검은색 오염이 보이는 모습", width: 4000, height: 2252 },
      { label: "후드 안쪽", src: "/images/anyang-kitchen/004.jpg", alt: "후드 안쪽 판과 원형 배기구 주변에 점상 오염과 흘러내린 자국이 보이는 모습", width: 1440, height: 1081, position: "25% 50%" },
    ],
  },
  {
    href: "/바닥-왁스-코팅/경기도-성남시-분당구/", province: "경기도", region: "분당구", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "분당 바닥왁스코팅",
    body: "왁스가 고르게 자리 잡기 까다로운 회색 데코타일 사무실을 6명이 9시간 동안 세척하고 코팅한 기록입니다.",
    cta: "분당 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional-wax/bundang/01-floor-before.webp", "/images/regional-wax/bundang/06-wax-after.webp"], "분당 데코타일 사무실 바닥왁스코팅"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-성남시/", province: "경기도", region: "성남시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "성남 바닥왁스코팅",
    body: "의자 바퀴자국과 사용 오염이 심했던 100평 지식산업센터 디럭스타일을 3명이 8시간 동안 퇴거청소하고 코팅한 기록입니다.",
    cta: "성남 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional-wax/seongnam/01-wheel-marks-before.webp", "/images/regional-wax/seongnam/06-wax-after.webp"], "성남 지식산업센터 바닥왁스코팅"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-성남시-판교/", province: "경기도", region: "판교", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "판교 바닥왁스코팅",
    body: "돌타일처럼 보이는 데코타일의 상당한 바닥오염을 약품으로 제거하고 3명이 6시간 동안 은은하게 코팅한 기록입니다.",
    cta: "판교 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional-wax/pangyo/02-contamination-before.webp", "/images/regional-wax/pangyo/06-wax-after.webp"], "판교 데코타일 바닥왁스코팅"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-과천시/", province: "경기도", region: "과천시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "과천 바닥왁스코팅",
    body: "지식산업센터 바닥까지 날린 붉은 페인트를 제거하면서 3명이 7시간 동안 왁스코팅까지 진행한 기록입니다.",
    cta: "과천 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional-wax/gwacheon/01-red-paint-before.webp", "/images/regional-wax/gwacheon/06-wax-after.webp"], "과천 지식산업센터 페인트 제거와 바닥왁스코팅"),
  },
  {
    href: "/인테리어청소/경기도-과천시/", province: "경기도", region: "과천시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "과천 인테리어청소",
    body: "술집 주방의 기름때와 흡연실 니코틴 오염을 확인하며 3명이 9시간 동안 작업한 기록입니다.",
    cta: "과천 술집 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/gwacheon-interior/02-kitchen-floor-before.webp", "/images/gwacheon-interior/04-kitchen-after.webp"], "과천 술집 인테리어청소"),
  },
  {
    href: "/상가청소/경기도-의왕시/", province: "경기도", region: "의왕시", service: "상가청소",
    eyebrow: caseEyebrow, title: "의왕 상가청소",
    body: "내손동 상가의 공사 분진과 바닥·창가·유리 구역을 나누어 3명이 9시간 동안 복원청소한 기록입니다.",
    cta: "의왕 내손동 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/uiwang-store/01-open-area-before.webp", "/images/uiwang-store/02-open-area-after.webp"], "의왕시 내손동 상가 복원청소"),
  },
  {
    href: "/쓰레기집청소/경기도-안양시/", province: "경기도", region: "안양시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "안양 쓰레기집청소",
    body: "장기간 방치된 만안구 다세대주택에서 4명이 8시간 동안 폐기물 반출부터 청소·냄새 제거·소독까지 진행한 기록입니다. 청소로 해결되지 않은 벽지 얼룩까지 그대로 담았습니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/anyang-trash-house-01.webp", "/images/regional/anyang-trash-house-06.webp"], "안양 만안구 다세대주택 쓰레기집청소"),
  },
  {
    href: "/신축준공청소/경기도-안양시/", province: "경기도", region: "안양시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "안양 준공청소",
    body: "새 입주 전 명학역 인근 상가를 3명이 6시간 동안 천장·창틀·유리 칸막이 양면·바닥까지 청소한 기록입니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/anyang-completion-02.webp", "/images/regional/anyang-completion-09.webp"], "안양 명학역 인근 상가 준공청소"),
  },
  {
    href: "/신축준공청소/경기도-안산시/", province: "경기도", region: "안산시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "안산 준공청소",
    body: "상록구 한대앞역 인근 20평 복층 식당 옥된장을 2명이 8시간 동안 지붕구조 분진 제거부터 정문 유리까지 청소한 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-shop-02.webp", "/images/regional/ansan-shop-11.webp"], "안산 상록구 옥된장 준공청소"),
  },
  {
    href: "/바닥-본드-제거/경기도-안산시/", province: "경기도", region: "안산시", service: "바닥본드제거",
    eyebrow: caseEyebrow, title: "안산 바닥본드제거",
    body: "단원구 상가건물 계단에서 카펫을 걷어낸 뒤 남은 본드를 2~3명이 8시간 동안 제거하고 세척까지 마친 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-bond-01.webp", "/images/regional/ansan-bond-06.webp"], "안산 단원구 상가 계단 본드제거"),
  },
  {
    href: "/신축준공청소/경기도-의왕시/", province: "경기도", region: "의왕시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "의왕 준공청소",
    body: "청계동 골프연습장을 3~4명이 8시간 동안 보양재 제거부터 수납장·콘센트 주변·바닥까지 정리한 준공청소 기록입니다.",
    cta: "의왕 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/uiwang-golf-02.webp", "/images/regional/uiwang-golf-10.webp"], "의왕 청계동 골프연습장 준공청소"),
  },
  {
    href: "/신축준공청소/경기도-군포시/", province: "경기도", region: "군포시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "군포 준공청소",
    body: "송정지구 피트니스센터를 3~4명이 8시간 동안 바닥 시멘트 얼룩 제거부터 샤워실·사물함·외창까지 정리한 준공청소 기록입니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-gym-01.webp", "/images/regional/gunpo-gym-07.webp"], "군포 송정지구 피트니스센터 준공청소"),
  },
  {
    href: "/신축준공청소/경기도-수원시/", province: "경기도", region: "수원시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "수원 준공청소",
    body: "인계동 카페를 3~4명이 8시간 동안 바닥 시멘트 자국 제거부터 벽 타일·전기 분전반·유리까지 정리한 준공청소 기록입니다.",
    cta: "수원 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/suwon-cafe-01.webp", "/images/regional/suwon-cafe-09.webp"], "수원 인계동 카페 준공청소"),
  },
  {
    href: "/신축준공청소/경기도-용인시/", province: "경기도", region: "용인시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "용인 준공청소",
    body: "수지구 오피스를 3~4명이 8시간 동안 바닥 타일 이음새부터 창틀·환기 필터·소화기까지 정리한 준공청소 기록입니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-office-01.webp", "/images/regional/yongin-office-09.webp"], "용인 수지구 오피스 준공청소"),
  },
  {
    href: "/바닥-본드-제거/경기도-용인시/", province: "경기도", region: "용인시", service: "바닥본드제거",
    eyebrow: caseEyebrow, title: "용인 바닥본드제거",
    body: "수지구 상가 로비 화강암 바닥에 남은 본드를 2~3명이 8시간 동안 바닥광택기와 스크래퍼로 제거하고 세척까지 마친 기록입니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-bond-01.webp", "/images/regional/yongin-bond-06.webp"], "용인 수지구 상가 바닥본드제거"),
  },
  {
    href: "/쓰레기집청소/경기도-군포시/", province: "경기도", region: "군포시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "군포 쓰레기집청소",
    body: "기숙사로 쓰던 산본 아파트의 방 한 칸에서 3명이 8시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다. 교체가 필요했던 합지 벽지까지 그대로 담았습니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-trash-house-01.webp", "/images/regional/gunpo-trash-house-07.webp"], "군포 산본 아파트 쓰레기집청소"),
  },
  {
    href: "/인테리어청소/경기도-군포시/", province: "경기도", region: "군포시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "군포 인테리어청소",
    body: "산본 중심상가 빌딩의 코인노래방을 인테리어 공사 후 3명이 12시간 동안 방마다 스피커·창틀·집기·TV까지 공사 잔재를 걷어내고 청소한 기록입니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-interior-01.webp", "/images/regional/gunpo-interior-12.webp"], "군포 산본 코인노래방 인테리어청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-군포시/", province: "경기도", region: "군포시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "군포 바닥왁스코팅",
    body: "산본동 70평 가라오케의 검정 데코타일 바닥을 3명이 7시간 동안 정기 관리 차원에서 연마·세척하고 첫 코팅까지 마친 기록입니다. 쉬는 날 낮 시간에 진행해 영업에 지장이 없었습니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-floor-wax-02.webp", "/images/regional/gunpo-floor-wax-11.webp"], "군포 산본동 가라오케 바닥왁스코팅"),
  },
  {
    href: "/사무실청소/경기도-군포시/", province: "경기도", region: "군포시", service: "사무실청소",
    eyebrow: caseEyebrow, title: "군포 사무실청소",
    body: "당동 지식산업센터 50평 사무실을 인테리어 공사 직후 새벽 안에 4명이 8시간 동안 입주청소한 기록입니다. 사무실 앞 공동복도까지 공사 잔재가 심해 함께 청소했습니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-office-01.webp", "/images/regional/gunpo-office-13.webp"], "군포 당동 지식산업센터 사무실청소"),
  },
  {
    href: "/쓰레기집청소/경기도-안산시/", province: "경기도", region: "안산시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "안산 쓰레기집청소",
    body: "날파리가 생긴 상록구 원룸을 가족 방문 전에 4명이 3시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-trash-house-04.webp", "/images/regional/ansan-trash-house-13.webp"], "안산 상록구 원룸 쓰레기집청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-안산시/", province: "경기도", region: "안산시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "안산 바닥왁스코팅",
    body: "단원구 30평 물류회사 사무실의 회색 디럭스타일 바닥을 3명이 8시간 동안 유리창·칸막이 샷시 청소와 선반 오일스텐까지 함께 마무리하고 코팅한 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-floor-wax-01.webp", "/images/regional/ansan-floor-wax-12.webp"], "안산 단원구 사무실 바닥왁스코팅"),
  },
  {
    href: "/인테리어청소/경기도-안산시/", province: "경기도", region: "안산시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "안산 인테리어청소",
    body: "인테리어 공사를 마친 상록구 상가의 홀과 주방을 3명이 7시간 동안 짐 이동부터 주방 2명·홀 1명으로 나눠 청소한 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-interior-02.webp", "/images/regional/ansan-interior-10.webp"], "안산 상록구 상가 인테리어청소"),
  },
  {
    href: "/공장청소/경기도-시흥시/", province: "경기도", region: "시흥시", service: "공장청소",
    eyebrow: caseEyebrow, title: "시흥 공장청소",
    body: "HACCP 재심사를 앞둔 150평 빵공장을 9명이 빵 랙·벽면·천장·기계·쟁반까지 구역을 나눠 청소한 기록입니다.",
    cta: "시흥 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/siheung-factory-01.webp", "/images/regional/siheung-factory-15.webp"], "시흥 은계지구 빵공장 청소"),
  },
  {
    href: "/화재청소/인천광역시-검단구/", province: "인천광역시", region: "검단구", service: "화재청소",
    eyebrow: caseEyebrow, title: "인천 검단구 화재청소",
    body: "검단 상가건물에서 탄 잔해 반출부터 고소작업대를 이용한 천장 그을음 제거, 바닥 세척까지 진행한 기록입니다.",
    cta: "인천 검단구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/geomdan-fire-01.webp", "/images/regional/geomdan-fire-09.webp"], "인천 검단구 상가건물 화재청소"),
  },
  {
    href: "/쓰레기집청소/인천광역시-검단구/", province: "인천광역시", region: "검단구", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "인천 검단구 쓰레기집청소",
    body: "방과 주방을 채운 폐기물을 트럭으로 반출하고 바닥·욕실·주방 오염까지 정리한 빌라 원룸 기록입니다.",
    cta: "인천 검단구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/geomdan-trash-01.webp", "/images/regional/geomdan-trash-09.webp"], "인천 검단구 빌라 원룸 쓰레기집청소"),
  },
  {
    href: "/화재청소/인천광역시-남동구/", province: "인천광역시", region: "남동구", service: "화재청소",
    eyebrow: caseEyebrow, title: "인천 남동구 화재청소",
    body: "남동공단 공장에서 생산 설비를 보양한 뒤 고소 장비로 천장과 벽의 그을음을 세척한 기록입니다.",
    cta: "인천 남동구 사례와 견적 기준 보기",
    photos: pair(["작업 준비", "작업 중"] as const, ["/images/regional/namdong-fire-01.webp", "/images/regional/namdong-fire-04.webp"], "인천 남동공단 공장 화재청소"),
  },
  {
    href: "/쓰레기집청소/인천광역시-남동구/", province: "인천광역시", region: "남동구", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "인천 남동구 쓰레기집청소",
    body: "바닥을 덮은 생활 쓰레기와 옷가지를 치우고 변기·창틀까지 정리한 구월동 원룸 기록입니다.",
    cta: "인천 남동구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/namdong-trash-01.webp", "/images/regional/namdong-trash-08.webp"], "인천 남동구 구월동 원룸 쓰레기집청소"),
  },
  {
    href: "/바닥-왁스-코팅/인천광역시-남동구/", province: "인천광역시", region: "남동구", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "인천 남동구 바닥왁스코팅",
    body: "영업을 마친 객장 바닥을 박리·세척하고 2회 코팅하면서 조명 커버와 의자까지 정리한 기록입니다.",
    cta: "인천 남동구 사례와 견적 기준 보기",
    photos: pair(["작업 중", "작업 후"] as const, ["/images/regional/namdong-floor-wax-01.webp", "/images/regional/namdong-floor-wax-06.webp"], "인천 남동구 구월동 영업점 바닥왁스코팅"),
  },
  {
    href: "/화재청소/인천광역시-부평구/", province: "인천광역시", region: "부평구", service: "화재청소",
    eyebrow: caseEyebrow, title: "인천 부평구 화재청소",
    body: "부평역 상권 상가 뒤편 창고에서 탄 짐과 폐기물을 반출하고 통로를 정리한 기록입니다.",
    cta: "인천 부평구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/bupyeong-fire-01.webp", "/images/regional/bupyeong-fire-02.webp"], "인천 부평역 상가 창고 화재청소"),
  },
  {
    href: "/쓰레기집청소/인천광역시-부평구/", province: "인천광역시", region: "부평구", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "인천 부평구 쓰레기집청소",
    body: "짐과 쓰레기가 쌓인 오피스텔을 정리하고 세면대·욕실·냉장고까지 닦은 기록입니다.",
    cta: "인천 부평구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/bupyeong-trash-03.webp", "/images/regional/bupyeong-trash-07.webp"], "인천 부평역 오피스텔 쓰레기집청소"),
  },
  {
    href: "/화재청소/인천광역시-미추홀구/", province: "인천광역시", region: "미추홀구", service: "화재청소",
    eyebrow: caseEyebrow, title: "인천 미추홀구 화재청소",
    body: "주안 상가건물 층 전체에서 천장·창틀·선반의 그을음을 닦고 바닥 세척까지 진행한 기록입니다.",
    cta: "인천 미추홀구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/michuhol-fire-01.webp", "/images/regional/michuhol-fire-11.webp"], "인천 주안 상가건물 화재청소"),
  },
  {
    href: "/쓰레기집청소/인천광역시-미추홀구/", province: "인천광역시", region: "미추홀구", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "인천 미추홀구 쓰레기집청소",
    body: "페트병과 박스가 쌓인 방과 오물로 오염된 욕실을 정리하고 소독까지 마친 주안 원룸 기록입니다.",
    cta: "인천 미추홀구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/michuhol-trash-01.webp", "/images/regional/michuhol-trash-09.webp"], "인천 주안 원룸 쓰레기집청소"),
  },
  {
    href: "/바닥-왁스-코팅/인천광역시-미추홀구/", province: "인천광역시", region: "미추홀구", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "인천 미추홀구 바닥왁스코팅",
    body: "학교 복도와 교실, 나무 바닥을 박리·세척하고 2회 코팅한 기록입니다.",
    cta: "인천 미추홀구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/michuhol-floor-wax-01.webp", "/images/regional/michuhol-floor-wax-11.webp"], "인천 미추홀구 학교 바닥왁스코팅"),
  },
  {
    href: "/화재청소/인천광역시-연수구/", province: "인천광역시", region: "연수구", service: "화재청소",
    eyebrow: caseEyebrow, title: "인천 연수구 화재청소",
    body: "송도 오피스에서 책상·컴퓨터 주변과 사무실·복도 바닥에 내려앉은 그을음을 제거한 기록입니다.",
    cta: "인천 연수구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/songdo-fire-01.webp", "/images/regional/songdo-fire-11.webp"], "인천 송도 오피스 화재청소"),
  },
  {
    href: "/쓰레기집청소/인천광역시-연수구/", province: "인천광역시", region: "연수구", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "인천 연수구 쓰레기집청소",
    body: "방과 욕실, 선반까지 쌓인 짐과 쓰레기를 치우고 세면대·수납장·창틀까지 닦은 송도 오피스텔 기록입니다.",
    cta: "인천 연수구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/songdo-trash-01.webp", "/images/regional/songdo-trash-12.webp"], "인천 송도 오피스텔 쓰레기집청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-수원시/", province: "경기도", region: "수원시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "수원 바닥왁스코팅",
    body: "오랫동안 청소하지 않아 오염과 테이프 자국이 많던 영통 사무실 입구와 회의실을 2명이 6시간 동안 세척하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.",
    cta: "수원 사례와 견적 기준 보기",
    photos: pair(["세척 중", "코팅 후"], ["/images/regional/suwon-floor-wax-01.webp", "/images/regional/suwon-floor-wax-04.webp"], "수원 영통 사무실 바닥왁스코팅"),
  },
  {
    href: "/사무실청소/경기도-수원시-영통구/", province: "경기도", region: "수원시", service: "사무실청소",
    eyebrow: caseEyebrow, title: "수원 영통구 사무실청소",
    body: "인테리어 공사를 마친 50평 신축 사무실을 3명이 8시간 동안 천장부터 유리·창틀, 탕비실·수납장, 바닥 코팅까지 청소한 입주 전 기록입니다.",
    cta: "영통구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/suwon-office-01.webp", "/images/regional/suwon-office-10.webp"], "수원 영통구 사무실청소"),
  },
  {
    href: "/인테리어청소/경기도-수원시-영통구/", province: "경기도", region: "수원시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "수원 영통구 인테리어청소",
    body: "인테리어 공사를 마친 영통구 35평 아파트를 4명이 8시간 동안 창틀 사이 좁은 틈의 분진과 욕실 백색시멘트까지 제거하고 마무리한 기록입니다.",
    cta: "수원 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/suwon-interior-02.webp", "/images/regional/suwon-interior-05.webp"], "수원 영통구 아파트 인테리어청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-용인시/", province: "경기도", region: "용인시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "용인 바닥왁스코팅",
    body: "5년 만에 관리한 수지구 교회 예배당 200평 데코타일 바닥을 6명이 장의자를 옮기며 박리하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-floor-wax-03.webp", "/images/regional/yongin-floor-wax-10.webp"], "용인 수지구 교회 바닥왁스코팅"),
  },
  {
    href: "/인테리어청소/경기도-용인시/", province: "경기도", region: "용인시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "용인 인테리어청소",
    body: "인테리어 공사를 마친 수지구 62평 타운하우스를 7명이 8시간 동안 보양지 제거부터 천장 도배풀, 벽지·집기·바닥까지 청소한 입주 전 기록입니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-interior-02.webp", "/images/regional/yongin-interior-12.webp"], "용인 수지구 타운하우스 인테리어청소"),
  },
  {
    href: "/사무실청소/경기도-의왕시/", province: "경기도", region: "의왕시", service: "사무실청소",
    eyebrow: caseEyebrow, title: "의왕 사무실청소",
    body: "새로 준공된 부곡동 지식산업센터 250평 사무실을 8명이 8시간 동안 천장 에어컨 디퓨저부터 유리·창틀, 시스템박스·배전반, 바닥까지 청소한 입주 전 기록입니다.",
    cta: "의왕 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/uiwang-office-01.webp", "/images/regional/uiwang-office-12.webp"], "의왕 부곡동 지식산업센터 사무실청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-의왕시/", province: "경기도", region: "의왕시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "의왕 바닥왁스코팅",
    body: "내손동 10평 음식점의 바닥을 2명이 4시간 동안 기름때를 제거하고 첫 코팅까지 마친 기록입니다.",
    cta: "의왕 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/uiwang-floor-wax-02.webp", "/images/regional/uiwang-floor-wax-11.webp"], "의왕 내손동 음식점 바닥왁스코팅"),
  },
  {
    href: "/인테리어청소/경기도-양주시/", province: "경기도", region: "양주시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "양주 인테리어청소",
    body: "레드랩 댄스스튜디오의 높은 천장 에어컨과 스피커를 LS 사다리로 청소하고, 푹신한 바닥에 자국이 남지 않도록 사다리 접촉 부분을 보호하며 4명이 8시간 작업한 기록입니다.",
    cta: "양주 사례와 견적 기준 보기",
    photos: pair(["현장 사진", "작업 기록"] as const, ["/images/interior-cases/yangju/03-studio.webp", "/images/interior-cases/yangju/05-speaker.webp"], "양주 레드랩 댄스스튜디오 인테리어청소"),
  },
  {
    href: "/인테리어청소/경기도-남양주시/", province: "경기도", region: "남양주시 화도읍", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "화도읍 인테리어청소",
    body: "카페의 범위가 넓은 천장 인테리어 조형물과 실내, 옥상까지 3명이 9시간 동안 청소한 기록입니다.",
    cta: "화도읍 사례와 견적 기준 보기",
    photos: pair(["천장 조형물", "옥상"] as const, ["/images/interior-cases/hwado/02-ceiling-structure.webp", "/images/interior-cases/hwado/05-rooftop.webp"], "남양주 화도읍 카페 인테리어청소"),
  },
  {
    href: "/인테리어청소/서울특별시-서초구/", province: "서울특별시", region: "서초구", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "서초 인테리어청소",
    body: "스튜디오 내부의 많은 짐을 옮겨가며 작업 구역을 확보해 4명이 8시간 동안 청소한 기록입니다.",
    cta: "서초 사례와 견적 기준 보기",
    photos: pair(["작업 전", "작업 기록"] as const, ["/images/interior-cases/seocho/02-stored-items.webp", "/images/interior-cases/seocho/06-equipment-area.webp"], "서초 스튜디오 인테리어청소"),
  },
  {
    href: "/인테리어청소/경기도-화성시-동탄구/", province: "경기도", region: "화성시 동탄구", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "동탄 인테리어청소",
    body: "BAR 내부의 큰 고급 주류병을 모두 치우고, 일반 분리수거가 어려운 병을 폐기물 처리로 마무리하며 3명이 8시간 작업한 기록입니다.",
    cta: "동탄 사례와 견적 기준 보기",
    photos: pair(["반출 준비", "현장 사진"] as const, ["/images/interior-cases/dongtan/05-bottles.webp", "/images/interior-cases/dongtan/06-shelves.webp"], "동탄 BAR 인테리어청소"),
  },
];

const unique = (values: string[]) => [...new Set(values)];
export const areaProvinces = unique(areaCases.map(c => c.province));
export const regionsOf = (province: string) => unique(areaCases.filter(c => c.province === province).map(c => c.region));
export const servicesOf = (province: string, region: string | null) =>
  unique(areaCases.filter(c => c.province === province && (!region || c.region === region)).map(c => c.service));
