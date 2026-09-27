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
  ["scope", "재질별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 처리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "상가, 사무실, 빌딩, 공장, 주택 등 건물 외벽"],
  ["상담 범위", "외벽 표면의 먼지·매연성 오염·빗물 자국·부착 오염"],
  ["재질 확인", "석재, 벽돌, 타일, 금속 패널, 도장면 등"],
  ["견적 기준", "필요 인원 + 장비·약품 비용을 중심으로 작업 면적과 접근 조건 반영"],
  ["별도 협의", "외창, 간판, 차양, 특수 얼룩 제거, 보수·코팅 작업"],
  ["예상 시간", "작업 면수, 높이, 오염 상태와 현장 운영 조건에 따라 안내"],
  ["서비스 지역·예약", "현장 주소와 희망 일정으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "실제로 청소할 외벽의 면적과 면수",
  "건물 높이와 외벽 구조",
  "외장재 종류와 표면 상태",
  "오염의 종류, 범위와 부착 정도",
  "작업 위치까지 접근하는 방법",
  "장비 진입·설치 공간과 주변 장애물",
  "보행자·차량 동선 관리와 주변 보호 범위",
  "급수와 세척수 관리 조건",
  "영업시간 등 작업 가능한 시간대",
];

const scopeItems: { title: string; included: string[]; excluded: string[]; note: string }[] = [
  {
    title: "석재 외벽",
    included: ["석재 표면에 쌓인 먼지와 일반 오염", "빗물 흐름을 따라 남은 표면 오염", "협의한 부위의 세척과 마무리"],
    excluded: ["백화, 녹물, 기름 등 특수 얼룩", "연마, 광택 복원과 발수·보호 코팅", "균열, 줄눈과 실란트 보수"],
    note: "석재의 종류와 기존 처리 상태에 따라 제거 가능한 범위가 달라집니다. 표면 오염과 석재 안쪽으로 스며든 얼룩을 구분해 안내합니다.",
  },
  {
    title: "벽돌과 타일 외벽",
    included: ["표면에 쌓인 먼지와 묵은 오염", "줄눈 주변의 접근 가능한 표면 오염", "외벽 상태에 맞춘 세척과 마무리"],
    excluded: ["백화나 시멘트성 잔여물", "파손 타일 교체와 줄눈 보수", "들뜸·탈락 우려가 있는 부분의 보수"],
    note: "줄눈이 약해졌거나 마감재가 들뜬 곳은 청소보다 보수가 먼저 필요할 수 있습니다.",
  },
  {
    title: "금속 패널과 복합 패널 외벽",
    included: ["패널 표면의 먼지와 빗물 자국", "표면에 부착된 일반 오염", "기존 마감을 고려한 세척"],
    excluded: ["접착제와 보호필름 잔여물", "산화·부식이나 도장 손상", "패널 교체와 실란트 보수"],
    note: "오염을 제거하는 작업과 벗겨진 도장이나 부식된 표면을 복구하는 작업은 다릅니다.",
  },
  {
    title: "도장면과 드라이비트 등 외단열 마감",
    included: ["표면의 갈라짐, 들뜸과 벗겨짐", "오염이 붙어 있는 정도", "세척 가능한 마감 상태와 범위"],
    excluded: ["재도장과 마감 보수", "균열 보수와 방수 작업", "손상된 외단열 마감 복구"],
    note: "손상 우려가 있는 표면은 강한 세척을 전제로 견적을 잡지 않습니다. 현장 상태에 따라 작업 범위를 제한하거나 보수를 먼저 안내할 수 있습니다.",
  },
];

const glassScopeItems = [
  "유리 바깥 면과 안쪽 면",
  "창틀과 창 주변 프레임",
  "방충망과 창틀 내부",
  "일반 오염과 고착된 물때",
  "유리 코팅·필름 상태",
];

const restrictedItems = [
  "안전한 접근과 작업 구역 확보가 어려운 곳",
  "외장재 탈락이나 파손 우려가 있는 부분",
  "누수 위험이 있거나 손상이 진행된 마감",
  "정체를 확인하기 어려운 유해 오염",
  "별도 전문 보수나 보존 처리가 필요한 자재",
];

const extraCostItems = [
  "처음 요청한 면 외에 측면·후면 등이 추가되는 경우",
  "별도 접근 장비나 추가 인원이 필요한 경우",
  "간판·차양·외창 등 작업 대상이 추가되는 경우",
  "백화·녹물·접착제 등 별도 처리가 필요한 오염",
  "주변 차량·시설물 보호 범위가 넓은 경우",
  "작업 시간을 나누거나 제한된 시간에 진행해야 하는 경우",
  "세척수 회수·처리 등 별도 현장 조치가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["사진과 현장 정보 상담", "건물 전체 모습, 오염 부위, 청소할 면을 확인합니다. 주소와 층수, 주변 도로·주차 환경도 함께 살펴봅니다."],
  ["외벽 상태와 접근 조건 확인", "외장재와 손상 상태, 작업 높이, 장비 접근 공간을 확인합니다. 급수와 세척수 관리, 보행자·차량 동선도 검토합니다."],
  ["작업 범위와 견적 협의", "청소할 면과 포함 항목, 별도 작업을 정합니다. 영업이나 건물 이용에 영향을 주는 구간은 작업 시간과 통제 범위를 조율합니다."],
  ["주변 보호와 세척 방법 확인", "작업 구역과 주변 시설물을 보호합니다. 재질이나 오염 상태에 따라 부분 시험 세척이 필요한지도 판단합니다."],
  ["협의한 외벽 세척", "외벽 상태에 맞는 방법으로 작업합니다. 제거 과정에서 자재 손상이나 예상과 다른 상태가 확인되면 무리하게 진행하지 않고 상황을 설명합니다."],
  ["마무리 정리와 검수", "작업 부위와 주변을 정리하고, 남은 얼룩과 마감재 손상을 구분해 안내합니다."],
];

const caseChecklist = [
  "청소하기로 한 면이 빠짐없이 작업되었는지",
  "창 아래나 돌출부 주변의 오염은 어떤지",
  "세척 경계가 눈에 띄게 남아 있는지",
  "남은 흔적이 오염인지 변색·부식인지",
  "주변 유리와 시설물에 작업 잔여물이 남았는지",
];

const reservationChecklist = [
  "상가 영업시간과 휴무일",
  "건물 출입이 많은 시간대",
  "주차 차량 이동 가능 시간",
  "관리사무소 또는 건물 관리자의 협의 필요 여부",
  "간판·외벽 보수 등 예정된 공사",
  "행사, 개업, 입점과 관련된 일정",
];

const checkupChecklist = [
  "작업 대상 면과 부위의 누락 여부",
  "일반 오염과 세척 잔여물의 처리 상태",
  "남아 있는 변색·부식·자재 손상",
  "후속 보수가 필요한 부분",
  "주변 시설물과 작업 구역의 정리 상태",
];

const prepItems = [
  "건물 주소와 층수",
  "건물 정면·측면·후면 사진",
  "청소를 원하는 면과 오염 부위 사진",
  "알고 있는 외장재 종류",
  "누수, 균열, 들뜸 등 기존 문제",
  "주변 도로와 장비 진입 공간",
  "급수 위치와 사용 가능 여부",
  "영업시간과 희망 작업일",
];

const coordinationItems = [
  "작업 구역의 차량과 이동 가능한 물품 정리",
  "창문과 출입문 관리",
  "간판, 조명, 전기시설 등 보호 대상",
  "보행자·입주자 안내와 출입 동선",
  "필요한 현장 승인과 관리 주체별 협조 사항",
];

const faqItems: [string, string][] = [
  ["외벽청소 비용은 평당으로 계산하나요?", "건물 전체 평수만으로 계산하지 않습니다. 실제 작업 면적, 높이, 외장재와 접근 조건에 따라 필요한 인원 및 장비·약품 비용을 중심으로 산정합니다."],
  ["건물 정면이나 1층만 청소할 수 있나요?", "원하는 면이나 구간을 지정해 상담할 수 있습니다. 다만 부분 작업도 장비 준비와 주변 보호가 필요해 건물 전체 견적을 단순히 면적 비율로 나눈 금액과는 다를 수 있습니다."],
  ["외벽청소에 유리창도 포함되나요?", "견적에서 정한 범위에 따라 다릅니다. 외벽 마감재, 유리 바깥 면, 유리 안쪽 면, 창틀을 구분해 요청해주세요."],
  ["외벽 고압세척을 요청하면 모든 재질에 적용하나요?", "아닙니다. 표면과 마감 상태에 맞는 방법을 검토합니다. 노후하거나 손상된 외벽은 강한 세척이 적합하지 않을 수 있으며, 안전한 접근이나 보수 확인이 먼저 필요한 경우도 있습니다."],
  ["높은 건물도 작업할 수 있나요?", "높이만으로 가능 여부를 판단하지 않습니다. 건물 구조, 안전한 접근 방법, 장비 설치 공간과 주변 환경을 확인한 뒤 안내합니다."],
  ["로프나 고소작업차를 사용하나요?", "특정 방식을 미리 정하지 않고 현장 조건에 맞는 접근 방법과 실제 진행 가능 여부를 확인합니다. 필요한 장비와 비용은 견적에 안내합니다."],
  ["백화나 녹물 자국도 모두 제거되나요?", "오염 원인과 깊이, 자재 상태에 따라 다릅니다. 일반 외벽 세척과 별도 처리가 필요한 작업을 구분하며, 완전 제거를 사전에 보장하지 않습니다."],
  ["드라이비트나 오래된 외벽도 청소할 수 있나요?", "표면의 들뜸·균열·노후 상태를 먼저 확인해야 합니다. 손상 우려가 크면 범위를 제한하거나 보수를 먼저 안내할 수 있습니다."],
  ["청소하면 외벽 누수도 해결되나요?", "외벽청소는 오염을 제거하는 작업입니다. 균열, 방수층이나 실란트 문제로 인한 누수를 보수하는 공사와는 다릅니다."],
  ["가게 영업 중에도 작업할 수 있나요?", "출입구와 작업 구역을 분리할 수 있는지 확인한 뒤 협의합니다. 고객과 차량 동선에 따라 일부 시간대 통제가 필요하거나 영업 외 시간 작업이 적합할 수 있습니다."],
  ["비가 오거나 바람이 강하면 어떻게 되나요?", "기상 상태와 작업 방식에 따라 연기하거나 중단할 수 있습니다. 일정 변경이 필요하면 현장 담당자와 조율합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진으로 우선 상담할 수 있습니다. 장비 접근 공간, 외장재 손상과 실제 높이 등은 추가 자료나 현장 확인 후 최종 견적에 반영될 수 있습니다."],
];

const contactChecklist = [
  "현장 주소와 건물 종류",
  "건물 층수와 청소를 원하는 면",
  "전체 사진과 오염 부위 근접 사진",
  "주변 도로·주차 공간 사진",
  "기존 누수나 외벽 손상 여부",
  "외창·간판 등 함께 원하는 작업",
  "영업시간과 희망 일정",
];

const path = "/외벽청소/";

export default function ExteriorWallCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "외벽청소",
      serviceType: "외벽청소",
      description: "창 아래 검은 줄과 외벽에 쌓인 먼지, 빗물 자국이 남아 있나요? 찐청소는 석재·타일·패널 등 마감재 상태와 건물 높이, 접근 조건을 확인해 작업 가능한 면과 세척 범위를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "외벽청소", item: absoluteUrl(path) },
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
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[max(650px,50vw)] md:justify-center md:py-20 lg:min-h-[max(620px,50vw)]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/service-scenes/wall-extended-tool.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:aspect-[3/2] md:w-3/4 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src="/images/service-scenes/wall-extended-tool.webp" alt="" fill preload className="object-cover" sizes="(min-width: 768px) 75vw, 100vw" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>외벽청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">외부·공간청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">건물 외벽청소, 재질과 빗물·묵은 오염을 함께 살펴봅니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>창 아래 검은 줄과 외벽에 쌓인 먼지, 빗물 자국이 남아 있나요? 찐청소는 석재·타일·패널 등 마감재 상태와 건물 높이, 접근 조건을 확인해 작업 가능한 면과 세척 범위를 안내합니다.</ReadingParagraph>
            <ReadingParagraph>건물도 첫인상이 있으니까요. 묵은 때는 정리하고, 외벽 상태에 맞춰 무리하지 않고 작업하겠습니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">외벽청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="외벽청소 비용과 견적 산정 기준" />
            <ReadingParagraph>외벽청소 비용은 건물의 연면적이나 층수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 3층 건물이어도 ","건물 전체 면을 작업하는 경우는 "]}>같은 3층 건물이어도 도로 쪽 한 면만 청소하는 경우와 건물 전체 면을 작업하는 경우는 다릅니다. 장비가 접근하기 쉬운 외벽과 좁은 골목에 접한 외벽도 준비 과정과 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["비용을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품 비용을 중심으로 실제 작업 조건을 반영해 견적을 안내합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 견적 기준</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">면적은 중요한 참고 기준입니다. 다만 면적만 곱해서는 설명되지 않는 작업 조건까지 함께 살펴야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교하실 때는 총금액과 함께 어느 면을 어디까지 작업하는지, 장비 비용과 별도 항목이 무엇인지 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 재질별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="외벽 재질별 청소 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">석재 얼룩·패널 빗물 자국·유리 오염은 구분합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">외벽 마감재 세척과 유리창 바깥 면 청소를 나눠 정합니다. 녹물·백화 같은 특수 얼룩, 손상된 도장과 실란트 보수는 일반 세척과 별도입니다. 높은 외벽은 장비 설치 공간과 주변 통행 조건도 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph>외벽청소는 물을 강하게 뿌리는 것만으로 끝나는 작업이 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">재질과 마감 상태에 따라 적합한 세척 방법이 다릅니다. 아래 항목은 상담 기준이며, 실제 포함 범위는 현장 상태를 보고 정합니다.</ReadingParagraph>

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

              <div className="rounded-xl border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-brand-dark">유리 외벽과 외창</h3>
                <ReadingParagraph className="mt-2">유리 외벽이나 창문 바깥 면의 청소를 원하시면 외벽 세척 범위와 함께 말씀해주세요.</ReadingParagraph>
                <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">구분해서 정할 항목</ReadingParagraph>
                <ul className="mt-2 space-y-1.5">
                  {glassScopeItems.map(li => (
                    <li key={li} className="flex items-start gap-2 text-[15.5px]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {li}
                    </li>
                  ))}
                </ul>
                <ReadingParagraph className="mt-3 text-[15px] text-gray-500">외벽청소를 신청했다고 모든 창문의 안팎과 창틀까지 포함되는 것은 아닙니다. 유리 위주 작업은 외창청소 서비스로도 상담할 수 있습니다.</ReadingParagraph>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">작업을 제한하거나 별도 점검이 필요한 경우</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {restrictedItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">가능 여부를 확인하기 전에 모든 높이와 모든 외벽을 작업할 수 있다고 약속하지 않습니다.</ReadingParagraph>
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>다음 조건에서는 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">방수, 도장, 실란트 교체, 외장재 보수와 코팅은 외벽 세척과 구분합니다. 진행 가능 여부와 비용도 별도로 협의합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">현장에서 추가 작업이 필요하면 해당 위치와 이유, 비용을 설명한 뒤 진행 여부를 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="외벽청소 진행 순서와 소요 시간" />
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
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">소요 시간은 면적뿐 아니라 준비와 접근, 주변 보호에 필요한 시간까지 반영합니다. 강풍·강우 등 기상이나 현장 조건에 따라 일정이 조정될 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진에서 확인할 부분" />
            <ReadingParagraph>외벽은 햇빛과 촬영 각도, 표면이 젖어 있는지에 따라 색이 다르게 보입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">전후 사진은 가능하면 같은 위치와 비슷한 조건에서 비교하고, 마른 상태도 함께 확인하는 것이 좋습니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 확인 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">외벽청소의 결과는 사진 한 장의 밝기보다 실제 작업 범위와 표면 상태로 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소로 달라진 부분과 보수가 필요한 부분을 나눠 살펴보세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 작업 가능 여부와 일정을 확인해드립니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">다음 조건은 미리 말씀해주세요.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">영업 중인 건물은 출입구와 보행 동선을 확보할 수 있는지부터 살펴봅니다. 상황에 따라 구간을 나누거나 영업 외 시간 작업을 협의할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">다만 모든 현장에서 영업에 영향 없이 진행할 수 있는 것은 아닙니다. 필요한 통제 범위를 먼저 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <ReadingParagraph>작업 후에는 협의한 범위를 기준으로 세척 상태와 주변 정리 상태를 확인합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {checkupChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-5">오래된 변색, 부식, 표면 손상은 청소만으로 원래 상태로 돌아오지 않을 수 있습니다. 무리한 제거로 마감을 손상시키지 않도록 가능한 범위를 설명합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 누락이나 이상이 의심되면 위치와 사진을 보내주세요. 작업 내용과 현장 상태를 확인해 대응을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">재방문과 추가 작업의 조건은 계약 시 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="외벽청소 전 준비사항" />
            <ReadingParagraph className="font-bold text-brand-dark">상담 전에 준비하면 좋은 정보</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <ReadingParagraph className="mt-8 font-bold text-brand-dark">작업 전 협의할 내용</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {coordinationItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적 사진을 찍기 위해 옥상 가장자리로 접근하거나 창밖으로 몸을 내밀 필요는 없습니다. 안전한 위치에서 촬영 가능한 자료만 보내주세요.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">외벽청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">&ldquo;건물 정면만 먼저 깨끗하게 하고 싶어요.&rdquo; &ldquo;창 아래로 검은 줄이 길게 남아 있어요.&rdquo; &ldquo;페인트를 다시 칠하기 전에 청소로 어디까지 달라질지 궁금해요.&rdquo;</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">외장재 이름이나 필요한 작업 방법을 모르셔도 괜찮습니다. 건물 전체 모습과 신경 쓰이는 부위를 보여주세요.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>외벽청소 견적 문의하기 →</CtaButton>
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
