import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "상담 품목·작업 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["photos", "작업 전후 사진"],
  ["area", "지역·예약·비대면"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["수집·운반", "찐청소가 현장에서 직접 진행"],
  ["폐기물 처리", "협업 중인 처리업체와 연계"],
  ["견적 기준", "품목·물량, 필요한 인원·차량·장비, 반출·처리 조건"],
  ["청소", "반출 후 청소 요청 가능, 작업 범위와 비용 협의"],
  ["비대면 진행", "가능, 출입 방법과 처리 대상 사전 확인"],
  ["결과 확인", "상세한 작업 전후 사진 촬영·전달"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "품목의 종류와 수량",
  "크기와 무게, 전체 물량",
  "분류·분해가 필요한 정도",
  "필요한 작업 인원",
  "차량과 장비 사용 조건",
  "층수와 운반 거리, 반출 동선",
  "품목별 처리 비용",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "가구와 생활 집기",
    body: "장롱·침대·매트리스·소파·책상·의자 등 처리할 물품의 종류와 수량을 알려주세요.",
    note: "큰 물품은 대략적인 크기와 현재 놓인 위치, 분해 여부를 확인합니다. 서랍이나 수납공간 안에 남겨둘 물건이 있는지도 살펴주세요.",
    photoPairs: [["waste-site-01.webp", "waste-site-02.webp"]],
  },
  {
    title: "이사 후 남은 물품",
    body: "이사 후 남겨진 가구와 생활용품은 전체 모습과 주요 품목을 알려주세요.",
    note: "이삿짐과 처리할 물건이 섞이지 않도록 대상을 구분하고, 집을 비워야 하는 날짜도 함께 말씀해 주세요.",
    photoPairs: [["waste-bags-01.webp"]],
  },
  {
    title: "사무실과 매장 집기",
    body: "책상·의자·수납장·진열대 등 정리할 집기의 종류와 수량을 확인합니다.",
    note: "건물 내 작업 시간과 승강기 예약, 주차·상차 위치도 견적에 반영합니다. 서류나 저장장치가 있는 전자기기는 일반 집기와 구분해 알려주세요.",
    beforeAfter: [
      { label: "사무실 집기 반출", before: "waste-office-before.webp", after: "waste-office-after.webp" },
      { label: "매장 집기 반출", before: "waste-store-before.webp", after: "waste-store-after.webp" },
    ],
  },
  {
    title: "가전과 전자제품",
    body: "제품의 종류와 크기, 설치 상태를 알려주세요. 연결 해제나 탈거가 필요한 경우에는 작업 가능 여부와 포함 범위를 먼저 확인합니다.",
    note: "무료 수거나 중고 매입을 원하시는 경우에도 상담 시 말씀해 주세요. 폐기물처리와는 조건이 달라 별도 확인이 필요합니다.",
  },
  {
    title: "공사 잔여물과 별도 확인 품목",
    body: "공사·철거 잔여물, 액체류, 약품류, 출처나 성분을 알기 어려운 물품은 종류와 발생 경위를 먼저 알려주세요.",
    note: "일반 가구와 동일한 조건으로 처리하지 않으며, 취급 가능 여부와 필요한 처리 방식을 확인한 뒤 안내합니다.",
  },
  {
    title: "반출 후 청소",
    body: "폐기물을 반출한 뒤 남은 공간의 청소도 함께 진행할 수 있습니다.",
    note: "가구가 있던 자리의 먼지와 오염부터 공간 전체 청소까지, 필요한 구역을 알려주세요. 폐기물처리 비용과 요청하신 청소 범위를 구분해 견적을 안내합니다.",
  },
];

const extraCostItems = [
  "사진에 없던 물품이 추가되는 경우",
  "수납장이나 상자 안에도 처리할 물품이 들어 있는 경우",
  "사전에 확인되지 않은 분해·탈거 작업이 필요한 경우",
  "승강기를 사용할 수 없어 계단 운반이 필요한 경우",
  "차량을 가까이 세울 수 없어 운반 거리가 늘어나는 경우",
  "별도 장비가 필요한 경우",
  "청소 등 작업을 추가로 요청하는 경우",
];

const processSteps: [string, string][] = [
  ["사진과 품목 상담", "처리할 물품의 사진과 종류·수량을 확인합니다. 현재 놓인 위치와 층수도 함께 알려주세요."],
  ["현장 조건과 견적 확인", "출입문과 계단, 승강기, 주차·상차 위치를 확인합니다. 필요한 인원·차량·장비와 처리 비용을 반영해 견적을 안내합니다."],
  ["작업 전 사진 촬영과 대상 확인", "작업 전 상태를 촬영하고, 남겨둘 물품과 반출할 대상을 다시 확인합니다. 처리 여부가 정해지지 않은 물건은 구분합니다."],
  ["직접 수집·운반과 처리", "찐청소가 현장에서 직접 수집·운반합니다. 수집한 폐기물은 협업 중인 처리업체와 연계해 처리합니다. 추가 분해나 장비 사용이 필요해지는 경우에는 작업 내용을 먼저 안내합니다."],
  ["요청한 청소와 완료 확인", "청소를 함께 요청하셨다면 협의한 구역을 청소합니다. 작업 후 사진을 자세히 촬영해 보내드리고, 반출 결과와 청소 상태를 확인합니다."],
];

const resultChecklist = [
  "반출 전 물품과 공간 상태",
  "협의한 대상의 반출 결과",
  "남겨둔 물품과 공간 상태",
  "요청한 청소의 완료 상태",
];

const reservationChecklist = [
  "현장 주소와 층수",
  "처리할 품목과 수량",
  "물품 전체 사진",
  "승강기 사용 가능 여부",
  "차량 주차·상차 조건",
  "희망 날짜와 작업 가능한 시간",
];

const prepItems = [
  "남겨둘 물건과 처리할 대상을 구분해 주세요.",
  "서랍·수납장 안의 귀중품과 서류를 확인해 주세요.",
  "상자 안에 든 물품도 알려주세요.",
  "가구와 가전의 대략적인 크기를 알려주세요.",
  "주차와 승강기 예약이 필요한지 확인해 주세요.",
  "제품 연결 해제나 탈거가 필요한 경우 말씀해 주세요.",
  "비대면 진행 시 출입 방법과 연락처를 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["찐청소가 직접 수거하나요?", "네. 찐청소가 현장에서 직접 수집·운반하고, 협업 중인 폐기물 처리업체와 연계해 처리를 진행합니다."],
  ["폐기물처리 비용은 어떻게 정하나요?", "품목과 물량, 필요한 인원·차량·장비, 반출 동선과 처리 비용을 확인해 산정합니다. 같은 수량이라도 크기와 무게, 층수와 분해 여부에 따라 달라질 수 있습니다."],
  ["처리업체와 협업하면 비용에 어떤 도움이 되나요?", "품목과 물량에 맞춰 처리 조건을 조율할 수 있습니다. 현장 작업 비용과 처리 비용을 함께 확인해 비용 부담을 줄일 수 있도록 안내합니다."],
  ["가구 한두 개만 있어도 문의할 수 있나요?", "네. 품목과 위치를 알려주시면 소량 수거 가능 여부와 비용을 확인해 안내합니다."],
  ["집 안에 있는 물건도 꺼내주나요?", "실내 반출이 필요한 경우 현재 놓인 위치와 이동 경로를 알려주세요. 작업 가능 여부와 필요한 인원, 견적에 포함되는 범위를 확인합니다."],
  ["가구가 문을 통과하지 못하면 어떻게 하나요?", "분해가 가능한지, 다른 반출 방법이나 장비가 필요한지 확인합니다. 가구 크기와 출입문·계단 사진을 함께 보내주시면 상담에 도움이 됩니다."],
  ["승강기가 없는 건물도 가능한가요?", "층수와 물품의 크기·무게, 계단 구조를 확인해 작업 가능 여부와 비용을 안내합니다."],
  ["반출 후 청소도 맡길 수 있나요?", "네. 반출 후 청소도 함께 진행할 수 있습니다. 필요한 구역과 청소 내용을 알려주시면 폐기물처리 비용과 구분해 견적을 안내합니다."],
  ["비대면으로 맡길 수 있나요?", "네. 출입 방법과 처리 대상을 사전에 협의하면 비대면 진행이 가능합니다. 남겨둘 물건과 작업 중 확인할 연락처도 알려주세요."],
  ["작업 결과는 어떻게 확인하나요?", "작업 전후 사진을 자세히 촬영해 보내드립니다. 반출 결과와 함께, 청소를 요청하신 경우 해당 작업의 완료 상태도 확인하실 수 있습니다."],
];

const path = "/폐기물처리/";

export default function WasteDisposalLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "폐기물처리",
      serviceType: "폐기물처리·가구 수거",
      description: "찐청소는 폐기물을 직접 수집·운반하고 협업 처리업체와 연계해 처리합니다. 품목과 물량, 반출 조건에 따른 비용을 확인하세요. 반출 후 청소와 비대면 진행이 가능하며 상세한 전후 사진을 보내드립니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "폐기물처리", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>폐기물처리</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">특수청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">폐기물처리 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>이사하며 남은 가구, 사무실 정리 후 남은 집기, 혼자 옮기기 어려운 물품. 무엇부터 처리해야 할지 고민이라면 사진과 함께 알려주세요.</p>
            <p>찐청소는 현장에서 직접 수집·운반하고, 협업 중인 폐기물 처리업체와 연계해 처리를 진행합니다. 품목과 물량에 맞춰 처리 조건을 조율하고, 비용 부담을 줄일 수 있도록 견적을 안내합니다.</p>
            <p>반출 후 청소도 함께 요청하실 수 있습니다. 원하시면 비대면으로 진행하고, 작업 전후 사진을 자세히 촬영해 보내드립니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">폐기물처리 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="폐기물처리 비용과 견적 산정 기준" />
            <p>폐기물처리 비용은 품목과 물량, 필요한 인원·차량·장비, 반출 동선과 처리 비용을 기준으로 산정합니다.</p>
            <p className="mt-4">같은 장롱 한 개라도 1층 출입문 옆에 있는 경우와 승강기 없는 위층 방에 있는 경우는 작업량이 다릅니다. 문을 통과하지 못해 분해해야 한다면 그 작업도 고려해야 합니다.</p>
            <p className="mt-4">물건은 같아도 내려오는 길까지 같지는 않으니까요.</p>
            <p className="mt-4">찐청소는 평수만으로 가격을 정하지 않습니다. 실제 처리할 물품과 현장 조건을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-4">찐청소가 직접 수집·운반하고 협업 처리업체와 처리 조건을 조율해, 현장에 맞는 견적을 안내합니다.</p>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교하실 때는 실내 반출·분해·운반·최종 처리 중 어디까지 포함되는지 함께 확인해 주세요.</p>
          </section>

          {/* 2. 상담 품목/작업 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="폐기물처리 상담 품목과 작업 범위" />
            <p>처리할 품목과 발생 현장, 물량을 확인한 뒤 수거·처리 가능 여부를 안내합니다. 아래 품목도 크기와 상태, 현장 조건에 따라 확인이 필요합니다.</p>
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
                              <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 현장 사진 ${pairIndex + 1}`} width={960} height={720} className="h-full w-full object-contain" sizes="(min-width: 768px) 220px, 45vw" />
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
                              <Image src={`/images/portfolio-v2/${pair.before}`} alt={`${pair.label} 전`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
                            </div>
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.after}`} alt={`${pair.label} 후`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
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

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>협의한 물량이나 반출 조건이 달라지거나 추가 작업이 필요하면 견적이 변경될 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">변경이 필요한 이유와 작업 내용, 비용을 먼저 안내하고 협의합니다. 상담할 때 수납장과 상자 안에 담긴 물품까지 알려주시면 견적을 더 정확하게 안내할 수 있습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="폐기물처리 진행 순서와 소요 시간" />
            <p>상담 → 품목·현장 조건 확인 → 견적 협의 → 처리 대상 확인 → 직접 수집·운반 및 처리업체 연계 → 요청한 청소 → 사진 전달·완료 확인 순서로 진행합니다.</p>

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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 물량과 분해 여부, 운반 동선, 차량 작업 조건에 따라 달라집니다. 퇴실이나 공간 인도 시간이 정해져 있다면 미리 알려주세요.</p>
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>작업 전후 사진을 자세히 촬영해 보내드립니다. 현장에 계시지 않아도 처리 대상이 반출됐는지, 공간이 어떻게 정리됐는지 확인하실 수 있습니다.</p>
            <p className="mt-4">청소를 함께 맡기셨다면 해당 구역의 작업 결과도 전달합니다.</p>
            <ul className="mt-5 space-y-2.5">
              {resultChecklist.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">사진을 확인하신 뒤 궁금한 부분이나 추가로 확인할 위치를 말씀해 주세요.</p>
          </section>

          {/* 6. 지역/예약/비대면 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 처리할 품목, 희망 날짜를 알려주시면 작업 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">이사·퇴실·사무실 이전 일정이 있다면 완료가 필요한 날짜도 함께 말씀해 주세요.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-gray-500">건물에서 반출 시간이나 승강기 사용을 제한하는 경우에는 예약 전에 확인해 주세요.</p>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">비대면 진행 안내</h3>
              <p className="mt-2 text-[15.5px]">현장에 머무르기 어려우시면 비대면으로 맡기실 수 있습니다. 출입 방법과 처리할 물품, 남겨둘 물건을 사전에 확인합니다.</p>
              <p className="mt-2 text-[15.5px]">작업 중 확인이 필요한 경우 연락할 방법을 정하고, 완료 후 상세한 전후 사진을 보내드립니다.</p>
            </div>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="작업 완료 후 확인 및 사후 처리 기준" />
            <p>작업이 끝나면 협의한 처리 목록을 기준으로 반출 결과를 확인합니다.</p>
            <p className="mt-4">남겨둘 물건과 처리할 물건이 함께 있는 현장은 작업 전 구분이 중요합니다. 비대면으로 맡기시는 경우에도 사진이나 목록으로 대상을 확인합니다.</p>
            <p className="mt-4">누락된 대상이나 확인할 부분이 있으면 알려주세요. 기존 견적과 작업 범위를 확인해 안내합니다. 작업 완료 후 새로 추가되는 물품은 기존 누락과 구분해 상담합니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">처리 관련 증빙이 필요하다면 계약 전에 제공 가능한 자료와 발급 주체를 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="폐기물처리 전 준비사항" />
            <p>사진과 품목 목록을 준비해 주시면 상담에 도움이 됩니다. 무거운 물건을 미리 옮기거나 분해할 필요가 있는지는 상담 후 안내받아 주세요.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">컴퓨터나 저장장치 등을 처리할 때는 개인정보와 자료 정리 여부를 먼저 확인해 주세요. 기기 반출이 데이터 삭제까지 의미하지는 않습니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="폐기물처리 자주 묻는 질문" />
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
              <p className="text-xl font-bold">폐기물처리 견적 문의</p>
              <p className="mt-3 text-white/80">처리할 물품의 사진과 종류·수량, 현장 위치를 알려주세요. 층수와 승강기 여부도 함께 알려주시면 도움이 됩니다.</p>
              <p className="mt-2 text-white/80">찐청소가 직접 수집·운반하고, 협업 처리업체와 연계해 처리 비용을 안내합니다. 반출 후 청소도 함께 요청하실 수 있습니다.</p>
              <p className="mt-2 text-white/80">원하시면 비대면으로 진행하고, 상세한 전후 사진으로 작업 결과를 전달해드리겠습니다.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>폐기물처리 견적 문의하기 →</CtaButton>
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
