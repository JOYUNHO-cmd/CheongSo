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
  ["scope", "기본 범위·별도 확인"],
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
  ["기본 포함", "수거·폐기물 처리·청소·소독·냄새 제거"],
  ["견적 기준", "물건의 양과 분류할 내용, 반출 조건"],
  ["비대면 진행", "요청 시 가능, 사진으로 결과 확인"],
  ["상담 방법", "사진으로도 상담 가능"],
  ["결과 확인", "상세한 작업 전후 사진 촬영·전달"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "정리할 공간과 물품의 양",
  "보관할 유품을 찾고 분류하는 작업",
  "서랍·수납장 등 확인이 필요한 구역",
  "가구·가전의 종류와 수량, 반출 동선",
  "정리 후 청소할 구역과 오염 상태",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "보관할 유품과 처리할 물건 구분",
    body: "사진·편지·기념품처럼 남겨두고 싶은 물건과 처리할 물건을 먼저 구분합니다. 정확한 위치를 모르셔도 특징과 예상 위치를 알려주시면 확인 범위를 협의합니다.",
    note: "옷방이나 침실처럼 물건이 섞여 있는 공간은 보관할 대상을 먼저 정한 뒤 나머지를 정리합니다.",
    beforeAfter: [
      { label: "옷방 정리", before: "legacy-clothes-before.webp", after: "legacy-clothes-after.webp" },
      { label: "방 정리", before: "legacy-room-before.webp", after: "legacy-room-after.webp" },
    ],
  },
  {
    title: "중요 서류와 귀중품 확인",
    body: "찾아야 할 서류나 귀중품이 있다면 작업 전에 알려주세요. 확인할 물품의 종류와 발견 시 연락드릴 담당자를 정합니다.",
    note: "서류가 섞여 있는 상자나 수납장은 처리 기준을 먼저 협의한 뒤 정리합니다.",
  },
  {
    title: "수거와 폐기물 처리",
    body: "처리하기로 협의한 가구·가전과 생활용품의 수거, 폐기물 처리까지 기본 견적에 포함됩니다.",
    note: "큰 가구나 가전은 크기와 수량, 분해 필요 여부와 반출 동선을 확인해 견적에 반영합니다.",
    photoPairs: [
      ["legacy-furniture-01.webp", "legacy-furniture-02.webp"],
      ["legacy-corridor-01.webp", "legacy-corridor-02.webp"],
    ],
  },
  {
    title: "정리 후 청소",
    body: "물품 정리 후 바닥과 주방, 욕실 등 협의한 구역을 청소합니다. 가구에 가려져 있던 자리와 구석의 오염도 함께 확인합니다.",
    note: "수납장이나 가전 내부 등 세부 청소 범위는 상담 시 정합니다.",
    beforeAfter: [
      { label: "주방 정리 1", before: "legacy-kitchen1-before.webp", after: "legacy-kitchen1-after.webp" },
      { label: "주방 정리 2", before: "legacy-kitchen2-before.webp", after: "legacy-kitchen2-after.webp" },
    ],
  },
  {
    title: "소독과 냄새 제거",
    body: "정리와 청소 후 소독과 냄새 제거까지 기본으로 진행합니다. 공간의 소재와 오염 상태를 확인해 작업 방법을 정합니다.",
    note: "특별한 오염 처리가 필요한 현장은 일반 유품정리와 구분해 작업 범위를 확인합니다.",
  },
];

const separateScopeItems = [
  "서류나 귀중품을 찾는 데 오랜 시간이 걸리는 경우",
  "다른 가족의 동의가 필요한 물품 처리",
  "대형 가구·가전의 분해나 특수 반출",
  "누수·곰팡이 등 별도 확인이 필요한 하자",
  "잠금장치 해제나 전문 업체 협조가 필요한 경우",
  "기부·재판매 등 별도 처리를 원하는 물품",
  "청소 범위를 벗어나는 수리·보수 작업",
];

const extraCostItems = [
  "사전에 확인하지 못한 방이나 창고에 물품이 남아 있는 경우",
  "유품 탐색이나 세부 분류 작업이 추가되는 경우",
  "대형 가구·가전 반출이 추가되는 경우",
  "청소 구역이나 요청 작업이 늘어나는 경우",
  "승강기 사용 제한 등 반출 조건이 변경되는 경우",
  "가족 간 협의가 늦어져 작업이 여러 차례 나뉘는 경우",
  "별도 처리가 필요한 특수 오염이 확인되는 경우",
];

const processFlow = ["상담", "보관·처리 기준 협의", "견적 확정", "분류·수거", "폐기물 처리", "청소", "소독·냄새 제거", "사진 전달"];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "위치와 물품의 양, 희망 일정과 정리할 범위를 확인합니다. 퇴실이나 집 인도 날짜가 정해져 있다면 함께 알려주세요."],
  ["보관·처리 기준과 견적 협의", "남겨둘 유품과 처리할 물품, 추가 확인이 필요한 대상을 구분합니다. 물품 처리를 결정할 담당자와 연락 방법을 정하고 견적을 안내합니다."],
  ["작업 전 사진 촬영과 유품 분류", "작업 전 상태를 자세히 촬영하고, 협의한 기준에 따라 물품을 분류합니다. 판단이 어려운 물품은 정해둔 방법으로 확인합니다."],
  ["수거와 폐기물 처리", "처리하기로 확인한 물품을 수거하고 폐기물 처리를 진행합니다."],
  ["청소와 소독·냄새 제거", "협의한 공간을 청소하고 소독·냄새 제거까지 진행합니다."],
  ["사진 전달과 최종 확인", "작업 후 사진을 자세히 촬영해 보내드립니다. 보관 유품의 위치와 전달 상태, 청소 결과와 남은 확인 사항을 안내합니다."],
];

const photoChecklist = [
  "정리 전 물품 배치와 보관 대상 표시",
  "수거·반출 전후 공간 상태",
  "청소 완료 후 바닥·수납공간",
  "보관하기로 한 유품의 위치",
  "서류·귀중품 발견 시 보관 상태",
  "추가로 확인이 필요했던 부분",
];

const reservationChecklist = [
  "현장 주소와 층수",
  "정리할 공간과 대략적인 물품의 양",
  "보관할 유품과 요청 사항",
  "출입·주차·승강기 이용 조건",
  "물품 처리를 확인할 담당자",
  "연락 가능한 시간대",
  "희망 날짜와 완료가 필요한 시점",
  "비대면 진행 여부",
];

const checkupItems = [
  "보관하기로 한 유품의 위치와 전달 상태",
  "협의한 청소·소독·냄새 제거 범위",
  "수거·폐기물 처리 완료 여부",
  "남겨둔 물품과 처리한 물품의 구분",
  "추가로 확인이 필요했던 부분",
  "작업 전후 사진 전달 여부",
  "사후 문의 접수 방법",
];

const prepSections: [string, string][] = [
  ["보관할 유품부터 정해주세요", "처음부터 모든 물건의 처리 여부를 정하실 필요는 없습니다. 우선 남겨두고 싶은 것부터 알려주세요."],
  ["찾아야 할 서류·귀중품을 알려주세요", "사진·편지·서류 등 확인이 필요한 대상이 있다면 특징과 예상 위치를 말씀해 주세요."],
  ["손대지 않을 공간을 지정해 주세요", "당장 정리하지 않을 방이나 수납장이 있다면 미리 알려주세요."],
  ["담당자와 연락 방법을 정해 주세요", "물품 처리를 결정하고 연락받을 담당자를 정해 주세요. 가족 간 결정이 필요한 물품은 미리 알려주세요."],
  ["비대면 진행 여부를 알려주세요", "출입·확인·인계 방법을 협의해 주세요. 집 인도나 퇴실 일정이 있다면 함께 말씀해 주세요."],
];

const faqItems: [string, string][] = [
  ["유품정리 비용은 평당 얼마인가요?", "찐청소는 평수만으로 금액을 정하지 않습니다. 물품의 양과 분류할 내용, 반출 조건, 오염 상태를 확인해 필요한 인원·장비·약품을 기준으로 산정합니다."],
  ["수거와 폐기물 처리도 포함되나요?", "네. 협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다."],
  ["청소도 기본에 포함되나요?", "네. 물품 정리 후 협의한 공간의 청소까지 기본으로 진행합니다."],
  ["소독과 냄새 제거도 기본 작업인가요?", "네. 별도 옵션이 아닌 기본 포함 작업입니다."],
  ["사진으로도 상담할 수 있나요?", "네. 현장 사진을 보내주시면 대략적인 범위와 예상 비용을 먼저 안내해드릴 수 있습니다. 정확한 견적은 현장 확인이나 추가 사진으로 확정합니다."],
  ["유품정리는 집 안 물건을 모두 버리는 작업인가요?", "아닙니다. 보관·전달할 물품을 먼저 정하고 승인된 대상만 처리합니다. 판단이 어려운 물건의 확인 방식과 인계 장소도 사전에 협의합니다."],
  ["사진이나 편지, 중요한 서류를 찾아줄 수 있나요?", "찾아야 할 물품의 특징과 예상 위치를 알려주시면 확인할 작업 범위를 협의합니다. 다만 위치와 상태를 알 수 없는 물품의 발견을 보장하지는 않습니다."],
  ["가족이 멀리 있어도 맡길 수 있나요?", "네. 요청 시 비대면으로 진행할 수 있습니다. 출입 방법과 물품 확인 기준, 연락할 담당자와 유품 인계 방법을 먼저 정합니다."],
  ["현장을 계속 지켜봐야 하나요?", "아닙니다. 비대면으로 맡기신 경우 작업 중 확인이 필요한 사항은 전화나 사진으로 연락드립니다. 작업 후에는 전후 사진으로 결과를 확인하실 수 있습니다."],
  ["가족마다 남겨두고 싶은 물건이 다르면 어떻게 하나요?", "작업 전에 보관할 대상을 취합해 알려주세요. 의견이 정해지지 않은 물품은 처리를 보류하고 확인할 담당자를 정해 협의합니다."],
  ["작업은 얼마나 걸리나요?", "물품의 양뿐 아니라 분류와 가족 확인 과정에 따라 달라집니다. 필요한 완료일과 충분히 살펴봐야 할 부분을 함께 말씀해 주시면 예상 소요 시간을 안내합니다."],
  ["유품정리와 고독사청소는 같은 서비스인가요?", "유품정리는 고인이 남긴 물품을 분류하고 정리하는 작업입니다. 현장에 특별한 오염 처리가 필요한 경우에는 별도 작업 범위를 확인하며, 모든 유품정리가 고독사청소에 해당하는 것은 아닙니다."],
];

const contactChecklist = [
  "현장 주소와 층수",
  "정리할 공간과 대략적인 물품의 양",
  "보관할 유품과 요청 사항",
  "찾아야 할 서류·귀중품 여부",
  "출입·주차·승강기 이용 조건",
  "물품 처리를 확인할 담당자",
  "연락 가능한 시간대",
  "희망 날짜와 완료가 필요한 시점",
  "비대면 진행 희망 여부",
];

const path = "/유품정리/";

export default function LegacyItemsCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "유품정리",
      serviceType: "유품정리·폐기물 처리",
      description: "고인이 생활하시던 집의 옷과 가구, 서류를 어디서부터 정리해야 할지 고민되실 수 있습니다. 찐청소는 권한 있는 의뢰인과 보관·처리 기준을 정하고, 수거·폐기물 처리·청소·소독·냄새 제거를 함께 진행합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
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
    <article className={`${readability.landing} ${readability.enhanced}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[max(650px,50vw)] md:justify-center md:py-20 lg:min-h-[max(620px,50vw)]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/hero-bg/legacy-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:aspect-[3/2] md:w-3/4 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src="/images/hero-bg/legacy-hero.webp" alt="" fill priority className="object-cover" sizes="(min-width: 768px) 75vw, 100vw" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>유품정리</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">유품정리, 남길 물건과 정리할 공간을 차분히 나눕니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>고인이 생활하시던 집의 옷과 가구, 서류를 어디서부터 정리해야 할지 고민되실 수 있습니다. 찐청소는 권한 있는 의뢰인과 보관·처리 기준을 정하고, 수거·폐기물 처리·청소·소독·냄새 제거를 함께 진행합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">유품정리 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="유품정리 비용과 견적 산정 기준" />
            <h3 className="mt-2 text-lg font-bold text-brand-dark">물건의 양뿐 아니라 분류할 내용도 확인합니다</h3>
            <ReadingParagraph className="mt-2" breakAfter={["같은 크기의 집이라도 ","미리 구분된 공간과, "]}>같은 크기의 집이라도 보관할 유품이 미리 구분된 공간과, 서랍·수납장 속 물품을 하나씩 확인해야 하는 공간은 작업량이 다릅니다. 찐청소는 평수만으로 가격을 정하지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["반출 조건과 청소 범위를 확인해 "]}>견적은 물품의 양과 분류에 필요한 시간, 반출 조건과 청소 범위를 확인해 필요한 인원·장비·약품을 기준으로 산정합니다.</ReadingParagraph>
            <h3 className="mt-6 text-lg font-bold text-brand-dark">수거와 폐기물 처리, 청소까지 기본에 포함됩니다</h3>
            <ReadingParagraph className="mt-2">유품정리 비용에는 협의한 물품의 수거·폐기물 처리와 정리 후 청소, 소독·냄새 제거까지 포함됩니다. 이 작업들을 별도 옵션으로 추가 청구하지 않습니다.</ReadingParagraph>
            <h3 className="mt-6 text-lg font-bold text-brand-dark">사진으로도 상담할 수 있나요?</h3>
            <ReadingParagraph className="mt-2">네. 현장 사진을 먼저 보내주시면 대략적인 범위와 예상 비용을 안내해드릴 수 있습니다. 정확한 견적은 현장 확인이나 추가 사진으로 확정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적 상담에서는 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="유품정리 기본 범위와 별도 확인 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">서류·사진·가구마다 보관 기준을 먼저 정합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">유품의 가치는 사용 가능 여부만으로 판단하지 않습니다. 전달할 물품, 확인이 필요한 서류와 정리할 가구를 구분하며 임의로 폐기하지 않습니다. 비대면 진행을 원하시면 연락 방식과 확인 절차를 협의하고 상세한 작업 전후 사진을 전달합니다.</ReadingParagraph>
            <ReadingParagraph>보관할 유품과 처리할 물품을 구분하고, 수거·폐기물 처리 후 공간 청소와 소독·냄새 제거까지 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">바로 결정하기 어려운 물품은 추가 확인 대상으로 구분하도록 작업 전에 협의합니다.</ReadingParagraph>

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

            <ReadingParagraph className="mt-6 font-bold text-brand-dark">별도로 확인해야 하는 요청</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          <BackToContents />
          </section>


          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>협의한 범위를 넘어 물품의 양이나 분류·청소 작업이 늘어나면 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">수거·폐기물 처리·청소·소독·냄새 제거 자체를 추가 옵션으로 청구하는 것은 아닙니다. 작업량이나 조건이 변경되는 경우 해당 내용과 비용을 먼저 협의합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="유품정리 진행 순서와 소요 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>

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
            <ReadingParagraph className="mt-2 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 물품의 양뿐 아니라 분류와 가족 확인 과정에 따라 달라집니다. 필요한 완료일과 충분히 살펴봐야 할 부분을 함께 말씀해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>작업 전후 사진을 자세히 촬영해 고객님께 보내드립니다. 현장에 함께하지 못하셔도 정리한 공간과 청소 결과를 확인하실 수 있도록 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">사진으로 다음 내용을 확인하실 수 있습니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {photoChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">사진을 보신 뒤 궁금한 부분이나 추가로 확인할 위치가 있으면 말씀해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">고객님께 전달하는 작업 기록과 홈페이지·홍보용 사진 사용은 별개입니다. 촬영과 공개에 대한 요청 사항은 상담 시 알려주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 비대면 진행" />
            <ReadingParagraph>현장 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <h3 className="mt-6 text-lg font-bold text-brand-dark">가족이 멀리 있어도 맡길 수 있나요?</h3>
            <ReadingParagraph className="mt-2">네. 요청 시 비대면으로 진행할 수 있습니다. 출입 방법과 물품 확인 기준, 연락할 담당자와 유품 인계 방법을 사전에 협의합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">비대면 상담 전 다음 정보를 알려주시면 도움이 됩니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-lg font-bold text-brand-dark">현장을 계속 지켜봐야 하나요?</h3>
            <ReadingParagraph className="mt-2">아닙니다. 작업 중 확인이 필요한 사항은 전화나 사진으로 연락드립니다. 작업 후에는 상세한 전후 사진으로 결과를 확인하실 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 문의" />
            <ReadingParagraph>작업 후에는 보관하기로 한 유품과 협의한 정리·청소 범위를 기준으로 결과를 확인합니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">작업 후 확인이 필요한 사항은 물품이나 위치, 발견한 상태를 전달해 주시면 작업 내용과 기록을 확인해 안내합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="유품정리 전 준비사항" />
            <div className="mt-4 space-y-5">
              {prepSections.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  <ReadingParagraph className="mt-2">{body}</ReadingParagraph>
                </div>
              ))}
            </div>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">물품 처리를 결정할 수 있는 의뢰인과 작업 범위를 확인한 뒤 진행합니다. 다른 사람의 물건이 섞여 있다면 함께 알려주세요.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">유품정리 상담·견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">정리할 범위를 아직 결정하지 못하셨다면, 현장 상황과 남겨두고 싶은 물건부터 말씀해 주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">찐청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 포함한 견적을 안내합니다. 원하시면 비대면으로 진행하고, 상세한 전후 사진으로 작업 결과를 전달해드립니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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
