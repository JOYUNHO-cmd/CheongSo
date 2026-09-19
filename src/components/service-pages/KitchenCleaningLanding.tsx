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
  ["scope", "구역별 범위·별도 확인"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "음식점·업소의 주방과 요청 부속 공간"],
  ["주요 상담", "바닥·벽면·조리 공간의 기름때와 누적 오염"],
  ["범위 확인", "후드·필터, 주방기기 내외부, 기기 이동 여부"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염 상태와 접근 조건"],
  ["일정 조율", "영업 종료, 조리 준비, 영업 재개 시간 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "주방 면적과 공간 구성",
  "기름때와 고착 오염의 정도",
  "바닥·벽면·조리대 등의 재질과 상태",
  "주방기기와 선반의 배치",
  "기기 이동 및 내부 세척 요청 여부",
  "후드·필터 등 추가 요청 항목",
  "필요한 인원과 예상 작업 시간",
  "물·전원 사용, 배수, 장비 반입 조건",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "주방 바닥과 가장자리",
    body: "바닥 재질과 상태에 맞춰 기름때와 제거 가능한 오염을 청소합니다. 주요 통로뿐 아니라 벽 쪽 가장자리와 모서리, 접근 가능한 기기 주변도 살펴봅니다.",
    note: "기기를 옮기지 않고 닿을 수 있는 구간과 이동해야 청소할 수 있는 구간은 구분합니다.",
    photoPairs: [["kitchen-floor-01.webp", "kitchen-floor-02.webp"], ["kitchen-floor-03.webp", "kitchen-floor-04.webp"]],
  },
  {
    title: "벽면과 조리 공간 주변",
    body: "조리 중 오염이 쌓인 벽면과 주변 표면을 확인합니다.",
    note: "타일, 금속, 도장면 등 표면 재질에 맞춰 작업 범위를 정하며, 오래된 변색이나 부식·손상은 제거할 오염과 구분합니다.",
    photoPairs: [["kitchen-wall-01.webp", "kitchen-wall-02.webp"], ["kitchen-wall-03.webp", "kitchen-wall-04.webp"]],
  },
  {
    title: "조리대와 싱크대",
    body: "조리대와 싱크대는 상판, 외부 표면, 하부 등 필요한 부위를 나누어 요청 범위를 정합니다. 식기와 조리도구, 식재료가 놓여 있다면 작업 전에 보관 위치와 정리 담당을 맞춥니다.",
    note: "음식과 직접 닿는 면은 사용한 제품의 지침에 맞는 마무리와 사용 전 확인이 중요합니다.",
    photoPairs: [["kitchen-counter-01.webp", "kitchen-counter-02.webp"], ["kitchen-counter-03.webp", "kitchen-counter-04.webp"]],
  },
  {
    title: "선반과 수납 공간",
    body: "선반 외부와 내부, 벽 쪽 틈 등 청소할 부위를 확인합니다.",
    note: "수납 공간 내부 청소가 필요하다면 내용물을 어디로 옮길지 먼저 정합니다. 식재료나 조리도구를 임의로 폐기하거나 재배치하지 않도록 범위를 맞춥니다.",
    photoPairs: [["kitchen-shelf-01.webp", "kitchen-shelf-02.webp"], ["kitchen-shelf-03.webp", "kitchen-shelf-04.webp"]],
  },
  {
    title: "후드와 필터",
    body: "후드는 외부 표면, 필터, 내부 접근 부위 등 어떤 부분을 청소할지 구분해야 합니다. 후드·필터 세척을 원하시면 구조와 오염 상태를 확인해 수행 가능한 범위와 비용을 안내합니다.",
    note: "후드 청소가 배기 덕트 전체나 팬·모터 세척까지 뜻하는 것은 아닙니다. 덕트 내부와 분해 작업은 별도 확인 항목입니다.",
    photoPairs: [["kitchen-hood-01.webp", "kitchen-hood-02.webp"], ["kitchen-hood-03.webp", "kitchen-hood-04.webp"]],
  },
  {
    title: "주방기기와 기기 주변",
    body: "가열기기, 냉장고 등은 외부 표면 청소와 내부·분해 세척을 구분합니다. 기기의 종류와 모델, 요청 부위, 물 사용 제한 등을 확인해 작업 가능 여부를 판단합니다.",
    note: "가스·전기·급배수에 연결된 기기의 이동이나 분리는 일반 공간 청소에 자동으로 포함되지 않습니다.",
    photoPairs: [["kitchen-appliance-01.webp", "kitchen-appliance-02.webp"], ["kitchen-appliance-03.webp", "kitchen-appliance-04.webp"]],
  },
  {
    title: "배수구와 주변 구역",
    body: "배수구 주변의 표면 오염과 접근 가능한 부분의 작업 범위를 확인합니다. 배수구 표면 청소, 배관 내부 세척, 막힘 해결은 서로 다른 작업입니다.",
    note: "냄새가 난다고 해서 표면 청소만으로 모든 원인이 해결되는 것은 아닙니다. 그리스트랩 내부 청소와 잔여물 처리가 필요하다면 별도 항목으로 알려주세요.",
    photoPairs: [["kitchen-drain-01.webp", "kitchen-drain-02.webp"], ["kitchen-drain-03.webp", "kitchen-drain-04.webp"]],
  },
];

const separateScopeItems = [
  "후드 내부·필터 및 배기 덕트 세척",
  "팬·모터 등 설비 분해 세척",
  "주방기기 내부·분해 청소",
  "중량 기기 이동과 연결부 분리·재설치",
  "배관 막힘 해결과 설비 수리",
  "그리스트랩 내부 청소와 잔여물 처리",
  "폐유·대량 잔여물 반출·처리",
  "소독·방역",
];

const extraCostItems = [
  "예상보다 두껍게 쌓인 기름때가 확인되는 경우",
  "선반·수납장 내부 청소가 추가되는 경우",
  "기기 이동 또는 내부 세척을 추가하는 경우",
  "후드·필터 등 별도 항목을 요청하는 경우",
  "물 사용이나 배수 제한으로 작업 방식이 달라지는 경우",
  "짧은 비영업 시간 안에 마쳐야 해 추가 인원이 필요한 경우",
  "식기·물품 이동이나 별도 잔여물 처리가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["현장과 요청 내용 확인", "주방 면적, 조리 방식, 오염 상태, 기기 배치, 희망 일정을 확인합니다. 특히 청소가 필요한 부분과 접근이 어려운 곳을 함께 살펴봅니다."],
  ["작업 범위와 견적 안내", "바닥·벽면 등 공간 청소와 후드·기기 관련 요청을 구분합니다. 필요한 인원과 장비·약품을 검토하고 포함 범위와 제외 항목을 안내합니다."],
  ["식재료·물품 보호와 일정 조율", "식재료와 식기, 조리도구의 보관 위치를 정합니다. 기기 사용 중지나 이동이 필요한 곳은 담당자와 역할을 확인하고, 영업 종료부터 다음 조리 준비까지 가능한 시간을 맞춥니다."],
  ["구역별 청소", "합의한 범위에 따라 작업합니다. 표면 상태를 살피며 진행하고, 사전에 확인되지 않은 손상이나 작업 제한이 발견되면 해당 부분을 안내합니다."],
  ["마무리와 검수", "주요 오염 구간, 남은 세척 잔여물과 물기, 통로 상태 등을 확인합니다. 기기 작업이 포함됐다면 합의한 청소 부위를 확인하고, 사용 재개에 필요한 현장 확인 사항도 함께 정리합니다."],
];

const caseChecklist = [
  "바닥과 벽 쪽 가장자리의 기름때",
  "조리대 주변과 싱크대의 요청 부위",
  "기기 사이와 접근 가능한 아래쪽",
  "선반과 수납 공간의 합의된 청소 구역",
  "후드·기기의 작업 대상 부위",
  "처음 집중 청소를 요청한 곳",
];

const reservationChecklist = [
  "영업 종료와 다음 영업 시작 시간",
  "조리 준비와 식재료 납품 일정",
  "휴무일 또는 작업 가능한 시간대",
  "냉장·냉동 보관이 필요한 식재료의 이동 계획",
  "건물 출입과 장비 반입 가능 시간",
  "소음·급수·배수 관련 제한",
];

const prepItems = [
  "청소할 구역과 우선 요청 부위를 알려주세요.",
  "식재료와 식기, 조리도구는 작업 구역과 분리해 주세요.",
  "냉장·냉동 보관이 필요한 식재료의 보관 장소를 정해 주세요.",
  "선반과 기기 내부 작업이 필요하면 내용물 정리 범위를 맞춰주세요.",
  "물을 사용하면 안 되는 기기와 구역을 알려주세요.",
  "기기 이동·분리가 필요하면 담당 범위를 사전에 정해 주세요.",
  "기존 고장, 누수, 파손, 부식 부위를 알려주세요.",
  "급수·전원·배수와 장비 반입 조건을 확인해 주세요.",
  "청소 후 조리 준비와 영업 시작 시간을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["업소 주방청소 비용은 평당 얼마인가요?", "평수만으로 정하지 않습니다. 기름때의 정도, 기기 배치, 작업 범위, 필요한 인원과 장비·약품을 확인해 견적을 안내합니다."],
  ["바닥이나 특정 구역만 맡길 수 있나요?", "필요한 구역만 지정해 상담할 수 있습니다. 전체 주방 사진과 청소를 원하는 부위의 사진을 보내주세요."],
  ["오래된 기름때도 모두 제거되나요?", "오염의 종류와 고착 정도, 표면 상태에 따라 결과가 다릅니다. 제거 가능한 오염과 변색·부식·손상을 구분해 안내합니다."],
  ["후드청소도 기본으로 포함되나요?", "기본 포함으로 보지 않고 별도 항목으로 확인합니다. 외부 표면, 필터, 내부 등 원하는 부위를 알려주시면 구조와 상태에 따라 수행 가능 범위와 비용을 안내합니다."],
  ["후드를 청소하면 덕트 내부까지 청소되는 건가요?", "아니요. 후드와 배기 덕트 전체는 작업 범위가 다릅니다. 덕트 내부, 팬·모터 등은 별도 확인이 필요합니다."],
  ["냉장고나 조리기기 내부도 청소하나요?", "기기 종류와 요청 부위에 따라 수행 가능 여부를 확인합니다. 외부 청소와 내부·분해 세척은 구분하며, 내부 물품 정리와 이동 범위도 미리 정합니다."],
  ["기기 아래쪽까지 청소할 수 있나요?", "기기를 움직이지 않고 접근 가능한 곳과 이동해야 하는 곳을 구분합니다. 무겁거나 설비에 연결된 기기의 이동은 별도 조건을 확인해야 합니다."],
  ["주방 냄새도 청소하면 없어지나요?", "냄새의 원인에 따라 다릅니다. 표면 오염뿐 아니라 배수·배관이나 기기 상태와 관련된 경우도 있어, 청소만으로 모두 해결된다고 약속하지 않습니다."],
  ["소독이나 방역도 포함되나요?", "일반 청소와 별도 작업입니다. 필요하시면 대상 구역과 요청 내용을 알려주셔야 제공 가능 여부와 비용을 확인할 수 있습니다."],
  ["영업이 끝난 뒤 야간에 작업할 수 있나요?", "희망 날짜와 작업 가능 시간을 알려주시면 일정과 현장 조건을 확인합니다. 다음 영업을 위한 조리 준비 시간도 함께 알려주세요."],
  ["청소 후 바로 조리해도 되나요?", "작업 내용과 건조·마무리 상태에 따라 달라집니다. 음식과 닿는 면, 기기 상태와 작업 구역을 확인하고 현장의 영업 준비 절차에 따라 사용을 재개해 주세요."],
  ["사진만으로 견적을 받을 수 있나요?", "전체 구조와 오염 부위 사진은 초기 상담에 도움이 됩니다. 기기 뒤쪽이나 내부 상태 등 사진으로 판단하기 어려운 부분은 현장 확인이 필요할 수 있습니다."],
];

const contactChecklist = [
  "매장 주소와 업종",
  "주방 면적과 요청 구역",
  "전체 주방과 주요 오염 부위 사진",
  "후드·주방기기 세척 요청 여부",
  "기기 이동과 내부 청소 필요 여부",
  "식재료·식기 보관과 정리 조건",
  "희망 날짜와 작업 가능 시간",
  "다음 조리 준비 및 영업 시작 시간",
  "급수·배수·장비 반입 제한",
];

const caseIds = ["kitchen-01", "kitchen-02", "kitchen-03"] as const;
const path = "/주방청소/";

export default function KitchenCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "주방청소",
      serviceType: "업소 주방청소",
      description: "찐청소 업소 주방청소의 비용과 작업 범위를 안내합니다. 바닥·벽면·조리 공간의 기름때, 후드와 주방기기의 세척 범위를 확인하고 영업 일정에 맞춰 견적을 상담하세요.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "주방청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>주방청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">사업장청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">주방청소, 쌓인 기름때부터 영업 일정까지 꼼꼼하게</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>매일 닦아도 끈적이는 바닥, 조리대 주변에 쌓인 기름때, 기기 사이와 벽 쪽에 남은 오래된 오염. 바쁜 영업 중에는 평소 손이 닿는 곳을 관리하는 것만으로도 시간이 빠듯합니다.</p>
            <p>찐청소는 음식점과 업소 주방의 오염 상태, 기기 배치, 작업 가능한 시간을 확인해 청소 범위를 정합니다.</p>
            <p>비용은 평수만으로 정하지 않습니다. 필요한 인원과 장비·약품, 실제 작업량을 기준으로 안내합니다.</p>
            <p>맛을 내는 일도 바쁘신데, 묵은 기름때와 씨름하는 일까지 떠안지 마세요. 어디까지 청소할지부터 분명하게 맞추겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">주방청소 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 음식을 다루는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="주방청소 비용과 견적 산정 기준" />
            <p>주방청소 비용은 면적뿐 아니라 기름때의 정도와 주방 구조에 따라 달라집니다.</p>
            <p className="mt-4">같은 크기라도 기기와 선반이 빽빽한 주방은 접근할 수 있는 구간이 제한됩니다. 기름때가 얇게 묻은 표면과 오랜 시간 두껍게 쌓인 구간도 필요한 작업이 다릅니다.</p>
            <p className="mt-4">찐청소는 현장에 필요한 인원과 장비·약품을 중심으로 실제 작업량을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작은 주방이라고 작업이 적은 것은 아닙니다</h3>
            <p className="mt-2">주방이 좁아도 조리기기 사이와 아래, 벽 쪽을 나누어 작업해야 한다면 시간이 더 필요할 수 있습니다.</p>
            <p className="mt-2">반대로 비어 있는 주방은 면적이 넓어도 작업 동선이 단순할 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">평수는 참고 자료이고, 견적의 기준은 청소할 내용입니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">전체 사진과 오염이 심한 부분의 가까운 사진을 함께 보내주시면 상담에 도움이 됩니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소는 인원과 작업 시간을 기준으로 합니다</h3>
            <p className="mt-3">정기청소는 필요한 인원과 시간당 작업 비용을 바탕으로 방문 주기와 회차별 범위를 정합니다.</p>
            <p className="mt-3">조리 방식과 사용량에 따라 오염이 쌓이는 구역이 다르므로, 자주 관리할 곳과 주기적으로 집중 청소할 곳을 구분합니다.</p>
            <p className="mt-3">일회성 대청소와 정기청소의 작업 범위는 별도로 정합니다.</p>
          </section>

          {/* 2. 구역별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="구역별 청소 범위와 별도 확인 항목" />
            <p>주방청소는 요청 구역과 기기 상태를 확인해 세부 범위를 정합니다.</p>
            <p className="mt-4">아래 항목이 모든 견적에 자동으로 포함되는 것은 아닙니다. 공간 청소와 기기 세척, 이동·분해 작업을 구분해 안내합니다.</p>

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

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <p className="font-bold text-brand-dark">별도 확인이 필요한 작업</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">필요한 작업을 말씀해 주시면 제공 가능한 범위와 비용을 확인해 안내합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>처음 정한 작업 범위보다 청소할 곳이 늘어나거나 별도 공정이 필요한 경우 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교할 때는 &lsquo;주방 전체&rsquo;라는 표현보다 실제 포함 항목을 살펴보세요. 바닥과 벽면만 청소하는 견적과 후드·기기 내부까지 포함한 견적은 같은 조건이 아닙니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="주방청소 진행 순서와 소요 시간" />
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
            <p className="mt-2">면적과 오염 정도, 기기 배치, 이동·세척 범위, 투입 인원에 따라 달라집니다.</p>
            <p className="mt-2">청소 종료 시간만 맞추기보다 건조와 물품 정리, 조리 준비에 필요한 시간까지 고려하는 것이 좋습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">다음 영업 시작 시간을 상담 시 함께 알려주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>주방청소 결과는 전체 모습과 주요 오염 구간을 함께 살펴보는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">비슷한 위치와 조명에서 전후 상태를 비교하면 결과를 확인하기 쉽습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">금속 표면이 반짝인다는 이유만으로 모든 오염이 제거됐다고 판단하지 않습니다. 요청한 부위가 작업됐는지와 세척 잔여물이 남지 않았는지를 함께 살펴봅니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진이나 완료 자료가 필요하면 촬영 범위와 제공 가능 여부를 상담 시 확인해 주세요.</p>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>매장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">주방청소는 영업시간뿐 아니라 재료 준비와 납품 시간도 고려해야 합니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5">야간이나 휴무일 작업을 원하시면 희망 시간대를 알려주세요. 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">음식을 조리하는 구역과 청소 구역을 분리하기 어렵다면 비영업 시간에 진행할 수 있도록 일정을 검토합니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">약속한 항목을 기준으로 확인합니다</h3>
            <p className="mt-2">견적에 포함된 구역과 기기, 세척 부위를 기준으로 결과를 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">처음 문제가 되었던 기름때와 손이 닿기 어려웠던 부분을 함께 살펴보는 것이 좋습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 손상은 구분합니다</h3>
            <p className="mt-2">오래된 변색, 부식, 코팅 벗겨짐, 실리콘 손상 등은 청소만으로 원래 상태가 되지 않을 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">추가 세척이 필요한 부분과 보수·교체가 필요한 상태를 구분해 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 소독·설비 점검은 다릅니다</h3>
            <p className="mt-2">일반 청소가 별도 소독이나 방역, 설비 점검까지 의미하지는 않습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">눈에 보이는 오염 제거 결과와 별도로 확인해야 할 사항을 구분하고, 요청한 서비스 범위를 기준으로 검수합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <p className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 위치와 상태를 알려주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장 상태를 확인하여 후속 처리 방법을 안내합니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="주방청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소를 맡기기 전에 주방을 한 번 더 대청소하실 필요는 없습니다. 보관할 식재료와 작업할 구역을 구분해 주시면 진행이 훨씬 수월합니다.</p>
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
              <p className="text-xl font-bold">주방청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 어디에 기름때가 쌓였는지 알려주세요.</p>
              <p className="mt-2 text-white/80">바닥과 벽면을 정리하려는지, 후드와 주방기기까지 필요한지, 휴무일에 작업할지 영업 종료 후 진행할지에 따라 준비가 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>주방청소 견적 문의하기 →</CtaButton>
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
