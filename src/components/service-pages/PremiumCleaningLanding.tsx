import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["safety", "사용 약품 안전성"],
  ["difference", "프리미엄청소란"],
  ["scope", "정밀청소 범위"],
  ["odor", "냄새·새집증후군 관리"],
  ["estimate", "비용·추가 작업 기준"],
  ["process", "진행 순서"],
  ["cases", "작업 결과 확인"],
  ["area", "지역·예약 일정"],
  ["prep", "준비사항·사후 관리"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["서비스 구성", "정밀청소 + 냄새 제거 + 새집증후군 관리"],
  ["주요 대상", "신축 입주 전, 인테리어·리모델링 후 공간 등"],
  ["관리 방식", "특허받은 약품과 장비를 활용한 현장별 작업"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염과 관리 범위"],
  ["범위 확인", "수납 공간, 탈거 작업, 냄새 발생 구역과 추가 요청"],
  ["일정 조율", "공사·가구 반입·작업 후 환기와 사용 재개 조건 반영"],
  ["예약 문의", "010-9882-8882"],
];

const consultTriggers = [
  "신축 입주 전 청소와 새집증후군 관리를 함께 하고 싶은 경우",
  "리모델링 후 분진뿐 아니라 냄새도 신경 쓰이는 경우",
  "수납장과 창틀 등 세부 구역까지 작업 내용을 확인하고 싶은 경우",
  "청소와 별도 관리를 여러 번 알아보기보다 함께 상담하고 싶은 경우",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "주방과 수납 공간",
    body: "싱크대, 상판, 벽면, 바닥 등 표면 오염을 확인합니다. 수납장 내부와 서랍·선반, 모서리 등은 접근과 탈거 가능 여부를 살펴 세부 범위를 정합니다.",
    note: "식재료와 식기, 생활용품이 있다면 작업할 구역과 보관할 물품을 먼저 구분합니다.",
    photoPairs: [["premium-kitchen-01.webp", "premium-kitchen-02.webp"], ["premium-kitchen-03.webp", "premium-kitchen-04.webp"]],
  },
  {
    title: "욕실과 배수구 주변",
    body: "세면대, 변기, 거울, 벽면과 바닥 등의 오염을 확인합니다. 수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등도 요청 내용과 구조에 따라 범위를 정합니다.",
    note: "배관 내부 작업이나 누수 수리, 실리콘 교체는 공간 청소와 구분합니다.",
    photoPairs: [["premium-bathroom-01.webp", "premium-bathroom-02.webp"], ["premium-bathroom-03.webp", "premium-bathroom-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀과 프레임, 모서리 등 먼지가 남기 쉬운 부분을 확인합니다. 유리의 어느 면을 청소할지, 방충망과 창호 탈거가 필요한지 구체적으로 정합니다.",
    note: "접근이 어려운 외창이나 외부 고소작업은 별도 확인이 필요합니다.",
    photoPairs: [["premium-window-01.webp", "premium-window-02.webp"], ["premium-window-03.webp", "premium-window-04.webp"]],
  },
  {
    title: "바닥·문·몰딩",
    body: "바닥과 가장자리, 문틀, 몰딩 등 재질에 맞춰 먼지와 제거 가능한 오염을 청소합니다. 접착 흔적이나 도료 자국 등은 일반적인 먼지와 구분해 작업 가능 여부를 확인합니다.",
    note: "흠집·변색·마모와 같은 기존 손상은 청소로 제거할 오염과 나누어 안내합니다.",
    photoPairs: [["premium-floor-01.webp", "premium-floor-02.webp"], ["premium-floor-03.webp", "premium-floor-04.webp"]],
  },
  {
    title: "베란다와 다용도실",
    body: "바닥, 창틀, 문 주변과 수납 공간 등 요청 구역을 확인합니다.",
    note: "기기가 놓여 있다면 주변 공간 청소와 기기 자체의 세척을 구분합니다.",
    photoPairs: [["premium-veranda-01.webp", "premium-veranda-02.webp"], ["premium-veranda-03.webp", "premium-veranda-04.webp"]],
  },
];

const separateScopeItems = [
  "가전 내부·분해 세척",
  "무거운 가구와 기기의 이동",
  "외부 고소작업",
  "대량 폐기물 반출·처리",
  "코팅·연마 등 별도 시공",
  "누수·곰팡이 원인 보수와 자재 교체",
];

const estimateChecklist = [
  "면적과 방·욕실·수납 공간의 구성",
  "신축·리모델링·거주 중 여부",
  "분진과 생활 오염의 정도",
  "정밀청소에 포함할 세부 구역",
  "탈거와 물품 이동 필요 여부",
  "냄새가 느껴지는 위치와 상태",
  "새 가구·자재 반입과 공사 일정",
  "필요한 인원과 장비·약품",
  "작업 횟수와 현장 조건",
];

const extraCostItems = [
  "처음 확인한 것보다 관리 구역이 늘어나는 경우",
  "가전 분해 세척 등 별도 작업을 요청하는 경우",
  "물품 이동이나 특수 오염 제거가 추가되는 경우",
  "청소 후 추가 공사로 재작업이 필요한 경우",
  "당초 일정에 없던 별도 방문을 요청하는 경우",
];

const processSteps: [string, string][] = [
  ["공간 상태와 요청 내용 상담", "주소와 구조, 신축·공사 여부, 오염과 냄새 상태를 확인합니다. 사용 예정일과 가구 반입 일정, 특별히 확인하고 싶은 부분도 함께 알려주세요."],
  ["작업 구성과 견적 안내", "정밀청소할 구역과 냄새·새집증후군 관리 범위를 정합니다. 포함 항목과 별도 요청, 예상 일정과 사용 재개 조건을 확인합니다."],
  ["현장 확인과 작업 준비", "마감재와 물품 상태, 기존 파손과 접근 제한 등을 확인합니다. 작업 중 보호할 물건과 출입 조건, 필요한 준비사항을 맞춥니다."],
  ["정밀청소와 관리 작업", "합의한 구역의 정밀청소를 진행하고, 현장과 제품·장비의 적용 조건에 맞춰 냄새 제거와 새집증후군 관리 작업을 구성합니다. 세부 순서와 적용 부위는 현장 상태에 따라 정합니다."],
  ["마무리와 사용 안내", "청소 결과와 진행한 관리 내용을 확인합니다. 작업 후 필요한 환기와 출입, 공간 사용 조건을 안내합니다."],
];

const caseChecklist = [
  "창틀과 모서리의 분진",
  "합의한 수납장 내부",
  "주방과 욕실의 요청 구역",
  "바닥 가장자리와 문 주변",
  "탈거·세척하기로 한 부위",
];

const reservationChecklist = [
  "분진이 발생하는 공정의 종료",
  "보수와 추가 설치 일정",
  "새 가구·가전 반입 시점",
  "정밀청소와 관리 작업",
  "필요한 환기와 사용 전 확인",
  "실제 입주 또는 업무 시작",
];

const prepItems = [
  "공간의 구조와 현재 사진",
  "공사 내용과 종료 예정일",
  "냄새가 느껴지는 위치와 상황",
  "새 가구와 가전의 반입 일정",
  "남아 있는 짐과 이동할 물품",
  "마감재의 관리 지침과 취급 제한",
  "기존 파손·누수·곰팡이 등 특이사항",
  "환기·전기·수도 사용 조건",
  "사람과 반려동물의 출입 계획",
  "실제 공간 사용 예정일",
];

const faqItems: [string, string][] = [
  ["일반 청소와 프리미엄청소는 무엇이 다른가요?", "찐청소 프리미엄청소는 정밀청소에 냄새 제거와 새집증후군 관리를 결합한 서비스입니다. 특허받은 약품과 장비를 활용하며, 현장별 세부 범위를 정해 안내합니다."],
  ["냄새 제거와 새집증후군 관리가 서비스 구성에 포함되나요?", "네. 정밀청소와 함께 프리미엄청소의 핵심 구성입니다. 실제 적용 구역과 작업 내용은 공간 상태에 맞춰 견적에 명시합니다."],
  ["특허받은 약품과 장비를 사용하나요?", "네. 찐청소는 특허받은 약품과 장비를 활용합니다. 상담 시 사용 제품·장비와 관련 특허 정보를 확인해 주세요. 특허와 현장별 성능·안전성 결과는 구분해야 합니다."],
  ["모든 유해물질을 완전히 제거하나요?", "모든 물질의 완전 제거를 보장하지 않습니다. 적용 기술과 대상, 공간 상태에 따라 결과가 달라질 수 있으며, 특정 저감 수치는 해당 시험·측정 조건에 근거해 확인해야 합니다."],
  ["냄새가 사라지면 새집증후군 관리도 완료된 건가요?", "냄새만으로 실내공기 상태를 판단할 수는 없습니다. 냄새 변화와 진행한 관리 내용, 별도로 확인한 측정 결과가 있다면 이를 구분해 살펴봐야 합니다."],
  ["공기질 측정도 포함되나요?", "현재 안내된 기본 구성만으로 측정이 포함된다고 보지는 않습니다. 필요하시면 제공 가능 여부, 측정 항목·방법·시점과 비용을 계약 전에 확인해 주세요."],
  ["아이나 반려동물이 있어도 안전한가요?", "모든 상황에서 무조건 안전하다고 안내하지 않습니다. 사용할 제품·장비와 적용 조건을 확인하고, 작업 중 출입 제한과 작업 후 환기·사용 안내를 따라야 합니다. 가족과 반려동물의 생활 계획을 상담 시 알려주세요."],
  ["작업 후 바로 입주할 수 있나요?", "작업 방식과 제품, 환기·건조 등 조건에 따라 달라집니다. 청소 종료와 입주 가능 시간을 구분해 안내받고 일정을 정해 주세요."],
  ["새 가구를 들이기 전과 후 중 언제 하는 게 좋나요?", "새 가구를 관리 대상에 포함할지, 반입 후 청소 접근이 가능한지 등에 따라 달라집니다. 공사와 반입 일정을 함께 알려주시면 작업 순서를 검토합니다."],
  ["살고 있는 집도 가능한가요?", "생활용품과 가구 배치, 냄새 상태, 출입·환기 조건을 확인해 적용 가능 여부를 검토합니다. 빈집과 작업 범위·일정이 달라질 수 있습니다."],
  ["모든 가전과 창문을 분해해서 청소하나요?", "아니요. 정밀청소가 모든 설비의 분해 세척을 뜻하지는 않습니다. 구조와 재질, 상태를 확인해 가능한 탈거 범위를 정하며 가전 전문 세척 등은 별도 항목입니다."],
  ["사후 관리는 어떻게 진행되나요?", "진행한 작업 범위와 현장 상태를 확인해 후속 처리 방법을 안내합니다. 접수 기간, 재방문과 추가 관리 조건은 계약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "면적과 방·욕실·수납 공간의 구성",
  "신축·리모델링·거주 중 여부",
  "전체 공간과 주요 오염 사진",
  "냄새가 느껴지는 위치와 상황",
  "정밀청소를 원하는 세부 구역",
  "공사 종료와 가구 반입 일정",
  "희망 작업일과 실제 사용 예정일",
  "확인하고 싶은 제품·특허·측정 관련 정보",
];

const path = "/프리미엄청소/";

export default function PremiumCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "프리미엄청소",
      serviceType: "프리미엄청소",
      description: "정밀청소부터 냄새 제거와 새집증후군 관리까지. 찐청소가 특허받은 약품과 장비를 활용해 공간 상태에 맞는 작업을 안내합니다. 서비스 구성과 비용, 작업 후 입주 일정을 확인하세요.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "프리미엄청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>프리미엄청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">프리미엄청소, 정밀청소에 냄새와 새집증후군 관리까지</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>창틀과 수납 공간의 먼지도 신경 쓰이고, 공사 후 남은 냄새도 마음에 걸린다면.</p>
            <p>찐청소 프리미엄청소는 정밀청소에 냄새 제거와 새집증후군 관리를 결합한 서비스입니다.</p>
            <p>공간별 오염을 세밀하게 살펴 청소하고, 특허받은 약품과 장비를 활용한 관리까지 함께 진행합니다.</p>
            <p>&lsquo;프리미엄&rsquo;이라는 이름만으로 설명을 끝내지 않겠습니다. 어디를 청소하고 어떤 관리를 받는지, 작업 후 무엇을 확인해야 하는지부터 안내하겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">프리미엄청소 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 새집증후군 관리까지 함께 진행하는 서비스인 만큼 저희도 이 부분을 가장 신경 씁니다.</p>
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

          {/* 1. 차별점 */}
          <section id="difference" className="scroll-mt-36">
            <SectionTitle id="difference-title" kicker="01" title="프리미엄청소는 무엇이 다른가요?" />
            <p>찐청소 프리미엄청소의 핵심은 세 가지입니다.</p>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                공간별 오염을 세밀하게 살피는 정밀청소
              </li>
              <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                냄새가 발생하는 구역과 상태를 확인하는 냄새 제거 작업
              </li>
              <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                특허받은 약품과 장비를 활용한 새집증후군 관리
              </li>
            </ul>
            <p className="mt-4 text-[15px] text-gray-500">일반적인 공간 청소에 냄새와 새집증후군 관련 관리까지 함께 받고 싶은 분들을 위한 구성입니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">정밀청소의 차이는 작업 항목으로 설명합니다</h3>
            <p className="mt-2">일반 청소를 대충 하고 프리미엄만 꼼꼼하게 한다는 뜻은 아닙니다.</p>
            <p className="mt-2">정밀청소는 고객님이 신경 쓰는 구간, 수납 공간과 틈새, 접근이 어려운 부위 등을 구체적으로 확인해 작업 계획에 반영합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">내부 세척과 탈거가 필요한 곳은 구조와 상태를 살펴 범위를 정합니다. 모든 부품을 분해하거나 모든 공간에 같은 시간을 투입하는 방식은 아닙니다.</p>

            <p className="mt-5 font-bold text-brand-dark">이런 경우에 상담해 보세요</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {consultTriggers.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">새 가구나 특정 자재에서 냄새가 느껴진다면 해당 위치와 반입 일정도 알려주세요. 적용 가능한 관리 범위를 함께 검토합니다.</p>
          </section>

          {/* 2. 정밀청소 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="정밀청소 범위와 공간별 확인 항목" />
            <p>프리미엄청소도 집마다 필요한 작업은 다릅니다.</p>
            <p className="mt-4">공간의 구조와 재질, 오염 상태를 확인해 포함할 세부 항목을 정합니다. 아래 내용은 상담 시 확인하는 작업 구역입니다.</p>

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
              <p className="font-bold text-brand-dark">프리미엄청소와 별도로 확인할 작업</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">프리미엄이라는 이름이 모든 청소와 공사를 포함한다는 뜻은 아닙니다. 필요한 항목은 견적에서 구분해 안내합니다.</p>
            </div>
          </section>

          {/* 3. 냄새·새집증후군 관리 */}
          <section id="odor" className="scroll-mt-36">
            <SectionTitle id="odor-title" kicker="03" title="냄새 제거와 새집증후군 관리" />
            <h3 className="text-lg font-bold text-brand-dark">냄새가 나는 위치와 상황부터 확인합니다</h3>
            <p className="mt-2">냄새가 집 전체에서 느껴지는지, 특정 수납장이나 방에서 두드러지는지 살펴봅니다.</p>
            <p className="mt-2">신축인지, 최근 공사를 했는지, 새 가구가 들어왔는지 등 현장 정보도 함께 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">냄새의 상태와 관리할 구역을 파악한 뒤 작업 범위를 정합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">특허받은 약품과 장비를 활용합니다</h3>
            <p className="mt-2">찐청소는 특허받은 약품과 장비를 활용해 냄새 제거와 새집증후군 관리를 진행합니다.</p>
            <p className="mt-2">적용할 공간과 표면, 물품의 상태를 확인하고 제품·장비의 사용 조건에 맞춰 작업을 구성합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">특허 기술의 활용과 개별 현장의 관리 결과는 구분합니다. 모든 공간에 동일한 효과나 수치를 약속하지 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">냄새 감소와 실내공기 상태는 구분합니다</h3>
            <p className="mt-2">냄새가 줄었다는 사실만으로 모든 실내 오염물질이 제거됐다고 판단할 수는 없습니다.</p>
            <p className="mt-2">찐청소는 정밀청소, 냄새 제거, 새집증후군 관리의 작업 내용을 구분해 안내합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">공기질 수치나 특정 물질의 저감 결과를 확인하고 싶다면 측정 제공 여부와 항목, 조건을 계약 전에 별도로 확인해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">시공과 입주 후 관리는 연결됩니다</h3>
            <p className="mt-2">작업 후에도 새 자재와 가구, 공간의 환기 조건 등이 실내 환경에 영향을 줄 수 있습니다.</p>
            <p className="mt-2">작업에 사용한 제품과 방식에 맞는 환기, 출입과 공간 사용 조건을 확인하고 안내에 따라 관리하는 것이 중요합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이 서비스는 실내 환경을 관리하는 작업이며, 질환의 예방·치료나 증상 개선을 보장하는 의료 서비스는 아닙니다.</p>
          </section>

          {/* 4. 비용/추가작업 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="04" title="프리미엄청소 비용과 추가 작업 기준" />
            <p>비용은 평수만으로 정하지 않습니다.</p>
            <p className="mt-4">필요한 인원과 정밀청소 작업량, 관리할 구역, 사용 장비·약품과 현장 조건을 함께 확인합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">정밀청소·냄새 제거·새집증후군 관리가 견적에 어떻게 구성되는지 함께 안내합니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">추가 비용이 달라질 수 있는 경우</h3>
            <ul className="mt-4 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업이 필요하면 내용과 비용을 확인한 뒤 진행 범위를 정합니다.</p>
          </section>

          {/* 5. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="05" title="진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">얼마나 걸리나요?</h3>
            <p className="mt-2">면적과 세부 청소 범위, 오염 상태, 관리 방식과 작업 조건에 따라 달라집니다.</p>
            <p className="mt-2">청소가 끝나는 시간과 사람이 다시 들어가 생활할 수 있는 시간은 같다고 단정하지 않습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">희망 입주일에 맞춰 필요한 작업·환기·확인 시간을 함께 검토합니다.</p>
          </section>

          {/* 6. 작업 결과 확인 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="06" title="작업 결과와 관리 내용 확인" />
            <h3 className="text-lg font-bold text-brand-dark">정밀청소는 실제 작업한 부위를 확인합니다</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">비슷한 위치와 조명에서 전후 상태를 살펴보면 결과를 확인하기 좋습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">냄새와 새집증후군 관리는 작업 내역을 구분합니다</h3>
            <p className="mt-2">어떤 구역에 어떤 관리가 진행됐는지 확인합니다.</p>
            <p className="mt-2">사진은 표면 상태를 보여주는 자료이지 공기질 개선 수치를 증명하는 자료는 아닙니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">측정이나 시험자료가 제공되는 경우에도 대상 항목과 조건, 해당 현장 결과인지 여부를 구분해서 확인해야 합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">확인 자료는 계약 전에 맞춥니다</h3>
            <p className="mt-2">특허 관련 정보, 사용 제품·장비 정보, 작업 사진이나 측정 자료 등 필요한 항목이 있다면 상담 시 알려주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">제공 가능한 자료와 측정 서비스 포함 여부를 미리 확인합니다.</p>
          </section>

          {/* 7. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="07" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">프리미엄청소는 청소 날짜뿐 아니라 공사, 가구 반입, 실제 입주 순서까지 함께 검토하는 것이 좋습니다.</p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">관리 후 새로운 자재나 가구가 들어오는 경우도 있으므로, 일정을 숨김없이 알려주시면 적용할 범위를 정하는 데 도움이 됩니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">무조건 입주 전날이면 충분하다고 안내하지 않습니다. 사용 방식과 현장 조건에 맞는 여유 시간을 확인합니다.</p>
          </section>

          {/* 8. 준비사항/사후관리 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항과 작업 후 관리" />
            <p className="font-bold text-brand-dark">작업 전에 알려주세요</p>
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">식재료·식기·침구·개인 물품의 보관이나 보호가 필요한지는 적용할 작업에 맞춰 안내받아 준비해 주세요.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">작업 후에는 사용 조건을 확인해 주세요</h3>
            <p className="mt-2">환기와 출입, 표면 사용에 관한 안내는 사용 제품과 작업 방식에 따라 달라질 수 있습니다.</p>
            <p className="mt-2">안내받은 조건을 확인한 뒤 공간을 사용하고, 관리 후에도 신경 쓰이는 냄새나 이상이 있다면 위치와 상황을 알려주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">합의한 작업의 미흡한 부분과 추가 공사·가구 반입 후 새로 생긴 상태는 구분해 후속 처리 방법을 안내합니다.</p>
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
              <p className="text-xl font-bold">프리미엄청소 견적 문의</p>
              <p className="mt-3 text-white/80">청소뿐 아니라 냄새와 새집증후군 관리까지 고민 중이라면, 현재 공간의 상태부터 알려주세요.</p>
              <p className="mt-2 text-white/80">신축 입주를 준비하는지, 리모델링 후 사용하는 공간인지, 새 가구가 들어온 뒤 냄새가 신경 쓰이는지에 따라 확인할 내용이 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>프리미엄청소 견적 문의하기 →</CtaButton>
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
