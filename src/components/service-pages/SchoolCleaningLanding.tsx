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
  ["청소 대상", "학교 교실과 교내 공용 공간 등 요청 구역"],
  ["주요 구역", "교실, 복도, 계단, 화장실, 특별실, 교무·행정 공간"],
  ["견적 기준", "필요한 인원, 실제 작업량, 장비·약품, 현장 조건"],
  ["별도 범위 확인", "책걸상 이동·세척, 수납장 내부, 바닥 코팅 등"],
  ["일정 조율", "방학·개학, 돌봄·방과후 수업, 교내 공사 일정 반영"],
  ["서비스 지역", "학교 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 교실 수, 면적, 층수",
  "복도·계단·화장실 등 공용 공간의 범위",
  "책걸상과 교구의 배치",
  "집기 이동·세척·원위치 배치 여부",
  "바닥 재질과 오염 정도",
  "창틀, 내부 유리, 높은 곳의 작업 범위",
  "필요한 인원과 장비·약품",
  "장비 반입과 작업 가능 시간",
];

const deskChecklist = [
  "책걸상을 옮기기만 하는지",
  "상판과 의자 표면도 닦는지",
  "다리 부분의 오염까지 제거하는지",
  "청소 후 기존 배치로 돌려놓는지",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "교실 바닥과 가장자리",
    body: "바닥 재질과 상태에 맞춰 먼지와 오염을 제거합니다. 출입문 주변, 벽 쪽 가장자리, 모서리 등 평소 손이 덜 닿는 구간도 살펴봅니다.",
    note: "책걸상 아래까지 작업하려면 이동이 필요한지 먼저 확인해야 합니다. 집기를 그대로 둔 상태의 청소와 이동 후 전체 바닥 청소는 작업량이 다릅니다.",
    photoPairs: [["school-floor-01.webp", "school-floor-02.webp"], ["school-floor-03.webp"]],
  },
  {
    title: "창틀과 내부 유리",
    body: "접근 가능한 창틀과 내부 유리의 먼지, 손자국, 오염을 청소합니다.",
    note: "외부 유리나 높은 위치의 창은 접근 조건을 확인해야 합니다. 외벽 작업과 창호 분해는 일반 내부 청소와 구분합니다.",
    photoPairs: [["school-window-01.webp", "school-window-02.webp"], ["school-window-03.webp"]],
  },
  {
    title: "복도와 계단",
    body: "복도 바닥, 벽 쪽 가장자리, 계단 모서리와 난간 등 요청 구역을 청소합니다.",
    note: "학생과 교직원이 이용하는 시간이라면 작업 구간과 이동 통로를 나누고, 물기가 남은 구간은 이용 동선과 구분합니다.",
    photoPairs: [["school-hallway-01.webp", "school-hallway-02.webp"], ["school-hallway-03.webp", "school-hallway-04.webp"]],
  },
  {
    title: "화장실과 세면 공간",
    body: "변기, 세면대, 바닥, 칸막이 등 합의한 범위의 오염을 청소합니다.",
    note: "표면 오염과 설비 문제는 구분합니다. 누수, 파손, 배수 이상처럼 청소만으로 해결하기 어려운 부분은 별도 확인이 필요합니다.",
    photoPairs: [["school-restroom-01.webp", "school-restroom-02.webp"], ["school-restroom-03.webp"]],
  },
  {
    title: "특별실과 도서실",
    body: "과학실, 음악실, 컴퓨터실, 도서실 등은 일반 교실과 다른 물품이 놓여 있습니다. 공간의 바닥과 창틀 청소인지, 내부 집기까지 포함하는지 범위를 정합니다.",
    note: "실험기구·약품·악기·전산장비·도서는 임의로 이동하거나 청소하지 않도록 담당 범위를 확인합니다.",
    photoPairs: [["school-special-01.webp", "school-special-02.webp"], ["school-special-03.webp", "school-special-04.webp"]],
  },
  {
    title: "교무실과 행정실",
    body: "바닥, 창틀, 내부 유리 등 요청한 구역을 청소합니다.",
    note: "중요 서류, 개인정보가 담긴 자료, 전산장비가 있는 곳은 접근 제한과 작업 범위를 먼저 정합니다.",
    photoPairs: [["school-office-01.webp", "school-office-02.webp"], ["school-office-03.webp"]],
  },
];

const deskPhotoPairs: string[][] = [
  ["school-desk-01.webp", "school-desk-02.webp"],
  ["school-desk-03.webp", "school-desk-04.webp"],
];

const separateScopeItems = [
  "바닥 왁스코팅과 기존 코팅 제거",
  "에어컨·덕트 등 설비 내부 청소",
  "급식실 주방 설비와 후드 청소",
  "체육관 전용 바닥 관리와 높은 구조물 청소",
  "외벽 유리와 외부 고소작업",
  "소독·방역",
  "대량 폐기물 반출과 처리",
  "철거·보수 공사",
];

const extraCostItems = [
  "청소할 교실이나 층이 추가되는 경우",
  "책걸상 이동·세척·재배치가 추가되는 경우",
  "수납장 내부나 교구 청소가 추가되는 경우",
  "스티커 자국, 본드, 도료 등 별도 제거 작업이 필요한 경우",
  "바닥 코팅을 요청하는 경우",
  "높은 곳의 작업에 별도 장비가 필요한 경우",
  "짧은 시간 안에 완료하기 위해 추가 인원이 필요한 경우",
];

const processSteps: [string, string][] = [
  ["요청 구역과 현장 확인", "학교 위치, 교실 수, 공용 공간, 오염 상태, 희망 일정을 확인합니다. 과업지시서, 배치도, 현장 사진이 있다면 작업 범위를 파악하는 데 도움이 됩니다."],
  ["작업 항목과 견적 안내", "공간 청소, 집기 작업, 바닥 코팅 등 요청 항목을 구분합니다. 필요한 인원과 장비·약품을 검토하고, 포함 범위와 제외 항목을 안내합니다."],
  ["학사 일정과 작업 동선 조율", "돌봄교실, 방과후 수업, 교직원 근무, 공사 일정 등을 확인합니다. 사용 중인 공간과 청소할 공간을 나누고, 층별·구역별 작업 순서를 정합니다."],
  ["구역별 청소 진행", "정해진 범위에 따라 작업합니다. 집기 이동과 원위치 배치가 포함됐다면 이동 대상과 배치 기준에 맞춰 진행합니다."],
  ["마무리와 결과 확인", "청소 항목과 주요 오염 구간을 확인합니다. 바닥에 남은 물기, 통로의 작업 도구, 집기 배치 등 공간을 다시 사용하기 전에 확인할 부분도 살펴봅니다."],
];

const caseChecklist = [
  "책걸상 아래와 벽 쪽 바닥",
  "출입문 주변과 모서리",
  "창틀과 내부 유리",
  "복도 가장자리와 계단",
  "화장실 세면대와 바닥",
  "처음 집중 청소를 요청한 오염 구간",
];

const reservationChecklist = [
  "방학과 개학 일정",
  "돌봄·방과후 수업 운영 구역과 시간",
  "교내 행사와 시설 사용 일정",
  "공사 종료일과 집기 반입일",
  "건물 출입과 장비 반입 가능 시간",
  "청소 후 교실을 다시 사용할 날짜",
];

const prepItems = [
  "청소할 교실과 제외할 공간을 구분해 주세요.",
  "학생 개인 물품과 중요한 교재는 미리 보관해 주세요.",
  "책걸상 이동·세척·원위치 배치 여부를 정해 주세요.",
  "수납장 내부 청소가 필요하면 내용물 정리 범위를 맞춰주세요.",
  "실험기구, 약품, 악기 등 취급 제한 물품을 알려주세요.",
  "출입 가능한 교실과 열쇠 관리 담당자를 안내해 주세요.",
  "촬영 제한과 개인정보가 보이는 구역을 알려주세요.",
  "급수·전원, 주차, 장비 반입 조건을 확인해 주세요.",
  "기존 파손, 누수, 바닥 들뜸 등을 알려주세요.",
  "필요한 계약·완료 서류가 있다면 목록과 양식을 보내주세요.",
];

const faqItems: [string, string][] = [
  ["학교청소 비용은 교실당으로 정하나요?", "교실 수는 참고하지만 그것만으로 정하지 않습니다. 면적, 책걸상 배치, 이동·세척 여부, 오염 상태, 공용 공간 범위를 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["일부 교실이나 화장실만 맡길 수 있나요?", "필요한 구역을 지정해 상담할 수 있습니다. 청소할 공간과 요청 항목을 알려주시면 해당 범위에 맞춰 견적을 안내합니다."],
  ["책걸상 이동과 청소도 포함되나요?", "자동으로 포함되는 항목은 아닙니다. 이동, 표면 세척, 다리 부분 청소, 원위치 배치를 구분해 요청 범위를 정합니다."],
  ["바닥 왁스코팅도 함께 하나요?", "바닥 세척과 코팅은 별도 작업입니다. 코팅을 원하시면 바닥 재질과 기존 상태를 확인해 작업 내용과 비용을 안내합니다."],
  ["학교청소를 하면 소독도 되는 건가요?", "일반 청소와 소독은 다른 작업입니다. 소독이 필요하다면 대상 공간과 요구 내용을 알려주시면 수행 가능 여부와 범위를 별도로 확인합니다."],
  ["방학 중에도 돌봄교실을 운영하는데 청소가 가능한가요?", "사용 중인 교실과 작업 구역을 분리할 수 있는지 확인한 뒤 일정을 협의합니다. 출입 동선, 건조와 이용 재개 시간까지 고려해야 하므로 운영 일정을 함께 알려주세요."],
  ["공사 후 개학 전에 청소할 수 있나요?", "공사 종료일과 개학일, 집기 반입 일정을 알려주시면 가능한 일정을 검토합니다. 분진이 발생하는 공정이 남아 있다면 청소 순서를 함께 조율해야 합니다."],
  ["어떤 세제를 사용하는지 확인할 수 있나요?", "바닥과 시설 재질, 오염에 맞춰 사용할 약품을 검토합니다. 학교에서 사용 제한 제품이나 확인할 제품 정보가 있다면 상담 시 알려주세요."],
  ["청소 후 바로 교실을 사용할 수 있나요?", "작업 내용과 바닥 건조 상태 등에 따라 달라집니다. 코팅이 포함되면 해당 제품과 공정에 따른 대기시간도 고려해야 하므로, 사용 예정 시간을 미리 알려주세요."],
  ["과업지시서에 맞춘 견적과 완료 자료도 가능한가요?", "과업지시서와 필요한 자료 목록을 보내주시면 수행 가능 범위와 대응 여부를 검토합니다. 사진 제출이 필요하다면 촬영 허용 구역과 형식도 함께 확인합니다."],
];

const contactChecklist = [
  "학교 주소",
  "청소할 교실 수, 면적, 층수",
  "복도·계단·화장실 등 공용 공간 범위",
  "전체 공간과 주요 오염 부위 사진",
  "책걸상 이동·세척·재배치 요청 여부",
  "바닥 코팅 등 추가 요청",
  "희망 날짜와 개학·공간 사용 일정",
  "과업지시서와 필요한 계약·완료 자료",
];

const caseIds = ["school-01", "school-02", "school-03", "school-04"] as const;
const path = "/학교청소/";

export default function SchoolCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "학교청소",
      serviceType: "학교청소·교실청소",
      description: "교실 바닥의 묵은 때와 창틀 먼지, 복도·계단과 화장실 오염을 살펴 개학 준비에 필요한 범위를 정합니다. 찐청소는 책걸상 배치, 돌봄·방과후 운영과 교내 공사 일정을 고려해 학교청소를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "학교청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/school-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <Image src="/images/hero-bg/school-hero.webp" alt="" fill priority className="object-contain" sizes="100vw" />
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>학교청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">사업장청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">학교 방학 대청소, 교실·복도별로 필요한 작업을 정합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>교실 바닥의 묵은 때와 창틀 먼지, 복도·계단과 화장실 오염을 살펴 개학 준비에 필요한 범위를 정합니다. 찐청소는 책걸상 배치, 돌봄·방과후 운영과 교내 공사 일정을 고려해 학교청소를 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">학교청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="학교청소 비용과 견적 산정 기준" />
            <ReadingParagraph>학교청소 비용은 전체 면적만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 크기의 교실이라도 ","바닥에 어떤 오염이 있는지, "]}>같은 크기의 교실이라도 책걸상과 교구가 얼마나 있는지, 바닥에 어떤 오염이 있는지, 집기 이동이 필요한지에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 현장의 실제 작업량을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">면적과 함께 교실 수와 공간 구성을 봅니다</h3>
            <ReadingParagraph className="mt-2">넓게 트인 강당과 여러 교실로 나뉜 공간은 같은 면적이어도 작업 동선이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">교실마다 책걸상을 옮겨야 하는지, 창틀과 수납 공간은 얼마나 있는지, 화장실이 몇 곳인지도 필요한 인원과 시간에 영향을 줍니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">그래서 학교 전체 면적만 알려주시는 것보다 청소할 교실 수와 공용 공간을 함께 알려주시면 견적이 더 정확해집니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">과업지시서나 청소 항목표가 있다면 함께 보내주세요. 요청하신 내용에 맞춰 수행 가능 범위와 견적을 검토합니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소는 방문 주기와 회차별 범위를 정합니다</h3>
            <ReadingParagraph className="mt-3">정기청소는 필요한 인원과 작업 시간을 바탕으로 방문 주기와 관리 구역을 반영합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3">방학 대청소와 매회 정기청소의 범위가 같지는 않습니다. 자주 관리할 곳과 일정 주기로 집중 청소할 곳을 나누어 계획하는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 공간별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">교실 바닥 세척과 왁스코팅은 별도로 확인합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">바닥 재질과 기존 피막 상태를 확인해 세척 범위를 정합니다. 책걸상 이동·표면 세척, 수납장 내부와 왁스코팅은 포함 여부를 각각 협의합니다. 특별실의 전문 기자재와 실험실 물질은 담당자 확인 없이 다루지 않습니다.</ReadingParagraph>
            <ReadingParagraph>학교청소는 교내 전체 또는 요청하신 일부 구역을 대상으로 범위를 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래는 공간별로 검토하는 작업 항목입니다. 모든 항목이 자동으로 포함되는 것은 아니며, 실제 포함 범위는 견적서와 과업 내용에 명시합니다.</ReadingParagraph>

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
              <div className="rounded-xl border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-brand-dark">책걸상과 수납장</h3>
                <ReadingParagraph className="mt-2">책걸상은 바닥 청소와 구분해 작업 범위를 정합니다.</ReadingParagraph>
                <ul className="mt-3 space-y-2">
                  {deskChecklist.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[15.5px]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ReadingParagraph className="mt-3 text-[15px] text-gray-500">수납장도 외부 표면과 내부 청소를 구분합니다. 내부 작업이 필요하다면 교재와 개인 물품을 누가 정리할지 미리 맞춥니다.</ReadingParagraph>
                <div className={`${readability.scopePhotos} mt-4 items-start`}>
                  {deskPhotoPairs.map((pair, pairIndex) => (
                    <div key={pair.join("-")} className="grid grid-cols-2 gap-2.5 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2.5">
                      {pair.map(photo => (
                        <div key={photo} className="relative flex h-52 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-64">
                          <Image src={`/images/portfolio-v2/${photo}`} alt={`책걸상과 수납장 실제 현장 사진 ${pairIndex + 1}`} width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">별도 확인이 필요한 작업</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">청소, 코팅, 소독은 서로 다른 작업입니다. 필요한 서비스를 구분해서 요청해 주시면 가능 여부와 비용을 안내합니다.</ReadingParagraph>
            </div>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>처음 정한 범위보다 작업이 늘어나거나 별도 공정이 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교할 때는 &lsquo;교실 청소&rsquo;라는 이름보다 포함된 작업을 살펴보세요. 책걸상이 놓인 상태에서 바닥만 청소하는 견적과, 이동·세척·원위치 배치까지 포함한 견적은 같은 조건이 아닙니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="학교청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">학교청소는 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">교실 수와 면적뿐 아니라 책걸상 이동, 오염 상태, 투입 인원, 사용 중인 구역의 유무에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">전체를 비우고 작업하는 경우와 수업 공간을 피해 나누어 작업하는 경우도 시간이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">개학일이나 행사일이 정해져 있다면 청소 완료 희망 시간과 공간 사용 재개 시점을 함께 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>학교청소 결과는 교실 전체 사진과 세부 구역을 함께 보는 것이 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">전후 상태는 비슷한 위치와 조명에서 비교하면 확인하기 쉽습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">바닥 세척 결과를 광택만으로 판단하지는 않습니다. 왁스코팅을 하지 않은 바닥이라도 오염이 제거되고 요청 범위가 충실하게 작업됐다면 그에 맞는 결과를 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진이나 완료 자료가 필요하면 촬영할 구역과 제출 형식을 상담 시 알려주세요. 학생 얼굴, 이름표, 게시물, 개인정보가 담긴 자료 등의 촬영 제한도 함께 확인합니다.</ReadingParagraph>

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
            <ReadingParagraph>학교 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">방학이라고 모든 공간이 비어 있는 것은 아닙니다. 돌봄과 방과후 수업, 시설 공사, 교직원 근무를 함께 고려해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">일정 상담 시 아래 내용을 알려주세요.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">공사 후 청소라면 분진이 생기는 공정이 언제 끝나는지도 중요합니다. 청소 후 다시 오염되지 않도록 공사와 반입 순서를 함께 맞추는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">주말 작업은 희망 날짜와 현장 조건을 확인해 가능 여부를 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">약속한 항목을 기준으로 확인합니다</h3>
            <ReadingParagraph className="mt-2">완료 검수는 견적서나 과업 범위에 포함된 항목을 기준으로 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">교실마다 포함된 작업이 같다면 동일한 기준으로 확인하고, 별도 요청이 있었던 구역은 구분해 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">집기 이동과 재배치가 포함됐다면 청소 상태와 함께 배치도 확인합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 손상은 구분합니다</h3>
            <ReadingParagraph className="mt-2">오래된 변색, 바닥 마모, 들뜸, 파손은 청소만으로 원래 상태가 되지 않을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">제거할 수 있는 오염과 보수가 필요한 부분을 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">추가 확인이 필요한 곳은 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 미흡한 부분이 보이면 교실이나 구역, 해당 위치와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장 상태를 확인하여 후속 처리 방법을 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="학교청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">선생님들이 청소 전에 대청소부터 하실 필요는 없습니다. 다만 보관할 물건과 작업할 공간을 구분해 주시면 진행이 한결 수월합니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">학교청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 어떤 교실인지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">책걸상이 놓여 있는 교실인지, 공사를 마친 빈 공간인지, 돌봄교실을 운영하면서 나누어 청소해야 하는지에 따라 준비가 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>학교청소 견적 문의하기 →</CtaButton>
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
