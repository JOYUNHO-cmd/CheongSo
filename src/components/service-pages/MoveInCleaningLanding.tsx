import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "공간별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "신축 주택과 기존 주택의 입주 전 공간"],
  ["주요 공간", "주방, 욕실, 창틀, 바닥, 베란다·다용도실 등"],
  ["견적 기준", "필요한 인원, 장비·약품, 면적과 현장 작업량"],
  ["범위 확인", "수납장 내부, 탈거 작업, 외창, 가전 내부 등"],
  ["예상 작업 시간", "구조·오염·투입 인원과 작업 범위 확인 후 안내"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "면적과 방·욕실의 수",
  "베란다와 다용도실의 구성",
  "창문과 수납 공간의 수량",
  "신축·기존 주택 여부와 오염 상태",
  "가구·짐의 유무",
  "탈거와 별도 제거 작업의 필요 여부",
  "필요한 인원과 장비·약품",
  "주차와 장비 반입 등 현장 조건",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "주방과 수납장",
    body: "싱크대, 상판, 벽면, 바닥 등 표면의 먼지와 제거 가능한 오염을 확인합니다. 상·하부장 내부, 서랍과 선반, 후드·필터, 빌트인 기기 주변 등은 청소할 부위를 구체적으로 정하며, 탈거가 필요한 부분은 구조와 상태를 먼저 확인합니다.",
    note: "냉장고·오븐·식기세척기 등의 내부·분해 세척, 가구 이동, 기기 수리는 별도 항목입니다.",
    photoPairs: [["movein-kitchen-01.webp", "movein-kitchen-02.webp"], ["movein-kitchen-03.webp", "movein-kitchen-04.webp"]],
  },
  {
    title: "욕실과 배수구",
    body: "변기, 세면대, 거울, 바닥, 벽면 등 공간별 오염을 살펴봅니다. 수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등은 작업 가능 범위와 탈거 여부를 확인합니다.",
    note: "배관 내부 세척과 막힘 해결, 누수 수리, 실리콘 교체는 일반 표면 청소와 다릅니다. 물때처럼 보여도 부식이나 변색일 수 있으므로 제거할 오염과 손상은 구분합니다.",
    photoPairs: [["movein-bathroom-01.webp", "movein-bathroom-02.webp"], ["movein-bathroom-03.webp", "movein-bathroom-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀의 먼지와 오염, 작업 대상으로 정한 유리 면을 살펴봅니다. 유리의 어느 면을 청소하는지, 방충망과 창문 탈거가 필요한지 등을 확인합니다.",
    note: "실내에서 접근하기 어려운 외창과 외부 고소작업은 별도 검토가 필요합니다. '창문 청소'라는 표현만으로 모든 외창이나 창문 분리 작업이 포함된다고 생각하지 않도록 세부 범위를 안내합니다.",
    photoPairs: [["movein-window-01.webp", "movein-window-02.webp"], ["movein-window-03.webp", "movein-window-04.webp"]],
  },
  {
    title: "바닥과 벽면",
    body: "바닥과 가장자리, 문, 걸레받이 등 재질에 맞춰 먼지와 제거 가능한 오염을 확인합니다. 접착제·도료·보호필름 잔여물 등 일반 세척과 다른 제거 작업이 필요한 곳을 구분합니다.",
    note: "바닥 코팅, 연마, 도배, 도장, 손상 보수는 별도 작업입니다. 벽면은 벽지나 도장 상태에 따라 가능한 청소 방식이 다르므로 바닥과 같은 방식으로 세척하지 않습니다.",
    photoPairs: [["movein-floor-01.webp", "movein-floor-02.webp"], ["movein-floor-03.webp", "movein-floor-04.webp"]],
  },
  {
    title: "베란다와 다용도실",
    body: "바닥, 창틀, 문 주변 등 요청 구역의 오염을 확인합니다. 수납 공간, 세탁기 등 기기 주변, 배수구 접근 부위와 별도 부속 공간을 구분합니다.",
    note: "세탁기 내부·분해 세척, 무거운 기기 이동, 배관·방수 보수는 일반 공간 청소와 별도입니다.",
    photoPairs: [["movein-veranda-01.webp", "movein-veranda-02.webp"], ["movein-veranda-03.webp", "movein-veranda-04.webp"]],
  },
];

const separateScopeItems = [
  "가전 내부·분해 세척",
  "접근이 어려운 외창과 고소작업",
  "무거운 가구·기기 이동",
  "대량 쓰레기와 공사 폐기물 처리",
  "소독·방역 및 별도 냄새 처리",
  "바닥·나노코팅 등 시공",
  "곰팡이 원인 보수와 자재 교체",
  "새집증후군 관련 별도 서비스",
];

const extraCostItems = [
  "상담 때 확인되지 않은 공간이 있는 경우",
  "가구와 짐이 남아 있어 작업 조건이 달라지는 경우",
  "심하게 누적된 기름때·물때 등 추가 작업이 필요한 경우",
  "접착제·도료·보호필름 잔여물 제거가 필요한 경우",
  "별도 탈거·기기 세척을 요청하는 경우",
  "외창이나 추가 부속 공간을 요청하는 경우",
  "대량 잔여물의 반출·처리가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["상담과 현장 정보 확인", "주소, 면적, 구조, 신축·기존 주택 여부, 오염 상태와 희망 일정을 확인합니다. 공사나 보수, 가전 설치가 예정되어 있다면 함께 알려주세요."],
  ["작업 범위와 견적 안내", "주요 공간과 세부 작업, 별도 요청을 구분합니다. 필요한 인원과 장비·약품을 검토하고 포함·제외 항목을 안내합니다."],
  ["작업 전 상태 확인", "짐과 잔여물, 기존 파손이나 누수 등 현장 상태를 살펴봅니다. 사진으로 확인하기 어려웠던 오염이나 작업 제한이 있다면 해당 내용을 먼저 안내합니다."],
  ["공간별 청소", "주방, 욕실, 창틀, 바닥 등 합의한 항목에 따라 작업합니다. 표면 재질과 상태를 고려하며, 탈거 작업은 사전에 정한 범위 안에서 진행합니다."],
  ["마무리와 검수", "처음 정한 작업 항목과 주요 오염 구간을 확인합니다. 작업 범위 안에서 추가 확인이 필요한 부분과 청소 외 보수가 필요한 부분을 구분해 안내합니다."],
];

const caseChecklist = [
  "창틀과 모서리의 먼지",
  "청소 범위에 포함된 수납장 내부",
  "싱크대와 주방 주변 오염",
  "욕실의 물때와 배수구 작업 부위",
  "바닥 가장자리와 문 주변",
  "처음 집중 청소를 요청한 구역",
];

const reservationChecklist = [
  "기존 거주자의 퇴거일",
  "인테리어·보수 공사 종료일",
  "가전과 붙박이 가구 설치일",
  "입주청소 희망일",
  "이삿짐 반입일과 시간",
  "입주 후 실제 사용 시작일",
];

const prepItems = [
  "집 안에 남아 있는 짐과 가구를 알려주세요.",
  "수납장 내부 작업이 있다면 내용물 정리 범위를 맞춰주세요.",
  "전기와 수도를 사용할 수 있는지 확인해 주세요.",
  "출입 방법과 작업 가능한 시간을 알려주세요.",
  "주차와 엘리베이터 이용 조건을 확인해 주세요.",
  "관리사무소의 작업 관련 안내사항을 전달해 주세요.",
  "기존 파손·누수·곰팡이 등 특이사항을 알려주세요.",
  "공사와 가전 설치 일정을 공유해 주세요.",
  "완료 확인 방법과 연락 가능한 시간을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["입주청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 정하지 않습니다. 구조와 오염 상태, 청소 항목을 확인하고 필요한 인원과 장비·약품을 기준으로 견적을 안내합니다."],
  ["신축 입주청소와 기존 주택 이사청소는 어떻게 다른가요?", "신축은 공사 분진과 마감 잔여물 등을, 기존 주택은 생활하면서 쌓인 기름때·물때·먼지 등을 확인합니다. 실제 범위와 비용은 집의 상태에 따라 정합니다."],
  ["수납장 내부도 청소하나요?", "수납장 내부와 서랍·선반의 작업 범위를 견적 단계에서 확인합니다. 탈거가 필요한 경우에는 구조와 상태에 따라 가능 여부를 정합니다."],
  ["창문을 모두 분리해서 청소하나요?", "모든 창문을 일괄 탈거하지 않습니다. 구조, 상태, 작업 조건을 확인하고 탈거 여부와 세척할 면을 구분해 안내합니다."],
  ["외창도 기본으로 포함되나요?", "외창은 접근 조건에 따라 별도 확인이 필요합니다. 내부 유리와 외부 유리를 구분해 실제 포함 범위를 안내합니다."],
  ["냉장고·에어컨·세탁기 내부도 청소하나요?", "가전 내부·분해 세척은 일반 공간 청소와 별도 항목입니다. 기기 종류와 요청 내용을 알려주시면 가능 여부와 비용을 확인합니다."],
  ["가구나 짐이 있어도 가능한가요?", "짐의 양과 배치, 접근 가능한 범위를 확인해야 합니다. 빈집 작업과는 범위·시간이 달라질 수 있으며, 가구 이동이 자동으로 포함되는 것은 아닙니다."],
  ["곰팡이나 냄새도 모두 없어지나요?", "오염과 냄새의 원인, 자재 상태에 따라 다릅니다. 표면 청소로 해결할 부분과 원인 보수·교체 등이 필요한 부분을 구분하며, 완전 제거를 일괄 보장하지 않습니다."],
  ["신축 아파트 입주청소에 새집 냄새 제거도 포함되나요?", "입주청소와 냄새·새집증후군 관리는 구분합니다. 정밀청소에 냄새 제거와 새집증후군 관리까지 원하시면 프리미엄청소의 구성과 적용 범위를 함께 상담해주세요."],
  ["이사 당일에도 청소할 수 있나요?", "퇴거, 청소, 검수, 이삿짐 반입 사이에 충분한 시간이 있는지 확인해야 합니다. 같은 날이라면 각 작업 시간을 상담 시 알려주세요."],
  ["청소 중 꼭 현장에 있어야 하나요?", "출입과 작업 전후 확인 방법을 상담 시 정합니다. 비대면 진행을 원하시면 가능 여부와 연락·검수 방식을 미리 확인해 주세요."],
  ["청소가 미흡하면 어떻게 하나요?", "작업 범위 안에서 미흡한 부분의 위치와 상태를 알려주세요. 작업 내용과 현장 상태를 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인하실 수 있습니다."],
];

const contactChecklist = [
  "현장 주소와 주택 유형",
  "면적과 방·욕실의 수",
  "신축·기존 주택 여부",
  "베란다와 다용도실 구성",
  "전체 공간과 주요 오염 부위 사진",
  "가구·짐의 유무",
  "수납장·외창·가전 등 추가 요청",
  "공사 종료일과 입주청소 희망일",
  "이삿짐 반입 예정 시간",
  "주차와 출입 조건",
];

const caseIds = ["move-in-01", "move-in-02", "move-in-03"] as const;
const path = "/입주청소/";

export default function MoveInCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "입주청소",
      serviceType: "입주청소",
      description: "신축 아파트의 수납장 가루와 창틀 먼지, 욕실과 바닥에 남은 오염을 살펴 새 생활을 준비합니다. 찐청소는 입주할 집의 구조와 마감 상태를 확인하고, 기본 청소와 추가 요청을 구분해 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "입주청소", item: absoluteUrl(path) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <article className={`${readability.landing} ${readability.enhanced}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[max(650px,50vw)] md:justify-center md:py-20 lg:min-h-[max(620px,50vw)]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/hero-bg/movein-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:aspect-[3/2] md:w-3/4 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src="/images/hero-bg/movein-hero.webp" alt="" fill priority className="object-cover" sizes="(min-width: 768px) 75vw, 100vw" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>입주청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">아파트·빌라 입주청소, 가구가 들어오기 전 먼지부터 정리합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>신축 아파트의 수납장 가루와 창틀 먼지, 욕실과 바닥에 남은 오염을 살펴 새 생활을 준비합니다. 찐청소는 입주할 집의 구조와 마감 상태를 확인하고, 기본 청소와 추가 요청을 구분해 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">입주청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className={readability.layout}>
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} id="service-toc" />

        <div className={`${readability.body} space-y-14 text-gray-800`}>
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} guide={{ path, toc }} />
          <BackToContents />
          </section>


          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="입주청소 비용과 견적 산정 기준" />
            <ReadingParagraph>입주청소 비용은 면적만으로 결정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 평수라도 ","베란다 유무, "]}>같은 평수라도 방과 욕실의 수, 창문과 수납장의 구성, 베란다 유무, 오염 상태에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["참고하되, "]}>찐청소는 면적을 참고하되, 실제 청소에 필요한 인원과 장비·약품을 중심으로 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">평수가 같아도 청소할 곳은 다릅니다</h3>
            <ReadingParagraph className="mt-2">넓게 트인 집과 방·수납 공간이 여러 곳으로 나뉜 집은 작업 동선이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">집이 비어 있는지, 가구와 짐이 남아 있는지에 따라서도 접근 가능한 구간과 필요한 시간이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">몇 평인지와 함께 어떤 구조이고 어떤 상태인지 알려주시면 견적을 더 정확하게 안내할 수 있습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">신축과 기존 주택은 확인할 오염이 다릅니다</h3>
            <ReadingParagraph className="mt-2">신축은 공사 분진과 마감 잔여물 등 현장 상태를 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">기존 주택은 주방의 기름때, 욕실의 물때, 창틀의 누적 먼지 등 사용하면서 쌓인 오염을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">신축이라고 무조건 작업이 적거나, 기존 주택이라고 무조건 비용이 높아지는 것은 아닙니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가격을 비교할 때는 총금액과 함께 포함 범위와 추가 비용 조건을 살펴보세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">신축 분진은 어디까지 청소하나요?</h3>
            <ReadingParagraph className="mt-2 mb-6">수납장과 선반, 창틀, 몰딩, 바닥처럼 분진이 남기 쉬운 위치를 작업 범위에 맞춰 확인합니다. 탈거 가능한 부품과 고정된 설비 내부는 구분합니다. 공사 잔여물 제거, 하자 보수와 새집증후군 관리는 일반 입주청소와 같은 작업이 아닙니다.</ReadingParagraph>
            <ReadingParagraph>입주청소는 공간 이름뿐 아니라 세부 작업까지 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목을 기준으로 현장별 포함 범위를 정합니다. 수납장·가전 내부나 탈거 작업이 모두 자동으로 포함되는 것은 아니며, 견적 단계에서 구분해 안내합니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                  {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                  {item.photoPairs && (
                    <div className={`${readability.scopePhotos} mt-4 items-start`}>
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

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">일반 입주청소와 구분하는 작업</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">필요한 항목이 있으면 함께 알려주세요. 수행 가능 여부와 비용을 구분해 안내합니다.</ReadingParagraph>
            </div>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>처음 안내한 범위보다 작업이 늘어나거나 별도 공정이 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">오염이 심한 곳을 사진에서 빼지 말고 함께 보여주세요. 미리 확인할수록 현장에서 생길 수 있는 견적 차이를 줄이는 데 도움이 됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">추가 작업이 필요하면 내용과 비용을 확인하고 진행 범위를 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="입주청소 진행 순서와 소요 시간" />
            <ol className="mt-4 space-y-4">
              {processSteps.map(([title, body], i) => (
                <li key={title} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light font-black text-brand-dark">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-brand-dark">{title}</h3>
                    <ReadingParagraph className="mt-1">{body}</ReadingParagraph>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">입주청소는 몇 시간 걸리나요?</h3>
            <ReadingParagraph className="mt-2">면적, 공간 구성, 오염 정도, 탈거 범위와 투입 인원에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">모든 집에 같은 시간을 적용하기보다 현장 정보를 확인한 뒤 예상 소요 시간을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이삿짐 반입이나 가전 설치가 같은 날 예정되어 있다면 작업이 겹치지 않도록 상담 시 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 실제 사례 확인 기준" />
            <ReadingParagraph>입주청소 결과는 넓은 거실 사진만으로 판단하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">다음 부분을 함께 확인하면 작업 범위를 이해하기 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">사례를 비교할 때는 같은 평수인지뿐 아니라 신축인지 기존 주택인지, 오염 상태와 포함 범위가 비슷한지도 살펴보세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">빛이나 물기 때문에 달라 보일 수 있으므로 가능한 한 비슷한 조건에서 전후 상태를 확인하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진 제공이 필요하면 촬영할 구역과 전달 가능 여부를 상담 시 확인해 주세요.</ReadingParagraph>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">입주청소는 보통 짐을 들이기 전 빈 공간에서 작업하는 편이 범위를 확보하기 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">공사나 보수가 있다면 먼지가 발생하는 공정이 끝나는 시점과 이삿짐 반입일 사이에서 일정을 검토합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">함께 알려주시면 좋은 일정</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">무조건 이사 며칠 전에 해야 한다고 정하기보다, 작업과 검수에 필요한 여유를 확보하는 것이 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소 후 추가 공사나 설치가 있으면 다시 먼지가 생길 수 있으므로 전체 일정을 함께 맞춰주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 범위가 검수 기준입니다</h3>
            <ReadingParagraph className="mt-2">주방, 욕실, 창틀, 수납 공간 등 계약에 포함된 항목을 기준으로 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">특히 상담할 때 말씀하신 오염 구간은 완료 후 다시 살펴보는 것이 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 하자 점검은 다릅니다</h3>
            <ReadingParagraph className="mt-2">균열, 누수, 마감 불량, 부식, 흠집 등은 청소로 해결하는 항목이 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소 중 확인된 이상은 안내할 수 있지만, 입주청소가 전문 하자 점검이나 모든 하자의 발견을 보장하는 서비스는 아닙니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 위치와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 내용과 현장 상태를 확인하여 후속 처리 방법을 안내합니다. 사후 접수 방식과 처리 조건은 예약 전에 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 후 생긴 오염은 구분합니다</h3>
            <ReadingParagraph className="mt-2">이삿짐 반입, 설치 공사, 생활 중 생긴 오염과 작업 당시 미흡했던 부분은 구분해서 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가능하면 짐을 들이기 전에 주요 작업 구역을 살펴보는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="입주 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 전에 집을 한 번 더 청소하실 필요는 없습니다. 남겨둘 물건과 청소할 공간만 구분해 주시면 준비가 수월합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="자주 묻는 질문" />
            <div className="space-y-3">
              {faqItems.map(([q, a]) => (
                <details key={q} className="rounded-xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-[16.5px]">{q}</summary>
                  <ReadingParagraph className="mt-3">{a}</ReadingParagraph>
                </details>
              ))}
            </div>
          <BackToContents />
          </section>

          {/* 10. 문의 CTA */}
          <section id="contact" className="scroll-mt-36">
            <div className="rounded-2xl bg-brand-dark p-7 text-white">
              <ReadingParagraph className="text-xl font-bold">입주청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 어떤 집에 입주하시는지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">신축인지 기존 주택인지, 공사를 마친 상태인지, 짐이 비어 있는지에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>입주청소 견적 문의하기 →</CtaButton>
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
