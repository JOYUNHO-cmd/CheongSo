import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { CaseGallery } from "@/components/service-pages/CaseGallery";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·확인 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약·비대면"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["기본 포함", "쓰레기 수거·폐기물 처리·청소·소독·냄새 제거"],
  ["견적 기준", "필요한 인원·장비·약품, 폐기물의 양과 반출·처리 조건"],
  ["비대면 진행", "요청 시 가능, 출입과 물품 확인 방법 사전 협의"],
  ["결과 확인", "상세한 청소 전후 사진 촬영·전달"],
  ["작업 시간", "물품의 양, 분류 작업, 오염 상태에 따라 안내"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "쓰레기와 물품의 종류·양",
  "보관할 물품과 분류에 필요한 작업",
  "바닥·주방·욕실 등의 오염 상태",
  "필요한 인원과 장비·약품",
  "가구·가전 등 대형 물품의 반출 여부",
  "층수와 승강기, 주차·반출 동선",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "보관 물품과 정리 대상 분류",
    body: "남겨둘 가구와 생활용품, 중요한 서류, 찾아야 할 물건을 알려주세요. 보관할 물건과 처리할 대상을 구분한 뒤 작업합니다.",
    note: "물건의 위치가 정확히 기억나지 않으면 특징과 예상 위치를 말씀해 주세요. 처리 여부가 모호한 물품은 어떻게 확인할지 사전에 정합니다.",
  },
  {
    title: "쓰레기 수거와 폐기물 처리",
    body: "협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다. 물품의 종류와 양, 반출 동선을 확인해 작업을 준비합니다.",
    note: "가구와 가전 등 큰 물품도 반출을 원하시면 미리 알려주세요. 크기와 수량, 이동 조건을 견적에 반영합니다.",
  },
  {
    title: "방과 거실·바닥",
    body: "물품을 정리한 뒤 바닥과 모서리, 걸레받이 등 협의한 구역의 오염을 청소합니다. 물건에 가려져 있던 부분도 확인합니다.",
    note: "변색이나 긁힘, 마감재 손상은 청소로 제거할 수 있는 오염과 구분해 안내합니다.",
  },
  {
    title: "주방과 싱크대",
    body: "음식물과 생활 쓰레기를 정리하고 싱크대·작업대·바닥 등 협의한 구역을 청소합니다.",
    note: "냉장고 내부의 식품 정리와 세척, 수납장 내부, 식기 세척이 필요하다면 상담할 때 알려주세요. 구체적인 작업 범위를 미리 정합니다.",
  },
  {
    title: "욕실과 세면 공간",
    body: "변기와 세면대, 바닥 등 협의한 구역을 오염 상태에 맞춰 청소합니다.",
    note: "배수구 주변의 오염을 닦는 작업과 배관 막힘이나 설비 고장을 해결하는 작업은 구분해 확인합니다.",
  },
  {
    title: "소독과 냄새 제거",
    body: "소독과 냄새 제거는 기본 비용에 포함됩니다. 쓰레기와 오염원을 정리하고 공간을 청소한 뒤, 현장 상태에 맞춰 소독과 냄새 제거를 진행합니다. 소재 안쪽에 오염이 스며들었거나 손상된 부분이 있다면 추가로 확인할 사항을 설명합니다.",
    note: "해충이 있는 경우에는 상담 시 알려주세요. 해충 방제는 소독과 구분해 필요한 작업과 제공 범위를 확인합니다.",
  },
];

const extraCostItems = [
  "사진에 보이지 않던 공간에도 물품이 쌓여 있는 경우",
  "대형 가구·가전의 반출이 추가되는 경우",
  "보관 물품을 찾고 분류하는 작업이 늘어나는 경우",
  "냉장고·수납장 내부 등 청소 구역이 추가되는 경우",
  "사전에 확인되지 않은 특수 오염이 발견된 경우",
  "승강기 이용 제한 등 반출 조건이 변경된 경우",
];

const processSteps: [string, string][] = [
  ["상담과 현장 상태 확인", "위치와 면적, 물품의 양과 오염 상태, 요청 사항을 확인합니다. 사진이 준비되지 않았다면 현재 상황부터 설명해 주세요."],
  ["보관·처리 대상과 견적 협의", "남겨둘 물건과 정리할 대상, 청소할 구역을 정합니다. 필요한 인원과 장비·약품, 반출·처리 조건을 반영해 견적을 안내합니다."],
  ["청소 전 사진 촬영과 작업 진행", "작업 전 상태를 자세히 촬영하고, 협의한 기준에 따라 물품을 분류·수거합니다. 폐기물 처리와 공간 청소, 소독·냄새 제거를 진행합니다."],
  ["청소 후 사진 전달과 결과 확인", "작업 후에도 구역별 상태를 자세히 촬영해 보내드립니다. 보관 물품과 작업 결과, 남은 확인 사항을 안내합니다."],
];

const reservationChecklist = [
  "현장 주소와 층수",
  "대략적인 면적과 물품의 양",
  "보관할 물건과 반출할 대상",
  "주차·승강기 이용 조건",
  "희망 날짜와 완료가 필요한 시점",
  "비대면 진행 희망 여부",
];

const prepItems = [
  "보관할 가구와 생활용품을 알려주세요.",
  "중요한 서류와 귀중품은 가능하면 따로 보관해 주세요.",
  "찾아야 할 물건은 특징과 예상 위치를 알려주세요.",
  "냉장고·수납장 내부 정리가 필요한지 말씀해 주세요.",
  "반려동물의 작업 중 머무를 장소를 준비해 주세요.",
  "주차·승강기 이용 조건을 확인해 주세요.",
  "비대면 진행 시 출입 방법과 연락 가능한 번호를 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["쓰레기집청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 견적을 정하지 않습니다. 물품의 양과 분류 작업, 오염 상태, 반출 동선을 확인하고 필요한 인원·장비·약품과 폐기물 처리 조건을 기준으로 산정합니다."],
  ["쓰레기 수거와 폐기물 처리도 포함되나요?", "네. 협의한 대상의 수거와 폐기물 처리는 기본 견적에 포함됩니다. 물품의 종류와 양, 반출 조건을 확인해 전체 비용을 안내합니다."],
  ["소독과 냄새 제거는 추가 비용인가요?", "아니요. 소독과 냄새 제거도 기본에 포함됩니다. 현장 상태에 맞춰 청소와 함께 진행합니다."],
  ["원룸처럼 작은 공간도 상담할 수 있나요?", "네. 공간 크기와 함께 쌓인 물품과 오염 상태를 알려주세요. 작은 공간도 작업량에 차이가 있어 현장 조건을 확인해 안내합니다."],
  ["집을 어느 정도 치워놓아야 하나요?", "상담을 위해 미리 치워두실 필요는 없습니다. 현재 상태를 알려주시고, 보관할 물건과 정리할 대상을 말씀해 주세요."],
  ["물건을 전부 버리는 건가요?", "아닙니다. 보관할 물건과 처리할 대상을 먼저 협의합니다. 판단이 어려운 물건이 나왔을 때 확인할 방법도 사전에 정합니다."],
  ["현장에 없어도 맡길 수 있나요?", "네. 원하시면 비대면으로 진행할 수 있습니다. 출입 방법과 보관할 물건, 작업 중 연락 방법을 미리 협의합니다."],
  ["비대면으로 맡기면 결과는 어떻게 확인하나요?", "청소 전후 사진을 자세히 촬영해 보내드립니다. 사진을 확인하신 뒤 궁금한 부분이나 추가로 확인할 위치를 말씀해 주세요."],
  ["이웃에게 알려지지 않게 진행할 수 있나요?", "방문 시간과 반출 과정에 대한 요청을 미리 알려주시면 조율 가능한 부분을 확인합니다. 다만 공용 공간을 이용한 반출 등이 있어 주변에 전혀 보이지 않는다고 보장하기는 어렵습니다."],
  ["청소 전후 사진이 홈페이지에도 올라가나요?", "고객님께 작업 결과를 전달하는 사진과 홈페이지·홍보용 사진 사용은 별개입니다. 촬영과 공개에 관한 요청 사항은 상담할 때 말씀해 주세요."],
];

const caseIds = [
  "special-02", "special-01", "special-04", "special-05", "special-06", "special-07",
  "special-08", "special-09", "special-10", "special-11", "special-12", "special-13",
  "special-14", "special-15", "special-16", "special-17", "special-18", "special-19",
] as const;
const path = "/쓰레기집청소/";

export default function TrashHouseCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "쓰레기집청소",
      serviceType: "쓰레기집청소·폐기물 처리",
      description: "찐청소 쓰레기집청소는 수거·폐기물 처리·소독·냄새 제거까지 기본으로 포함합니다. 요청 시 비대면 진행이 가능하며 상세한 청소 전후 사진을 보내드립니다. 작업 범위와 비용, 예약 절차를 확인하세요.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "쓰레기집청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>쓰레기집청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">쓰레기집청소 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>물건과 쓰레기가 쌓여 어디부터 정리해야 할지 모르겠다면, 현재 상태 그대로 상담해 주세요. 상담을 받기 위해 먼저 집을 치워두실 필요는 없습니다.</p>
            <p>찐청소는 쓰레기 수거와 폐기물 처리부터 공간 청소, 소독·냄새 제거까지 기본으로 진행합니다. 보관할 물건과 정리할 대상을 먼저 확인하고, 필요한 작업과 비용을 안내합니다.</p>
            <p>원하시면 비대면으로 맡기실 수 있습니다. 청소 전후 사진을 자세히 촬영해 보내드려 현장에 계시지 않아도 작업 결과를 확인하실 수 있습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">쓰레기집청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="쓰레기집청소 비용과 견적 산정 기준" />
            <p>쓰레기집청소 비용에는 협의한 대상의 수거·폐기물 처리와 청소, 소독·냄새 제거가 포함됩니다.</p>
            <p className="mt-4">견적은 필요한 인원과 장비·약품, 폐기물의 종류와 양, 반출 조건을 확인해 산정합니다.</p>
            <p className="mt-4">같은 원룸이라도 바닥에 생활 쓰레기가 놓인 공간과 가구 높이까지 물건이 쌓인 공간은 작업량이 다릅니다. 보관할 물건을 찾아 분류해야 하거나, 승강기 없이 계단으로 반출해야 한다면 필요한 시간과 인원도 달라집니다.</p>
            <p className="mt-4">평수만 듣고 계산하기에는, 현장에서 확인할 일이 꽤 많습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">견적 상담에서는 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소독과 냄새 제거를 별도 옵션으로 추가하는 방식이 아닙니다. 기본 작업에 포함해 현장에 필요한 전체 견적을 안내합니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="쓰레기집청소 기본 범위와 확인 항목" />
            <p>물품을 수거하는 것부터 반출 후 청소, 소독·냄새 제거까지 진행합니다. 작업 전에는 보관할 물건과 처리할 대상, 공간별 청소 범위를 협의합니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* 냄새 제거 약품 안전성 - "소독과 냄새 제거" 바로 뒤에 배치해 신뢰를 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">소독·냄새 제거에 사용하는 약품, 안전한가요?</h2>
            <p className="mt-4">소독과 냄새 제거에 사용하는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 청소가 끝난 뒤 바로 생활해야 하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <p>사전에 협의한 것보다 반출량이 늘어나거나 작업 범위가 추가되면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">수거·폐기물 처리·소독·냄새 제거 자체를 별도 옵션으로 추가하는 것은 아닙니다. 협의한 작업량이나 조건이 변경되는 경우, 이유와 비용을 먼저 안내하고 조율합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="쓰레기집청소 진행 순서와 소요 시간" />
            <p>상담 → 보관·처리 대상 확인 → 견적 협의 → 분류·수거·폐기물 처리 → 청소·소독·냄새 제거 → 전후 사진 전달·마무리 확인 순서로 진행합니다.</p>

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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 물품의 양과 분류 난이도, 반출 동선, 오염 상태에 따라 달라집니다. 하루 안에 가능한지는 상담과 현장 확인을 통해 안내합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 실제 사례" />
              <p>작업 사례를 보실 때는 물품이 비워진 모습과 함께 반출 후 어디까지 청소했는지도 확인해 보세요.</p>
              <p className="mt-4">찐청소 홈페이지 &quot;찐현장사진들&quot;에 등록된 쓰레기집청소 현장만 모아 보여드립니다.</p>
              <div className="mt-6">
                <CaseGallery items={cases} />
              </div>
              <p className="mt-5 text-[15px] text-gray-500">실제 작업한 구역과 정리·청소 내용을 함께 살펴보시면 맡기려는 공간에 어떤 작업이 필요한지 이해하는 데 도움이 됩니다.</p>
              <p className="mt-3 text-[15px] text-gray-500">작업을 맡겨주신 고객님께는 상세한 청소 전후 사진을 보내드립니다. 현장에 계시지 않아도 결과를 확인하실 수 있습니다.</p>
              <Link href="#cases" className="mt-4 inline-block font-bold text-brand">쓰레기집청소 현장 사진 보기 →</Link>
            </section>
          )}

          {/* 6. 지역/예약/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">이사나 퇴실 날짜가 정해져 있다면 함께 말씀해 주세요. 정리와 청소를 언제까지 마쳐야 하는지 확인해 일정을 조율합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담할 때 다음 정보를 알려주시면 도움이 됩니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">비대면 진행 안내</h3>
              <p className="mt-2 text-[15.5px]">원하시면 비대면으로 진행할 수 있습니다. 출입 방법과 보관 물품, 작업 중 확인이 필요한 경우의 연락 방법을 미리 협의합니다.</p>
              <p className="mt-2 text-[15.5px]">현장에 계속 머무르기 어려우셔도 괜찮습니다. 전후 사진을 자세히 보내드리고, 작업 결과를 확인하실 수 있도록 안내합니다.</p>
              <p className="mt-2 text-[15px] text-gray-500">방문 시간이나 반출 과정에서 신경 쓰이는 부분도 미리 말씀해 주세요. 현장 조건 안에서 조율할 수 있는 방법을 확인하겠습니다.</p>
            </div>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <p>작업이 끝나면 협의한 처리 대상과 청소 범위를 기준으로 결과를 확인합니다.</p>
            <p className="mt-4">보관하기로 한 물품의 위치와 청소 상태, 손상이나 접근 제한으로 작업하지 못한 부분이 있는지 안내합니다.</p>
            <p className="mt-4">비대면 고객님은 전달받은 전후 사진을 확인하신 뒤 궁금한 부분이나 추가로 확인할 위치를 말씀해 주세요.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 확인이 필요한 사항은 위치와 사진, 발견한 상태를 전달해 주시면 기존 작업 범위와 현장 상태를 확인해 처리 방법을 안내합니다. 사후 접수 기간과 보완 조건은 계약 시 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
            <p>상담 전에 집을 먼저 치워두실 필요는 없습니다. 대신 남겨야 할 물건을 알려주시면 작업에 도움이 됩니다.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">직접 물건을 옮기기 어렵다면 무리해서 준비하지 마시고 현재 상태를 알려주세요.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="쓰레기집청소 자주 묻는 질문" />
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
              <p className="text-xl font-bold">쓰레기집청소 견적 문의</p>
              <p className="mt-3 text-white/80">집 상태를 어떻게 설명해야 할지 고민되시면, 정리가 필요한 공간과 가장 걱정되는 부분부터 말씀해 주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 수거·폐기물 처리·청소·소독·냄새 제거까지 포함한 견적을 안내합니다. 원하시면 비대면으로 진행하고, 상세한 전후 사진으로 작업 결과를 전달해드립니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>쓰레기집청소 견적 문의하기 →</CtaButton>
                <a href="tel:010-9882-8882" className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-base font-bold text-white hover:bg-white/10">
                  전화 상담: 010-9882-8882
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
