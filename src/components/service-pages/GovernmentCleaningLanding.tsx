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
  ["scope", "공간별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "관공서·공공기관의 청사 내부와 부속 공간"],
  ["작업 구역", "민원실, 사무공간, 회의실, 복도, 계단, 화장실 등 요청 구역"],
  ["서비스 방식", "일회성 청소·대청소·정기청소 상담"],
  ["견적 기준", "필요한 인원, 작업량, 장비·약품, 현장 조건"],
  ["일정 조율", "민원 업무시간, 시설 이용시간, 출입 가능 시간 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 면적과 층수",
  "민원실·사무실·화장실 등 공간별 구성",
  "집기 배치와 접근 가능한 범위",
  "바닥 재질과 오염 상태",
  "필요한 인원과 예상 작업 시간",
  "장비와 약품의 종류",
  "장비 반입, 주차, 엘리베이터 이용 조건",
  "업무 중 작업인지, 비업무 시간 작업인지",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "민원실과 로비",
    body: "출입구 주변, 대기 공간의 바닥, 내부 유리, 창틀, 모서리 등 오염이 쌓이는 부분을 확인합니다. 민원 업무 중 작업한다면 출입구와 대기 동선을 고려해 구역을 나눕니다.",
    note: "안내데스크, 대기 의자 등 집기 자체의 청소는 별도 항목으로 구분해 요청 범위를 확인합니다.",
    photoPairs: [["gov-lobby-01.webp", "gov-lobby-02.webp"], ["gov-lobby-03.webp"]],
  },
  {
    title: "사무공간과 회의실",
    body: "바닥, 창틀, 내부 유리, 문, 몰딩 등 요청하신 내부 구역을 청소합니다.",
    note: "서류와 전산장비가 있는 공간은 접근 가능한 구역을 먼저 정합니다. 책상 위 서류 정리, 캐비닛 내부 정리, 전자기기 청소를 일반 공간 청소에 임의로 포함하지 않습니다.",
    photoPairs: [["gov-office-01.webp", "gov-office-02.webp"], ["gov-office-03.webp"]],
  },
  {
    title: "복도와 계단",
    body: "복도 바닥, 가장자리, 계단과 난간 등 공용 이동 구역을 확인합니다.",
    note: "층별 이동과 시설 이용에 필요한 통로를 고려해 작업 순서를 정하고, 물기가 남는 구간은 이용 동선과 구분하는 방식으로 진행합니다.",
    photoPairs: [["gov-stairs-01.webp", "gov-stairs-02.webp"], ["gov-stairs-03.webp"]],
  },
  {
    title: "화장실과 세면 공간",
    body: "바닥, 세면대, 변기, 칸막이 등 요청 범위에 포함된 시설의 오염을 확인하고 청소합니다.",
    note: "청소가 필요한 오염과 누수·파손·설비 이상은 구분합니다. 냄새가 있는 경우에도 표면 오염 때문인지, 배수나 설비 확인이 필요한 상태인지 살펴야 합니다.",
    photoPairs: [["gov-restroom-01.webp", "gov-restroom-02.webp"], ["gov-restroom-03.webp", "gov-restroom-04.webp"]],
  },
  {
    title: "탕비실과 휴게 공간",
    body: "바닥, 싱크대 주변, 벽면 등 합의한 구역을 청소합니다.",
    note: "냉장고 내부, 커피머신, 정수기 등 기기 청소와 개인 물품 정리는 별도로 범위를 정합니다.",
    photoPairs: [["gov-lounge-01.webp", "gov-lounge-02.webp"], ["gov-lounge-03.webp", "gov-lounge-04.webp"]],
  },
  {
    title: "높은 곳과 설비 주변",
    body: "디퓨저 등 환기구 주변이나 평소 손이 잘 닿지 않는 곳은 높이와 접근 조건을 확인합니다.",
    note: "설비 주변 청소와 설비 내부 분해·점검은 다른 작업입니다. 전기설비가 있는 구역은 안전한 작업 조건과 담당 범위를 먼저 확인합니다.",
    photoPairs: [["gov-height-01.webp", "gov-height-02.webp"], ["gov-height-03.webp", "gov-height-04.webp"]],
  },
];

const exclusions = [
  "책상·의자·수납장 등 집기 청소와 이동",
  "바닥 왁스코팅 및 기존 코팅 제거",
  "외벽 유리와 외부 고소작업",
  "에어컨·덕트 등 설비 내부 청소",
  "대량 폐기물 반출과 처리",
  "문서 폐기와 보안 파쇄",
  "철거·보수·설비 수리",
];

const extraCostItems = [
  "청소할 층이나 공간이 추가되는 경우",
  "집기 청소 또는 이동이 추가되는 경우",
  "본드·도료 등 별도 제거 작업이 필요한 경우",
  "바닥 코팅을 함께 요청하는 경우",
  "높은 곳의 작업에 별도 장비가 필요한 경우",
  "제한된 시간 안에 완료하기 위해 추가 인원이 필요한 경우",
  "사전에 확인되지 않은 심한 오염이나 잔여물이 있는 경우",
];

const processSteps: [string, string][] = [
  ["요청 내용과 현장 확인", "기관 위치, 청소할 구역, 면적, 오염 상태, 희망 일정을 확인합니다. 과업지시서가 있다면 해당 문서를 기준으로 요청 내용을 살펴봅니다."],
  ["작업 범위와 견적 정리", "공간별 청소 항목과 제외 항목을 구분하고, 필요한 인원과 장비·약품을 검토합니다. 민원 업무시간, 출입 제한, 장비 사용 조건도 함께 확인합니다."],
  ["작업 순서와 이용 동선 조율", "어느 공간부터 청소할지, 작업 중 이용이 제한되는 구역은 어디인지 정합니다. 업무 중 청소라면 민원인과 직원의 이동을 고려하고, 소음이 발생하는 작업의 시간대도 살펴봅니다."],
  ["구역별 청소 진행", "정해진 범위에 따라 구역별 작업을 진행합니다. 오염을 제거하는 과정에서 기존 파손이나 보수가 필요한 부분이 확인되면 청소 결과와 구분해 안내합니다."],
  ["마무리와 완료 확인", "약속한 청소 항목을 기준으로 작업 결과를 확인합니다. 공간 사용을 다시 시작할 시점과 추가 확인이 필요한 사항도 함께 안내합니다."],
];

const caseChecklist = [
  "출입구와 주요 통로의 바닥 오염",
  "창틀과 모서리의 먼지",
  "계단 가장자리와 난간",
  "화장실 세면대와 바닥",
  "처음에 집중 청소를 요청한 구역",
];

const reservationChecklist = [
  "민원실 운영시간",
  "직원 근무시간",
  "회의·교육·행사 일정",
  "건물 출입 가능 시간",
  "장비 반입과 엘리베이터 이용 시간",
  "청소 후 공간을 다시 사용할 시간",
];

const prepItems = [
  "청소할 층과 공간을 구분해 주세요.",
  "과업지시서나 청소 범위표가 있다면 전달해 주세요.",
  "출입 제한 구역과 담당자를 알려주세요.",
  "중요 서류와 귀중품은 미리 보관해 주세요.",
  "사진 촬영 가능 여부를 확인해 주세요.",
  "장비 반입, 주차, 급수·전원 사용 조건을 알려주세요.",
  "기존 파손이나 누수 부위를 전달해 주세요.",
  "기관에서 요구하는 계약·완료 서류 목록을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["관공서청소 비용은 평당으로 정하나요?", "면적은 참고하지만 평수만으로 정하지 않습니다. 공간 구성, 오염 상태, 필요한 인원과 장비·약품, 작업 시간 등을 함께 확인합니다."],
  ["청사 전체가 아니라 일부 구역만 맡길 수 있나요?", "민원실, 화장실, 복도 등 필요한 구역을 지정해 상담할 수 있습니다. 요청 구역과 작업량에 맞춰 견적을 안내합니다."],
  ["정기청소와 일회성 대청소는 어떻게 다른가요?", "일회성 대청소는 정해진 범위의 쌓인 오염을 정리하는 작업입니다. 정기청소는 이용하면서 생기는 오염을 방문 주기와 회차별 범위에 따라 관리합니다."],
  ["민원 업무 중에도 청소할 수 있나요?", "시설 이용 동선과 작업 내용을 확인해야 합니다. 업무 중 가능한 작업과 비업무 시간에 진행할 작업을 구분해 일정을 조율합니다."],
  ["주말이나 야간 작업도 가능한가요?", "희망 날짜와 시간대를 알려주시면 가능 여부를 확인합니다. 건물 출입과 소음·장비 사용 제한도 함께 알려주세요."],
  ["책상과 의자, 캐비닛도 포함되나요?", "집기 청소는 공간 청소와 구분해 범위를 정합니다. 필요한 집기의 종류와 수량, 이동 여부를 상담 시 알려주세요."],
  ["바닥 왁스코팅도 포함되나요?", "바닥 세척과 왁스코팅은 다른 작업입니다. 코팅이 필요하다면 바닥 재질과 상태를 확인하여 견적에 별도 항목으로 반영합니다."],
  ["청사 청소 과업지시서를 기준으로 견적을 받을 수 있나요?", "요청 구역, 작업 주기, 완료 기준과 제출 서류를 보내주시면 수행 가능 범위를 검토합니다. 계약 참여 자격이나 서류 충족 여부는 개별 발주 조건에 따라 별도로 확인합니다."],
  ["계약 서류나 작업 완료 자료도 준비할 수 있나요?", "기관에서 요구하는 서류 목록과 양식을 먼저 보내주세요. 발급·작성 가능한 자료와 대응 범위를 계약 전에 확인합니다."],
  ["작업 전후 사진을 받을 수 있나요?", "사진이 필요하시면 상담 시 요청해 주세요. 촬영 제한과 필요한 구역, 제출 형식을 확인하여 제공 가능 여부를 안내합니다."],
  ["청소 후 바로 시설을 이용할 수 있나요?", "작업 내용과 바닥 건조 상태에 따라 달라집니다. 시설 이용 재개 시간을 미리 알려주시면 작업 일정과 함께 검토합니다."],
];

const contactChecklist = [
  "현장 주소와 기관·시설 유형",
  "청소할 면적, 층수, 구역",
  "일회성 청소 또는 정기청소 여부",
  "전체 공간과 주요 오염 부위 사진",
  "희망 날짜와 작업 가능 시간",
  "과업지시서 또는 요청 항목",
  "출입·촬영·장비 사용 제한",
  "필요한 계약 및 완료 자료",
];

const caseIds = ["government-01", "government-02", "government-03"] as const;
const path = "/관공서청소/";

export default function GovernmentCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "관공서청소",
      serviceType: "관공서청소·공공기관청소",
      description: "민원실 바닥의 보행 오염, 청사 복도·계단의 먼지와 화장실 청소를 구역별로 살펴봅니다. 찐청소는 기관 운영시간, 출입 절차와 담당 부서의 요구 범위를 확인해 일회성 대청소와 정기관리를 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "관공서청소", item: absoluteUrl(path) },
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
      <section className="relative flex min-h-[calc(66.667vw+680px)] flex-col overflow-hidden bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:min-h-[650px] md:justify-center md:py-20 lg:min-h-[620px]">
        <div className="relative -mx-6 -mt-14 aspect-[3/2] md:absolute md:inset-0 md:m-0 md:aspect-auto">
          <Image src="/images/hero-bg/government-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <Image src="/images/hero-bg/government-hero.webp" alt="" fill priority className="object-contain" sizes="100vw" />
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>관공서청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">사업장청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">관공서·공공기관 청소, 민원 공간과 업무 구역을 나눠 관리합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>민원실 바닥의 보행 오염, 청사 복도·계단의 먼지와 화장실 청소를 구역별로 살펴봅니다. 찐청소는 기관 운영시간, 출입 절차와 담당 부서의 요구 범위를 확인해 일회성 대청소와 정기관리를 상담합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">관공서청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="관공서청소 비용과 견적 산정 기준" />
            <ReadingParagraph>관공서청소 비용은 면적뿐 아니라 공간의 용도와 작업 조건에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["많은 사무공간은 "]}>넓게 트인 로비와 책상·칸막이가 많은 사무공간은 같은 면적이라도 작업 방식이 다릅니다. 이용자가 많은 화장실과 가끔 사용하는 회의실도 필요한 관리가 같지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["이런 차이를 확인하고 "]}>찐청소는 이런 차이를 확인하고 필요한 인원과 장비·약품을 중심으로 견적을 산정합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">평수보다 실제 작업량을 살펴봅니다</h3>
            <ReadingParagraph className="mt-2">집기가 많은 50평 공간은 비어 있는 100평 공간보다 작업에 시간이 더 걸릴 수 있습니다. 집기 자체를 청소하지 않더라도 좁은 통로와 가구 주변을 나누어 작업해야 하고, 장비가 들어가지 못하는 구간도 있기 때문입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">면적은 중요한 참고 자료입니다. 하지만 면적만으로 현장의 작업량까지 알 수는 없습니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">과업지시서나 청소 범위표가 있다면 함께 보내주세요. 요청하신 항목을 기준으로 작업 가능 범위와 견적을 검토합니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소는 인원과 작업 시간을 기준으로 합니다</h3>
            <ReadingParagraph className="mt-3">정기청소는 필요한 인원과 시간당 작업 비용을 바탕으로 방문 주기와 회차별 작업 범위를 반영합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3">매번 관리할 곳과 일정 주기로 관리할 곳을 구분하는 것이 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3">예를 들어 이용자가 많은 출입구와 화장실, 사용 빈도가 낮은 회의실을 모두 같은 주기로 관리할 필요는 없을 수 있습니다. 실제 이용 상황에 맞춰 관리 계획을 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 공간별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">민원실·회의실·복도는 이용 조건이 다릅니다</h3>
            <ReadingParagraph className="mt-2 mb-6">이용자가 많은 민원실과 보안이 필요한 업무 공간은 같은 방식으로 접근하지 않습니다. 바닥·유리·접촉 표면별 작업 범위를 정하고, 서류와 전산장비는 임의로 다루지 않습니다. 코팅이나 집기 세척이 필요하면 별도 항목으로 확인합니다.</ReadingParagraph>
            <ReadingParagraph>관공서청소는 건물 전체 또는 요청하신 일부 구역을 대상으로 상담할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목은 공간별로 검토하는 청소 내용입니다. 모든 항목이 자동으로 포함되는 것은 아니며, 견적서와 과업 범위에 포함할 구역을 정합니다.</ReadingParagraph>

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

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">일반 청소와 구분해 확인할 항목</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {exclusions.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">필요한 항목을 상담 시 함께 알려주시면 작업 가능 여부와 비용을 구분해 안내합니다.</ReadingParagraph>
            </div>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>처음 정한 작업 범위를 넘어가거나 별도 공정이 필요한 경우에는 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교할 때는 총금액과 함께 포함 구역, 제외 항목, 작업 인원과 시간을 살펴보세요. &lsquo;청사 전체 청소&rsquo;라는 같은 표현도 업체마다 뜻하는 범위가 다를 수 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="관공서청소 진행 순서와 소요 시간" />
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
            <ReadingParagraph className="mt-2">면적, 오염 정도, 투입 인원, 작업 가능한 시간에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">같은 건물이라도 비어 있는 상태에서 한 번에 작업하는 경우와 운영 중 층별로 나누어 작업하는 경우는 소요 시간이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">예상 시간은 현장 조건을 확인한 뒤 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>청소 결과는 넓은 공간을 멀리서 찍은 사진만으로 판단하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">다음과 같은 부분을 함께 살펴보면 작업 내용을 확인하기 좋습니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">바닥은 반짝임만으로 평가하지 않습니다. 세척과 코팅은 다른 작업이므로, 요청한 오염이 제거됐는지와 작업 범위가 지켜졌는지를 확인하는 것이 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">전후 사진이나 완료 자료가 필요한 기관은 촬영 가능 구역, 제출 형식, 필요한 내용을 상담 시 알려주세요. 제공 가능 범위와 방식을 미리 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">개인정보가 보이는 서류, 화면, 민원인 등이 있는 곳은 촬영 제한 여부를 먼저 확인해야 합니다.</ReadingParagraph>

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
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부를 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">일정을 정할 때는 다음 사항을 함께 알려주세요.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">야간이나 주말 작업이 필요하다면 희망 시간대를 말씀해 주세요. 현장 조건과 예약 상황에 따라 가능 여부를 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">행사나 업무 재개 직전이라면 청소 종료뿐 아니라 바닥 건조와 마무리 확인에 필요한 시간도 고려하는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 작업 범위가 검수 기준입니다</h3>
            <ReadingParagraph className="mt-2">완료 후에는 견적서나 과업 범위에 포함된 구역과 항목을 기준으로 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">청소 전 문제가 되었던 오염, 빠뜨리기 쉬운 모서리와 창틀, 이용자가 많은 공용 공간을 함께 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">변색, 마모, 파손처럼 청소와 다른 조치가 필요한 상태는 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 구역과 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 내용과 현장을 확인하여 후속 처리 방법을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">정기청소는 회차별 기준을 정합니다</h3>
            <ReadingParagraph className="mt-2">정기관리에서는 매회 작업과 주기적으로 하는 작업을 구분해 두면 확인이 수월합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">이용 인원이나 시설 운영 방식이 달라졌다면 청소 주기와 작업 시간을 다시 검토할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">한 번 정한 계획을 그대로 반복하기보다 실제 사용 상태에 맞추는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항과 담당자 체크리스트" />
            <ReadingParagraph>상담과 작업 전에 아래 내용을 정리해 주시면 진행이 수월합니다.</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">기관마다 필요한 서류와 계약 조건이 다를 수 있습니다. 정해진 양식이나 참가 요건이 있다면 계약 전에 전달해 주셔야 대응 가능 여부를 확인할 수 있습니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">관공서청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">기관명과 평수만으로는 현장을 충분히 알기 어렵습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">민원인이 계속 오가는 공간인지, 사무 집기가 많은 곳인지, 주말에 전체를 비우고 작업할 수 있는지에 따라 필요한 준비가 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>관공서청소 견적 문의하기 →</CtaButton>
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
