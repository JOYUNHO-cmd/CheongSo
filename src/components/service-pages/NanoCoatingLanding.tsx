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
  ["scope", "시공 대상·범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인·관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["전문 대상", "포세린타일 바닥"],
  ["진행하지 않는 대상", "유리, 거울, 수전, 싱크볼, 상판 등 다른 부위"],
  ["사전 확인", "타일 제품과 표면 마감, 오염 상태, 기존 코팅 여부"],
  ["작업 범위", "필요한 세척과 표면 정리, 코팅 범위를 사전 협의"],
  ["견적 기준", "필요한 인원, 장비·약품, 작업 면적, 오염과 집기 상태"],
  ["일정 확인", "시공 시간과 보행·가구 반입·물 사용 가능 시점을 구분"],
  ["예약 문의", "현장 위치와 바닥 사진, 희망 일정을 기준으로 상담"],
];

const estimateChecklist = [
  "타일 제조사와 제품 정보",
  "표면의 질감과 기존 마감 상태",
  "실제 작업할 구역과 면적",
  "얼룩·기름때·생활 오염의 상태",
  "기존 코팅이나 관리제 사용 여부",
  "필요한 세척과 표면 정리 범위",
  "가구·집기의 양과 이동 가능 여부",
  "적용할 제품과 시공 계획",
  "작업 가능 시간과 사용 재개 일정",
];

const includedCheckItems = [
  "코팅 전 세척과 오염 제거",
  "기존 코팅이나 관리제 제거",
  "코팅할 구역과 제외할 구역",
  "집기 이동과 원위치 배치",
  "건조와 사용 안내",
  "줄눈 관련 작업 여부",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "포세린타일이라고 모두 같은 표면은 아닙니다",
    body: "같은 포세린타일이라도 제품별 질감과 표면 처리가 다를 수 있습니다. 타일 제조사의 관리 기준과 적용할 코팅 제품의 적합성을 확인해야 합니다.",
    note: "모든 포세린타일에 나노코팅이 꼭 필요하다고 안내하지 않습니다. 세척으로 해결할 수 있는 상태인지, 추가 코팅을 권하지 않는 제품인지부터 구분합니다.",
    photoPairs: [["nano-entry-01.webp", "nano-entry-02.webp"], ["nano-entry-03.webp", "nano-entry-04.webp"]],
  },
  {
    title: "기존 오염 확인과 세척",
    body: "코팅은 이미 생긴 얼룩을 지우는 작업을 대신하지 않습니다. 기존 오염을 어디까지 제거할 수 있는지 확인하고, 필요한 세척과 표면 정리 범위를 협의합니다.",
    note: "닦아도 남는 흔적이라고 해서 모두 타일 안으로 스며든 오염인 것은 아닙니다. 표면 잔여물인지, 오염인지, 자재 손상인지 확인하는 과정이 필요합니다.",
    photoPairs: [["nano-clean-01.webp", "nano-clean-02.webp"], ["nano-clean-03.webp", "nano-clean-04.webp"]],
  },
  {
    title: "포세린타일 바닥 나노코팅",
    body: "적용 가능한 바닥에 제품 기준에 맞춰 코팅을 진행합니다. 코팅은 표면의 오염 관리를 돕기 위한 선택지가 될 수 있지만, 실제 효과와 관리 조건은 타일과 제품에 따라 달라집니다.",
    note: "‘나노’라는 이름만으로 방수·항균·미끄럼 방지·흠집 방지 성능이 모두 보장되는 것은 아닙니다. 필요한 성능이 있다면 해당 제품의 자료와 적용 조건을 따로 확인해야 합니다.",
    photoPairs: [["nano-result-01.webp", "nano-result-02.webp"], ["nano-result-03.webp", "nano-result-04.webp"]],
  },
  {
    title: "무광 느낌과 색감 확인",
    body: "포세린타일의 자연스러운 질감을 유지하고 싶다면 상담할 때 알려주세요. 코팅 후 광택이나 색감 변화 가능성은 제품과 바닥 상태를 기준으로 확인합니다.",
    note: "무조건 번쩍이게 만들거나, 반대로 어떤 바닥에서도 외관이 전혀 변하지 않는다고 약속하지 않습니다. 필요하다면 작은 구역이나 여분 타일에서 마감 상태를 확인할 수 있는지도 협의합니다.",
  },
  {
    title: "줄눈 작업은 구분해서 확인합니다",
    body: "타일 표면 코팅과 줄눈 세척·보수·재시공은 서로 다른 작업입니다. 줄눈이 더럽거나 갈라진 부분이 있다면 함께 알려주세요.",
    note: "타일 바닥을 코팅한다고 줄눈 교체나 방수 보수까지 자동으로 포함되는 것은 아닙니다.",
  },
];

const notServicedItems = [
  "샤워부스 유리와 거울",
  "수전과 싱크볼",
  "세면대와 변기",
  "주방 상판",
  "기타 포세린타일 바닥 외 부위",
];

const separateScopeItems = [
  "기존 코팅 제거",
  "본드·페인트 등 특수 오염 제거",
  "줄눈 세척·보수·재시공",
  "타일 균열·들뜸·파손 보수",
  "무거운 집기 이동",
  "누수·방수 공사",
];

const extraCostItems = [
  "사진에 보이지 않던 오염이 확인되는 경우",
  "이전 코팅이나 관리제 제거가 필요한 경우",
  "본드·페인트·시공 잔여물 등의 제거를 추가하는 경우",
  "처음에 없던 공간의 코팅을 요청하는 경우",
  "이동할 가구나 집기가 늘어나는 경우",
  "줄눈이나 타일 보수를 별도로 요청하는 경우",
  "구역을 나누면서 추가 방문이 필요한 경우",
];

const processFlow = ["사진·현장 상담", "타일과 기존 오염·마감 확인", "시공 가능 여부와 범위 협의", "필요한 세척·표면 정리", "바탕 상태와 건조 확인", "코팅 시공", "제품 기준에 따른 건조·경화", "검수와 관리 안내"];

const processSteps: [string, string][] = [
  ["관리가 어려운 부분 확인", "걸레질 후 자국이 남는지, 음식물 얼룩이 신경 쓰이는지, 통행이 많은 구역이 더러워지는지 알려주세요. 불편한 원인을 확인해야 세척과 코팅 중 필요한 작업을 판단할 수 있습니다."],
  ["적용 가능 여부와 마감 협의", "타일 제품과 기존 표면 상태를 확인합니다. 원하는 외관과 사용 환경에 맞는 작업인지, 남을 수 있는 흔적이 있는지도 함께 살펴봅니다."],
  ["필요한 세척과 표면 정리", "협의한 범위의 오염과 잔여물을 정리합니다. 코팅을 적용할 수 있는 바탕 상태와 건조 조건을 확인합니다."],
  ["코팅과 건조", "적용 제품의 기준에 맞춰 시공합니다. 작업 중과 건조 중에는 해당 구역의 출입과 물 사용을 제한할 필요가 있습니다."],
  ["결과 확인과 사용 안내", "마감 상태와 협의한 작업 범위를 확인합니다. 보행, 집기 배치, 물 사용과 일상 청소를 언제 시작할 수 있는지 구분해 안내받으세요."],
];

const timingChecklist = [
  "제한적으로 걸어도 되는 시점",
  "가구와 집기를 다시 놓을 시점",
  "평소처럼 생활하거나 영업할 시점",
  "물을 사용하거나 물걸레질할 시점",
  "러그와 매트를 다시 놓을 시점",
];

const caseChecklist = [
  "내 현장과 비슷한 표면 질감인지",
  "기존 오염과 손상 상태가 어떠했는지",
  "세척과 코팅 중 어떤 공정을 진행했는지",
  "비슷한 조명과 위치에서 비교한 사진인지",
  "광택과 색감이 원하는 방향인지",
  "별도의 줄눈이나 타일 보수를 했는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "대략적인 작업 면적",
  "타일 제조사·제품명 또는 바닥 사진",
  "오염이 잘 보이는 근접 사진",
  "이전 코팅이나 관리제 사용 여부",
  "가구·집기 유무와 이동 가능 여부",
  "희망 작업일",
  "입주·가구 반입·영업 재개 일정",
];

const checkupItems = [
  "합의한 구역의 작업 여부",
  "가장자리와 집기 주변의 마감 범위",
  "도포 자국이나 뭉침 등 확인이 필요한 부분",
  "남아 있는 기존 얼룩과 자재 손상",
  "광택과 색감의 변화",
  "출입과 물 사용 가능 시점",
  "사용할 수 있는 세정제와 청소 도구",
];

const prepSections: [string, string][] = [
  ["가장 불편한 점을 알려주세요", "“닦고 나면 자국이 보여요.” “주방 쪽 바닥만 때가 잘 타요.” “무광 느낌은 유지하면서 관리가 편했으면 좋겠어요.” 이처럼 현재 불편한 점과 원하는 결과를 알려주시면 상담에 도움이 됩니다."],
  ["타일과 기존 관리 이력을 알려주세요", "제품 정보가 있으면 전달해 주세요. 이전에 코팅하거나 왁스·광택제 등을 사용한 적이 있다면 함께 말씀해 주세요. 정확히 모르셔도 괜찮습니다. 사진과 현재 상태부터 확인하겠습니다."],
  ["기존 손상과 줄눈 상태를 알려주세요", "갈라진 타일, 들뜬 부분, 손상된 줄눈이 있다면 따로 알려주세요. 코팅과 보수는 다른 작업이므로 필요한 범위를 구분해야 합니다."],
  ["가구 이동과 출입 계획을 정해 주세요", "이동할 물건과 그대로 둘 집기를 구분해 주세요. 작업 중 꼭 사용해야 하는 공간이 있다면 일정과 동선을 먼저 협의합니다."],
  ["사용 재개 일정을 함께 알려주세요", "코팅 날짜뿐 아니라 다음 생활·영업 일정과 물 사용 계획도 알려주세요. 아이와 반려동물이 생활하는 공간이라면 작업 중 출입과 사용 재개 조건도 함께 확인합니다."],
];

const faqItems: [string, string][] = [
  ["찐청소는 어디에 나노코팅을 하나요?", "포세린타일 바닥을 전문으로 진행합니다. 욕실 유리, 거울, 수전, 싱크볼, 상판 등 다른 부위의 나노코팅은 진행하지 않습니다."],
  ["포세린타일이면 반드시 코팅해야 하나요?", "아닙니다. 타일 제품과 기존 표면 상태, 제조사 관리 기준을 확인해야 합니다. 세척으로 해결할 수 있는 상태인지, 추가 코팅이 적합한지부터 판단합니다."],
  ["이미 생긴 얼룩도 코팅하면 없어지나요?", "코팅 자체가 얼룩 제거를 대신하지는 않습니다. 먼저 오염을 어디까지 제거할 수 있는지 확인하고 필요한 세척과 표면 정리를 협의해야 합니다."],
  ["코팅 전 청소도 기본 비용에 포함되나요?", "현장별 견적에서 세척과 오염 제거 범위를 확인해 주세요. 기존 코팅 제거나 특수 오염 처리까지 모두 포함된 것으로 보시면 안 됩니다."],
  ["나노코팅과 바닥왁스코팅은 어떻게 다른가요?", "사용하는 제품과 적용 대상, 표면에 작용하는 방식, 관리 조건을 확인해야 합니다. 이름만으로 성능을 단정하거나 같은 공정으로 보지 않습니다. 찐청소의 나노코팅 상담 대상은 포세린타일 바닥입니다."],
  ["무광 타일이 번쩍이게 바뀌나요?", "적용 제품과 바닥 상태에 따라 달라집니다. 원하는 질감과 광택을 먼저 알려주시고, 외관 변화 가능성과 확인 방법을 상담해 주세요."],
  ["코팅하면 때가 전혀 안 타나요?", "아닙니다. 표면 관리를 돕는 목적이지만 모든 오염을 막거나 청소가 필요 없어지는 것은 아닙니다. 효과와 관리 조건은 제품과 현장에 따라 달라집니다."],
  ["미끄럼 방지도 되나요?", "나노코팅이라는 명칭만으로 미끄럼 방지 성능을 보장할 수는 없습니다. 해당 성능이 필요하다면 제품 자료와 실제 사용 조건을 따로 확인해야 합니다."],
  ["방수나 누수 해결도 가능한가요?", "표면 코팅을 건물의 방수 공사나 누수 수리와 같은 의미로 보시면 안 됩니다. 균열, 줄눈, 방수층이나 배관 문제는 별도로 확인해야 합니다."],
  ["줄눈도 함께 코팅하거나 교체하나요?", "타일 표면과 줄눈은 구분해서 작업 범위를 확인해야 합니다. 줄눈 세척·보수·재시공이 자동으로 포함되는 것은 아닙니다."],
  ["흠집이나 깨진 타일도 복원되나요?", "나노코팅은 파손이나 깊은 흠집을 수리하는 작업이 아닙니다. 별도 보수나 교체가 필요한 부분은 구분해 확인합니다."],
  ["아이나 반려동물이 있어도 바로 생활할 수 있나요?", "적용 제품의 사용 조건과 건조·경화 안내를 확인해야 합니다. 즉시 사용 가능이나 무해를 일괄적으로 약속하지 않으며, 출입과 생활 재개 시점을 사전에 협의합니다."],
  ["시공 후 바로 물걸레질할 수 있나요?", "제품과 현장 조건에 맞는 시작 시점을 확인해야 합니다. 겉이 말랐다는 이유만으로 바로 물을 사용하거나 청소하지 마세요."],
  ["얼마나 오래 유지되나요?", "제품, 바탕 상태, 통행량과 관리 방법에 따라 달라집니다. 상담 시 예상 관리 주기와 사후 처리 기준을 함께 확인해 주세요."],
  ["가구가 있는 상태에서도 가능한가요?", "이동 가능한 집기와 작업 구역, 출입 동선을 확인해야 합니다. 가구 이동 범위와 비용도 사전에 협의합니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 작업 면적",
  "타일 전체와 오염 구역 사진",
  "타일 제조사·제품 정보",
  "이전 코팅이나 관리제 사용 이력",
  "가구·집기 유무",
  "원하는 광택과 질감",
  "희망 작업일과 사용 재개 일정",
];

const caseIds = ["floor-tile-01"] as const;
const path = "/나노코팅/";

export default function NanoCoatingLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "나노코팅",
      serviceType: "포세린타일 나노코팅",
      description: "찐청소는 포세린타일 바닥 나노코팅을 전문으로 진행합니다. 기존 오염과 표면 상태를 확인해 세척·코팅 범위, 비용, 건조와 사용 재개 일정을 안내합니다. 유리·수전·상판 등 다른 부위는 시공하지 않습니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "나노코팅", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/nano-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>나노코팅</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">바닥시공</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">포세린타일 나노코팅, 바닥 관리의 불편함부터 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>물걸레질을 해도 얼룩이 남거나, 자주 다니는 부분만 유난히 때가 타 보이나요? 포세린타일의 차분한 느낌은 좋은데 관리가 생각보다 번거로워 코팅을 고민하실 수 있습니다.</p>
            <p>찐청소는 포세린타일 바닥 나노코팅을 전문으로 진행합니다. 욕실 유리나 수전, 주방 상판 등 다른 부위의 나노코팅은 진행하지 않습니다.</p>
            <p>먼저 현재 바닥에 남은 것이 오염인지, 세정제나 기존 코팅의 흔적인지 확인합니다. 그다음 타일에 코팅을 적용할 수 있는지, 어떤 변화를 기대할 수 있는지 안내하겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">포세린타일 나노코팅 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="포세린타일 나노코팅 비용과 견적 기준" />
            <p>포세린타일 나노코팅 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 기존 오염, 표면 마감, 코팅 이력과 집기 유무에 따라 필요한 준비 작업이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업 범위를 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">코팅 전에 바닥 상태를 확인합니다</h3>
            <p className="mt-2">새 타일이라고 해서 준비 작업이 모두 같지는 않습니다. 시공 잔여물이나 오염이 남아 있을 수 있고, 사용하던 바닥에는 세정제나 관리제의 흔적이 있을 수 있습니다.</p>
            <p className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">넓이뿐 아니라 작업 여건도 반영합니다</h3>
            <p className="mt-2">바닥이 비어 있는 공간과 테이블·진열장 등이 많은 공간은 작업 동선이 다릅니다. 가구를 옮겨 전체를 작업할지, 고정 집기를 제외하고 진행할지도 견적에 영향을 줍니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">같은 평수라는 이유만으로 같은 작업량이라고 보지 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">세척과 코팅이 어디까지 포함되는지 확인하세요</h3>
            <p className="mt-2">견적 상담에서는 다음 항목을 구분해 확인해 주세요.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">&lsquo;나노코팅&rsquo;이라는 서비스명만으로 모든 세척과 보수 작업이 포함된다고 보기는 어렵습니다. 현장에 필요한 공정과 포함 비용을 먼저 맞추는 것이 중요합니다.</p>
          </section>

          {/* 2. 시공 대상/범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="시공 대상과 세척·코팅 범위" />
            <p>찐청소의 나노코팅 대상은 포세린타일 바닥입니다. 다른 부위까지 묶어서 시공하는 서비스가 아니라, 바닥 상태와 사용 환경에 집중해 상담합니다.</p>
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

            <p className="mt-6 font-bold text-brand-dark">진행하지 않는 대상</p>
            <ul className="mt-3 space-y-2.5">
              {notServicedItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 font-bold text-brand-dark">별도로 범위를 확인할 작업</p>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>견적은 처음 확인한 바닥 상태와 협의한 공정을 기준으로 정합니다. 실제 오염이나 작업 조건이 다르면 추가 작업이 필요할 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">코팅 전 세척과 기존 코팅 제거가 견적에 각각 어디까지 포함되는지 확인해 주세요. 작업 중 변경이 필요할 때 비용과 일정을 협의할 방법도 미리 정하는 것이 좋습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="진행 순서와 건조·사용 재개 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[15px] text-gray-500">구체적인 공정과 도포 횟수는 적용할 제품과 현장 상태에 따라 정합니다.</p>

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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">겉이 말랐다고 모든 사용이 가능한 것은 아닙니다</h3>
            <p className="mt-2">제품과 온도·습도·환기 등 현장 조건에 따라 필요한 시간이 달라집니다. 잠깐 걷는 것과 가구를 옮기거나 물걸레질하는 것은 다른 사용 조건입니다.</p>
            <p className="mt-4 font-bold text-brand-dark">다음 시점을 각각 확인해 주세요.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {timingChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 종료 시간뿐 아니라 실제 사용 재개 시간까지 함께 계획하는 것이 중요합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <p>포세린타일 코팅 사례를 볼 때는 &lsquo;얼마나 반짝이는가&rsquo;보다 어떤 바닥에 어떤 작업을 했는지 확인하는 것이 좋습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">사례에서 확인할 내용</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">세척으로 깨끗해진 변화와 코팅의 효과는 구분해서 봐야 합니다. 작업 직후 사진만으로 장기간의 오염 저항성이나 유지 기간까지 판단할 수는 없습니다. 물방울이 맺히는 모습도 하나의 표면 특성일 뿐, 모든 오염이 남지 않거나 청소가 필요 없다는 증거는 아닙니다. 사진 기록이 필요하다면 촬영 구역과 전달 방법을 상담 시 협의해 주세요.</p>
            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 바닥 사진, 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담 시 필요한 정보</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">입주 전에 작업하고 싶다면</h3>
            <p className="mt-2">다른 공사가 남아 있는지, 청소와 가구 반입 일정은 언제인지 알려주세요. 코팅 전 바탕 준비와 시공 후 건조 시간을 고려해 순서를 협의합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">새집이라는 이유만으로 세척과 상태 확인 없이 바로 코팅할 수 있다고 단정하지 않습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">거주 중이거나 영업 중인 공간이라면</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <p className="text-[15.5px]">작업 구역을 비울 수 있는지와 출입 제한이 가능한지 먼저 확인합니다. 부분 작업이 가능한지, 전체 공간을 비워야 하는지는 현장 조건에 따라 달라집니다.</p>
              <p className="mt-2 text-[15.5px]">주방이나 출입문으로 가는 길이 작업 구역과 겹친다면 미리 알려주세요.</p>
            </div>
          </section>

          {/* 7. 검수/관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 관리 방법" />
            <p>검수는 협의한 구역과 마감 계획을 기준으로 진행합니다. 외관뿐 아니라 사용 안내와 관리 방법까지 함께 확인해 주세요.</p>
            <p className="mt-5 font-bold text-brand-dark">주요 검수 항목</p>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">코팅 후에도 일상 청소는 필요합니다</h3>
            <p className="mt-2">코팅은 청소 부담을 줄이기 위한 선택이지, 청소를 없애는 작업은 아닙니다. 쏟은 음식물이나 오염은 제품의 관리 안내에 따라 정리해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">&ldquo;이제 청소는 졸업이네요&rdquo;까지 약속드리지는 않습니다. 대신 어떤 관리가 필요한지 구체적으로 안내받는 것이 오래 사용하는 데 도움이 됩니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">사용 제품에 맞는 관리 기준을 확인하세요</h3>
            <p className="mt-2">일상 청소를 시작할 시점과 적합한 세정제·도구를 확인해 주세요. 강한 세정제나 연마 도구, 스팀청소기 등을 사용하려면 타일과 코팅 제품에 적합한지 먼저 확인하는 것이 좋습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">임의로 다른 왁스나 광택제를 덧바르기 전에도 함께 사용할 수 있는지 문의해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">유지 기간은 사용 환경에 따라 달라집니다</h3>
            <p className="mt-2">통행량, 의자와 집기 이동, 오염 종류, 청소 방식에 따라 표면 상태가 달라집니다. 제품과 현장을 확인하지 않고 일정한 유지 기간이나 재시공 주기를 약속하지 않습니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">사후 문의와 재확인의 범위·기간은 계약 시 확인하시기 바랍니다.</p>
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
              <p className="text-xl font-bold">포세린타일 나노코팅 견적 문의</p>
              <p className="mt-3 text-white/80">코팅이 필요한지부터 상담하셔도 괜찮습니다. 바닥 전체 사진과 오염이 잘 보이는 사진, 현재 불편한 점을 알려주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 포세린타일 바닥 나노코팅을 전문으로 진행합니다. 현재 오염을 정리하는 작업과 이후 관리를 위한 코팅을 구분하고, 내 바닥에 적합한 범위와 비용을 안내하겠습니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>포세린타일 나노코팅 견적 문의하기 →</CtaButton>
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
