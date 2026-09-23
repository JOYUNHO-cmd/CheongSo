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
  ["scope", "외창·내창·창틀·방충망"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "아파트·주택·상가 등의 외부 유리 면"],
  ["주요 확인", "창 구조, 크기와 수량, 오염 상태, 작업 높이"],
  ["범위 구분", "외창·내창·창틀·방충망을 항목별로 확인"],
  ["견적 기준", "필요한 인원, 장비·약품, 작업량과 접근 조건"],
  ["작업 방식", "안전한 접근 가능 여부를 확인한 뒤 결정"],
  ["일정 조율", "날씨, 건물 관리 조건, 주변 이용 상황 반영"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 창의 위치와 수량",
  "유리의 크기와 구조",
  "창이 열리는 방식과 고정창 유무",
  "층수와 작업 높이",
  "먼지·물자국·부착물 등 오염 상태",
  "내창·창틀·방충망의 추가 여부",
  "필요한 인원과 장비·약품",
  "가구 배치와 접근 조건",
  "건물 관리 규정과 작업 가능 시간",
];

const scopeItems: { title: string; paragraphs: string[] }[] = [
  {
    title: "외부 유리 면",
    paragraphs: [
      "외부에 노출된 유리의 먼지와 물자국 등 오염을 확인합니다.",
      "창 구조와 접근 조건에 따라 작업 가능한 구간을 정하고, 어려운 부분은 사전에 안내합니다.",
      "높은 곳이나 닿기 어려운 면을 무조건 작업한다고 약속하지 않습니다.",
    ],
  },
  {
    title: "내부 유리 면",
    paragraphs: [
      "실내 쪽 손자국과 오염도 함께 청소하고 싶다면 내창 작업을 요청해 주세요.",
      "바깥 면만 청소해도 실내 쪽 얼룩이 남아 있으면 결과가 다르게 느껴질 수 있으므로, 어느 면에 오염이 있는지 함께 살펴봅니다.",
    ],
  },
  {
    title: "이중창과 여러 겹의 창",
    paragraphs: [
      "이중창은 창짝과 유리 면이 여러 개여서 ‘외창’이라는 표현만으로 범위를 판단하기 어렵습니다.",
      "바깥쪽 창의 외부 면인지, 창 사이의 면까지 포함하는지 구체적으로 정합니다.",
      "견적과 완료 확인 모두 합의한 면을 기준으로 진행합니다.",
    ],
  },
  {
    title: "창틀과 프레임",
    paragraphs: [
      "창틀의 레일, 모서리, 프레임 등은 유리 세척과 별도 항목으로 확인합니다.",
      "먼지와 제거 가능한 오염을 살피고, 실리콘·도장·프레임의 기존 상태도 구분합니다.",
      "배수 문제나 창호 부품 수리는 일반 청소와 다른 작업입니다.",
    ],
  },
  {
    title: "방충망",
    paragraphs: [
      "방충망 청소를 원하시면 망의 상태와 접근 조건, 탈거 필요 여부를 확인합니다.",
      "찢어짐이나 변형이 있는 방충망은 세척과 교체 판단을 구분해야 합니다.",
      "방충망 탈거와 교체가 자동으로 포함되는 것은 아닙니다.",
    ],
  },
  {
    title: "고정창과 접근이 어려운 구간",
    paragraphs: [
      "열리지 않는 창, 난간이나 구조물에 가려진 부분, 높은 유리 면은 별도 확인이 필요합니다.",
      "사진과 현장을 검토해 안전한 접근 방법과 수행 가능 범위를 판단합니다.",
      "로프·고소장비·실내 접근 등 특정 방식이 모든 현장에 적용되는 것은 아닙니다.",
    ],
  },
  {
    title: "물자국·부착물과 특수 얼룩",
    paragraphs: [
      "일반 먼지와 오래 고착된 얼룩, 접착 흔적 등은 필요한 작업이 다를 수 있습니다.",
      "유리와 표면 처리 상태를 확인하고, 필요한 경우 일부 구간을 먼저 살펴 제거 가능 범위와 예상 결과를 안내합니다.",
      "얼룩처럼 보이는 흠집이나 표면 손상은 일반 세척과 구분합니다.",
    ],
  },
];

const extraCostItems = [
  "청소할 방이나 창의 수량이 늘어나는 경우",
  "외창에 내창 작업을 추가하는 경우",
  "창틀과 방충망을 함께 요청하는 경우",
  "고정창 등 별도 접근 검토가 필요한 경우",
  "오래된 부착물이나 특수 얼룩 제거가 필요한 경우",
  "별도 장비와 작업 준비가 필요한 경우",
  "가구와 물품 이동이 추가되는 경우",
];

const separateScopeItems = [
  "창문과 창호의 분해·수리",
  "방충망 교체",
  "실리콘 보수와 누수 수리",
  "필름 제거·재시공",
  "유리 연마·코팅·교체",
  "외벽과 난간 등 별도 구역 청소",
];

const processSteps: [string, string][] = [
  ["창 구조와 오염 확인", "주소와 층수, 창의 위치·크기·수량, 열리는 방식을 확인합니다. 창 전체와 주변 구조를 보여주는 사진을 함께 보내주세요."],
  ["작업 가능 범위와 견적 안내", "청소할 유리 면과 내창·창틀·방충망 포함 여부를 정합니다. 접근 조건과 필요한 인원·장비·약품을 검토해 견적을 안내합니다."],
  ["작업 조건과 주변 보호 확인", "날씨와 건물 관리 조건, 주변 통행과 물품 배치를 확인합니다. 작업에 필요한 접근 공간과 보호할 바닥·가구·전자기기 등을 미리 정합니다."],
  ["합의한 구역 세척", "창과 유리의 상태에 맞춰 정한 범위를 청소합니다. 사전에 확인하지 못한 파손이나 접근 제한이 발견되면 해당 부분의 작업 여부를 다시 확인합니다."],
  ["마무리와 검수", "작업한 유리 면과 요청한 부속 구역을 확인합니다. 세척 잔여물과 주변 정리 상태를 살펴보고, 추가 확인이 필요한 부분을 안내합니다."],
];

const caseChecklist = [
  "먼지와 물자국이 있던 유리 면",
  "가장자리와 모서리의 작업 상태",
  "견적에 포함된 내창",
  "창틀과 프레임의 요청 부위",
  "방충망 등 추가 작업 구역",
];

const reservationChecklist = [
  "비와 바람 등 작업에 영향을 주는 날씨",
  "관리사무소의 작업 관련 조건",
  "주변 보행자와 차량 이동",
  "장비 접근과 설치 공간",
  "작업 중 창 주변 공간의 사용 여부",
  "영업·근무·생활시간",
];

const prepItems = [
  "청소할 창과 제외할 창을 구분해 주세요.",
  "층수와 창의 열리는 방식을 알려주세요.",
  "창 전체와 주변 구조 사진을 준비해 주세요.",
  "내창·창틀·방충망 추가 여부를 정해 주세요.",
  "창가의 귀중품과 깨지기 쉬운 물건은 따로 보관해 주세요.",
  "커튼·블라인드와 가구의 이동 필요 여부를 알려주세요.",
  "창호 고장, 유리 균열, 필름·코팅 상태를 전달해 주세요.",
  "관리사무소의 작업 관련 조건을 확인해 주세요.",
  "급수·전원·주차·출입 조건을 알려주세요.",
  "아이와 반려동물이 작업 구역에 접근하지 않도록 공간을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["외창청소 비용은 평당으로 정하나요?", "집 전체 평수만으로 정하지 않습니다. 창의 크기와 수량, 구조, 오염과 접근 조건을 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["아파트가 고층이어도 가능한가요?", "층수만으로 가능 여부를 판단하지 않습니다. 창 구조와 주변 조건을 확인해 안전하게 작업할 수 있는 범위를 검토합니다."],
  ["실내에서 작업하나요, 밖에서 작업하나요?", "창의 구조와 접근 조건에 따라 검토합니다. 모든 현장을 같은 방식으로 진행한다고 안내하지 않으며, 가능한 작업 방법과 범위를 사전에 확인합니다."],
  ["창문을 전부 분리해서 청소하나요?", "모든 창을 일괄 탈거하지 않습니다. 구조와 상태, 필요한 작업을 확인해 탈거 여부와 담당 범위를 정합니다."],
  ["내창과 창틀, 방충망도 포함되나요?", "외창과 별도로 포함 여부를 정합니다. 상담 시 함께 청소할 항목을 알려주시면 견적에 구분해 안내합니다."],
  ["거실창만 맡길 수 있나요?", "필요한 방과 창만 지정해 상담할 수 있습니다. 창의 수량과 크기, 오염 상태를 알려주세요."],
  ["열리지 않는 고정창도 가능한가요?", "접근 조건을 먼저 확인해야 합니다. 주변 구조와 설치 위치에 따라 가능한 범위를 검토하며 모든 고정창의 작업을 보장하지는 않습니다."],
  ["베란다 창이 뿌연데 외창청소로 해결되나요?", "먼지가 묻은 면이 실내인지 외부인지부터 확인합니다. 유리 사이에 생긴 흐림이나 표면 손상은 청소와 다른 조치가 필요할 수 있습니다. 창 전체와 흐린 부위 사진을 보내주세요."],
  ["유리 사이에 낀 것처럼 보이는 얼룩도 닦을 수 있나요?", "어느 면의 문제인지 먼저 확인해야 합니다. 유리 사이 내부의 문제라면 외부 표면 세척으로 해결되지 않을 수 있어 창호 상태 확인과 구분합니다."],
  ["필름이나 코팅이 있는 창도 청소할 수 있나요?", "필름·코팅의 종류와 상태, 제조사의 관리 지침을 확인해야 합니다. 관련 정보가 있다면 작업 전에 알려주세요."],
  ["비가 오면 예약은 어떻게 되나요?", "날씨와 작업 조건에 따라 진행 여부를 판단합니다. 일정 변경과 안내 방식은 예약 시 확인해 주세요."],
  ["청소 후 미흡한 곳이 있으면 어떻게 하나요?", "합의한 범위 안에서 창의 위치와 유리 면, 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다."],
];

const contactChecklist = [
  "현장 주소와 건물 유형",
  "층수와 청소할 창의 위치",
  "창의 크기·수량·열리는 방식",
  "창 전체와 주요 오염 사진",
  "내창·창틀·방충망 추가 요청",
  "고정창과 접근이 어려운 구간",
  "필름·코팅과 기존 파손 여부",
  "희망 날짜와 작업 가능 시간",
  "건물 관리·주차·출입 조건",
];

const path = "/외창청소/";

export default function ExteriorWindowCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "외창청소",
      serviceType: "외창청소",
      description: "아파트 베란다 유리가 뿌옇거나 상가 전면 유리에 빗물 자국이 남아 있나요? 찐청소는 창 구조와 접근 조건, 유리와 필름 상태를 확인한 뒤 바깥 면의 청소 가능 범위를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "외창청소", item: absoluteUrl(path) },
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
          <Image src="/images/service-scenes/window-frame-wiping.webp" alt="" fill preload className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/75" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>외창청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">간단청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">아파트·상가 외창청소, 바깥 유리의 먼지와 물자국을 살펴봅니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>아파트 베란다 유리가 뿌옇거나 상가 전면 유리에 빗물 자국이 남아 있나요? 찐청소는 창 구조와 접근 조건, 유리와 필름 상태를 확인한 뒤 바깥 면의 청소 가능 범위를 안내합니다.</ReadingParagraph>
            <ReadingParagraph>풍경이 흐린 건지 창이 흐린 건지 헷갈렸다면, 먼저 창의 상태부터 확인해 보세요.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">외창청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className={readability.layout}>
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} id="service-toc" />

        <div className={`${readability.body} space-y-14 text-gray-800`}>
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} />
          <BackToContents />
          </section>


          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="외창청소 비용과 견적 산정 기준" />
            <ReadingParagraph>외창청소 비용은 집 전체 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 평수라도 ","열리는 방식, "]}>같은 평수라도 창의 수와 크기, 열리는 방식, 고정창 유무와 접근 조건이 다르기 때문입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업할 유리 면과 현장 조건을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">몇 평인지보다 어떤 창인지가 중요합니다</h3>
            <ReadingParagraph className="mt-2">거실의 큰 창 몇 개와 작은 창이 여러 곳에 나뉜 구조는 작업량이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">열리는 창과 열리지 않는 고정창도 접근 조건이 같지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">층수만으로 가능 여부나 비용을 정하지 않고, 실제로 어느 면까지 작업할 수 있는지 확인합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">창 전체가 보이는 사진과 오염 부위 사진을 함께 보내주시면 상담에 도움이 됩니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">거실창이나 일부 창만 요청할 수 있습니다</h3>
            <ReadingParagraph className="mt-2">집 전체 창이 아니라 거실, 특정 방, 베란다 등 필요한 곳만 지정해 상담할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">선택한 구역에 맞춰 작업량과 준비 조건을 검토합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">부분 작업의 비용이 전체 견적에서 창 개수 비율만큼 줄어드는 것은 아니므로 실제 필요한 작업을 기준으로 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 외창·내창·창틀·방충망 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="외창·내창·창틀·방충망 청소 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">유리 물때와 창틀 먼지는 작업 범위가 다릅니다</h3>
            <ReadingParagraph className="mt-2 mb-6">유리 표면의 일반 먼지·빗물 자국과 고착된 물때, 스티커 잔여물은 구분해 확인합니다. 내창, 창틀 내부와 방충망은 외창과 별도 항목입니다. 유리 자체의 손상이나 복층유리 사이의 흐림은 바깥 면 세척만으로 해결되지 않을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph>창문 청소는 어떤 유리 면과 부속 구역을 청소하는지 구분해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">상담 시 사진을 기준으로 작업할 면을 확인합니다. 외창청소라는 이름만으로 내창과 창틀·방충망까지 모두 포함되는 것은 아닙니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  {item.paragraphs.map((p, i) => (
                    <ReadingParagraph key={p} className={i === item.paragraphs.length - 1 ? "mt-2 text-[15px] text-gray-500" : "mt-2"}>{p}</ReadingParagraph>
                  ))}
                </div>
              ))}
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 별도 확인 항목" />
            <ReadingParagraph>처음 정한 범위보다 작업이 늘어나거나 별도 접근·제거 작업이 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">다음 항목은 일반 외창 세척과 구분합니다</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">추가 요청은 가능 여부와 비용을 확인한 뒤 범위를 정합니다.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="외창청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 시간은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">창의 수와 크기, 오염 정도, 접근 방법과 추가 항목에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">외창만 작업하는 경우와 내창·창틀·방충망까지 함께 하는 경우는 시간이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">현장 정보를 확인한 뒤 예상 시간을 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>외창청소는 유리의 반사와 햇빛에 따라 상태가 다르게 보일 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">가능하면 같은 창을 비슷한 위치와 조명에서 비교해 주세요.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">유리가 젖어 있는 모습만으로 결과를 판단하기보다 마무리 상태를 함께 확인하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">남은 흔적이 어느 면에 있는지, 표면 오염인지 기존 손상인지도 구분합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진 제공이 필요하면 촬영 구역과 전달 가능 여부를 상담 시 확인해 주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">외창청소는 날씨와 건물의 이용 조건을 함께 고려해야 합니다.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">현장 안전과 작업 조건에 따라 일정이나 범위를 조정할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">공동주택은 관리주체에 사전 확인할 사항과 필요한 안내가 있는지도 함께 살펴주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">청소하기로 한 면을 기준으로 확인합니다</h3>
            <ReadingParagraph className="mt-2">외부 면, 내부 면, 창 사이의 면 중 어디까지 작업했는지 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">창틀·방충망 등은 견적에 포함된 항목을 기준으로 살펴봅니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 기존 손상은 구분합니다</h3>
            <ReadingParagraph className="mt-2">흠집, 표면 처리 손상, 유리 사이에 보이는 뿌연 흔적 등은 겉면 세척만으로 해결되지 않을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">추가 세척을 검토할 부분과 창호 상태를 별도로 확인할 부분을 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 창의 위치와 면을 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳은 어느 방의 어떤 창인지, 어느 면에서 보이는지 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 후 새로 생긴 오염은 구분합니다</h3>
            <ReadingParagraph className="mt-2">청소 이후 날씨나 주변 공사 등으로 생긴 오염과 작업 당시 미흡했던 부분은 구분해서 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 후 깨끗한 상태가 일정 기간 유지된다고 일괄 보장하지는 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="외창청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 찍거나 오염을 확인하려고 창밖으로 몸을 내밀지 마세요. 실내나 지상에서 안전하게 촬영할 수 있는 사진만 보내주시면 됩니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">외창청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 어떤 창을 어디까지 청소할지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">거실 바깥 유리만 필요한지, 안쪽 유리와 창틀도 함께 닦고 싶은지, 열리지 않는 창이나 높은 구간이 있는지에 따라 준비가 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>외창청소 견적 문의하기 →</CtaButton>
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
