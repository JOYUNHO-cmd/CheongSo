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
  ["scope", "범위·회차별 구성"],
  ["extra", "방문 주기·추가 비용"],
  ["process", "시작 절차·작업 시간"],
  ["cases", "작업 결과 확인"],
  ["area", "지역·방문 일정"],
  ["checkup", "확인·관리 조정"],
  ["prep", "계약 전 준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["관리 대상", "사무실·상가·사업장 및 공용 공간 등 요청 구역"],
  ["견적 기준", "필요한 인원과 작업 시간, 방문 주기와 범위"],
  ["작업 구성", "매회 관리 항목과 주기별 집중 청소 항목 구분"],
  ["일정 조율", "운영시간, 출입 조건, 이용자 동선 반영"],
  ["별도 검토", "초기 대청소, 코팅, 설비 세척, 대량 폐기물 처리 등"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "관리할 공간과 면적",
  "이용 인원과 사용 빈도",
  "바닥·화장실·탕비실 등 요청 항목",
  "집기 배치와 접근 가능한 구간",
  "회당 필요한 인원과 작업 시간",
  "방문 횟수와 작업 가능 시간대",
  "장비·약품과 현장 준비 조건",
  "주기적으로 추가할 집중 청소 항목",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥과 주요 통로",
    body: "공간의 바닥 재질과 사용 상태에 맞춰 먼지와 일상적인 오염을 관리합니다. 출입구, 통로, 사람들이 자주 머무는 구역 등 사용 빈도가 높은 곳을 살펴봅니다.",
    note: "집기 아래나 좁은 구간은 접근 가능한 범위를 정하며, 가구 이동이 필요한 작업은 구분합니다.",
    photoPairs: [["regular-floor-01.webp"], ["regular-floor-02.webp"]],
  },
  {
    title: "화장실과 세면 공간",
    body: "변기, 세면대, 바닥, 칸막이 등 관리할 항목을 정합니다. 이용 인원과 오염 상태에 맞춰 작업 시간을 배분합니다.",
    note: "누수·파손·배수 이상처럼 청소와 다른 조치가 필요한 부분은 구분합니다.",
    photoPairs: [["regular-restroom-01.webp"]],
  },
  {
    title: "탕비실과 공용 공간",
    body: "싱크대 주변, 바닥, 공용 표면 등 요청 범위를 확인합니다.",
    note: "설거지, 냉장고 내부 정리, 개인 컵 세척, 식품 폐기는 별도 항목입니다. 탕비실 청소라는 이름만으로 모두 포함되는 것은 아닙니다.",
    photoPairs: [["regular-pantry-01.webp"]],
  },
  {
    title: "출입문·내부 유리·창틀",
    body: "손자국이 자주 생기는 출입문과 내부 유리, 먼지가 쌓이는 창틀 등을 관리 항목으로 검토합니다.",
    note: "매회 작업할 곳과 일정 주기로 작업할 곳을 나누면 필요한 곳에 시간을 배분하기 좋습니다.",
    photoPairs: [["regular-door-01.webp"]],
  },
  {
    title: "쓰레기통과 분리수거",
    body: "쓰레기통 비우기와 분리수거를 요청하시면 대상과 이동 위치를 확인합니다. 건물 내 지정 장소로 옮기는 작업과 외부 반출·처리는 다릅니다.",
    note: "종량제 봉투 준비, 배출 장소, 배출 가능 시간 등도 함께 정합니다. 대형 물품이나 사업장 특수 폐기물 처리는 일반적인 정기청소와 구분합니다.",
    photoPairs: [["regular-trash-01.webp"]],
  },
  {
    title: "집기와 개인 물품",
    body: "책상·의자·수납장 등 집기 자체의 청소는 계약 범위에 명시한 경우에 진행합니다.",
    note: "개인 책상 위 서류 정리, 수납장 내부 정리, 전자기기 내부 청소까지 임의로 포함하지 않습니다. 닦아야 할 표면과 손대면 안 되는 물품을 구분해 두면 관리가 수월합니다.",
    photoPairs: [["regular-furniture-01.webp"]],
  },
];

const everyVisitExamples = [
  "주요 통로와 요청 구역의 바닥",
  "이용 빈도가 높은 화장실",
  "탕비실의 합의된 구역",
  "계약에 포함된 쓰레기통 관리",
];

const periodicExamples = [
  "창틀과 모서리의 집중 청소",
  "내부 유리의 넓은 면적 세척",
  "평소 접근이 어려운 구간",
  "바닥의 누적 오염 확인과 추가 작업 검토",
];

const separateScopeItems = [
  "처음 쌓인 오염을 정리하는 대청소",
  "바닥 왁스코팅과 기존 코팅 제거",
  "후드·유니트쿨러·기계설비 등 별도 세척",
  "외벽 유리와 고소작업",
  "소독·방역",
  "공사 분진이나 특수 오염 제거",
  "대량 폐기물 반출·처리",
];

const frequencyChecklist = [
  "하루 이용 인원과 운영시간",
  "오염이 주로 생기는 위치",
  "현재 청소 후 상태가 유지되는 기간",
  "직원이나 관리자가 직접 관리하는 항목",
  "가장 우선적으로 개선하고 싶은 부분",
];

const conditionChangeItems = [
  "관리할 층이나 공간이 늘어나는 경우",
  "이용 인원이 크게 늘어나는 경우",
  "방문 횟수나 회당 작업 시간을 늘리는 경우",
  "집기 청소 등 새로운 항목을 추가하는 경우",
  "행사·공사 후 별도 청소가 필요한 경우",
  "추가 장비나 전문 작업이 필요한 경우",
];

const processSteps: [string, string][] = [
  ["관리가 필요한 부분 상담", "공간의 용도와 면적, 이용 인원, 현재 청소 방식과 불편한 부분을 확인합니다. 가장 신경 쓰이는 구역을 알려주시면 우선순위를 정하는 데 도움이 됩니다."],
  ["현장과 초기 오염 확인", "집기 배치, 바닥 상태, 화장실과 공용 공간, 출입 조건 등을 살펴봅니다. 정기관리로 시작할 수 있는 상태인지, 먼저 정리할 오염이 있는지도 구분합니다."],
  ["인원·시간·주기와 견적 안내", "매회 작업과 주기별 작업을 나누고 필요한 인원과 시간을 정합니다. 포함·제외 항목, 방문 일정, 별도 요청 사항을 기준으로 견적을 안내합니다."],
  ["출입과 작업 방식 확인", "열쇠·출입 권한, 보안장치, 사용 가능한 물·전원, 장비 보관 여부 등을 확인합니다. 출입 정보의 전달·보관 방식과 작업 후 문단속 범위도 사전에 맞춥니다."],
  ["정기관리 진행과 상태 확인", "정해진 범위에 따라 작업하고, 실제 사용 상태와 요청 내용을 확인합니다. 관리 범위나 시간이 현장에 맞지 않는 부분은 조정 필요 여부를 검토합니다."],
];

const caseChecklist = [
  "매회 청소하기로 한 구역이 빠지지 않았는지",
  "주요 통로와 화장실의 오염 상태",
  "쓰레기통 관리 등 계약 항목의 이행 여부",
  "주기별 집중 청소가 정한 일정에 맞게 이루어지는지",
  "청소 후에도 반복해서 남는 오염이 있는지",
];

const reservationChecklist = [
  "직원 근무와 영업시간",
  "고객·방문객이 많이 오가는 시간",
  "회의·교육·행사 일정",
  "건물 출입 가능 시간",
  "소음과 장비 사용 제한",
  "쓰레기 배출 가능 시간",
];

const prepItems = [
  "관리할 구역과 제외할 구역을 구분해 주세요.",
  "가장 불편한 오염과 우선 관리할 곳을 알려주세요.",
  "이용 인원과 운영시간을 알려주세요.",
  "개인 물품과 중요 서류의 취급 기준을 정해 주세요.",
  "출입 방법과 보안 관련 조건을 확인해 주세요.",
  "쓰레기 배출 장소와 봉투 준비 담당을 정해 주세요.",
  "세제·장비와 화장지·손세정제 등 소모품의 준비 범위를 확인해 주세요.",
  "주기별 청소 항목을 구분해 주세요.",
  "공휴일·일정 변경·임시 휴무 시 처리 기준을 확인해 주세요.",
  "계약기간, 결제, 변경·종료 조건을 확인해 주세요.",
  "필요한 사진·확인 자료와 연락 담당자를 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["정기청소 비용은 평당으로 정하나요?", "찐청소는 필요한 인원과 작업 시간을 중심으로 산정합니다. 면적과 이용 인원, 청소 항목, 방문 주기 등을 함께 확인합니다."],
  ["주 몇 회 정도가 적당한가요?", "공간의 사용량과 오염 상태에 따라 다릅니다. 가장 자주 더러워지는 곳과 필요한 관리 수준을 확인해 주기를 정합니다."],
  ["매번 모든 구역을 청소하나요?", "계약 범위에 따라 다릅니다. 매회 관리할 항목과 일정 주기로 작업할 항목을 나누어 안내합니다."],
  ["정기청소를 시작하면 오래된 찌든 때도 첫 방문에 모두 제거하나요?", "오래 쌓인 오염은 초기 대청소가 필요할 수 있습니다. 정기관리 범위와 첫 회 집중 작업을 구분해 견적을 안내하며, 코팅·설비 세척·대량 폐기물 처리는 별도 검토합니다."],
  ["책상과 의자도 청소해 주나요?", "집기 청소는 별도로 범위를 정합니다. 책상 위 서류 정리나 수납장 내부 청소까지 자동으로 포함되지는 않습니다."],
  ["쓰레기와 분리수거도 포함되나요?", "계약에 포함할 항목으로 정할 수 있습니다. 쓰레기통 비우기, 건물 내 이동, 외부 반출·처리는 서로 구분해 확인합니다."],
  ["세제와 화장지 같은 소모품도 제공하나요?", "청소용 장비·약품과 시설 운영용 소모품은 구분합니다. 품목별 준비 담당과 비용 포함 여부를 견적 단계에서 확인합니다."],
  ["사람이 없는 시간에 작업할 수 있나요?", "출입 방법, 보안 조건, 작업 가능 시간을 확인한 뒤 가능 여부를 안내합니다. 열쇠 관리와 문단속 범위도 사전에 정합니다."],
  ["매번 같은 담당자가 방문하나요?", "담당자 배정과 변경 시 안내 방식은 계약 전에 확인해 주세요. 담당자가 고정된다고 일괄 약속하지 않으며, 합의한 작업 범위가 관리 기준이 됩니다."],
  ["공휴일이나 임시 휴무에는 어떻게 하나요?", "휴일 방문, 일정 변경, 대체 방문과 비용 처리 기준은 계약 전에 정합니다. 휴무가 예정되어 있다면 미리 알려주세요."],
  ["최소 계약기간이나 해지 조건이 있나요?", "계약기간, 변경·종료 절차와 정산 조건은 계약 전에 안내받고 확인해 주세요. 확인되지 않은 기간이나 위약금 조건을 일괄 적용해 안내하지 않습니다."],
  ["중간에 청소 범위나 횟수를 바꿀 수 있나요?", "변경 내용을 알려주시면 일정과 필요한 인원·시간을 검토합니다. 가능 여부와 변경 비용을 확인한 뒤 조정합니다."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "대략적인 면적과 이용 인원",
  "전체 공간과 주요 오염 부위 사진",
  "관리할 구역과 원하는 작업",
  "현재 청소 방식과 불편한 점",
  "희망 방문 횟수와 요일·시간대",
  "출입과 보안 관련 조건",
  "쓰레기 배출과 소모품 준비 조건",
  "희망 시작일과 필요한 계약 자료",
];

const caseIds: readonly string[] = [];
const path = "/정기청소/";

export default function RegularCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "정기청소",
      serviceType: "정기청소·사무실상가 관리",
      description: "사무실 바닥과 휴게 공간, 건물 계단과 화장실처럼 자주 쓰는 구역을 주기적으로 관리합니다. 찐청소는 필요한 인원과 작업 시간, 방문 횟수를 기준으로 매회 작업과 주기별 집중 청소를 나눠 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "정기청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/regular-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <Image src="/images/hero-bg/regular-hero.webp" alt="" fill priority className="object-contain" sizes="100vw" />
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>정기청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">사업장청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">사무실·상가 정기청소, 구역별 이용량에 맞춰 주기를 정합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>사무실 바닥과 휴게 공간, 건물 계단과 화장실처럼 자주 쓰는 구역을 주기적으로 관리합니다. 찐청소는 필요한 인원과 작업 시간, 방문 횟수를 기준으로 매회 작업과 주기별 집중 청소를 나눠 안내합니다.</ReadingParagraph>
            <ReadingParagraph>직원들끼리 청소 당번 정하는 회의는 줄이고, 본업에 쓸 시간을 늘려보세요.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">정기청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="정기청소 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["필요한 인원과 작업 시간을 기준으로 "]}>찐청소의 정기청소 비용은 필요한 인원과 작업 시간을 기준으로 산정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">여기에 방문 주기와 회차별 작업 범위, 현장 조건을 반영합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["평수가 같아도 ","청소할 항목에 따라 "]}>평수가 같아도 공간을 이용하는 사람의 수, 집기 배치, 화장실 유무, 청소할 항목에 따라 필요한 작업량이 달라집니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">평수보다 실제로 할 일을 확인합니다</h3>
            <ReadingParagraph className="mt-2">집기가 빽빽한 50평 사무실과 비어 있는 100평 공간은 청소 동선부터 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">화장실과 탕비실을 함께 관리하는지, 바닥만 청소하는지에 따라서도 필요한 인원과 시간이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">면적은 참고 자료입니다. 견적의 기준은 정해진 시간에 실제로 해야 할 작업입니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">월 비용을 비교할 때는 방문 횟수, 회당 인원과 시간, 포함 범위를 함께 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">같은 월 비용이어도 관리 내용은 다를 수 있습니다</h3>
            <ReadingParagraph className="mt-2">짧게 자주 방문하는 방식과 한 번에 여러 구역을 충분히 청소하는 방식은 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">어느 방식이 무조건 좋은 것이 아니라 공간의 사용 패턴과 필요한 작업에 맞아야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">찐청소는 요청하신 관리 수준과 현장 상태를 함께 살펴 인원·시간·주기를 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위/회차별 구성 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="정기청소 범위와 회차별 작업 구성" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">계단·화장실만 정기적으로 관리할 수도 있나요?</h3>
            <ReadingParagraph className="mt-2 mb-6">요청 구역과 방문 주기를 정해 상담할 수 있습니다. 계단 보행 오염, 난간 표면, 화장실 상태와 쓰레기 발생량을 보고 관리 시간을 배분합니다. 봉투·화장지 등 소모품 제공과 초기 대청소 여부는 별도로 확인합니다.</ReadingParagraph>
            <ReadingParagraph>정기청소는 매번 건물 전체를 대청소하는 서비스와 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">자주 관리할 구역과 일정 주기로 집중 청소할 구역을 나누어 구성합니다. 아래 항목은 상담 시 선택·검토하는 내용이며, 모든 항목이 자동으로 포함되는 것은 아닙니다.</ReadingParagraph>

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

            <h3 className="mt-8 text-lg font-bold text-brand-dark">회차별 작업 구성 예시</h3>
            <ReadingParagraph className="mt-3 font-bold text-brand-dark">매회 관리할 항목의 예</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {everyVisitExamples.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주기적으로 배정할 항목의 예</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {periodicExamples.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">위 내용은 구성 예시입니다. 실제 포함 항목과 주기는 현장별로 정합니다.</ReadingParagraph>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="font-bold text-brand-dark">일반 정기관리와 구분할 작업</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">필요한 작업은 정기관리와 함께 상담할 수 있지만, 포함 여부와 비용은 별도로 정합니다.</ReadingParagraph>
            </div>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 방문주기/추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="방문 주기와 추가 비용이 달라지는 경우" />
            <h3 className="text-lg font-bold text-brand-dark">방문 횟수는 공간의 사용 상태에 맞춥니다</h3>
            <ReadingParagraph className="mt-2">주 몇 회가 적당한지는 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">이용자가 많은 공간, 음식물을 사용하는 공간, 외부 먼지가 자주 들어오는 곳은 관리할 내용이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">상담 시 다음 사항을 함께 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {frequencyChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">처음에 대청소가 필요한지 구분합니다</h3>
            <ReadingParagraph className="mt-2">오랫동안 쌓인 오염이 있다면 짧은 정기관리 시간만으로 정리하기 어려울 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">이런 경우에는 초기 대청소가 필요한지 먼저 확인합니다. 모든 현장에 초기 대청소를 일괄 적용하는 것은 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">필요하다면 초기 작업과 이후 정기관리의 범위·비용을 나누어 안내합니다.</ReadingParagraph>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">관리 조건이 바뀌면 견적도 다시 확인합니다</h3>
            <ul className="mt-3 space-y-2.5">
              {conditionChangeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 요청이 기존 시간 안에 가능한지, 작업 시간을 늘려야 하는지 확인하고 범위와 비용을 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 시작절차/작업시간 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="정기청소 시작 절차와 작업 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">회당 작업 시간은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">면적, 청소 항목, 집기 배치, 오염 정도와 투입 인원에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">인원과 시간을 함께 보아야 합니다. 작업 시간이 같더라도 한 명이 하는 경우와 여러 명이 구역을 나누는 경우는 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">계약 전에 회당 인원·시간과 작업 범위를 함께 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 결과/관리상태 확인 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 결과와 관리 상태 확인" />
            <ReadingParagraph>정기청소는 한 번의 극적인 전후 사진보다 약속한 관리가 꾸준히 이루어지는지가 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">다음과 같은 부분을 기준으로 확인하면 좋습니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">청소 직후의 상태와 다음 방문 전까지 생긴 오염은 구분해서 살펴야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 사진이나 확인 자료가 필요하면 촬영 가능 구역과 제공 방식 등을 상담 시 확인해 주세요. 개인정보나 업무 자료가 보이는 곳은 촬영 제한도 함께 정합니다.</ReadingParagraph>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/방문일정 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 방문 일정" />
            <ReadingParagraph>현장 주소와 원하는 요일·시간대를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">운영 중에 작업할지, 출근 전이나 영업 종료 후에 진행할지도 현장에 맞춰 정합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">이른 시간, 야간, 주말 작업은 희망 조건을 알려주시면 가능 여부를 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">공휴일 방문, 일정 변경, 임시 휴무 때의 처리 방식도 계약 전에 확인해 두는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 확인/관리조정 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 후 확인과 관리 내용 조정" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 작업 항목이 기준입니다</h3>
            <ReadingParagraph className="mt-2">청소 결과는 계약에 포함된 구역과 항목을 기준으로 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">&lsquo;전체적으로 깨끗하게&rsquo;라는 표현보다 바닥, 화장실, 창틀 등 확인할 항목이 구체적일수록 서로의 기대를 맞추기 쉽습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 구체적으로 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 위치와 상태, 확인 시점을 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 내용과 현장 상태를 살펴 후속 처리 방법을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">반복되는 문제는 범위와 시간을 함께 봅니다</h3>
            <ReadingParagraph className="mt-2">특정 구역이 계속 부족하게 느껴진다면 작업 누락인지, 오염이 빠르게 다시 생기는지, 배정한 시간이 부족한지 구분해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">이용 인원이나 운영 방식이 바뀌었다면 방문 주기와 작업 시간을 조정할 필요가 있는지도 확인합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">추가 요청은 기존 범위와 구분합니다</h3>
            <ReadingParagraph className="mt-2">기존 작업의 미흡한 부분을 확인하는 것과 새로운 청소를 추가하는 것은 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 요청이 생기면 수행 가능 여부와 필요한 시간·비용을 확인해 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="정기청소 계약 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 범위를 잘 정해 두면 매번 같은 설명을 반복할 일이 줄어듭니다. 처음에 조금 구체적으로 맞추고, 이후에는 편하게 관리받을 수 있도록 준비하겠습니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">정기청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 지금 어떤 관리가 필요한지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">바닥만 정기적으로 관리하면 되는지, 화장실과 탕비실까지 필요한지, 직원들이 직접 하고 있는 청소를 어디까지 맡기고 싶은지에 따라 구성이 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>정기청소 견적 문의하기 →</CtaButton>
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
