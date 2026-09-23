import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { EcosorbNotice } from "@/components/service-pages/EcosorbNotice";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·별도 작업"],
  ["extra", "추가 비용"],
  ["safety", "ECOSORB·냄새 관리"],
  ["process", "진행 순서"],
  ["photos", "작업 전후 사진"],
  ["area", "지역·비대면 진행"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["서비스 내용", "고독사 현장의 오염 청소와 필요한 유품정리"],
  ["기본 포함", "수거, 폐기물 처리, 청소, 소독, 냄새 제거"],
  ["별도 비용", "필요한 철거와 복원 공사"],
  ["비대면 진행", "요청 시 가능하며 출입·유품 확인·연락 방법을 사전 협의"],
  ["결과 확인", "상세한 작업 전후 사진 전달"],
  ["견적 기준", "오염 범위, 필요한 인원과 장비·약품, 폐기물량, 현장 조건"],
  ["작업 시작", "관계기관의 현장 보존·출입 안내와 작업 가능 여부 확인 후 협의"],
];

const estimateChecklist = [
  "청소할 구역과 오염 범위",
  "바닥·벽면·집기 등 작업 대상의 상태",
  "냄새가 남아 있는 위치와 범위",
  "보관할 유품과 처리할 물건의 양",
  "분류와 확인에 필요한 시간",
  "필요한 인원과 장비·약품",
  "층수, 엘리베이터, 주차와 반출 동선",
  "철거·복원 필요 여부",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "유품 확인과 분류",
    body: "사진, 서류, 귀중품, 의류 등 남길 유품을 알려주세요. 별도로 찾아야 할 물건이 있다면 특징이나 예상 위치도 함께 전달해 주세요.",
    note: "보관 여부를 바로 결정하기 어려운 물건은 확인 방법과 보류 범위를 사전에 협의합니다. 보관을 희망하는 물건이라도 오염 상태에 따라 별도 처리가 필요할 수 있습니다.",
    photoPairs: [
      ["lonely-items-01.webp", "lonely-items-02.webp"],
      ["lonely-items-03.webp", "lonely-items-04.webp"],
    ],
  },
  {
    title: "수거와 폐기물 처리",
    body: "협의한 폐기 대상의 수거·반출·처리를 진행합니다. 가구와 가전 등 큰 물건도 정리할 예정이라면 견적 상담에 포함해 알려주세요.",
    note: "유품 전체를 일괄적으로 폐기 대상으로 보는 것이 아니라, 합의한 기준에 따라 처리 범위를 정합니다.",
    beforeAfter: [
      { label: "물품 수거", before: "lonely-collect-before.webp", after: "lonely-collect-after.webp" },
    ],
    photoPairs: [
      ["lonely-collect-work-01.webp", "lonely-collect-work-02.webp"],
    ],
  },
  {
    title: "오염 구역 청소",
    body: "바닥과 주변 집기 등 합의한 작업 대상의 오염을 확인하고 청소합니다. 표면 재질과 오염 상태에 따라 작업 범위와 방법이 달라집니다.",
    note: "청소로 제거할 수 있는 오염과 자재 자체의 변색·손상은 구분해야 합니다. 겉으로 보이는 부분을 닦는 것만으로 충분한지도 현장에 따라 확인이 필요합니다.",
    beforeAfter: [
      { label: "바닥 오염 제거", before: "lonely-floor-before.webp", after: "lonely-floor-after.webp" },
    ],
    photoPairs: [
      ["lonely-floor-work-01.webp", "lonely-floor-work-02.webp"],
    ],
  },
  {
    title: "소독",
    body: "소독은 기본 작업에 포함됩니다. 오염 제거와 함께 작업 대상과 현장 상태에 맞춰 진행합니다.",
    note: "소독을 했다는 이유만으로 모든 오염이나 자재 손상 문제가 해결되었다고 안내하지 않습니다. 필요한 정리·청소와 추가 조치를 함께 확인합니다.",
    photoPairs: [
      ["lonely-disinfect-01.webp", "lonely-disinfect-02.webp"],
      ["lonely-disinfect-03.webp", "lonely-disinfect-04.webp"],
    ],
  },
  {
    title: "냄새 제거",
    body: "냄새 제거는 기본 작업에 포함됩니다. 냄새가 발생하는 위치와 관련 물품·자재를 확인하며 진행합니다.",
    note: "오염이 자재 내부까지 이어진 경우에는 추가 처리나 철거·교체가 필요한지 살펴봐야 합니다. 현장을 확인하지 않고 냄새의 완전 제거를 일괄적으로 보장하지는 않습니다.",
  },
  {
    title: "철거와 복원",
    body: "필요한 부분의 철거와 복원도 상담하실 수 있습니다. 청소할 구역과 자재를 교체할 구역을 나누고, 복원할 범위와 마감재를 협의합니다.",
    note: "철거·복원은 별도 비용입니다. 복원 후 마무리 청소까지 포함해 맡기실 경우 해당 공정의 포함 여부도 확인해 주세요.",
    beforeAfter: [
      { label: "바닥 철거", before: "lonely-demo-before.webp", after: "lonely-demo-after.webp" },
    ],
    photoPairs: [
      ["lonely-demo-work-01.webp", "lonely-demo-work-02.webp"],
    ],
  },
];

const separateScopeItems = [
  "보관 유품의 별도 배송이나 장기 보관",
  "의류·침구 세탁",
  "문서 파쇄와 저장기기의 데이터 삭제",
  "해충 방제",
  "철거·자재 교체·복원 공사",
  "설비와 가전제품의 점검·수리",
];

const extraCostItems = [
  "가구나 바닥재에 가려져 있던 오염이 확인되는 경우",
  "처음 상담한 것보다 폐기물량이 많은 경우",
  "청소 구역이나 유품 분류 범위를 추가하는 경우",
  "오염된 자재의 철거·교체가 필요한 경우",
  "복원 자재나 시공 범위를 변경하는 경우",
  "별도 운송·보관 등 추가 서비스를 요청하는 경우",
  "엘리베이터 사용 제한 등 반출 조건이 달라지는 경우",
];

const processFlow = ["상담", "출입·작업 가능 여부 확인", "유품 분류 기준과 작업 범위 협의", "견적·일정 확정", "필요한 수거·정리와 오염 처리", "청소·소독·냄새 제거", "필요한 별도 철거·복원", "최종 검수와 사진 전달"];

const processSteps: [string, string][] = [
  ["상황과 작업 가능 여부 확인", "현장 위치와 현재 상황, 관계기관의 현장 보존·출입 안내 여부를 확인합니다. 상담과 실제 작업 시작 시점은 구분해 협의합니다."],
  ["유품과 작업 범위 협의", "남길 유품, 처리할 물건, 확인이 필요한 대상을 구분합니다. 작업 범위를 결정할 분과 중간 확인을 담당할 연락처도 정합니다."],
  ["수거·정리와 오염 처리", "협의한 범위의 물건과 폐기물을 정리하고 현장 상태에 맞춰 오염을 처리합니다. 가려져 있던 부분의 추가 확인이 필요하면 다음 작업 범위를 조율합니다."],
  ["청소·소독·냄새 제거", "합의한 구역의 청소와 소독, 냄새 제거를 진행합니다. 자재 상태나 남아 있는 냄새 때문에 별도 조치가 필요한 부분도 확인합니다."],
  ["필요한 철거·복원", "별도로 협의한 철거와 복원 공사를 진행합니다. 청소 견적과 복원 견적, 각각의 완료 범위를 구분합니다."],
  ["검수와 결과 전달", "완료된 구역과 보관 유품, 남은 확인 사항을 살펴봅니다. 상세한 작업 전후 사진을 전달하며, 사진 수신 범위와 담당자는 사전에 협의합니다."],
];

const photoChecklist = [
  "처리하기로 한 물건의 반출 여부",
  "보관할 유품의 위치와 인계 상태",
  "합의한 청소 구역의 작업 결과",
  "철거·복원을 진행한 부분",
  "남겨두거나 추가 확인하기로 한 사항",
];

const reservationChecklist = [
  "현장 출입·작업 가능 여부",
  "작업을 의뢰하고 범위를 결정할 분",
  "남길 유품과 폐기할 물건",
  "확인이 필요한 물건의 처리 방법",
  "작업 중 연락할 담당자",
  "사진을 받을 연락처와 전달 범위",
  "보관 유품 인계와 문단속 방법",
];

const checkupItems = [
  "합의한 폐기 대상의 반출 여부",
  "보관 유품의 위치와 전달 상태",
  "청소·소독 작업 범위",
  "냄새 제거 작업 내용과 남은 확인 사항",
  "청소로 해결되지 않는 변색·자재 손상",
  "별도 철거·복원 공정의 완료 여부",
  "추가 점검이나 조치가 필요한 부분",
];

const prepSections: [string, string][] = [
  ["현장 보존·출입 안내를 먼저 확인해 주세요", "관계기관에서 현장 보존이나 출입에 관한 안내를 받으셨다면 그 내용을 먼저 따라주세요. 작업 가능 여부가 확인되기 전에는 정리나 폐기를 시작하지 않도록 협의해야 합니다."],
  ["직접 청소하거나 물건을 옮기실 필요는 없습니다", "상담을 위해 미리 정리하실 필요는 없습니다. 사진이 없어도 현재 알고 계신 상황부터 설명해 주세요."],
  ["남길 유품을 알려주세요", "서류, 사진, 귀중품 등 보관할 물건의 목록과 특징을 전달해 주세요. 찾아야 할 물건이 있다면 예상 위치도 도움이 됩니다. 보관할지 결정하지 못한 물건은 우선 확인 대상으로 구분해 주세요."],
  ["작업 범위를 결정할 분과 연락 담당자를 정해 주세요", "유품 처리나 공사 범위를 결정할 수 있는 분을 확인하고, 작업 중 연락 방법을 정해 주세요. 가족이나 관계자 사이에 의견이 정리되지 않은 물건은 작업 대상에서 제외하는 방법부터 협의하는 것이 좋습니다."],
  ["사진 전달 방식을 정해 주세요", "상세 사진을 직접 보기 어렵다면 누가 확인할지, 어떤 사진을 받을지 알려주세요. 결과를 확인하는 데 필요한 범위로 전달 방법을 협의할 수 있습니다."],
  ["정리 후 공간 사용 계획을 알려주세요", "집을 비워 인도할 예정인지, 수리 후 다시 사용할 예정인지 알려주세요. 청소와 철거·복원의 범위, 마무리 일정을 정하는 데 도움이 됩니다."],
];

const faqItems: [string, string][] = [
  ["현장을 직접 보지 않고도 상담할 수 있나요?", "네. 현장 위치와 알고 계신 상황부터 알려주세요. 상담을 위해 직접 들어가거나 사진을 새로 찍으실 필요는 없습니다."],
  ["현장에 직접 가지 못해도 진행할 수 있나요?", "권한과 출입 조건, 보관·처리 기준을 확인하면 비대면으로 협의할 수 있습니다. 상세한 작업 전후 사진을 전달하며, 민감한 현장 사진을 홍보용으로 사용하는 것은 별도 동의가 필요한 사항입니다."],
  ["수거와 폐기물 처리도 포함되나요?", "네. 찐청소의 고독사청소는 수거·폐기물 처리·청소·소독·냄새 제거가 기본에 포함됩니다. 실제 물량과 작업 범위를 확인해 전체 견적을 정합니다."],
  ["소독과 냄새 제거는 추가 옵션인가요?", "아닙니다. 기본 포함 항목입니다. 다만 오염된 자재의 철거·교체나 복원 공사는 별도 비용입니다."],
  ["유품을 전부 버려야 하나요?", "그렇지는 않습니다. 보관할 유품과 처리할 물건을 구분합니다. 보관을 희망하는 물건도 오염 상태에 따라 별도 처리나 확인이 필요할 수 있습니다."],
  ["중요한 서류나 귀중품을 찾아주실 수 있나요?", "특징과 예상 위치를 알려주시면 확인 범위를 협의할 수 있습니다. 다만 물건을 반드시 찾을 수 있다고 보장하지는 않습니다."],
  ["유품정리와 고독사청소는 어떻게 다른가요?", "유품정리는 남긴 물건의 분류와 정리를 중심으로 합니다. 고독사청소는 현장 상태에 따라 필요한 오염 처리와 소독·냄새 제거 등을 함께 확인합니다. 모든 유품정리 현장에 같은 수준의 특수청소가 필요한 것은 아닙니다."],
  ["바닥이나 벽지는 무조건 철거해야 하나요?", "아닙니다. 오염 범위와 자재 상태를 확인해 청소할 부분과 철거·교체할 부분을 구분합니다."],
  ["철거와 복원도 맡길 수 있나요?", "네. 필요한 경우 함께 상담할 수 있습니다. 철거·복원은 기본 청소비에 포함되지 않으며 별도 견적으로 진행합니다."],
  ["냄새를 완전히 없앨 수 있나요?", "냄새 제거는 기본으로 진행하지만, 자재 내부 오염과 현장 상태에 따라 필요한 조치와 결과가 달라집니다. 현장 확인 없이 완전 제거를 보장하지 않습니다."],
  ["작업 전 사진을 보는 것이 부담스럽습니다.", "상담할 때 말씀해 주세요. 사진을 받을 담당자와 전달 범위, 완료 상태를 확인할 방법을 사전에 협의하실 수 있습니다."],
  ["주변에서 모르게 진행할 수 있나요?", "방문 시간과 반출 동선 등 조정 가능한 부분을 상담합니다. 다만 공용 공간 이용과 현장 여건 때문에 작업 사실이 전혀 알려지지 않는다고 약속드리지는 않습니다."],
  ["언제부터 청소를 시작할 수 있나요?", "관계기관의 현장 보존·출입 안내와 작업 가능 여부를 확인한 뒤 일정을 협의합니다. 상담 자체는 알고 계신 상황을 바탕으로 먼저 진행할 수 있습니다."],
  ["청소가 끝나면 바로 공간을 사용해도 되나요?", "남아 있는 오염과 냄새, 철거·복원 여부, 필요한 점검에 따라 달라집니다. 청소가 끝났다는 이유만으로 즉시 사용 가능하다고 일괄적으로 안내하지 않습니다."],
];

const contactChecklist = [
  "현장 위치와 주거 형태",
  "현재 출입·작업 가능 여부",
  "알고 계신 오염 범위와 현장 상태",
  "가지고 계신 사진이 있는지",
  "남길 유품과 확인할 물건",
  "청소만 필요한지, 철거·복원도 필요한지",
  "희망 일정과 공간 인도 기한",
  "비대면 진행 여부",
  "연락 담당자와 사진 전달 방식",
];

const path = "/고독사청소/";

export default function LonelyDeathCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "고독사청소",
      serviceType: "고독사청소·특수청소",
      description: "현장 출입과 작업 가능 여부를 확인한 뒤 남겨진 물품과 오염 구역을 살펴봅니다. 찐청소는 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행하며, 자재 철거·복원이 필요한 경우 별도 비용을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "고독사청소", item: absoluteUrl(path) },
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
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg/lonely-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>고독사청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">고독사청소, 현장 인계 후 오염과 물품을 신중하게 정리합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>현장 출입과 작업 가능 여부를 확인한 뒤 남겨진 물품과 오염 구역을 살펴봅니다. 찐청소는 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행하며, 자재 철거·복원이 필요한 경우 별도 비용을 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">고독사청소 상담·견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="고독사청소 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["같은 면적이라도 ","정리할 물건의 양에 따라 "]}>고독사청소 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 오염이 발생한 위치와 범위, 자재 상태, 정리할 물건의 양에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로, "]}>찐청소는 필요한 인원과 장비·약품을 중심으로, 폐기물 처리량과 현장 조건을 함께 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">공간 크기보다 실제 작업 범위를 확인합니다</h3>
            <ReadingParagraph className="mt-2">작은 공간에서도 오염이 바닥재나 주변 자재 안쪽까지 이어져 있다면 추가 작업이 필요할 수 있습니다. 반대로 집 전체를 정리할 필요 없이 일부 구역을 중심으로 작업할 수 있는 현장도 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">수거·폐기물 처리·소독·냄새 제거는 기본 포함입니다</h3>
            <ReadingParagraph className="mt-2">찐청소의 고독사청소에는 수거·폐기물 처리·청소·소독·냄새 제거가 기본으로 포함됩니다. 다만 기본 포함이라는 말이 현장 상태와 물량에 관계없이 같은 금액이라는 뜻은 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">견적을 비교하실 때는 청소비만 제시된 것인지, 폐기물 처리와 냄새 제거까지 포함된 것인지 함께 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">철거와 복원은 별도 견적입니다</h3>
            <ReadingParagraph className="mt-2">손상되거나 오염된 자재의 철거, 교체와 복원 공사는 기본 청소비에 포함되지 않습니다. 필요한 경우 작업 이유와 대상 구역, 복원 범위를 구분해 상담합니다. 청소만 필요한지, 철거·복원까지 필요한지는 현장을 확인한 뒤 정합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">사진이 없어도 상담할 수 있습니다</h3>
            <ReadingParagraph className="mt-2">이미 가지고 계신 사진이 있다면 상담에 도움이 됩니다. 사진 촬영이 어렵거나 현장을 보기 힘드시다면, 아는 내용만 먼저 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적 상담을 위해 직접 들어가거나 오염된 물건을 옮기실 필요는 없습니다. 사진으로 확인하기 어려운 부분은 현장 확인 후 범위와 비용이 달라질 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위/별도작업 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="기본 청소 범위와 별도 작업" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">장판·벽지·가구에 남은 오염은 깊이와 상태를 확인합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">접근 가능한 표면의 오염과 마감재 안쪽으로 스며든 상태를 구분합니다. 보관할 유품과 처리할 물품을 협의하고, 청소로 다루기 어려운 자재는 교체 검토가 필요할 수 있습니다. 현장 기록은 의뢰인과 합의한 범위에서 다룹니다.</ReadingParagraph>
            <ReadingParagraph>고독사청소는 물건을 모두 비우는 방식으로만 진행하지 않습니다. 보관할 유품, 폐기할 물건, 오염을 처리할 구역을 구분하고 현장에 필요한 작업을 정합니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => {
                const hasPhotos = item.photoPairs || item.beforeAfter;
                return (
                  <div key={item.title} className={`rounded-xl border border-gray-100 p-5 ${hasPhotos ? "grid gap-5 md:grid-cols-[1fr_300px]" : ""}`}>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                      <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                      {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                    </div>
                    {hasPhotos && (
                      <div className="space-y-3">
                        {item.photoPairs?.map((pair, pairIndex) => (
                          <div key={pair.join("-")} className={`grid gap-2.5 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2.5 ${pair.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                            {pair.map(photo => (
                              <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-white">
                                <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 현장 사진 ${pairIndex + 1}`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 300px, 90vw" />
                              </div>
                            ))}
                          </div>
                        ))}
                        {item.beforeAfter?.map(pair => (
                          <figure key={pair.label} className="overflow-hidden rounded-xl border border-gray-100">
                            <div className="grid grid-cols-2">
                              <div className="relative">
                                <Image src={`/images/portfolio-v2/${pair.before}`} alt={`${pair.label} 작업 전`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 150px, 45vw" />
                                <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
                              </div>
                              <div className="relative">
                                <Image src={`/images/portfolio-v2/${pair.after}`} alt={`${pair.label} 작업 후`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 150px, 45vw" />
                                <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">후</span>
                              </div>
                            </div>
                            <figcaption className="px-3 py-2 text-sm font-bold text-brand-dark">{pair.label}</figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <ReadingParagraph className="mt-6 font-bold text-brand-dark">별도로 확인할 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">위 항목은 기본 서비스에 자동으로 포함되지 않으며, 진행 가능 여부와 비용을 별도로 확인해야 합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>


          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>추가 비용 여부는 처음 확인한 상태와 협의한 작업 범위가 달라지는지를 기준으로 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">다음과 같은 경우에는 견적 조정이 필요할 수 있습니다.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소독과 냄새 제거 자체는 기본 포함 항목입니다. 다만 자재 내부 오염에 대응하기 위한 별도 공사까지 기본 청소비에 포함되는 것은 아닙니다. 계약 전에는 확정된 작업과 추가 확인이 필요한 항목을 구분하고, 변경 시 비용과 일정을 어떻게 협의할지도 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="고독사청소 진행 순서와 소요 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">철거는 오염 처리에 앞서 필요한 경우도 있습니다. 구체적인 순서와 반복 작업 여부는 현장 상태에 맞춰 조정합니다.</ReadingParagraph>

            <ol className="mt-6 space-y-4">
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
            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">오염 범위, 자재 상태, 정리할 물건의 양, 냄새 제거와 별도 공사 필요 여부에 따라 달라집니다. 현장 확인 없이 당일 완료나 일정한 작업 기간을 약속드리지는 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">퇴실이나 공간 인도 일정이 정해져 있다면 상담 시 먼저 알려주세요. 청소 완료 시점과 복원까지 마무리되는 시점을 구분해 안내받는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>찐청소는 작업 전후 사진을 자세히 촬영해 보내드립니다. 현장에 직접 오시기 어려운 경우에도 합의한 작업이 어떻게 진행되었는지 확인하실 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 확인 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {photoChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">현장 사진을 보는 것이 부담스럽다면</h3>
            <ReadingParagraph className="mt-2">사진을 직접 확인하기 어렵다면 상담할 때 말씀해 주세요. 전체 공간, 보관 유품, 완료 상태 등 어떤 자료를 누구에게 전달할지 미리 협의하실 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">결과 확인을 위해 원치 않는 상세 장면까지 직접 보셔야 하는 방식으로 정할 필요는 없습니다. 대신 확인할 담당자와 필요한 자료의 범위를 정해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">사진으로 확인하기 어려운 부분도 있습니다</h3>
            <ReadingParagraph className="mt-2">사진은 눈에 보이는 결과를 확인하는 자료입니다. 냄새나 자재 내부 상태까지 사진만으로 판단할 수는 없습니다. 냄새 확인과 추가 조치 여부는 별도로 설명을 듣고, 현장 확인 방법을 협의해 주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 비대면 진행" />
            <ReadingParagraph>현장 주소와 희망 일정을 알려주시면 방문 가능 여부를 안내합니다. 층수, 엘리베이터, 주차 위치와 반출 여건도 함께 확인합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">현장에 가지 않고도 맡길 수 있나요?</h3>
            <ReadingParagraph className="mt-2">네. 원하시면 비대면으로 진행할 수 있습니다. 현장 출입 방법과 유품 분류, 작업 중 확인과 결과 전달 방법을 사전에 협의합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">비대면 진행 전 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">주변 시선이 걱정된다면</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="text-[15.5px]">방문 시간과 반출 동선 등 걱정되는 부분을 알려주세요. 현장 여건에서 조정할 수 있는 내용을 함께 확인하겠습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">다만 복도와 엘리베이터 등 공용 공간을 사용해야 할 수 있어, 주변에서 작업 사실을 전혀 알 수 없다고 보장하지는 않습니다.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 문의" />
            <ReadingParagraph>검수는 처음 협의한 작업 범위와 유품 분류 기준을 중심으로 진행합니다. 공간이 비워졌는지뿐 아니라 청소 결과와 남은 확인 사항을 함께 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">작업 후 궁금한 부분이나 냄새가 느껴지는 위치가 있다면 구체적으로 알려주세요. 재확인과 사후 처리의 적용 범위·기간은 계약 시 확인하시기 바랍니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">청소 완료만으로 공간의 모든 상태를 보증하는 것은 아닙니다. 다시 사용할 시점은 남아 있는 작업과 필요한 점검 사항까지 함께 확인해 결정해야 합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
            <div className="mt-4 space-y-5">
              {prepSections.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  <ReadingParagraph className="mt-2">{body}</ReadingParagraph>
                </div>
              ))}
            </div>
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
              <ReadingParagraph className="text-xl font-bold">고독사청소 상담·견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">처음부터 상황을 자세히 설명하거나 모든 정리 범위를 결정하실 필요는 없습니다. 현재 알고 계신 내용과 가장 필요한 도움부터 말씀해 주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">찐청소는 수거·폐기물 처리부터 청소·소독·냄새 제거까지 기본으로 진행합니다. 비대면으로 맡기실 수 있으며, 상세한 작업 전후 사진을 전달해 드립니다. 필요한 철거와 복원은 별도 견적으로 안내합니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>고독사청소 상담·견적 문의하기 →</CtaButton>
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
