import Link from "next/link";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["작업 대상", "바닥에 남은 본드·접착제·끈끈이 자국"],
  ["우선 확인", "새 타일 시공 예정인지, 기존 바닥 재사용인지"],
  ["기본 포함", "협의한 범위의 본드제거와 마무리 세척"],
  ["기본 제외", "기존 타일·카펫 등 바닥재 철거"],
  ["견적 기준", "사용 목적, 바닥·본드 상태, 필요한 인원·장비·약품"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const purposeTable: [string, string][] = [
  ["새 타일 시공 전", "후속 시공에 필요한 제거 범위를 확인하고 본드제거·마무리 세척 진행"],
  ["기존 바닥 재사용", "기존 소재와 표면 상태를 고려해 본드를 제거하고 잔여 오염까지 세심하게 세척"],
];

const estimateChecklist = [
  "제거할 면적과 접착제의 분포",
  "본드의 두께와 굳은 상태",
  "바닥 소재와 기존 마감 상태",
  "새 타일 시공 또는 기존 바닥 재사용 여부",
  "모서리·가장자리 등 세부 작업량",
  "집기 배치와 장비 이동 공간",
  "필요한 인원과 장비·약품",
  "작업 시간과 장비 반입 조건",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "새 타일 시공을 위한 본드제거",
    body: "기존 바닥재를 걷어낸 뒤 남은 접착제와 바탕면 상태를 확인합니다. 새 타일 시공에 필요한 제거 범위를 협의한 후 작업하고, 마무리 세척을 진행합니다.",
    note: "후속 시공팀이 정해져 있다면 요구하는 바탕면 상태와 시공 일정을 함께 알려주세요.",
  },
  {
    title: "기존 바닥 재사용을 위한 본드제거",
    body: "기존 바닥을 그대로 사용할 경우에는 바닥 소재와 표면 상태를 먼저 확인합니다.",
    note: "접착제를 제거한 뒤에도 잔여 오염과 세척 상태를 더 꼼꼼하게 살펴 마무리합니다. 다만 기존의 긁힘·변색·손상은 본드 오염과 구분해 안내합니다.",
  },
  {
    title: "데코타일·카펫 철거 후 접착제 제거",
    body: "데코타일이나 카펫을 제거한 뒤 남은 본드의 두께와 분포, 잔여물 상태를 확인합니다.",
    note: "바닥재 철거가 끝났는지, 일부가 남아 있는지 상담 시 알려주세요. 바닥재를 걷어내는 작업과 남은 본드를 제거하는 작업은 구분합니다.",
  },
  {
    title: "모서리와 집기 주변",
    body: "벽면 가장자리와 기둥 주변, 문턱 등 접착제가 남은 위치를 확인합니다. 장비 접근이 어려운 부분은 세부 작업량을 견적에 반영합니다.",
    note: "집기 아래까지 작업해야 한다면 이동 필요 여부와 작업 범위를 사전에 협의합니다.",
  },
  {
    title: "마무리 세척",
    body: "마무리 세척은 두 작업 유형 모두 기본으로 진행합니다.",
    note: "본드제거 후 작업 구역의 잔여물을 정리하고 세척합니다. 특히 기존 바닥을 재사용하는 경우에는 남은 접착제와 오염을 더 세심하게 확인합니다.",
  },
];

const extraCostItems = [
  "새 타일 시공용에서 기존 바닥 재사용용으로 요청이 변경된 경우",
  "예상보다 두껍거나 여러 겹의 접착제가 확인된 경우",
  "집기에 가려진 곳 등 제거 구역이 추가된 경우",
  "집기 이동이나 구역을 나눠 진행하는 작업이 필요한 경우",
  "바닥재 철거·보수·코팅 등 별도 작업을 요청하는 경우",
  "작업 시간이나 장비 반입 조건이 변경된 경우",
];

const processSteps: [string, string][] = [
  ["사용 목적과 현장 상태 확인", "바닥 전체 사진과 접착제가 남은 부분의 가까운 사진을 확인합니다. 기존 바닥을 그대로 사용할지, 새 타일을 시공할지 함께 알려주세요."],
  ["제거 범위와 방법 확인", "바닥 소재와 마감 상태, 접착제의 두께와 굳은 정도를 확인해 작업 방법을 정합니다. 필요한 경우 일부 구역의 상태를 먼저 확인하고 범위를 협의합니다."],
  ["견적과 일정 안내", "필요한 인원·장비·약품과 마무리 기준, 예상 작업 시간을 안내합니다. 철거 등 기본에 포함되지 않는 작업도 구분합니다."],
  ["본드제거와 마무리 세척", "협의한 목적과 범위에 따라 접착제를 제거하고 세척합니다. 기존 바닥 재사용 현장은 잔여 오염과 표면의 세척 상태를 더 세밀하게 확인합니다."],
  ["최종 확인", "제거한 구역과 가장자리, 남은 확인 사항을 점검합니다. 후속 시공이 있다면 다음 공정에 필요한 조건도 확인합니다."],
];

const reservationChecklist = [
  "현장 주소와 면적",
  "기존 바닥재와 현재 바닥 상태",
  "바닥재 철거 완료 여부",
  "새 타일 시공 또는 기존 바닥 재사용 여부",
  "집기가 남아 있는지 여부",
  "희망 날짜와 후속 공사 일정",
  "주차·승강기·장비 반입 조건",
];

const prepItems = [
  "기존 바닥재 종류를 아시면 알려주세요.",
  "철거가 완료됐는지 말씀해 주세요.",
  "새 타일을 시공할지, 기존 바닥을 재사용할지 알려주세요.",
  "집기 이동이 필요한 구역을 확인해 주세요.",
  "사용해본 제거제나 시도한 작업이 있다면 알려주세요.",
  "물·전기 사용과 장비 반입 조건을 확인해 주세요.",
  "후속 공사의 일정과 요구하는 바닥 상태를 전달해 주세요.",
];

const faqItems: [string, string][] = [
  ["바닥본드제거 비용은 평당 얼마인가요?", "찐청소는 평수만으로 금액을 정하지 않습니다. 사용 목적과 바닥 소재, 접착제 상태, 필요한 인원·장비·약품과 현장 조건을 확인해 견적을 산정합니다."],
  ["같은 면적인데 가격이 달라질 수 있나요?", "네. 새 타일을 시공할 바닥과 기존 표면을 그대로 사용할 바닥은 마무리 기준이 다릅니다. 본드의 두께와 굳은 정도, 집기 배치에 따라서도 작업량이 달라집니다."],
  ["기존 타일이나 카펫 철거도 기본에 포함되나요?", "아니요. 바닥재 철거는 기본 본드제거 비용에 포함되지 않습니다. 상담할 때 철거가 완료된 상태인지 알려주세요."],
  ["본드제거 후 세척도 해주시나요?", "네. 마무리 세척은 기본으로 진행합니다. 기존 바닥을 재사용하는 경우에는 남은 접착제와 오염을 더 꼼꼼하게 확인하며 세척합니다."],
  ["데코타일이나 카펫 철거 후 남은 본드도 상담할 수 있나요?", "네. 철거 후 바닥 상태와 접착제 사진을 보내주세요. 사용 목적과 바탕면을 확인해 작업 범위와 비용을 안내합니다."],
  ["기존 바닥을 손상 없이 사용할 수 있나요?", "바닥 소재와 기존 마감, 접착제 상태에 따라 달라집니다. 재사용할 계획이라면 먼저 알려주세요. 현장 확인 없이 모든 바닥에 무손상 제거를 약속하지는 않습니다."],
  ["본드를 제거하면 변색이나 긁힘도 없어지나요?", "본드제거와 마무리 세척은 기존 바닥의 손상까지 복원하는 작업은 아닙니다. 접착제 오염과 기존 변색·긁힘을 구분하고, 별도 보수가 필요한 부분을 안내합니다."],
  ["제거 후 바로 새 타일을 시공할 수 있나요?", "후속 시공에 필요한 바탕면 상태를 확인해야 합니다. 접착제 제거 외에 건조·보수·평탄화 등이 필요한지 시공 담당자와 확인해 주세요."],
  ["집기가 있는 상태에서도 가능한가요?", "집기 배치와 작업할 구역을 확인해 판단합니다. 집기 아래까지 제거해야 한다면 이동이나 구역별 작업이 필요한지 협의합니다."],
];

const caseIds = ["floor-adhesive-02", "floor-adhesive-01", "floor-adhesive-03"] as const;
const path = "/바닥본드제거/";

export default function FloorAdhesiveRemovalLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "바닥본드제거",
      serviceType: "바닥본드제거·접착제 제거",
      description: "찐청소는 새 타일 시공 전 본드제거와 기존 바닥 재사용을 위한 접착제 제거를 진행합니다. 사용 목적과 바닥 상태에 따른 비용을 확인하세요. 마무리 세척은 기본 포함이며, 바닥재 철거는 기본 비용에서 제외됩니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "바닥본드제거", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>바닥본드제거</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">바닥시공</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">바닥본드제거 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>데코타일이나 카펫을 걷어냈는데 본드가 남아 있나요? 끈적이는 표면이나 굳은 접착제 때문에 다음 작업을 시작하기 어려울 수 있습니다.</p>
            <p>바닥재는 걷어냈는데, 본드는 자리를 지키고 있는 거죠.</p>
            <p>찐청소는 새 타일을 시공할 바닥인지, 기존 바닥을 그대로 사용할 것인지부터 확인합니다. 사용 목적과 바닥 상태에 맞춰 제거 범위와 마무리 기준을 정하고 비용을 안내합니다.</p>
            <p>본드제거 후 마무리 세척은 기본으로 진행합니다. 기존 바닥재 철거는 기본 비용에 포함되지 않습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">바닥본드제거 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="바닥본드제거 비용과 견적 산정 기준" />
            <p>바닥본드제거 비용은 작업 후 바닥을 어떻게 사용할지와 실제 작업량을 확인해 산정합니다.</p>
            <p className="mt-4">새 타일을 시공할 바닥과 기존 표면을 그대로 사용할 바닥은 마무리 기준이 다릅니다. 기존 바닥을 재사용한다면 표면에 남은 접착제와 오염이 그대로 보이기 때문에 제거와 세척에 더 세심한 작업이 필요합니다.</p>
            <QuickFactsTable facts={purposeTable} headers={["작업 목적", "작업 기준"]} />
            <p className="mt-5">찐청소는 평수만으로 가격을 정하지 않습니다. 같은 면적이라도 본드의 두께와 굳은 정도, 집기 배치에 따라 필요한 인원과 시간이 달라집니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">상담할 때 &ldquo;제거 후 이 바닥을 어떻게 사용할 예정인지&rdquo; 알려주시면 견적을 정하는 데 도움이 됩니다.</p>
          </section>

          {/* 2. 범위/제외 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="바닥본드제거 기본 범위와 제외 항목" />
            <p>협의한 구역의 본드제거와 마무리 세척을 진행합니다. 기존 바닥재 철거는 기본 범위에서 제외됩니다.</p>
            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                </div>
              ))}
            </div>
            <p className="mt-5 font-bold text-brand-dark">기본 작업에 포함되지 않는 항목</p>
            <p className="mt-2">기존 타일·카펫 등 바닥재 철거는 기본 비용에서 제외됩니다.</p>
            <p className="mt-2">집기 이동, 철거 자재 처리, 바닥 보수·평탄화·코팅·재시공 등이 필요하다면 제공 가능 여부와 비용을 별도로 확인합니다. 기본 마무리 세척과 공간 전체 청소도 구분합니다.</p>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>협의한 작업 목적이나 제거 범위가 달라지고 작업량이 늘어나면 견적이 변경될 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">변경이 필요한 이유와 작업 내용, 비용을 먼저 안내하고 협의합니다. 마무리 세척 자체는 추가 옵션이 아닙니다. 처음 협의한 작업 목적에 맞춰 기본으로 진행합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="바닥본드제거 진행 순서와 소요 시간" />
            <p>사용 목적 확인 → 바닥·본드 상태 확인 → 범위와 견적 협의 → 본드제거 → 마무리 세척 → 결과 확인 순서로 진행합니다.</p>
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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 본드 상태와 면적, 바닥 소재, 세부 작업량에 따라 달라집니다. 다음 공사나 영업 재개 일정이 있다면 미리 말씀해 주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 실제 사례" />
              <p>작업 사례를 볼 때는 본드가 제거된 모습과 함께 기존 바닥을 재사용한 현장인지, 후속 시공을 준비한 현장인지 확인하는 것이 좋습니다.</p>
              <p className="mt-4">각 사례는 실제 바닥 상태와 작업 내용을 기준으로 설명합니다. 본드제거·세척 결과와 별도로 진행한 코팅·재시공 결과는 구분해 안내합니다.</p>
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 바닥 상태, 사용 목적과 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">철거팀이나 타일 시공팀의 일정이 잡혀 있다면 함께 말씀해 주세요. 앞뒤 공정과 작업 가능 시간을 확인해 조율합니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-gray-500">사용 중인 사무실이나 영업 중인 매장은 작업 가능한 시간과 구역, 건물의 소음·환기 관련 조건도 알려주세요.</p>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 완료 후 검수 및 사후 처리 기준" />
            <p>작업 결과는 처음 협의한 사용 목적과 제거 범위, 마무리 기준을 바탕으로 확인합니다.</p>
            <div className="mt-6 space-y-6">
              <div className="rounded-xl border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-brand-dark">새 타일 시공 예정 현장</h3>
                <p className="mt-2">협의한 접착제 제거 상태와 마무리 세척 결과를 확인합니다. 본드제거 외에 보수나 평탄화 등 후속 작업이 필요한지는 시공 담당자와 함께 확인해야 합니다.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-brand-dark">기존 바닥 재사용 현장</h3>
                <p className="mt-2">남은 접착제와 표면 오염, 모서리와 가장자리의 세척 상태를 세밀하게 확인합니다. 기존 바닥의 변색·긁힘·손상은 별도로 구분해 안내합니다.</p>
              </div>
            </div>
            <p className="mt-5 text-[15px] text-gray-500">작업 후 확인이 필요한 부분은 위치와 사진을 전달해 주세요. 기존 작업 범위와 현장 상태를 확인해 처리 방법을 안내합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
            <p>바닥 전체 모습과 접착제가 남은 부분의 가까운 사진을 준비해 주시면 상담에 도움이 됩니다.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">무리해서 본드를 긁거나 약품을 추가로 바르기 전에 현재 상태를 보여주세요. 바닥 상태를 확인해 작업 방법을 안내하겠습니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="바닥본드제거 자주 묻는 질문" />
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
              <p className="text-xl font-bold">바닥본드제거 견적 문의</p>
              <p className="mt-3 text-white/80">바닥 전체 사진과 본드가 남은 부분의 가까운 사진, 현장 위치와 면적을 알려주세요.</p>
              <p className="mt-2 text-white/80">새 타일을 시공할 바닥인지, 기존 바닥을 그대로 사용할 것인지도 함께 말씀해 주세요. 찐청소가 목적에 맞는 제거 범위와 마무리 세척 기준을 정하고 비용과 일정을 안내해드리겠습니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>바닥본드제거 견적 문의하기 →</CtaButton>
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
