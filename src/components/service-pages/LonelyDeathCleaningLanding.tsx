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
  ["process", "진행 순서"],
  ["photos", "작업 전후 사진"],
  ["area", "지역·예약·비대면"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["기본 포함", "수거·폐기물 처리·청소·소독·냄새 제거"],
  ["별도 견적", "필요한 부분의 철거·복원"],
  ["우선 확인", "현장 작업 가능 여부, 보관 유품, 오염 범위"],
  ["견적 기준", "필요한 인원·장비·약품과 반출·처리 조건"],
  ["비대면 진행", "요청 시 가능, 출입·물품 확인·인계 방법 사전 협의"],
  ["결과 확인", "상세한 작업 전후 사진 촬영·전달"],
];

const estimateChecklist = [
  "오염이 발생한 위치와 범위",
  "바닥·벽면·집기 등 오염된 소재",
  "보관할 유품과 처리할 물품의 양",
  "필요한 인원과 작업 기간",
  "사용할 장비와 약품",
  "층수·승강기·주차·반출 동선",
  "철거·복원이 필요한 부분",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "보관 유품과 중요 물품 확인",
    body: "보관할 사진과 기념품, 찾아야 할 서류·귀중품을 먼저 알려주세요. 남겨둘 유품과 처리할 물품, 추가 확인이 필요한 대상을 구분합니다.",
    note: "처리 여부가 모호한 물건은 누구에게 어떤 방식으로 확인할지 사전에 정합니다. 오염된 유품은 상태에 따라 보관·전달 방법도 함께 협의합니다.",
    photoPairs: [
      ["lonely-items-01.webp", "lonely-items-02.webp"],
      ["lonely-items-03.webp", "lonely-items-04.webp"],
    ],
  },
  {
    title: "수거와 폐기물 처리",
    body: "협의한 물품의 수거와 폐기물 처리는 기본 견적에 포함됩니다. 가구와 침구, 생활용품 등의 종류와 양, 오염 상태를 확인해 작업을 준비합니다.",
    note: "의뢰인이 처리하기로 확인한 대상을 기준으로 진행하며, 보관할 유품이 섞이지 않도록 분류 기준을 먼저 정합니다.",
    beforeAfter: [
      { label: "물품 수거", before: "lonely-collect-before.webp", after: "lonely-collect-after.webp" },
    ],
    photoPairs: [
      ["lonely-collect-work-01.webp", "lonely-collect-work-02.webp"],
    ],
  },
  {
    title: "바닥과 주변 오염 제거",
    body: "오염된 위치와 주변 범위를 확인하고 소재에 맞춰 청소합니다. 이음새와 틈새처럼 추가 확인이 필요한 부분도 살핍니다.",
    note: "마감재 안쪽을 확인하기 위해 분해나 철거가 필요한 경우에는 작업 범위와 비용을 별도로 협의합니다.",
    beforeAfter: [
      { label: "바닥 오염 제거", before: "lonely-floor-before.webp", after: "lonely-floor-after.webp" },
    ],
    photoPairs: [
      ["lonely-floor-work-01.webp", "lonely-floor-work-02.webp"],
    ],
  },
  {
    title: "소독",
    body: "소독은 기본 작업에 포함됩니다. 현장의 오염을 제거하고, 소재와 상태에 맞춰 소독을 진행합니다.",
    note: "작업 구역과 사용 조건에 따라 필요한 절차를 정하고, 작업 후 확인할 사항을 안내합니다.",
    photoPairs: [
      ["lonely-disinfect-01.webp", "lonely-disinfect-02.webp"],
      ["lonely-disinfect-03.webp", "lonely-disinfect-04.webp"],
    ],
  },
  {
    title: "냄새 제거",
    body: "냄새 제거도 기본 비용에 포함됩니다. 냄새가 남은 위치와 오염된 소재를 함께 확인해 작업합니다.",
    note: "표면 청소만으로 처리하기 어려운 부분이 있다면 추가 조치가 필요한 이유를 설명합니다. 현장 상태를 확인하지 않고 완전 제거를 보장하지는 않습니다.",
  },
  {
    title: "철거와 복원 — 별도 견적",
    body: "오염이나 손상으로 인해 제거·교체가 필요한 부분은 철거와 복원까지 진행할 수 있습니다.",
    note: "철거할 구역과 복원 범위, 자재와 마감 방식을 협의하고 청소 비용과 구분해 견적을 안내합니다. 모든 현장에 철거를 적용하는 것은 아닙니다.",
    beforeAfter: [
      { label: "바닥 철거", before: "lonely-demo-before.webp", after: "lonely-demo-after.webp" },
    ],
    photoPairs: [
      ["lonely-demo-work-01.webp", "lonely-demo-work-02.webp"],
    ],
  },
];

const extraCostItems = [
  "물품 아래나 마감재 안쪽에서 추가 오염이 확인된 경우",
  "반출할 가구나 물품의 양이 늘어난 경우",
  "유품 탐색과 세부 분류 작업이 추가된 경우",
  "청소 구역이 확대된 경우",
  "철거·교체·복원 공사가 필요한 경우",
  "반출 동선이나 건물 이용 조건이 변경된 경우",
];

const processSteps: [string, string][] = [
  ["상담과 작업 가능 여부 확인", "현장 위치와 현재 상황을 확인합니다. 관계기관의 조사나 현장 보존 요청이 있다면 청소·반출을 시작할 수 있는 상태인지 먼저 확인합니다."],
  ["유품과 작업 범위 확인", "보관할 유품과 처리할 물품, 오염된 구역을 구분합니다. 작업 중 물품 처리를 확인할 담당자와 연락 방법도 정합니다."],
  ["견적과 일정 협의", "기본 청소 범위와 필요한 인원·장비·약품, 예상 기간을 안내합니다. 철거·복원이 필요하면 별도 공정과 비용을 함께 설명합니다."],
  ["작업 전 기록과 현장 작업", "작업 전 상태를 자세히 촬영합니다. 협의한 기준에 따라 물품을 분류·수거하고 폐기물 처리, 청소·소독·냄새 제거를 진행합니다. 철거·복원을 계약한 경우에는 현장 조건에 맞춰 공정 순서를 조정합니다."],
  ["작업 후 사진 전달과 최종 확인", "작업 후 사진을 자세히 촬영해 보내드립니다. 보관 유품과 청소 결과, 추가 확인이 필요한 사항을 안내합니다."],
];

const reservationChecklist = [
  "현장 주소와 층수",
  "현재 출입과 작업이 가능한지 여부",
  "알려진 오염 범위와 물품의 양",
  "보관할 유품과 요청 사항",
  "주차·승강기·반출 조건",
  "작업 내용을 확인할 담당자",
];

const prepItems = [
  "현장 작업이 가능한 상태인지 확인해 주세요.",
  "보관할 유품과 찾아야 할 물건을 알려주세요.",
  "처리 여부가 정해지지 않은 물품을 말씀해 주세요.",
  "물품 처리를 결정할 의뢰인과 연락 담당자를 정해 주세요.",
  "출입 방법과 건물 이용 조건을 알려주세요.",
  "비대면 진행 시 유품 인계와 결과 확인 방법을 협의해 주세요.",
];

const faqItems: [string, string][] = [
  ["고독사청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 금액을 정하지 않습니다. 오염 범위와 소재, 물품의 양, 필요한 인원·장비·약품과 반출·처리 조건을 확인해 견적을 안내합니다."],
  ["수거와 폐기물 처리도 포함되나요?", "네. 협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다. 물품의 종류와 양, 오염 상태와 반출 조건을 확인해 비용을 산정합니다."],
  ["소독과 냄새 제거는 추가 비용인가요?", "아니요. 청소와 함께 소독·냄새 제거까지 기본으로 진행합니다. 사전에 협의한 범위가 변경되는 경우에는 변경 사항을 먼저 안내합니다."],
  ["철거와 복원도 가능한가요?", "네. 필요한 부분의 철거와 복원까지 진행할 수 있습니다. 기본 청소 비용에는 포함되지 않으며, 공사 범위와 자재를 협의해 별도로 견적을 안내합니다."],
  ["유품을 모두 처리해야 하나요?", "아닙니다. 보관할 유품과 처리할 물품을 먼저 구분합니다. 오염된 유품은 상태를 확인하고 보관·전달 방법을 협의합니다."],
  ["현장에 없어도 맡길 수 있나요?", "네. 요청 시 비대면으로 진행할 수 있습니다. 출입 방법과 유품 확인, 연락 담당자와 인계 방법을 먼저 정합니다."],
  ["비대면으로 맡기면 결과는 어떻게 확인하나요?", "작업 전후 사진을 자세히 촬영해 보내드립니다. 보관 유품과 작업 결과를 안내하고, 추가로 확인할 부분이 있으면 말씀을 듣고 확인합니다."],
  ["냄새를 완전히 없앨 수 있나요?", "냄새 제거는 기본 작업에 포함되지만, 오염된 소재와 범위에 따라 필요한 조치가 다릅니다. 내부 오염으로 철거·교체가 필요한 경우도 있어 현장 확인 없이 완전 제거를 보장하지 않습니다."],
  ["주변에 알려지지 않게 진행할 수 있나요?", "방문 시간과 반출 방식에 대한 요청을 알려주시면 조율 가능한 부분을 확인합니다. 공용 공간을 이용한 작업 등이 있어 주변에 전혀 보이지 않는다고 보장하지는 않습니다."],
  ["청소가 끝나면 바로 공간을 사용할 수 있나요?", "남은 공정과 시설 상태에 따라 달라집니다. 별도 보수나 추가 확인이 필요한 부분을 안내하고 사용 일정을 함께 확인합니다."],
];

const path = "/고독사청소/";

export default function LonelyDeathCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "고독사청소",
      serviceType: "고독사청소·특수청소",
      description: "찐청소 고독사청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 기본으로 포함합니다. 비대면 진행과 상세 전후 사진 전달이 가능하며, 필요한 철거·복원은 별도 견적으로 진행합니다.",
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
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg/lonely-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/80" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>고독사청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">고독사청소 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>갑작스럽게 현장을 정리해야 하는 상황에서는 무엇부터 확인해야 할지 막막할 수 있습니다. 보관할 유품과 정리할 물품, 현장 청소까지 결정해야 할 일도 많습니다.</p>
            <p>찐청소는 현장 상태와 의뢰인의 요청을 확인하고 수거·폐기물 처리부터 청소·소독·냄새 제거까지 함께 진행합니다. 철거와 복원이 필요한 부분은 작업 범위와 비용을 별도로 안내합니다.</p>
            <p>원하시면 비대면으로 맡기실 수 있습니다. 작업 전후 사진을 자세히 촬영해 보내드리고, 보관 유품과 작업 결과를 확인하실 수 있도록 설명해드립니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">고독사청소 견적 문의하기 →</CtaButton>
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

          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="고독사청소 비용과 견적 산정 기준" />
            <p>고독사청소 비용에는 협의한 대상의 수거·폐기물 처리와 청소·소독·냄새 제거가 포함됩니다.</p>
            <p className="mt-4">견적은 필요한 인원과 장비·약품, 오염된 범위와 소재, 물품의 양과 반출 조건을 확인해 산정합니다.</p>
            <p className="mt-4">같은 면적이라도 표면을 청소하는 현장과 바닥재 안쪽까지 확인해야 하는 현장은 작업량이 다릅니다. 보관할 유품을 분류하는 데 필요한 시간도 함께 고려합니다.</p>
            <p className="mt-4">찐청소는 평수만으로 가격을 정하지 않습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">견적 상담에서는 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소독과 냄새 제거는 기본 비용에 포함되며, 철거와 복원은 별도 견적입니다. 각 작업에 포함되는 내용을 구분해 안내합니다.</p>
          </section>

          {/* 2. 범위/별도작업 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="고독사청소 기본 범위와 별도 작업" />
            <p>유품과 처리할 물품을 구분한 뒤, 협의한 구역의 오염을 제거하고 소독·냄새 제거까지 진행합니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => {
                const hasPhotos = item.photoPairs || item.beforeAfter;
                return (
                  <div key={item.title} className={`rounded-xl border border-gray-100 p-5 ${hasPhotos ? "grid gap-5 md:grid-cols-[1fr_300px]" : ""}`}>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                      <p className="mt-2">{item.body}</p>
                      {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
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
          </section>

          {/* 냄새 제거·공기질 개선 약품 안전성 - "냄새 제거" 바로 뒤에 배치해 신뢰를 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">냄새 제거·공기질 개선에 사용하는 약품, 안전한가요?</h2>
            <p className="mt-4">고독사청소에 사용하는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 냄새 제거뿐 아니라 공기질 개선 효과까지 확인된 제품이라, 청소가 끝난 뒤 바로 생활하거나 사용해야 하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>철거·복원을 요청하거나, 협의한 범위를 넘어 작업량이 늘어나는 경우에는 추가 견적이 필요할 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">수거·폐기물 처리·소독·냄새 제거 자체를 별도 옵션으로 추가하는 것은 아닙니다. 작업 조건이 바뀌면 변경 내용과 비용을 먼저 안내하고 협의합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="고독사청소 진행 순서와 소요 시간" />
            <p>상담 → 작업 가능 여부 확인 → 유품·오염 범위 확인 → 견적 협의 → 현장 작업 → 사진 전달·최종 확인 순서로 진행합니다.</p>

            <ol className="mt-6 space-y-4">
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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 기간은 오염 정도와 소재, 물품의 양, 필요한 공정에 따라 달라집니다. 현장 확인 후 예상 일정을 안내합니다.</p>
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>상세한 작업 전후 사진을 촬영해 고객님께 전달합니다.</p>
            <p className="mt-4">현장에 함께하지 못하셔도 작업한 구역과 정리 상태를 확인하실 수 있도록 설명해드립니다. 보관 유품의 위치와 인계 방법도 함께 안내합니다.</p>
            <p className="mt-4">현장 사진을 자세히 보는 것이 부담스러우시면 미리 말씀해 주세요. 전달받을 범위를 사전에 협의하겠습니다.</p>
            <p className="mt-5 text-[15px] text-gray-500">고객에게 전달하는 작업 기록과 홈페이지·홍보용 사진 사용은 별개입니다. 촬영과 공개에 관한 요청은 상담 시 알려주세요.</p>
          </section>

          {/* 6. 지역/예약/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 작업 가능한 시점, 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담할 때 다음 정보를 알려주시면 도움이 됩니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">비대면 진행 안내</h3>
              <p className="mt-2 text-[15.5px]">원하시면 비대면으로 진행할 수 있습니다. 출입 방법과 보관 유품, 작업 중 확인 방법, 유품 인계와 결과 확인 방식을 사전에 협의합니다.</p>
              <p className="mt-2 text-[15.5px]">방문 시간과 반출 과정에서 신경 쓰이는 부분도 말씀해 주세요. 현장 조건 안에서 조율 가능한 방법을 확인하겠습니다.</p>
            </div>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 완료 후 검수 및 사후 처리 기준" />
            <p>작업 완료 후에는 협의한 물품 정리와 오염 처리 범위를 기준으로 결과를 확인합니다.</p>
            <p className="mt-4">보관 유품의 인계 상태와 작업 구역, 남은 확인 사항을 안내합니다. 철거·복원을 진행했다면 해당 시공 범위와 마감 상태도 함께 점검합니다.</p>
            <p className="mt-4">비대면으로 진행하신 경우에는 전달받은 사진을 확인하신 뒤 문의할 내용을 알려주세요.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 확인이 필요한 부분은 위치와 발견한 상태를 전달해 주시면 기존 작업 범위와 현장 상태를 확인해 처리 방법을 안내합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
            <p>상담을 위해 현장을 먼저 정리하실 필요는 없습니다. 현재 알고 계신 상황과 요청 사항부터 전달해 주세요.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진이 없더라도 촬영을 위해 무리해서 현장에 들어가실 필요는 없습니다. 가족 간 처리 의견이 정해지지 않은 물품은 보류 대상으로 알려주세요.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="고독사청소 자주 묻는 질문" />
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
              <p className="text-xl font-bold">고독사청소 견적 문의</p>
              <p className="mt-3 text-white/80">현장 상황을 자세히 설명하기 어려우시다면 위치와 현재 알고 계신 내용부터 말씀해 주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 포함한 견적을 안내합니다. 필요한 철거·복원은 별도로 협의하며, 원하시면 비대면 진행과 상세한 전후 사진 전달로 작업 결과를 확인하실 수 있습니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>고독사청소 견적 문의하기 →</CtaButton>
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
