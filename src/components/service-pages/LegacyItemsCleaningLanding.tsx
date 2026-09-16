import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·확인 항목"],
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
  ["우선 확인", "보관할 유품, 중요 서류·귀중품, 처리할 물품"],
  ["견적 기준", "필요한 인원·장비·약품, 분류 작업과 반출·처리 조건"],
  ["비대면 진행", "요청 시 가능, 출입·물품 확인·인계 방법 사전 협의"],
  ["결과 확인", "상세한 작업 전후 사진 촬영·전달"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "정리할 공간과 물품의 양",
  "보관 유품을 찾고 분류하는 작업",
  "서랍·수납장 등 확인할 구역",
  "가구·가전의 종류와 수량",
  "층수·승강기·주차·반출 동선",
  "물품 정리 후 청소할 구역과 오염 상태",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "사진·편지와 기념품",
    body: "사진과 앨범, 편지, 기념품처럼 남겨두고 싶은 물건을 알려주세요. 정확한 위치를 모르시면 특징과 예상 위치를 말씀해 주세요.",
    note: "분류한 유품을 어디에 보관하고 누구에게 전달할지도 함께 정합니다.",
  },
  {
    title: "중요 서류와 귀중품",
    body: "찾아야 할 서류나 귀중품이 있다면 작업 전에 알려주세요. 확인할 물품의 종류와 발견 시 연락할 담당자를 정합니다.",
    note: "서류가 섞여 있는 상자나 수납장은 처리 기준을 먼저 협의합니다.",
  },
  {
    title: "의류와 생활용품",
    body: "보관할 의류와 생활용품, 처리할 물품을 구분합니다. 남겨둘 방이나 수납장을 지정할 수도 있습니다.",
    note: "기부나 별도 전달을 원하시면 가능 여부와 방법을 따로 확인합니다.",
    beforeAfter: [
      { label: "옷방 정리", before: "legacy-clothes-before.webp", after: "legacy-clothes-after.webp" },
      { label: "방 정리", before: "legacy-room-before.webp", after: "legacy-room-after.webp" },
    ],
  },
  {
    title: "가구·가전 수거와 폐기물 처리",
    body: "협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다.",
    note: "큰 가구나 가전은 크기와 수량, 분해 필요 여부와 반출 동선을 확인해 견적에 반영합니다. 남겨둘 물품은 작업 전에 명확하게 구분합니다.",
    photoPairs: [
      ["legacy-furniture-01.webp", "legacy-furniture-02.webp"],
      ["legacy-corridor-01.webp", "legacy-corridor-02.webp"],
    ],
  },
  {
    title: "공간 청소",
    body: "물품 정리 후 바닥과 주방, 욕실 등 협의한 구역을 청소합니다. 가구에 가려져 있던 자리와 구석의 오염도 확인합니다.",
    note: "수납장이나 가전 내부 등 세부 작업 범위는 상담 시 정합니다. 마감재의 변색·손상은 청소로 제거할 수 있는 오염과 구분해 안내합니다.",
    beforeAfter: [
      { label: "주방 정리 1", before: "legacy-kitchen1-before.webp", after: "legacy-kitchen1-after.webp" },
      { label: "주방 정리 2", before: "legacy-kitchen2-before.webp", after: "legacy-kitchen2-after.webp" },
    ],
  },
  {
    title: "소독과 냄새 제거",
    body: "청소 후 소독과 냄새 제거까지 기본으로 진행합니다. 공간의 소재와 오염 상태를 확인해 작업 방법을 정합니다.",
    note: "특별한 오염 처리가 필요한 현장은 일반 유품정리와 구분해 작업 범위를 확인합니다.",
  },
];

const extraCostItems = [
  "사전에 확인하지 못한 방이나 창고에 물품이 남아 있는 경우",
  "유품 탐색이나 세부 분류 작업이 추가되는 경우",
  "대형 가구·가전 반출이 추가되는 경우",
  "청소 구역이나 요청 작업이 늘어나는 경우",
  "승강기 사용 제한 등 반출 조건이 변경되는 경우",
  "별도 처리가 필요한 특수 오염이 확인되는 경우",
];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "위치와 물품의 양, 희망 일정과 정리할 범위를 확인합니다. 퇴실이나 집 인도 날짜가 정해져 있다면 함께 알려주세요."],
  ["보관·처리 기준과 견적 협의", "남겨둘 유품과 처리할 물품, 추가 확인이 필요한 대상을 구분합니다. 물품 처리를 결정할 담당자와 연락 방법을 정하고, 작업 범위와 비용을 안내합니다. 가족 간 의견이 정해지지 않은 물품은 처리를 보류하도록 협의합니다."],
  ["작업 전 사진 촬영과 유품 분류", "작업 전 상태를 자세히 촬영하고, 협의한 기준에 따라 물품을 분류합니다. 판단이 어려운 물품은 정해둔 방법으로 확인합니다."],
  ["수거·폐기물 처리와 청소", "처리하기로 확인한 물품을 수거하고 폐기물 처리를 진행합니다. 이후 협의한 공간을 청소하고 소독·냄새 제거까지 진행합니다."],
  ["사진 전달과 최종 확인", "작업 후 사진을 자세히 촬영해 보내드립니다. 보관 유품의 위치와 전달 상태, 청소 결과와 남은 확인 사항을 안내합니다."],
];

const reservationChecklist = [
  "현장 주소와 층수",
  "정리할 공간과 대략적인 물품의 양",
  "보관할 유품과 요청 사항",
  "출입·주차·승강기 이용 조건",
  "물품 처리를 확인할 담당자",
  "희망 날짜와 완료가 필요한 시점",
];

const prepItems = [
  "보관할 유품과 찾고 싶은 물건을 알려주세요.",
  "사진·편지·서류 등 확인이 필요한 대상을 말씀해 주세요.",
  "손대지 않을 방이나 수납장이 있다면 지정해 주세요.",
  "물품 처리를 결정하고 연락받을 담당자를 정해 주세요.",
  "가족 간 결정이 필요한 물품은 미리 알려주세요.",
  "비대면 진행 시 출입·확인·인계 방법을 협의해 주세요.",
  "집 인도나 퇴실 일정이 있다면 말씀해 주세요.",
];

const faqItems: [string, string][] = [
  ["유품정리 비용은 평당 얼마인가요?", "찐청소는 평수만으로 금액을 정하지 않습니다. 물품의 양과 분류 작업, 반출 조건, 오염 상태를 확인해 필요한 인원·장비·약품과 처리 조건을 기준으로 산정합니다."],
  ["수거와 폐기물 처리도 포함되나요?", "네. 협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다. 물품의 종류와 양, 반출 동선을 확인해 전체 비용을 안내합니다."],
  ["청소와 소독·냄새 제거도 포함되나요?", "네. 물품 정리 후 협의한 공간의 청소와 소독·냄새 제거까지 기본으로 진행합니다."],
  ["모든 유품을 처리해야 하나요?", "아닙니다. 보관할 물건과 처리할 대상, 작업할 구역을 협의합니다. 아직 결정하지 못한 물품은 추가 확인 대상으로 구분합니다."],
  ["사진이나 편지, 중요한 서류를 찾아줄 수 있나요?", "찾아야 할 물품의 특징과 예상 위치를 알려주시면 확인할 작업 범위를 협의합니다. 다만 위치와 상태를 알 수 없는 물품의 발견을 보장하지는 않습니다."],
  ["가족이 현장에 없어도 진행할 수 있나요?", "네. 요청 시 비대면으로 진행할 수 있습니다. 출입 방법과 물품 확인 기준, 연락할 담당자와 유품 인계 방법을 먼저 정합니다."],
  ["비대면으로 맡기면 결과는 어떻게 확인하나요?", "작업 전후 사진을 자세히 촬영해 보내드립니다. 보관 유품과 작업 결과를 안내하고, 추가로 확인할 부분이 있으면 함께 살펴봅니다."],
  ["가족마다 남겨두고 싶은 물건이 다르면 어떻게 하나요?", "작업 전에 보관할 대상을 취합해 알려주세요. 의견이 정해지지 않은 물품은 처리를 보류하고 확인할 담당자를 정해 협의합니다."],
  ["유품정리와 고독사청소는 같은 서비스인가요?", "유품정리는 고인이 남긴 물품을 분류하고 정리하는 작업입니다. 현장에 특별한 오염 처리가 필요한 경우에는 별도 작업 범위를 확인합니다. 모든 유품정리가 고독사청소에 해당하는 것은 아닙니다."],
];

const path = "/유품정리/";

export default function LegacyItemsCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "유품정리",
      serviceType: "유품정리·폐기물 처리",
      description: "찐청소 유품정리는 수거·폐기물 처리·청소·소독·냄새 제거까지 기본으로 포함합니다. 보관할 유품과 처리할 물품을 먼저 확인하며, 요청 시 비대면 진행과 상세한 전후 사진 전달이 가능합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "유품정리", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/legacy-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/80" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>유품정리</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">유품정리 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>고인의 물건을 정리하는 일은 어디서부터 시작해야 할지 결정하기 어려울 수 있습니다. 남겨두고 싶은 물건이 있어도 직접 하나씩 살펴볼 시간이나 여건이 충분하지 않을 수 있고요.</p>
            <p>찐청소는 보관할 유품과 처리할 물품을 먼저 확인하고, 수거·폐기물 처리부터 청소·소독·냄새 제거까지 함께 진행합니다.</p>
            <p>원하시면 비대면으로 맡기실 수 있습니다. 작업 전후 사진을 자세히 촬영해 보내드리고, 보관 유품과 작업 결과를 확인하실 수 있도록 안내합니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">유품정리 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="유품정리 비용과 견적 산정 기준" />
            <p>유품정리 비용에는 협의한 물품의 수거·폐기물 처리와 청소·소독·냄새 제거가 포함됩니다.</p>
            <p className="mt-4">견적은 필요한 인원과 장비·약품, 물품의 양과 분류에 필요한 시간, 반출 조건을 확인해 산정합니다.</p>
            <p className="mt-4">같은 크기의 집이라도 보관할 유품이 미리 구분된 공간과 서랍·수납장 속 물품을 하나씩 확인해야 하는 공간은 작업량이 다릅니다. 찐청소는 평수만으로 가격을 정하지 않습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">견적 상담에서는 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소독과 냄새 제거는 별도 옵션이 아닌 기본 포함 작업입니다. 협의한 전체 범위를 기준으로 비용을 안내합니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="유품정리 기본 범위와 확인 항목" />
            <p>보관할 유품과 처리할 물품을 구분하고, 수거·폐기물 처리 후 공간 청소와 소독·냄새 제거까지 진행합니다.</p>
            <p className="mt-4">바로 결정하기 어려운 물품은 추가 확인 대상으로 구분하도록 작업 전에 협의합니다.</p>

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
                  {item.beforeAfter && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {item.beforeAfter.map(pair => (
                        <figure key={pair.label} className="overflow-hidden rounded-xl border border-gray-100">
                          <div className="grid grid-cols-2">
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.before}`} alt={`${pair.label} 정리 전`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
                            </div>
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.after}`} alt={`${pair.label} 정리 후`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">후</span>
                            </div>
                          </div>
                          <figcaption className="px-3 py-2 text-sm font-bold text-brand-dark">{pair.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 냄새 제거 약품 안전성 - "소독과 냄새 제거" 바로 뒤에 배치해 신뢰를 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">소독·냄새 제거에 사용하는 약품, 안전한가요?</h2>
            <p className="mt-4">소독과 냄새 제거에 사용하는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 고인이 지내시던 공간을 가족이 다시 편안하게 사용하실 수 있도록, 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <p>협의한 범위를 넘어 물품의 양이나 분류·청소 작업이 늘어나면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">수거·폐기물 처리·소독·냄새 제거 자체를 추가 옵션으로 청구하는 것은 아닙니다. 작업량이나 조건이 변경되는 경우 해당 내용과 비용을 먼저 협의합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="유품정리 진행 순서와 소요 시간" />
            <p>상담 → 보관·처리 기준 확인 → 견적 협의 → 분류·수거·폐기물 처리 → 청소·소독·냄새 제거 → 사진 전달·최종 확인 순서로 진행합니다.</p>

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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 물품의 양뿐 아니라 분류와 가족 확인 과정에 따라 달라집니다. 필요한 완료일과 충분히 살펴봐야 할 부분을 함께 말씀해 주세요.</p>
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>작업 전후 사진을 자세히 촬영해 고객님께 보내드립니다.</p>
            <p className="mt-4">현장에 함께하지 못하셔도 정리한 공간과 청소 결과를 확인하실 수 있도록 안내합니다. 보관 유품의 위치와 인계 방법도 함께 확인합니다.</p>
            <p className="mt-4">사진을 보신 뒤 궁금한 부분이나 추가로 확인할 위치가 있으면 말씀해 주세요.</p>
            <p className="mt-5 text-[15px] text-gray-500">고객님께 전달하는 작업 기록과 홈페이지·홍보용 사진 사용은 별개입니다. 촬영과 공개에 대한 요청 사항은 상담 시 알려주세요.</p>
          </section>

          {/* 6. 지역/예약/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">가족이 물품을 확인할 수 있는 날짜와 정리를 완료해야 하는 날짜가 다르다면 각각 말씀해 주세요. 현장 조건에 맞춰 일정을 협의합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담할 때 다음 정보를 알려주시면 도움이 됩니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">비대면 진행 안내</h3>
              <p className="mt-2 text-[15.5px]">원하시면 비대면으로 진행할 수 있습니다. 출입 방법과 보관 유품, 작업 중 물품 확인 방법, 정리 후 인계 방법을 사전에 협의합니다.</p>
              <p className="mt-2 text-[15.5px]">멀리 거주하시거나 현장에 머무르기 어려운 경우에는 비대면 진행을 요청해 주세요. 상세한 전후 사진으로 작업 결과를 전달해드립니다.</p>
            </div>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 완료 후 확인 및 사후 처리 기준" />
            <p>작업 후에는 보관하기로 한 유품과 협의한 정리·청소 범위를 기준으로 결과를 확인합니다.</p>
            <p className="mt-4">보관 유품의 위치와 전달 상태, 남겨둔 물품과 청소 결과를 점검합니다. 아직 결정하지 못한 물품은 별도로 확인합니다.</p>
            <p className="mt-4">비대면으로 진행하신 경우에는 전달받은 사진을 확인하신 뒤 문의할 내용을 알려주세요.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 확인이 필요한 사항은 물품이나 위치, 발견한 상태를 전달해 주시면 작업 내용과 기록을 확인해 안내합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="유품정리 전 준비사항" />
            <p>처음부터 모든 물건의 처리 여부를 정하실 필요는 없습니다. 우선 남겨두고 싶은 것부터 알려주세요.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">물품 처리를 결정할 수 있는 의뢰인과 작업 범위를 확인한 뒤 진행합니다. 다른 사람의 물건이 섞여 있다면 함께 알려주세요.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="유품정리 자주 묻는 질문" />
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
              <p className="text-xl font-bold">유품정리 견적 문의</p>
              <p className="mt-3 text-white/80">정리할 범위를 아직 결정하지 못하셨다면, 현장 상황과 남겨두고 싶은 물건부터 말씀해 주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 포함한 견적을 안내합니다. 원하시면 비대면으로 진행하고, 상세한 전후 사진으로 작업 결과를 전달해드립니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>유품정리 견적 문의하기 →</CtaButton>
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
