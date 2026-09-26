import gallery from "@/lib/gallery-data.json";

export type AreaCasePhoto = { label?: string; src: string; alt: string; width: number; height: number };
export type AreaCase = {
  href: string;
  region: string;
  service: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  photos: AreaCasePhoto[];
};

// 지역 선택 순서 = 화면에 보이는 지역 묶음 순서
export const areaRegions = ["안양시", "군포시", "안산시", "시흥시", "수원시", "용인시"] as const;
export const areaServices = ["바닥왁스코팅", "주방청소", "쓰레기집청소", "신축준공청소", "공장청소", "사무실청소", "인테리어청소"] as const;

const waxPhoto = gallery.find(category => category.slug === "floor-wax")!.items.find(item => item.id === "floor-wax-g28")!;
const pair = (labels: readonly [string, string], srcs: readonly [string, string], alt: string): AreaCasePhoto[] =>
  labels.map((label, i) => ({ label, src: srcs[i], alt: `${alt} · ${label}`, width: 900, height: 1200 }));
const beforeAfter = ["작업 전", "작업 후"] as const;
const caseEyebrow = "실제 작업 사례 · 비용과 견적 기준";

export const areaCases: AreaCase[] = [
  {
    href: "/바닥-왁스-코팅/경기도-안양시/", region: "안양시", service: "바닥왁스코팅",
    eyebrow: "실제 작업 사진 · 비용과 견적 기준", title: "안양 바닥왁스코팅",
    body: "학원·음식점·업무시설·사무실의 작업 전후 사진을 확인하세요. 한식뷔페 현장에서 두꺼운 왁스를 박리하고 집기를 나눠 옮기며 작업한 과정도 담았습니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: [
      { label: "작업 전", src: `/images/gallery-v2/${waxPhoto.before}`, alt: `${waxPhoto.title} · 작업 전`, width: waxPhoto.beforeWidth, height: waxPhoto.beforeHeight },
      { label: "작업 후", src: `/images/gallery-v2/${waxPhoto.after}`, alt: `${waxPhoto.title} · 작업 후`, width: waxPhoto.afterWidth, height: waxPhoto.afterHeight },
    ],
  },
  {
    href: "/주방청소/경기도-안양시/", region: "안양시", service: "주방청소",
    eyebrow: "실제 작업 사진 · 작업 범위와 견적 기준", title: "안양 주방청소",
    body: "배달 돈까스 주방의 튀김기·후드·기기 아래 사진을 살펴보세요. 내부 세척과 기기 이동 등 별도 확인 항목, 견적 조건과 상담 준비사항을 안내합니다.",
    cta: "안양 주방 사진과 견적 기준 보기",
    photos: [{ src: "/images/anyang-kitchen/009-6.jpg", alt: "안양 배달 돈까스 주방의 조리기기와 통로", width: 1200, height: 1600 }],
  },
  {
    href: "/쓰레기집청소/경기도-안양시/", region: "안양시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "안양 쓰레기집청소",
    body: "장기간 방치된 만안구 다세대주택에서 4명이 8시간 동안 폐기물 반출부터 청소·냄새 제거·소독까지 진행한 기록입니다. 청소로 해결되지 않은 벽지 얼룩까지 그대로 담았습니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/anyang-trash-house-01.webp", "/images/regional/anyang-trash-house-06.webp"], "안양 만안구 다세대주택 쓰레기집청소"),
  },
  {
    href: "/신축준공청소/경기도-안양시/", region: "안양시", service: "신축준공청소",
    eyebrow: caseEyebrow, title: "안양 준공청소",
    body: "새 입주 전 명학역 인근 상가를 3명이 6시간 동안 천장·창틀·유리 칸막이 양면·바닥까지 청소한 기록입니다.",
    cta: "안양 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/anyang-completion-02.webp", "/images/regional/anyang-completion-09.webp"], "안양 명학역 인근 상가 준공청소"),
  },
  {
    href: "/쓰레기집청소/경기도-군포시/", region: "군포시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "군포 쓰레기집청소",
    body: "기숙사로 쓰던 산본 아파트의 방 한 칸에서 3명이 8시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다. 교체가 필요했던 합지 벽지까지 그대로 담았습니다.",
    cta: "군포 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/gunpo-trash-house-01.webp", "/images/regional/gunpo-trash-house-07.webp"], "군포 산본 아파트 쓰레기집청소"),
  },
  {
    href: "/쓰레기집청소/경기도-안산시/", region: "안산시", service: "쓰레기집청소",
    eyebrow: caseEyebrow, title: "안산 쓰레기집청소",
    body: "날파리가 생긴 상록구 원룸을 가족 방문 전에 4명이 3시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다.",
    cta: "안산 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/ansan-trash-house-04.webp", "/images/regional/ansan-trash-house-13.webp"], "안산 상록구 원룸 쓰레기집청소"),
  },
  {
    href: "/공장청소/경기도-시흥시/", region: "시흥시", service: "공장청소",
    eyebrow: caseEyebrow, title: "시흥 공장청소",
    body: "HACCP 재심사를 앞둔 150평 빵공장을 9명이 빵 랙·벽면·천장·기계·쟁반까지 구역을 나눠 청소한 기록입니다.",
    cta: "시흥 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/siheung-factory-01.webp", "/images/regional/siheung-factory-15.webp"], "시흥 은계지구 빵공장 청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-수원시/", region: "수원시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "수원 바닥왁스코팅",
    body: "오랫동안 청소하지 않아 오염과 테이프 자국이 많던 영통 사무실 입구와 회의실을 2명이 6시간 동안 세척하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.",
    cta: "수원 사례와 견적 기준 보기",
    photos: pair(["세척 중", "코팅 후"], ["/images/regional/suwon-floor-wax-01.webp", "/images/regional/suwon-floor-wax-04.webp"], "수원 영통 사무실 바닥왁스코팅"),
  },
  {
    href: "/사무실청소/경기도-수원시-영통구/", region: "수원시", service: "사무실청소",
    eyebrow: caseEyebrow, title: "수원 영통구 사무실청소",
    body: "인테리어 공사를 마친 50평 신축 사무실을 3명이 8시간 동안 천장부터 유리·창틀, 탕비실·수납장, 바닥 코팅까지 청소한 입주 전 기록입니다.",
    cta: "영통구 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/suwon-office-01.webp", "/images/regional/suwon-office-10.webp"], "수원 영통구 사무실청소"),
  },
  {
    href: "/바닥-왁스-코팅/경기도-용인시/", region: "용인시", service: "바닥왁스코팅",
    eyebrow: caseEyebrow, title: "용인 바닥왁스코팅",
    body: "5년 만에 관리한 수지구 교회 예배당 200평 데코타일 바닥을 6명이 장의자를 옮기며 박리하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-floor-wax-03.webp", "/images/regional/yongin-floor-wax-10.webp"], "용인 수지구 교회 바닥왁스코팅"),
  },
  {
    href: "/인테리어청소/경기도-용인시/", region: "용인시", service: "인테리어청소",
    eyebrow: caseEyebrow, title: "용인 인테리어청소",
    body: "인테리어 공사를 마친 수지구 62평 타운하우스를 7명이 8시간 동안 보양지 제거부터 천장 도배풀, 벽지·집기·바닥까지 청소한 입주 전 기록입니다.",
    cta: "용인 사례와 견적 기준 보기",
    photos: pair(beforeAfter, ["/images/regional/yongin-interior-02.webp", "/images/regional/yongin-interior-12.webp"], "용인 수지구 타운하우스 인테리어청소"),
  },
];
