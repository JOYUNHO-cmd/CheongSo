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
  ["scope", "소독·방제 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["certificate", "소독증명서 발급"],
  ["area", "지역·일정 조율"],
  ["checkup", "사후 관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["서비스 구성", "공간·표면 소독, 해충 방제, 쥐 방제"],
  ["방제 대상", "바퀴벌레·개미·빈대·모기 등 현장에서 확인한 대상"],
  ["업체 안내", "소독업 신고 완료"],
  ["서류 안내", "실제 진행한 소독 내용에 따른 소독증명서 발급 가능"],
  ["견적 기준", "대상, 발생 상태, 필요한 인원·장비·약품과 작업 횟수"],
  ["일정 조율", "생활·영업시간과 제품별 출입·사용 조건 반영"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "공간의 용도와 면적",
  "소독할 표면과 구역",
  "해충의 종류와 발견 위치",
  "발생 빈도와 확인된 흔적",
  "가구·설비 배치와 접근 조건",
  "필요한 인원과 장비·약품",
  "작업 가능 시간과 이용자 보호 조건",
  "방문 횟수와 후속 확인 범위",
];

const scopeItems: { title: string; paragraphs: string[] }[] = [
  {
    title: "공간·표면 소독",
    paragraphs: [
      "문손잡이, 공용 표면, 화장실 등 요청 구역의 용도와 재질을 확인합니다.",
      "사용할 제품의 적용 대상과 방법, 필요한 접촉시간 등 사용 지침에 맞춰 작업합니다.",
      "눈에 보이는 먼지와 오염이 많이 남아 있다면 먼저 정리할 청소 범위도 확인해야 합니다. 소독이 공간 전체의 대청소를 대신하는 것은 아닙니다.",
    ],
  },
  {
    title: "바퀴벌레·개미 방제",
    paragraphs: [
      "발견 위치와 시간대, 반복 여부, 주방·수납 공간 등 주변 상태를 확인합니다.",
      "해충의 종류와 활동 흔적에 맞춰 작업 구역과 방법을 정합니다.",
      "실내에서 발생한 문제인지 외부 유입 가능성이 있는지도 살펴보고, 필요한 환경 관리 사항을 함께 안내합니다.",
    ],
  },
  {
    title: "빈대 방제",
    paragraphs: [
      "발견된 벌레와 흔적, 침대·침구·가구 주변 상태를 확인한 뒤 작업 범위를 정합니다.",
      "물린 자국만으로 빈대라고 단정하지 않습니다. 사진이나 현장 확인이 필요한 경우에는 대상을 먼저 확인합니다.",
      "의류·침구·가구의 취급 방법과 후속 확인 필요 여부는 작업 계획에 맞춰 안내합니다. 물품을 임의로 다른 방에 옮기거나 폐기하기 전에 상담해 주세요.",
    ],
  },
  {
    title: "모기 등 해충 방제",
    paragraphs: [
      "발생 장소와 주변 환경, 실내·외 여부를 확인합니다.",
      "눈에 보이는 해충뿐 아니라 반복 발생과 관련된 환경을 함께 살펴 관리할 구역을 정합니다.",
      "모든 해충에 같은 약품과 방법을 적용하지 않습니다.",
    ],
  },
  {
    title: "쥐 방제",
    paragraphs: [
      "발견 위치와 활동 흔적, 물품 보관 상태, 유입이 의심되는 구간 등을 확인합니다.",
      "현장에 맞는 방제 방법과 후속 확인 범위를 정하고, 아이·반려동물·이용자가 접근할 수 있는 위치도 고려합니다.",
      "유입구 보수, 설비 해체, 사체 수거와 오염 구역 청소 등은 포함 여부를 별도로 정합니다.",
    ],
  },
];

const separateScopeItems = [
  "공간 전체 대청소",
  "음식물·쓰레기·폐기물 처리",
  "침구·가구·가전의 전문 세척",
  "별도 냄새 제거",
  "틈새 봉합과 유입구 보수",
  "배관·누수·설비 수리",
  "물품 이동과 폐기",
];

const extraCostItems = [
  "작업할 방이나 층이 추가되는 경우",
  "다른 종류의 해충이 함께 확인되는 경우",
  "예상보다 넓은 구역에 발생 흔적이 있는 경우",
  "가구·물품 이동으로 접근 공간을 확보해야 하는 경우",
  "별도 청소나 오염물 처리가 필요한 경우",
  "추가 방문과 집중 관리가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["요청 내용과 발생 상태 상담", "공간의 용도와 면적, 소독 목적 또는 발견한 해충 정보를 확인합니다. 사진과 발견 위치, 이전 처리 이력도 함께 알려주세요."],
  ["대상과 작업 범위 확인", "작업할 구역과 접근 조건, 이용자와 반려동물의 동선을 살펴봅니다. 필요한 준비와 약품·장비, 방문 횟수를 검토해 견적을 안내합니다."],
  ["작업 전 준비와 이용 조건 안내", "식품·식기·개인 물품의 보호, 사람과 반려동물의 이동, 출입 제한 등을 확인합니다. 시설에서 지켜야 하는 별도 작업 기준이 있다면 함께 검토합니다."],
  ["소독 또는 방제 진행", "대상과 공간에 맞춰 합의한 작업을 진행합니다. 제품별 적용 범위와 사용 지침을 따르며, 모든 공간에 일괄적으로 약품을 분사하는 방식으로 안내하지 않습니다."],
  ["작업 내용과 후속 관리 안내", "진행한 구역과 작업 내용을 확인합니다. 필요한 환기, 출입·사용 재개 조건과 추가 확인사항을 안내하고, 소독증명서 발급에 필요한 내용을 확인합니다."],
];

const reservationChecklist = [
  "가정의 생활시간과 외출 계획",
  "매장의 영업 종료와 준비 시간",
  "직원 근무와 시설 이용시간",
  "아이와 반려동물이 머물 공간",
  "식품·식기·물품을 보호할 시간",
  "작업 후 필요한 출입 제한과 환기 조건",
];

const prepItems = [
  "소독 목적이나 발견한 해충 정보를 알려주세요.",
  "발견 위치와 시간, 반복 여부를 전달해 주세요.",
  "이전에 사용한 약품과 방제 이력을 알려주세요.",
  "식품·식기·어린이 물품의 보호 방법을 확인해 주세요.",
  "아이와 반려동물의 종류와 생활 공간을 알려주세요.",
  "어항 등 이동이 어렵거나 별도 보호가 필요한 대상을 알려주세요.",
  "민감한 전자기기와 물품, 사용 제한 구역을 알려주세요.",
  "환기와 급수·전원·출입 조건을 확인해 주세요.",
  "작업 후 공간을 사용할 시간을 알려주세요.",
  "소독증명서와 필요한 자료를 미리 요청해 주세요.",
];

const faqItems: [string, string][] = [
  ["찐청소는 소독업 신고 업체인가요?", "네. 소독업 신고를 완료했으며, 진행한 소독 내용에 따른 소독증명서 발급이 가능합니다."],
  ["바퀴벌레·개미·빈대·모기와 쥐 방제도 가능한가요?", "가능합니다. 대상과 발생 상태를 확인해 작업 구역과 방법, 필요한 방문 횟수를 안내합니다."],
  ["소독과 바퀴벌레 방역은 같은 작업인가요?", "목적과 대상이 다릅니다. 공간·표면 소독과 해충 방제 범위를 각각 정해야 합니다. 한 번의 작업으로 모든 해충이 사라지거나 소독증명서가 무해함을 보증하는 것은 아닙니다."],
  ["비용은 평당으로 정하나요?", "면적만으로 정하지 않습니다. 대상과 발생 정도, 필요한 인원과 장비·약품, 작업 횟수를 함께 확인합니다."],
  ["어떤 약품과 장비를 사용하나요?", "대상과 공간, 적용 부위에 맞춰 선택합니다. 사용 예정 제품과 작업 방법, 주의사항은 상담과 작업 안내에서 확인해 주세요."],
  ["아이나 반려동물이 있어도 괜찮나요?", "작업 구역과 제품별 사용 조건을 확인해야 합니다. 아이와 반려동물의 접근 제한, 물품 보호와 사용 재개 안내를 따르도록 준비하며, 무조건 무해하다고 안내하지 않습니다."],
  ["작업 후 바로 들어가거나 영업해도 되나요?", "약품과 작업 방식에 따라 다릅니다. 필요한 환기·건조·출입 제한 등 조건을 확인한 뒤 공간을 사용해 주세요."],
  ["한 번 작업하면 완전히 없어지나요?", "대상과 발생 상태, 주변 유입 조건에 따라 다릅니다. 후속 확인이나 추가 작업이 필요할 수 있어 한 번에 완전 박멸을 보장하지 않습니다."],
  ["소독증명서만 받을 수도 있나요?", "실제로 진행한 소독 내용을 기준으로 발급합니다. 작업 없이 증명서만 발급하는 방식으로 안내하지 않습니다."],
  ["소독증명서가 있으면 시설의 모든 법적 요건이 충족되나요?", "그렇게 단정할 수는 없습니다. 시설별 대상 여부와 주기, 기록·제출 등 필요한 사항을 별도로 확인해야 합니다."],
  ["정기적으로 관리받을 수도 있나요?", "희망 대상과 공간, 관리 목적을 알려주시면 주기와 작업 범위를 검토합니다. 매회 작업과 별도 추가 처리 항목을 구분해 안내합니다."],
  ["청소와 함께 맡길 수 있나요?", "함께 상담할 수 있습니다. 표면 오염을 정리할 청소와 소독·방제의 범위를 구분하고, 필요한 순서와 비용을 안내합니다."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "대략적인 면적과 구조",
  "공간 소독 또는 해충·쥐 방제 여부",
  "발견한 해충과 흔적 사진",
  "발생 위치와 반복 정도",
  "이전 방제와 약품 사용 이력",
  "아이·반려동물과 이용자 관련 조건",
  "희망 날짜와 공간 사용 시간",
  "정기관리와 후속 방문 요청",
  "소독증명서와 필요한 제출 자료",
];

const path = "/소독-방역/";

export default function DisinfectionCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "소독&방역",
      serviceType: "소독&방역",
      description: "벌레를 발견한 위치, 반복되는 시간과 공간 용도를 알려주세요. 소독업 신고를 마친 찐청소는 공간·표면 소독과 바퀴벌레·개미·빈대·모기, 쥐 방제를 구분해 상담합니다. 실제 진행한 소독 내용에 따른 소독증명서 발급도 가능합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "소독&방역", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>소독&방역</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">위생·방역케어</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">공간 소독부터 바퀴벌레·빈대·쥐 방제까지, 대상을 구분합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>벌레를 발견한 위치, 반복되는 시간과 공간 용도를 알려주세요. 소독업 신고를 마친 찐청소는 공간·표면 소독과 바퀴벌레·개미·빈대·모기, 쥐 방제를 구분해 상담합니다. 실제 진행한 소독 내용에 따른 소독증명서 발급도 가능합니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">소독·방역 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 사람과 반려동물이 함께 생활하는 공간을 다루는 만큼 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="소독·방역 비용과 견적 산정 기준" />
            <p>소독·방역 비용은 평수만으로 정하지 않습니다.</p>
            <p className="mt-4">같은 면적이라도 표면 소독이 필요한 공간과 해충이 발생한 공간은 작업 내용이 다릅니다. 해충의 종류와 발생 범위, 접근 조건에 따라서도 필요한 준비가 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 현장 작업량과 방문 횟수를 반영해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">공간 소독과 해충 방제는 다른 작업입니다</h3>
            <p className="mt-2">문손잡이와 공용 표면 등을 소독하는 작업과 바퀴벌레·빈대·쥐에 대응하는 방제는 목적과 방법이 다릅니다.</p>
            <p className="mt-2">&lsquo;방역 한 번&rsquo;이라는 표현만으로 모든 작업이 포함되는 것은 아닙니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">필요한 서비스를 구분해야 견적과 작업 결과도 정확하게 확인할 수 있습니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이전에 다른 약품을 사용했거나 방제를 받은 적이 있다면 함께 알려주세요.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">일회성 작업과 정기관리를 구분합니다</h3>
            <p className="mt-2">한 번의 소독이 필요한지, 해충 발생을 확인하며 반복 관리할지에 따라 구성이 달라집니다.</p>
            <p className="mt-2">정기관리는 필요한 인원과 작업 시간, 대상과 방문 주기 등을 확인해 안내합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">표면 소독, 해충 확인, 추가 처리 중 매회 무엇을 하는지 계약 범위에 명시하는 것이 중요합니다.</p>
          </section>

          {/* 2. 소독·방제 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간 소독과 해충·쥐 방제 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">해충 이름을 모르겠다면 발견 위치와 사진부터 보내주세요</h3>
            <p className="mt-2 mb-6">벌레의 모습과 발견 장소, 횟수를 확인해 관리 대상을 정합니다. 물린 자국만으로 빈대라고 단정하지 않습니다. 약품·장비는 대상과 공간에 맞춰 선택하며, 어린이·반려동물과 식품 보호, 작업 후 출입 조건을 함께 안내합니다.</p>
            <p>찐청소는 아래 서비스를 현장 상태에 맞춰 상담합니다.</p>
            <p className="mt-4">모든 항목이 하나의 기본 견적에 포함되는 것은 아니며, 요청한 대상과 작업 구역을 구분합니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  {item.paragraphs.map((p, i) => (
                    <p key={p} className={i === item.paragraphs.length - 1 ? "mt-2 text-[15px] text-gray-500" : "mt-2"}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <p className="font-bold text-brand-dark">청소·냄새 제거·보수는 구분합니다</p>
              <p className="mt-2 text-[15.5px]">소독이나 방제를 받는다고 다음 작업까지 자동으로 포함되는 것은 아닙니다.</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">필요한 항목을 함께 알려주시면 작업 가능 범위와 비용을 안내합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 재방문 조건" />
            <p>처음 정한 대상이나 구역보다 작업이 늘어나면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업은 내용과 비용을 확인한 뒤 진행 범위를 정합니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">재방문이 필요한지와 포함 여부를 확인합니다</h3>
            <p className="mt-2">해충 방제는 대상과 현장 상태에 따라 후속 확인이나 추가 작업이 필요할 수 있습니다.</p>
            <p className="mt-2">처음 견적에 포함된 방문 횟수, 재방문 조건, 추가 비용과 관리 기간을 계약 전에 확인해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">한 번 작업하면 다시는 발생하지 않는다고 약속하지 않습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="소독·방역 진행 순서와 소요 시간" />
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
            <p className="mt-2">면적과 대상, 작업 구역과 방법, 준비 조건에 따라 달라집니다.</p>
            <p className="mt-2">작업 종료 시간과 사람이 다시 들어가거나 영업을 시작할 수 있는 시간은 다를 수 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">희망 이용 시간을 알려주시면 필요한 준비·작업·대기 조건을 함께 검토합니다.</p>
          </section>

          {/* 5. 소독증명서 */}
          <section id="certificate" className="scroll-mt-36">
            <SectionTitle id="certificate-title" kicker="05" title="소독증명서와 작업 내용 확인" />
            <h3 className="text-lg font-bold text-brand-dark">소독업 신고를 마친 업체입니다</h3>
            <p className="mt-2">찐청소는 소독업 신고를 완료했으며 소독증명서 발급이 가능합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">약품이나 장비를 독자 기술로 포장하기보다, 대상에 맞는 적용과 작업 내용 안내를 중요하게 생각합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">실제 진행한 소독 내용을 기준으로 발급합니다</h3>
            <p className="mt-2">소독증명서가 필요하면 시설명, 주소, 제출 목적과 필요한 정보를 상담 시 알려주세요.</p>
            <p className="mt-2">작업 내용에 맞춰 발급을 진행하며, 제출처에서 요구하는 별도 자료가 있다면 사전에 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">증명서는 실제 소독 내역을 확인하는 자료이지, 공간에 해충이나 미생물이 전혀 없다는 보증서는 아닙니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">시설별 요구사항은 별도로 확인합니다</h3>
            <p className="mt-2">법정 소독과 관련된 문의라면 시설의 종류와 규모, 용도 등을 알려주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">의무 대상 여부와 주기를 모든 시설에 동일하게 안내하지 않습니다. 현행 기준과 제출처 요구사항에 맞는 별도 확인이 필요합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 사진과 안내 자료</h3>
            <p className="mt-2">사진이나 작업 내역이 필요하면 제공 범위와 방식을 미리 확인해 주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진만으로 소독 효과나 해충의 완전 제거를 증명할 수는 없으므로, 작업 내용과 이후 확인 결과를 구분해서 살펴봅니다.</p>
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부를 확인합니다.</p>
            <p className="mt-4">소독·방역은 공간 이용을 고려해 일정을 정해야 합니다.</p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">야간이나 휴무일 작업은 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</p>
          </section>

          {/* 7. 사후관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 후 확인과 사후 관리" />
            <h3 className="text-lg font-bold text-brand-dark">작업 대상과 구역을 기준으로 확인합니다</h3>
            <p className="mt-2">공간 소독은 합의한 표면과 구역의 작업 내용을 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">해충 방제는 작업 후 발견 위치와 빈도 등 현장 변화를 살펴야 합니다. 방문 직후의 모습만으로 장기 결과를 단정하지 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">반복 발생은 원인과 작업 내용을 함께 봅니다</h3>
            <p className="mt-2">해충이 다시 보이면 어느 위치에서 언제 발견했는지 알려주세요.</p>
            <p className="mt-2">남아 있던 개체인지, 외부에서 새로 유입됐는지 등 확인할 사항과 후속 작업을 검토합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진을 남길 수 있다면 무리해서 잡거나 접근하지 말고 안전한 거리에서 촬영해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">설치·처리한 부위는 안내에 따라 관리합니다</h3>
            <p className="mt-2">처리한 곳을 언제 닦아도 되는지, 설치물을 그대로 두어야 하는지 등은 작업 방법에 따라 달라집니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">임의로 약품을 더 사용하거나 설치물을 옮기기 전에 작업 안내를 확인해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">후속 처리 조건은 계약 전에 확인합니다</h3>
            <p className="mt-2">추가 확인과 재방문, 별도 작업의 조건을 미리 정합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">해충 재발 방지나 감염 예방 효과를 기간·조건 없이 보장하지 않습니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항과 이용 주의사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">약품을 미리 더 뿌리거나 모든 물건을 옮겨두실 필요는 없습니다. 대상에 따라 준비 방법이 다르므로 안내를 받은 뒤 정리해 주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">약품은 냄새가 약하거나 익숙한 제품이라고 해서 모든 상황에서 안전한 것은 아닙니다. 작업 전후의 출입과 사용 조건을 따라주세요.</p>
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
              <p className="text-xl font-bold">소독·방역 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 어떤 관리가 필요한지 알려주세요.</p>
              <p className="mt-2 text-white/80">공간의 소독이 필요한지, 반복해서 보이는 해충이 있는지, 시설에 제출할 소독증명서가 필요한지에 따라 준비가 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>소독·방역 견적 문의하기 →</CtaButton>
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
