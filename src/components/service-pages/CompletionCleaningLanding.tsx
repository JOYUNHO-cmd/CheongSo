import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["safety", "사용 약품 안전성"],
  ["estimate", "비용·견적 기준"],
  ["scope", "구역별 범위·제외 항목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "신축·증축·리모델링 등 공사 후 공간"],
  ["주요 확인", "공사 분진, 보양재, 접착 흔적과 마감 잔여물"],
  ["작업 구역", "전용 공간·공용부·외부 구역 중 합의한 범위"],
  ["견적 기준", "필요한 인원, 장비·약품, 실제 작업량과 방문 횟수"],
  ["일정 조율", "공정 종료, 보수, 집기 반입, 검수·인계 일정 반영"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 층과 구역별 면적",
  "방·화장실·창문·수납 공간 등의 구성",
  "바닥과 벽면 등 마감재 종류",
  "분진과 마감 잔여물의 상태",
  "보양재 제거와 접착 흔적 처리 범위",
  "높은 곳과 외부 구역의 접근 조건",
  "필요한 인원과 장비·약품",
  "장비 반입, 급수·전원과 세척수 관리 조건",
  "작업 횟수와 확보 가능한 일정",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "바닥과 가장자리",
    body: "바닥의 재질과 마감 상태를 확인해 분진과 제거 가능한 오염을 청소합니다. 문 주변, 벽 쪽 가장자리와 모서리 등 먼지가 남기 쉬운 곳도 작업 범위에 따라 살펴봅니다.",
    note: "바닥 세척과 코팅·연마·도장 보수는 별도 작업입니다.",
  },
  {
    title: "창호와 유리",
    body: "창틀, 프레임, 작업 대상으로 정한 유리 면의 분진과 오염을 확인합니다. 내부와 외부 중 어느 면인지, 탈거가 필요한지, 접근할 수 있는지를 구분합니다.",
    note: "창호의 라벨과 보호필름은 제거 대상인지 확인한 뒤 범위를 정합니다. 외부 고소작업은 별도 검토가 필요합니다.",
  },
  {
    title: "문·몰딩·수납 공간",
    body: "문과 문틀, 몰딩, 수납장 등 요청 부위의 먼지와 잔여물을 확인합니다. 수납장 내부, 서랍과 선반의 탈거는 구조와 상태에 따라 가능 여부를 정합니다.",
    note: "새로 설치한 자재의 관리 지침이나 취급 제한이 있다면 사전에 전달해 주세요.",
  },
  {
    title: "화장실과 세면 공간",
    body: "바닥, 벽면, 세면대, 변기 등 합의한 구역의 분진과 표면 오염을 확인합니다. 시공된 줄눈·실리콘과 제거할 잔여물을 구분하며, 정상 마감재를 임의로 제거하거나 보수 작업까지 청소로 처리하지 않습니다.",
    note: "설비 내부 작업과 배관 막힘 해결, 누수 수리는 별도입니다.",
  },
  {
    title: "복도·계단·출입구 등 공용부",
    body: "층별 복도, 계단, 난간, 출입구 등 포함할 공간을 나누어 정합니다. 여러 시공팀이 오가는 현장이라면 청소 완료 구역과 작업 중인 구역의 동선도 함께 확인합니다.",
    note: "승강기는 작업 가능 부위와 관리주체의 조건을 별도로 확인합니다.",
  },
  {
    title: "보양재와 마감 잔여물",
    body: "보양지, 테이프, 보호필름 등은 제거할 대상과 시점을 먼저 확인합니다. 보양재를 걷어내는 작업과 남은 접착 흔적을 제거하는 작업은 구분합니다.",
    note: "도료·접착제·시멘트계 잔여물 등은 마감재와 오염 상태를 확인하고, 필요한 경우 일부 구간을 먼저 살펴 작업 방법과 예상 결과를 판단합니다.",
  },
  {
    title: "외부 구역과 높은 곳",
    body: "외벽, 외부 유리, 주차장, 높은 구조물 등은 내부 공간과 별도 항목으로 검토합니다.",
    note: "면적과 높이, 장비 진입과 접근 조건을 확인해 수행 가능 여부와 견적을 안내합니다.",
  },
];

const separateScopeItems = [
  "자재 이동과 대량 폐기물 반출·처리",
  "설비 내부·분해 세척",
  "도장·줄눈·실리콘 등 마감 보수",
  "바닥 코팅과 별도 표면 시공",
  "유리·타일·패널 등의 교체",
  "전문 하자 점검과 행정 절차",
  "별도 소독·방역·냄새 처리",
];

const extraCostItems = [
  "청소할 층이나 면적이 추가되는 경우",
  "예상보다 많은 잔여물이 남아 있는 경우",
  "보양재 제거와 특수 오염 제거가 추가되는 경우",
  "외부·고소 구역을 추가하는 경우",
  "자재와 집기로 인해 접근 조건이 달라지는 경우",
  "공정 변경으로 작업을 나누어야 하는 경우",
  "짧은 시간 안에 마치기 위해 인원 구성이 달라지는 경우",
  "추가 공사 후 재청소가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["과업 범위와 현장 확인", "주소, 건물 용도, 층수, 면적, 공사 내용과 잔여물 상태를 확인합니다. 도면, 과업지시서, 청소 범위표가 있다면 함께 검토합니다."],
  ["작업 항목과 견적 정리", "전용 공간과 공용부, 내부와 외부를 구분합니다. 보양재 제거, 폐기물 처리, 별도 세척 항목의 담당 범위도 확인해 견적에 반영합니다."],
  ["공정과 투입 일정 조율", "남은 공사, 보수, 설비·가구 반입과 인계 일정을 확인합니다. 작업 가능한 구역부터 진행할지, 공정이 끝난 뒤 한 번에 진행할지 검토합니다."],
  ["구역별 청소", "합의한 범위에 따라 작업합니다. 마감재 상태를 살펴 진행하고, 기존 손상이나 예상하지 못한 잔여물이 확인되면 해당 구역의 작업 범위를 다시 확인합니다."],
  ["완료 검수와 인계 준비", "계약에 포함된 구역과 항목을 확인합니다. 청소 결과와 시공팀의 보수·확인이 필요한 사항을 나누고, 추가 작업이 필요한 경우에는 범위와 일정을 정리합니다."],
];

const caseChecklist = [
  "바닥과 가장자리의 공사 분진",
  "창틀과 프레임의 잔여물",
  "합의한 유리 면의 오염",
  "수납 공간과 문 주변",
  "화장실과 공용부",
  "보양재 제거 대상 구역",
  "처음 집중 청소를 요청한 부분",
];

const reservationChecklist = [
  "분진이 발생하는 공정이 끝났는지",
  "마감재별 작업 가능 시점이 확인됐는지",
  "남은 자재와 폐기물이 정리되는지",
  "보양재 제거 승인이 필요한지",
  "보수·재시공 일정이 있는지",
  "설비·가구·상품 반입이 예정되어 있는지",
  "전기와 수도를 사용할 수 있는지",
  "검수 담당자와 인계일이 정해졌는지",
];

const prepItems = [
  "청소할 층과 구역을 도면 등에 표시해 주세요.",
  "포함·제외 항목과 인계 기준을 정해 주세요.",
  "공정 종료와 보수 일정을 공유해 주세요.",
  "제거할 보양재와 유지할 보호재를 구분해 주세요.",
  "자재의 관리 지침과 작업 가능 시점을 알려주세요.",
  "기존 파손·누수·들뜸 등을 전달해 주세요.",
  "자재와 폐기물 정리 담당을 정해 주세요.",
  "전기·수도와 세척수 관리 조건을 확인해 주세요.",
  "승강기·주차·장비 반입 조건을 알려주세요.",
  "작업 중 다른 시공팀의 출입을 조율해 주세요.",
  "범위 변경을 협의할 현장 담당자를 정해 주세요.",
  "완료 자료와 검수 일정을 미리 알려주세요.",
];

const faqItems: [string, string][] = [
  ["준공청소와 신축청소는 어떻게 다른가요?", "두 표현은 현장에서 겹쳐 쓰입니다. 찐청소의 준공청소 안내는 신축뿐 아니라 증축·리모델링 등 공사 후 현장의 청소와 인계 준비를 다룹니다. 명칭보다 공사 내용과 작업 범위를 확인하는 것이 중요합니다."],
  ["일부 층이나 공용부만 맡길 수 있나요?", "필요한 구역을 지정해 상담할 수 있습니다. 도면이나 구역별 사진을 보내주시면 범위를 정하는 데 도움이 됩니다."],
  ["준공청소 비용은 평당으로 정하나요?", "평수만으로 정하지 않습니다. 층수와 구조, 마감재, 잔여물 상태, 필요한 인원과 장비·약품을 기준으로 견적을 안내합니다."],
  ["과업지시서에 맞춰 견적을 받을 수 있나요?", "과업지시서나 청소 범위표를 보내주시면 수행 가능한 내용과 별도 확인이 필요한 조건을 검토합니다."],
  ["보양재와 접착 흔적도 제거하나요?", "제거 대상과 범위를 확인해 견적에 반영합니다. 보호재를 걷는 작업과 접착 흔적 제거는 구분하며, 유지해야 하는 보호재는 임의로 제거하지 않습니다."],
  ["공사 폐기물 처리도 포함되나요?", "청소와 대량 자재·폐기물 반출은 구분합니다. 종류와 양, 반출 조건을 확인해 담당 범위와 비용을 별도로 정합니다."],
  ["공사가 남아 있어도 청소할 수 있나요?", "공정과 청소 구역을 분리할 수 있는지 확인해야 합니다. 이후 재오염과 추가 방문 가능성까지 고려해 일정을 검토합니다."],
  ["여러 번 방문하는 것이 기본인가요?", "아니요. 현장에 필요한 횟수와 각 방문의 작업 범위를 정합니다. 분할 작업이나 재방문이 필요하면 견적에 포함 여부를 명시합니다."],
  ["수도와 전기가 준비되지 않아도 가능한가요?", "현장 조건을 먼저 확인해야 합니다. 대체 준비와 작업 가능 여부를 검토한 뒤 안내합니다."],
  ["외벽과 외부 유리도 맡길 수 있나요?", "별도 요청 항목으로 검토합니다. 면적과 높이, 접근 조건을 확인해 수행 가능 여부와 비용을 안내합니다."],
  ["청소 후 보수공사를 하면 재청소도 해주나요?", "보수공사로 새로 생긴 오염은 최초 작업의 미흡한 부분과 구분합니다. 재청소가 필요한 일정이라면 계약 전에 포함 범위와 비용을 확인해 주세요."],
  ["준공청소를 마치면 하자 확인도 끝난 건가요?", "아니요. 청소와 전문 하자 점검은 다릅니다. 청소 중 확인한 이상은 안내할 수 있지만 시공 품질이나 모든 하자의 발견을 보장하지는 않습니다."],
];

const contactChecklist = [
  "현장 주소와 건물 용도",
  "공사 유형과 진행 상태",
  "층수와 청소할 구역별 면적",
  "도면·과업지시서·청소 범위표",
  "전체 현장과 주요 잔여물 사진",
  "보양재 제거와 폐기물 처리 요청",
  "외부·고소 구역 등 추가 항목",
  "보수·설치·집기 반입 일정",
  "희망 작업일과 검수·인계 예정일",
  "전기·수도·장비 반입 조건",
  "필요한 계약·완료 자료",
];

const path = "/준공청소/";

export default function CompletionCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "준공청소",
      serviceType: "준공청소",
      description: "찐청소 준공청소의 비용과 작업 범위를 안내합니다. 공사 분진·보양재·마감 잔여물을 확인하고, 전용 공간과 공용부의 청소를 공정 종료·검수·인계 일정에 맞춰 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "준공청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>준공청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">준공청소, 공사 마무리부터 공간 인계까지</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>공사는 마무리됐는데 창틀에는 분진이 남아 있고, 보양재를 걷어낸 바닥에는 접착 흔적이 보이고, 인계 날짜는 다가오는데 청소할 구역은 아직 정리되지 않았다면.</p>
            <p>청소 범위와 작업 순서부터 맞출 때입니다.</p>
            <p>찐청소는 신축·증축·리모델링 등 공사 후 현장의 상태를 확인하고, 필요한 인원과 장비·약품을 기준으로 준공청소 견적을 안내합니다.</p>
            <p>어느 구역을 언제 청소할지, 어디까지 시공팀이 정리하고 청소팀이 맡을지, 완료 후 무엇을 확인할지부터 분명하게 정하겠습니다.</p>
            <p>공정표의 마지막 칸에 &lsquo;청소&rsquo; 두 글자만 남기기에는, 확인할 일이 제법 있으니까요.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">준공청소 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 공사가 끝난 공간에서 바로 사용을 시작하시는 경우도 많아 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="준공청소 비용과 견적 산정 기준" />
            <p>준공청소 비용은 연면적이나 평수만으로 정하기 어렵습니다.</p>
            <p className="mt-4">같은 면적이라도 내부 구조, 층수, 마감재, 남은 잔여물과 접근 조건이 다르면 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 현장에 필요한 인원과 장비·약품을 중심으로 견적을 산정합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">전체 면적과 실제 작업 면적을 구분합니다</h3>
            <p className="mt-2">건물 전체를 청소하는지, 일부 층이나 특정 구역만 맡기는지 먼저 확인합니다.</p>
            <p className="mt-2">전용 공간만 포함하는 견적과 복도·계단·화장실·주차장까지 포함하는 견적은 같은 조건이 아닙니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">도면이나 구역별 면적표가 있다면 청소할 곳과 제외할 곳을 표시해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">분진 청소와 잔여물 제거는 작업량이 다릅니다</h3>
            <p className="mt-2">가벼운 분진을 정리하는 현장과 보양재·접착 흔적·도료 자국이 많이 남은 현장은 필요한 작업이 다릅니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">자재와 폐기물이 정리된 상태에서 시작하는지, 별도 반출 작업이 필요한지도 구분합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">부가세, 장비 사용, 잔여물 처리, 재방문 등의 비용 포함 여부도 견적에서 함께 확인해 주세요.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="구역별 청소 범위와 제외 항목" />
            <p>준공청소는 공사한 공간을 무조건 전부 같은 방식으로 청소하는 서비스가 아닙니다.</p>
            <p className="mt-4">구역과 마감재, 현장 상태에 맞춰 작업 항목을 정합니다. 아래 내용은 상담 시 검토하는 범위이며, 모두 자동으로 포함되는 것은 아닙니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                  {item.note && <p className="mt-2 text-[15px] text-gray-500">{item.note}</p>}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <p className="font-bold text-brand-dark">일반 청소와 구분할 항목</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">필요한 서비스가 있다면 요청 내용을 확인해 가능 여부와 비용을 구분합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 재청소 조건" />
            <p>준공청소에서는 처음 정한 범위뿐 아니라 공정 변경도 비용에 영향을 줄 수 있습니다.</p>
            <p className="mt-4">다음과 같은 경우에는 작업 내용을 다시 확인합니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">재방문과 작업 보완은 구분합니다</h3>
            <p className="mt-2">처음 맡긴 청소가 미흡한 부분을 확인하는 것과, 청소 후 추가 공사로 생긴 분진을 다시 제거하는 것은 다릅니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">최초 견적에 몇 차례 작업이 포함되는지, 보수공사 후 재방문이 필요한지 미리 정해 주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업은 내용과 비용을 확인하고 진행 범위를 정합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="준공청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">여러 차례 나누어 진행할 수도 있나요?</h3>
            <p className="mt-2">현장에 따라 구역별 또는 일정별 분할 작업을 검토할 수 있습니다.</p>
            <p className="mt-2">다만 &lsquo;1차·2차·3차&rsquo;라는 이름만 정하기보다 각 방문에서 무엇을 완료할지 구체적으로 정해야 합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">횟수와 작업 범위는 현장에 맞춰 안내하며, 모든 현장에 여러 차례 방문이 기본으로 포함되는 것은 아닙니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 기간은 얼마나 걸리나요?</h3>
            <p className="mt-2">면적, 공간 구성, 오염 상태, 투입 인원과 작업 가능한 구역에 따라 달라집니다.</p>
            <p className="mt-2">세척뿐 아니라 준비, 장비 이동, 마무리와 검수에 필요한 시간도 고려합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">인계일이 정해져 있다면 실제로 청소를 시작할 수 있는 날짜도 함께 알려주세요.</p>
          </section>

          {/* 5. 전후사진/완료자료 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 완료 자료" />
            <p>준공청소 결과는 전체적인 인상과 세부 작업을 함께 확인하는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">사진이 필요한 경우에는 촬영할 층과 구역, 필요한 형식을 미리 정해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">완료 자료, 작업 내역 등 요구하는 항목이 있다면 계약 전에 목록을 전달해 주셔야 제공 가능 범위를 확인할 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진만으로 확인하기 어려운 마감 상태는 현장에서 함께 살펴보는 것이 좋습니다.</p>
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 공정 일정 조율" />
            <p>현장 주소와 희망 일정을 알려주시면 서비스 가능 여부를 확인합니다.</p>
            <p className="mt-4">준공청소는 달력에 날짜를 잡는 것만큼 현장의 준비 상태가 중요합니다.</p>

            <p className="mt-5 font-bold text-brand-dark">일정 전에 확인할 내용</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">다른 공정과 겹친다면 구역을 나눕니다</h3>
            <p className="mt-2">공사와 청소가 같은 구역에서 겹치면 동선이 복잡해지고 다시 오염될 수 있습니다.</p>
            <p className="mt-2">구역을 분리할 수 있는지, 완료한 공간을 보호할 수 있는지 확인해 작업 순서를 정합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">분리가 어렵다면 일정 조정이 필요한지 검토합니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 검수와 사후 확인 기준" />
            <h3 className="text-lg font-bold text-brand-dark">&lsquo;깨끗하게&rsquo;보다 확인할 항목을 정합니다</h3>
            <p className="mt-2">완료 여부는 계약한 구역과 작업 항목을 기준으로 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">유리는 어느 면인지, 수납장은 내부까지인지, 공용부와 보양재 제거가 포함됐는지 구체적으로 정해 두면 검수가 수월합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 미흡과 마감 손상은 다릅니다</h3>
            <p className="mt-2">남은 분진이나 제거 가능한 오염과 흠집·변색·들뜸·파손은 구분해야 합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">청소로 다룰 부분과 시공팀의 확인이 필요한 부분을 나누어 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 구역과 상태를 알려주세요</h3>
            <p className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳은 층, 실명, 위치와 상태를 알려주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 계약 전에 확인해 주세요.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소 완료와 공사 승인은 별개입니다</h3>
            <p className="mt-2">준공청소는 합의한 구역의 오염과 잔여물을 정리하는 서비스입니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">전문 하자 점검, 설비 성능 확인, 사용승인 등 행정 절차를 대신하거나 그 결과를 보장하지 않습니다.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="준공청소 전 현장 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">현장 담당자와 청소팀이 같은 범위표를 보고 이야기하면, &lsquo;이것도 포함인 줄 알았는데요&rsquo;라는 혼선을 줄일 수 있습니다.</p>
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
              <p className="text-xl font-bold">준공청소 견적 문의</p>
              <p className="mt-3 text-white/80">연면적과 완료 희망일만으로는 현장을 충분히 알기 어렵습니다.</p>
              <p className="mt-2 text-white/80">어느 공정이 남았는지, 누가 잔여물을 정리하는지, 어떤 상태로 인계해야 하는지를 함께 알려주세요.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>준공청소 견적 문의하기 →</CtaButton>
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
