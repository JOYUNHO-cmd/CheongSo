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
  ["safety", "냄새 제거 약품 안전성"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["기본 포함", "침수청소·건조·소독·냄새 제거"],
  ["별도 견적", "피해 부분 철거·복원 인테리어"],
  ["견적 기준", "필요한 인원·장비·약품과 현장 작업 조건"],
  ["예상 시간", "피해 정도와 청소·건조 범위에 따라 안내"],
  ["서비스 지역", "현장 위치를 기준으로 방문 가능 여부 확인"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "침수된 공간과 오염 범위",
  "남은 물과 토사·오염물의 양",
  "젖은 바닥과 벽면 등 소재의 상태",
  "필요한 인원과 장비·약품",
  "집기 배치와 작업 동선",
  "출입·주차·장비 반입 조건",
];

const scopeItems: { title: string; body: string; note?: string; photos?: string[] }[] = [
  {
    title: "남은 물과 토사·오염물",
    body: "남아 있는 물과 흙, 오염물의 양과 상태를 확인합니다. 물을 먼저 빼야 하는 현장인지, 배수 후 남은 오염을 정리하는 단계인지에 따라 작업을 준비합니다.",
    note: "별도 배수나 잔여물 반출이 필요한 경우에는 견적에 포함되는 범위를 구분해 안내합니다.",
    photos: ["flood-work-01.webp", "flood-work-02.webp", "flood-work-03.webp"],
  },
  {
    title: "바닥과 걸레받이",
    body: "바닥 표면과 모서리, 걸레받이 주변의 오염을 소재에 맞춰 청소합니다. 집기 주변과 접근 가능한 틈새도 함께 살핍니다.",
    note: "바닥재가 들뜨거나 변형된 부분은 청소로 해결할 수 있는 오염과 구분해 안내합니다.",
  },
  {
    title: "벽면과 출입문·창틀",
    body: "물이 닿은 높이와 오염 범위, 마감재의 상태를 확인합니다. 청소 가능한 표면을 정리하고, 손상으로 인해 철거·교체가 필요한 부분은 별도로 설명합니다.",
  },
  {
    title: "건조",
    body: "청소 후 젖은 공간의 건조를 진행합니다. 소재와 젖은 정도, 현장 조건에 따라 필요한 작업과 시간을 안내합니다.",
    note: "바닥 표면이 말라 보이는 것과 자재 안쪽까지 건조된 것은 다를 수 있습니다. 복원 공사가 필요한 경우에는 후속 시공에 필요한 상태를 확인합니다.",
  },
  {
    title: "소독과 냄새 제거",
    body: "소독과 냄새 제거도 기본 비용에 포함됩니다. 오염된 구역을 청소하고, 현장 상태에 맞춰 소독과 냄새 제거 작업을 진행합니다. 물이 들어온 원인과 오염된 소재를 함께 확인해 작업 방법을 정합니다.",
  },
];

const restorationNote = {
  title: "철거와 복원 인테리어 — 별도 견적",
  body: "손상된 바닥재와 벽면 등 철거·재시공이 필요한 부분은 별도로 진행할 수 있습니다.",
  note: "복구할 구역과 사용할 자재, 마감 방식과 비용을 협의합니다. 복원 공사 후에는 준공청소와 최종 검수까지 이어서 진행합니다.",
};

const extraCostItems = [
  "피해 부분의 철거와 복원 인테리어를 진행하는 경우",
  "별도 집기 이동이나 잔여물 반출이 추가되는 경우",
  "작업 중 보이지 않던 구역의 피해가 확인된 경우",
  "물이 다시 유입돼 재작업이 필요한 경우",
  "협의한 복원 범위나 자재를 변경하는 경우",
];

const processFlow = ["현장 확인", "필요한 선행 작업", "침수청소", "건조·소독·냄새 제거", "필요한 복원 공사", "최종 검수"];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "현장 위치와 침수 상황, 물의 유입이 멈췄는지 확인합니다. 안전한 출입과 작업 가능 여부를 확인한 뒤 오염 범위와 피해 상태를 살핍니다."],
  ["작업 범위와 견적 협의", "기본 청소 범위와 필요한 인원·장비·약품, 예상 일정을 안내합니다. 철거와 복원이 필요하다면 청소 비용과 구분해 설명합니다."],
  ["침수청소와 건조·소독·냄새 제거", "협의한 구역의 오염을 청소하고 건조·소독·냄새 제거를 진행합니다. 작업 중 추가로 확인된 사항은 안내드립니다."],
  ["필요한 복원 공사와 준공청소", "별도로 협의한 철거·복원 공사를 진행합니다. 후속 시공 조건을 확인하고, 공사가 끝나면 준공청소로 마무리합니다."],
  ["최종 검수", "작업 결과와 보완이 필요한 부분을 확인합니다. 복원 공사를 진행한 경우에는 협의한 시공 범위와 마감 상태도 함께 점검합니다."],
];

const reservationChecklist = [
  "현장 주소와 층수",
  "주택·상가·사무실·지하 공간 등 공간 유형",
  "물이 들어온 원인과 현재 상태",
  "남은 물과 오염의 정도",
  "출입과 장비 반입 조건",
  "희망 방문 시간",
];

const prepItems = [
  "이미 촬영해둔 현장 사진",
  "물이 들어온 시점과 원인",
  "누수·배수 관련 조치 현황",
  "보관을 원하는 물품",
  "현장 출입 담당자와 연락처",
  "주차·승강기 이용 조건",
];

const faqItems: [string, string][] = [
  ["침수청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 금액을 정하지 않습니다. 오염 상태와 집기 배치, 작업 동선을 확인하고 필요한 인원과 장비·약품을 기준으로 견적을 산정합니다."],
  ["건조·소독·냄새 제거도 포함되나요?", "네. 건조·소독·냄새 제거는 침수청소 기본 비용에 포함됩니다. 현장 상태에 맞춰 작업 방법과 예상 시간을 안내합니다."],
  ["철거와 복원도 기본 비용에 포함되나요?", "아니요. 철거와 복원 인테리어는 별도 견적입니다. 필요한 구역과 시공 범위, 자재를 협의한 뒤 비용을 안내합니다."],
  ["청소부터 복원까지 한 번에 맡길 수 있나요?", "네. 침수청소와 건조·소독·냄새 제거부터, 필요한 철거·복원 인테리어와 준공청소까지 연결해서 진행할 수 있습니다."],
  ["물이 아직 남아 있어도 문의할 수 있나요?", "네. 남은 물의 양과 현재 상황을 알려주세요. 배수가 필요한 단계인지 확인하고 작업 가능 범위와 필요한 선행 조치를 안내합니다."],
  ["누수나 하수구 역류로 생긴 오염도 상담할 수 있나요?", "네. 물이 들어온 원인을 먼저 알려주세요. 오염 상태에 따라 작업을 확인합니다. 누수 수리나 역류 원인을 해결하는 설비 작업은 청소·복원과 구분해 확인해야 합니다."],
  ["냄새 제거를 하면 다시 냄새가 나지 않나요?", "냄새 제거 작업은 포함되지만, 이후 물이 다시 들어오거나 접근하지 못한 곳에 오염이 남아 있다면 추가 확인이 필요할 수 있습니다. 현장에서 확인된 조건과 작업 범위를 설명해드립니다."],
  ["청소가 끝나면 바로 입주하거나 영업할 수 있나요?", "건조 상태와 시설 안전, 필요한 복원 공사가 완료됐는지에 따라 달라집니다. 사용 예정일을 알려주시면 작업 일정과 함께 확인할 사항을 안내합니다."],
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
      description: "찐청소 침수청소는 건조·소독·냄새 제거까지 기본 비용에 포함됩니다. 필요한 인원과 장비·약품에 따른 견적 기준, 작업 범위와 진행 절차를 확인하세요. 철거와 복원 인테리어는 별도 견적으로 진행합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
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
    <article>
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
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">침수청소 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>침수 후에는 남은 물과 오염뿐 아니라 젖은 공간과 냄새까지 정리해야 합니다. 어디부터 손대야 할지, 청소만으로 해결할 수 있을지 막막하실 수 있습니다.</p>
            <p>찐청소는 현장 상태를 확인하고 침수청소부터 건조·소독·냄새 제거까지 함께 진행합니다. 손상된 부분의 철거와 복원이 필요하다면 복원 인테리어와 준공청소까지 연결해 진행할 수 있습니다.</p>
            <p>필요한 작업과 비용부터 차근차근 설명해드리겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">침수청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="침수청소 비용과 견적 산정 기준" />
            <p>침수청소 비용은 필요한 인원과 장비·약품, 현장의 작업 조건을 기준으로 산정합니다. 건조·소독·냄새 제거는 기본 비용에 포함됩니다.</p>
            <p className="mt-4">같은 30평이라도 물만 남은 공간과 흙이나 오수가 들어온 공간은 작업량이 다릅니다. 젖은 집기가 많거나 장비를 계단으로 옮겨야 한다면 필요한 인원과 시간도 달라집니다.</p>
            <p className="mt-4">평수는 같아도 현장 사정까지 같지는 않으니까요.</p>
            <p className="mt-5 font-bold text-brand-dark">찐청소는 다음 내용을 확인해 견적을 안내합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">철거와 복원 인테리어는 기본 청소 비용에 포함되지 않습니다. 필요한 경우 작업 범위와 자재를 협의하고 별도로 견적을 안내합니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="침수청소 기본 범위와 별도 작업" />
            <p>찐청소는 침수된 공간의 오염을 청소하고, 건조·소독·냄새 제거까지 진행합니다. 구체적인 작업 구역과 방법은 침수 원인과 피해 상태에 맞춰 정합니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
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
              <p className="mt-2 text-[15.5px]">{restorationNote.body}</p>
              <p className="mt-2 text-[15px] text-gray-500">{restorationNote.note}</p>
            </div>
          </section>

          {/* 냄새 제거 약품 안전성 - "소독과 냄새 제거" 바로 뒤에 배치해 신뢰를 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">침수 냄새 제거에 사용하는 약품, 안전한가요?</h2>
            <p className="mt-4">침수 냄새 제거에 사용하는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 건조와 소독이 끝난 뒤 바로 생활하거나 영업을 재개해야 하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <p>철거·복원 공사를 요청하거나, 사전에 협의한 범위를 넘어 작업량이 늘어나는 경우에는 추가 견적이 필요할 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">건조·소독·냄새 제거 자체를 별도 옵션으로 추가하는 것은 아닙니다. 기본 비용에 포함된 작업이며, 현장 조건이나 작업 범위가 변경되면 변경 내용과 비용을 먼저 협의합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="침수청소·복원 진행 순서와 소요 시간" />
            <p>현장 확인 → 필요한 선행 작업 → 침수청소 → 건조·소독·냄새 제거 → 필요한 복원 공사 → 최종 검수 순서로 진행합니다.</p>

            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm font-bold text-brand-dark">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{step}</span>
                  {i < processFlow.length - 1 && <span className="text-brand" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[15px] text-gray-500">철거와 복원 공사는 필요한 경우에만 별도 견적으로 진행하며, 세부 작업 순서는 현장 상태에 따라 조정합니다.</p>

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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소요 시간은 피해 정도와 작업 범위에 따라 달라집니다. 청소가 끝나는 시간과 건조·복원이 완료되는 시간은 구분해 안내합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="침수청소 작업 전후 사진과 실제 사례" />
              <p>비슷한 현장의 작업 사례를 보면 필요한 청소와 복구 범위를 이해하기가 쉽습니다.</p>
              <p className="mt-4">찐청소 홈페이지의 관련 사례를 확인해 보세요.</p>
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
              <p className="mt-5 text-[15px] text-gray-500">침수와 누수는 물의 유입 원인과 오염 조건이 다를 수 있습니다. 각 사례는 현장 상태와 실제 작업 내용을 함께 확인해 주세요.</p>
              <Link href="#cases" className="mt-4 inline-block font-bold text-brand">침수·누수청소 현장 사진 보기 →</Link>
            </section>
          )}

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 현재 상황을 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">아직 물이 들어오는지, 물은 빠졌지만 오염이 남아 있는지에 따라 준비할 작업이 달라집니다. 정확한 면적을 모르셔도 알고 계신 상황부터 말씀해 주세요.</p>
            <p className="mt-5 font-bold text-brand-dark">상담 시 다음 정보를 알려주시면 도움이 됩니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진은 이미 확보한 것이 있다면 보내주세요. 사진을 찍기 위해 위험한 현장에 들어가실 필요는 없습니다.</p>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <p>청소 완료 후에는 협의한 범위를 기준으로 청소·건조·소독·냄새 제거의 작업 결과를 확인합니다.</p>
            <p className="mt-4">접근하지 못한 구역이나 별도 보수가 필요한 손상은 구분해 안내합니다. 복원을 진행했다면 시공 범위와 마감 상태도 함께 확인합니다.</p>
            <p className="mt-4">작업 후 확인이 필요한 부분은 위치와 사진, 발견한 상태를 전달해 주세요. 기존 작업 내용과 현장 상태를 확인해 처리 방법을 안내합니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">누수나 역류가 계속되는 경우에는 원인 조치가 필요합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="침수청소 전 준비사항" />
            <p>우선 안전한 출입이 가능한 상태인지 확인해 주세요. 물이 고인 곳에 들어가 전기설비를 조작하거나 젖은 전자제품을 켜지 마세요.</p>
            <p className="mt-4 font-bold text-brand-dark">상담 전에는 확보된 정보부터 준비해 주시면 됩니다.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">젖은 집기나 물품을 어디까지 옮겨야 할지 모르시겠다면 먼저 말씀해 주세요. 현장에 필요한 준비사항을 안내해드리겠습니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="침수청소 자주 묻는 질문" />
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
              <p className="text-xl font-bold">침수청소 견적 문의</p>
              <p className="mt-3 text-white/80">침수 후 청소만 하면 될지, 철거와 복원까지 필요한지 아직 판단하기 어려우셔도 괜찮습니다.</p>
              <p className="mt-2 text-white/80">현장 위치와 현재 상황을 알려주세요. 찐청소가 건조·소독·냄새 제거를 포함한 청소 범위와 비용, 필요한 경우 별도 철거·복원 견적까지 차근차근 안내해드리겠습니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>침수청소 견적 문의하기 →</CtaButton>
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
