import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
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
  ["scope", "범위·덕트청소 차이"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·관리 기준"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "음식점·업소용 주방 후드"],
  ["범위 확인", "본체 외부·내부 접근 부위, 필터, 기름받이 등"],
  ["별도 검토", "덕트 내부, 팬·모터, 설비 분해 작업"],
  ["견적 기준", "필요한 인원, 장비·약품, 후드 크기와 오염 상태"],
  ["일정 조율", "영업 종료, 조리 준비, 사용 재개 시간 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "후드의 크기와 수량",
  "설치 높이와 접근 조건",
  "기름때의 두께와 고착 상태",
  "필터의 종류·수량과 탈착 가능 여부",
  "본체 내부와 기름받이 등 요청 부위",
  "주변 조리기기와 물품 보호 범위",
  "필요한 인원과 장비·약품",
  "작업 가능한 시간과 현장 조건",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "후드 본체 외부",
    body: "겉면과 가장자리 등 요청 부위의 기름때와 오염을 확인합니다.",
    note: "표면 재질과 기존 상태를 살펴 작업하며, 변색·부식·흠집은 제거할 오염과 구분합니다.",
    photoPairs: [["hood2-outer-01.webp", "hood2-outer-02.webp"], ["hood2-outer-03.webp", "hood2-outer-04.webp"]],
  },
  {
    title: "후드 본체 내부",
    body: "후드 안쪽은 구조와 접근 조건에 따라 작업 범위가 달라집니다. 안전하게 접근할 수 있는 부위와 분해가 필요한 부위를 확인하고, 내부 세척을 어디까지 진행할지 견적 단계에서 정합니다.",
    note: "보이지 않는 모든 공간을 무조건 청소한다고 안내하지 않습니다.",
    photoPairs: [["hood2-inner-01.webp", "hood2-inner-02.webp"], ["hood2-inner-03.webp", "hood2-inner-04.webp"]],
  },
  {
    title: "필터",
    body: "필터의 종류와 수량, 오염 상태, 탈착 가능 여부를 확인합니다. 세척 대상으로 정한 필터는 재질과 상태에 맞는 작업 방법을 검토합니다.",
    note: "파손이나 심한 변형이 있다면 세척과 교체 판단을 구분해야 합니다.",
    photoPairs: [["hood2-filter-01.webp", "hood2-filter-02.webp"], ["hood2-filter-03.webp", "hood2-filter-04.webp"]],
  },
  {
    title: "기름받이와 가장자리",
    body: "기름받이 등 오염이 모이는 부위는 구조와 접근 가능 여부를 확인해 작업 항목에 반영합니다.",
    note: "본체 겉면만 요청한 것인지, 이런 세부 부위까지 포함한 것인지 미리 정하면 완료 후 확인도 수월합니다.",
    photoPairs: [["hood2-grease-01.webp", "hood2-grease-02.webp"], ["hood2-grease-03.webp"]],
  },
  {
    title: "덕트는 후드와 별도 범위입니다",
    body: "후드 본체 청소가 연결된 배기 덕트 전체의 청소를 뜻하지는 않습니다. 덕트는 연결 경로와 길이, 점검구, 접근 조건 등에 따라 작업 가능 범위가 달라집니다.",
    note: "덕트 내부 청소를 원하시면 별도 요청 항목으로 알려주세요. 현장 정보를 확인해 수행 가능 여부부터 안내합니다.",
    photoPairs: [["hood2-duct-01.webp", "hood2-duct-02.webp"], ["hood2-duct-03.webp"]],
  },
  {
    title: "팬·모터와 설비 분해 작업",
    body: "팬·모터 등 배기설비의 세척이나 분해 작업은 후드 표면 청소와 구분합니다. 설비 종류, 접근 조건, 전기 연결과 분해·재조립의 담당 범위를 확인해야 합니다.",
    note: "청소와 고장 진단·수리·교체는 서로 다른 작업입니다.",
  },
  {
    title: "주방 전체 청소도 구분합니다",
    body: "후드청소가 바닥·벽면·조리대·주방기기 전체 청소까지 포함하는 것은 아닙니다. 작업 중 주변을 보호하고 발생한 오염을 정리하는 범위와, 기존 주방 오염을 제거하는 대청소 범위를 구분합니다.",
    note: "주방 전체 청소가 필요하면 함께 요청해 주세요.",
    photoPairs: [["hood2-around-01.webp", "hood2-around-02.webp"], ["hood2-around-03.webp", "hood2-around-04.webp"]],
  },
];

const extraCostItems = [
  "본체 외부에서 내부 세척까지 범위를 확대하는 경우",
  "필터나 후드 수량이 추가되는 경우",
  "예상보다 두껍게 쌓인 기름때가 확인되는 경우",
  "높은 설치 위치로 별도 장비가 필요한 경우",
  "조리기기 이동 등 추가 준비가 필요한 경우",
  "덕트·팬·모터 작업을 별도로 요청하는 경우",
  "제한된 비영업 시간에 맞추기 위해 인원이 추가되는 경우",
  "주방 바닥·벽면 등 청소 구역이 늘어나는 경우",
];

const processSteps: [string, string][] = [
  ["후드 상태와 요청 내용 확인", "후드 크기와 수량, 내부 구조, 필터 상태, 오염 정도를 확인합니다. 기름이 떨어지거나 소음이 나는 등 평소 이상이 있었다면 함께 알려주세요."],
  ["세척 범위와 견적 안내", "본체 외부·내부, 필터, 기름받이 등 작업 항목을 정합니다. 덕트나 배기설비 요청은 별도 검토하고, 필요한 인원과 장비·약품을 반영해 견적을 안내합니다."],
  ["작업 준비와 주변 보호", "식재료, 식기, 조리도구의 보관 위치를 정하고 주변 기기와 조리 공간의 보호 범위를 확인합니다. 필요한 사용 중지와 안전조치, 탈착·재설치 담당 범위도 작업 전에 맞춥니다."],
  ["합의한 부위 세척", "재질과 오염 상태에 맞춰 정해진 구역을 청소합니다. 사전에 확인되지 않은 파손이나 접근 제한이 발견되면 해당 부분의 작업 범위를 다시 확인합니다."],
  ["마무리와 검수", "작업 부위의 오염과 세척 잔여물, 주변 정리 상태를 확인합니다. 탈착 작업이 포함됐다면 해당 부품의 설치 상태와 사용 전 확인사항도 함께 살펴봅니다."],
];

const caseChecklist = [
  "후드 본체 외부와 가장자리",
  "작업 대상으로 정한 내부 부위",
  "필터의 전후 상태",
  "기름받이 등 세부 작업 구역",
  "처음 오염을 지적한 부분",
];

const reservationChecklist = [
  "영업 종료와 다음 조리 시작 시간",
  "식재료 준비와 납품 일정",
  "후드와 조리기기 사용을 중지할 수 있는 시간",
  "건물 출입과 장비 반입 가능 시간",
  "급수·배수와 소음 관련 제한",
  "작업 후 건조·정리·검수에 필요한 시간",
];

const prepItems = [
  "후드 전체와 내부, 필터 사진을 준비해 주세요.",
  "후드 아래 조리기기 배치도 함께 알려주세요.",
  "식재료·식기·조리도구는 작업 구역과 분리해 주세요.",
  "기기 이동이 필요하다면 가능 여부와 담당 범위를 맞춰주세요.",
  "물을 사용하면 안 되는 기기와 구역을 알려주세요.",
  "기존 파손, 기름 누출, 이상 소음 등 특이사항을 전달해 주세요.",
  "급수·전원·배수와 장비 반입 조건을 확인해 주세요.",
  "다음 조리 준비와 영업 시작 시간을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["업소 후드청소 비용은 어떻게 정하나요?", "후드 크기와 수량, 기름때의 정도, 내부·필터 작업 범위, 설치 높이와 접근 조건을 확인합니다. 필요한 인원과 장비·약품을 기준으로 견적을 안내합니다."],
  ["후드 내부와 필터도 포함되나요?", "요청 부위와 구조를 확인해 견적에 포함할 범위를 정합니다. 본체 외부만 청소하는지, 내부와 필터까지 작업하는지 상담 시 구분해 안내합니다."],
  ["덕트 내부도 함께 청소되나요?", "후드청소에 자동으로 포함되지 않습니다. 덕트의 경로와 접근 조건 등을 확인한 뒤 수행 가능 여부와 비용을 별도로 검토합니다."],
  ["팬이나 모터도 분해해서 세척하나요?", "설비 종류와 구조에 따라 별도 확인이 필요합니다. 분해·재조립 담당 범위와 세척 가능 여부를 검토하며, 수리나 교체는 청소와 구분합니다."],
  ["필터를 청소했는데도 연기가 잘 빠지지 않으면 어떻게 하나요?", "오염 외에 팬·덕트 구조나 설비 문제가 있을 수 있습니다. 후드 청소 범위와 별개로 설비 점검이 필요한지 확인해야 하며, 모터 수리와 배기설비 공사는 기본 청소와 구분합니다."],
  ["기름이 떨어지는데 청소로 해결할 수 있나요?", "어느 부위에서 어떤 상태로 떨어지는지 확인해야 합니다. 누적 오염과 관련된 부분인지, 설비 점검이 필요한 문제인지 구분하며 청소만으로 해결된다고 단정하지 않습니다."],
  ["오래된 기름때도 모두 제거되나요?", "오염의 고착 정도와 표면 상태에 따라 결과가 달라집니다. 제거할 오염과 변색·부식·손상을 구분해 안내합니다."],
  ["주방 전체도 같이 청소할 수 있나요?", "바닥·벽면·조리 공간 등 필요한 구역을 함께 요청할 수 있습니다. 후드청소와 주방 전체 청소의 항목을 나누어 견적을 안내합니다."],
  ["얼마나 자주 청소해야 하나요?", "조리 방식, 사용량, 영업시간과 실제 오염 상태에 따라 달라집니다. 모든 매장에 같은 주기를 적용하기보다 사용 환경에 맞춰 정하는 것이 좋습니다."],
  ["영업 종료 후 야간에 작업할 수 있나요?", "희망 날짜와 작업 가능 시간을 알려주시면 일정과 현장 조건을 확인합니다. 다음 조리 시작 시간도 함께 알려주세요."],
  ["청소가 끝나면 바로 사용할 수 있나요?", "작업 내용과 건조·재설치 상태 등에 따라 달라집니다. 합의한 사용 전 확인을 마친 뒤 현장의 운영 절차에 따라 사용을 재개해 주세요."],
  ["사진만으로 견적을 받을 수 있나요?", "후드 전체, 내부 오염, 필터, 아래쪽 조리 공간 사진이 초기 상담에 도움이 됩니다. 사진으로 구조나 접근 조건을 판단하기 어렵다면 현장 확인이 필요할 수 있습니다."],
];

const contactChecklist = [
  "매장 주소와 업종",
  "후드 크기와 수량",
  "후드 전체·내부·필터 사진",
  "후드 아래 조리 공간 사진",
  "청소를 원하는 부위",
  "덕트·팬·모터 관련 추가 요청",
  "설치 높이와 접근 제한",
  "희망 날짜와 작업 가능 시간",
  "다음 조리 준비 및 영업 시작 시간",
];

const caseIds = ["hood-01", "hood-02", "hood-03"] as const;
const path = "/후드청소/";

export default function HoodCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "후드청소",
      serviceType: "업소 후드청소",
      description: "후드 표면의 끈적임과 필터에 쌓인 기름때, 기름받이 오염을 구분해 살펴봅니다. 찐청소는 업소용 주방 후드의 크기와 구조, 분리 가능한 부품을 확인하고 영업 종료·조리 준비 시간에 맞춰 청소를 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "후드청소", item: absoluteUrl(path) },
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

      {/* 히어로 - 배경 사진 위에 브랜드 그라디언트를 반투명하게 얹어 사진이 비쳐 보이도록 처리 */}
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[max(650px,50vw)] md:justify-center md:py-20 lg:min-h-[max(620px,50vw)]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/hero-bg/hood-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:aspect-[3/2] md:w-3/4 md:-translate-x-1/2 md:-translate-y-1/2">
            <Image src="/images/hero-bg/hood-hero.webp" alt="" fill priority className="object-cover" sizes="(min-width: 768px) 75vw, 100vw" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>후드청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">사업장청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">식당 후드청소, 본체·필터·기름받이 범위를 먼저 확인하세요</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>후드 표면의 끈적임과 필터에 쌓인 기름때, 기름받이 오염을 구분해 살펴봅니다. 찐청소는 업소용 주방 후드의 크기와 구조, 분리 가능한 부품을 확인하고 영업 종료·조리 준비 시간에 맞춰 청소를 상담합니다.</ReadingParagraph>
            <ReadingParagraph>메뉴는 다양해도 괜찮지만, 청소 범위까지 헷갈릴 필요는 없으니까요.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">후드청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="후드청소 비용과 견적 산정 기준" />
            <ReadingParagraph>후드청소 비용은 주방 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 크기의 후드라도 ","아래쪽 조리기기의 배치에 따라 "]}>같은 크기의 후드라도 기름때가 쌓인 정도, 필터 구성, 설치 높이, 아래쪽 조리기기의 배치에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업 범위를 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">길이가 같아도 작업량은 다릅니다</h3>
            <ReadingParagraph className="mt-2">겉면의 가벼운 오염을 청소하는 작업과 내부 접근 부위까지 두껍게 쌓인 기름때를 제거하는 작업은 같지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">후드 아래에 조리기기가 빽빽하게 놓여 있다면 접근과 주변 보호에 필요한 시간도 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">그래서 몇 미터인지와 함께, 어디까지 청소할지를 확인해야 합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">후드 전체 사진, 필터와 안쪽 오염 사진, 후드 아래 조리 공간 사진을 함께 보내주시면 상담에 도움이 됩니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기관리는 사용량과 오염 상태에 맞춥니다</h3>
            <ReadingParagraph className="mt-3">관리 주기는 모든 매장에 똑같이 적용하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3">조리 방식과 영업시간, 사용량에 따라 오염이 쌓이는 속도가 다르므로 실제 상태를 보고 범위와 주기를 정하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3">정기 작업은 필요한 인원과 작업 시간을 바탕으로 회차별 청소 내용을 반영해 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위/덕트 차이 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="후드청소 범위와 덕트청소의 차이" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">후드 기름때 제거와 덕트 내부 청소는 같지 않습니다</h3>
            <ReadingParagraph className="mt-2 mb-6">후드 본체의 접근 가능한 내부, 필터와 기름받이의 세척 범위를 정합니다. 덕트 안쪽 전체, 팬·모터와 전기설비는 접근 구조와 별도 작업 가능 여부를 확인해야 합니다. 청소만으로 배기 성능이나 설비 고장이 해결된다고 단정하지 않습니다.</ReadingParagraph>
            <ReadingParagraph>&lsquo;후드 전체 청소&rsquo;라는 표현만으로는 작업 범위를 알기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">찐청소는 아래 항목 중 어디까지 작업할지 구분해 안내합니다. 모든 항목이 기본 비용에 자동으로 포함되는 것은 아닙니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                  {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                  {item.photoPairs && (
                    <div className={`${readability.scopePhotos} mt-4 items-start`}>
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
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>처음 정한 작업보다 범위가 늘어나거나 별도 공정이 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교할 때는 금액과 함께 세척 부위를 확인해 주세요. 겉면만 닦는 견적과 내부·필터까지 작업하는 견적은 같은 조건이 아닙니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="후드청소 진행 순서와 소요 시간" />
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
            <ReadingParagraph className="mt-2">후드의 크기와 수량, 기름때의 정도, 내부 접근 조건, 필터 작업 범위에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">청소 시간 외에도 주변 보호, 건조, 재설치와 검수 시간을 고려해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">다음 영업을 위한 조리 준비 시간을 알려주시면 일정 검토에 도움이 됩니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>후드청소는 겉면 사진 한 장만으로 결과를 판단하기 어렵습니다. 실제 견적에 포함된 부위를 중심으로 확인하는 것이 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">사진은 가능한 한 같은 위치와 비슷한 조명에서 비교하면 상태를 확인하기 쉽습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">닦아서 반짝이는 겉면과 별개로, 약속한 내부 부위와 필터가 작업됐는지를 함께 살펴보세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">전후 사진이나 완료 자료가 필요하면 상담 시 알려주세요. 촬영 가능한 구역과 제공 방식을 확인해 안내합니다.</ReadingParagraph>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>매장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">후드청소는 조리 공간 위에서 진행하는 작업인 만큼 영업 일정과 작업 구역을 함께 조율해야 합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">야간이나 휴무일 작업을 원하시면 희망 시간대를 알려주세요. 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/관리기준 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 관리 기준" />
            <h3 className="text-lg font-bold text-brand-dark">약속한 부위를 기준으로 확인합니다</h3>
            <ReadingParagraph className="mt-2">견적에 포함된 본체·내부·필터 등의 작업 상태를 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소 전 특히 신경 쓰였던 구역은 검수 때 다시 살펴보는 것이 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 성능 점검은 구분합니다</h3>
            <ReadingParagraph className="mt-2">청소만으로 흡입력, 소음, 냄새 문제가 모두 해결된다고 약속하지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소 결과와 별도로 설비 점검이 필요한 사항은 구분해서 확인해야 합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">관리 주기는 오염 상태를 보고 정합니다</h3>
            <ReadingParagraph className="mt-2">필터와 내부 접근 부위의 오염이 얼마나 빠르게 쌓이는지 살펴보세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">조리 방식이나 영업시간이 달라졌다면 기존 청소 주기가 적절한지도 다시 확인하는 것이 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 부위와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장 상태를 확인하여 후속 처리 방법을 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="후드청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소를 위해 필터나 기기를 미리 무리하게 분해하실 필요는 없습니다. 어떤 부품을 누가 탈착할지부터 정하면 됩니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">후드청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">후드가 몇 개인지와 함께, 어디까지 청소할지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">겉면의 기름때를 정리하려는지, 필터와 안쪽까지 작업이 필요한지, 덕트나 배기설비까지 상담하려는지에 따라 준비가 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>후드청소 견적 문의하기 →</CtaButton>
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
