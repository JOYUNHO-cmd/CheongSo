import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { EcosorbNotice } from "@/components/service-pages/EcosorbNotice";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·별도 작업"],
  ["extra", "추가 비용"],
  ["safety", "ECOSORB·냄새 관리"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "침수 피해를 입은 주택, 반지하, 상가, 사무실 등"],
  ["기본 포함", "침수 오염 청소, 건조, 소독, 냄새 제거"],
  ["별도 비용", "필요한 철거와 복원 공사"],
  ["사전 확인", "고인 물의 양, 배수 상태, 폐기물량, 물 유입 지속 여부"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염 범위와 현장 조건"],
  ["작업 일정", "청소와 건조, 추가 공사에 필요한 시간을 구분해 안내"],
  ["서비스 지역·예약", "현장 위치와 피해 상황을 기준으로 가능 여부 확인"],
];

const estimateChecklist = [
  "침수된 구역과 대략적인 면적",
  "물이 들어온 경로와 현재 유입 여부",
  "침수 후 경과 시간",
  "고인 물과 토사·오염물의 양",
  "젖은 가구·집기와 폐기할 물품",
  "벽면·바닥재 등 자재의 상태",
  "환기와 건조 작업 여건",
  "층수, 엘리베이터, 주차와 반출 동선",
  "철거·복원 필요 여부",
];

const costSplit: [string, string][] = [
  ["기본 작업", "침수 오염 청소, 건조, 소독, 냄새 제거"],
  ["별도 견적", "손상 부분 철거, 자재 교체, 복원 인테리어"],
  ["현장별 확인", "배수 작업, 폐기물 수거·처리, 특수 장비 필요 여부"],
];

const scopeItems: { title: string; body: string; note?: string; photos?: string[] }[] = [
  {
    title: "바닥과 침수된 생활 공간",
    body: "합의한 작업 구역에 남은 흙탕물 자국, 토사, 오염 등을 정리하고 세척합니다. 가구나 집기에 가려진 부분은 이동·반출 범위를 확인한 뒤 작업합니다.",
    note: "바닥의 오염과 바닥재 자체의 들뜸·변형은 구분해야 합니다. 청소로 자재 손상까지 원래대로 되돌릴 수 있는 것은 아닙니다.",
    photos: ["flood-work-01.webp", "flood-work-02.webp", "flood-work-03.webp"],
  },
  {
    title: "벽면과 바닥재 주변",
    body: "물이 닿은 벽면과 걸레받이 주변 등 피해 구역을 확인합니다. 겉으로 보이는 얼룩뿐 아니라 자재 손상이나 안쪽 상태의 추가 확인이 필요한지도 살펴봅니다.",
    note: "벽지·바닥재를 뜯어내는 작업은 기본 청소와 구분하며, 필요한 경우 별도로 범위를 협의합니다.",
  },
  {
    title: "건조",
    body: "건조는 기본 작업에 포함됩니다. 젖은 구역과 자재 상태, 환기 여건 등을 확인해 진행합니다.",
    note: "바닥 표면이 말라 보이는 것과 자재 안쪽까지 건조된 것은 다를 수 있습니다. 복원이 필요한 경우에는 청소가 끝났다는 이유만으로 바로 마감하기보다, 다음 공정에 앞서 건조 상태를 확인해야 합니다.",
  },
  {
    title: "소독",
    body: "소독은 기본 작업에 포함됩니다. 오염 상태와 작업 대상에 맞춰 청소와 함께 진행합니다.",
    note: "소독만으로 남아 있는 오염이나 습기, 손상된 자재 문제가 모두 해결되는 것은 아닙니다. 오염 제거와 건조, 필요한 자재 처리를 함께 고려해야 합니다.",
  },
  {
    title: "냄새 제거",
    body: "침수 후 남은 냄새의 발생 위치와 오염 상태를 확인하며 냄새 제거 작업을 진행합니다. 냄새 제거도 기본 포함 항목입니다.",
    note: "다만 젖은 자재 내부나 해결되지 않은 누수·역류 등이 원인이라면 추가 조치가 필요할 수 있습니다. 현장을 확인하지 않고 냄새가 무조건 완전히 사라진다고 약속드리지는 않습니다.",
  },
];

const restorationNote = {
  title: "철거와 복원 — 별도 견적",
  body: "침수로 손상된 부분의 철거와 복원 인테리어도 진행할 수 있습니다. 복원 후 준공청소까지 연결해 상담하실 수 있습니다.",
  note: "철거와 복원은 기본 청소비에 포함되지 않으며, 범위와 자재를 정해 별도로 견적을 안내합니다.",
};

const separateScopeItems = [
  "누수 탐지와 배관 수리",
  "배수관 막힘이나 역류 원인의 해결",
  "방수 공사와 재침수 방지 공사",
  "전기·가스 설비의 안전 점검",
  "침수된 가전·기계의 점검과 수리",
  "대량 배수와 폐기물 수거·처리 범위",
];

const extraCostItems = [
  "상담에서 확인한 것보다 오염 구역이나 물량이 많은 경우",
  "집기 반출 후 가려진 손상이 확인되는 경우",
  "추가 폐기물 수거·처리를 요청하는 경우",
  "기본 청소 외에 철거·복원이 필요한 경우",
  "복원 자재나 시공 범위를 변경하는 경우",
  "추가 배수나 특수 장비가 필요한 경우",
  "물 유입이 계속되거나 다시 침수되어 작업 조건이 바뀌는 경우",
  "예상과 다른 자재 내부 상태로 작업 범위·기간이 변경되는 경우",
];

const processFlow = ["상담·현장 상태 확인", "물 유입·출입 가능 여부 확인", "범위·견적 협의", "필요한 배수·잔여물 정리·철거", "침수 오염 청소", "건조·소독·냄새 제거", "필요한 복원 인테리어", "준공청소·최종 검수"];

const processSteps: [string, string][] = [
  ["현장 상태 확인", "어디로 물이 들어왔는지, 현재도 유입 중인지, 물이 얼마나 남아 있는지 확인합니다. 안전하게 출입하고 작업할 수 있는 상태인지도 먼저 확인해야 합니다."],
  ["범위·견적·일정 협의", "청소할 구역과 보관할 물건, 폐기할 물건을 정합니다. 건조·소독·냄새 제거를 포함한 기본 작업과 별도 공사를 구분해 협의합니다."],
  ["필요한 선행 작업", "현장에 따라 배수와 잔여물 정리, 손상 부분 철거 등이 먼저 필요할 수 있습니다. 누수·역류 원인이 해결되지 않았다면 관련 조치와 청소 일정을 함께 조율해야 합니다."],
  ["침수 오염 청소", "합의한 구역의 토사와 오염을 제거하고 세척합니다. 정리 후 드러나는 자재 상태와 추가 확인 사항도 살펴봅니다."],
  ["건조·소독·냄새 제거", "피해 구역의 상태에 맞춰 기본 포함 작업을 진행합니다. 겉으로 깨끗해진 모습뿐 아니라 남은 습기와 냄새도 확인할 사항입니다."],
  ["필요한 복원과 준공청소", "별도 계약한 철거·복원 범위에 따라 공사를 진행합니다. 복원 후에는 합의한 준공청소를 진행하고 전체 작업을 검수합니다."],
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "침수된 면적과 대략적인 물 높이",
  "침수 발생 시점과 현재 상태",
  "물이 빠졌는지, 계속 들어오는지",
  "토사·오염물과 젖은 집기의 양",
  "전기 등 설비 점검 여부",
  "주차와 반출 여건",
  "희망 날짜와 완료가 필요한 기한",
];

const checkupItems = [
  "토사와 오염 제거 상태",
  "합의한 구역의 청소 완료 여부",
  "건조 작업 내용과 상태 확인 결과",
  "소독·냄새 제거 작업 내용",
  "남아 있는 냄새나 습기",
  "자재의 변색·들뜸·변형·파손",
  "철거·복원을 계약했다면 해당 공정의 완료 여부",
  "별도 수리나 점검이 필요한 사항",
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 피해 면적",
  "침수 발생 시점과 현재 상태",
  "물 유입이 멈췄는지와 배수 여부",
  "가지고 계신 현장 사진",
  "젖은 집기와 폐기할 물품",
  "철거·복원 필요 여부",
  "희망 일정과 입주·영업 재개 계획",
];

const faqItems: [string, string][] = [
  ["물이 이미 빠졌는데도 침수청소가 필요한가요?", "남은 오염과 젖은 자재 상태에 따라 달라집니다. 물이 빠졌더라도 토사, 오염, 습기, 냄새가 남아 있다면 필요한 청소와 건조 범위를 확인하는 것이 좋습니다."],
  ["건조·소독·냄새 제거는 추가 옵션인가요?", "아닙니다. 찐청소의 침수청소에는 건조·소독·냄새 제거가 기본으로 포함됩니다. 실제 피해 범위와 작업량을 확인해 전체 견적을 안내합니다."],
  ["철거와 복원도 기본 비용에 포함되나요?", "아닙니다. 철거와 복원은 별도 비용입니다. 필요하다면 피해 부분 철거부터 복원 인테리어, 준공청소까지 연결해 상담하실 수 있습니다."],
  ["물을 빼는 작업도 가능한가요?", "고인 물의 양, 유입 상태, 장비 진입 조건을 확인해 진행 가능 여부와 범위를 안내합니다. 모든 규모의 배수 작업이 기본 청소비에 포함되는 것은 아니므로 사전 확인이 필요합니다."],
  ["누수나 배수관 문제도 함께 고쳐주나요?", "침수 후 청소와 원인 수리는 다른 작업입니다. 누수 탐지, 배관 수리, 막힘 해결 등의 필요 여부와 담당 범위를 별도로 확인해야 합니다."],
  ["벽지나 바닥재는 무조건 철거해야 하나요?", "무조건 철거하는 것은 아닙니다. 오염과 손상 상태, 건조 가능 여부 등을 확인해 청소·건조할 부분과 철거·교체할 부분을 구분합니다."],
  ["겉이 말랐으면 바로 도배나 바닥 공사를 해도 되나요?", "표면 상태만으로 판단하기는 어렵습니다. 복원할 부위의 건조 상태와 남은 오염을 확인한 뒤 다음 공정을 결정해야 합니다."],
  ["소독하면 곰팡이 걱정은 없어지나요?", "소독만으로 이후 곰팡이가 생기지 않는다고 보장할 수는 없습니다. 남은 습기와 오염을 처리하고 누수 등 수분 발생 원인도 해결해야 합니다."],
  ["냄새는 완전히 없어지나요?", "냄새 제거는 기본으로 진행하지만 자재 내부 오염이나 지속되는 누수·역류 등 원인에 따라 결과가 달라질 수 있습니다. 추가 처리나 자재 교체가 필요한 부분이 있는지도 확인합니다."],
  ["하루 안에 끝낼 수 있나요?", "현장마다 다릅니다. 청소 시간과 건조 기간은 구분해야 하며, 철거·복원이 필요하면 전체 일정이 더 길어질 수 있습니다."],
  ["청소가 끝나면 바로 입주하거나 영업해도 되나요?", "청소 완료만으로 결정하기 어렵습니다. 건조와 복원 상태, 필요한 설비 점검, 남아 있는 오염 등을 함께 확인해야 합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진을 바탕으로 상담할 수 있습니다. 다만 자재 내부 습기, 냄새, 가려진 손상은 사진으로 확인하기 어려워 현장 확인 후 범위와 비용이 달라질 수 있습니다."],
  ["하수 역류로 침수된 곳도 일반 침수와 동일하게 청소하나요?", "유입된 물과 오염물의 종류, 출입 가능한 상태를 먼저 확인해야 합니다. 현장 조건에 따라 필요한 조치와 작업 가능 범위가 달라지므로 일반 침수와 동일한 방식으로 진행한다고 약속하지 않습니다."],
];

const caseIds = ["flood-03", "flood-02", "flood-01"] as const;
const path = "/침수청소/";

export default function FloodCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "침수청소",
      serviceType: "침수청소·건조·소독",
      description: "물이 빠진 뒤에도 바닥에 오염이 남고 벽과 가구가 젖어 있나요? 찐청소 침수청소는 침수 오염 청소에 건조·소독·냄새 제거를 기본으로 포함합니다. 피해 소재와 현장 상태를 보고 필요한 철거·복원은 별도 견적으로 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "침수청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/flood-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>침수청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">반지하·상가 침수청소, 남은 오염부터 건조·소독까지</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>물이 빠진 뒤에도 바닥에 오염이 남고 벽과 가구가 젖어 있나요? 찐청소 침수청소는 침수 오염 청소에 건조·소독·냄새 제거를 기본으로 포함합니다. 피해 소재와 현장 상태를 보고 필요한 철거·복원은 별도 견적으로 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">침수청소·복구 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="침수청소 비용과 견적 산정 기준" />
            <ReadingParagraph>침수청소 비용은 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 면적이라도 ","젖은 자재의 상태에 따라 "]}>같은 면적이라도 들어온 물의 종류, 침수된 시간, 남은 토사와 오염, 젖은 자재의 상태에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["기본 작업에 포함하며, "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 현장에 필요한 작업을 확인해 견적을 안내합니다. 건조·소독·냄새 제거는 기본 작업에 포함하며, 철거와 복원은 별도 견적으로 구분합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">같은 평수라도 작업량은 다릅니다</h3>
            <ReadingParagraph className="mt-2">물이 빠진 빈 공간과 젖은 집기·토사가 남아 있는 공간은 정리에 필요한 시간이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">바닥 표면만 젖은 현장과 벽체·바닥재 안쪽까지 확인해야 하는 현장도 같은 기준으로 보기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 font-bold text-brand-dark">건조·소독·냄새 제거도 포함된 견적입니다</h3>
            <ReadingParagraph className="mt-2">찐청소의 침수청소에는 건조·소독·냄새 제거가 기본으로 포함됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">다만 기본 포함이라는 말이 피해 정도와 작업량에 관계없이 같은 가격이라는 뜻은 아닙니다. 현장에 필요한 인원과 장비, 예상 작업 범위를 확인해 전체 견적을 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">상담할 때는 건조 작업의 대상과 예상 기간, 완료 확인 방법도 함께 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">청소비와 복원비는 구분합니다</h3>
            <ReadingParagraph className="mt-2">침수청소를 맡기신다고 철거와 복원 공사까지 자동으로 포함되지는 않습니다.</ReadingParagraph>
            <QuickFactsTable facts={costSplit} headers={["구분", "내용"]} />
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">물을 빼는 작업과 청소, 손상된 공간을 복원하는 공사가 견적에 각각 어디까지 포함되는지 확인하는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="기본 청소 범위와 별도 작업" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">젖은 바닥과 벽, 물품은 재사용 가능 여부를 나눠 봅니다</h3>
            <ReadingParagraph className="mt-2 mb-6">침수 높이와 지속 시간, 유입된 물의 종류, 물 유입이 계속되는지를 먼저 확인합니다. 젖은 마감재와 물품은 청소·건조 가능한 부분과 교체 검토 부분을 구분합니다. 표면이 말라 보인다는 이유만으로 내부 상태까지 건조되었다고 단정하지 않습니다.</ReadingParagraph>
            <ReadingParagraph>찐청소는 합의한 침수 피해 구역의 오염을 청소하고, 건조·소독·냄새 제거까지 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">현재 물이 남아 있는지, 물이 계속 들어오는지에 따라 먼저 필요한 조치가 달라집니다. 청소 전 현장 상태부터 알려주세요.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                  {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                  {item.photos && (
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {item.photos.map(photo => (
                        <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:h-48">
                          <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 피해 사진`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 210px, 45vw" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">{restorationNote.title}</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">{restorationNote.body}</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{restorationNote.note}</ReadingParagraph>
            </div>

            <h3 className="mt-8 font-bold text-brand-dark">청소와 별도로 확인할 사항</h3>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">위 항목은 침수청소에 자동으로 포함되는 것으로 보지 않으며, 진행 가능 여부와 담당 범위를 사전에 확인해야 합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>


          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>건조·소독·냄새 제거는 기본 포함 항목입니다. 이 항목을 진행한다는 이유만으로 별도 선택 서비스로 구분하지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">다만 처음 협의한 피해 범위나 작업 조건이 달라지면 견적 조정이 필요할 수 있습니다.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적 단계에서 확인 가능한 부분과 작업 중 추가 확인이 필요한 부분을 구분해 주세요. 범위가 달라질 때 비용과 일정을 어떻게 협의할지도 함께 정해두는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="침수청소부터 복원까지 진행 순서" />
            <ReadingParagraph>기본 진행 흐름은 다음과 같습니다.</ReadingParagraph>

            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm font-bold text-brand-dark">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{step}</span>
                  {i < processFlow.length - 1 && <span className="text-brand" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <ReadingParagraph className="mt-3 text-[15px] text-gray-500">배수·수거·철거 등의 필요 여부와 포함 범위는 현장별로 정합니다. 작업 순서는 오염과 자재 상태에 따라 조정하거나 일부 공정을 반복할 수 있습니다.</ReadingParagraph>

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

            <h3 className="mt-6 font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">표면 청소에 걸리는 시간과 건조에 필요한 시간은 다를 수 있습니다. 피해 면적, 젖은 자재, 환기 조건, 별도 공사 유무에 따라 전체 일정이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">당일 청소가 가능한 현장이라도 건조와 복원까지 같은 날 끝난다는 뜻은 아닙니다. 입주나 영업 재개 기한이 있다면 상담할 때 먼저 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
              <ReadingParagraph>침수청소 결과는 물이 없어지고 바닥이 깨끗해진 모습만으로 판단하기 어렵습니다. 사진으로 확인할 내용과 현장 상태로 확인할 내용을 구분하는 것이 좋습니다.</ReadingParagraph>

              <ReadingParagraph className="mt-4 font-bold text-brand-dark">사진으로 확인할 내용</ReadingParagraph>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  토사와 눈에 보이는 오염이 제거되었는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  합의한 구역의 청소가 이루어졌는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  처리하기로 한 잔여물이 정리되었는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  자재에 남은 변색·들뜸·파손이 있는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  철거·복원을 진행했다면 어느 부분이 달라졌는지
                </li>
              </ul>

              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>

              <ReadingParagraph className="mt-5 font-bold text-brand-dark">별도로 설명과 확인이 필요한 내용</ReadingParagraph>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  건조를 진행한 구역과 확인 방법
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  남아 있는 냄새와 추가 조치 필요 여부
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  자재 내부 등 확인이 제한된 부분
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  누수·배수·전기 설비 등 별도 점검 사항
                </li>
              </ul>
              <ReadingParagraph className="mt-4">작업 사례를 비교하실 때도 청소만 진행한 현장인지, 철거와 자재 교체까지 진행한 현장인지 함께 확인해 주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">완료 사진이 필요하다면 촬영 구역과 전달 방법을 상담 시 협의하실 수 있습니다.</ReadingParagraph>
              <Link href="#cases" className="mt-4 inline-block font-bold text-brand">침수·누수청소 현장 사진 보기 →</Link>
            <ServicePhotoLinks path={path} />
            <BackToContents />
          </section>
          )}

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 위치와 침수 상황을 알려주시면 방문 가능 여부와 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">반지하나 지하 공간이라면 출입구, 계단, 장비 진입 여건도 함께 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">상담 시 필요한 정보</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">물이 아직 남아 있어도 상담할 수 있나요?</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">네. 현재 상태부터 알려주세요. 필요한 배수 작업의 규모와 진행 가능 여부, 견적 포함 범위를 먼저 확인합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">물이 많이 남아 있거나 출입 안전이 확인되지 않은 현장에서는 촬영을 위해 무리하게 들어가지 마세요.</ReadingParagraph>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">급하게 정리해야 한다면</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">희망 일정과 현재 작업 가능한 상태인지 먼저 말씀해 주세요. 피해 상황과 인원·장비 일정을 확인해 착수 가능 시점을 안내합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">모든 현장에 즉시 출동하거나 당일 전체 복구를 완료한다고 일괄적으로 약속드리지는 않습니다.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 문의" />
            <ReadingParagraph>검수는 처음 협의한 작업 범위를 기준으로 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">청소가 끝난 구역과 추가 확인이 필요한 구역을 구분해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4">작업 후 문제가 의심된다면 발생 위치와 상태를 알려주세요. 청소 누락인지, 자재 손상인지, 누수나 물 유입이 다시 발생한 것인지 구분해서 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">재확인과 사후 처리의 범위·기간은 계약 시 확인하시기 바랍니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 완료가 건물과 전기·가스 설비의 안전을 보증하는 것은 아닙니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />

            <h3 className="font-bold text-brand-dark">출입 안전부터 확인해 주세요</h3>
            <ReadingParagraph className="mt-2">출입 제한이나 안전 안내가 있다면 먼저 따라주세요. 물에 잠겼던 전기 설비와 기기는 임의로 켜지 말고 적절한 전문 점검을 받으셔야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">상담을 위해 위험한 공간에 들어가 사진을 찍으실 필요는 없습니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">물이 들어온 경로를 알려주세요</h3>
            <ReadingParagraph className="mt-2">폭우 유입인지, 배관 누수인지, 역류인지 알고 계신 범위에서 알려주세요. 정확한 원인을 모르시면 모르는 상태 그대로 말씀해 주셔도 됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">물이 계속 들어오는지, 관련 수리가 진행되었는지도 중요합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">기존 사진과 피해 기록이 있다면 준비해 주세요</h3>
            <ReadingParagraph className="mt-2">이미 촬영한 사진이 있다면 전체 공간과 피해 구역을 전달해 주세요. 기록을 남기기 위해 무리하게 출입하거나 물건을 옮길 필요는 없습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">보험이나 피해 지원 관련 절차를 진행 중이라면, 정리·철거 전에 필요한 기록과 보존 사항을 담당 기관에 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">남길 물건과 버릴 물건을 알려주세요</h3>
            <ReadingParagraph className="mt-2">중요 서류와 귀중품, 보관할 집기 등을 미리 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">침수된 물건의 보관 여부와 다시 사용할 수 있는지는 별도로 판단해야 합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">건물의 작업 조건을 확인해 주세요</h3>
            <ReadingParagraph className="mt-2 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">관리실 협의, 엘리베이터 사용, 주차 위치, 반출 시간 등을 알려주시면 작업 계획에 도움이 됩니다. 복원 공사가 필요하다면 건물 소유자나 관리 주체와 협의할 사항도 미리 확인해 주세요.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">침수청소·복구 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">물이 남아 있는지, 청소만 필요한지, 철거까지 해야 하는지 아직 판단하기 어려우셔도 괜찮습니다. 현재 알고 계신 상황부터 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-sm font-bold text-white">상담할 때 알려주시면 좋은 내용</ReadingParagraph>
              <ul className="mt-2 grid gap-1.5 text-[15px] text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-white/80">찐청소는 침수 오염 청소에 건조·소독·냄새 제거를 기본으로 포함합니다. 철거와 복원이 필요하다면 별도 견적으로 연결해 진행합니다. 지금 필요한 작업과 비용에 포함되는 범위부터 확인하세요.</ReadingParagraph>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>침수청소·복구 견적 문의하기 →</CtaButton>
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
