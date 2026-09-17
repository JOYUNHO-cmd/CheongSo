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
  ["scope", "마루 종류·작업 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인·관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "마루 표면 관리와 코팅을 검토하는 주거·업무 공간"],
  ["시공 가능 여부", "마루 종류, 제조사 관리 기준, 기존 마감과 손상 상태 확인 후 안내"],
  ["작업 범위", "필요한 표면 정리와 코팅 공정을 사전 협의"],
  ["견적 기준", "필요한 인원, 장비·약품, 실제 작업 면적과 준비 작업"],
  ["일정 확인", "작업 시간과 보행·가구 반입·청소 가능 시점을 구분"],
  ["별도 확인", "기존 코팅 제거, 가구 이동, 흠집 보수, 샌딩 등"],
  ["예약 문의", "현장 위치와 마루 사진, 희망 일정을 기준으로 상담"],
];

const estimateChecklist = [
  "마루 종류와 제조사·제품 정보",
  "기존 표면 마감과 코팅 이력",
  "실제 코팅할 구역과 면적",
  "오염, 흠집, 변색, 들뜸 등 현재 상태",
  "기존 코팅 제거 등 추가 준비 작업 필요 여부",
  "가구의 양과 이동 가능 여부",
  "적용 가능한 제품과 마감 계획",
  "필요한 인원·장비·약품",
  "작업 가능 시간과 입주·가구 반입 일정",
];

const includedCheckItems = [
  "코팅 전 세척과 표면 정리",
  "기존 코팅이나 관리제 제거 필요 여부",
  "사용할 제품과 마감 특성",
  "도포 계획과 건조 과정",
  "가구 이동과 원위치 배치",
  "별도 보수·샌딩 여부",
  "작업 후 사용·관리 안내",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "강마루·강화마루",
    body: "강마루와 강화마루는 이름이 비슷해도 같은 바닥으로 보고 작업해서는 안 됩니다. 같은 종류 안에서도 제품별 표면 처리가 다를 수 있습니다.",
    note: "추가 코팅이 적합한지, 기존 표면에 영향을 줄 수 있는지, 제조사에서 별도로 안내하는 관리 기준이 있는지 확인합니다. 마루 종류를 정확히 모르셔도 괜찮습니다. 사진이나 시공 내역이 있다면 상담에 활용할 수 있습니다.",
    photoPairs: [["wood-strand-01.webp", "wood-strand-02.webp"], ["wood-strand-03.webp", "wood-strand-04.webp"]],
  },
  {
    title: "원목·합판 계열 마루",
    body: "나무가 보이는 바닥이라고 해서 모두 같은 마감인 것은 아닙니다. 기존에 도장, 오일, 왁스 등 어떤 방식으로 관리했는지에 따라 적용 가능한 제품과 준비 작업이 달라질 수 있습니다.",
    note: "기존 제품이나 시공 내역을 아는 범위에서 알려주세요. 표면 상태를 확인하지 않고 덧바르는 방식으로 안내하지 않습니다.",
    photoPairs: [["wood-solid-01.webp", "wood-solid-02.webp"], ["wood-solid-03.webp", "wood-solid-04.webp"]],
  },
  {
    title: "코팅 전 세척과 표면 정리",
    body: "코팅 전에 먼지와 오염, 기존 관리제 잔여물 등 확인이 필요한 부분을 살펴봅니다. 마루 재질과 마감에 맞는 준비 작업을 협의합니다.",
    note: "코팅은 오염을 닦는 작업을 대신하지 않습니다. 표면이 칙칙한 원인이 오염인지, 기존 마감의 변화인지부터 구분해야 합니다.",
    photoPairs: [["wood-clean-01.webp", "wood-clean-02.webp"], ["wood-clean-03.webp", "wood-clean-04.webp"]],
  },
  {
    title: "마루코팅과 흠집 보수는 다릅니다",
    body: "적합한 코팅은 제품 특성에 따라 표면의 외관과 관리에 도움을 줄 수 있습니다. 하지만 깊게 찍힌 자국, 벌어진 틈, 들뜸, 파손을 수리하는 작업은 아닙니다.",
    note: "생활 흠집이 덜 눈에 띄게 보일 가능성과 손상 자체가 복구되는 것은 구분해야 합니다. 작업 후에도 남을 수 있는 흔적을 사전에 확인해 주세요.",
  },
  {
    title: "원하는 광택과 사용 환경 확인",
    body: "자연스러운 느낌을 유지하고 싶은지, 광택을 더하고 싶은지 알려주세요. 선택 가능한 마감은 적용할 수 있는 제품과 기존 마루 상태에 따라 달라집니다.",
    note: "아이의 놀이 공간이나 반려동물이 생활하는 공간이라면 사용 환경도 함께 말씀해 주세요. 광택만으로 미끄러움이나 생활 적합성을 판단하지 않고 제품 정보와 사용 조건을 확인해야 합니다.",
  },
];

const separateScopeItems = [
  "기존 코팅층 제거",
  "무거운 가구와 집기 이동",
  "깊은 흠집·찍힘 보수",
  "마루 샌딩과 재도장",
  "들뜬 마루나 손상된 자재 교체",
  "누수·습기 원인의 점검과 수리",
  "마루 외 공간의 전체 청소",
];

const extraCostItems = [
  "기존 코팅이나 관리제 제거가 추가로 필요한 경우",
  "사진에 보이지 않았던 오염이나 손상이 확인되는 경우",
  "작업 구역이나 면적을 추가하는 경우",
  "가구 이동 범위가 늘어나는 경우",
  "별도의 흠집 보수나 자재 교체를 요청하는 경우",
  "제품이나 마감 계획을 변경하는 경우",
  "작업을 나누어 진행하면서 추가 방문이 필요한 경우",
];

const processFlow = ["사진·현장 상담", "마루와 기존 마감 확인", "시공 가능 여부와 기대 결과 안내", "작업 범위·제품·일정 협의", "필요한 표면 정리", "코팅과 제품 기준에 따른 건조", "검수·사용 안내"];

const processSteps: [string, string][] = [
  ["현재 불편한 점과 원하는 결과 확인", "오염이 잘 닦이지 않는지, 광택이 줄었는지, 흠집이 신경 쓰이는지 알려주세요. 불편한 원인에 따라 코팅보다 세척이나 보수가 먼저 필요한 경우도 있습니다."],
  ["마루와 기존 마감 확인", "마루 종류와 관리 이력, 현재 표면 상태를 살펴봅니다. 필요한 경우 일부 구역에서 적용 상태를 확인할 수 있는지도 협의합니다."],
  ["범위와 일정 협의", "코팅할 구역과 가구 이동 범위를 정합니다. 적용할 제품, 예상 마감과 작업 후 주의사항을 확인합니다."],
  ["표면 정리와 코팅", "협의한 준비 작업을 진행하고, 바탕 상태를 확인한 뒤 코팅합니다. 제품 기준에 맞는 도포와 건조 과정이 필요합니다."],
  ["결과 확인과 사용 안내", "합의한 구역의 마감 상태를 확인합니다. 다시 걸어도 되는 시점과 가구를 놓을 시점, 청소를 시작할 시점을 구분해 안내받으세요."],
];

const timingChecklist = [
  "제한적으로 보행할 수 있는 시점",
  "가구와 가전을 반입할 시점",
  "러그나 매트를 다시 놓을 시점",
  "평소처럼 생활할 수 있는 시점",
  "물걸레질과 일상 청소를 시작할 시점",
];

const caseChecklist = [
  "내 현장과 같은 종류의 마루인지",
  "기존 마감과 손상 상태가 비슷한지",
  "코팅만 했는지, 보수나 샌딩도 했는지",
  "비슷한 위치와 조명에서 비교한 사진인지",
  "원하는 광택과 가까운 결과인지",
  "기존 흠집과 변색이 어떻게 남았는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "대략적인 작업 면적",
  "마루 종류 또는 제품 정보",
  "전체 공간과 상태가 잘 보이는 사진",
  "이전 코팅·관리 이력",
  "가구 유무와 이동 가능 여부",
  "희망 작업일과 입주·가구 반입 일정",
];

const checkupItems = [
  "합의한 구역의 작업 여부",
  "가장자리와 가구 주변의 마감 범위",
  "도포 자국이나 뭉침 등 확인이 필요한 부분",
  "작업 후에도 남아 있는 기존 흠집과 변색",
  "가구 이동을 계약했다면 배치 상태",
  "보행·가구 반입·일상 청소 가능 시점",
  "사용할 수 있는 청소 도구와 세정제",
];

const prepSections: [string, string][] = [
  ["마루 정보를 아는 범위에서 알려주세요", "제조사나 제품명, 시공 내역이 있으면 상담에 도움이 됩니다. 모르셔도 괜찮습니다. 사진과 현재 상태부터 확인하겠습니다."],
  ["이전에 사용한 제품을 알려주세요", "왁스, 광택제, 오일, 코팅제 등을 사용한 적이 있다면 말씀해 주세요. 제품명이나 용기 사진이 있으면 적용 가능 여부를 확인하는 데 도움이 됩니다."],
  ["기존 손상을 구분해 주세요", "찍힘, 들뜸, 벌어짐, 물에 젖었던 흔적 등 신경 쓰이는 부분을 알려주세요. 코팅으로 바뀔 수 있는 부분과 별도 보수가 필요한 부분을 구분해야 합니다."],
  ["원하는 느낌을 설명해 주세요", "“반짝임을 더하고 싶어요.” “너무 번쩍이지 않고 자연스러웠으면 좋겠어요.” 원하는 모습이 있다면 참고 사진과 함께 알려주세요. 선택 가능한 마감은 마루와 제품 조건을 확인한 뒤 안내합니다."],
  ["가구와 생활 동선을 정리해 주세요", "작업할 구역과 이동하지 않을 가구를 정해 주세요. 작업 중 방이나 출입문을 오가는 동선이 필요하다면 미리 알려주세요."],
  ["아이·반려동물의 생활 공간도 고려해 주세요", "작업 중 출입을 피할 공간과 다시 이용할 시점을 협의해 주세요. 냄새에 민감한 분이 계시거나 특별히 확인할 제품 정보가 있다면 상담 시 말씀해 주세요."],
];

const faqItems: [string, string][] = [
  ["새 마루도 코팅을 꼭 해야 하나요?", "꼭 필요한 것은 아닙니다. 기존 마감과 제조사 관리 기준, 사용 목적을 확인한 뒤 추가 코팅이 적합한지 판단해야 합니다."],
  ["강마루와 강화마루 모두 가능한가요?", "종류 이름만으로 일괄적으로 판단하지 않습니다. 제품별 표면 처리와 기존 상태를 확인해 적용 가능 여부를 안내합니다."],
  ["바닥왁스코팅과 마루코팅은 같은 건가요?", "서비스 이름만으로 같은 공정이라고 볼 수는 없습니다. 사용하는 제품과 기존 마감, 준비 작업이 무엇인지 확인해야 합니다."],
  ["코팅하면 흠집과 찍힘이 없어지나요?", "깊은 흠집과 찍힘을 수리하는 작업은 아닙니다. 표면 외관이 달라질 수는 있지만 손상 자체가 복구된다고 보장하지 않습니다."],
  ["물에 젖어 들뜬 마루도 코팅하면 되나요?", "코팅으로 해결할 문제인지부터 확인해야 합니다. 수분 원인과 자재 상태에 대한 점검이나 보수가 먼저 필요할 수 있습니다."],
  ["기존 코팅 위에 바로 덧바를 수 있나요?", "기존 마감과 적용할 제품의 적합성을 확인해야 합니다. 이전 관리제나 코팅층 때문에 별도 준비 작업이 필요한 경우도 있습니다."],
  ["샌딩과 기존 코팅 제거도 포함되나요?", "자동으로 포함되는 것은 아닙니다. 필요한 공정인지와 진행 가능 여부, 견적 포함 범위를 별도로 확인해야 합니다."],
  ["무광이나 자연스러운 느낌으로도 가능한가요?", "원하는 느낌을 알려주세요. 적용 가능한 제품과 마루 상태에 따라 선택 범위가 달라지므로 상담 후 안내합니다."],
  ["몇 번 코팅하나요?", "적용할 제품의 기준과 현장 상태, 협의한 마감 계획에 따라 정합니다. 횟수만으로 품질을 판단하기보다는 표면 준비와 도포·건조 과정을 함께 확인해 주세요."],
  ["가구가 있는 상태에서도 할 수 있나요?", "이동 가능한 가구와 작업 구역, 출입 동선을 확인해야 합니다. 가구 이동이 필요한 경우 담당 범위와 비용을 미리 협의합니다."],
  ["시공 후 언제 걸을 수 있나요?", "제품과 현장 조건에 따라 달라집니다. 보행과 가구 반입, 러그 설치, 일상 청소 가능 시점을 각각 확인해 주세요."],
  ["아이나 반려동물이 있어도 안전한가요?", "제품 정보와 정해진 사용 조건을 확인해야 합니다. ‘무해’나 ‘즉시 생활 가능’을 일괄적으로 약속하지 않으며, 작업 중 출입과 사용 재개 시점을 사전에 협의합니다."],
  ["코팅하면 미끄럽지 않나요?", "제품과 표면 상태, 물기·오염 등 사용 환경에 따라 달라집니다. 광택만으로 판단할 수 없으며 미끄럼 방지 성능을 무조건 보장하는 작업으로 보시면 안 됩니다."],
  ["코팅하면 물에 강해져서 물청소를 많이 해도 되나요?", "마루코팅을 방수 공사와 같은 의미로 보면 안 됩니다. 마루와 코팅 제품의 관리 기준에 맞춰 청소해야 합니다."],
  ["얼마나 오래 유지되나요?", "제품과 바탕 상태, 통행량, 가구 이동과 관리 방법에 따라 달라집니다. 현장 확인 없이 일정한 유지 기간을 보장하지는 않습니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 작업 면적",
  "마루 전체와 손상 구역 사진",
  "제조사·제품명 또는 시공 내역",
  "이전 코팅이나 관리제 사용 이력",
  "가구 유무와 이동 가능 여부",
  "원하는 광택과 마감 느낌",
  "희망 작업일과 입주·가구 반입 일정",
];

const caseIds = ["floor-wood-01", "floor-wood-02", "floor-wood-03"] as const;
const path = "/마루코팅/";

export default function FloorWoodCoatingLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "마루코팅",
      serviceType: "마루코팅·바닥 관리",
      description: "마루코팅 전, 마루 종류와 기존 마감 상태부터 확인하세요. 찐청소가 시공 가능 여부, 세척과 코팅 범위, 견적 기준, 건조·가구 반입 일정과 작업 후 관리 방법을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "마루코팅", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>마루코팅</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">바닥시공</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">마루코팅, 우리 집 마루에 맞는 작업인지부터 확인하세요</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>닦아도 마루가 칙칙하거나, 생활 흠집 때문에 코팅을 고민하고 계신가요? 새로 입주하기 전에 미리 관리해 두고 싶은 경우도 있으실 겁니다.</p>
            <p>마루코팅은 어떤 마루에 무엇을 바르는지에 따라 적용 여부와 결과가 달라집니다. 찐청소는 마루 종류와 기존 마감, 오염과 손상 상태를 확인해 작업 가능 범위부터 안내합니다.</p>
            <p>광택을 더하고 싶은지, 기존의 자연스러운 느낌을 유지하고 싶은지도 알려주세요. 무조건 반짝이게 만드는 것보다 원하는 모습과 사용 환경에 맞는지 확인하는 것이 먼저입니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">마루코팅 상담·견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="마루코팅 비용과 견적 산정 기준" />
            <p>마루코팅 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 기존 마감과 오염 상태, 가구 유무, 코팅 전에 필요한 준비 작업에 따라 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로, 실제 작업 범위와 현장 조건을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">코팅 전에 필요한 작업부터 확인합니다</h3>
            <p className="mt-2">표면을 정리한 뒤 작업할 수 있는 마루와, 기존 관리제나 코팅층의 확인이 필요한 마루는 준비 과정이 다를 수 있습니다.</p>
            <p className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">집 전체 면적과 실제 작업 면적은 다를 수 있습니다</h3>
            <p className="mt-2">가구를 모두 뺀 공간과 거주 중인 공간은 작업 조건이 다릅니다. 붙박이장이나 이동하지 않는 가구 아래를 제외할지, 가구를 옮겨 작업할지에 따라 범위가 달라집니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">견적 상담 때는 어디까지 코팅할지와 가구 이동을 누가 담당할지도 함께 정해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">가격을 비교할 때 포함 공정을 확인하세요</h3>
            <p className="mt-2">같은 &lsquo;마루코팅&rsquo;이라는 이름이라도 작업 내용이 같지는 않을 수 있습니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">도포 횟수나 총액만으로 비교하기보다, 내 마루에 필요한 공정이 포함되어 있는지 확인하는 것이 중요합니다.</p>
          </section>

          {/* 2. 마루 종류/작업 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="마루 종류별 확인 사항과 작업 범위" />
            <p>마루코팅은 모든 마루에 같은 약품을 바르는 작업이 아닙니다. 마루의 구조와 표면 마감, 제조사 관리 기준에 따라 적용 가능 여부를 먼저 확인해야 합니다.</p>
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
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["wood-strip-01.webp", "wood-strip-02.webp", "wood-strip-03.webp", "wood-strip-04.webp"].map(photo => (
                <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                  <Image src={`/images/portfolio-v2/${photo}`} alt="기존 코팅층 제거 작업 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] text-gray-500">박리(기존 왁스를 벗겨내는 작업)가 필요한 경우, 진행 가능 여부와 비용을 따로 확인해야 합니다.</p>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>견적은 처음 확인한 마루 상태와 협의한 작업 범위를 기준으로 정합니다. 현장 조건이나 요청 내용이 달라지면 추가 작업이 필요할 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">기본 견적에 어떤 준비 작업이 포함되는지 먼저 확인해 주세요. 추가 작업이 필요할 때 비용과 일정을 어떻게 협의할지도 계약 전에 정해두는 것이 좋습니다.</p>
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">겉이 말랐다고 바로 평소처럼 사용할 수 있는 것은 아닙니다</h3>
            <p className="mt-2">건조와 사용 재개 조건은 제품과 현장 환경에 따라 달라집니다. 같은 &lsquo;사용 가능&rsquo;이라도 잠깐 걷는 것과 무거운 가구를 놓는 것은 다릅니다.</p>
            <p className="mt-4 font-bold text-brand-dark">다음 시점을 각각 확인해 주세요.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {timingChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이사 일정이 있다면 코팅 종료 시간뿐 아니라 실제 가구 반입 시간까지 함께 조율해야 합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <p>마루코팅 사례는 광택이 강한 사진만으로 비교하기 어렵습니다. 조명과 촬영 각도에 따라 마루의 색감과 반사가 다르게 보일 수 있습니다.</p>
            <p className="mt-5 font-bold text-brand-dark">사례를 볼 때 확인할 내용</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">&lsquo;새것처럼 보이는 사진&rsquo;보다 어떤 작업으로 얻은 결과인지 확인하는 것이 중요합니다. 작업 기록이 필요하다면 촬영 구역과 전달 방법을 상담 시 협의해 주세요. 사진만으로는 건조 상태와 표면 촉감, 실제 사용감을 모두 판단할 수는 없습니다.</p>
            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 위치와 마루 사진, 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">상담 시 필요한 정보</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">입주 전에 작업하고 싶다면</h3>
            <p className="mt-2">가구가 들어오기 전인지, 다른 공사가 남아 있는지 알려주세요. 청소와 코팅, 가구 반입 순서를 함께 조율하는 것이 좋습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">&lsquo;입주 전날 작업하면 된다&rsquo;고 일괄적으로 정하기보다 적용 제품의 건조와 사용 조건을 확인해 일정을 잡아야 합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">거주 중인 집도 가능한가요?</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <p className="text-[15.5px]">가구 이동과 작업 구역 분리, 출입 제한이 가능한지 먼저 확인합니다. 부분 작업은 기존 구역과 광택이나 색감 차이가 보일 수 있어 경계와 기대 결과도 협의해야 합니다.</p>
              <p className="mt-2 text-[15.5px]">현장 조건에 따라 진행 가능 여부와 작업 방식을 안내합니다.</p>
            </div>
          </section>

          {/* 7. 검수/관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 관리 방법" />
            <p>검수는 합의한 작업 범위와 마감 계획을 기준으로 진행합니다. 광택뿐 아니라 작업 누락, 표면 상태와 사용 안내까지 함께 확인해 주세요.</p>
            <p className="mt-5 font-bold text-brand-dark">주요 검수 항목</p>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">관리 방법은 사용한 제품에 맞춰 확인합니다</h3>
            <p className="mt-2">마루와 코팅 제품의 관리 기준을 우선해 주세요. 임의로 다른 광택제나 관리제를 덧바르기 전에 함께 사용할 수 있는지 확인하는 것이 좋습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">물걸레질과 청소를 시작할 시점, 스팀청소기 등 사용하려는 도구의 적합성도 미리 문의해 주세요. 가구는 안내받은 시점 이후에 배치하고, 이동할 때 끌리지 않도록 주의해 주세요. 코팅을 했더라도 찍힘과 긁힘이 생기지 않는 것은 아닙니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">유지 기간과 재시공 시점은 다릅니다</h3>
            <p className="mt-2">통행량, 가구 이동, 청소 방법과 마루 상태에 따라 표면 변화가 달라집니다. 모든 현장에 같은 유지 기간이나 재코팅 주기를 약속하지 않습니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">작업 후 궁금한 부분은 해당 위치와 상태를 알려주세요. 재확인과 사후 처리의 범위·기간은 계약 시 확인하시기 바랍니다.</p>
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
              <p className="text-xl font-bold">마루코팅 상담·견적 문의</p>
              <p className="mt-3 text-white/80">우리 집 마루에 코팅이 필요한지, 어떤 작업이 가능한지부터 상담하세요. 마루 종류를 정확히 모르셔도 사진과 현재 불편한 점을 알려주시면 됩니다.</p>
              <p className="mt-2 text-white/80">찐청소는 마루와 기존 마감에 맞는 작업인지부터 확인합니다. 코팅으로 기대할 수 있는 변화와 별도 보수가 필요한 부분을 구분하고, 사용 일정과 관리 방법까지 함께 상담하겠습니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>마루코팅 상담·견적 문의하기 →</CtaButton>
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
