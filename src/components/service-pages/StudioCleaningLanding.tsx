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
  ["scope", "상황별·공간별 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "원룸과 소형 주거 공간"],
  ["이용 상황", "입주 전·거주 중·퇴실 후 청소"],
  ["주요 공간", "주방, 욕실, 창틀, 바닥과 수납 공간"],
  ["견적 기준", "필요한 인원, 장비·약품, 구조와 오염에 따른 작업량"],
  ["범위 확인", "옵션 가전 내부, 수납장 내부, 짐 이동과 잔여물 처리"],
  ["일정 조율", "퇴거 완료, 청소·검수, 짐 반입 또는 방 인계 시간"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "대략적인 면적과 구조",
  "복층·베란다·별도 수납 공간의 유무",
  "주방 기름때와 욕실 물때 등 오염 상태",
  "가구와 짐의 유무",
  "옵션 가전의 종류와 요청 부위",
  "수납장 내부·탈거 등 추가 작업",
  "잔여물의 종류와 양",
  "필요한 인원과 장비·약품",
  "주차·출입·작업 가능 시간",
];

const situationItems: [string, string[]][] = [
  ["입주 전 원룸청소", [
    "짐을 들이기 전, 주방과 욕실의 생활 오염, 창틀 먼지, 수납 공간 등을 확인합니다.",
    "이전 거주자가 남기는 옵션 가전과 가구가 있다면 주변 공간 청소와 물품 자체의 세척을 구분합니다.",
    "신축 원룸이라면 공사 분진과 마감 잔여물도 함께 알려주세요.",
  ]],
  ["거주 중 원룸청소", [
    "살고 있는 상태라면 작업할 구역과 생활용품을 둘 위치부터 정합니다.",
    "바닥과 상판에 접근하려면 어떤 물건을 옮겨야 하는지, 수납장 내부까지 요청하는지 확인합니다.",
    "정리수납, 세탁, 설거지 등 가사 작업이 모두 포함되는 서비스는 아닙니다.",
  ]],
  ["퇴실 후 원룸청소", [
    "짐을 뺀 뒤 남은 생활 오염과 요청 구역을 확인합니다.",
    "방을 확인할 때 필요한 청소 항목이 있다면 미리 전달해 주세요. 다만 청소 결과와 임대차 비용 정산, 수리·원상복구 판단은 별개입니다.",
  ]],
];

const scopeItems: { title: string; body: string; note?: string; list?: string[] }[] = [
  {
    title: "주방과 싱크대",
    body: "싱크대, 상판, 벽면과 바닥의 기름때·생활 오염을 확인합니다. 수납장 내부, 후드·필터 등은 청소할 부위와 작업 가능 여부를 정해 견적에 반영합니다.",
    note: "식재료와 식기, 조리도구 정리는 공간 청소와 구분합니다.",
  },
  {
    title: "욕실과 배수구 주변",
    body: "변기, 세면대, 거울, 벽면과 바닥 등 요청 구역의 오염을 살펴봅니다. 수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등은 세부 범위를 확인합니다.",
    note: "배관 막힘 해결, 누수 수리, 실리콘 교체는 일반 청소와 별도입니다.",
  },
  {
    title: "창틀과 유리",
    body: "창틀의 먼지와 오염, 작업 대상으로 정한 유리 면을 확인합니다. 방충망과 창문 탈거는 구조와 상태에 따라 가능 여부를 정합니다.",
    note: "접근하기 어려운 외창은 실내 유리 청소와 구분해 검토합니다.",
  },
  {
    title: "바닥·현관·수납 공간",
    body: "바닥, 모서리, 문 주변, 현관 등 접근 가능한 구역의 먼지와 오염을 확인합니다.",
    note: "신발장과 붙박이장 내부는 포함 여부를 미리 정합니다. 무거운 가구를 옮겨야 하는 구간은 별도로 확인합니다.",
  },
  {
    title: "옵션 가전",
    body: "냉장고, 세탁기, 에어컨 등이 옵션으로 설치되어 있어도 내부 세척까지 자동으로 포함되는 것은 아닙니다.",
    list: ["가전 주변 바닥 청소", "가전 외부 표면 청소", "가전 내부 세척", "가전 분해 세척"],
    note: "위 작업은 서로 다릅니다. 기기 종류와 요청 부위, 상태를 확인해 가능한 범위와 비용을 안내합니다.",
  },
  {
    title: "복층과 부속 공간",
    body: "복층 바닥과 계단, 난간, 높은 창 등은 구조와 접근 조건을 확인합니다. 베란다·다용도실·별도 창고가 있다면 상담 때 함께 알려주세요.",
    note: "원룸이라는 이름만으로 부속 공간이 없다고 판단하지 않습니다.",
  },
];

const extraCostItems = [
  "복층이나 부속 공간이 추가로 확인되는 경우",
  "가전 내부·분해 세척을 요청하는 경우",
  "수납장 내부나 별도 탈거 작업이 추가되는 경우",
  "예상보다 많은 짐 이동이 필요한 경우",
  "심하게 쌓인 기름때·물때 등의 작업이 필요한 경우",
  "스티커·접착제·도료 흔적 제거가 필요한 경우",
  "외창이나 높은 곳의 작업을 요청하는 경우",
  "가구·쓰레기 등 반출·처리가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["상황과 요청 내용 상담", "입주 전, 거주 중, 퇴실 후 중 어떤 상황인지 확인합니다. 주소와 구조, 오염 상태, 옵션 가전과 남은 짐을 함께 알려주세요."],
  ["청소 범위와 견적 안내", "공간 청소와 가전 세척, 물품 이동·처리 요청을 구분합니다. 필요한 인원과 장비·약품, 예상 시간을 반영해 안내합니다."],
  ["작업 전 상태 확인", "기존 파손과 기기 이상, 남길 물건과 제외할 구역을 확인합니다. 짐이 빠진 뒤 새로 보이는 오염이나 추가 요청이 있으면 작업 전에 범위를 맞춥니다."],
  ["공간별 청소", "주방, 욕실, 창틀, 바닥 등 합의한 항목에 따라 진행합니다. 탈거와 가전 관련 작업은 사전에 정한 범위와 현장 조건에 맞춰 진행합니다."],
  ["마무리와 확인", "요청한 오염 구간과 포함 항목을 살펴봅니다. 입주 전이라면 짐을 들이기 전에, 퇴실 후라면 방을 인계하기 전에 확인할 시간을 함께 정하는 것이 좋습니다."],
];

const caseChecklist = [
  "싱크대와 벽면의 기름때",
  "욕실 세면대와 바닥의 물때",
  "창틀과 모서리의 먼지",
  "포함된 수납장 내부",
  "합의한 옵션 가전의 작업 부위",
  "가구가 빠진 자리의 바닥",
  "처음 집중 청소를 요청한 부분",
];

const reservationChecklist = [
  "기존 거주자의 퇴거 완료 시간",
  "출입과 열쇠 전달 시간",
  "청소 시작과 예상 종료",
  "작업 결과 확인",
  "이삿짐 반입 또는 방 인계 시간",
];

const prepItems = [
  "입주·거주·퇴실 중 어떤 상황인지 알려주세요.",
  "남기는 옵션 가전과 가구 목록을 정리해 주세요.",
  "가전 내부 청소가 필요하면 내용물을 비울 수 있는지 확인해 주세요.",
  "보관할 물건과 처리할 물건을 구분해 주세요.",
  "귀중품과 중요 문서는 따로 보관해 주세요.",
  "기존 파손·누수·가전 이상을 알려주세요.",
  "전기와 수도 사용 가능 여부를 확인해 주세요.",
  "출입 방법과 주차·엘리베이터 조건을 알려주세요.",
  "짐 반입 또는 방 인계 시간을 공유해 주세요.",
  "완료 확인 방법과 연락 가능한 시간을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["원룸청소 비용은 평당 얼마인가요?", "찐청소는 평수만으로 정하지 않습니다. 구조, 주방·욕실 오염, 옵션 가전과 짐의 상태를 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["작은 원룸인데도 비용이 달라지는 이유가 있나요?", "원룸에도 주방과 욕실, 창틀 등 각각 작업할 곳이 있습니다. 복층 여부, 가전 내부 세척과 물품 이동 등에 따라 실제 작업량이 달라집니다."],
  ["옵션 냉장고와 세탁기, 에어컨도 포함되나요?", "옵션으로 설치됐다는 이유만으로 내부 세척까지 포함되지는 않습니다. 주변 공간, 외부 표면, 내부·분해 세척을 구분해 요청 범위와 비용을 확인합니다."],
  ["짐이 있는 상태에서도 가능한가요?", "짐의 양과 배치, 접근 가능한 구간을 확인해야 합니다. 생활용품 이동과 가구 자체의 청소는 별도로 범위를 정합니다."],
  ["욕실이나 주방만 맡길 수 있나요?", "필요한 구역을 지정해 상담할 수 있습니다. 실제 작업량과 준비 조건에 맞춰 가능 여부와 견적을 안내합니다."],
  ["복층 원룸도 상담할 수 있나요?", "복층 면적과 계단, 높은 창의 접근 조건을 확인해 상담합니다. 전체 구조를 볼 수 있는 사진을 함께 보내주세요."],
  ["쓰레기나 버릴 가구도 처리해 주나요?", "일반 공간 청소와 별도 항목으로 확인합니다. 물품의 종류와 양, 반출 조건을 알려주시면 처리 가능 범위와 비용을 안내합니다."],
  ["담배 냄새나 곰팡이도 모두 없어지나요?", "냄새와 곰팡이의 원인, 자재 상태에 따라 다릅니다. 일반 청소로 다룰 범위와 별도 처리·보수가 필요한 부분을 구분하며 완전 제거를 일괄 보장하지 않습니다."],
  ["이사 당일에 청소할 수 있나요?", "퇴거 완료부터 짐 반입까지의 시간과 작업 범위를 확인해야 합니다. 가능한 일정인지 먼저 검토하며 당일 완료를 일괄 약속하지 않습니다."],
  ["집에 없어도 진행할 수 있나요?", "출입과 작업 전후 확인 방법을 정해야 합니다. 비대면 진행을 원하시면 가능 여부와 연락·검수 방식을 상담 시 확인해 주세요."],
  ["원룸 퇴실청소를 하면 보증금을 돌려받을 수 있나요?", "퇴실청소와 보증금 정산은 별개입니다. 임대인이나 관리자의 청소 요구 항목을 알려주시면 견적 범위에 반영할 수 있지만, 시설 손상 보수나 보증금 반환까지 보장하지는 않습니다."],
  ["청소 후 미흡한 곳이 있으면 어떻게 하나요?", "작업 범위 안에서 해당 위치와 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 사후 접수 조건은 예약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 대략적인 면적",
  "일반형·분리형·복층 등 구조",
  "입주 전·거주 중·퇴실 후 여부",
  "전체 공간과 주요 오염 부위 사진",
  "옵션 가전과 남길 가구 목록",
  "가전 내부·수납장 등 추가 요청",
  "짐과 처리할 잔여물의 유무",
  "희망 날짜와 작업 가능 시간",
  "짐 반입 또는 방 인계 예정 시간",
  "출입과 주차 조건",
];

const path = "/원룸청소/";

export default function StudioCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "원룸청소",
      serviceType: "원룸청소",
      description: "입주 전 빈 원룸인지, 살고 있는 오피스텔인지, 퇴실 후 정리가 필요한 방인지 알려주세요. 찐청소는 주방 기름때, 욕실 물때, 창틀 먼지와 옵션 가전의 상태를 나눠 확인하고 필요한 작업을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "원룸청소", item: absoluteUrl(path) },
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
          <Image src="/images/service-scenes/studio-bathroom-condition.webp" alt="" fill preload className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/75" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>원룸청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">간단청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">원룸·오피스텔 청소, 짐과 옵션 가전까지 범위를 확인하세요</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>입주 전 빈 원룸인지, 살고 있는 오피스텔인지, 퇴실 후 정리가 필요한 방인지 알려주세요. 찐청소는 주방 기름때, 욕실 물때, 창틀 먼지와 옵션 가전의 상태를 나눠 확인하고 필요한 작업을 안내합니다.</ReadingParagraph>
            <ReadingParagraph>방은 하나여도 청소할 일까지 하나는 아니니까요. 작업 범위와 비용부터 분명하게 알려드리겠습니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">원룸청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="원룸청소 비용과 견적 산정 기준" />
            <ReadingParagraph>원룸청소 비용은 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 면적이라도 ","남아 있는 짐에 따라 "]}>같은 면적이라도 주방과 욕실의 오염, 복층 유무, 옵션 가전, 남아 있는 짐에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업량을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">면적이 작아도 기본적으로 필요한 작업이 있습니다</h3>
            <ReadingParagraph className="mt-2">원룸에도 주방과 욕실, 창문과 배수구 등 각각 확인할 곳이 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">넓은 집보다 바닥 면적은 작더라도 준비와 장비 반입, 공간별 세척과 마무리에는 시간이 필요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">그래서 큰 집의 청소 비용을 평수 비율로 나눈 금액과 같지는 않을 수 있습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">같은 원룸도 구조와 상태가 다릅니다</h3>
            <ReadingParagraph className="mt-2">빈 원룸과 침대·책상·생활용품이 놓인 원룸은 접근 조건이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">복층이나 별도 베란다, 수납 공간이 많다면 작업 범위도 달라집니다. 오래된 집인지보다 현재 오염과 요청 내용을 함께 살펴봅니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">현재 상태를 보여주는 전체 사진과 오염 부위 사진을 함께 보내주시면 상담이 수월합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 상황별·공간별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="상황별·공간별 청소 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">복층·옵션 가전이 있는 원룸은 무엇이 다른가요?</h3>
            <ReadingParagraph className="mt-2 mb-6">복층 계단과 높은 창, 냉장고·세탁기 등 옵션 가전이 있으면 같은 면적도 작업량이 달라집니다. 공간 청소와 가전 내부·분해 세척을 구분하고, 짐 반출과 새 입주자의 짐 반입 사이 시간을 확인합니다.</ReadingParagraph>

            <div className="space-y-6">
              {situationItems.map(([title, paragraphs]) => (
                <div key={title}>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  {paragraphs.map((p, i) => (
                    <ReadingParagraph key={p} className={i === 0 ? "mt-2" : i === paragraphs.length - 1 ? "mt-2 text-[15px] text-gray-500" : "mt-2"}>{p}</ReadingParagraph>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <ReadingParagraph className="mt-2">{item.body}</ReadingParagraph>
                  {item.list && (
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {item.list.map(li => (
                        <li key={li} className="flex items-start gap-2 rounded-lg bg-gray-50/60 px-3 py-2 text-[15.5px]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.note && <ReadingParagraph className="mt-2 text-[15px] text-gray-500">{item.note}</ReadingParagraph>}
                </div>
              ))}
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>처음 정한 범위보다 작업이 늘어나거나 별도 처리가 필요한 경우 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업은 내용과 비용을 확인한 뒤 진행 범위를 정합니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">쓰레기와 물품 처리는 별도로 구분합니다</h3>
            <ReadingParagraph className="mt-2">공간 청소와 물품 폐기는 다른 작업입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">생활 쓰레기나 음식물, 가구 등이 많이 남아 있다면 사진과 함께 알려주세요. 종류와 양에 따라 일반 원룸청소와 별도 처리가 필요한 범위를 구분합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">남길 물건과 버릴 물건은 미리 정해 주세요. 남아 있다는 이유만으로 임의로 폐기하지 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="원룸청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">원룸이면 금방 끝나나요?</h3>
            <ReadingParagraph className="mt-2">면적이 작아도 오염과 옵션 가전, 짐의 상태에 따라 시간이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진과 요청 범위를 확인한 뒤 예상 시간을 안내합니다. 작은 원룸이라는 이유만으로 짧은 시간 안에 끝난다고 약속하지 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>원룸청소 결과는 방 전체 사진과 세부 구역을 함께 확인하는 것이 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">겉으로 정돈된 모습과 실제 오염 제거 결과는 구분해서 살펴보세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진 제공이 필요하면 촬영할 구역과 전달 가능 여부를 상담 시 확인해 주세요. 개인 문서와 사진, 생활용품 등 촬영을 원하지 않는 대상도 알려주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부를 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">원룸청소는 짐이 빠지는 시간과 들어오는 시간을 함께 맞추는 것이 중요합니다.</ReadingParagraph>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">당일 이사와 청소를 함께 진행하려면 실제로 확보되는 작업 시간을 먼저 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">거주 중이라면 작업 중 머물 공간과 외출 계획, 반려동물의 동선도 함께 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 항목을 기준으로 확인합니다</h3>
            <ReadingParagraph className="mt-2">주방, 욕실, 창틀, 바닥, 옵션 가전 등 견적에 포함된 항목을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">수납장과 가전은 외부만인지 내부까지인지 구분해서 살펴봅니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 기존 손상은 다릅니다</h3>
            <ReadingParagraph className="mt-2">오래된 변색, 마루 눌림, 금속 부식, 실리콘 손상 등은 청소만으로 원래 상태가 되지 않을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소가 필요한 부분과 수리·교체가 필요한 상태를 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">퇴실 확인과 비용 정산은 별개입니다</h3>
            <ReadingParagraph className="mt-2">퇴실을 위한 요청 항목이 있다면 사전에 공유해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">다만 청소를 마쳤다는 사실만으로 임대인의 모든 요구가 충족되거나 보증금 반환이 보장되는 것은 아닙니다. 작업 범위와 결과를 확인하는 서비스로 구분해 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳은 해당 위치와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="원룸청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 보내려고 먼저 대청소하실 필요는 없습니다. 현재 상태를 보여주시는 편이 작업 범위를 정하는 데 도움이 됩니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">원룸청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 지금 방이 어떤 상태인지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">처음 입주할 빈방인지, 살고 있는 방인지, 퇴실 후 남은 오염을 정리하려는지에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>원룸청소 견적 문의하기 →</CtaButton>
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
