import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["estimate", "비용·견적 기준"],
  ["scope", "가능한 작업"],
  ["safety", "냄새 제거 약품 안전성"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["faq", "자주 묻는 질문"],
] as const;

const estimateTable: [string, string][] = [
  ["잔여물 수거·철거", "수거할 잔여물과 철거 대상, 작업량과 반출 조건"],
  ["화재청소", "필요한 인원, 장비·약품, 오염 범위와 작업 기간"],
  ["그을음·냄새 제거", "오염된 소재와 상태, 처리 범위와 필요한 작업"],
  ["복원 인테리어", "복구할 부분, 시공 범위, 선택한 자재"],
  ["준공청소", "공사 후 청소할 공간과 잔여 오염"],
];

const scopeItems: { title: string; body: string; note?: string; photos?: string[] }[] = [
  {
    title: "화재 잔여물 수거와 피해 부분 철거",
    body: "현장에 남은 잔여물과 손상된 부분을 확인합니다. 보관할 물품, 수거할 잔여물, 철거할 부분을 구분하고 이후 청소와 복구가 진행될 수 있도록 작업 범위를 정합니다.",
    note: "철거 범위는 현장 상태와 복원 계획에 맞춰 협의합니다.",
  },
  {
    title: "화재청소와 그을음 제거",
    body: "천장과 벽면, 바닥, 창틀 등 오염된 구역을 확인하고 소재에 맞춰 청소합니다. 표면에 묻은 그을음과 분진, 틈새에 남은 오염도 함께 살핍니다.",
    note: "청소로 개선할 부분과 손상으로 인해 교체가 필요한 부분은 구분해 안내합니다.",
    photos: ["fire-work-01.webp", "fire-work-02.webp", "fire-work-03.webp", "fire-work-04.webp"],
  },
  {
    title: "화재 냄새 제거",
    body: "냄새가 남은 위치와 오염된 소재를 확인하고 필요한 작업을 진행합니다. 그을음이 보이지 않게 됐다고 냄새 처리까지 끝난 것으로 판단하지 않습니다.",
    note: "현장 상태에 따라 처리 범위와 방법이 달라지므로, 예상 작업과 확인할 사항을 사전에 설명합니다.",
  },
  {
    title: "복원 인테리어",
    body: "청소 후에도 복구가 필요한 부분은 협의한 범위에 따라 복원 인테리어를 진행합니다. 시공할 구역과 사용할 자재, 마감 방식을 정하고 공사 일정을 안내합니다.",
    note: "어디까지 청소하고 어디부터 다시 시공할지를 구분하는 것이 중요합니다.",
  },
  {
    title: "공사 마무리 준공청소",
    body: "복원 공사가 끝나면 공사 과정에서 생긴 분진과 잔여 오염을 정리합니다. 협의한 청소 범위를 확인하고 최종 검수로 마무리합니다.",
  },
];

const extraCostItems = [
  "철거 후 내부에서 추가 손상이 확인된 경우",
  "잔여물 수거량이나 철거 범위가 늘어난 경우",
  "그을음·냄새 처리 범위가 확대된 경우",
  "복원할 구역이나 선택한 자재가 변경된 경우",
  "별도 장비나 추가 인원이 필요한 작업이 생긴 경우",
];

const processFlow = ["잔여물 수거·필요 부분 철거", "화재청소", "그을음·냄새 제거", "복원 인테리어", "준공청소"];

const processSteps: [string, string][] = [
  ["상담과 현장 확인", "피해 상황과 고객님이 원하는 복원 범위를 확인합니다. 현장 출입과 작업이 가능한지 확인한 뒤 필요한 공정을 정리합니다."],
  ["견적 안내와 계약", "작업별 범위와 비용, 복원 자재와 예상 일정을 협의합니다. 청소만 진행하는지, 철거와 복원까지 진행하는지 계약 내용에 구분합니다."],
  ["시공 진행", "협의한 공정에 따라 작업합니다. 현장에서 추가로 확인된 사항이나 변경이 필요한 부분은 안내하고 조율합니다."],
  ["최종 검수와 완료", "청소와 복원 결과를 협의한 내용에 맞춰 확인합니다. 마감 상태와 보완이 필요한 부분을 점검하고 작업을 마무리합니다."],
];

const faqItems: [string, string][] = [
  ["화재청소만 맡겨도 되나요?", "네. 청소만 필요한 현장인지, 철거·냄새 제거·복원까지 필요한 현장인지 확인하고 원하는 범위로 상담합니다."],
  ["철거와 복원 인테리어도 가능한가요?", "네. 화재 잔여물 수거와 피해 부분 철거부터 청소, 그을음·냄새 제거, 복원 인테리어, 준공청소까지 연결해서 진행할 수 있습니다."],
  ["모든 작업이 화재청소 견적에 포함되나요?", "모든 공정이 자동으로 포함되는 것은 아닙니다. 현장에 필요한 작업과 고객님이 요청한 범위를 확인해 견적을 구성하고, 포함 공정을 구분해 안내합니다."],
  ["화재 전 상태로 모두 복원할 수 있나요?", "피해 정도와 현장 조건에 따라 가능한 복원 범위가 달라집니다. 현장을 확인한 뒤 복구할 부분과 시공 방법, 사용할 자재를 협의합니다."],
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
      description: "찐청소는 화재 잔여물 수거와 피해 부분 철거부터 화재청소, 그을음·냄새 제거, 복원 인테리어와 준공청소까지 진행합니다. 현장별 작업 범위와 견적 기준, 복원 절차를 확인하세요.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
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
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>화재청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">화재청소부터 복원까지, 작업 범위와 비용 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>화재 후에는 청소뿐 아니라 철거와 복구가 필요한 경우도 있습니다. 무엇부터 시작해야 할지, 어떤 작업을 맡겨야 할지 판단하기 어려우실 수 있습니다.</p>
            <p>찐청소는 현장 상태를 확인하고 잔여물 수거·철거부터 화재청소, 그을음·냄새 제거, 복원 인테리어, 준공청소까지 필요한 과정을 함께 안내합니다.</p>
            <p>청소만 필요한 현장인지, 복원까지 필요한 현장인지부터 살펴보겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">화재청소·복원 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[190px_1fr]">
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} />

        <div className="space-y-14 text-[17px] leading-8 text-gray-800">
          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="화재청소·복원 비용과 견적 산정 기준" />
            <p>화재청소 비용은 필요한 인원과 장비·약품을 중심으로 산정하며, 철거와 복원 공사가 필요한 경우 해당 비용을 구분해 안내합니다.</p>
            <p className="mt-4">같은 면적이라도 표면의 그을음을 청소하면 되는 현장과 손상된 마감재를 철거하고 다시 시공해야 하는 현장은 작업량이 다릅니다. 잔여물의 양과 반출 조건, 냄새 처리 범위에 따라서도 필요한 공정이 달라집니다.</p>
            <p className="mt-4">평수 하나로 계산하기에는 현장에서 확인할 일이 꽤 많습니다.</p>
            <QuickFactsTable facts={estimateTable} headers={["견적 항목", "확인하는 내용"]} />
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">처음부터 모든 공정을 넣는 것은 아닙니다. 현장 상태와 고객님이 원하는 복원 범위를 확인해 필요한 작업으로 견적을 구성합니다.</p>
          </section>

          {/* 2. 가능한 작업 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="화재청소부터 복원까지 가능한 작업" />
            <p>찐청소는 청소만 필요한 현장부터 철거와 복원 공사가 필요한 현장까지 상담하고 진행합니다. 실제 계약에 포함되는 작업은 견적서에서 구분합니다.</p>
            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                  {item.photos && (
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {item.photos.map(photo => (
                        <Image key={photo} src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 작업 사진`} width={960} height={720} className="aspect-[4/3] w-full rounded-lg object-cover" sizes="(min-width: 768px) 160px, 45vw" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 냄새 제거 약품 안전성 - "화재 냄새 제거" 바로 뒤에 배치해 신뢰를 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">화재 냄새 제거에 사용하는 약품, 안전한가요?</h2>
            <p className="mt-4">화재 냄새 제거에 사용하는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 그을음을 치운 뒤에도 다시 생활하거나 영업을 재개해야 하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 견적 변경이 필요한 경우" />
            <p>협의한 공정이나 자재가 변경되거나, 작업 중 추가 피해가 확인되면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">변경이 필요한 경우에는 이유와 작업 범위, 비용을 먼저 협의합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="화재청소·복원 진행 순서" />
            <p>전체 진행은 상담 → 현장 확인·견적 → 계약 → 시공 → 최종 검수 순서입니다. 시공은 현장에 필요한 공정을 연결해 진행합니다.</p>

            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm font-bold text-brand-dark">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{step}</span>
                  {i < processFlow.length - 1 && <span className="text-brand" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[15px] text-gray-500">그을음 제거는 화재청소와 함께 진행되는 등, 실제 순서와 반복 작업은 현장 상태에 따라 조정합니다.</p>

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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">전체 소요 기간은 피해 정도와 철거·청소·복원 범위, 자재 일정 등에 따라 안내합니다.</p>
          </section>

          {/* 전후사진 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="화재청소 작업 전후 사진" />
              <p>실제 화재청소 현장의 전후 사진입니다. 오염 정도와 청소 결과를 미리 확인해 보세요.</p>
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="06" title="화재청소 자주 묻는 질문" />
            <div className="space-y-3">
              {faqItems.map(([q, a]) => (
                <details key={q} className="rounded-xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-[16.5px]">{q}</summary>
                  <p className="mt-3">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 문의 CTA */}
          <section id="contact" className="scroll-mt-36">
            <div className="rounded-2xl bg-brand-dark p-7 text-white">
              <p className="text-xl font-bold">화재청소·복원 견적 문의</p>
              <p className="mt-3 text-white/80">화재청소만 필요한지, 철거와 복원까지 해야 하는지 아직 정하지 못하셨다면 현재 상황부터 말씀해 주세요.</p>
              <p className="mt-2 text-white/80">찐청소가 현장을 확인하고 필요한 작업과 순서, 비용을 안내해드리겠습니다.</p>
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
