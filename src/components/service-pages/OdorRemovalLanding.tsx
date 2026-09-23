import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { EcosorbNotice } from "@/components/service-pages/EcosorbNotice";
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
  ["scope", "냄새 유형별 범위"],
  ["extra", "추가 비용"],
  ["safety", "ECOSORB·냄새 관리"],
  ["process", "진행 순서"],
  ["results", "결과 확인"],
  ["area", "지역·일정 조율"],
  ["checkup", "사후 관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "주택·사무실·상가 등 실내 냄새와 악취"],
  ["주요 확인", "담배, 반려동물, 음식물·쓰레기, 습기·공사 관련 냄새"],
  ["작업 기준", "발생 위치와 오염 상태에 맞춘 청소·탈취 범위 검토"],
  ["견적 기준", "필요한 인원, 장비·약품, 작업량과 방문 횟수"],
  ["범위 구분", "오염물 처리, 전문 세척, 철거·보수는 항목별 확인"],
  ["이용 안내", "작업 방식에 따른 출입·환기·사용 재개 조건 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "공간의 용도와 면적",
  "냄새가 시작된 시점과 발생 이력",
  "냄새가 강하게 느껴지는 위치",
  "확인되는 오염과 자재 상태",
  "가구·생활용품의 유무와 이동 필요성",
  "청소·탈취·오염물 처리의 범위",
  "필요한 인원과 장비·약품",
  "작업 횟수와 접근 조건",
  "건조·환기 등 현장 준비 조건",
];

const scopeItems: { title: string; paragraphs: string[] }[] = [
  {
    title: "담배 냄새",
    paragraphs: [
      "흡연이 있었던 공간과 기간, 벽·바닥·수납장·가구 등의 상태를 확인합니다.",
      "표면 오염을 청소할 범위와 별도 세척 또는 교체 검토가 필요한 물품을 구분합니다.",
      "벽지·침구·소파 등 모든 자재와 물품의 처리가 일반 공간 탈취에 포함되는 것은 아닙니다.",
    ],
  },
  {
    title: "반려동물 관련 냄새",
    paragraphs: [
      "배설물이 닿았던 위치와 반복 여부, 바닥과 틈새, 주변 물품의 상태를 살펴봅니다.",
      "표면만 오염됐는지, 아래쪽이나 인접 자재까지 확인해야 하는지에 따라 작업 범위가 달라집니다.",
      "반려동물의 생활 공간과 작업 중 머물 곳도 함께 정합니다. 반려동물 자체에 제품을 적용하는 서비스는 아닙니다.",
    ],
  },
  {
    title: "음식물·쓰레기에서 시작된 냄새",
    paragraphs: [
      "냄새와 관련된 잔여물이 남아 있는지, 주변 바닥과 수납 공간이 오염됐는지 확인합니다.",
      "잔여물 수거, 오염 구역 청소, 탈취 중 필요한 작업을 나누어 정합니다.",
      "폐기물이 많은 현장은 일반적인 냄새 제거와 별도로 수거·처리 범위를 확인해야 합니다.",
    ],
  },
  {
    title: "습기와 곰팡이가 의심되는 냄새",
    paragraphs: [
      "냄새가 나는 위치와 함께 누수 흔적, 젖은 자재, 반복되는 습기 등을 살펴봅니다.",
      "청소·건조·탈취가 필요한 부분과 누수·방수·자재 보수가 필요한 부분을 구분합니다.",
      "원인이 계속되는 상태에서 탈취만으로 문제가 해결된다고 안내하지 않습니다.",
    ],
  },
  {
    title: "화장실·배수구 주변 냄새",
    paragraphs: [
      "냄새가 느껴지는 시간과 위치, 물 사용 전후의 변화, 배수구 주변 상태 등을 확인합니다.",
      "주변 표면 오염과 배관·설비 문제는 다르게 접근해야 합니다.",
      "배관 내부 세척, 막힘 해결, 부품 교체와 누수 수리는 일반 탈취 작업에 자동으로 포함되지 않습니다.",
    ],
  },
  {
    title: "화재·침수·심한 오염 이후 남은 냄새",
    paragraphs: [
      "화재 잔여물과 그을음, 침수 후 남은 수분이나 오염 자재 등을 함께 확인해야 합니다.",
      "이런 현장은 단독 탈취보다 화재청소·침수청소 등 해당 서비스 범위에서 선행 작업을 검토하는 것이 필요할 수 있습니다.",
      "기존 청소나 복구 작업을 받았다면 어떤 처리가 끝났는지도 알려주세요.",
    ],
  },
  {
    title: "새집·인테리어·새 가구 냄새",
    paragraphs: [
      "최근 공사와 가구 반입, 환기 상태, 냄새가 느껴지는 구역을 확인합니다.",
      "정밀청소와 냄새 제거, 새집증후군 관리를 함께 원하시면 프리미엄청소 구성으로도 상담할 수 있습니다.",
      "일반 악취 제거와 새집증후군 관리는 요청 내용과 적용 범위를 구분합니다.",
    ],
  },
];

const extraCostItems = [
  "다른 방이나 인접 구역의 처리가 추가되는 경우",
  "가구와 물품을 옮겨 확인해야 하는 경우",
  "오염물 수거와 폐기물 처리가 필요한 경우",
  "가전·소파·침구 등 전문 세척이 필요한 경우",
  "자재 안쪽까지 확인하거나 처리해야 하는 경우",
  "추가 건조나 별도 방문이 필요한 경우",
  "기존 견적에 없던 철거·보수 작업이 필요한 경우",
];

const processSteps: [string, string][] = [
  ["발생 상황 상담", "언제부터, 어느 위치에서, 어떤 상황에 냄새가 느껴지는지 확인합니다. 흡연·반려동물·공사·침수 등의 이력과 기존에 사용한 탈취제나 받은 작업도 알려주세요."],
  ["현장과 오염 범위 확인", "접근 가능한 구역에서 냄새와 관련된 오염, 자재와 물품 상태를 살펴봅니다. 확인된 부분과 추가 점검이 필요한 부분을 구분합니다. 한 번의 방문으로 모든 원인을 반드시 찾아낸다고 약속하지는 않습니다."],
  ["작업 범위와 견적 안내", "청소와 탈취, 오염물 처리, 별도 세척 중 필요한 내용을 정합니다. 사용할 제품·장비의 적용 조건과 작업 중 출입, 작업 후 이용 조건도 함께 확인합니다."],
  ["합의한 청소·탈취 작업", "현장과 제품·장비의 사용 조건에 맞춰 진행합니다. 처리 중 예상하지 못한 오염이나 자재 손상이 발견되면 해당 부분의 작업 범위를 다시 확인합니다."],
  ["마무리와 후속 확인 안내", "진행한 작업과 남아 있는 확인사항을 정리합니다. 필요한 환기·건조·사용 재개 조건, 이후 냄새 변화를 확인할 방법을 안내합니다."],
];

const comparisonChecklist = [
  "냄새가 느껴진 방과 위치",
  "발생 시간과 반복 여부",
  "창문과 환기설비 사용 상태",
  "물 사용이나 냉난방 등 당시 상황",
  "작업 후 새로 반입한 물품이나 추가 공사",
];

const reservationChecklist = [
  "거주자의 생활·외출 일정",
  "영업 종료와 재개 시간",
  "아이와 반려동물이 머물 공간",
  "식품·식기·생활용품의 보호 조건",
  "공사와 가구 반입 일정",
  "환기와 건조 조건",
  "실제 입주 또는 공간 사용 예정일",
];

const prepItems = [
  "냄새가 시작된 시점과 위치를 알려주세요.",
  "눈에 보이는 오염과 공간 사진을 준비해 주세요.",
  "흡연·반려동물·공사·누수 등의 이력을 전달해 주세요.",
  "기존에 사용한 제품과 받은 청소·탈취 작업을 알려주세요.",
  "남길 물건과 처리할 물건을 구분해 주세요.",
  "식품·식기·침구 등 보호가 필요한 물품을 알려주세요.",
  "민감한 재질과 관리 지침을 전달해 주세요.",
  "아이·반려동물·어항 등 보호 대상을 알려주세요.",
  "환기·전기·수도·출입 조건을 확인해 주세요.",
  "작업 후 공간을 사용할 시간을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["냄새악취제거 비용은 평당으로 정하나요?", "평수만으로 정하지 않습니다. 발생 상태와 오염 범위, 필요한 인원과 장비·약품, 선행 청소와 방문 횟수를 확인해 안내합니다."],
  ["냄새가 어디서 나는지 몰라도 상담할 수 있나요?", "가능합니다. 발생 시점과 위치, 강해지는 상황, 공사나 생활 이력 등을 알려주세요. 현장 확인이 필요할 수 있으며 모든 원인을 즉시 확정한다고 보장하지는 않습니다."],
  ["담배 냄새도 상담할 수 있나요?", "흡연 이력과 공간·자재·물품 상태를 확인해 상담합니다. 표면 청소와 탈취, 별도 세척이나 교체가 필요한 범위를 구분합니다."],
  ["반려동물 소변 냄새는 한 번에 없어지나요?", "오염 위치와 반복 여부, 자재 상태에 따라 달라집니다. 표면만 처리할 수 있는지, 인접 부위나 자재 안쪽 확인이 필요한지 살펴야 합니다."],
  ["하수구 냄새 제거를 요청하면 배관도 수리하나요?", "청소로 다룰 수 있는 오염과 배관·트랩 등 설비 문제는 구분합니다. 수리가 필요한 원인은 별도 점검 대상이며, 배관 보수가 악취 제거 기본 작업에 포함되는 것은 아닙니다."],
  ["방향제나 탈취제를 뿌리는 것과 어떻게 다른가요?", "찐청소는 냄새 발생 상황과 오염 범위를 확인하고 필요한 청소·탈취 작업을 정합니다. 향이 바뀌었다는 사실만으로 원인이 해결됐다고 판단하지 않습니다."],
  ["어떤 약품과 장비를 사용하나요?", "냄새와 오염의 종류, 재질과 공간 조건에 맞춰 검토합니다. 특정 장비 하나로 모든 냄새를 해결한다고 안내하지 않으며, 적용 방법과 이용 주의사항을 함께 설명합니다."],
  ["아이와 반려동물이 있어도 가능한가요?", "작업 구역과 제품·장비의 사용 조건을 먼저 확인해야 합니다. 출입 제한과 물품 보호, 사용 재개 조건을 따르도록 일정을 정하며 무조건 무해하다고 안내하지 않습니다."],
  ["작업 후 바로 입주할 수 있나요?", "처리 방법과 건조·환기 등 조건에 따라 다릅니다. 작업 종료와 사용 가능 시점을 구분해 안내받고 일정을 정해 주세요."],
  ["냄새가 없어지면 건강에 해로운 물질도 모두 없어진 건가요?", "아니요. 냄새만으로 실내공기 상태를 판단할 수 없습니다. 특정 물질의 확인이 필요하면 별도 측정과 적절한 전문 평가를 검토해야 합니다."],
  ["새집증후군 관리도 함께 받을 수 있나요?", "정밀청소·냄새 제거·새집증후군 관리를 함께 원하시면 프리미엄청소 구성으로 상담할 수 있습니다. 일반 악취 제거와 적용 범위를 구분해 안내합니다."],
  ["작업 후 냄새가 다시 나면 어떻게 하나요?", "발생 위치와 시간, 당시 상황을 알려주세요. 합의한 작업 범위와 현장 변화를 확인해 후속 처리 방법을 안내합니다. 재방문 포함 여부와 비용 조건은 계약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "면적과 구조",
  "냄새가 시작된 시점과 강하게 느껴지는 위치",
  "반복되는 시간과 상황",
  "눈에 보이는 오염 사진",
  "흡연·반려동물·공사·누수 등의 이력",
  "이전 청소·탈취 작업과 사용 제품",
  "남아 있는 가구와 물품",
  "희망 작업일과 공간 사용 예정일",
  "출입·환기·보호 대상 관련 조건",
];

const path = "/냄새-악취-제거/";

export default function OdorRemovalLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "냄새악취제거",
      serviceType: "냄새악취제거",
      description: "집에 밴 담배 냄새, 강아지·고양이 소변 냄새, 반복되는 실내 악취가 고민이신가요? 찐청소는 냄새가 느껴지는 위치와 오염된 소재, 발생 이력을 확인해 청소와 탈취 범위를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "냄새악취제거", item: absoluteUrl(path) },
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
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/service-scenes/odor-wall-residue.webp" alt="" fill preload className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/75" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>냄새악취제거</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">위생·방역케어</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">담배·반려동물 냄새, 향으로 덮기 전에 발생 위치부터 살펴봅니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>집에 밴 담배 냄새, 강아지·고양이 소변 냄새, 반복되는 실내 악취가 고민이신가요? 찐청소는 냄새가 느껴지는 위치와 오염된 소재, 발생 이력을 확인해 청소와 탈취 범위를 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">냄새·악취 제거 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="냄새악취제거 비용과 견적 산정 기준" />
            <ReadingParagraph>냄새 제거 비용은 면적이나 냄새의 강도만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["한쪽 바닥에 오염이 남은 경우와 "]}>한쪽 바닥에 오염이 남은 경우와 여러 공간의 자재·물품을 확인해야 하는 경우는 작업량이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 관리할 구역과 작업 내용을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">좁은 공간도 원인에 따라 작업이 달라집니다</h3>
            <ReadingParagraph className="mt-2">냄새가 나는 방이 작더라도 오염이 가구 뒤나 자재 안쪽에 있다면 접근과 처리가 어려울 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">반대로 발생 위치가 분명하고 제한된 구역에 오염이 있다면 해당 부분을 중심으로 작업을 검토할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">몇 평인지와 함께 어디서 언제 냄새가 나는지 알려주세요.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진은 오염과 구조를 확인하는 데 도움이 되지만, 냄새 자체를 사진만으로 판단할 수는 없습니다. 원인이나 범위가 불분명하면 현장 확인이 필요할 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 냄새 유형별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="냄새 유형별 확인 사항과 작업 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">바닥·벽면에 남은 냄새와 배수구 냄새는 구분합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">냄새가 느껴지는 위치가 곧 원인이라고 단정하지 않습니다. 바닥·벽면·가구에 남은 오염과 배수·누수 관련 문제를 나눠 살펴봅니다. 소재 내부에 스며든 오염, 전문 세척이나 교체가 필요한 부분도 별도로 안내합니다.</ReadingParagraph>
            <ReadingParagraph>냄새가 비슷하게 느껴져도 원인과 필요한 작업은 다를 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목은 상담 시 살펴보는 대표적인 상황입니다. 모든 냄새에 같은 약품·장비를 적용하거나 같은 결과를 약속하지 않습니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  {item.paragraphs.map((p, i) => (
                    <ReadingParagraph key={p} className={i === item.paragraphs.length - 1 ? "mt-2 text-[15px] text-gray-500" : "mt-2"}>{p}</ReadingParagraph>
                  ))}
                </div>
              ))}
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 별도 보수가 필요한 경우" />
            <ReadingParagraph>처음 정한 범위보다 오염 구역이 넓거나 별도 작업이 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">탈취와 철거·보수는 구분합니다</h3>
            <ReadingParagraph className="mt-2">오염된 자재의 교체, 누수 수리, 배관 보수 등은 일반적인 냄새 제거와 다른 작업입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">필요한 경우 작업 가능 여부와 담당 범위, 비용을 먼저 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">냄새가 난다는 이유만으로 모든 자재를 철거하거나 교체하는 방향으로 정하지 않습니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">먼저 해야 할 작업이 있다면 안내합니다</h3>
            <ReadingParagraph className="mt-2">원인 물질이 남아 있거나 물이 계속 유입되는 등 선행 조치가 필요한 상황이 있을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소·탈취만으로 다룰 수 있는 부분과 먼저 해결해야 할 문제를 구분해 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="냄새 제거 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">오염의 종류와 범위, 처리 방법과 방문 횟수에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 시간 외에도 건조·환기와 후속 확인이 필요할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소팀이 철수하는 시간과 사람이 다시 생활할 수 있는 시간을 같다고 단정하지 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 결과 확인 */}
          <section id="results" className="scroll-mt-36">
            <SectionTitle id="results-title" kicker="05" title="작업 결과와 냄새 변화 확인" />
            <ReadingParagraph>냄새 제거 결과는 전후 사진만으로 확인하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">사진은 오염물 제거와 표면 청소, 작업 구역을 보여주는 자료입니다. 냄새 변화는 별도로 살펴야 합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">비교할 조건을 함께 기록합니다</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {comparisonChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">평소 생활 중 관찰한 내용을 알려주세요. 결과를 시험하려고 안내와 다르게 환기를 중단하거나 출입 제한을 어길 필요는 없습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">냄새 감소와 공기질은 다릅니다</h3>
            <ReadingParagraph className="mt-2">냄새가 줄었다는 것만으로 모든 오염물질이 제거됐거나 실내가 무조건 안전하다고 판단할 수는 없습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">특정 물질의 측정이 필요하면 제공 가능 여부와 측정 항목·조건·비용을 별도로 확인해야 합니다. 측정이나 수치 보고서가 기본 포함된 것으로 안내하지 않습니다.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">작업 일정은 냄새 상태뿐 아니라 공간을 비울 수 있는 시간과 이후 사용 계획을 고려합니다.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">야간이나 휴무일 작업은 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 사후관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 후 관리와 재방문 기준" />
            <h3 className="text-lg font-bold text-brand-dark">적용한 작업에 맞는 안내를 따라주세요</h3>
            <ReadingParagraph className="mt-2">환기, 출입 제한, 표면 사용과 물품 복귀 시점은 제품과 작업 방식에 따라 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">안내받은 조건을 확인한 뒤 공간을 사용해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">냄새가 남는다고 여러 탈취제나 세정제를 임의로 섞어 사용하지 마세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">다시 느껴지면 위치와 상황을 알려주세요</h3>
            <ReadingParagraph className="mt-2">냄새가 반복된다면 남아 있는 오염, 다른 발생원, 외부 유입, 새 물품이나 추가 공사 등 확인할 사항을 검토합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">다시 난다는 이유만으로 곧바로 같은 작업을 반복하기보다 발생 상황을 함께 살펴봅니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">재방문 조건은 계약 전에 정합니다</h3>
            <ReadingParagraph className="mt-2">처음 견적에 포함된 방문 횟수와 후속 확인, 추가 작업의 비용을 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">한 번에 완전 제거, 영구적인 효과, 기간 제한 없는 무상 재방문을 일괄 약속하지 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="냄새 제거 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">원인을 확인하려고 벽이나 바닥을 직접 뜯거나 설비를 분해할 필요는 없습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가스 누출이나 전기 과열이 의심되는 냄새는 일반 탈취 상담보다 긴급 안전 확인이 먼저입니다. 위험이 의심되는 공간에서 원인을 찾으려 머무르지 말고 안전한 곳에서 119 또는 해당 설비 긴급기관에 연락해 주세요.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">냄새·악취 제거 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 언제부터 어디에서 냄새가 나는지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">담배 냄새가 남은 집인지, 반려동물 오염이 반복된 구역인지, 공사나 침수 이후 달라진 상태인지에 따라 확인할 내용이 다릅니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>냄새·악취 제거 견적 문의하기 →</CtaButton>
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
