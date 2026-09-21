import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["safety", "사용 약품 안전성"],
  ["estimate", "비용·견적 기준"],
  ["scope", "공간별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "기존에 사용하던 주택으로 이사하기 전 공간"],
  ["주요 확인", "주방 기름때, 욕실 물때, 창틀 먼지, 가구가 빠진 자리"],
  ["견적 기준", "필요한 인원, 장비·약품, 구조와 실제 작업량"],
  ["범위 구분", "수납장 내부, 외창, 가전 내부, 탈거·이동 작업"],
  ["일정 조율", "기존 거주자 퇴거, 공사·설치, 이삿짐 반입 시간"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "면적과 방·욕실의 수",
  "주방과 욕실의 오염 정도",
  "창문과 수납 공간의 구성",
  "베란다·다용도실 등 부속 공간",
  "남아 있는 가구와 짐",
  "가전 내부·외창 등 별도 요청",
  "필요한 인원과 장비·약품",
  "실제 확보할 수 있는 작업 시간",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "주방과 수납장",
    body: "싱크대, 상판, 벽면, 바닥 등 생활하면서 생긴 기름때와 오염을 확인합니다. 상·하부장 내부, 서랍과 선반, 후드·필터 등은 세척할 부위와 탈거 가능 여부를 확인하며, 내부 청소를 요청한 수납장은 내용물을 비울 수 있는지도 함께 정합니다.",
    note: "냉장고·오븐·식기세척기 등 가전 내부와 분해 세척, 가구 이동, 기기 수리는 별도입니다.",
    photoPairs: [["moving-kitchen-01.webp", "moving-kitchen-02.webp"], ["moving-kitchen-03.webp", "moving-kitchen-04.webp"]],
  },
  {
    title: "욕실과 배수구",
    body: "변기, 세면대, 거울, 바닥, 벽면 등의 물때와 표면 오염을 살펴봅니다. 욕실 수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등은 세부 작업 범위를 확인합니다.",
    note: "배관 막힘 해결, 누수 수리, 실리콘 교체와 자재 보수는 일반 청소와 다릅니다. 오래된 변색이나 부식을 물때로 오해하지 않도록 표면 상태도 함께 살펴봅니다.",
    photoPairs: [["moving-bathroom-01.webp", "moving-bathroom-02.webp"], ["moving-bathroom-03.webp", "moving-bathroom-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀에 쌓인 먼지와 오염, 작업 대상으로 정한 유리 면을 확인합니다. 방충망, 창문 탈거, 유리 양면 등은 구조와 접근 조건에 따라 작업 여부를 정합니다.",
    note: "실내에서 접근하기 어려운 외창과 외부 고소작업은 별도 검토가 필요합니다.",
    photoPairs: [["moving-window-01.webp", "moving-window-02.webp"], ["moving-window-03.webp", "moving-window-04.webp"]],
  },
  {
    title: "방·거실 바닥과 벽면",
    body: "바닥, 걸레받이, 문 주변과 모서리의 먼지와 제거 가능한 오염을 확인합니다. 가구가 빠진 뒤에는 평소 보이지 않았던 구간도 살펴보며, 스티커·접착제·도료 자국 등 별도 제거가 필요한 곳을 확인합니다.",
    note: "가구 뒤에 남은 자국이 모두 오염인 것은 아니므로 변색·눌림·마모와 구분합니다. 바닥 코팅, 연마, 도배, 도장, 손상 보수는 별도 작업입니다.",
    photoPairs: [["moving-floor-01.webp", "moving-floor-02.webp"], ["moving-floor-03.webp", "moving-floor-04.webp"]],
  },
  {
    title: "베란다와 다용도실",
    body: "바닥과 문 주변, 창틀 등 요청 구역의 오염을 살펴봅니다. 수납 공간, 남아 있는 세탁기 주변, 배수구 접근 부위 등을 구분합니다.",
    note: "세탁기 내부·분해 세척, 무거운 기기 이동, 배관·방수 보수는 일반 공간 청소와 별도입니다.",
    photoPairs: [["moving-veranda-01.webp", "moving-veranda-02.webp"], ["moving-veranda-03.webp", "moving-veranda-04.webp"]],
  },
  {
    title: "남겨진 가전과 가구",
    body: "빌트인 가전이나 이전 거주자가 남기는 가구가 있다면 종류와 수량을 알려주세요. 주변 공간 청소와 가구·가전 자체의 청소는 다르며, 내부 세척과 이동이 필요하다면 별도 요청 항목으로 확인합니다.",
    note: "남아 있는 물건을 임의로 폐기하지 않도록 보관할 물건과 처리할 물건도 구분해야 합니다.",
  },
];

const extraCostItems = [
  "상담 때 확인되지 않은 공간이 있는 경우",
  "예상보다 많은 가구와 짐이 남아 있는 경우",
  "심하게 누적된 기름때·물때 등 추가 작업이 필요한 경우",
  "접착제·도료·보호필름 잔여물 제거가 필요한 경우",
  "가전 내부 세척이나 별도 탈거 작업을 요청하는 경우",
  "외창 등 작업 범위를 추가하는 경우",
  "잔여물 반출·처리가 필요한 경우",
  "실제 작업 가능 시간이 달라져 인원 구성을 조정해야 하는 경우",
];

const processSteps: [string, string][] = [
  ["집 상태와 이사 일정 상담", "주소, 구조, 오염 상태, 남길 가구·가전과 희망 일정을 확인합니다. 기존 거주자의 퇴거 완료 시간과 새 이삿짐 반입 시간을 함께 알려주세요."],
  ["작업 범위와 견적 안내", "공간별 청소와 별도 요청을 구분합니다. 필요한 인원과 장비·약품을 검토하고 포함·제외 항목을 안내합니다."],
  ["퇴거 후 현장 확인", "실제로 짐이 빠진 상태와 잔여물을 확인합니다. 가구 뒤에 가려졌던 오염, 기존 파손, 누수 흔적 등 상담 때 보이지 않았던 부분을 살펴봅니다."],
  ["공간별 청소", "주방, 욕실, 창틀, 바닥 등 합의한 항목에 따라 진행합니다. 탈거와 가전 관련 작업은 사전에 정한 범위와 현장 조건에 맞춰 진행합니다."],
  ["마무리와 검수", "주요 오염 구간과 포함 항목을 확인합니다. 짐을 들이기 전에 작업 결과를 살펴볼 수 있도록 검수 시간도 이사 일정에 반영하는 것이 좋습니다."],
];

const caseChecklist = [
  "주방 상판과 벽면의 기름때",
  "청소 범위에 포함된 수납장 내부",
  "욕실 세면대와 바닥의 오염",
  "창틀과 모서리의 먼지",
  "가구가 빠진 자리의 바닥",
  "처음 집중 청소를 요청한 부분",
];

const reservationChecklist = [
  "기존 거주자의 짐 반출 완료",
  "출입 권한과 열쇠 전달",
  "공사·도배·보수 종료",
  "청소 시작과 예상 종료",
  "마무리 확인과 검수",
  "가전 설치와 이삿짐 반입",
];

const prepItems = [
  "기존 거주자의 퇴거 완료 시간을 확인해 주세요.",
  "남기는 가구와 가전 목록을 알려주세요.",
  "보관할 물건과 처리할 잔여물을 구분해 주세요.",
  "수납장 내부 작업이 있다면 비울 수 있는지 확인해 주세요.",
  "전기와 수도 사용 가능 여부를 확인해 주세요.",
  "출입 방법과 열쇠 전달 시간을 정해 주세요.",
  "주차와 엘리베이터 이용 조건을 확인해 주세요.",
  "기존 파손·누수·곰팡이 등 특이사항을 알려주세요.",
  "공사·설치와 이삿짐 반입 시간을 공유해 주세요.",
  "완료 확인 방법과 연락 가능한 시간을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["입주청소와 이사청소는 다른가요?", "두 표현이 겹쳐 쓰이기도 합니다. 이 페이지에서는 기존에 사용하던 주택으로 이사하기 전, 생활 오염을 정리하는 청소를 안내합니다. 서비스 이름보다 실제 집 상태와 포함 범위가 중요합니다."],
  ["이사청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 정하지 않습니다. 구조와 오염 상태, 남은 짐, 작업 범위를 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["이사 당일에도 청소할 수 있나요?", "퇴거 완료부터 짐 반입까지 확보되는 시간과 작업 범위를 확인해야 합니다. 가능한 일정인지 먼저 검토하며, 당일 완료를 일괄 보장하지는 않습니다."],
  ["이전 거주자가 아직 살고 있어도 예약할 수 있나요?", "현재 확인 가능한 사진과 구조, 퇴거 예정 시간으로 먼저 상담할 수 있습니다. 가구가 빠진 뒤 상태에 따라 추가 확인이 필요할 수 있습니다."],
  ["짐이나 가구가 남아 있어도 가능한가요?", "남아 있는 물건과 접근 가능한 구간을 확인해야 합니다. 빈집과 작업 범위·시간이 달라질 수 있으며 가구 이동이 자동으로 포함되지는 않습니다."],
  ["수납장 안쪽도 청소하나요?", "수납장 내부와 서랍·선반의 청소 여부를 견적 단계에서 정합니다. 내부 물품을 비울 수 있는지와 탈거 가능한 구조인지도 확인합니다."],
  ["남겨진 냉장고나 세탁기도 청소하나요?", "가전 주변 공간과 가전 자체의 청소는 구분합니다. 내부·분해 세척은 기기 종류와 요청 내용에 따라 가능 여부와 비용을 별도로 확인합니다."],
  ["외창과 방충망도 포함되나요?", "유리의 어느 면을 청소하는지, 방충망과 탈거 작업이 포함되는지를 구분합니다. 접근이 어려운 외창은 별도 검토가 필요합니다."],
  ["담배 냄새나 반려동물 냄새도 없어지나요?", "냄새의 원인과 자재 상태에 따라 다릅니다. 일반 청소만으로 모든 냄새가 없어지는 것은 아니므로, 냄새가 나는 위치와 상태를 상담 시 알려주세요."],
  ["곰팡이와 오래된 실리콘 얼룩도 제거되나요?", "표면 오염인지, 자재 안쪽까지 변색됐는지에 따라 결과가 다릅니다. 청소로 다룰 범위와 원인 보수·교체가 필요한 부분을 구분합니다."],
  ["제가 이사 나가는 집도 청소할 수 있나요?", "이사 들어갈 집의 청소와 퇴거 후 정리는 목적과 요청 범위가 다릅니다. 어느 집을 어떤 상태로 정리하려는지 알려주시면 해당 범위로 상담합니다."],
  ["청소 후 미흡한 부분이 있으면 어떻게 하나요?", "작업 범위 안에서 미흡한 위치와 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 사후 접수 조건은 예약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 주택 유형",
  "면적과 방·욕실의 수",
  "전체 공간과 주요 오염 부위 사진",
  "남겨지는 가구·가전과 짐의 유무",
  "수납장·외창·가전 등 추가 요청",
  "기존 거주자의 퇴거 완료 예정 시간",
  "공사와 설치 일정",
  "이사청소 희망일",
  "이삿짐 반입 예정 시간",
  "출입과 주차 조건",
];

const path = "/이사청소/";

export default function MovingCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "이사청소",
      serviceType: "이사청소",
      description: "찐청소 이사청소의 비용과 공간별 작업 범위를 안내합니다. 기존 주택의 주방 기름때·욕실 물때·창틀 먼지를 확인하고, 퇴거와 이삿짐 반입 일정에 맞춰 견적을 상담하세요.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "이사청소", item: absoluteUrl(path) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg/moving-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>이사청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">이사청소, 이전 생활의 흔적을 정리하고 들어가세요</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>집을 보러 갔을 때는 몰랐던 주방의 기름때, 가구가 빠진 뒤 드러난 구석의 먼지, 새로 짐을 넣기 전에 닦아두고 싶은 수납 공간.</p>
            <p>이사청소는 기존 주택의 생활 오염을 정리하고, 내 물건을 들일 준비를 하는 작업입니다.</p>
            <p>찐청소는 집의 구조와 오염 상태, 남아 있는 짐, 작업 가능한 시간을 확인해 청소 범위와 비용을 안내합니다.</p>
            <p>이삿짐 목록에 묵은 먼지까지 넣을 필요는 없으니까요. 짐을 들이기 전, 어디까지 청소할지부터 분명하게 맞추겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">이사청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[190px_1fr]">
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} />

        <div className="space-y-14 text-[17px] leading-8 text-gray-800">
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} />
          </section>

          {/* 약품 안전성 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">사용하는 약품, 인체에 안전한가요?</h2>
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 새로운 생활을 시작하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">VOC(휘발성유기화합물) 성분 불검출</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">눈·피부 자극 없음 (자극물질 아님)</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">경구·경피 노출 시 독성 없음</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">흡입 노출 시 독성 없음</li>
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border border-gray-200">
                <Image src="/images/safety/safety-voc-report.webp" alt="VOC 실험 결과 증빙자료" width={933} height={1245} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
                <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">VOC 실험 결과 (PACE Inc.)</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-xl border border-gray-200">
                <Image src="/images/safety/safety-toxicity-report.webp" alt="무독성 실험 결과 증빙자료" width={1905} height={1200} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
                <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">무독성 실험 결과 (Tox Monitor/BSR, Inc.)</figcaption>
              </figure>
            </div>
            <p className="mt-4 text-[15px] text-gray-500">제품마다 적용 시험 항목은 다를 수 있으며, 현장 상황에 맞는 제품과 사용량은 상담 시 안내합니다.</p>
          </section>

          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="이사청소 비용과 견적 산정 기준" />
            <p>이사청소 비용은 평수만으로 정하기 어렵습니다.</p>
            <p className="mt-4">같은 면적이라도 주방과 욕실의 오염, 창문과 수납장 구성, 남아 있는 가구에 따라 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 면적을 참고하되, 필요한 인원과 장비·약품을 중심으로 실제 현장을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">집이 오래됐다고 무조건 비싼 것은 아닙니다</h3>
            <p className="mt-2">준공 연도만으로 오염 정도를 알 수는 없습니다.</p>
            <p className="mt-2">평소 관리 상태, 사용 방식, 최근 공사 여부에 따라 청소할 내용이 달라집니다. 비교적 새집이어도 기름때나 물때가 많이 쌓여 있다면 작업이 더 필요할 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">집의 나이보다 현재 상태를 살펴봅니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">현재 사람이 살고 있어 전체 사진을 찍기 어렵다면 확인 가능한 사진과 남길 가구·가전 목록부터 알려주세요.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">같은 금액이라도 포함 범위를 확인하세요</h3>
            <p className="mt-2">수납장 외부만 청소하는지 내부까지 포함하는지, 유리의 어느 면을 청소하는지, 가전은 주변만 닦는지 내부 세척까지 요청한 것인지에 따라 견적이 달라집니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">금액과 함께 작업 항목을 비교해야 실제로 필요한 청소인지 판단할 수 있습니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <p>이사청소는 빈집 상태를 중심으로 작업 범위를 검토합니다.</p>
            <p className="mt-4">다만 공간 이름만으로 세부 작업이 모두 포함되는 것은 아닙니다. 아래 항목을 기준으로 포함 범위와 별도 요청을 정합니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                  {item.photoPairs && (
                    <div className="mt-4 grid items-start gap-3 sm:grid-cols-2">
                      {item.photoPairs.map((pair, pairIndex) => (
                        <div key={pair.join("-")} className={`grid gap-2.5 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2.5 ${pair.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                          {pair.map(photo => (
                            <div key={photo} className="relative flex h-52 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-64">
                              <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 현장 사진 ${pairIndex + 1}`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <p>처음 안내한 범위보다 작업이 늘어나거나 별도 공정이 필요한 경우 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가구가 빠진 뒤 새롭게 보이는 오염은 작업 전에 범위를 확인합니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">추가 작업이 필요하면 내용과 비용을 안내하고 진행 여부를 정합니다. 기존 거주자가 짐을 빼는 시간이 늦어지는 경우의 대응도 예약 때 함께 확인해 주세요.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="이사청소 진행 순서와 소요 시간" />
            <ol className="mt-4 space-y-4">
              {processSteps.map(([title, body], i) => (
                <li key={title} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light font-black text-brand-dark">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-brand-dark">{title}</h3>
                    <p className="mt-1">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">이사청소는 몇 시간 걸리나요?</h3>
            <p className="mt-2">면적, 오염 정도, 공간 구성, 투입 인원과 작업 범위에 따라 달라집니다.</p>
            <p className="mt-2">오전 퇴거와 오후 입주 사이처럼 시간이 제한돼 있다면, 그 시간 안에 요청 범위를 수행할 수 있는지 먼저 검토해야 합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">인원을 늘린다고 모든 작업을 원하는 시간 안에 끝낼 수 있는 것은 아닙니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>이사청소는 집 전체 모습과 함께 실제 생활 오염이 있던 곳을 확인하는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">전후 상태는 가능한 한 비슷한 위치와 조명에서 비교해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">청소로 제거된 오염과 기존 자재의 변색·손상은 구분해서 살펴봅니다. 새집처럼 보이는지보다 약속한 구역의 오염이 정리됐는지가 확인 기준입니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진 제공이 필요하면 촬영 구역과 전달 가능 여부를 상담 시 확인해 주세요.</p>
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 이사 일정 조율" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">이사청소 일정은 날짜뿐 아니라 실제로 집을 비울 수 있는 시간이 중요합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">함께 맞춰야 할 일정</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">먼지가 생기는 공정과 청소가 겹치면 작업 후 다시 오염될 수 있습니다. 가능하면 공정이 끝난 뒤, 이삿짐을 들이기 전에 청소할 시간을 확보하는 편이 좋습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">당일 이사청소는 시간을 먼저 확인합니다</h3>
            <p className="mt-2">당일 청소 가능 여부는 퇴거 완료 시간, 요청 범위, 인원과 예약 상황에 따라 판단합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">이삿짐 차량이 도착하는 시간만으로 청소 종료를 확정하지 않습니다. 기존 거주자의 퇴거가 늦어질 가능성과 일정 변경 시 대응도 미리 확인해 주세요.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 작업 항목을 확인합니다</h3>
            <p className="mt-2">주방, 욕실, 창틀, 수납 공간 등 견적에 포함된 항목을 기준으로 검수합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">특히 상담 때 말씀하신 오염 구간과 퇴거 후 추가로 확인한 부분을 함께 살펴봅니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">생활 오염과 기존 손상은 다릅니다</h3>
            <p className="mt-2">오래된 변색, 마루 눌림, 코팅 벗겨짐, 금속 부식 등은 청소만으로 원래 상태가 되지 않을 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">청소가 필요한 부분과 보수·교체가 필요한 상태를 구분해 안내합니다. 청소가 전문 하자 점검을 대신하지는 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <p className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 위치와 상태를 알려주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">작업 내용과 현장 상태를 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">이삿짐 반입 전 확인하면 구분하기 쉽습니다</h3>
            <p className="mt-2">청소 후 이삿짐 반입이나 설치 작업으로 생긴 오염과 작업 당시 미흡했던 부분은 구분해야 합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가능하면 짐을 들이기 전에 주요 구역을 확인하고, 이후 설치 작업 때도 바닥과 주변 공간을 보호해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="이사청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이사 준비만으로도 할 일이 많습니다. 청소 전에 대청소를 하실 필요는 없고, 짐이 빠지는 시간과 남길 물건만 정확히 알려주시면 됩니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="자주 묻는 질문" />
            <div className="space-y-3">
              {faqItems.map(([q, a]) => (
                <details key={q} className="rounded-xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-[16.5px]">{q}</summary>
                  <p className="mt-3">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 10. 문의 CTA */}
          <section id="contact" className="scroll-mt-36">
            <div className="rounded-2xl bg-brand-dark p-7 text-white">
              <p className="text-xl font-bold">이사청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 언제 집이 비고 언제 짐이 들어오는지 알려주세요.</p>
              <p className="mt-2 text-white/80">주방과 욕실의 생활 오염이 어느 정도인지, 남겨지는 가구와 가전이 있는지에 따라 필요한 작업이 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>이사청소 견적 문의하기 →</CtaButton>
                <a href="tel:010-9882-8882" className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-base font-bold text-white hover:bg-white/10">
                  전화 상담: 010-9882-8882
                </a>
              </div>
            </div>
          </section>
          <BackToTopButton />
        </div>
      </div>
    </article>
  );
}
