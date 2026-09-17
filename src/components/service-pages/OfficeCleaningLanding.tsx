import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["safety", "사용 약품 안전성"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·정기관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "입주·이전 예정 사무실, 사용 중인 사무실, 공사 후 청소가 필요한 사무실"],
  ["기본 범위", "집기와 바닥 코팅을 제외한 전체 내부"],
  ["일회성 청소 견적", "필요한 인원과 장비·약품, 현장 작업량 기준"],
  ["정기청소 견적", "필요한 인원과 작업 시간, 방문 주기·범위 기준"],
  ["작업 일정", "사무실 운영시간과 희망 일정을 확인하여 안내"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소 면적과 공간 구성",
  "집기 배치와 접근 가능한 범위",
  "먼지, 바닥 오염, 공사 분진 등의 상태",
  "필요한 인원과 예상 작업 시간",
  "사용할 장비와 약품",
  "장비 반입 동선과 현장 작업 조건",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥과 모서리",
    body: "바닥 재질과 오염 상태에 맞춰 먼지와 오염을 제거합니다. 통로뿐 아니라 벽 쪽 가장자리, 모서리, 집기 주변의 접근 가능한 바닥도 살펴봅니다.",
    note: "바닥 세척은 기본 범위에 포함되지만, 왁스나 코팅제를 도포하는 작업은 포함되지 않습니다.",
    photoPairs: [["office-corner-01.webp", "office-corner-02.webp"], ["office-corner-03.webp", "office-corner-04.webp"]],
  },
  {
    title: "내부 유리와 창틀",
    body: "내부에서 접근 가능한 유리와 창틀의 먼지, 손자국, 오염을 청소합니다.",
    note: "외벽 유리나 외부 고소작업이 필요한 구간은 내부 청소와 구분합니다.",
    photoPairs: [["office-window-01.webp", "office-window-02.webp"], ["office-window-03.webp", "office-window-04.webp"]],
  },
  {
    title: "벽면·문·몰딩",
    body: "표면 재질과 상태를 살펴 먼지와 제거 가능한 오염을 정리합니다.",
    note: "벽지나 도장면은 바닥처럼 강하게 문지르거나 물을 많이 사용할 수 없는 경우가 있습니다. 청소로 제거할 오염과 변색·손상처럼 보수가 필요한 부분을 구분해 안내합니다.",
    photoPairs: [["office-wall-01.webp", "office-wall-02.webp"], ["office-wall-03.webp", "office-wall-04.webp"]],
  },
  {
    title: "디퓨저와 손이 잘 닿지 않는 구역",
    body: "디퓨저 등 환기구 부위와 높은 곳의 먼지도 확인합니다.",
    note: "환기구 주변 청소와 공조설비 내부 분해·덕트 청소는 서로 다른 작업입니다. 높이와 구조에 따라 접근 방법과 작업 범위를 정합니다.",
    photoPairs: [["office-diffuser-01.webp", "office-diffuser-02.webp"], ["office-diffuser-03.webp", "office-diffuser-04.webp"]],
  },
  {
    title: "시스템박스와 배전반",
    body: "바닥 시스템박스와 배전반처럼 놓치기 쉬운 곳의 분진도 확인 대상입니다.",
    note: "전기설비가 있는 구역은 일반 바닥과 구분하여 안전한 작업 가능 여부를 먼저 확인합니다. 내부 분진 청소는 필요한 안전조치와 담당 범위를 확인한 뒤 진행하며, 전기 점검·수리 작업은 포함하지 않습니다.",
  },
  {
    title: "사무실 내부 화장실·탕비 공간",
    body: "사무실 전용 화장실과 탕비 공간이 있다면 바닥과 벽면 등 내부 청소 범위에 반영합니다.",
    note: "건물 공용 화장실·복도는 사무실 전용 공간과 구분하고, 냉장고·정수기·커피머신 등 집기와 기기 청소는 기본 범위에서 제외합니다.",
    photoPairs: [["office-restroom-01.webp", "office-restroom-02.webp"], ["office-restroom-03.webp", "office-restroom-04.webp"]],
  },
];

const exclusions = [
  "책상·의자·수납장 등 집기 자체의 청소",
  "컴퓨터·복합기 등 전산장비와 전자기기 청소",
  "바닥 왁스 및 코팅 시공",
  "공조설비·전기설비의 분해, 점검, 수리",
  "외부 고소작업",
  "철거·보수 등 청소 외 공사",
];

const extraCostItems = [
  "집기 청소나 이동이 추가되는 경우",
  "바닥 코팅 등 별도 서비스를 요청하는 경우",
  "본드·도료 등 일반 세척과 다른 제거 작업이 필요한 경우",
  "높은 곳이나 좁은 구간에 별도 장비가 필요한 경우",
  "상담 때 확인되지 않은 공간이나 오염이 있는 경우",
  "제한된 시간 안에 작업하기 위해 인원 구성이 달라지는 경우",
];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "주소, 면적, 사용 중인지 비어 있는지, 오염 상태, 희망 일정을 확인합니다. 공사 후 청소라면 공사 내용과 남은 일정도 함께 살펴봅니다."],
  ["작업 범위와 견적 안내", "기본 청소 범위와 추가 요청을 구분하고, 필요한 인원·장비·약품을 기준으로 견적을 안내합니다. 출입 제한 구역과 업무시간도 이 단계에서 확인합니다."],
  ["구역별 청소", "현장 구조와 업무 동선을 고려해 작업 순서를 정합니다. 높은 곳, 창틀, 벽면, 바닥 등 작업 구역을 나누어 진행하고, 전산장비와 중요 서류가 있는 곳은 사전에 정한 접근 범위를 따릅니다."],
  ["마무리와 검수", "작업 범위에 해당하는 곳을 확인하고, 남은 오염이나 추가 확인이 필요한 부분을 안내합니다."],
];

const caseChecklist = [
  "창틀과 모서리에 쌓여 있던 먼지",
  "통로와 집기 주변 바닥의 오염",
  "내부 유리의 손자국과 얼룩",
  "디퓨저 등 손이 잘 닿지 않는 곳",
  "처음에 청소를 요청했던 오염 구간",
];

const areaChecklist: [string, string][] = [
  ["입주·이전 청소", "집기 반입일과 업무 시작일"],
  ["사용 중인 사무실", "직원 근무시간과 회의 일정"],
  ["공사 후 청소", "분진이 발생하는 공정의 종료 시점"],
  ["정기청소", "출입 가능한 요일과 시간대"],
];

const prepItems = [
  "중요 서류, 현금, 귀중품은 미리 보관해 주세요.",
  "출입하면 안 되는 구역과 촬영 제한 여부를 알려주세요.",
  "서버실과 전산장비 주변의 접근 제한을 안내해 주세요.",
  "집기 이동이 필요하다면 사전에 말씀해 주세요.",
  "주차, 엘리베이터, 장비 반입 가능 시간을 확인해 주세요.",
  "건물 관리실의 작업 관련 규정을 전달해 주세요.",
  "누수, 파손, 들뜸 등 기존 이상 부위를 알려주세요.",
];

const faqItems: [string, string][] = [
  ["사무실청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 견적을 정하지 않습니다. 면적과 함께 집기 배치, 오염 상태, 필요한 인원과 장비·약품을 확인합니다. 같은 평수라도 작업량이 다르면 비용이 달라질 수 있습니다."],
  ["기본 청소 범위는 어디까지인가요?", "일회성 청소는 집기와 바닥 코팅을 제외한 전체 내부가 기본입니다. 현장 구조와 접근 조건에 따라 세부 항목을 정하며, 설비 분해·수리와 외부 고소작업은 구분합니다."],
  ["책상과 의자도 닦아주시나요?", "책상·의자 등 집기 자체의 청소는 기본 범위에 포함되지 않습니다. 필요하시면 상담할 때 요청해 주세요."],
  ["집기가 있는 상태에서도 청소할 수 있나요?", "집기가 있는 상태의 작업도 상담할 수 있습니다. 다만 접근 가능한 구간과 집기 이동 필요 여부에 따라 작업 범위와 시간이 달라집니다. 집기 이동이 기본으로 포함된 것으로 생각하지 마시고 사전에 확인해 주세요."],
  ["바닥 왁스코팅도 포함인가요?", "아니요. 바닥 세척과 왁스코팅은 별도 작업입니다. 코팅을 원하시면 바닥 상태를 확인하여 별도로 안내합니다."],
  ["정기청소 비용은 어떻게 정하나요?", "필요 인원과 작업 시간을 바탕으로 방문 주기와 회차별 청소 범위를 반영합니다. 매회 관리할 곳과 일정 주기로 관리할 곳을 나누어 정합니다."],
  ["직원들이 근무하는 중에도 가능한가요?", "사용 구역, 소음, 이동 동선 등을 확인해야 합니다. 업무 중 구역을 나누어 진행할지, 비업무 시간에 진행할지 현장에 맞춰 일정을 조율합니다."],
  ["야간이나 주말에도 가능한가요?", "희망 날짜와 시간대를 알려주시면 가능 여부를 확인합니다. 건물 출입과 장비 사용 제한도 함께 알려주세요."],
  ["공사 후 사무실청소도 가능한가요?", "가능합니다. 공사 분진의 양과 잔여물 상태를 확인해 작업 범위를 정합니다. 본드나 도료처럼 일반 세척과 다른 작업이 필요한 오염은 사진으로 미리 알려주세요."],
  ["사진만으로 견적을 받을 수 있나요?", "전체 공간과 주요 오염 부위 사진을 보내주시면 초기 상담에 도움이 됩니다. 사진으로 판단하기 어려운 구조나 오염이 있다면 현장 확인이 필요할 수 있습니다."],
  ["청소 후 바로 업무를 시작할 수 있나요?", "바닥 상태와 건조, 작업 내용에 따라 달라집니다. 업무 재개 예정 시간을 미리 알려주시면 작업 일정과 함께 안내합니다."],
];

const contactChecklist = [
  "현장 주소와 층수",
  "대략적인 면적",
  "사용 중인지, 비어 있는지",
  "일회성 청소인지, 정기청소인지",
  "전체 공간과 오염 부위 사진",
  "희망 날짜와 업무 재개 예정 시간",
  "집기 청소·바닥 코팅 등 추가 요청",
  "주차와 장비 반입 조건",
];

const caseIds = ["office-03", "office-02", "office-01"] as const;
const extraCaseIds = ["office-05", "office-06", "office-07"] as const;
const path = "/사무실청소/";

export default function OfficeCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const extraCases = extraCaseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "사무실청소",
      serviceType: "사무실청소",
      description: "찐청소 사무실청소의 기본 범위와 견적 기준을 확인하세요. 집기와 바닥 코팅을 제외한 내부 청소부터 정기청소까지, 현장 상태와 필요한 인원·작업 시간에 맞춰 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "사무실청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/office-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>사무실청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">사업장청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">사무실청소, 어디까지 하는지부터 분명하게</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>바닥은 닦았는데 창틀에는 먼지가 남아 있고, 평수는 같은데 견적은 제각각이라면. 사무실청소는 가격과 함께 작업 범위를 살펴봐야 합니다.</p>
            <p>찐청소의 일회성 사무실청소는 집기와 바닥 코팅을 제외한 전체 내부를 기본으로 합니다. 눈에 보이는 바닥뿐 아니라 디퓨저, 창틀, 구석처럼 평소 손이 잘 닿지 않는 곳도 살펴봅니다.</p>
            <p>비용은 평수만으로 정하지 않습니다. 현장에 필요한 인원과 장비·약품, 실제 작업량을 기준으로 안내합니다.</p>
            <p>직원분들은 업무에 집중하세요. 먼지까지 업무 분담할 필요는 없으니까요.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">사무실청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[190px_1fr]">
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} />

        <div className="space-y-14 text-[17px] leading-8 text-gray-800">
          {/* 핵심 정보 표 - 눈이 편하게, 한눈에 스캔 가능하도록 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} />
          </section>

          {/* 약품 안전성 - "약품"이 언급되는 견적 기준 앞에 배치해 신뢰를 먼저 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">사용하는 약품, 인체에 안전한가요?</h2>
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 사무실처럼 사람이 계속 머무는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="사무실청소 비용과 견적 산정 기준" />
            <p>사무실청소 비용은 면적만으로 결정하기 어렵습니다. 같은 평수라도 집기 배치, 오염 상태, 작업 가능한 시간에 따라 필요한 인원과 작업량이 달라지기 때문입니다.</p>
            <p className="mt-4">찐청소는 면적을 참고하되, 실제 현장을 청소하는 데 필요한 인원과 장비·약품을 중심으로 견적을 산정합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">집기가 많은 50평과 비어 있는 100평은 다릅니다</h3>
            <p className="mt-2">책상과 수납장, 전선이 빽빽한 50평 사무실은 이동과 장비 사용에 제약이 있습니다. 집기를 청소하지 않더라도 주변 바닥을 나누어 작업하고, 좁은 틈과 모서리를 살피는 데 시간이 필요합니다.</p>
            <p className="mt-2">반면 비어 있는 100평 사무실은 면적이 넓어도 작업 동선이 단순할 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">그래서 넓다고 무조건 비싸고, 작다고 무조건 저렴한 것은 아닙니다. 평수는 출발점이고, 견적의 기준은 실제 작업입니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진으로 파악하기 어려운 부분은 현장 확인이 필요할 수 있습니다. 금액과 함께 어디까지 작업하는지 확인해야 견적을 제대로 비교할 수 있습니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소는 인원과 작업 시간을 기준으로 합니다</h3>
            <p className="mt-3">정기청소는 필요한 인원과 시간당 작업 비용을 바탕으로, 방문 주기와 회차별 작업 범위를 정합니다.</p>
            <p className="mt-3">일회성 청소가 쌓인 오염을 정리하는 작업이라면, 정기청소는 사용하면서 생기는 오염을 꾸준히 관리하는 방식입니다.</p>
            <p className="mt-3">매번 관리할 구역과 일정 주기로 관리할 구역을 나누면, 필요한 곳에 작업 시간을 배분하기 좋습니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="사무실청소 기본 범위와 제외 항목" />
            <p>일회성 사무실청소의 기본 범위는 집기와 바닥 코팅을 제외한 전체 내부입니다.</p>
            <p className="mt-4">다만 &lsquo;전체 내부&rsquo;가 설비 분해, 가구 이동, 전기 작업까지 뜻하는 것은 아닙니다. 현장에 있는 공간과 안전하게 접근 가능한 범위를 기준으로 세부 작업 항목을 정합니다.</p>

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
                  {item.title === "시스템박스와 배전반" && (
                    <div className="mt-4 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {["office-panel-01.webp", "office-panel-02.webp", "office-panel-03.webp", "office-panel-04.webp"].map(photo => (
                          <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                            <Image src={`/images/portfolio-v2/${photo}`} alt="배전반 실제 현장 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {["office-systembox-01.webp", "office-systembox-02.webp", "office-systembox-03.webp", "office-systembox-04.webp"].map(photo => (
                          <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                            <Image src={`/images/portfolio-v2/${photo}`} alt="시스템박스 실제 현장 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <p className="font-bold text-brand-dark">기본 범위에 포함되지 않는 작업</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {exclusions.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">추가로 필요한 작업이 있다면 상담할 때 함께 알려주세요. 가능 여부와 비용을 구분해 안내합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>추가 비용은 처음 안내한 범위보다 작업이 늘어나거나, 별도 공정이 필요한 경우에 달라질 수 있습니다.</p>
            <p className="mt-4 font-bold text-brand-dark">대표적으로 다음 사항을 확인합니다.</p>
            <ul className="mt-3 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 보내실 때 심하게 오염된 곳과 접근하기 어려운 곳도 함께 보여주시면 견적의 정확도를 높일 수 있습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="사무실청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 시간은 얼마나 걸리나요?</h3>
            <p className="mt-2">면적뿐 아니라 집기 밀도, 오염 정도, 투입 인원, 현장 접근 조건에 따라 달라집니다.</p>
            <p className="mt-2">같은 사무실도 전체를 비우고 한 번에 작업하는 경우와 업무 중 구역을 나누어 작업하는 경우는 소요 시간이 다를 수 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">예상 종료 시간과 공간 사용 재개 시점은 상담 시 함께 확인해 주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진에서 확인할 부분" />
            <p>사무실청소 전후 사진은 바닥이 얼마나 반짝이는지만 보지 마세요.</p>
            <p className="mt-4 font-bold text-brand-dark">다음 부분을 함께 보면 작업 범위를 이해하기 쉽습니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">전후 상태는 가능한 한 같은 위치와 비슷한 조명에서 비교하는 것이 좋습니다. 바닥 청소와 코팅은 다른 서비스이므로, 청소 결과를 광택만으로 판단하기보다는 오염이 정리됐는지 살펴보세요.</p>

            <div className="mt-6 space-y-8">
              {cases.map(item => <CaseFigure key={item.id} item={item} />)}
            </div>

            {extraCases.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-brand-dark">현장에서 직접 찍은 전후 사진 더 보기</h3>
                <div className="mt-5 space-y-8">
                  {extraCases.map(item => <CaseFigure key={item.id} item={item} />)}
                </div>
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 안내합니다.</p>
            <p className="mt-4">사무실청소는 &lsquo;언제 청소할지&rsquo;만큼 &lsquo;언제 다시 사용할지&rsquo;도 중요합니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {areaChecklist.map(([title, body]) => (
                <li key={title} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                  <span className="font-bold text-brand-dark">{title}</span>
                  <span className="text-gray-600">: {body}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">야간이나 주말 작업을 원하시면 상담 시 알려주세요. 현장과 일정에 따라 가능 여부를 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">공사가 남아 있다면 청소 후 먼지가 다시 생길 수 있으므로, 공정 일정까지 함께 맞추는 편이 좋습니다.</p>
          </section>

          {/* 7. 검수/정기관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 정기관리" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 범위대로 확인합니다</h3>
            <p className="mt-2">완료 후에는 바닥, 창틀, 내부 유리, 구석 등 약속한 작업 항목을 기준으로 확인합니다.</p>
            <p className="mt-2">특히 처음 상담할 때 말씀하신 오염 구간은 검수 때 다시 살펴보는 것이 좋습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">작업 범위 안에서 미흡한 부분이 보이면 해당 위치와 상태를 알려주세요. 작업 내용과 현장 상태를 확인해 후속 처리 방법을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">정기청소는 사무실 사용 방식에 맞춥니다</h3>
            <p className="mt-2">직원이 많이 오가는 통로와 거의 사용하지 않는 공간은 오염이 쌓이는 속도가 다릅니다.</p>
            <p className="mt-2">정기청소는 모든 구역을 매번 똑같이 관리하기보다, 사용 빈도와 오염 정도에 맞춰 회차별 작업을 구성하는 것이 중요합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">일회성 전체 청소 범위가 정기청소 때마다 그대로 적용되는 것은 아닙니다. 계약 전에 매회 작업과 주기적으로 할 작업을 구분해 두면 관리 기준이 명확해집니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="사무실청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 전에 사무실을 완벽하게 정리하실 필요는 없습니다. 다만 중요한 물건과 작업 제한 구역을 미리 구분해 주시면 진행이 한결 수월합니다.</p>
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
              <p className="text-xl font-bold">사무실청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 어떤 사무실인지 알려주세요.</p>
              <p className="mt-2 text-white/80">같은 50평이라도 비어 있는 사무실인지, 책상 사이로 겨우 지나갈 수 있는 사무실인지에 따라 필요한 작업이 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>사무실청소 견적 문의하기 →</CtaButton>
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
