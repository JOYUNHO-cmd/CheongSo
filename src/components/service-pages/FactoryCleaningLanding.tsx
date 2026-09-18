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
  ["scope", "공간·설비별 범위"],
  ["extra", "추가 비용·별도 산정"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "공장 내부, 바닥, 창고, 부속 공간, 유니트쿨러, 기계설비"],
  ["주요 작업", "기름때·분진 제거, 유니트쿨러 내부·외부 세척, 기계설비청소"],
  ["설비별 확인", "기계 내부·분해 세척은 종류와 구조에 따라 가능 여부 판단"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염 상태, 접근 조건과 작업량"],
  ["비용 구분", "유니트쿨러·기계설비청소는 기본 공간 청소와 별도 산정"],
  ["일정 조율", "생산 일정, 설비 정지 가능 시간, 물류 이동 시간 반영"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소 면적과 공간 구성",
  "생산 품목과 오염의 종류",
  "바닥 재질과 기존 표면 상태",
  "기계·자재 배치와 접근 가능한 구간",
  "필요한 인원과 예상 작업 시간",
  "장비·약품 및 오염물 회수 조건",
  "물·전원 사용과 장비 반입 조건",
  "생산 중 작업인지, 비가동 시간 작업인지",
];

const machineChecklist = [
  "기계 종류와 사용 용도",
  "청소할 부위와 오염 상태",
  "물·약품 사용 제한",
  "내부 접근과 분해 필요 여부",
  "분해·재조립의 담당 범위",
  "필요한 안전조치와 재가동 확인 절차",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "공장 바닥과 이동 통로",
    body: "바닥 재질과 오염 상태에 맞춰 먼지와 기름때 등 제거 가능한 오염을 청소합니다. 주요 통로뿐 아니라 벽 쪽 가장자리, 모서리, 접근 가능한 설비 주변도 확인합니다.",
    note: "바닥 세척과 코팅·도장 보수는 다른 작업입니다. 오염을 제거한 뒤에도 기존 마모나 변색, 벗겨짐은 남을 수 있습니다.",
  },
  {
    title: "기름때와 고착 오염",
    body: "기름때는 오염의 종류와 쌓인 정도, 바닥 상태를 확인해 작업 방법을 정합니다. 표면에 묻은 오염과 바닥에 스며든 흔적은 결과가 다를 수 있습니다. 필요한 경우 일부 구간을 먼저 확인해 예상 결과와 작업 범위를 안내합니다.",
    note: "계속 누유가 발생하는 곳은 청소와 별도로 원인에 대한 조치가 필요합니다.",
  },
  {
    title: "먼지와 분진이 쌓인 구역",
    body: "바닥과 가장자리, 설비 주변 등 요청 구역의 먼지와 분진을 확인합니다. 공장에서 발생한 분진을 모두 일반 먼지처럼 취급하지는 않습니다. 발생 공정과 성분, 현장 안전정보를 확인한 뒤 수행 가능한 작업인지 판단합니다.",
    note: "성분이 불분명하거나 별도 전문 대응이 필요한 잔여물은 일반 청소와 구분합니다.",
  },
  {
    title: "유니트쿨러 내부·외부 세척",
    body: "찐청소는 유니트쿨러 외부뿐 아니라 내부 세척도 진행합니다. 설비 구조와 오염 상태를 확인해 세부 세척 부위와 필요한 분해 범위를 정합니다. 설치 높이와 접근 조건, 주변 제품·자재의 보호 범위도 함께 살펴봅니다.",
    note: "작업 일정은 설비 정지 가능 시간과 사용 재개 일정을 고려해 조율합니다. 몇 대인지뿐 아니라 어디에 설치되어 있고 내부 상태가 어떤지를 알려주시면 견적 상담에 도움이 됩니다.",
  },
  {
    title: "기계설비청소",
    body: "생산에 사용하는 기계설비의 기름때와 분진 등 요청 부위의 오염을 확인해 청소합니다. 외부 표면 청소부터 내부 접근이나 분해가 필요한 세척까지, 설비 종류와 구조에 따라 가능한 범위가 달라집니다.",
    note: "기계마다 구조가 다른 만큼 같은 방식으로 일괄 세척하지 않습니다. 청소와 정비·수리는 별도 작업으로 구분합니다.",
  },
  {
    title: "설비 주변과 좁은 구간",
    body: "기계 주변 바닥과 설비 사이처럼 평소 관리가 어려운 곳의 접근 조건을 살펴봅니다.",
    note: "설비를 옮기지 않고 청소할 수 있는 곳과 이동이 필요한 곳을 구분합니다. 설비 이동이나 안전조치가 필요하다면 현장 담당자와 역할을 먼저 정합니다.",
  },
  {
    title: "창고와 적재 공간",
    body: "물품이 놓인 상태에서 작업할 통로, 비워진 구역, 적재대 주변 바닥 등을 확인합니다.",
    note: "재고와 팔레트, 중량물 이동은 자동으로 포함되지 않습니다. 누가 무엇을 이동할지, 어느 구역을 비울지 사전에 정해야 합니다.",
  },
  {
    title: "벽면·창틀·내부 유리와 부속 공간",
    body: "접근 가능한 높이와 표면 재질을 확인해 벽면, 창틀, 내부 유리의 오염을 청소합니다. 공장에 딸린 사무실·휴게실·화장실도 요청 범위에 포함해 상담할 수 있습니다.",
    note: "높은 천장 구조물과 외벽 유리 등은 접근 장비와 현장 조건을 별도로 검토합니다.",
  },
];

const extraCostItems = [
  "청소 구역이나 설비 수량이 추가되는 경우",
  "예상보다 두껍게 쌓인 오염이 확인되는 경우",
  "기계 내부·분해 세척이 추가되는 경우",
  "본드·도료 등 별도 제거 작업이 필요한 경우",
  "높은 곳의 작업에 별도 장비가 필요한 경우",
  "물 사용 제한 등으로 작업 방식이 달라지는 경우",
  "자재 이동이나 별도 반출 작업이 필요한 경우",
  "짧은 비가동 시간에 맞추기 위해 추가 인원이 필요한 경우",
];

const separateScopeItems = [
  "설비 점검·수리",
  "바닥 코팅·도장·연마·보수",
  "중량물과 설비 이동",
  "탱크 등 밀폐공간 내부 작업",
  "유해물질이나 성분 미상의 잔여물 처리",
  "폐유·폐액·슬러지 등 산업 잔여물 반출·처리",
];

const processSteps: [string, string][] = [
  ["현장과 설비 확인", "공장 위치, 면적, 생산 품목, 주요 오염과 요청 구역을 확인합니다. 유니트쿨러와 기계설비 청소를 원하시면 설비 사진, 종류, 수량, 설치 위치도 함께 살펴봅니다."],
  ["작업 범위와 견적 안내", "공간 청소와 설비 세척을 구분하고 필요한 인원과 장비·약품을 검토합니다. 기계 내부·분해 세척은 가능한 범위와 담당 역할을 확인해 견적에 반영합니다."],
  ["생산 일정과 작업 조건 조율", "생산구역, 물류 통로, 청소 구역을 나누고 작업 순서를 정합니다. 설비 정지와 필요한 안전조치, 제품·자재 보호, 분해·재조립이 필요한 경우의 담당 범위를 현장 담당자와 맞춥니다."],
  ["구역·설비별 청소", "합의한 범위와 현장 조건에 맞춰 작업합니다. 사전에 확인되지 않은 오염이나 손상, 접근 제한이 발견되면 해당 부분의 작업 가능 범위를 다시 확인합니다."],
  ["마무리와 검수", "주요 오염 구간, 남은 물기와 잔여물, 통로 상태를 확인합니다. 유니트쿨러와 기계설비는 합의한 세척 부위를 기준으로 결과를 확인합니다. 청소 완료와 설비 재가동 판단은 구분하며, 재가동은 현장 담당자의 확인 절차에 따릅니다."],
];

const caseChecklist = [
  "기름때가 쌓여 있던 바닥과 통로",
  "설비 주변의 접근 가능한 구간",
  "벽 쪽 가장자리와 모서리",
  "유니트쿨러의 합의된 내부·외부 세척 부위",
  "기계설비에서 청소를 요청한 부분",
  "처음 집중 작업을 요청한 오염 구간",
];

const reservationChecklist = [
  "생산라인의 운영·비가동 시간",
  "유니트쿨러와 기계설비의 정지 가능 시간",
  "입출고와 지게차 이동 시간",
  "설비 점검과 공사 일정",
  "제품·자재 이동 일정",
  "출입교육과 작업 승인에 필요한 시간",
  "청소 후 공간·설비 사용 재개 시점",
];

const prepItems = [
  "청소할 공간과 설비를 구분해 주세요.",
  "생산 품목과 주요 오염의 종류를 알려주세요.",
  "유니트쿨러·기계설비의 사진과 모델 정보를 준비해 주세요.",
  "분진·약품·잔여물 관련 안전정보가 있다면 전달해 주세요.",
  "물 사용 금지 구역과 민감한 설비를 알려주세요.",
  "제품·원자재·포장재의 이동과 보호 범위를 정해 주세요.",
  "설비 관련 안전조치와 재가동 확인 담당자를 알려주세요.",
  "분해·재조립이 필요하다면 담당 범위를 사전에 맞춰주세요.",
  "지게차와 작업자 이동 동선을 공유해 주세요.",
  "급수·전원, 장비 반입, 주차 조건을 확인해 주세요.",
  "오염수와 잔여물의 회수·처리 조건을 확인해 주세요.",
  "촬영 제한과 필요한 완료 자료를 알려주세요.",
];

const faqItems: [string, string][] = [
  ["공장청소 비용은 평당으로 정하나요?", "평수만으로 정하지 않습니다. 면적과 오염 상태, 설비 배치, 필요한 인원과 장비·약품을 확인해 견적을 안내합니다. 유니트쿨러와 기계설비는 종류·수량·작업 범위를 별도로 반영합니다."],
  ["공장 바닥이나 일부 구역만 맡길 수 있나요?", "필요한 구역만 지정해 상담할 수 있습니다. 청소할 면적과 오염 사진, 바닥 재질을 알려주세요."],
  ["유니트쿨러 내부도 세척하나요?", "네. 외부뿐 아니라 내부 세척도 진행합니다. 설비 구조, 오염 상태, 설치 높이와 접근 조건을 확인해 세부 범위와 비용을 안내합니다."],
  ["기계설비 내부나 분해 세척도 가능한가요?", "설비에 따라 가능합니다. 기계 종류와 구조, 청소할 부위, 분해 필요 여부를 확인한 뒤 작업 가능 범위를 정합니다. 모든 설비에 동일한 세척 방식을 적용하지는 않습니다."],
  ["유니트쿨러와 기계설비청소가 기본 비용에 포함되나요?", "기본 공간 청소와 구분해 견적을 산정합니다. 함께 요청하시면 공간별·설비별 작업 항목을 나누어 안내합니다."],
  ["기계 분해와 재조립도 모두 맡길 수 있나요?", "설비 종류와 작업 내용에 따라 담당 범위를 확인해야 합니다. 분해 세척 가능 여부와 함께 분해·재조립·재가동 확인을 누가 맡을지 사전에 정합니다."],
  ["오래된 기름때도 모두 제거되나요?", "오염의 종류와 침투 정도, 표면 상태에 따라 결과가 다릅니다. 제거 가능한 오염과 변색·손상을 구분하고, 필요한 경우 일부 구간을 확인해 예상 결과를 안내합니다."],
  ["생산 중에도 청소할 수 있나요?", "생산 공정과 청소 구역을 분리할 수 있는지, 서로의 작업에 영향이 없는지 확인해야 합니다. 설비 세척 등 가동 중지가 필요한 작업은 별도 시간대를 정합니다."],
  ["물을 사용할 수 없는 곳도 청소할 수 있나요?", "물 사용 제한과 오염 상태, 설비 조건을 확인한 뒤 가능한 작업 방법과 범위를 검토합니다."],
  ["공장 분진과 폐유·슬러지도 처리하나요?", "분진은 발생 공정과 성분, 위험성을 먼저 확인합니다. 폐유·폐액·슬러지 등의 반출·처리는 일반 청소에 자동으로 포함되지 않으며, 종류와 양에 따라 별도 대응 가능 여부를 검토합니다."],
  ["청소 후 바로 설비를 가동할 수 있나요?", "작업 내용과 건조·재조립 상태, 현장 점검 조건에 따라 달라집니다. 청소 완료와 재가동 판단은 별개이며, 현장 담당자의 확인 절차를 따라야 합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "전체 공간과 주요 오염 부위, 설비 사진은 초기 상담에 도움이 됩니다. 내부 구조나 오염 상태를 사진으로 판단하기 어렵다면 현장 확인이 필요할 수 있습니다."],
];

const contactChecklist = [
  "현장 주소와 생산·사용 용도",
  "청소 면적과 요청 구역",
  "전체 공간과 주요 오염 부위 사진",
  "유니트쿨러·기계설비의 종류, 수량, 사진",
  "내부 세척과 분해 작업 요청 여부",
  "물 사용과 설비 접근 제한",
  "생산·설비 정지 가능 시간",
  "희망 날짜와 사용 재개 예정 시간",
  "자재 이동과 잔여물 처리 등 추가 요청",
  "필요한 출입 조건과 완료 자료",
];

const caseIds: readonly string[] = [];
const path = "/공장청소/";

export default function FactoryCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "공장청소",
      serviceType: "공장청소·유니트쿨러청소·기계설비청소",
      description: "공장 바닥의 기름때·분진부터 유니트쿨러 내부 세척과 기계설비청소까지. 찐청소가 설비 구조, 오염 상태, 생산 일정에 맞춰 작업 범위와 비용을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "공장청소", item: absoluteUrl(path) },
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

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>공장청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">사업장청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">공장청소, 바닥부터 유니트쿨러·기계설비까지</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>공장 바닥에 쌓인 기름때와 분진, 설비 주변의 손이 닿기 어려운 구간, 내부 청소가 필요한 유니트쿨러와 기계설비. 공장청소는 넓은 바닥을 닦는 것만으로 끝나지 않습니다.</p>
            <p>찐청소는 공장 내부 공간 청소부터 유니트쿨러 내부·외부 세척, 기계설비청소까지 진행합니다. 기계설비의 내부·분해 세척은 설비 종류와 구조에 따라 가능한 범위를 확인합니다.</p>
            <p>비용은 평수만으로 정하지 않습니다. 필요한 인원과 장비·약품, 실제 작업량을 기준으로 안내합니다.</p>
            <p>생산 일정도 중요한 만큼, 청소할 구역과 설비를 먼저 나누고 작업 순서를 맞추겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">공장청소 견적 문의하기 →</CtaButton>
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

          {/* 약품 안전성 - "약품"이 언급되는 견적 기준 앞에 배치해 신뢰를 먼저 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">사용하는 약품, 인체에 안전한가요?</h2>
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 작업자가 함께 머무는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="공장청소 비용과 견적 산정 기준" />
            <p>공장청소 비용은 면적만으로 결정하기 어렵습니다.</p>
            <p className="mt-4">같은 100평이라도 비어 있는 창고와 기계·자재가 빽빽한 생산구역은 작업량이 다릅니다. 가벼운 먼지가 있는 바닥과 기름때가 오래 쌓인 바닥도 필요한 작업이 같지 않습니다.</p>
            <p className="mt-4">찐청소는 면적을 참고하되, 실제로 필요한 인원과 장비·약품을 중심으로 견적을 산정합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">평수보다 작업 조건이 중요한 경우가 있습니다</h3>
            <p className="mt-2">넓고 비어 있는 공간은 장비 이동이 수월할 수 있습니다. 반대로 좁더라도 설비 사이를 나누어 작업하거나 물 사용을 제한해야 하는 공간은 더 많은 시간과 준비가 필요할 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">평수는 같아도 청소할 일까지 같지는 않습니다. 얼마나 넓은지와 함께, 어떻게 청소해야 하는지를 확인합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">유니트쿨러와 기계설비는 별도로 산정합니다</h3>
            <p className="mt-2">설비 청소는 바닥 면적보다 설비 자체의 상태와 구조가 중요합니다.</p>
            <p className="mt-2">유니트쿨러는 수량, 크기, 설치 높이, 내부 오염과 접근 조건을 확인합니다.</p>
            <p className="mt-2">기계설비는 종류와 수량, 청소할 부위, 내부 접근이나 분해 필요 여부를 확인합니다. 같은 수량이라도 작업 내용이 다르면 비용이 달라질 수 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">공간 청소와 설비 청소를 함께 요청하시면 항목을 구분해 견적을 안내합니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소는 인원과 작업 시간을 기준으로 합니다</h3>
            <p className="mt-3">정기청소는 필요한 인원과 시간당 작업 비용을 바탕으로 방문 주기와 회차별 범위를 정합니다.</p>
            <p className="mt-3">오염이 자주 생기는 통로와 설비 주변, 사용 빈도가 낮은 창고 구역을 구분해 관리 계획을 세웁니다.</p>
            <p className="mt-3">유니트쿨러나 기계설비 세척이 필요하다면 일반 공간 청소와 구분해 작업 주기와 범위를 정합니다.</p>
          </section>

          {/* 2. 공간·설비별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간·설비별 청소 범위" />
            <p>공장청소는 요청하신 구역과 설비를 기준으로 범위를 정합니다.</p>
            <p className="mt-4">아래 작업이 모든 견적에 자동으로 포함되는 것은 아닙니다. 공간 청소, 유니트쿨러 세척, 기계설비청소 중 필요한 항목을 선택해 상담할 수 있습니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                  {item.title === "기계설비청소" && (
                    <>
                      <p className="mt-3 font-bold text-brand-dark">작업 전 확인하는 내용</p>
                      <ul className="mt-2 space-y-2">
                        {machineChecklist.map(check => (
                          <li key={check} className="flex items-start gap-2 text-[15.5px]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                            {check}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. 추가비용/별도산정 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 별도 산정 항목" />
            <p>유니트쿨러와 기계설비청소는 기본 공간 청소와 구분해 견적에 반영합니다.</p>
            <p className="mt-4">그 밖에 처음 정한 범위보다 작업이 늘어나거나 별도 공정이 필요한 경우에도 비용이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <p className="font-bold text-brand-dark">다음 항목은 일반 청소와 구분해 수행 가능 여부부터 확인합니다</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교할 때는 총금액과 함께 세척 부위, 분해 범위, 오염물 회수·처리 범위도 확인해 주세요.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="공장청소 진행 순서와 소요 시간" />
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
            <p className="mt-2">면적과 오염 정도뿐 아니라 설비 수량, 내부 접근 조건, 분해 여부, 투입 인원에 따라 달라집니다.</p>
            <p className="mt-2">청소 시간 외에도 자재 이동, 안전조치, 재조립, 건조와 검수에 필요한 시간을 고려해야 합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">생산이나 설비 사용을 다시 시작해야 하는 시간이 있다면 상담 시 함께 알려주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>공장청소 결과는 전체 모습과 주요 오염 구간을 함께 살펴보는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">가능한 한 비슷한 위치와 조명에서 전후 상태를 비교하면 결과를 확인하기 쉽습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">바닥은 반짝임만으로 평가하지 않습니다. 설비 역시 외관이 깨끗해졌다는 것과 성능 점검·수리가 완료됐다는 것은 다른 의미입니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진이나 완료 자료가 필요하면 촬영할 구역과 제출 형식을 미리 알려주세요. 제공 가능 범위를 확인해 안내합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">생산 공정과 제품, 설비 배치 등 촬영이 제한되는 내용은 현장 규정을 먼저 확인합니다.</p>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">공장청소는 언제 시작할지와 함께 언제 다시 사용할지를 맞추는 것이 중요합니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5">주말이나 휴무일 작업을 원하시면 희망 시간대를 알려주세요. 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">생산 중 작업은 청소 구역을 분리할 수 있는지 등 현장 조건을 확인한 뒤 판단합니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 범위를 기준으로 확인합니다</h3>
            <p className="mt-2">견적서나 작업 범위에 포함된 구역과 설비, 세척 항목을 기준으로 결과를 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">특히 처음 상담할 때 말씀하신 오염과 접근이 어려웠던 부분을 함께 살펴봅니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 기존 손상은 구분합니다</h3>
            <p className="mt-2">바닥에 스며든 흔적, 코팅 벗겨짐, 마모, 부식이나 파손은 세척만으로 원래 상태가 되지 않을 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">추가 청소가 필요한 부분과 정비·보수가 필요한 상태를 구분해 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">반복되는 오염은 발생 원인도 살펴야 합니다</h3>
            <p className="mt-2">누유나 분진 발생이 계속되면 청소 후에도 같은 구역에 오염이 다시 쌓일 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">발생 원인에 대한 조치와 청소 주기를 함께 검토하면 관리 기준을 세우는 데 도움이 됩니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">추가 확인이 필요한 곳은 알려주세요</h3>
            <p className="mt-2">작업 범위 안에서 미흡한 부분이 보이면 해당 위치와 상태를 알려주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장 상태를 확인하여 후속 처리 방법을 안내합니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="공장청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소를 위해 기계를 미리 분해해 두실 필요는 없습니다. 어디까지 분해할지, 누가 다시 조립하고 확인할지부터 맞추는 것이 먼저입니다.</p>
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
              <p className="text-xl font-bold">공장청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 어떤 공간과 설비를 청소할지 알려주세요.</p>
              <p className="mt-2 text-white/80">비어 있는 창고인지, 기름때가 쌓인 생산구역인지, 유니트쿨러 내부나 기계 분해 세척까지 필요한지에 따라 준비가 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>공장청소 견적 문의하기 →</CtaButton>
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
