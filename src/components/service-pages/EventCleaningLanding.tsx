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
  ["scope", "단계별·공간별 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "전후 확인 사항"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 처리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "기업 행사, 전시회, 박람회, 공연, 세미나, 지역축제 등"],
  ["작업 시점", "행사 전·종료 후 청소, 운영 중 관리 필요 시 별도 협의"],
  ["주요 구역", "출입구, 행사 공간, 객석·통로, 부스 주변, 휴게·취식 공간, 화장실 등"],
  ["견적 기준", "필요 인원 + 장비·약품 비용을 중심으로 작업 시간과 범위 반영"],
  ["별도 확인", "폐기물 외부 반출·처리, 구조물 철거, 집기 이동, 특수 오염 제거"],
  ["일정 기준", "설치 완료 시간, 행사 종료 시간, 철거 일정, 대관 반납 시간"],
  ["서비스 지역", "현장 주소와 일정으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 공간의 면적과 구역 수",
  "예상 참석 인원과 행사 운영 시간",
  "음식·음료 제공 여부",
  "객석, 부스, 테이블 등 시설물 배치",
  "쓰레기 종류와 예상 발생량",
  "행사 전·운영 중·종료 후 중 필요한 작업 시점",
  "실제 청소를 시작할 수 있는 시간과 완료 기한",
  "폐기물 집하 장소와 반출 동선",
  "바닥 재질과 예상되는 오염",
];

const scopeItems: { title: string; intro?: string; includedLabel: string; included: string[]; excluded: string[]; note: string }[] = [
  {
    title: "행사 시작 전 준비 청소",
    includedLabel: "기본 작업으로 협의하는 범위",
    included: ["설치가 끝난 구역의 바닥 먼지와 잔여 쓰레기 정리", "출입구와 주요 통로 청소", "협의한 테이블·의자 표면의 오염 제거", "참석자 이용 구역의 마무리 점검"],
    excluded: ["부스 설치 과정에서 발생한 공사 분진", "유리창 전체 세척", "바닥 코팅과 카펫 전문 세척", "집기 배치와 대량 이동"],
    note: "설치 작업이 계속되면 청소한 구역이 다시 오염될 수 있습니다. 설치 완료 구역과 최종 청소 시간을 먼저 맞추는 것이 좋습니다.",
  },
  {
    title: "행사 운영 중 관리",
    intro: "운영 중 관리가 필요하면 인력 배치 가능 여부와 시간을 먼저 협의합니다.",
    includedLabel: "협의 가능한 관리 항목",
    included: ["지정 구역의 쓰레기 수거와 분리 정리", "쓰레기통 상태 확인과 봉투 교체", "통로와 휴게 공간의 부분 오염 정리", "화장실 점검과 청소", "행사 담당자와의 현장 연락"],
    excluded: ["상주 인원과 순회 주기", "화장지·핸드타월·봉투 등 소모품 제공 주체", "행사 연장 시 추가 근무", "식음료 운영업체와 청소팀의 업무 구분"],
    note: "청소 인력이 행사 진행, 관람객 안내, 보안 업무까지 함께 맡는 것은 아닙니다. 담당 업무를 미리 정해 현장 혼선을 줄입니다.",
  },
  {
    title: "행사 종료 후 객석·통로·부스 주변",
    includedLabel: "기본 작업으로 협의하는 범위",
    included: ["바닥과 객석 주변의 일반 쓰레기 수거", "접근 가능한 부스 주변과 공용 통로 청소", "바닥 재질에 맞는 오염 제거", "협의된 공간의 마무리 정리"],
    excluded: ["무대·부스·트러스 등 구조물 철거", "음향·조명·전시 장비 이동", "대량 집기 운반과 배치", "테이프·접착제·도료 등 특수 잔여물 제거"],
    note: "철거팀이 작업 중인 구역과 청소 구역은 분리해 진행 순서를 조율합니다. 장비와 구조물이 빠져야 청소할 수 있는 부분도 있습니다.",
  },
  {
    title: "취식 공간과 휴게 구역",
    includedLabel: "기본 작업으로 협의하는 범위",
    included: ["컵, 용기, 포장지 등 일반 쓰레기 정리", "협의한 테이블 표면 청소", "음식물과 음료로 오염된 바닥의 세척"],
    excluded: ["음식물류 폐기물의 보관·반출·처리", "조리기구와 주방 설비 청소", "식기 세척과 케이터링 물품 회수", "카펫이나 의자에 스며든 얼룩"],
    note: "취식 공간 청소와 케이터링 업체의 정리 업무를 구분해두면 작업이 빠지는 부분을 줄일 수 있습니다.",
  },
  {
    title: "화장실과 공용 공간",
    includedLabel: "기본 작업으로 협의하는 범위",
    included: ["변기, 세면대, 거울과 바닥 청소", "휴지통 비우기와 주변 정리", "지정된 출입구·복도 등 공용 구역 청소"],
    excluded: ["행사장 관리업체와의 구역 분담", "소모품 보충과 구매 비용", "이동식 화장실 내부 오수 처리", "막힌 배수구와 설비 고장 조치"],
    note: "기존 시설 관리 인력이 있는 경우 담당 구역을 먼저 나눕니다. 청소와 설비 보수는 구분합니다.",
  },
  {
    title: "야외 행사 공간",
    includedLabel: "작업 검토 범위",
    included: ["지정된 행사 구역과 보행 동선의 쓰레기 수거", "부스 주변과 휴게 구역 정리", "바닥 상태에 따른 청소 가능 범위"],
    excluded: ["잔디, 흙바닥, 자갈 등 지면 조건", "행사장 밖 도로·주차장 청소", "우천 이후 진흙과 다량의 오염", "야간 조명과 작업 차량 접근 조건"],
    note: "야외 작업은 기상과 지면 상태를 반영해 방법과 일정을 정합니다.",
  },
];

const extraCostItems = [
  "행사 시간이 연장되어 인력 운영 시간이 늘어난 경우",
  "요청 구역이나 관리 횟수가 추가된 경우",
  "예상보다 많은 쓰레기와 오염이 발생한 경우",
  "설치·철거 지연으로 대기나 재방문이 필요한 경우",
  "야간 등 제한된 시간대에 추가 인력이 필요한 경우",
  "접착제, 기름, 카펫 얼룩 등 별도 처리가 필요한 경우",
  "폐기물 외부 반출과 처리가 추가되는 경우",
];

const processSteps: [string, string][] = [
  ["행사 정보 확인", "장소, 행사 종류, 예상 참석 인원, 운영 시간과 음식 제공 여부를 확인합니다."],
  ["작업 구역과 역할 구분", "행사 전 청소, 운영 중 관리, 종료 후 청소 중 필요한 작업을 정합니다. 행사장 관리업체, 설치·철거팀, 케이터링 업체와의 업무 경계도 확인합니다."],
  ["인원·장비·일정 협의", "작업량과 이용 가능한 시간을 기준으로 인원과 장비를 검토합니다. 쓰레기 집하 장소와 외부 반출 여부도 정합니다."],
  ["현장 인계와 작업 시작", "출입 절차를 마치고 작업 가능한 구역을 인계받습니다. 진행 중인 행사나 철거 작업과 겹치지 않도록 순서를 맞춥니다."],
  ["구역별 청소와 마무리", "협의한 범위에 따라 쓰레기 수거, 표면 청소, 바닥 세척과 정리를 진행합니다."],
  ["담당자 검수와 인계", "완료 구역을 확인하고 보관 물품, 남은 작업, 별도 처리가 필요한 부분을 안내합니다."],
];

const beforeChecklist = [
  "기존 바닥 손상과 얼룩",
  "주최 측 보관 물품",
  "임대·대여 집기와 장비",
  "철거팀이 회수할 자재",
  "청소팀 담당 구역",
];

const afterChecklist = [
  "객석 아래와 부스 주변의 잔여 쓰레기",
  "출입구와 주요 통로의 오염",
  "테이블·취식 구역의 끈적임과 잔여물",
  "화장실과 휴게 구역의 정리 상태",
  "쓰레기 집하 또는 외부 반출 완료 범위",
];

const reservationChecklist = [
  "설치 완료 예정 시간",
  "행사 시작·종료 시간",
  "참석자 퇴장 완료 시간",
  "장비 반출과 철거 완료 시간",
  "청소팀 출입 가능 시간",
  "대관 반납과 검수 시간",
];

const checkupChecklist = [
  "청소 구역과 작업 항목의 누락 여부",
  "일반 쓰레기와 바닥 오염의 처리 상태",
  "쓰레기 집하·반출 범위의 이행 여부",
  "보관 물품과 분실물의 인계 여부",
  "기존 손상과 청소로 해결되지 않는 얼룩",
  "현장 정리 상태",
];

const prepItems = [
  "행사장 도면 또는 구역별 사진",
  "행사 일정표와 예상 참석 인원",
  "부스·객석·취식 구역 배치도",
  "대관처 청소 및 반납 기준",
  "설치·철거 담당자 연락처",
  "쓰레기 종류와 예상 발생량",
  "집하 장소와 반출 차량 동선",
  "급수·전기 사용 가능 여부",
  "작업자 출입과 차량 등록 절차",
];

const onsiteItems = [
  "버릴 물품과 보관·회수할 물품",
  "분실물 인계 담당자",
  "소모품 제공 주체",
  "행사 연장 시 의사결정 담당자",
  "추가 작업 승인 담당자",
  "최종 검수 담당자",
];

const faqItems: [string, string][] = [
  ["행사장청소 비용은 평당으로 계산하나요?", "면적만으로 정하지 않습니다. 행사 종류, 참석 인원, 음식 제공 여부, 작업 시간과 쓰레기 발생량을 살펴 필요한 인원 및 장비·약품 비용을 중심으로 산정합니다."],
  ["행사 끝난 뒤 청소만 신청할 수 있나요?", "네. 종료 후 청소만 필요한 경우 해당 시간과 구역을 기준으로 상담할 수 있습니다. 설치물과 장비가 언제 빠지는지도 함께 알려주세요."],
  ["행사 시작 전과 종료 후 청소를 함께 요청할 수 있나요?", "함께 상담할 수 있습니다. 두 작업의 날짜와 출입 시간, 구역을 각각 확인해 견적을 안내합니다."],
  ["행사 중 화장실과 쓰레기통 관리도 맡길 수 있나요?", "인력 배치 가능 여부와 운영 시간을 먼저 협의합니다. 관리 구역, 순회 주기, 소모품 제공 주체와 행사 연장 시 조건을 따로 정합니다."],
  ["쓰레기는 전부 가져가나요?", "현장 지정 장소에 모으는 작업과 외부 반출·처리는 다릅니다. 폐기물 종류와 양, 행사장 처리 방식을 확인해 포함 범위와 비용을 안내합니다."],
  ["무대나 부스 철거도 포함되나요?", "행사장청소에 자동으로 포함되지 않습니다. 구조물 철거, 장비 회수와 청소를 구분하고 담당 업체와 작업 순서를 맞춰야 합니다."],
  ["바닥 테이프와 접착제도 제거하나요?", "별도 확인이 필요한 항목입니다. 바닥 재질과 접착 상태에 따라 작업 방법과 비용이 달라질 수 있으므로 미리 사진을 보내주세요."],
  ["화장실도 청소해주나요?", "작업 범위에 포함해 협의할 수 있습니다. 행사장 기존 관리업체와의 역할, 소모품 보충 여부, 운영 중 관리 횟수를 함께 정합니다."],
  ["늦은 밤이나 주말에도 가능한가요?", "행사 일정과 인력 배치, 시설 출입 조건을 확인한 뒤 안내합니다. 원하는 시작 시간과 완료 기한을 함께 알려주세요."],
  ["행사가 늦게 끝나면 어떻게 되나요?", "작업 시작이나 종료 시간이 달라질 수 있습니다. 연장 근무, 대기, 추가 인력 등이 필요한 경우를 대비해 비용 적용 조건을 사전에 협의합니다."],
  ["대관 반납 시간까지 무조건 끝낼 수 있나요?", "작업량과 실제 청소 가능 시간을 확인한 뒤 일정을 협의합니다. 철거 지연이나 구역 추가가 발생하면 계획이 달라질 수 있어 변경 내용을 바로 공유해주셔야 합니다."],
  ["야외 축제장도 상담할 수 있나요?", "네. 행사 구역, 지면 상태, 예상 쓰레기와 작업 동선을 확인해 가능 여부를 안내합니다. 기상과 조명, 차량 접근 조건도 함께 검토합니다."],
];

const contactChecklist = [
  "행사장 주소와 행사 종류",
  "행사 날짜와 운영 시간",
  "예상 참석 인원",
  "청소할 면적과 구역",
  "음식·음료 제공 여부",
  "행사 전·운영 중·종료 후 중 필요한 작업",
  "설치·철거 완료 시간과 대관 반납 시간",
  "예상 쓰레기와 외부 반출 필요 여부",
  "현장 사진 또는 배치도",
  "담당자 연락처",
];

const path = "/행사장청소/";

export default function EventCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "행사장청소",
      serviceType: "행사장청소",
      description: "전시장 부스 주변 먼지, 공연장 객석 아래 쓰레기, 취식 구역의 바닥 오염을 구역별로 확인합니다. 찐청소는 행사 전·종료 후 작업과 운영 중 관리 필요 여부를 나눠 상담하고, 철거와 대관 반납 일정에 맞춰 범위를 정합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "행사장청소", item: absoluteUrl(path) },
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
          <Image src="/images/service-scenes/event-booth.webp" alt="" fill preload className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand/75" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>행사장청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">외부·공간청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">행사 전 준비부터 종료 후 청소까지, 반납 시간을 함께 맞춥니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>전시장 부스 주변 먼지, 공연장 객석 아래 쓰레기, 취식 구역의 바닥 오염을 구역별로 확인합니다. 찐청소는 행사 전·종료 후 작업과 운영 중 관리 필요 여부를 나눠 상담하고, 철거와 대관 반납 일정에 맞춰 범위를 정합니다.</ReadingParagraph>
            <ReadingParagraph>행사의 여운은 남아도, 컵과 포장지까지 남을 필요는 없으니까요.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">행사장청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="행사장청소 비용과 견적 산정 기준" />
            <ReadingParagraph>행사장청소 비용은 행사장 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 면적이라도 ","음식·음료를 제공하는 행사는 "]}>같은 면적이라도 의자 위주의 세미나와 음식·음료를 제공하는 행사는 오염과 쓰레기 발생량이 다릅니다. 부스가 촘촘한 전시장과 비어 있는 행사장도 작업 동선에 차이가 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["비용을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품 비용을 중심으로 실제 작업량과 가능한 시간을 반영해 견적을 안내합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 견적 기준</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">운영 중 관리가 필요하다면 배치 인원, 관리 시간, 담당 구역을 따로 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">같은 공간도 여유 있게 작업할 수 있는 경우와 짧은 시간 안에 반납해야 하는 경우는 필요한 인력이 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적을 비교하실 때는 금액과 함께 인원, 작업 시간, 담당 구역, 쓰레기 처리 범위를 확인해주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 단계별/공간별 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="행사 단계별·공간별 청소 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">객석·부스·취식 구역마다 쓰레기와 오염이 다릅니다</h3>
            <ReadingParagraph className="mt-2 mb-6">포장지와 음료 용기, 음식물과 설치 잔여물은 구분합니다. 현장 지정 장소로 모으는 작업과 외부 반출·처리는 별도 범위입니다. 임대 집기와 전시 물품은 폐기 대상에서 구분하고, 구조물 철거는 청소에 자동 포함되지 않습니다.</ReadingParagraph>
            <ReadingParagraph>행사장청소는 행사 전후 전체가 자동으로 묶이는 서비스가 아닙니다. 필요한 시점과 구역을 선택해 범위를 정합니다.</ReadingParagraph>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className={`${readability.scopeCard} rounded-xl border border-gray-100 p-5`}>
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  {item.intro && <ReadingParagraph className="mt-2">{item.intro}</ReadingParagraph>}
                  <ReadingParagraph className="mt-3 text-[15px] font-bold text-gray-600">{item.includedLabel}</ReadingParagraph>
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
            </div>
            <ServiceScenePhotos path={path} section="scope" />
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>다음 상황에서는 작업량이나 비용이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">쓰레기를 모으는 작업과 행사장 밖으로 운반해 처리하는 작업은 구분합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">찐청소는 폐기물 직접 수집·운반과 처리업체 협업이 가능합니다. 다만 행사에서 발생한 폐기물의 종류와 양, 현장 반출 조건을 확인한 뒤 처리 가능 여부와 비용을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">외부 처리업체와의 협업 조건을 활용해 비용을 검토하지만, 모든 폐기물이 청소 기본비용에 포함되는 것은 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">예상 밖의 추가 작업이 생기면 현장 담당자에게 내용과 비용을 설명하고 진행 여부를 협의합니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="행사장청소 진행 순서와 소요 시간" />
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
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">청소 시간은 행사장 크기만으로 정하지 않습니다. 실제 작업 시작 가능 시점과 대관 반납 시간을 함께 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">&ldquo;행사는 밤 10시에 끝나지만 철거는 자정에 끝난다&rdquo;면, 청소 일정도 그 차이를 반영해야 합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후 확인 사항 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 인계 시 확인할 부분" />
            <ReadingParagraph>행사장에서는 버려야 할 물건과 회수해야 할 물건을 구분하는 것이 중요합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">작업 전 확인할 부분</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {beforeChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-6 font-bold text-brand-dark">작업 후 확인할 부분</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {afterChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">기록 사진이 필요하면 촬영 구역과 전달 방식을 사전에 협의해주세요. 참석자 얼굴과 행사 자료가 불필요하게 담기지 않도록 범위를 정하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소 완료 상태와 대관 계약상의 원상복구 의무는 같지 않을 수 있습니다. 대관처의 반납 기준을 미리 공유해주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>행사장 주소와 날짜를 알려주시면 진행 가능 여부를 확인해드립니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">예약 상담에 필요한 주요 시간</ReadingParagraph>

            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">여러 날 운영하는 행사는 일별 관리와 최종 마감 청소를 나눠 상담할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">야간·주말 작업이나 행사 중 관리는 인력 배치와 시설 출입 조건을 확인한 뒤 안내합니다. 행사 직전에 확정하기보다 일정이 잡힌 단계에서 상담하시면 조율에 도움이 됩니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <ReadingParagraph>작업 후에는 견적에서 정한 구역과 항목을 기준으로 검수합니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {checkupChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <ReadingParagraph className="mt-5">작업 누락이 의심되면 해당 위치와 내용을 담당자에게 알려주세요. 현장 상태와 계약 범위를 확인해 대응합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">검수 이후 다른 작업으로 다시 발생한 오염이나 요청하지 않았던 구역은 추가 작업에 해당할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">대관처의 추가 비용 면제나 보증금 반환을 보장하지는 않습니다. 대신 반납 기준을 미리 받아 청소 범위에 반영할 수 있도록 협의합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="행사장청소 전 준비사항" />
            <ReadingParagraph className="font-bold text-brand-dark">다음 자료가 있으면 상담과 현장 진행이 수월합니다</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <ReadingParagraph className="mt-8 font-bold text-brand-dark">현장에서는 아래 사항도 정해주세요</ReadingParagraph>
            <ul className="mt-4 space-y-2.5">
              {onsiteItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">담당자가 여러 명이라면 청소 관련 연락 창구를 한 명으로 정해두는 것이 좋습니다. 서로 다른 요청이 겹치는 상황을 줄일 수 있습니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">행사장청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">&ldquo;행사 후 반납까지 시간이 짧아요.&rdquo; &ldquo;운영 중 쓰레기통과 화장실 관리가 필요해요.&rdquo; &ldquo;철거팀이 따로 있는데 청소는 언제 시작하면 될까요?&rdquo;</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">행사 일정표와 현장 사진부터 보내주세요. 필요한 구역과 시간을 나눠 상담해드리겠습니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>행사장청소 견적 문의하기 →</CtaButton>
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
