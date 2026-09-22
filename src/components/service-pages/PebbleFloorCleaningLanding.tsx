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
  ["scope", "청소 범위·바닥 상태"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인·관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "카페·매장·상가 등 콩자갈 바닥의 오염 청소"],
  ["사전 확인", "자갈 고정 상태, 기존 마감, 오염과 손상 여부"],
  ["작업 범위", "협의한 구역의 오염 제거와 마무리 정리"],
  ["견적 기준", "필요한 인원, 장비·약품, 작업 면적, 오염과 현장 조건"],
  ["물 사용 확인", "실내외 구분, 바탕 구조, 급수·배수와 회수 여건"],
  ["별도 확인", "집기 이동, 기존 코팅 제거, 자갈 보수·재시공"],
  ["일정 안내", "세척 시간과 건조·사용 재개 시간을 구분"],
];

const estimateChecklist = [
  "청소할 구역과 실제 면적",
  "자갈 사이의 틈과 표면 마감 상태",
  "먼지, 찌든 때, 음식물 등 오염 종류",
  "기존 코팅이나 표면 처리 여부",
  "자갈 탈락, 균열, 들뜸 등 손상",
  "가구·집기의 양과 이동 가능 여부",
  "급수·배수와 물 회수 여건",
  "전원과 장비 진입 조건",
  "작업 가능 시간과 영업 재개 일정",
];

const includedCheckItems = [
  "바닥 오염 세척",
  "가장자리와 집기 주변 작업",
  "물기·세척 잔여물 정리",
  "집기 이동",
  "기존 코팅 제거",
  "자갈 보수나 별도 마감",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "자갈 사이의 먼지와 이물질",
    body: "표면과 틈새에 남은 먼지·이물질을 확인하고, 현장에 맞는 제거 방법을 정합니다. 틈이 드러난 바닥인지, 충전이나 코팅으로 표면이 마감된 바닥인지도 함께 살펴봅니다.",
    note: "겉면의 색이 밝아졌다는 이유만으로 보이지 않는 모든 부분까지 완전히 세척되었다고 단정하지 않습니다. 접근할 수 있는 범위와 확인이 어려운 부분을 구분합니다.",
    photoPairs: [["pebble-dust-01.webp", "pebble-dust-02.webp"], ["pebble-dust-03.webp", "pebble-dust-04.webp"]],
  },
  {
    title: "찌든 때와 동선 오염",
    body: "출입구와 계산대 앞, 통행이 많은 구역의 오염을 확인합니다. 반복해서 밟힌 오염과 자재 자체의 마모·변색은 구분해야 합니다.",
    note: "청소로 달라질 수 있는 부분과 남을 수 있는 흔적을 상담합니다.",
    photoPairs: [["pebble-traffic-01.webp", "pebble-traffic-02.webp"], ["pebble-traffic-03.webp", "pebble-traffic-04.webp"]],
  },
  {
    title: "음료·음식물·기름 오염",
    body: "오염된 위치와 발생 시점, 이전에 사용한 세정제를 알려주세요. 오염 종류와 바닥 상태에 따라 제거 가능 범위가 달라집니다.",
    note: "오래된 얼룩이나 재료 자체의 변색은 세척만으로 원래 색으로 돌아오지 않을 수 있습니다. 냄새가 있다면 바닥 오염과 관련된 것인지도 따로 확인해야 합니다.",
  },
  {
    title: "가장자리와 집기 주변",
    body: "벽면과 만나는 가장자리, 테이블·진열장 주변 등 필요한 구역을 협의합니다. 집기를 옮겨야 접근할 수 있는 부분은 이동 여부와 담당 범위를 먼저 정합니다.",
    note: "고정 집기 아래나 접근할 수 없는 구역까지 자동으로 청소되는 것은 아닙니다.",
    photoPairs: [["pebble-furniture-01.webp", "pebble-furniture-02.webp"], ["pebble-furniture-03.webp", "pebble-furniture-04.webp"]],
  },
  {
    title: "자갈 탈락과 손상 확인",
    body: "자갈이 떨어지거나 흔들리는 부분, 균열과 들뜸이 있다면 작업 전에 알려주세요. 세척 가능한 상태인지, 보수나 추가 확인이 먼저 필요한지 살펴봐야 합니다.",
    note: "청소를 하면 자갈이 다시 붙거나 바닥 강도가 회복되는 것은 아닙니다. 모든 현장에서 손상 가능성이 없다고 보장하지도 않습니다.",
  },
];

const separateScopeItems = [
  "무거운 가구와 집기 이동",
  "기존 코팅이나 표면 처리층 제거",
  "본드·페인트 등 특수 오염 제거",
  "자갈 보충과 부분 보수",
  "균열·들뜸 보수와 재시공",
  "별도 코팅이나 표면 마감",
  "방수·누수 보수",
  "벽면·창문 등 바닥 외 공간 청소",
];

const extraCostItems = [
  "상담한 구역 외에 계단이나 별도 공간을 추가하는 경우",
  "집기를 옮긴 뒤 가려진 심한 오염이 확인되는 경우",
  "기존 코팅이나 관리제 제거가 필요한 경우",
  "본드·페인트 등 별도 오염 처리를 요청하는 경우",
  "이동할 집기가 예상보다 많은 경우",
  "급수·배수 등 현장 조건이 사전 안내와 다른 경우",
  "별도 보수나 마감 작업을 요청하는 경우",
  "구역을 나누어 추가 방문해야 하는 경우",
];

const processFlow = ["사진·현장 상담", "바닥 고정 상태와 오염 확인", "물 사용·작업 여건 확인", "범위·견적·일정 협의", "현장에 맞는 세척", "오염 잔여물과 물기 정리", "건조 상태 확인·검수"];

const processSteps: [string, string][] = [
  ["현재 불편한 점 확인", "틈새 먼지, 검은 동선 자국, 끈적임, 음식물 얼룩 등 신경 쓰이는 부분을 알려주세요. 언제부터 생겼는지와 직접 청소한 방법도 상담에 도움이 됩니다."],
  ["바닥과 주변 환경 확인", "자갈 고정 상태와 기존 마감, 손상 여부를 살펴봅니다. 실내외 구분과 바탕 구조, 주변 설비 등 물 사용에 영향을 주는 조건도 확인합니다. 필요하다면 작은 구역에서 세척 반응을 확인할 수 있는지 협의합니다."],
  ["작업 준비", "합의한 범위의 집기와 동선을 정리합니다. 물이 닿으면 안 되는 시설과 인접 바닥, 전기 설비 등 주의할 부분을 확인합니다."],
  ["바닥 세척", "오염과 고정 상태에 맞는 방법으로 협의한 구역을 세척합니다. 콩자갈이라는 이유만으로 모든 현장에 같은 압력이나 약품을 적용하지 않습니다."],
  ["잔여물과 물기 정리", "세척 과정에서 나온 오염 잔여물과 물기를 정리합니다. 물을 사용하는 작업이라면 회수와 배수 방법까지 함께 계획해야 합니다."],
  ["건조 상태와 결과 확인", "청소 결과와 남은 자국, 추가 확인이 필요한 부분을 살펴봅니다. 출입과 집기 배치, 영업 재개 가능 시점도 확인합니다."],
];

const caseChecklist = [
  "내 바닥과 비슷한 자갈·표면 마감인지",
  "기존 오염과 손상 정도가 비슷한지",
  "전체 모습과 틈새 근접 사진이 있는지",
  "세척만 했는지, 보수나 코팅도 했는지",
  "젖은 상태와 마른 상태를 구분했는지",
  "남은 변색이나 손상이 설명되어 있는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "실내인지 실외인지",
  "대략적인 작업 면적",
  "전체 바닥과 오염 구역 사진",
  "자갈 탈락이나 균열 여부",
  "기존 코팅·표면 처리 이력",
  "급수·배수와 전원 사용 여건",
  "집기 이동 가능 여부",
  "작업 가능 시간과 영업 재개 일정",
];

const checkupItems = [
  "합의한 구역의 세척 여부",
  "표면과 접근 가능한 틈새의 잔여물",
  "가장자리와 집기 주변 작업 상태",
  "끈적임과 남은 물기",
  "기존 얼룩·변색·마모",
  "자갈 탈락이나 손상으로 추가 확인할 부분",
  "출입과 집기 배치 가능 시점",
];

const prepSections: [string, string][] = [
  ["전체 사진과 가까운 사진을 함께 보내주세요", "바닥 전체 사진은 작업 면적과 동선을 파악하는 데 도움이 됩니다. 근접 사진은 틈새 오염과 자갈 상태를 확인하는 데 도움이 됩니다."],
  ["떨어지는 자갈이나 갈라진 부분을 알려주세요", "밟으면 움직이는 부분, 자갈이 계속 떨어지는 곳, 들뜬 구역이 있다면 미리 말씀해 주세요. 청소보다 보수 상태 확인이 먼저 필요할 수 있습니다."],
  ["이전 시공과 관리 정보를 알려주세요", "시공 업체의 관리 안내나 사용한 코팅 제품 정보가 있으면 전달해 주세요. 최근 사용한 세정제와 직접 세척을 시도한 방법도 알려주시면 좋습니다. 정확히 모르셔도 괜찮습니다. 모르는 상태 그대로 말씀해 주세요."],
  ["집기 이동 범위를 정해 주세요", "테이블과 의자, 진열장 등 이동할 물건을 구분해 주세요. 무거운 집기의 이동과 고정 집기 아래 작업은 사전에 범위를 협의해야 합니다."],
  ["물 사용과 설비 조건을 확인해 주세요", "급수·배수 위치, 전원, 바닥 전기함과 인접한 다른 바닥재를 알려주세요. 이전에 누수나 물 고임 문제가 있었던 곳이라면 함께 말씀해 주세요."],
  ["작업 종료와 영업 재개 시간을 함께 알려주세요", "청소를 끝내야 하는 시간뿐 아니라 손님을 맞거나 집기를 다시 놓을 시간도 알려주세요. 세척과 건조, 최종 확인까지 고려해 일정을 잡는 것이 좋습니다."],
];

const faqItems: [string, string][] = [
  ["콩자갈 사이에 낀 때도 청소할 수 있나요?", "틈새 형태와 오염, 기존 마감 상태를 확인해 작업 범위를 안내합니다. 표면뿐 아니라 접근 가능한 틈새의 잔여물도 확인하지만, 보이지 않는 모든 깊이까지 완전 제거를 보장하지는 않습니다."],
  ["콩자갈청소 비용은 평당으로 정하나요?", "면적은 참고하지만 면적만으로 정하지 않습니다. 필요한 인원과 장비·약품, 오염과 고정 상태, 집기와 물 사용 조건을 함께 확인합니다."],
  ["실내 콩자갈 바닥도 고압으로 물청소하나요?", "모든 콩자갈 바닥에 고압세척을 적용하지 않습니다. 고정 상태와 바탕 구조, 배수·회수 조건을 확인한 뒤 방법을 정합니다. 자갈이 빠지거나 마감이 손상된 부분은 먼저 알려주세요."],
  ["배수구가 없어도 가능한가요?", "현장 확인이 필요합니다. 물을 사용할 수 있는지와 회수 방법, 주변 시설 조건을 확인해 진행 가능 여부를 안내합니다."],
  ["콩자갈 바닥은 물이 빠지니까 많이 써도 되나요?", "틈이 있다는 것과 바닥 전체가 안전하게 배수되는 것은 다릅니다. 바탕 구조와 방수·배수 상태를 확인하지 않고 많은 물을 사용하면 안 됩니다."],
  ["청소하다가 자갈이 떨어질 수 있나요?", "기존 고정 상태와 손상 여부를 확인해야 합니다. 이미 약해진 구역은 작업에 제약이 있거나 보수가 먼저 필요할 수 있어 무손상을 일괄적으로 보장하지 않습니다."],
  ["떨어진 자갈도 채워주시나요?", "자갈 보충과 보수는 일반 세척에 자동으로 포함되지 않습니다. 필요한 경우 진행 가능 여부와 비용을 별도로 확인해 주세요."],
  ["커피나 음식물 얼룩도 없어지나요?", "오염 종류와 경과 시간, 바닥 상태에 따라 달라집니다. 제거할 수 있는 오염과 남을 수 있는 변색을 구분해 안내합니다."],
  ["냄새도 청소하면 해결되나요?", "바닥 오염과 관련된 냄새인지 먼저 확인해야 합니다. 다른 원인이나 접근하기 어려운 부분의 오염이 있으면 청소만으로 해결되지 않을 수 있습니다. 별도 냄새 제거 작업 여부는 상담 시 확인해 주세요."],
  ["코팅도 같이 해야 하나요?", "반드시 함께 해야 하는 것은 아닙니다. 청소와 코팅은 다른 작업이며, 기존 마감과 원하는 사용 상태에 따라 필요성과 가능 여부를 별도로 확인합니다."],
  ["청소 후 처음 시공한 색으로 돌아오나요?", "오염을 제거하면 외관이 달라질 수 있지만 자갈·결합재의 변색이나 기존 손상까지 되돌리는 것은 아닙니다. 새것 같은 결과를 일괄적으로 약속하지 않습니다."],
  ["다음 날 바로 영업할 수 있나요?", "세척 방식과 물 사용량, 바닥 구조, 환기와 건조 여건에 따라 달라집니다. 현장 확인 후 작업과 사용 재개 시간을 구분해 안내합니다."],
  ["테이블과 진열장이 있어도 가능한가요?", "집기 이동과 작업 동선을 먼저 확인해야 합니다. 이동할 물건과 제외할 구역을 협의해 주세요."],
  ["사진만으로 견적을 받을 수 있나요?", "사진을 바탕으로 상담할 수 있습니다. 다만 자갈 고정 상태와 물 사용 여건, 가려진 오염은 현장 확인 후 견적에 반영될 수 있습니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "실내외 구분과 대략적인 작업 면적",
  "바닥 전체와 오염 구역 근접 사진",
  "자갈 탈락·균열·들뜸 여부",
  "기존 코팅이나 표면 처리 이력",
  "급수·배수와 전원 사용 여건",
  "집기 종류와 이동 가능 여부",
  "희망 작업일과 영업 재개 일정",
];

const caseIds = ["floor-pebble-01", "floor-pebble-02", "floor-pebble-03"] as const;
const path = "/콩자갈청소/";

export default function PebbleFloorCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "콩자갈청소",
      serviceType: "콩자갈청소·바닥 세척",
      description: "콩자갈 틈에 먼지와 음료 오염이 남거나 출입구 주변이 짙어졌나요? 찐청소는 자갈 고정 상태, 기존 마감과 실내외 환경을 확인해 세척 가능한 범위와 마무리 방법을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "콩자갈청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/pebble-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>콩자갈청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">바닥시공</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">카페·매장 콩자갈청소, 틈새 오염과 바닥 상태를 함께 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>콩자갈 틈에 먼지와 음료 오염이 남거나 출입구 주변이 짙어졌나요? 찐청소는 자갈 고정 상태, 기존 마감과 실내외 환경을 확인해 세척 가능한 범위와 마무리 방법을 안내합니다.</p>
            <p>바닥이 예뻐서 선택했는데 청소가 숙제가 됐다면, 현재 상태부터 보여주세요.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">콩자갈청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="콩자갈청소 비용과 견적 산정 기준" />
            <p>콩자갈청소 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 표면의 거칠기, 오염 상태, 기존 마감과 집기 유무에 따라 필요한 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 실제 청소 범위와 현장 조건을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">면적보다 오염과 작업 여건을 함께 봅니다</h3>
            <p className="mt-2">먼지가 주로 쌓인 바닥과 음식물·기름때가 남은 바닥은 필요한 작업이 다를 수 있습니다. 빈 매장과 테이블·진열장이 많은 매장도 작업 동선이 다릅니다.</p>
            <p className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">세척과 보수는 구분합니다</h3>
            <p className="mt-2">콩자갈청소는 협의한 구역의 오염을 제거하는 작업입니다. 떨어진 자갈을 채우거나 바닥을 다시 고정하는 보수·재시공과는 다릅니다.</p>
            <p className="mt-4 font-bold text-brand-dark">견적 상담에서는 다음 항목을 구분해 확인해 주세요.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">총액뿐 아니라 실제로 어떤 작업이 포함되는지 확인하는 것이 중요합니다.</p>
          </section>

          {/* 2. 청소 범위/바닥 상태 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="청소 범위와 바닥 상태별 확인 사항" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">자갈 틈새 오염과 수지·마감 변색을 구분합니다</h3>
            <p className="mt-2 mb-6">표면에 쌓인 때와 기존 마감 자체의 변색은 다를 수 있습니다. 탈락한 자갈과 들뜬 부분, 급수·배수·회수 여건을 함께 확인하고 물 사용과 장비 적용 방법을 정합니다. 보수와 재시공, 기존 코팅 제거는 별도 항목입니다.</p>
            <p>콩자갈 바닥은 표면만 보고 같은 방식으로 청소하기 어렵습니다. 자갈을 고정한 상태와 표면 처리, 바탕 구조에 따라 적용 가능한 작업이 달라질 수 있습니다.</p>
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
            <p className="mt-5 text-[15px] text-gray-500">위 항목은 일반 콩자갈 세척에 자동으로 포함되지 않으며, 진행 가능 여부와 비용을 별도로 확인해야 합니다.</p>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>견적은 처음 확인한 오염과 작업 범위를 기준으로 정합니다. 실제 상태나 요청 내용이 달라지면 추가 작업이 필요할 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업과 비용을 어떻게 협의할지도 견적 단계에서 확인해 주세요. 손상된 구역이 발견되면 세척을 계속할지보다, 먼저 상태를 확인하는 것이 중요합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="콩자갈청소 진행 순서와 소요 시간" />
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

            <p className="mt-6 font-bold text-brand-dark">바닥 세척 작업 사례</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["pebble-clean-01.webp", "pebble-clean-02.webp", "pebble-clean-03.webp", "pebble-clean-04.webp"].map(photo => (
                <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                  <Image src={`/images/portfolio-v2/${photo}`} alt="콩자갈 바닥 세척 작업 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <p className="mt-2">면적과 오염 정도, 집기 이동, 세척 방법과 환기 조건에 따라 달라집니다. 표면 청소에 걸리는 시간과 건조에 필요한 시간은 구분해야 합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">다음 날 영업이나 행사 일정이 있다면 상담 시 먼저 알려주세요. 현장 확인 없이 당일 건조나 즉시 사용을 약속드리지는 않습니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <p>콩자갈 바닥은 색상과 조명, 젖어 있는지에 따라 다르게 보일 수 있습니다. 작업 전후 사진은 가능한 한 비슷한 조건에서 비교하는 것이 좋습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">사례에서 확인할 내용</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">진한 색으로 젖어 보이는 사진만으로 청소 결과를 판단하지 않는 것이 좋습니다. 실제 검수에서는 건조 상태와 남은 잔여물도 함께 확인해 주세요. 사진 기록이 필요하다면 촬영 구역과 전달 방법을 상담 시 협의하실 수 있습니다.</p>
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">영업 중에도 청소할 수 있나요?</h3>
            <p className="mt-2">작업 구역과 고객·직원의 이동 동선을 분리할 수 있는지 먼저 확인합니다. 물 사용과 장비 운용, 건조 중 출입 제한을 고려해 부분 작업이나 영업 종료 후 작업을 협의합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">배수구가 없는 실내도 상담할 수 있나요?</h3>
            <p className="mt-2">네. 배수구 유무와 주변 구조부터 알려주세요. 물 사용과 회수가 가능한지 확인해 작업 가능 여부와 방법을 판단합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">콩자갈 사이로 물이 들어간다고 해서 아래로 흘려보내도 되는 바닥이라는 뜻은 아닙니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">야간이나 휴무일에 작업하고 싶다면</h3>
            <p className="mt-2">희망 시간대를 알려주시면 인원과 장비 일정을 확인합니다. 건물의 작업 규정과 소음 제한, 다음 사용 시점까지 함께 고려해 일정을 협의합니다.</p>
          </section>

          {/* 7. 검수/관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 관리 방법" />
            <p>검수는 처음 협의한 작업 구역과 오염 제거 범위를 기준으로 진행합니다. 전체 색감뿐 아니라 특히 신경 쓰였던 구역을 함께 살펴보세요.</p>
            <p className="mt-5 font-bold text-brand-dark">주요 검수 항목</p>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 후에도 남을 수 있는 흔적이 있습니다</h3>
            <p className="mt-2">자갈이나 결합재의 변색, 기존 코팅 변화, 파손은 단순 오염과 다릅니다. 남은 자국이 있다면 재세척할 대상인지, 별도 보수가 필요한지 구분해 확인해야 합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">일상 관리도 바닥 상태에 맞춰 주세요</h3>
            <p className="mt-2">일상적인 먼지 제거와 오염 처리는 시공된 바닥의 관리 기준을 우선해 주세요. 약품이나 장비를 새로 사용하기 전에는 기존 마감과 고정 상태에 맞는지 확인하는 것이 좋습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">특히 실내 바닥에 물을 붓거나 고압세척기를 사용하는 방식은 배수와 바탕 구조 확인 없이 적용하지 마세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">관리 주기는 공간마다 다릅니다</h3>
            <p className="mt-2">통행량과 음식물 사용, 출입구의 외부 오염 유입 정도에 따라 청소 주기가 달라집니다. 모든 공간에 같은 주기를 정하기보다 상태를 보며 필요한 관리 시점을 상담해 주세요.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 문의 사항과 재확인 범위·기간은 계약 시 확인하시기 바랍니다.</p>
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
              <p className="text-xl font-bold">콩자갈청소 견적 문의</p>
              <p className="mt-3 text-white/80">청소로 해결할 수 있는지, 바닥 보수가 먼저 필요한지 모르셔도 괜찮습니다. 현재 상태와 가장 신경 쓰이는 부분부터 알려주세요.</p>
              <p className="mt-2 text-white/80">찐청소는 콩자갈 바닥의 오염과 고정 상태를 함께 확인합니다. 적용 가능한 세척 범위와 비용, 건조와 사용 일정을 구분해 상담하겠습니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>콩자갈청소 견적 문의하기 →</CtaButton>
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
