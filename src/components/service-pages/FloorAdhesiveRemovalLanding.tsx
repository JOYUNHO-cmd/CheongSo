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
  ["scope", "제거 범위·마감"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "바닥에 남은 본드와 접착제 잔여물"],
  ["작업 목적", "새 타일 시공 준비 / 기존 바닥 재사용"],
  ["기본 포함", "협의한 범위의 본드 제거와 마무리 세척"],
  ["별도 비용", "기존 바닥재 철거"],
  ["견적 기준", "작업 목적, 바닥 재질, 본드 상태, 필요한 인원·장비·약품"],
  ["사전 확인", "바닥재 철거 여부, 집기 유무, 후속 시공 일정"],
  ["서비스 지역·예약", "현장 위치와 사진을 기준으로 가능 여부 안내"],
];

const purposeOptions = [
  "본드를 제거한 뒤 새 타일을 시공할 예정",
  "본드를 제거한 기존 바닥을 그대로 사용할 예정",
];

const estimateChecklist = [
  "본드 제거 후 바닥 사용 목적",
  "작업 면적과 공간 구조",
  "바닥 재질과 기존 표면 상태",
  "본드의 두께, 굳은 정도, 분포",
  "기존 바닥재의 철거 여부",
  "모서리·계단 등 작업하기 어려운 구역",
  "가구와 집기 유무",
  "필요한 인원·장비·약품",
  "마무리 세척 범위와 후속 일정",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "새 타일을 깔기 위한 본드 제거",
    body: "새 타일을 시공하기 전에 남은 접착제를 정리하는 작업입니다. 시공 예정인 바닥재와 후속 업체가 요구하는 바탕면 상태를 먼저 알려주세요.",
    note: "겉으로 깨끗해 보이는 것과 후속 시공에 적합한 상태인지는 구분해서 확인해야 합니다. 접착제 제거 외에 평탄화나 균열 보수 등 별도 바탕 작업이 필요한지도 후속 시공 담당자와 맞춰두는 것이 좋습니다. 본드 제거를 맡겼다고 모든 바닥 보수와 새 타일 시공까지 포함되는 것은 아닙니다.",
    photoPairs: [["floor-site-work-01.webp", "floor-site-result-01.webp"], ["floor-residue-01.webp"], ["floor-carpet-01.webp"]],
  },
  {
    title: "기존 바닥을 다시 사용하기 위한 본드 제거",
    body: "카펫 등을 걷어낸 뒤 아래에 있던 바닥을 다시 사용하는 경우입니다. 남은 접착제와 끈적임, 표면 오염을 확인하고 마무리 세척에 더 세심하게 신경 씁니다.",
    note: "다만 본드 아래에 기존 흠집이나 변색, 코팅 손상이 있을 수 있습니다. 접착제를 제거하는 작업과 바닥을 새것처럼 복원하는 작업은 같지 않습니다. 기존 바닥을 살려 사용할 수 있는지와 어느 정도의 마감을 기대할 수 있는지는 현장 상태를 확인해 안내합니다.",
    photoPairs: [["floor-stairs-before.webp", "floor-stairs-work.webp"]],
  },
  {
    title: "마무리 세척은 기본 포함",
    body: "본드 제거 후 마무리 세척을 진행합니다. 기존 바닥 재사용이 목적이라면 실제로 드러내 사용할 표면이라는 점을 고려해 잔여물과 오염을 더 꼼꼼하게 확인합니다.",
    note: "세척이 포함된다고 해서 왁스코팅이나 광택 작업까지 자동으로 포함되는 것은 아닙니다.",
    photoPairs: [["floor-cleanup-01.webp", "floor-cleanup-02.webp"], ["floor-cleanup-03.webp", "floor-cleanup-04.webp"], ["floor-corner-01.webp", "floor-corner-02.webp"]],
  },
];

const separateScopeItems = [
  "카펫·타일 등 기존 바닥재 철거",
  "철거 폐기물 수거·처리",
  "무거운 가구와 집기의 이동",
  "바닥 균열·파손 보수와 평탄화",
  "별도 연마·광택·왁스코팅",
  "새 바닥재 시공",
];

const extraCostItems = [
  "새 타일 시공 준비에서 기존 바닥 재사용으로 목적이 변경되는 경우",
  "바닥재 철거 후 예상보다 두껍거나 여러 겹의 본드가 확인되는 경우",
  "처음에 없던 구역이나 계단의 작업을 추가하는 경우",
  "집기 이동이나 부분 철거가 추가로 필요한 경우",
  "가려져 있던 바닥 손상으로 별도 보수가 필요한 경우",
  "연마·광택·코팅 등 별도 마감을 요청하는 경우",
  "철거 폐기물 처리를 추가로 요청하는 경우",
];

const processFlow = ["사진·현장 상담", "바닥 사용 목적 확인", "바닥과 본드 상태 확인", "작업 범위·견적 협의", "본드 제거", "마무리 세척", "결과 확인과 후속 작업 안내"];

const processSteps: [string, string][] = [
  ["현재 상태와 사용 목적 상담", "현재 바닥재가 남아 있는지, 철거가 끝났는지 확인합니다. 새 타일을 시공할지, 기존 바닥을 다시 사용할지도 함께 알려주세요."],
  ["바닥과 본드 상태 확인", "접착제 상태와 바닥 재질, 기존 손상을 확인합니다. 필요하다면 일부 구역의 작업 반응을 확인할 수 있는지 협의해 제거 가능 범위와 표면 영향을 살펴봅니다."],
  ["작업 범위와 견적 협의", "작업 구역과 목표 마감을 정합니다. 철거·집기 이동·보수·코팅 등 별도 항목이 필요한지도 구분합니다."],
  ["본드 제거", "협의한 구역의 접착제를 제거합니다. 작업 중 가려진 손상이나 예상과 다른 접착 상태가 드러나면 추가 확인할 부분을 구분합니다."],
  ["마무리 세척", "본드 제거 후 남은 잔여물과 오염을 세척합니다. 기존 바닥을 재사용하는 현장은 노출될 표면의 마감 상태를 더 세심하게 확인합니다."],
  ["결과 확인", "작업 목적에 맞춰 접착제 잔여물과 표면 상태를 확인합니다. 다음 시공이나 공간 사용 전에 필요한 확인 사항도 함께 정리합니다."],
];

const caseChecklist = [
  "본드가 붙어 있던 바닥의 재질",
  "제거 전 접착제의 두께와 분포",
  "철거까지 진행한 현장인지",
  "새 바닥재 시공용인지, 기존 바닥 재사용용인지",
  "본드 제거와 세척 외에 별도 마감을 했는지",
  "기존 흠집과 변색이 어떻게 남았는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "대략적인 작업 면적",
  "바닥 재질 또는 현재 바닥 사진",
  "바닥재 철거 완료 여부",
  "본드 제거 후 사용 목적",
  "남아 있는 가구와 집기",
  "건물의 작업 가능 시간",
  "다음 시공이나 입주·영업 일정",
];

const checkupItems = [
  "합의한 구역의 본드 제거 여부",
  "모서리와 가장자리 등 작업 범위",
  "접착제 잔여물과 끈적임",
  "마무리 세척 상태",
  "기존 흠집·변색·코팅 손상",
  "별도 보수나 후속 마감이 필요한 부분",
];

const prepSections: [string, string][] = [
  ["제거 후 바닥 사용 목적을 알려주세요", "“이 위에 새 타일을 깔 예정입니다.” 또는 “아래에 있는 기존 바닥을 그대로 쓰고 싶습니다.” 이 차이가 작업 범위와 견적을 정하는 가장 중요한 출발점입니다. 아직 결정하지 못했다면 두 방향의 가능 범위부터 상담해 주세요."],
  ["바닥 전체와 본드 상태를 촬영해 주세요", "전체 공간 사진과 접착제가 가까이 보이는 사진을 함께 보내주세요. 부분 사진만으로는 전체 물량과 작업 동선을 확인하기 어렵습니다."],
  ["기존 손상과 사용한 제품을 알려주세요", "이미 있던 흠집이나 들뜸, 변색이 있다면 알려주세요. 직접 제거를 시도했다면 사용한 약품이나 작업 방법도 아는 범위에서 말씀해 주세요. 제품 이름이나 바닥 재질을 모르셔도 괜찮습니다. 모르는 내용을 추측해 적기보다 사진과 현재 상태를 전달해 주세요."],
  ["집기 이동 범위를 정해 주세요", "가구와 집기를 모두 비울 수 있는지, 일부 구역만 작업해야 하는지 확인해 주세요. 무거운 물건의 이동이 필요하면 별도 작업 여부를 협의합니다."],
  ["후속 시공 기준과 일정을 확인해 주세요", "새 타일을 시공할 예정이라면 후속 업체가 요구하는 바탕면 상태를 전달해 주세요. 평탄화나 보수처럼 본드 제거와 다른 작업이 필요한지도 미리 구분하면 좋습니다."],
];

const faqItems: [string, string][] = [
  ["바닥본드제거 비용은 평수로 정하나요?", "면적은 참고하지만 면적만으로 정하지 않습니다. 바닥 재질과 본드 상태, 필요한 인원·장비·약품, 제거 후 사용 목적을 함께 확인합니다."],
  ["새 타일을 깔 때와 기존 바닥을 다시 쓸 때 가격이 다른가요?", "달라질 수 있습니다. 기존 바닥을 그대로 사용하는 경우에는 드러나는 표면의 잔여물과 오염을 더 세심하게 확인하고 마무리해야 하므로 작업량이 달라집니다."],
  ["새 타일을 깔 예정이라면 본드를 대충 제거해도 되나요?", "아닙니다. 외관상 마감 목표가 다르다는 뜻이지 작업을 대충 한다는 뜻은 아닙니다. 후속 시공에 필요한 바탕면 기준을 확인하고 그에 맞는 작업 범위를 협의해야 합니다."],
  ["바닥재 철거도 기본에 포함되나요?", "아닙니다. 카펫이나 타일 등 기존 바닥재 철거는 기본 비용에 포함되지 않습니다. 필요한 경우 진행 가능 여부와 비용을 별도로 확인합니다."],
  ["본드 제거 후 세척도 해주시나요?", "네. 마무리 세척은 기본으로 진행합니다. 기존 바닥을 재사용할 때는 접착제 잔여물과 오염을 더 세심하게 확인하며 세척합니다."],
  ["카펫 아래의 기존 바닥을 살려 쓸 수 있나요?", "바닥 재질과 손상 상태, 접착 상태를 확인해야 합니다. 재사용을 목표로 상담할 수 있지만 모든 바닥을 원래 상태로 되돌릴 수 있다고 보장하지는 않습니다."],
  ["데코타일 사이로 올라온 본드도 철거 후 본드 제거와 같나요?", "타일을 유지한 채 표면 잔여물을 처리하는 경우와 바닥재를 철거한 뒤 바탕면의 본드를 제거하는 경우는 다릅니다. 타일 유지 여부와 현재 상태를 알려주시면 가능 범위를 확인합니다."],
  ["본드를 제거하면 흠집이나 변색도 없어지나요?", "반드시 그렇지는 않습니다. 접착제 잔여물과 바닥 자체의 흠집·변색은 다릅니다. 추가 보수나 마감이 필요한 부분이 있을 수 있습니다."],
  ["바닥 손상 없이 무조건 제거할 수 있나요?", "현장 확인 없이 무손상을 보장하기는 어렵습니다. 바닥과 기존 코팅, 접착 상태에 따라 작업 영향이 달라질 수 있어 적용 가능한 방법과 기대 결과를 먼저 확인합니다."],
  ["본드 제거에 샌딩이나 평탄화도 포함되나요?", "본드 제거에 사용할 방법과 별도의 바닥 보수·평탄화 공사는 구분해야 합니다. 견적에 어떤 작업이 포함되는지 사전에 확인해 주세요."],
  ["왁스코팅까지 포함되나요?", "아닙니다. 기본 포함은 협의한 본드 제거와 마무리 세척입니다. 왁스코팅이나 광택 등 추가 마감은 별도로 상담합니다."],
  ["작업이 끝나면 바로 새 타일을 깔 수 있나요?", "세척 후 상태와 건조, 사용할 자재의 시공 조건을 확인해야 합니다. 후속 시공 담당자와 필요한 바탕면 기준과 일정을 맞춰주세요."],
  ["사진만으로 견적을 받을 수 있나요?", "사진으로 상담할 수 있습니다. 다만 본드의 굳은 정도나 가려진 바닥 상태는 현장 확인이 필요해 최종 범위와 견적이 달라질 수 있습니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 작업 면적",
  "바닥 전체와 본드 근접 사진",
  "바닥재 철거 여부",
  "새 타일 시공 예정인지, 기존 바닥 재사용인지",
  "남아 있는 가구와 집기",
  "기존 손상이나 직접 제거를 시도한 이력",
  "희망 날짜와 후속 시공 일정",
];

const caseIds = ["floor-adhesive-02", "floor-adhesive-01", "floor-adhesive-03"] as const;
const path = "/바닥-본드-제거/";

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
      description: "바닥재를 걷어낸 뒤 본드와 끈적이는 접착제가 남았나요? 찐청소는 새 타일을 시공할 바탕인지 기존 바닥을 다시 사용할 것인지 먼저 확인합니다. 협의한 본드 제거와 마무리 세척은 기본이며, 바닥재 철거는 별도입니다.",
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

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg/floor-adhesive-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>바닥본드제거</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">바닥시공</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">데코타일·장판 철거 후 본드 제거, 바닥 사용 목적부터 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>바닥재를 걷어낸 뒤 본드와 끈적이는 접착제가 남았나요? 찐청소는 새 타일을 시공할 바탕인지 기존 바닥을 다시 사용할 것인지 먼저 확인합니다. 협의한 본드 제거와 마무리 세척은 기본이며, 바닥재 철거는 별도입니다.</p>
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
            <p>바닥본드제거 비용은 면적만으로 정하기 어렵습니다. 같은 크기의 공간이라도 본드의 두께와 굳은 정도, 바닥 재질, 작업 후 사용 목적에 따라 필요한 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 현장 상태와 마감 범위를 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">먼저, 제거 후 바닥을 어떻게 사용할지 확인합니다</h3>
            <p className="mt-2">상담할 때 아래 두 가지 중 어느 쪽인지 알려주세요.</p>
            <ul className="mt-3 space-y-2.5">
              {purposeOptions.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-gray-500">새 타일로 덮을 바탕면과 그대로 드러내 사용할 바닥은 결과를 확인하는 기준이 다릅니다. 기존 바닥을 재사용하려면 접착제 잔여물뿐 아니라 표면 오염과 마감 상태까지 더 세심하게 살펴야 하므로 비용이 달라질 수 있습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">본드 상태와 바닥 재질도 중요합니다</h3>
            <p className="mt-2">얇게 남은 접착제와 두껍게 굳은 본드는 작업량이 다릅니다. 바닥의 기존 코팅이나 손상 상태에 따라서도 적용할 수 있는 방법과 기대 결과가 달라집니다.</p>
            <p className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">철거비와 본드 제거비는 구분합니다</h3>
            <p className="mt-2">바닥재를 걷어내는 철거와, 그 아래 남은 접착제를 제거하는 작업은 서로 다릅니다. 찐청소의 바닥본드제거 기본 비용에는 바닥재 철거가 포함되지 않습니다. 철거도 필요하다면 상담 단계에서 함께 알려주세요.</p>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교하실 때는 철거, 본드 제거, 마무리 세척이 각각 어디까지 포함되는지 확인하는 것이 좋습니다.</p>
          </section>

          {/* 2. 제거 범위/마감 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="작업 목적에 따른 제거 범위와 마감" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">새 타일 시공 준비와 바닥 재사용은 마무리 기준이 다릅니다</h3>
            <p className="mt-2 mb-6">새 마감 시공을 위한 제거는 후속 시공에 필요한 바탕 조건을 협의합니다. 기존 바닥을 재사용하는 경우에는 노출될 표면과 잔흔을 더 살펴 마무리 세척까지 신경 씁니다. 본드 종류와 바닥 재질, 제거 목적에 따라 비용이 달라질 수 있습니다.</p>
            <p>찐청소는 작업 목적에 맞춰 본드 제거 범위를 정하고, 마무리 세척까지 진행합니다. 새 타일 시공용과 기존 바닥 재사용용 모두 세척은 기본에 포함됩니다.</p>
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
                              <Image src={`/images/portfolio-v2/${photo}`} alt={`${item.title} 실제 현장 사진 ${pairIndex + 1}`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 font-bold text-brand-dark">별도로 확인할 작업</p>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">필요한 항목이 있다면 진행 가능 여부와 비용을 별도로 확인해 주세요.</p>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>견적은 처음 확인한 바닥 상태와 작업 목적을 기준으로 정합니다. 작업 범위나 마감 목표가 달라지면 비용도 조정될 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">마무리 세척 자체는 기본 포함 항목입니다. 다만 세척을 넘어서는 바닥 보수나 별도 마감 공사는 구분해서 확인해야 합니다. 견적 상담 때 제거 후 바닥 사용 목적을 정확히 알려주시면, 처음부터 필요한 범위를 맞추는 데 도움이 됩니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="본드 제거 진행 순서와 소요 시간" />
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
                    <p className="mt-1">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <p className="mt-2">본드의 상태, 바닥 재질, 면적, 집기와 장애물, 마감 목표에 따라 달라집니다. 같은 면적이라도 재사용을 위한 마무리에는 더 많은 작업이 필요할 수 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 종료 시점과 세척 후 건조, 다음 공정을 시작할 시점은 구분해야 합니다. 타일 시공이나 영업 재개 일정이 있다면 상담 시 먼저 알려주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <p>바닥본드제거 사례는 작업 전후 모습과 함께 제거 목적을 확인하는 것이 중요합니다.</p>
            <p className="mt-4">새 타일을 깔기 위한 바탕면 작업과 기존 바닥을 다시 쓰기 위한 작업은 같은 기준으로 비교하기 어렵습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">사례를 볼 때 확인할 내용</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">완료 사진이 필요하면 촬영할 구역과 전달 방법을 상담 시 협의해 주세요. 사진상 깨끗해 보이는 것만으로 끈적임이나 표면 상태를 모두 판단할 수는 없습니다. 현장 검수에서는 사진과 함께 실제 마감 상태를 확인하는 것이 좋습니다.</p>
            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다. 바닥 전체 사진과 본드가 가까이 보이는 사진을 함께 보내주시면 상담에 도움이 됩니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담 시 필요한 정보</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">철거가 아직 끝나지 않았어도 상담할 수 있나요?</h3>
            <p className="mt-2">네. 현재 상태로 상담할 수 있습니다. 다만 바닥재 아래의 본드 상태는 철거 후에야 확인할 수 있어, 최종 범위와 견적에 추가 확인이 필요할 수 있습니다. 철거가 필요하다는 사실도 미리 알려주세요. 철거는 기본 본드 제거 비용에 포함되지 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">다른 시공 일정과 맞출 수 있나요?</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <p className="text-[15.5px]">희망 일정을 알려주시면 가능한 작업 시간을 확인합니다. 본드 제거와 세척 후 다음 공정에 필요한 상태를 후속 시공 담당자와 미리 협의하면 일정 조율에 도움이 됩니다.</p>
              <p className="mt-2 text-[15.5px]">본드 제거가 끝난 즉시 모든 바닥재를 시공할 수 있다고 일괄적으로 약속드리지는 않습니다.</p>
            </div>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 문의" />
            <p>검수는 처음 정한 바닥 사용 목적과 작업 범위를 기준으로 진행합니다.</p>
            <p className="mt-4">새 타일 시공을 준비한 경우에는 후속 시공에 앞서 협의한 바탕면 상태인지 확인합니다. 기존 바닥을 재사용하는 경우에는 접착제 잔여물과 세척 상태, 남아 있는 표면 흔적을 함께 살펴봅니다.</p>
            <p className="mt-5 font-bold text-brand-dark">주요 검수 항목</p>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5">청소로 제거할 오염과 바닥 자체의 손상은 구분해야 합니다. 본드를 제거한다고 해서 기존 바닥의 모든 흔적이 사라지는 것은 아닙니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 궁금한 부분이 있다면 해당 위치와 상태를 알려주세요. 재확인과 사후 처리 범위·기간은 계약 시 확인하시기 바랍니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
            <div className="mt-4 space-y-5">
              {prepSections.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  <p className="mt-2">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="자주 묻는 질문" />
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
              <p className="mt-3 text-white/80">본드가 잘 떨어지는지 직접 시험해 보고 문의하실 필요는 없습니다. 현재 바닥 사진과 제거 후 사용 목적부터 알려주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 바닥을 어떻게 사용할지에 맞춰 본드 제거 범위와 비용을 안내합니다. 마무리 세척은 기본으로 진행하며, 기존 바닥 재사용 시에는 더 세심하게 마감합니다. 철거와 별도 보수·코팅은 구분해 확인하세요.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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
