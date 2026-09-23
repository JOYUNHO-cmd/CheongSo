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
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "신축 건물과 공사 완료 후 인계를 준비하는 공간"],
  ["주요 확인", "공사 분진, 보양재, 접착 흔적과 마감 잔여물"],
  ["작업 구역", "내부 전용 공간·공용부·외부 구역 중 합의한 범위"],
  ["견적 기준", "필요한 인원, 장비·약품, 실제 작업량과 방문 횟수"],
  ["일정 조율", "공정 종료, 보수, 집기 반입과 검수·인계 일정 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 층과 구역별 면적",
  "방·화장실·창문·수납 공간 등의 구성",
  "바닥과 벽면 등 마감재 종류",
  "공사 분진과 잔여물의 상태",
  "보양재 제거와 접착 흔적 처리 범위",
  "필요한 인원과 장비·약품",
  "외부·고소 구역의 접근 조건",
  "급수·전원과 장비 반입 조건",
  "작업 횟수와 확보 가능한 일정",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥과 가장자리",
    body: "바닥 재질과 마감 상태를 확인해 분진과 제거 가능한 오염을 청소합니다. 벽 쪽 가장자리, 문 주변과 모서리 등 먼지가 남기 쉬운 부분도 살펴봅니다.",
    note: "접착제·도료·시멘트계 잔여물은 일반적인 먼지와 구분합니다. 바닥 코팅, 연마, 도장과 손상 보수는 별도 작업입니다.",
    photoPairs: [["newc-floor-01.webp", "newc-floor-02.webp"], ["newc-floor-03.webp", "newc-floor-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀과 프레임, 작업 대상으로 정한 유리 면의 분진과 오염을 확인합니다. 내부와 외부 중 어느 면을 청소할지, 탈거가 필요한지, 접근할 수 있는지를 구분합니다.",
    note: "창호의 라벨과 보호필름도 제거 대상인지 먼저 확인합니다. 외부 고소작업은 현장 조건에 따라 별도 검토가 필요합니다.",
    photoPairs: [["newc-window-01.webp", "newc-window-02.webp"], ["newc-window-03.webp", "newc-window-04.webp"]],
  },
  {
    title: "문·몰딩·수납 공간",
    body: "문과 문틀, 몰딩, 붙박이 수납 공간 등 요청 부위의 먼지와 잔여물을 확인합니다. 수납장 내부와 서랍·선반 탈거는 구조와 상태에 따라 가능 여부를 정합니다.",
    note: "새로 설치한 자재의 관리 지침이나 취급 제한이 있다면 작업 전에 알려주세요.",
    photoPairs: [["newc-door-01.webp", "newc-door-02.webp"], ["newc-door-03.webp", "newc-door-04.webp"]],
  },
  {
    title: "화장실과 세면 공간",
    body: "바닥, 벽면, 세면대, 변기 등 합의한 구역의 공사 먼지와 표면 오염을 확인합니다. 시공된 줄눈·실리콘과 제거할 잔여물을 구분해 살펴봅니다. 마감재를 청소 대상으로 오인하지 않도록 필요한 부분은 시공 담당자와 확인합니다.",
    note: "배관 내부 작업, 누수 수리, 마감 보수는 별도입니다.",
    photoPairs: [["newc-bathroom-01.webp", "newc-bathroom-02.webp"], ["newc-bathroom-03.webp", "newc-bathroom-04.webp"]],
  },
  {
    title: "복도·계단·출입구 등 공용부",
    body: "층별 복도, 계단, 난간, 출입구 등 포함할 공간을 나누어 정합니다. 전용 공간과 공용부의 경계를 명확히 하고, 여러 시공팀이 오가는 현장은 작업 동선도 함께 확인합니다.",
    note: "승강기는 작업할 부위와 관리주체의 조건을 별도로 확인합니다.",
    photoPairs: [["newc-common-01.webp", "newc-common-02.webp"], ["newc-common-03.webp", "newc-common-04.webp"]],
  },
  {
    title: "보양재와 보호필름",
    body: "보양지, 테이프, 보호필름은 위치와 상태, 제거 시점을 먼저 확인합니다. 추가 공사 때문에 유지해야 하는 보호재나 시공팀 확인이 필요한 부착물은 임의로 제거하지 않습니다.",
    note: "보양재 제거와 남은 접착 흔적의 청소, 잔여물 반출은 각각 작업 범위를 정합니다.",
    photoPairs: [["newc-protect-01.webp", "newc-protect-02.webp"], ["newc-protect-03.webp", "newc-protect-04.webp"]],
  },
  {
    title: "마감 잔여물과 특수 오염",
    body: "도료, 접착제, 백시멘트 등으로 보이는 잔여물은 마감재와 오염 상태를 확인합니다. 필요한 경우 일부 구간을 먼저 살펴 작업 방법과 예상 결과를 판단합니다.",
    note: "이미 생긴 흠집이나 변색을 잔여물로 오해하지 않도록 청소할 오염과 손상을 구분합니다.",
    photoPairs: [["newc-residue-01.webp", "newc-residue-02.webp"], ["newc-residue-03.webp", "newc-residue-04.webp"]],
  },
  {
    title: "외벽·외부 유리·주차장",
    body: "내부 청소에 외벽, 외부 유리, 주차장까지 자동으로 포함되지는 않습니다. 청소할 면적과 높이, 장비 접근 조건, 오염 상태를 확인해 수행 가능 여부와 비용을 안내합니다.",
    photoPairs: [["newc-exterior-01.webp", "newc-exterior-02.webp"], ["newc-exterior-03.webp"]],
  },
];

const separateScopeItems = [
  "자재 이동과 대량 폐기물 반출·처리",
  "설비 내부·분해 세척",
  "높은 구조물과 외부 고소작업",
  "바닥 코팅 등 별도 표면 시공",
  "도장·줄눈·실리콘 보수",
  "유리·타일·패널 등의 교체",
  "전문 하자 점검",
  "소독·방역·새집증후군 관련 별도 관리",
];

const extraCostItems = [
  "청소할 층이나 공간이 추가되는 경우",
  "예상보다 많은 분진과 잔여물이 남은 경우",
  "보양재와 특수 오염 제거가 추가되는 경우",
  "외부·고소 구역을 추가하는 경우",
  "자재나 집기로 접근 조건이 달라지는 경우",
  "공정 변경으로 방문을 나누어야 하는 경우",
  "짧은 시간 안에 마치기 위해 인원 구성이 달라지는 경우",
  "청소 후 추가 공사로 재청소가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["현장과 과업 범위 확인", "주소, 건물 용도, 층수와 면적, 공사 상태를 확인합니다. 도면, 과업지시서, 청소 범위표가 있다면 함께 검토합니다."],
  ["구역별 작업과 견적 안내", "내부 공간, 공용부, 외부 구역을 나누고 세부 항목을 정합니다. 보양재와 잔여물 처리, 별도 세척의 담당 범위도 확인해 견적에 반영합니다."],
  ["공정과 투입 일정 조율", "남은 공사와 보수, 가구·설비 반입, 검수·인계 일정을 확인합니다. 구역별로 나누어 진행할지, 공정이 끝난 뒤 한 번에 진행할지 검토합니다."],
  ["마감 상태 확인과 청소", "마감재의 작업 가능 상태와 취급 조건을 확인한 뒤 합의한 범위에 따라 진행합니다. 예상하지 못한 손상이나 잔여물, 접근 제한이 발견되면 해당 구역의 작업 범위를 확인합니다."],
  ["마무리와 완료 검수", "계약에 포함된 구역과 주요 오염 부위를 확인합니다. 청소 결과와 시공팀의 보수·확인이 필요한 부분을 구분하고, 추가 작업이 필요하면 범위와 일정을 정리합니다."],
];

const caseChecklist = [
  "바닥과 가장자리의 분진",
  "창틀과 프레임의 잔여물",
  "합의한 유리 면의 오염",
  "수납장 내부와 문 주변",
  "화장실과 공용부",
  "보양재 제거 대상 구역",
  "처음 집중 청소를 요청한 부분",
];

const reservationChecklist = [
  "분진이 발생하는 공정의 종료",
  "마감재별 청소 가능 시점",
  "보수와 재시공 일정",
  "자재 정리와 폐기물 반출",
  "보양재 제거 시점",
  "가구·설비·상품 반입",
  "전기와 수도 사용 가능 여부",
  "검수 담당자와 인계 예정일",
];

const prepItems = [
  "청소할 층과 구역을 도면 등에 표시해 주세요.",
  "포함·제외 항목과 완료 확인 기준을 정해 주세요.",
  "남은 공정과 보수 일정을 공유해 주세요.",
  "제거할 보양재와 유지할 보호재를 구분해 주세요.",
  "자재별 관리 지침과 청소 가능 시점을 알려주세요.",
  "기존 파손·누수·들뜸 등을 전달해 주세요.",
  "자재와 폐기물 정리 담당을 정해 주세요.",
  "전기·수도와 세척수 관리 조건을 확인해 주세요.",
  "승강기·주차·장비 반입 조건을 알려주세요.",
  "다른 시공팀의 출입과 작업 동선을 조율해 주세요.",
  "범위 변경을 협의할 담당자를 정해 주세요.",
  "필요한 완료 자료와 검수 일정을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["신축청소와 준공청소를 따로 신청해야 하나요?", "찐청소에서는 신축준공청소로 통합해 상담합니다. 공사 상태와 청소 목적, 인계 일정에 맞춰 실제 작업 범위를 정합니다."],
  ["신축 아파트 한 세대나 일부 층도 상담할 수 있나요?", "필요한 공간을 지정해 상담할 수 있습니다. 한 세대의 입주 전 청소인지, 건물 공용부까지 포함하는 작업인지 구분해 안내합니다."],
  ["공사 후 청소는 신축준공청소와 인테리어청소 중 무엇을 선택하나요?", "신축 건물의 전체·공용부 인계가 중심이면 신축준공청소로, 기존 공간의 리모델링이나 부분공사 뒤 분진 정리가 중심이면 인테리어청소로 상담하시면 됩니다."],
  ["비용은 평당으로 정하나요?", "평수만으로 정하지 않습니다. 구조와 층수, 마감재, 잔여물, 필요한 인원과 장비·약품을 확인해 견적을 안내합니다."],
  ["과업지시서에 맞춰 견적을 받을 수 있나요?", "과업지시서나 청소 범위표를 보내주시면 수행 가능한 작업과 별도 확인이 필요한 조건을 검토합니다."],
  ["보양재와 접착 흔적도 제거하나요?", "제거 대상과 범위를 확인해 견적에 반영합니다. 보호재를 걷는 작업과 남은 접착 흔적 제거는 구분하며, 유지해야 하는 보호재는 임의로 제거하지 않습니다."],
  ["백시멘트나 페인트 자국도 모두 없어지나요?", "마감재와 오염의 종류, 고착 상태에 따라 결과가 다릅니다. 필요한 경우 일부 구간을 확인해 작업 가능 범위와 예상 결과를 안내합니다."],
  ["공사 폐기물도 기본으로 처리하나요?", "분진 청소와 대량 자재·폐기물 반출은 다른 작업입니다. 종류와 양, 반출 조건을 확인해 담당 범위와 비용을 정합니다."],
  ["외벽과 외부 유리도 포함되나요?", "내부 청소에 자동으로 포함되지는 않습니다. 요청 구역과 높이, 접근 조건을 확인해 별도 항목으로 검토합니다."],
  ["공사가 남아 있어도 청소할 수 있나요?", "공정과 청소 구역을 분리할 수 있는지 확인해야 합니다. 이후 재오염과 추가 방문 가능성까지 고려해 일정을 검토합니다."],
  ["여러 번 방문하는 것이 기본인가요?", "아니요. 필요한 횟수와 각 방문의 작업 범위를 정합니다. 보수공사 후 재청소가 필요한 경우에도 포함 여부와 비용을 미리 확인해 주세요."],
  ["수도와 전기가 준비되지 않아도 가능한가요?", "현장 사용 조건을 먼저 확인해야 합니다. 대체 준비와 작업 가능 여부를 검토한 뒤 안내합니다."],
  ["청소가 끝나면 하자 확인이나 준공 절차도 완료되나요?", "아니요. 청소와 전문 하자 점검, 행정 절차는 다른 업무입니다. 청소 중 확인한 이상은 안내할 수 있지만 이를 대신하는 서비스는 아닙니다."],
];

const contactChecklist = [
  "현장 주소와 건물 용도",
  "층수와 청소할 구역별 면적",
  "도면·과업지시서·청소 범위표",
  "전체 현장과 주요 잔여물 사진",
  "마감재 종류와 관리 지침",
  "보양재 제거와 폐기물 처리 요청",
  "외부·고소 구역 등 추가 항목",
  "남은 공정과 보수·반입 일정",
  "희망 작업일과 검수·인계 예정일",
  "전기·수도·장비 반입 조건",
  "필요한 계약·완료 자료",
];

const caseIds = ["new-construction-01", "new-construction-02", "new-construction-03"] as const;
const path = "/신축준공청소/";

export default function NewConstructionCompletionCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "신축준공청소",
      serviceType: "신축준공청소",
      description: "공사가 끝난 건물의 바닥·창틀 분진, 보양재와 마감 잔여물을 확인합니다. 찐청소는 실내 전용 공간과 복도·계단 등 공용부를 나눠 작업 범위를 정하고, 공정 종료와 검수·인계 일정에 맞춰 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "신축준공청소", item: absoluteUrl(path) },
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
      <section className="relative overflow-hidden px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg/newconstruction-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>신축준공청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">신축청소부터 준공청소까지, 건물 인계에 필요한 범위를 정합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>공사가 끝난 건물의 바닥·창틀 분진, 보양재와 마감 잔여물을 확인합니다. 찐청소는 실내 전용 공간과 복도·계단 등 공용부를 나눠 작업 범위를 정하고, 공정 종료와 검수·인계 일정에 맞춰 상담합니다.</ReadingParagraph>
            <ReadingParagraph>공정표에는 &lsquo;청소&rsquo; 두 글자지만, 실제 작업은 구역별로 꼼꼼하게 나누겠습니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">신축준공청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="신축준공청소 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["신축준공청소로 통합해, "]}>신축청소와 준공청소는 현장에서 겹쳐 쓰이는 표현입니다. 찐청소는 두 작업을 신축준공청소로 통합해, 공사 후 현장 상태와 실제 청소할 내용을 기준으로 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">비용은 평수나 연면적만으로 정하지 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 면적이라도 ","접근 조건이 다르면 "]}>같은 면적이라도 층수와 내부 구조, 마감재, 남은 잔여물과 접근 조건이 다르면 필요한 인원과 작업량이 달라집니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">전체 면적과 실제 청소할 면적을 구분합니다</h3>
            <ReadingParagraph className="mt-2">건물 전체를 맡기는지, 일부 층이나 특정 구역만 청소하는지 먼저 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">전용 공간만 포함한 견적과 복도·계단·화장실·주차장까지 포함한 견적은 같은 조건이 아닙니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">도면이나 구역별 면적표가 있다면 청소할 곳과 제외할 곳을 표시해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">분진 청소와 잔여물 제거는 다릅니다</h3>
            <ReadingParagraph className="mt-2">가벼운 분진이 남은 현장과 보양재·접착제·도료 자국이 많이 남은 현장은 작업량이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">시공팀이 자재와 잔여물을 정리한 뒤 시작하는지, 별도 반출 작업부터 필요한지도 구분합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">부가세, 장비 사용, 잔여물 처리, 재방문 등의 비용 포함 여부도 견적에서 함께 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 별도 확인 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">신축 상가·건물의 공사 잔여물은 모두 같은 작업인가요?</h3>
            <ReadingParagraph className="mt-2 mb-6">먼지와 가루를 정리하는 세척, 보호필름 제거, 굳은 시멘트·접착제 처리는 구분해야 합니다. 새 마감재의 상태와 제거 가능 여부를 확인하고, 대량 건축 폐기물이나 하자 보수는 별도 항목으로 정합니다. 공사가 남아 있으면 구역별 인계 순서도 협의합니다.</ReadingParagraph>
            <ReadingParagraph>신축준공청소는 구역과 마감재, 현장 상태에 맞춰 작업 범위를 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목이 모두 기본 비용에 자동으로 포함되는 것은 아닙니다. 필요한 공간과 세부 작업을 견적 단계에서 구분합니다.</ReadingParagraph>

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
              <ReadingParagraph className="font-bold text-brand-dark">일반 청소와 구분하는 작업</ReadingParagraph>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">필요한 항목이 있으면 함께 알려주세요. 수행 가능한 범위와 별도 비용을 구분해 안내합니다.</ReadingParagraph>
            </div>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 재청소 조건" />
            <ReadingParagraph>처음 정한 범위보다 작업이 늘어나거나 공정·현장 조건이 달라지면 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 보완과 추가 공사 후 재청소는 구분합니다</h3>
            <ReadingParagraph className="mt-2">처음 맡긴 청소가 미흡한 부분을 확인하는 것과, 이후 공사나 설치로 새로 생긴 분진을 제거하는 것은 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">최초 견적에 몇 차례 작업이 포함되는지, 보수공사 후 재방문이 필요한지 미리 정해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업은 내용과 비용을 확인하고 진행 범위를 정합니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="신축준공청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">여러 차례 나누어 작업할 수도 있나요?</h3>
            <ReadingParagraph className="mt-2">현장에 따라 층별·구역별 또는 일정별 분할 작업을 검토할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">다만 &lsquo;1차·2차·3차&rsquo;라는 이름보다 각 방문에서 무엇을 완료할지 정하는 것이 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">모든 현장에 여러 차례 방문이 기본으로 포함되는 것은 아닙니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 기간은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">면적, 구조, 잔여물 상태, 투입 인원과 작업 가능한 구역에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">청소뿐 아니라 준비, 장비 이동, 마무리와 검수에 필요한 시간도 고려합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">인계일과 함께 실제로 청소를 시작할 수 있는 시점을 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/완료자료 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 완료 자료" />
            <ReadingParagraph>신축준공청소 결과는 전체 공간과 세부 구역을 함께 확인하는 것이 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">새 마감재가 반짝이는지만 보지 말고, 약속한 구역의 오염과 제거 가능한 잔여물이 정리됐는지 살펴보세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진은 가능한 한 비슷한 위치와 조명에서 비교하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">완료 사진이나 작업 내역 등 자료가 필요하면 촬영할 구역과 제출 형식을 계약 전에 알려주세요. 제공 가능한 범위와 방식을 확인해 안내합니다.</ReadingParagraph>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 공사 일정 조율" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">신축준공청소는 공사 종료 예정일뿐 아니라 실제로 남아 있는 작업을 기준으로 일정을 검토합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">일정 전에 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">완료 검수를 위한 청소와 최종 사용 전 청소가 같은 일정인지도 함께 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">공사와 청소가 겹친다면 구역을 나눕니다</h3>
            <ReadingParagraph className="mt-2">같은 구역에서 공사와 청소가 동시에 진행되면 동선이 복잡해지고 다시 오염될 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 공간을 분리할 수 있는지, 청소한 구역을 보호할 수 있는지 확인해 순서를 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">분리가 어렵다면 일정 조정이나 별도 마무리 작업이 필요한지 검토합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 작업 항목이 검수 기준입니다</h3>
            <ReadingParagraph className="mt-2">전용 공간과 공용부, 유리 면, 수납장 내부, 보양재 제거 등 포함된 항목을 기준으로 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">남겨두기로 한 보호재와 제외한 구역도 함께 구분합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 미흡과 마감 손상은 다릅니다</h3>
            <ReadingParagraph className="mt-2">남은 분진이나 제거 가능한 오염과 흠집·변색·들뜸·파손은 구분해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">청소로 다룰 부분과 시공팀이 확인할 부분을 나누어 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳은 층, 공간명, 위치와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 계약 전에 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 완료와 공사 승인은 별개입니다</h3>
            <ReadingParagraph className="mt-2">신축준공청소는 합의한 구역의 오염과 잔여물을 정리하는 서비스입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">전문 하자 점검, 설비 성능 확인, 사용승인 등 행정 절차를 대신하거나 그 결과를 보장하지 않습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="신축준공청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">시공팀과 청소팀이 같은 범위표를 보고 이야기하면, &lsquo;이것도 포함인 줄 알았는데요&rsquo;라는 혼선을 줄일 수 있습니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">신축준공청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">연면적과 완료 희망일뿐 아니라, 지금 공사가 어디까지 끝났는지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">분진 정리만 남았는지, 보양재와 마감 잔여물까지 처리해야 하는지, 여러 층을 나누어 인계해야 하는지에 따라 준비가 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>신축준공청소 견적 문의하기 →</CtaButton>
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
