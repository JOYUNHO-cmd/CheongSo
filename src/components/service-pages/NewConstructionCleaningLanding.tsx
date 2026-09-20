import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, CaseFigure, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["safety", "사용 약품 안전성"],
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
  ["청소 대상", "신축 주택·상가·사무실·건물 등의 요청 구역"],
  ["주요 확인", "공사 분진, 마감 잔여물, 보양재와 부착물"],
  ["범위 구분", "내부 공간, 공용부, 외부 유리·외벽, 잔여물 처리"],
  ["견적 기준", "필요한 인원, 장비·약품, 구조와 실제 작업량"],
  ["일정 조율", "공정 종료, 보수, 집기 반입과 인계 일정 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소 면적과 층수",
  "내부 공간과 공용부의 구성",
  "창문·수납장·화장실 등의 수량",
  "바닥과 벽면 등 마감재 종류",
  "공사 분진과 잔여물의 상태",
  "보양재·접착제 등 제거 요청",
  "필요한 인원과 장비·약품",
  "외부·고소 작업의 필요 여부",
  "급수·전원·장비 반입 조건",
  "작업 횟수와 확보 가능한 일정",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥과 모서리",
    body: "바닥 재질과 마감 상태를 확인해 분진과 제거 가능한 오염을 청소합니다. 가장자리와 문 주변, 모서리 등 먼지가 남기 쉬운 구간도 살펴봅니다.",
    note: "표면에 붙은 접착제·도료·시멘트계 잔여물은 일반 분진과 구분해 작업 가능 여부를 확인합니다.",
    photoPairs: [["newc-floor-01.webp", "newc-floor-02.webp"], ["newc-floor-03.webp", "newc-floor-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀의 먼지와 마감 잔여물, 요청한 유리 면의 오염을 확인합니다. 내부와 외부 중 어느 면을 청소할지, 창호 탈거가 필요한지, 접근이 가능한지 등을 구분합니다.",
    note: "유리의 보호필름과 스티커도 제거 대상인지 먼저 확인합니다. 외부 고소작업은 별도 검토가 필요합니다.",
    photoPairs: [["newc-window-01.webp", "newc-window-02.webp"], ["newc-window-03.webp", "newc-window-04.webp"]],
  },
  {
    title: "문·몰딩·수납 공간",
    body: "문과 문틀, 몰딩, 붙박이 수납 공간 등 요청 부위의 먼지와 오염을 확인합니다. 수납장 내부와 서랍·선반 탈거는 구조와 상태에 따라 작업 범위를 정합니다.",
    note: "새로 설치된 자재의 관리 지침이나 탈거 제한이 있다면 작업 전에 알려주세요.",
    photoPairs: [["newc-door-01.webp", "newc-door-02.webp"], ["newc-door-03.webp", "newc-door-04.webp"]],
  },
  {
    title: "화장실과 세면 공간",
    body: "바닥, 벽면, 세면대, 변기 등 요청 구역의 공사 먼지와 표면 오염을 확인합니다. 시공된 줄눈·실리콘과 제거할 잔여물을 구분해 살펴보며, 정상적인 마감재를 청소 대상으로 오인하지 않도록 주의할 부분을 시공 담당자와 확인합니다.",
    note: "배관 내부 작업, 누수 수리, 마감 보수는 일반 청소와 별도입니다.",
    photoPairs: [["newc-bathroom-01.webp", "newc-bathroom-02.webp"], ["newc-bathroom-03.webp", "newc-bathroom-04.webp"]],
  },
  {
    title: "계단·복도·출입구 등 공용부",
    body: "공용부가 포함된다면 층별 복도, 계단, 난간, 출입구 등의 작업 항목을 나누어 정합니다.",
    note: "전용 공간만 청소하는지, 공용부까지 포함하는지 견적 단계에서 명확히 확인합니다.",
    photoPairs: [["newc-common-01.webp", "newc-common-02.webp"], ["newc-common-03.webp", "newc-common-04.webp"]],
  },
  {
    title: "보양재와 보호필름",
    body: "보양지, 테이프, 보호필름 등은 위치와 재질, 제거 시점을 먼저 확인합니다.",
    note: "공사가 남아 있어 유지해야 하는 보호재나 시공팀 확인이 필요한 부착물은 임의로 제거하지 않습니다. 보양재 제거와 제거 후 남은 접착 흔적 청소는 작업량이 다를 수 있어 구분해서 안내합니다.",
    photoPairs: [["newc-protect-01.webp", "newc-protect-02.webp"], ["newc-protect-03.webp", "newc-protect-04.webp"]],
  },
  {
    title: "마감 잔여물과 특수 오염",
    body: "접착제, 도료 자국, 백시멘트 등으로 보이는 잔여물은 마감재와 오염의 종류를 확인합니다. 필요한 경우 일부 구간을 먼저 확인해 작업 방법과 예상 결과를 판단합니다.",
    note: "모든 잔여물이 손상 없이 완전히 제거된다고 일괄 안내하지는 않습니다.",
    photoPairs: [["newc-residue-01.webp", "newc-residue-02.webp"], ["newc-residue-03.webp", "newc-residue-04.webp"]],
  },
  {
    title: "외벽·외부 유리·주차장",
    body: "건물 내부 청소에 외벽, 외부 유리, 주차장까지 자동으로 포함되는 것은 아닙니다. 필요한 면적과 높이, 접근 조건, 오염 상태를 확인해 별도 항목으로 검토합니다.",
    photoPairs: [["newc-exterior-01.webp", "newc-exterior-02.webp"], ["newc-exterior-03.webp"]],
  },
];

const separateScopeItems = [
  "공사 자재 이동과 대량 폐기물 반출·처리",
  "설비 내부·분해 세척",
  "외부·고소 구역 작업",
  "바닥 코팅과 별도 표면 시공",
  "도장·줄눈·실리콘 등의 보수",
  "유리·타일·패널 등 자재 교체",
  "전문 하자 점검",
  "새집증후군 관련 별도 서비스",
];

const extraCostItems = [
  "청소할 층이나 공간이 추가되는 경우",
  "공사 분진과 잔여물이 예상보다 많이 남은 경우",
  "보양재 제거와 접착 흔적 청소가 추가되는 경우",
  "외벽·외부 유리·주차장 등을 추가하는 경우",
  "별도 장비나 접근 방법이 필요한 경우",
  "자재와 집기로 인해 작업 동선이 달라지는 경우",
  "공정 변경으로 방문을 나누어야 하는 경우",
  "청소 후 추가 공사로 재청소가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["공정과 현장 상태 확인", "주소, 건물 용도, 면적, 층수, 마감재와 남은 공정을 확인합니다. 청소를 마쳐야 하는 날짜와 집기 반입·인계 예정일도 함께 살펴봅니다."],
  ["구역별 범위와 견적 안내", "내부 공간, 공용부, 외부 구역을 나누고 보양재·잔여물 처리 요청을 확인합니다. 필요한 인원과 장비·약품, 작업 횟수를 검토해 견적을 안내합니다."],
  ["시공팀과 작업 조건 조율", "청소할 수 있는 구역과 공사가 진행 중인 구역을 구분합니다. 제거할 보양재, 남겨야 할 보호필름, 자재의 양생·관리 조건 등을 시공 담당자와 확인합니다."],
  ["구역별 청소 진행", "합의한 범위에 따라 작업합니다. 사전에 확인되지 않은 잔여물이나 마감 손상, 작업 제한이 발견되면 해당 구역의 진행 범위를 확인합니다."],
  ["마무리와 결과 확인", "요청한 구역과 주요 오염 부위를 검수합니다. 청소로 정리된 부분과 시공팀의 보수·확인이 필요한 부분을 구분해 안내합니다."],
];

const caseChecklist = [
  "창틀과 모서리의 공사 분진",
  "바닥 가장자리와 문 주변",
  "청소 범위에 포함된 수납장 내부",
  "화장실과 세면 공간의 잔여물",
  "제거 대상으로 정한 보양재와 접착 흔적",
  "계단과 복도 등 공용부",
  "처음 집중 작업을 요청한 구간",
];

const reservationChecklist = [
  "분진이 발생하는 공정의 종료",
  "도장·줄눈 등 마감재별 작업 가능 시점",
  "보수와 재시공 일정",
  "자재 정리와 잔여물 반출",
  "가구·설비 설치와 반입",
  "청소와 검수",
  "사용 시작과 인계 예정일",
];

const prepItems = [
  "청소할 층과 구역을 구분해 주세요.",
  "도면이나 청소 범위표가 있다면 전달해 주세요.",
  "남아 있는 공정과 보수 일정을 알려주세요.",
  "제거할 보양재와 유지할 보호재를 표시해 주세요.",
  "자재별 관리 지침과 작업 가능 시점을 확인해 주세요.",
  "남은 자재와 폐기물의 처리 담당을 정해 주세요.",
  "기존 파손·누수·들뜸 등 이상 부위를 알려주세요.",
  "전기·수도 사용 가능 여부를 확인해 주세요.",
  "세척수 관리와 장비 반입 조건을 알려주세요.",
  "승강기·주차·출입 조건을 확인해 주세요.",
  "검수 담당자와 인계 예정일을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["신축청소와 준공청소는 다른가요?", "두 표현은 현장에서 겹쳐 쓰이기도 합니다. 이 페이지에서는 새로 지은 건물의 공사 후 분진과 잔여물을 정리하는 청소를 안내합니다. 명칭보다 건물 상태와 실제 작업 범위를 확인하는 것이 중요합니다."],
  ["신축 아파트 한 세대도 상담할 수 있나요?", "주소와 구조, 오염 상태를 알려주시면 상담할 수 있습니다. 한 세대의 입주 전 청소인지, 건물 공용부까지 포함한 작업인지 구분해 안내합니다."],
  ["신축청소 비용은 평당으로 정하나요?", "평수만으로 정하지 않습니다. 공간 구성과 층수, 마감재, 잔여물 상태, 필요한 인원과 장비·약품을 확인해 견적을 안내합니다."],
  ["보양지와 보호필름도 제거하나요?", "제거 대상과 범위, 시점을 확인한 뒤 견적에 반영합니다. 유지해야 하는 보호재나 시공팀 확인이 필요한 부착물은 임의로 제거하지 않습니다."],
  ["백시멘트나 페인트 자국도 모두 없어지나요?", "마감재와 오염의 종류, 고착 상태에 따라 결과가 다릅니다. 필요한 경우 일부 구간을 확인해 작업 방법과 예상 결과를 안내합니다."],
  ["공사 폐기물도 기본으로 처리하나요?", "분진 청소와 자재·폐기물 반출은 다른 작업입니다. 종류와 양, 반출 조건을 확인해 포함 여부와 별도 대응 범위를 정합니다."],
  ["외벽과 외부 유리도 포함되나요?", "내부 청소에 자동으로 포함되지 않습니다. 청소할 면적과 높이, 접근 조건을 확인해 별도 항목으로 검토합니다."],
  ["공사가 조금 남아 있어도 가능한가요?", "남은 공정과 청소 구역을 분리할 수 있는지 확인해야 합니다. 청소 후 재오염 가능성과 추가 방문 필요 여부를 함께 검토합니다."],
  ["수도와 전기가 아직 연결되지 않았는데 가능한가요?", "현장 사용 조건을 먼저 확인해야 합니다. 대체 준비가 필요한지, 해당 상태에서 작업할 수 있는지 검토한 뒤 안내합니다."],
  ["청소를 하면 새집증후군 문제도 해결되나요?", "일반 신축청소와 별도 서비스는 구분합니다. 분진과 표면 오염을 청소하는 것만으로 유해물질 제거 효과나 건강상 결과를 보장하지 않습니다."],
  ["하자 확인과 준공 관련 업무도 포함되나요?", "청소와 전문 하자 점검, 행정 절차는 다른 업무입니다. 청소 중 확인한 이상은 안내할 수 있지만 이를 대신하는 서비스는 아닙니다."],
  ["청소 후 보수공사를 하면 다시 청소해 주나요?", "추가 공사로 생긴 오염의 재청소는 최초 작업의 미흡한 부분과 구분합니다. 재방문 포함 여부와 비용은 일정·계약 단계에서 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 건물 용도",
  "면적과 층수, 청소할 구역",
  "도면 또는 청소 범위표",
  "전체 공간과 주요 잔여물 사진",
  "마감재 종류와 관리 지침",
  "보양재 제거와 폐기물 처리 요청",
  "외벽·외부 유리 등 추가 요청",
  "남은 공정과 보수 일정",
  "희망 청소일과 사용·인계 예정일",
  "전기·수도·장비 반입 조건",
];

const caseIds = ["new-construction-01", "new-construction-02", "new-construction-03"] as const;
const path = "/신축청소/";

export default function NewConstructionCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "신축청소",
      serviceType: "신축청소",
      description: "찐청소 신축청소의 비용과 작업 범위를 안내합니다. 공사 분진·마감 잔여물·보양재의 상태를 확인하고, 건물 내부와 공용부 등 요청 구역을 공사·인계 일정에 맞춰 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "신축청소", item: absoluteUrl(path) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />

      {/* 히어로 */}
      <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>신축청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">신축청소, 공사가 끝난 공간을 사용할 준비로</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>새로 지은 건물이라고 바로 사용할 준비까지 끝난 것은 아닙니다.</p>
            <p>창틀과 모서리에 남은 공사 분진, 바닥에 붙은 마감 잔여물, 제거할 시기를 확인해야 하는 보양재까지.</p>
            <p>찐청소는 신축 건물의 공사 상태와 마감재, 청소할 구역을 확인해 작업 범위와 비용을 안내합니다.</p>
            <p>새 건물의 첫인상은 살리고, 남은 공사의 흔적은 현장에 맞게 정리하겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">신축청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[190px_1fr]">
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <TocSidebar toc={toc} />

        <div className="space-y-14 text-[17px] leading-8 text-gray-800">
          {/* 핵심 정보 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>
            <QuickFactsTable facts={quickFacts} />
          </section>

          {/* 약품 안전성 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">사용하는 약품, 인체에 안전한가요?</h2>
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 공사가 끝난 공간에서 바로 생활이나 영업을 시작하시는 경우도 많아 저희도 이 부분을 가장 신경 씁니다.</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">VOC(휘발성유기화합물) 성분 불검출</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">눈·피부 자극 없음 (자극물질 아님)</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">경구·경피 노출 시 독성 없음</li>
              <li className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">흡입 노출 시 독성 없음</li>
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-xl border border-gray-200">
                <Image src="/images/safety/safety-voc-report.webp" alt="VOC 실험 결과 증빙자료" width={933} height={1245} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
                <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">VOC 실험 결과 (PACE Inc.)</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-xl border border-gray-200">
                <Image src="/images/safety/safety-toxicity-report.webp" alt="무독성 실험 결과 증빙자료" width={1905} height={1200} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
                <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">무독성 실험 결과 (Tox Monitor/BSR, Inc.)</figcaption>
              </figure>
            </div>
            <p className="mt-4 text-[15px] text-gray-500">제품마다 적용 시험 항목은 다를 수 있으며, 현장 상황에 맞는 제품과 사용량은 상담 시 안내합니다.</p>
          </section>

          {/* 1. 비용/견적 */}
          <section id="estimate" className="scroll-mt-36">
            <SectionTitle id="estimate-title" kicker="01" title="신축청소 비용과 견적 산정 기준" />
            <p>신축청소 비용은 건물 면적만으로 정하기 어렵습니다.</p>
            <p className="mt-4">같은 면적이라도 층수와 공간 구성, 창문과 수납장의 수, 마감재 종류, 남아 있는 공사 잔여물에 따라 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업할 내용을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">넓이와 함께 공간 구성을 확인합니다</h3>
            <p className="mt-2">넓게 트인 공간과 작은 실이 여러 개로 나뉜 공간은 작업 동선이 다릅니다.</p>
            <p className="mt-2">여러 층을 오가야 하는지, 화장실과 계단이 얼마나 있는지, 높은 곳이나 외부 작업이 필요한지도 비용에 영향을 줍니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">건물 전체 면적과 함께 청소할 층과 구역을 알려주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">공사가 얼마나 정리된 상태인지도 중요합니다</h3>
            <p className="mt-2">가벼운 분진이 남은 현장과 자재·보양재·마감 잔여물이 함께 남은 현장은 필요한 작업이 다릅니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">공사 잔여물 정리부터 필요한지, 시공팀이 정리한 뒤 세부 청소를 진행하는지 먼저 구분합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 범위표나 도면이 있다면 함께 보내주세요. 현장 사진과 함께 검토하면 구역별 견적을 정리하기 좋습니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 별도 확인 항목" />
            <p>신축청소는 건물 전체 또는 요청하신 구역을 기준으로 범위를 정합니다.</p>
            <p className="mt-4">아래는 상담 시 검토하는 항목입니다. 모든 구역과 제거 작업이 기본 비용에 자동으로 포함되는 것은 아닙니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                  {item.photoPairs && (
                    <div className="mt-4 grid items-start gap-3 sm:grid-cols-2">
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
              <p className="font-bold text-brand-dark">청소와 구분하는 작업</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">필요한 작업이 있다면 요청 범위와 수행 가능 여부를 구분해 안내합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <p>처음 정한 범위보다 작업이 늘어나거나 현장 조건이 달라지면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">재방문과 재청소가 최초 견적에 포함되는지 미리 확인해 주세요.</p>
            <p className="mt-4 text-[15px] text-gray-500">공사 잔여물을 누가 정리하고 어디까지 처리할지도 작업 전에 정하는 것이 좋습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="신축청소 진행 순서와 소요 시간" />
            <ol className="mt-4 space-y-4">
              {processSteps.map(([title, body], i) => (
                <li key={title} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light font-black text-brand-dark">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-brand-dark">{title}</h3>
                    <p className="mt-1">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 시간과 횟수는 어떻게 정하나요?</h3>
            <p className="mt-2">면적, 공간 구성, 오염 상태, 투입 인원과 공정 일정에 따라 달라집니다.</p>
            <p className="mt-2">한 번에 마무리할 수 있는 현장인지, 층별·구역별로 나누어야 하는 현장인지 확인해 작업 횟수를 정합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">모든 신축 현장에 같은 작업 시간이나 여러 차례 방문을 일괄 적용하지는 않습니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>신축청소 결과는 넓은 공간의 전체 모습과 세부 구역을 함께 살펴보는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">새 마감재의 광택만으로 청소 결과를 판단하지 않습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">약속한 구역의 분진과 제거 가능한 잔여물이 정리됐는지, 보수할 부분과 구분됐는지를 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진이나 완료 자료가 필요하면 촬영 구역과 제출 형식, 제공 가능 범위를 상담 시 확인해 주세요.</p>

            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 공사 일정 조율" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">신축청소는 공사 종료일뿐 아니라 실제로 어느 작업이 남아 있는지 파악하는 것이 중요합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">함께 확인할 일정</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5">완료 검수를 위한 청소와 최종 사용 전 청소가 같은 일정인지도 확인해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">청소 후 추가 공사가 예정되어 있다면 구역을 나누거나 별도 마무리 청소가 필요한지 검토할 수 있습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">공사와 청소를 동시에 진행해야 한다면</h3>
            <p className="mt-2">진행 중인 공정과 청소 구역을 분리할 수 있는지 확인해야 합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">작업자가 계속 드나들거나 분진이 발생하는 공간은 청소 후 다시 오염될 수 있습니다. 공정별 동선과 책임 범위를 먼저 맞추는 것이 좋습니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">견적에 포함된 구역과 항목을 확인합니다</h3>
            <p className="mt-2">전용 공간과 공용부, 보양재 제거, 별도 요청 구역 등 약속한 범위를 기준으로 검수합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">남겨두기로 한 보호재와 제외한 작업도 함께 구분합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 하자 점검은 다릅니다</h3>
            <p className="mt-2">흠집, 파손, 들뜸, 누수, 마감 불량은 청소로 해결하는 작업이 아닙니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">청소 중 확인된 이상은 안내할 수 있지만 전문 하자 점검을 대신하거나 모든 하자를 발견한다고 보장하지는 않습니다. 청소 완료가 건물의 사용승인이나 시공 품질을 보증하는 것도 아닙니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 작업과 재오염은 구분합니다</h3>
            <p className="mt-2">작업 당시 미흡했던 부분과 청소 후 공사·설치·자재 이동으로 다시 생긴 오염은 구분해야 합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">추가 확인이 필요한 곳은 해당 구역과 상태, 확인 시점을 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">인계 전 확인 시간을 확보해 주세요</h3>
            <p className="mt-2">사용이나 반입이 시작되기 전에 주요 구역을 함께 살펴보면 청소 결과를 확인하기 쉽습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">완료 확인 담당자와 연락 방법을 미리 정해 주시면 검수가 수월합니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="신축청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 전에 어디까지 시공팀이 정리하고, 어디부터 청소팀이 맡을지 정해두면 현장 진행이 한결 명확해집니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="자주 묻는 질문" />
            <div className="space-y-3">
              {faqItems.map(([q, a]) => (
                <details key={q} className="rounded-xl border border-gray-200 p-4">
                  <summary className="cursor-pointer font-bold text-[16.5px]">{q}</summary>
                  <p className="mt-3">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 10. 문의 CTA */}
          <section id="contact" className="scroll-mt-36">
            <div className="rounded-2xl bg-brand-dark p-7 text-white">
              <p className="text-xl font-bold">신축청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 지금 공사가 어디까지 끝났는지 알려주세요.</p>
              <p className="mt-2 text-white/80">분진 정리만 남은 현장인지, 보양재와 마감 잔여물까지 처리해야 하는지, 여러 층을 나누어 진행해야 하는지에 따라 준비가 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>신축청소 견적 문의하기 →</CtaButton>
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
