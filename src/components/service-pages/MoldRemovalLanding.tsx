import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { ServiceScenePhotos } from "@/components/service-pages/ServiceScenePhotos";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "부위별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·재발 안내"],
  ["prep", "준비사항·이후 관리"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "주택, 아파트, 원룸, 사무실, 상가 등 실내 곰팡이 발생 공간"],
  ["상담 부위", "벽지·벽면·천장·베란다·창 주변·욕실·수납공간 등"],
  ["작업 범위", "자재와 오염 상태를 확인한 뒤 제거 가능한 부위와 마무리 범위 협의"],
  ["견적 기준", "필요 인원 + 장비·약품 비용을 중심으로 작업 난이도와 범위 반영"],
  ["별도 확인", "벽지·실리콘·마감재 철거 및 교체, 도배, 방수·단열·누수 보수"],
  ["소요 시간", "오염 범위, 접근 조건, 건조 및 후속 공정에 따라 안내"],
  ["서비스 지역·예약", "현장 주소와 희망 일정으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "곰팡이가 발생한 부위와 실제 작업 면적",
  "표면 재질과 오염·손상 정도",
  "가구 뒤, 높은 천장 등 작업 접근 난이도",
  "주변 가구와 생활용품의 보호 필요 범위",
  "반복 발생 여부와 현재 젖어 있는 부분",
  "철거·교체 등 별도 공정의 필요 여부",
];

const scopeItems: { title: string; included: string[]; excluded: string[]; note: string }[] = [
  {
    title: "벽지와 벽면",
    included: ["눈에 보이는 곰팡이와 주변 표면 상태 확인", "자재 손상을 고려한 제거 가능 여부 판단", "협의된 부위의 제거 작업과 주변 정리"],
    excluded: ["벽지 제거와 재도배", "손상된 석고보드·마감재 철거 및 교체", "벽체 내부 확인이 필요한 작업"],
    note: "벽지가 들뜨거나 손상되고 안쪽까지 오염된 경우에는 표면 청소만으로 해결하기 어려울 수 있습니다. 벽지를 유지할 수 있는지와 교체가 필요한지는 상태를 보고 구분합니다.",
  },
  {
    title: "베란다와 창 주변",
    included: ["벽면, 모서리, 창 주변의 곰팡이 발생 부위", "표면 재질에 맞는 제거 작업", "협의한 작업 부위의 마무리 정리"],
    excluded: ["도장과 마감 복구", "창호 실리콘 교체", "단열·방수·창호 보수"],
    note: "겨울마다 같은 곳에 반복된다면 결로 등 수분이 생기는 조건을 함께 살펴야 합니다. 곰팡이제거가 단열이나 창호 보수까지 대신하는 것은 아닙니다.",
  },
  {
    title: "천장과 모서리",
    included: ["천장과 벽이 만나는 부분의 오염", "접근 가능한 표면의 제거 작업", "물 얼룩, 들뜸 등 눈에 보이는 손상 상태 확인"],
    excluded: ["높은 천장 작업을 위한 추가 장비", "천장재 철거·교체", "누수 점검과 배관·방수 보수"],
    note: "천장에서 물이 새거나 계속 젖는 상태라면 누수 점검과 보수 일정부터 조율해야 합니다.",
  },
  {
    title: "욕실과 실리콘 주변",
    included: ["타일과 줄눈 등 표면의 곰팡이 오염", "실리콘 주변의 제거 가능 범위", "작업 부위의 마무리 세척"],
    excluded: ["실리콘 제거 및 재시공", "줄눈 보수", "욕실 전체 물때·석회·배수구 청소"],
    note: "실리콘 내부까지 변색이나 오염이 진행된 경우에는 세척만으로 원래 상태를 되찾기 어려울 수 있습니다. 교체 작업은 표면 청소와 구분해 안내합니다.",
  },
  {
    title: "가구 뒤와 수납공간",
    included: ["접근 가능한 벽면과 수납공간의 오염", "재질에 따른 제거 가능 여부", "협의한 부위의 작업과 정리"],
    excluded: ["대형 가구 이동과 붙박이장 분해", "가구 자체의 복원·교체", "의류, 침구, 매트리스 등 물품별 세척 또는 폐기"],
    note: "가구 뒤 벽면 청소와 가구 자체의 곰팡이 처리는 다른 작업입니다. 어느 쪽에 오염이 있는지 함께 알려주시면 상담이 더 정확해집니다.",
  },
];

const extraCostItems = [
  "가구 뒤나 벽지 안쪽에서 추가 오염이 확인된 경우",
  "대형 가구 이동이나 분해가 필요한 경우",
  "높은 천장 등 별도 접근 장비가 필요한 경우",
  "벽지, 실리콘, 천장재 등의 철거·교체가 필요한 경우",
  "폐기물 반출이나 별도 공간 청소가 추가되는 경우",
  "냄새 제거, 건조 등 추가 공정이 필요한 경우",
];

const processSteps: [string, string][] = [
  ["사진 및 현장 정보 상담", "발생 위치, 대략적인 범위, 처음 발견한 시기, 반복 여부를 확인합니다. 누수 이력이나 이전에 사용한 제거제가 있다면 함께 알려주세요."],
  ["자재 상태와 작업 범위 확인", "청소 가능한 표면과 교체 검토가 필요한 부분을 구분합니다. 수분 문제가 계속되고 있다면 필요한 점검과 작업 순서를 안내합니다."],
  ["견적과 일정 협의", "인원, 장비·약품, 주변 보호 범위와 별도 항목을 정리합니다. 거주 중인 공간은 작업 구역과 생활 동선도 함께 조율합니다."],
  ["주변 보호 및 제거 작업", "주변 물품을 보호하고 자재에 맞는 방식으로 협의된 부위를 작업합니다. 현장에서 추가 손상이 발견되면 먼저 상황을 설명합니다."],
  ["마무리 및 상태 확인", "작업 부위와 주변을 정리하고, 남은 변색이나 자재 손상, 후속 조치가 필요한 부분을 구분해 안내합니다."],
  ["이용 및 관리 안내", "사용한 제품과 작업 조건에 맞춰 환기, 건조, 공간 이용 시점을 안내합니다. 재발 여부를 살펴볼 위치도 함께 짚어드립니다."],
];

const caseChecklist = [
  "작업하기로 한 부위가 빠짐없이 처리되었는지",
  "모서리나 가구 뒤처럼 놓치기 쉬운 부분은 어떤지",
  "표면에 남은 흔적이 오염인지 자재 변색인지",
  "들뜸이나 손상으로 교체가 필요한 부분이 있는지",
  "누수·결로와 관련해 추가 점검할 부분은 어디인지",
];

const reservationChecklist = [
  "입주 또는 이사 예정일",
  "도배와 인테리어 공사 일정",
  "누수 보수 예정일",
  "가구 반입 일정",
  "매장 휴무일 또는 사무실 비운영 시간",
];

const checkupChecklist = [
  "작업 대상 부위의 처리 상태",
  "남은 변색과 자재 손상",
  "추가 건조나 교체가 필요한 부분",
  "누수·결로 관련 후속 점검 사항",
  "환기와 공간 이용 안내",
];

const prepItems = [
  "발생 부위 전체 사진과 가까이 찍은 사진을 준비해주세요.",
  "언제부터 생겼는지, 어느 계절에 반복되는지 알려주세요.",
  "누수 이력과 현재 젖어 있는 곳이 있다면 말씀해주세요.",
  "이전에 사용한 제거제나 도장·도배 이력을 알려주세요.",
  "귀중품, 식품, 생활용품은 작업 구역에서 분리해주세요.",
  "큰 가구는 무리하게 옮기지 말고 이동 필요 여부부터 상담해주세요.",
  "어린이와 반려동물의 작업 구역 출입을 제한할 수 있도록 준비해주세요.",
];

const afterCareItems = [
  "안내받은 환기와 건조 조건을 지켜주세요.",
  "누수나 반복되는 결로는 별도로 점검해주세요.",
  "창 주변과 가구 뒤 등 기존 발생 위치를 주기적으로 살펴주세요.",
  "이상이 다시 보이면 발생 날짜와 사진을 남겨주세요.",
];

const faqItems: [string, string][] = [
  ["곰팡이제거 비용은 평당으로 계산하나요?", "집 전체 평수만으로 정하지 않습니다. 발생 범위, 자재 상태, 접근 난이도에 따라 필요한 인원과 장비·약품 비용을 중심으로 산정합니다."],
  ["벽지 곰팡이는 벽지를 뜯지 않고 제거할 수 있나요?", "표면 상태에 따라 다릅니다. 벽지가 손상되었거나 안쪽까지 오염된 경우에는 표면 청소만으로 해결하기 어려워 제거와 교체를 검토해야 합니다."],
  ["곰팡이를 제거하면 다시 생기지 않나요?", "누수나 결로 등 수분 문제가 남아 있으면 재발할 수 있습니다. 제거 작업과 함께 발생 조건을 줄이는 조치가 필요합니다."],
  ["겨울마다 베란다 곰팡이가 생기면 제거만 해도 되나요?", "제거 후에도 수분 문제가 남으면 다시 발생할 수 있습니다. 결로와 누수 등 점검이 필요한 조건을 구분해야 하며, 곰팡이제거가 단열·창호 보수나 영구 재발 방지를 뜻하지는 않습니다."],
  ["천장에 물 얼룩과 곰팡이가 함께 있는데 청소부터 하면 되나요?", "현재 누수가 있는지 먼저 확인해야 합니다. 물이 계속 유입되는 상태라면 보수와 건조, 제거 작업의 순서를 조율해야 합니다."],
  ["실리콘의 검은 흔적도 모두 지워지나요?", "실리콘 내부까지 진행된 오염이나 변색은 세척만으로 복구하기 어려울 수 있습니다. 제거 가능한 범위와 교체 필요 여부를 구분합니다."],
  ["살고 있는 집에서도 작업할 수 있나요?", "작업 범위와 공간 분리, 환기 조건을 확인한 뒤 일정을 협의합니다. 작업 중 머물 수 있는 공간과 재출입 시점은 현장 조건에 맞춰 안내합니다."],
  ["곰팡이 냄새도 함께 없어지나요?", "오염 제거 후 냄새가 줄어들 수 있지만, 숨은 오염이나 다른 원인이 남아 있을 수 있습니다. 냄새 제거가 필요한 경우 포함 범위와 별도 작업 여부를 상담 때 확인합니다."],
  ["도배나 페인트로 덮으면 해결되지 않나요?", "곰팡이가 남아 있거나 젖은 표면을 바로 덮는 것은 적절한 해결 방법이 아닙니다. 오염 처리와 건조, 필요한 수분 문제 조치 후 마감을 검토해야 합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진으로 우선 상담할 수 있습니다. 다만 벽지 안쪽, 가구 뒤, 자재 손상 정도는 사진만으로 확인하기 어려워 현장 확인 후 최종 범위가 달라질 수 있습니다."],
  ["소독이나 곰팡이 방지 코팅도 기본으로 포함되나요?", "곰팡이제거라는 이름만으로 공간 전체 소독이나 방지 코팅까지 포함되는 것은 아닙니다. 필요한 공정과 실제 포함 항목을 견적에서 확인해주세요."],
  ["작업 후 바로 가구를 제자리에 놓아도 되나요?", "표면 상태와 건조 여부를 확인한 뒤 안내에 따라 배치해주세요. 작업이 끝났다고 곧바로 벽면을 가리는 것은 피하고, 해당 공간의 습기 관리 조건도 함께 확인하는 것이 좋습니다."],
];

const contactChecklist = [
  "현장 지역과 공간 종류",
  "곰팡이가 발생한 위치",
  "발생 부위 전체 사진과 근접 사진",
  "대략적인 가로·세로 크기",
  "처음 발견한 시점과 반복 여부",
  "누수·결로 이력",
  "이전에 진행한 제거·도배·보수 작업",
  "거주 여부와 가구 배치 상태",
  "희망 작업일과 이후 공사·입주 일정",
];

const path = "/곰팡이제거/";

export default function MoldRemovalLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "곰팡이제거",
      serviceType: "곰팡이제거",
      description: "벽지 모서리, 베란다 창 주변이나 천장에 곰팡이가 다시 생기나요? 찐청소는 오염 범위와 마감재 상태, 누수·결로 이력을 확인해 제거 가능한 부분과 교체·보수가 필요한 부분을 나눠 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "곰팡이제거", item: absoluteUrl(path) },
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

      {/* 히어로 */}
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[max(650px,50vw)] md:justify-center md:py-20 lg:min-h-[max(620px,50vw)]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/service-scenes/mold-under-window.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:aspect-[3/2] md:w-3/4 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src="/images/service-scenes/mold-under-window.webp" alt="" fill preload className="object-cover" sizes="(min-width: 768px) 75vw, 100vw" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>곰팡이제거</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">위생·방역케어</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">벽지·베란다 곰팡이제거, 얼룩과 반복되는 습기 문제를 구분합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>벽지 모서리, 베란다 창 주변이나 천장에 곰팡이가 다시 생기나요? 찐청소는 오염 범위와 마감재 상태, 누수·결로 이력을 확인해 제거 가능한 부분과 교체·보수가 필요한 부분을 나눠 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">곰팡이제거 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="곰팡이제거 비용과 견적 산정 기준" />
            <ReadingParagraph>곰팡이제거 비용은 집 전체 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 크기의 방이라도 ","가구 뒤 벽면 전체로 번진 경우는 "]}>같은 크기의 방이라도 창 주변에 일부 발생한 경우와 가구 뒤 벽면 전체로 번진 경우는 작업량이 다릅니다. 표면 오염을 제거하는 작업과 손상된 자재를 걷어내야 하는 작업도 구분해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["비용을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품 비용을 중심으로 실제 작업 조건을 반영해 견적을 안내합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 견적 기준</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 보내주시면 우선 상담에 도움이 됩니다. 다만 벽지 안쪽이나 가구 뒤처럼 사진에 보이지 않는 부분은 현장 확인 후 범위가 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">집이 몇 평인지도 참고하지만, 실제로 어디를 얼마나 작업해야 하는지를 먼저 봅니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 부위별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="부위별 곰팡이제거 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">벽지 뒤·창 주변·천장, 발생 위치를 알려주세요</h3>
            <ReadingParagraph className="mt-2 mb-6">벽지 들뜸과 손상, 창 주변에 반복되는 결로, 천장의 물 얼룩처럼 관찰되는 상태를 함께 알려주세요. 표면 제거와 벽지·실리콘 교체를 구분하며, 누수·단열 보수는 청소와 별도입니다. 발생 위치만으로 원인을 확정하지 않습니다.</ReadingParagraph>
            <ReadingParagraph>곰팡이가 보인다고 모든 자재에 같은 방법을 적용하지는 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래는 부위별 상담 기준이며, 최종 포함 범위는 견적 단계에서 정합니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">작업 검토 범위</ReadingParagraph>
                  <ul className="mt-2 space-y-1.5">
                    {item.included.map(li => (
                      <li key={li} className="flex items-start gap-2 text-[15.5px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">별도 확인 항목</ReadingParagraph>
                  <ul className="mt-2 space-y-1.5">
                    {item.excluded.map(li => (
                      <li key={li} className="flex items-start gap-2 text-[15.5px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                  <ReadingParagraph className="mt-3 text-[15px] text-gray-500">{item.note}</ReadingParagraph>
                </div>
              ))}
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>다음과 같은 조건에서는 작업 범위나 비용이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">누수 보수, 단열, 방수, 도배 같은 공사는 곰팡이제거와 구분해 확인합니다. 진행 가능 여부와 비용도 별도 협의 대상입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업이 필요한 상황에서는 해당 부위와 이유, 비용을 설명한 뒤 진행 여부를 협의합니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="곰팡이제거 진행 순서와 소요 시간" />
            <ServiceScenePhotos path={path} section="process" />
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
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 오염 범위와 자재 상태에 따라 달라집니다. 제거 작업이 끝나는 시간과 공간을 다시 사용할 수 있는 시점이 같지 않을 수 있어 각각 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진에서 확인할 부분" />
            <ReadingParagraph>곰팡이제거 전후 사진은 같은 위치와 비슷한 조명에서 비교하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">주요 확인 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">사진에서 얼룩이 옅어졌다는 사실만으로 벽체 내부 상태나 이후 재발 여부까지 판단할 수는 없습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">전후 비교와 함께 작업 범위, 남은 문제, 이후 필요한 조치를 확인하는 것이 중요합니다.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 방문 가능 여부를 확인해드립니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">다음 일정이 있다면 상담 때 함께 말씀해주세요.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">도배나 가구 배치를 앞두고 있다면 곰팡이 작업과 건조, 필요한 보수의 순서를 먼저 맞추는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">곰팡이가 생긴 상태에서 급하게 마감부터 진행하지 않도록 일정을 함께 조율하겠습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/재발안내 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 재발 관련 안내" />
            <ReadingParagraph>작업 후에는 협의한 범위를 기준으로 제거 상태와 주변 정리 상태를 확인합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {checkupChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-5">곰팡이 재발에는 누수, 결로, 실내 습기 등 여러 조건이 영향을 줍니다. 제거 작업을 했더라도 수분 문제가 남아 있으면 다시 발생할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">찐청소는 무조건 다시 생기지 않는다고 약속하기보다, 이번에 처리한 부분과 이후 관리가 필요한 부분을 구분해 설명합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 누락이 의심되거나 같은 위치에 이상이 보이면 사진과 발생 시점을 알려주세요. 작업 내용과 현장 상태를 확인해 후속 대응을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">재방문이나 추가 작업의 적용 조건과 비용은 계약 시 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항/이후관리 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항과 이후 관리" />
            <ReadingParagraph className="font-bold text-brand-dark">작업 전 준비사항</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">직접 벽지를 뜯거나 마른 솔로 넓게 문지르기보다는 현재 상태를 먼저 촬영해 상담해주세요. 여러 세정제나 제거제를 섞어 사용하지 마세요.</ReadingParagraph>

            <ReadingParagraph className="mt-8 font-bold text-brand-dark">작업 이후 관리</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {afterCareItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">관리를 잘못해서 생겼다고 단정하지 않습니다. 생활 습관뿐 아니라 건물과 설비 상태도 함께 살펴야 합니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">곰팡이제거 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">&ldquo;벽지를 바꿔야 할까요?&rdquo; &ldquo;닦았는데 같은 자리에 또 생겼어요.&rdquo; &ldquo;이사 전에 어느 정도까지 처리해야 할까요?&rdquo;</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">어떤 작업이 필요한지 아직 모르셔도 괜찮습니다. 현재 상태부터 보여주세요.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>곰팡이제거 견적 문의하기 →</CtaButton>
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
