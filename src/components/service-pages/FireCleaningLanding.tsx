import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { EcosorbNotice } from "@/components/service-pages/EcosorbNotice";
import { ServiceNextStep, ServicePhotoLinks, RegionalPhotoLinks } from "@/components/service-pages/ServiceConnections";
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
  ["scope", "범위·철거복원 구분"],
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
  ["서비스 대상", "주택, 아파트, 상가, 사무실 등 화재 피해 공간"],
  ["진행 가능 범위", "잔여물 수거, 철거, 화재청소, 그을음·냄새 제거, 복원 인테리어, 준공청소"],
  ["견적 기준", "필요한 인원, 장비·약품, 피해와 오염 범위, 폐기물량, 철거·복원 내용"],
  ["비용 구분", "청소 견적과 철거·복원 비용을 구분해 확인"],
  ["작업 일정", "현장 상태와 필요한 공정을 확인한 뒤 안내"],
  ["예약 문의", "현장 위치, 피해 상황, 희망 일정을 기준으로 상담"],
];

const estimateChecklist = [
  "화재가 발생한 구역과 주변 오염 범위",
  "천장, 벽면, 바닥 등의 그을음 상태",
  "탄 냄새가 남아 있는 위치와 자재 상태",
  "정리할 집기와 화재 잔여물의 종류·양",
  "철거가 필요한 부분과 보존할 부분",
  "층수, 엘리베이터, 주차 위치, 반출 동선",
  "필요한 장비·약품과 작업 인원",
  "복원할 구역, 마감재와 시공 범위",
];

const estimateScopeItems = [
  "잔여물 수거와 폐기물 처리",
  "피해 부분 철거",
  "화재청소와 그을음 제거",
  "냄새 제거",
  "복원 인테리어와 자재",
  "복원 후 준공청소",
];

const scopeItems: { title: string; body: string; note?: string; photos?: string[]; video?: string }[] = [
  {
    title: "화재 잔여물 수거와 정리",
    body: "버리기로 결정한 잔여물과 손상된 물품을 정리하고 반출합니다. 수거·처리할 대상과 물량은 작업 전에 확인합니다.",
    note: "보관할 서류, 귀중품, 사진, 집기가 있다면 미리 알려주세요. 남길 물건과 폐기할 물건을 정하기 전에 임의로 모두 비우는 방식으로 접근하지 않는 것이 중요합니다.",
    photos: ["fire-residue-01.webp", "fire-residue-02.webp", "fire-residue-03.webp", "fire-residue-04.webp"],
  },
  {
    title: "피해 부분 철거",
    body: "손상된 마감재나 구조물 중 철거가 필요한 부분을 확인합니다. 화재가 났다는 이유만으로 모든 공간을 동일하게 철거하는 것은 아닙니다.",
    note: "철거 범위는 자재 상태와 복원 계획에 따라 정하며, 청소 비용과 구분해 견적을 확인합니다. 구조 안전에 관한 판단은 청소와 별도의 전문 점검이 필요한 영역입니다.",
    photos: ["fire-demolition-01.webp", "fire-demolition-02.webp", "fire-demolition-03.webp", "fire-demolition-04.webp"],
  },
  {
    title: "화재청소와 그을음 제거",
    body: "합의한 범위의 천장, 벽면, 바닥 등 작업 대상의 그을음과 오염을 청소합니다. 표면 재질과 손상 상태에 따라 작업 방법과 기대할 수 있는 결과가 달라집니다.",
    note: "그을음이 제거되더라도 열에 의한 변색, 녹음, 뒤틀림, 파손까지 청소로 되돌릴 수 있는 것은 아닙니다. 청소할 부분과 교체를 검토할 부분을 구분해야 합니다.",
    photos: ["fire-work-01.webp", "fire-work-02.webp", "fire-work-03.webp", "fire-work-04.webp"],
  },
  {
    title: "화재 냄새 제거",
    body: "냄새가 남아 있는 위치와 오염된 물품·자재를 확인하며 냄새 제거 작업을 진행합니다.",
    note: "겉으로 보이는 그을음이 없어졌다고 해서 냄새 문제까지 해결되었다고 단정하지 않습니다. 자재 내부까지 오염된 경우에는 추가 처리나 철거·교체가 필요한지 함께 살펴봐야 합니다. 현장을 확인하지 않고 냄새가 무조건 완전히 사라진다고 약속드리지는 않습니다.",
    video: "fire-odor",
  },
  {
    title: "복원 인테리어",
    body: "청소 후 필요한 구역의 복원 인테리어를 진행할 수 있습니다. 복원할 범위와 사용할 자재, 마감 방식은 상담을 통해 정합니다.",
    note: "기존 상태에 가깝게 복원할지, 필요한 부분의 마감을 변경할지에 따라 비용과 일정이 달라질 수 있습니다. 복원 공사는 기본 청소비와 구분해 확인합니다.",
    photos: ["fire-restoration-01.webp", "fire-restoration-02.webp", "fire-restoration-03.webp", "fire-restoration-04.webp"],
  },
  {
    title: "복원 후 준공청소",
    body: "복원 공사 후 발생한 분진과 작업 잔여물을 정리하고, 합의한 범위의 마무리 청소를 진행합니다.",
    note: "화재 직후 오염을 제거하는 청소와 복원 공사 후 마무리하는 준공청소는 서로 다른 단계입니다. 전체 복원을 맡기실 때는 마지막 청소까지 포함되어 있는지 확인해 주세요.",
    photos: ["fire-completion-01.webp", "fire-completion-02.webp", "fire-completion-03.webp", "fire-completion-04.webp"],
  },
];

const separateScopeItems = [
  "건물의 구조 안전 점검",
  "전기·가스 설비의 점검과 수리",
  "가전·기계의 내부 점검과 기능 복구",
  "의류·침구 등 별도 세탁",
  "보험 보장 여부와 보험금 산정",
];

const extraCostItems = [
  "잔여물을 정리한 뒤 가려져 있던 오염이나 손상이 확인된 경우",
  "처음 상담한 것보다 폐기물의 양이 많은 경우",
  "청소만 요청했던 구역에 철거·교체가 추가되는 경우",
  "오염이 자재 내부까지 이어져 추가 처리가 필요한 경우",
  "복원할 구역이나 자재 사양이 변경되는 경우",
  "높은 천장, 좁은 진입로 등으로 추가 장비가 필요한 경우",
  "엘리베이터 사용 제한 등 반출 조건이 달라지는 경우",
];

const processFlow = ["상담·현장 확인", "범위·견적 협의", "계약·일정 확정", "잔여물 수거·필요한 철거", "화재청소·그을음 제거", "냄새 제거", "복원 인테리어", "준공청소·최종 검수"];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "현장 위치와 피해 상황, 출입 가능 여부, 요청하시는 작업을 확인합니다. 청소만 필요한지, 철거부터 복원까지 필요한지도 함께 상담합니다."],
  ["범위·견적·일정 협의", "보관할 물건, 폐기할 물건, 철거할 부분, 청소할 부분을 구분합니다. 복원이 필요하다면 시공 범위와 자재를 확인하고 일정에 반영합니다."],
  ["잔여물 수거와 필요한 철거", "협의한 대상을 수거·반출하고, 필요한 부분을 철거합니다. 정리 후 드러나는 상태를 확인하면서 다음 작업으로 연결합니다."],
  ["화재청소와 그을음·냄새 제거", "합의한 구역의 오염을 청소하고 냄새 제거를 진행합니다. 마감으로 가려질 부분에 추가 확인이 필요한지도 살펴봅니다."],
  ["복원 인테리어", "협의한 범위와 자재에 따라 복원 공사를 진행합니다. 현장 상태나 공정 변경이 필요한 부분은 확인 후 조율합니다."],
  ["준공청소와 최종 검수", "복원 후 남은 분진과 작업 잔여물을 정리합니다. 완료된 항목과 남은 확인 사항을 구분해 최종 검수합니다."],
];

const reservationChecklist = [
  "현장 위치와 건물 용도",
  "대략적인 면적과 피해 구역",
  "현재 출입·작업 가능 여부",
  "현장 사진이나 기존 피해 기록",
  "잔여물 수거·청소·철거·복원 중 필요한 작업",
  "층수, 엘리베이터, 주차와 반출 여건",
  "희망 일정과 입주·영업 재개 계획",
];

const checkupItems = [
  "수거·처리하기로 한 잔여물의 반출 여부",
  "합의한 철거 범위의 완료 여부",
  "청소 대상 구역의 그을음과 오염 상태",
  "남아 있는 냄새와 추가 확인이 필요한 위치",
  "보관하기로 한 물건의 상태",
  "복원 공사의 자재와 마감 상태",
  "준공청소 완료 여부",
  "별도 점검이나 수리가 필요한 부분",
];

const contactChecklist = [
  "현장 위치와 건물 용도",
  "대략적인 면적과 피해 범위",
  "현재 출입·작업 가능 여부",
  "가지고 계신 현장 사진",
  "남길 물건과 정리가 필요한 잔여물",
  "청소만 필요한지, 철거·복원까지 필요한지",
  "희망 일정과 입주·영업 재개 계획",
];

const faqItems: [string, string][] = [
  ["화재청소와 화재복원은 어떻게 다른가요?", "화재청소는 잔여 오염과 그을음 등을 정리하는 작업이고, 화재복원은 손상된 부분의 철거·교체와 마감 공사까지 포함할 수 있습니다. 찐청소는 두 과정을 연결해 진행할 수 있으며, 실제 범위는 현장별로 정합니다."],
  ["청소부터 철거와 인테리어까지 한 번에 맡길 수 있나요?", "네. 잔여물 수거와 철거부터 화재청소, 그을음·냄새 제거, 복원 인테리어, 준공청소까지 상담하실 수 있습니다."],
  ["전부 기본 청소비에 포함되나요?", "아닙니다. 전체 과정을 진행할 수 있다는 뜻이며, 모든 공정이 기본 청소비에 포함되는 것은 아닙니다. 수거·처리, 철거, 청소, 복원 등 견적에 포함된 항목을 구분해 확인해야 합니다."],
  ["화재가 나면 무조건 전부 철거해야 하나요?", "그렇지는 않습니다. 피해 범위와 자재 상태에 따라 청소할 부분과 철거·교체할 부분이 달라집니다. 구조나 설비 안전에 관한 판단은 별도의 전문 점검이 필요할 수 있습니다."],
  ["철거 없이 그을음 청소만 맡길 수도 있나요?", "네. 청소만 필요한 현장도 상담할 수 있습니다. 다만 청소만으로 원하는 상태까지 정리할 수 있는지는 현장 확인이 필요합니다."],
  ["그을음은 적고 탄 냄새만 남았어도 화재청소로 상담하나요?", "네. 화재 발생 위치와 오염이 퍼진 범위, 기존 처리 내용을 알려주세요. 표면 상태와 냄새가 남은 소재를 살펴 필요한 작업을 정하며, 냄새 변화만으로 현장 안전이 확인되는 것은 아닙니다."],
  ["냄새를 완전히 없앨 수 있나요?", "피해 정도와 자재 상태에 따라 달라지므로 현장 확인 없이 완전 제거를 보장하지 않습니다. 청소·냄새 제거로 가능한 범위와 추가 조치가 필요한 부분을 구분해 안내합니다."],
  ["평당 가격으로 견적을 받을 수 있나요?", "면적은 참고하지만, 면적만으로 비용을 정하지 않습니다. 필요한 인원과 장비·약품, 오염 상태, 폐기물량, 철거·복원 범위를 함께 확인합니다."],
  ["화재보험으로 처리할 수 있나요?", "보장 여부와 인정 범위는 보험사에 확인하셔야 합니다. 청소나 폐기 전에 필요한 기록과 절차를 문의하시고, 업체에 요청할 서류가 있다면 발급 가능 여부를 상담해 주세요."],
  ["청소가 끝나면 바로 입주하거나 영업해도 되나요?", "청소 완료만으로 판단할 수는 없습니다. 복원 공정과 냄새 상태뿐 아니라 필요한 구조·설비 점검 등 별도 확인 사항까지 고려해야 합니다."],
  ["사진만 보내도 상담할 수 있나요?", "네. 기존 사진이 있다면 상담에 활용할 수 있습니다. 다만 사진으로 확인하기 어려운 냄새나 자재 손상이 있어 현장 확인 후 범위와 견적이 달라질 수 있습니다."],
];

const caseIds = ["fire-01", "fire-02", "fire-03"] as const;
const path = "/화재청소/";

export default function FireCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "화재청소",
      serviceType: "화재청소·화재복원",
      description: "화재가 난 방이나 주방뿐 아니라 주변 공간에 번진 그을음과 탄 냄새도 함께 확인해야 합니다. 찐청소는 현장 출입과 안전조치가 확인된 뒤 잔여물 수거, 청소, 필요한 철거·복원과 마무리 청소를 연결해 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "화재청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/fire-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>화재청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">화재 그을음·냄새 제거부터 철거·복원까지 필요한 순서로</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>화재가 난 방이나 주방뿐 아니라 주변 공간에 번진 그을음과 탄 냄새도 함께 확인해야 합니다. 찐청소는 현장 출입과 안전조치가 확인된 뒤 잔여물 수거, 청소, 필요한 철거·복원과 마무리 청소를 연결해 상담합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">화재청소·복원 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className={readability.layout}>
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} id="service-toc" />

        <div className={`${readability.body} space-y-14 text-gray-800`}>
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <div data-fire-pilot className="mt-5 mb-6 border-l-4 border-brand pl-4 sm:pl-5">
              <h3 className="text-lg font-bold text-brand-dark">청소만 할지, 복원까지 할지 아직 모르셔도 괜찮습니다</h3>
              <ReadingParagraph className="mt-3">그을음과 탄 냄새가 남은 공간을 확인하고, 청소할 부분과 철거·복원할 부분을 나누어 상담합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-3">관계기관의 출입 제한이나 현장 보존 안내가 있다면 먼저 따라야 합니다.</ReadingParagraph>
              <nav aria-label="화재청소 처음 확인할 내용" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                <a href="#scope" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">청소·복원 범위 확인 →</a>
                <a href="#estimate" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">견적 기준 확인 →</a>
                <a href="#cases" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">실제 작업 사진 보기 →</a>
              </nav>
            </div>
            <QuickFactsTable facts={quickFacts} />
          <BackToContents />
          </section>

          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="화재청소 비용과 견적 산정 기준" />
            <ReadingParagraph>화재청소 비용은 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 면적이라도 ","폐기물의 양에 따라 "]}>같은 면적이라도 그을음이 묻은 범위, 열에 손상된 자재, 남은 집기와 폐기물의 양에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업량을 확인합니다. 철거와 복원까지 요청하시면 해당 공정과 자재 비용도 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">면적보다 피해 상태와 작업 범위를 확인합니다</h3>
            <ReadingParagraph className="mt-2">작은 공간이라도 집기가 많고 오염이 여러 곳에 퍼져 있으면 작업에 더 많은 시간이 필요할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">반대로 넓은 공간이라도 피해가 일부 구역에 한정되어 있다면 작업 범위가 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 font-bold text-brand-dark">청소 견적과 전체 복원 견적은 다릅니다</h3>
            <ReadingParagraph className="mt-2">화재청소부터 복원까지 맡길 수 있다는 말이 모든 공정이 기본 청소비에 포함된다는 뜻은 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 비교하실 때는 다음 항목이 어디까지 포함되어 있는지 확인해 주세요.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {estimateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">총액이 같아도 포함된 공정이 다르면 실제로 맡길 수 있는 범위는 달라집니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">사진으로도 견적 상담이 가능한가요?</h3>
            <ReadingParagraph className="mt-2">사진이 있으면 피해 범위와 필요한 작업을 상담하는 데 도움이 됩니다. 전체 공간과 피해가 집중된 구역을 함께 보여주시면 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">다만 냄새의 상태, 가려진 오염, 자재 손상은 사진만으로 판단하기 어렵습니다. 사진 상담과 현장 확인을 구분하고, 최종 작업 범위에 맞춰 견적을 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진 촬영을 위해 출입이 제한된 현장에 들어가실 필요는 없습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위/철거복원 구분 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="화재청소 범위와 철거·복원 구분" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">벽·천장 그을음과 물품에 밴 냄새를 나눠 확인합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">직접 탄 구역과 연기 오염이 퍼진 구역을 구분합니다. 벽·천장·바닥의 소재와 물품 상태를 보고 청소 가능한 부분, 보관할 물품과 철거·교체가 필요한 부분을 정합니다. 청소 견적과 철거·복원 비용은 별도로 안내합니다.</ReadingParagraph>
            <ReadingParagraph>찐청소는 화재 잔여물 수거부터 복원 후 준공청소까지 진행할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">현장을 확인한 뒤 필요한 단계만 선택하거나, 전체 과정을 연결해 상담하실 수 있습니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                  {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                  {item.photos && (
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {item.photos.map(photo => (
                        <div key={photo} className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:h-44">
                          <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 작업 사진`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 160px, 45vw" />
                        </div>
                      ))}
                    </div>
                  )}
                  {item.video && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-black">
                      <video
                        className="aspect-video w-full object-cover"
                        poster={`/videos/${item.video}-poster.jpg`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-label={`${item.title} 작업 장비 사용 영상`}
                      >
                        <source src={`/videos/${item.video}.mp4`} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-bold text-brand-dark">별도로 확인해야 하는 항목</h3>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">위 항목은 화재청소에 자동으로 포함되는 것으로 보지 않으며, 담당 분야와 진행 가능 여부를 따로 확인해야 합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
            <aside data-fire-pilot aria-label="화재 현장의 단계별 관련 안내" className="mt-5 border-l-4 border-brand/30 pl-4 sm:pl-5">
              <h3 className="text-lg font-bold text-brand-dark">지금 필요한 단계에 맞춰 더 살펴보세요</h3>
              <ul className="mt-4 space-y-5">
                <li>
                  <Link href="/폐기물처리/" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">버릴 물품의 수거·반출부터 확인하려면 →</Link>
                  <ReadingParagraph className="mt-1">남길 물건과 버릴 물건을 정했다면 수거 대상과 반출 조건을 확인해 보세요. 화재 잔여물은 종류와 오염 상태에 따라 처리 가능 여부를 별도로 확인합니다.</ReadingParagraph>
                </li>
                <li>
                  <Link href="/신축준공청소/" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">복원 공사 후 마무리 청소를 알아보려면 →</Link>
                  <ReadingParagraph className="mt-1">복원 공사가 끝난 뒤 남은 분진과 공사 잔여물을 정리하는 단계라면 준공청소 범위를 참고해 보세요. 화재 직후의 그을음·냄새 제거와는 다른 작업이며, 포함 여부는 견적에서 확인합니다.</ReadingParagraph>
                </li>
              </ul>
            </aside>
          <BackToContents />
          </section>


          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>견적은 처음 확인한 피해 상태와 작업 범위를 기준으로 산정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">작업 범위나 물량이 달라지면 추가 비용이 발생할 수 있습니다. 예를 들어 다음과 같은 경우입니다.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">계약 전에는 확정된 작업, 현장 확인이 더 필요한 작업, 별도 비용 항목을 구분해 확인해 주세요. 추가 작업이 필요한 상황에 대비해 범위와 비용을 어떻게 협의할지도 정해두는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="화재청소부터 복원까지 진행 순서" />
            <ReadingParagraph>전체 진행 흐름은 다음과 같습니다.</ReadingParagraph>

            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm font-bold text-brand-dark">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{step}</span>
                  {i < processFlow.length - 1 && <span className="text-brand" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <ReadingParagraph className="mt-3 text-[15px] text-gray-500">현장 상태에 따라 일부 공정은 생략되거나, 순서가 조정되거나, 반복될 수 있습니다.</ReadingParagraph>

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

            <h3 className="mt-6 font-bold text-brand-dark">작업 기간은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">부분적인 그을음 청소와 철거·복원을 포함한 작업은 소요 기간이 다릅니다. 피해 범위, 필요한 공정, 자재 수급, 건물의 작업 가능 시간 등을 확인한 뒤 예상 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">입주나 영업 재개 일정이 정해져 있다면 상담 시 먼저 말씀해 주세요. 청소 완료일과 공간을 다시 사용할 수 있는 시점은 구분해서 계획해야 합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 사례 확인 방법" />
              <ReadingParagraph>화재청소 사례를 보실 때는 깨끗해진 모습뿐 아니라 어떤 작업을 했는지 함께 확인하는 것이 중요합니다.</ReadingParagraph>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  청소만 진행했는지, 철거와 복원까지 했는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  같은 위치와 구역을 비교한 사진인지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  그을음을 제거한 부분과 교체한 부분이 구분되는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  바닥뿐 아니라 벽면·천장 등 작업 범위가 확인되는지
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  사진에 보이지 않는 냄새는 어떻게 확인했는지
                </li>
              </ul>
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
              <ReadingParagraph className="mt-5">표면 청소로 달라진 현장과 마감재를 교체한 현장은 결과를 같은 기준으로 비교하기 어렵습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-3">상담 시에는 내 현장과 피해 형태가 비슷한 작업 사례를 요청해 주세요. 완료 상태를 사진으로 확인하고 싶다면 촬영 구역과 전달 방법도 미리 협의하시면 좋습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-[15px] text-gray-500">사진상 깨끗해 보이는 것만으로 냄새 제거 여부나 건물·설비의 안전까지 확인할 수는 없습니다.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
            <BackToContents />
          </section>
          )}

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 피해 상황을 알려주시면 방문 가능 여부와 일정을 확인해 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">예약 상담 시 필요한 정보</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">급하게 정리해야 한다면</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">희망 날짜와 반드시 맞춰야 하는 기한을 먼저 알려주세요. 현장 상태와 투입 가능한 인원, 필요한 공정을 확인해 일정을 협의합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">모든 현장의 즉시 착수나 당일 완료를 일괄적으로 약속드리지는 않습니다.</ReadingParagraph>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">복원 범위가 아직 정해지지 않았다면</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">처음부터 모든 공정을 결정하실 필요는 없습니다. 현재 피해 상황과 공간을 다시 어떻게 사용하실지부터 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">청소로 정리할 부분과 철거·복원을 검토할 부분을 나누어 상담하겠습니다.</ReadingParagraph>
            </div>
            <RegionalPhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 처리 기준" />
            <ReadingParagraph>검수는 처음 협의한 작업 범위와 견적 항목을 기준으로 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">청소 완료와 복원 완료를 구분하고, 남은 확인 사항이 있는지도 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4">청소로 제거되지 않는 변색·손상과 작업 누락은 구분해서 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사후 문의 방법, 재확인 범위와 적용 기간은 계약할 때 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">화재청소 완료가 건물 구조, 전기·가스 설비, 가전제품의 안전을 보증하는 것은 아닙니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />

            <h3 className="font-bold text-brand-dark">출입과 작업이 가능한 상태인지 확인해 주세요</h3>
            <ReadingParagraph className="mt-2">관계기관의 출입 제한이나 현장 보존 안내가 있다면 먼저 따라야 합니다. 상담이나 사진 촬영을 위해 무리하게 현장에 들어가지 마세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">보험 관련 확인이 필요하면 정리 전에 문의해 주세요</h3>
            <ReadingParagraph className="mt-2">보험 접수 예정이라면 담당 보험사에 피해 기록, 물품 보존, 현장 확인 필요 여부를 먼저 문의해 주세요. 청소·철거·폐기 전에 확인할 사항이 있는지 알아두는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">보험 적용 여부와 보상 범위는 가입한 계약과 심사에 따라 달라집니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">남길 물건과 폐기할 물건을 구분해 주세요</h3>
            <ReadingParagraph className="mt-2">중요 서류, 사진, 귀중품, 보관할 집기를 알려주세요. 직접 찾기 어려운 경우에는 위치나 특징을 설명해 주시면 상담에 도움이 됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">물건을 보관하는 것과 다시 안전하게 사용할 수 있는지는 별도로 확인해야 합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">피해 사진이 있다면 전달해 주세요</h3>
            <ReadingParagraph className="mt-2">이미 촬영한 전체 사진과 피해 구역 사진이 있으면 상담에 도움이 됩니다. 사진이 없어도 현재 알고 계신 상황부터 말씀해 주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">입주·영업 계획과 건물 작업 조건을 알려주세요</h3>
            <ReadingParagraph className="mt-2 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">희망 완료일, 건물의 작업 가능 시간, 엘리베이터 사용 조건, 반출 동선 등을 알려주시면 공정과 일정을 협의하는 데 도움이 됩니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">화재청소·복원 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">청소만으로 가능한지, 철거부터 시작해야 하는지 아직 모르셔도 괜찮습니다. 현재 상황과 다시 사용하고 싶은 공간의 모습을 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-sm font-bold text-white">상담할 때 알려주시면 좋은 내용</ReadingParagraph>
              <ul className="mt-2 grid gap-1.5 text-[15px] text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-white/80">찐청소는 화재 잔여물 수거부터 청소와 복원, 마지막 준공청소까지 연결해 진행할 수 있습니다. 내 현장에 필요한 작업이 무엇인지, 견적에 어디까지 포함되는지부터 확인하세요.</ReadingParagraph>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>화재청소·복원 견적 문의하기 →</CtaButton>
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
