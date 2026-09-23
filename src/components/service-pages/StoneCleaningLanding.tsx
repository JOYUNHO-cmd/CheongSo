import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { ServiceScenePhotos } from "@/components/service-pages/ServiceScenePhotos";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "재질·오염별 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 처리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "대리석·화강석 등 석재의 표면 오염과 얼룩"],
  ["주요 공간", "로비, 복도, 현관, 계단, 상가와 사무실의 석재 마감 구역"],
  ["작업 기준", "석재 종류, 표면 마감, 오염 원인과 범위 확인"],
  ["견적 기준", "필요 인원 + 장비·약품 비용을 중심으로 작업량과 난이도 반영"],
  ["별도 확인", "침투 얼룩, 백화·녹물, 접착제, 기존 코팅 제거"],
  ["기본 세척과 구분", "연마·광택 복원, 균열 보수, 석재 교체, 보호제 시공"],
  ["서비스 지역·일정", "현장 주소와 희망 날짜로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "석재 종류와 표면 마감",
  "청소할 면적과 오염 부위 수",
  "일반 오염인지 침투한 얼룩인지",
  "오염이 발생한 시점과 이전 처리 이력",
  "기존 코팅·보호제 유무",
  "가구와 집기 배치, 작업 접근 조건",
  "부분 시험이나 추가 처리가 필요한 정도",
  "작업 가능한 시간과 공간 이용 일정",
];

const scopeItems: { title: string; included: string[]; excluded: string[]; note: string }[] = [
  {
    title: "대리석 청소와 얼룩 제거",
    included: ["표면 먼지와 일반적인 생활 오염", "보행으로 쌓인 때", "재질과 마감에 맞는 세척 및 마무리"],
    excluded: ["음식물·기름·색소 등이 스며든 얼룩", "기존 코팅이나 세정제 잔여물", "광택이 사라지거나 뿌옇게 변한 부분"],
    note: "대리석의 하얗거나 뿌연 자국이 모두 물때는 아닙니다. 산성 물질에 의해 표면이 손상된 경우에는 일반 청소가 아닌 복원 검토가 필요할 수 있습니다.",
  },
  {
    title: "화강석 청소와 오염 제거",
    included: ["현관·로비·계단의 흙먼지와 보행 오염", "표면에 쌓인 묵은 때", "협의한 구역의 세척과 마무리"],
    excluded: ["기름이 스며들어 짙어진 부분", "녹물과 백화성 오염", "시멘트·접착제 등 고착된 잔여물"],
    note: "화강석이라는 이름만으로 강한 약품이나 고압세척이 적합하다고 판단하지 않습니다. 표면 마감과 주변 줄눈, 기존 처리 상태도 함께 확인합니다.",
  },
];

const diagnosisItems: { title: string; checks: string[]; notes: string[] }[] = [
  {
    title: "기름 얼룩과 음식물 자국",
    checks: ["어떤 물질이 묻었는지", "언제 발생했고 얼마나 방치되었는지", "이전에 어떤 세정제를 사용했는지", "표면에 남은 오염인지 안쪽으로 스며든 상태인지"],
    notes: [
      "침투한 얼룩은 표면 세척과 다른 처리가 필요할 수 있습니다. 적용 가능한 방법과 예상되는 개선 범위를 확인한 뒤 안내합니다.",
      "커피나 음료가 닿은 곳은 착색과 표면 손상이 함께 있는지도 살펴야 합니다.",
    ],
  },
  {
    title: "녹물과 갈색 얼룩",
    checks: ["금속 집기나 화분 받침 주변에서 생겼는지", "물이 흐르는 위치와 연결되는지", "반복해서 나타나는지", "석재 내부에서 비롯된 변색 가능성이 있는지"],
    notes: ["겉으로 색이 비슷해도 원인이 다를 수 있습니다. 사진만으로 녹물이라고 확정하지 않고, 제거 가능 범위와 원인 점검 필요 여부를 구분합니다."],
  },
  {
    title: "하얀 자국과 백화 의심 부위",
    checks: ["표면에 가루나 침전물이 있는지", "젖었다 마르기를 반복하는 위치인지", "줄눈이나 물이 흐르는 곳과 연결되는지", "광택만 달라진 자국인지"],
    notes: ["하얀 자국은 백화, 세정제 잔여물, 표면 손상 등 여러 상태로 나타날 수 있습니다. 원인을 구분하지 않고 같은 제거제를 적용하지 않습니다."],
  },
];

const separateWorkItems = [
  "연마와 광택 복원",
  "긁힘·패임·균열 보수",
  "줄눈 보수와 석재 교체",
  "기존 코팅 박리와 보호제 시공",
  "누수·방수 보수",
  "외벽 등 별도 접근 장비가 필요한 작업",
];

const extraCostItems = [
  "일반 세척 외에 침투 얼룩 처리가 필요한 경우",
  "녹물·백화·접착제 등 별도 오염 처리가 추가되는 경우",
  "기존 코팅 제거가 필요한 경우",
  "가구와 집기 이동이 추가되는 경우",
  "부분 시험 결과에 따라 추가 공정이 필요한 경우",
  "작업 구역이 늘어나거나 재방문이 필요한 경우",
  "영업시간 때문에 작업을 여러 구간으로 나누는 경우",
  "벽면·고소부 등 접근 조건이 달라지는 경우",
];

const processSteps: [string, string][] = [
  ["사진과 오염 이력 상담", "공간 전체와 오염 부위 사진을 확인합니다. 발생 시기, 원인으로 짐작되는 물질, 이전에 사용한 세정제도 함께 알려주세요."],
  ["재질과 표면 상태 확인", "석재 종류, 마감과 기존 코팅, 손상 여부를 살펴봅니다. 청소 가능한 오염과 복원 검토가 필요한 부분을 구분합니다."],
  ["작업 범위와 견적 협의", "일반 세척과 별도 얼룩 처리 범위를 정합니다. 재질이나 반응이 불확실하면 부분 시험의 필요성과 조건도 협의합니다."],
  ["주변 보호와 세척", "인접한 마감재와 집기를 보호하고, 확인한 조건에 맞춰 작업합니다. 예상과 다른 표면 반응이 나타나면 방법과 범위를 재검토합니다."],
  ["마무리와 건조 상태 확인", "작업에 따른 잔여물을 정리하고 표면 상태를 확인합니다. 젖어 있을 때와 마른 뒤의 색 차이도 고려해 결과를 살펴봅니다."],
  ["검수와 관리 안내", "처리한 부위, 남은 얼룩, 별도 조치가 필요한 부분을 설명합니다. 공간 이용과 이후 관리 방법을 안내합니다."],
];

const caseChecklist = [
  "일반적인 표면 오염이 정리되었는지",
  "얼룩의 범위와 진하기가 어떻게 달라졌는지",
  "작업 구역 경계에 차이가 남는지",
  "세정 잔여물이나 끈적임이 있는지",
  "남은 흔적이 오염인지 표면 손상인지",
];

const reservationChecklist = [
  "주거 공간인지 영업 공간인지",
  "출입이 적은 시간대",
  "작업 구역을 비울 수 있는 시간",
  "가구·집기 이동 가능 여부",
  "급수와 전기 사용 조건",
  "입주, 개업 또는 다른 공사 일정",
];

const checkupChecklist = [
  "작업 부위의 누락 여부",
  "일반 오염과 세척 잔여물의 처리 상태",
  "별도 얼룩 제거 부위의 변화",
  "남은 변색과 표면 손상",
  "주변 시설물의 정리 상태",
];

const prepItems = [
  "공간 전체와 얼룩을 가까이 찍은 사진을 준비해주세요.",
  "석재명이나 시공 자료가 있으면 함께 보내주세요.",
  "언제, 어떤 상황에서 얼룩이 생겼는지 알려주세요.",
  "사용했던 세정제의 이름이나 제품 사진을 알려주세요.",
  "기존 코팅·연마·보호제 시공 이력이 있으면 말씀해주세요.",
  "이동 가능한 소품은 미리 정리해주세요.",
  "큰 가구는 무리하게 옮기지 말고 이동 필요 여부부터 상담해주세요.",
];

const faqItems: [string, string][] = [
  ["대리석 얼룩 제거와 대리석 청소는 같은 작업인가요?", "표면에 붙은 일반 오염을 세척하는 작업과 안쪽으로 스며든 얼룩을 처리하는 작업은 다를 수 있습니다. 상태를 확인해 범위와 비용을 구분합니다."],
  ["대리석이 뿌옇게 보이면 물때 제거로 해결되나요?", "물때라고 단정할 수 없습니다. 세정제 잔여물이나 산성 물질에 의한 표면 손상일 수 있어 상태를 확인해야 합니다. 청소와 복원 검토가 필요한 경우를 나눠 안내합니다."],
  ["화강석 기름 얼룩도 제거할 수 있나요?", "오염 깊이와 발생 시점, 표면 마감에 따라 다릅니다. 일반 세척으로 가능한지, 별도 처리가 필요한지 확인한 뒤 안내합니다."],
  ["석재청소를 하면 광택도 살아나나요?", "표면 오염이 정리되면서 외관이 개선될 수는 있지만, 마모되거나 손상된 광택을 복원하는 작업과는 다릅니다. 연마·광택 복원은 별도로 확인해야 합니다."],
  ["녹물과 백화도 기본비용에 포함되나요?", "일반 오염과 구분해 견적에서 확인합니다. 원인과 재질에 따라 별도 처리나 추가 점검이 필요할 수 있습니다."],
  ["얼룩이 있는 부분만 청소할 수 있나요?", "부분 작업으로 상담할 수 있습니다. 다만 주변과의 색 차이, 작업 준비 비용, 얼룩 상태에 따라 적합한 범위가 달라집니다."],
  ["대리석 식탁이나 주방 상판도 가능한가요?", "재질과 마감, 오염 상태를 먼저 확인해야 합니다. 천연석인지 인조대리석인지에 따라 방법이 달라지므로 제품 정보와 사진을 보내주시면 가능 여부를 안내합니다."],
  ["석재 종류를 모르는데 상담할 수 있나요?", "네. 전체 모습과 표면을 가까이 찍은 사진부터 보내주세요. 사진으로 확정하기 어려우면 시공 자료나 현장 확인이 필요할 수 있습니다."],
  ["한 번 청소하면 얼룩이 완전히 없어지나요?", "모든 얼룩의 완전 제거를 보장하지 않습니다. 침투 정도, 자재 변색과 손상 여부에 따라 결과가 달라질 수 있습니다."],
  ["청소 후 코팅도 해야 하나요?", "모든 석재에 같은 코팅이나 보호 처리가 필요한 것은 아닙니다. 기존 처리 상태와 용도를 먼저 확인해야 하며, 보호제 시공은 기본 청소와 별도입니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진으로 우선 상담할 수 있습니다. 재질이나 얼룩 깊이, 표면 손상이 불분명하면 현장 확인 또는 부분 시험 후 범위가 구체화될 수 있습니다."],
  ["석재 외벽도 함께 상담할 수 있나요?", "외벽은 석재 상태뿐 아니라 높이와 접근 조건도 확인해야 합니다. 외벽청소와 연계해 실제 작업 가능 여부와 범위를 상담합니다."],
];

const contactChecklist = [
  "현장 지역과 공간 종류",
  "석재 종류 또는 제품 정보",
  "공간 전체 사진과 오염 부위 사진",
  "대략적인 작업 면적",
  "얼룩이 발생한 시점과 원인",
  "이전에 사용한 세정제",
  "코팅·연마 등 기존 관리 이력",
  "희망 작업일과 공간 이용 일정",
];

const path = "/석재청소/";

export default function StoneCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "석재청소",
      serviceType: "석재청소",
      description: "닦아도 남는 대리석 얼룩, 부분적으로 짙어진 화강석 바닥이 고민이신가요? 찐청소는 석재 종류와 표면 마감, 오염 이력을 확인해 일반 세척과 별도 얼룩 처리 범위를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "석재청소", item: absoluteUrl(path) },
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

      {/* 히어로 */}
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/service-scenes/stone-floor-condition.webp" alt="" fill preload className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/75" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>석재청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">외부·공간청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">대리석·화강석 청소, 얼룩과 표면 손상부터 구분합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>닦아도 남는 대리석 얼룩, 부분적으로 짙어진 화강석 바닥이 고민이신가요? 찐청소는 석재 종류와 표면 마감, 오염 이력을 확인해 일반 세척과 별도 얼룩 처리 범위를 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">석재청소·얼룩 제거 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className={readability.layout}>
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} id="service-toc" />

        <div className={`${readability.body} space-y-14 text-gray-800`}>
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} guide={{ path, toc }} />
          <BackToContents />
          </section>


          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="석재청소 비용과 견적 산정 기준" />
            <ReadingParagraph>석재청소 비용은 면적만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["넓은 로비의 일반적인 보행 오염과 ","같은 화강석이라도 "]}>넓은 로비의 일반적인 보행 오염과 작은 구역에 깊게 스며든 기름 얼룩은 필요한 작업이 다릅니다. 같은 화강석이라도 표면 마감과 기존 코팅 상태에 따라 접근 방법이 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["비용을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품 비용을 중심으로 실제 작업 조건을 반영합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 견적 기준</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">면적은 참고하되, 실제로 어떤 작업이 필요한지를 먼저 봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적에서는 일반 세척 범위와 별도 얼룩 제거 범위를 구분해 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 재질·오염별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="대리석·화강석 및 오염별 작업 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">기름 얼룩·녹물·하얀 자국은 원인부터 구분합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">석재에 스며든 오염과 표면에 남은 잔여물, 광택이 손상된 자국은 같은 작업이 아닙니다. 청소에 사용했던 제품과 발생 경위를 알려주세요. 연마·광택 복원, 보수와 보호제 시공은 기본 세척에 자동으로 포함되지 않습니다.</ReadingParagraph>
            <ReadingParagraph>석재청소는 모든 자국을 같은 약품으로 지우는 작업이 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목을 기준으로 상담하고, 실제 포함 범위는 석재와 현장 상태에 맞춰 정합니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">기본 작업으로 협의하는 범위</ReadingParagraph>
                  <ul className="mt-2 space-y-1.5">
                    {item.included.map(li => (
                      <li key={li} className="flex items-start gap-2 text-[15.5px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">별도 확인 항목</ReadingParagraph>
                  <ul className="mt-2 space-y-1.5">
                    {item.excluded.map(li => (
                      <li key={li} className="flex items-start gap-2 text-[15.5px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                  <ReadingParagraph className="mt-3 text-[15px] text-gray-500">{item.note}</ReadingParagraph>
                </div>
              ))}

              {diagnosisItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">확인할 내용</ReadingParagraph>
                  <ul className="mt-2 space-y-1.5">
                    {item.checks.map(li => (
                      <li key={li} className="flex items-start gap-2 text-[15.5px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {li}
                      </li>
                    ))}
                  </ul>
                  {item.notes.map(n => (
                    <ReadingParagraph key={n} className="mt-3 text-[15px] text-gray-500">{n}</ReadingParagraph>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">석재청소와 구분해야 하는 작업</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">다음 항목은 기본 세척에 자동으로 포함되지 않습니다.</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateWorkItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">필요한 경우 실제 진행 가능 여부와 범위를 별도로 확인합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">인조대리석, 엔지니어드 스톤, 포세린타일도 천연 대리석과 동일하게 취급하지 않습니다. 재질이 불분명하면 제품 정보나 시공 자료를 함께 확인합니다.</ReadingParagraph>
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>다음 조건에서는 작업량과 비용이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">추가 처리가 필요하면 해당 위치와 이유, 비용을 설명한 뒤 진행 여부를 협의합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">&lsquo;석재청소&rsquo;라는 이름에 세척부터 연마와 코팅까지 모두 포함되어 있다고 생각하지 않도록 견적에서 구분해드립니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="석재청소 진행 순서와 소요 시간" />
            <ServiceScenePhotos path={path} section="process" />
            <ol className="mt-4 space-y-4">
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
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간은 면적과 오염 종류에 따라 달라집니다. 별도 얼룩 처리나 건조 상태 확인이 필요한 경우에는 한 번의 방문으로 끝나는 작업과 일정이 다를 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진에서 확인할 부분" />
            <ReadingParagraph>석재는 조명과 촬영 각도, 젖음 상태에 따라 색과 광택이 다르게 보입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">전후 사진은 같은 위치와 비슷한 조명에서 비교하고, 마른 상태도 함께 확인하는 것이 좋습니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 확인 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">젖어서 색이 진해진 상태나 조명 반사가 강한 사진만으로 결과를 판단하지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">세척 결과와 광택 복원 결과도 구분해서 확인해야 합니다.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 진행 가능 여부와 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">상담 시 함께 알려주세요.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">로비나 통로처럼 계속 사용하는 공간은 작업 구역과 이용 동선을 나눌 수 있는지 살펴봅니다. 청소 완료 시점과 다시 이용할 수 있는 시간은 현장 조건에 맞춰 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <ReadingParagraph>작업 후에는 협의한 구역과 항목을 기준으로 확인합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {checkupChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-5">석재 안쪽으로 깊게 스며든 얼룩이나 오래된 변색은 일부 남을 수 있습니다. 표면이 손상된 흔적은 청소만으로 회복되지 않을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">제거되지 않는 자국을 없애기 위해 무조건 더 강한 처리를 반복하지 않습니다. 자재 상태와 가능한 개선 범위를 설명합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 누락이나 이상이 의심되면 위치와 사진을 알려주세요. 계약 범위와 현장 상태를 확인해 대응을 안내합니다. 재방문과 추가 작업 조건은 계약 시 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="석재청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">재질이 확인되지 않은 상태에서 식초, 구연산, 강한 욕실 세정제나 거친 연마도구를 임의로 사용하지 마세요. 특히 대리석은 산성 물질로 표면이 손상될 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">청소 후에도 해당 석재와 마감에 적합한 관리 제품을 사용하는 것이 중요합니다. 액체를 흘렸다면 오래 방치하지 말고 부드러운 소재로 흡수해 정리해주세요.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">석재청소·오염 제거 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">&ldquo;대리석에 생긴 자국이 닦아도 그대로예요.&rdquo; &ldquo;화강석 바닥이 부분적으로 검게 변했어요.&rdquo; &ldquo;청소로 될지, 연마가 필요한지 모르겠어요.&rdquo;</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">석재 이름이나 오염 원인을 정확히 모르셔도 괜찮습니다. 현재 상태와 이전에 시도한 방법부터 알려주세요.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>석재청소·얼룩 제거 견적 문의하기 →</CtaButton>
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
