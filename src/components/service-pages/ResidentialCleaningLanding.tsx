import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
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
  ["area", "지역·예약 일정"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "가구와 생활용품이 있는 거주 중 주택"],
  ["주요 공간", "주방, 욕실, 창틀, 바닥, 베란다·다용도실 등"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염과 물품 배치에 따른 작업량"],
  ["범위 확인", "생활용품 이동, 수납장 내부, 가구·가전 자체의 청소"],
  ["일정 조율", "가족의 생활시간과 작업 중 사용할 공간 고려"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "면적과 방·욕실의 수",
  "전체 청소인지 일부 공간 청소인지",
  "기름때·물때·먼지 등 오염 상태",
  "가구 배치와 접근 가능한 구간",
  "생활용품 이동·복귀에 필요한 작업",
  "수납장 내부와 별도 요청 항목",
  "필요한 인원과 장비·약품",
  "작업 가능한 시간과 현장 조건",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "주방과 싱크대",
    body: "상판, 싱크대, 벽면, 바닥 등 작업할 표면의 기름때와 생활 오염을 확인합니다. 상판 위 조리도구와 식재료를 누가 옮길지, 후드·필터와 수납장 내부까지 청소할지 등을 구분합니다.",
    note: "설거지, 식품 정리·폐기, 냉장고 내부 정리, 가전 분해 세척은 일반 공간 청소에 자동으로 포함되지 않습니다.",
  },
  {
    title: "욕실과 세면 공간",
    body: "변기, 세면대, 거울, 바닥과 벽면 등 요청 부위의 물때와 오염을 살펴봅니다. 세면용품 이동, 욕실 수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등을 확인합니다.",
    note: "배관 막힘 해결, 누수 수리, 실리콘 교체와 자재 보수는 별도 작업입니다.",
  },
  {
    title: "방·거실 바닥과 모서리",
    body: "접근 가능한 바닥, 문 주변, 걸레받이와 모서리 등의 먼지와 오염을 확인합니다. 작은 생활용품을 옮겨 작업할지, 가구 아래까지 접근할 수 있는지 확인합니다.",
    note: "침대·소파·옷장 등 무거운 가구의 이동과 가구 자체의 전문 세척은 별도로 검토합니다. 가구를 움직이지 않고 닿을 수 있는 구간과 이동해야 하는 구간을 분명하게 안내합니다.",
  },
  {
    title: "창틀과 유리",
    body: "창틀에 쌓인 먼지와 작업 대상으로 정한 유리 면을 살펴봅니다. 창가에 놓인 물건과 커튼 등 주변 조건, 방충망이나 창문 탈거 필요 여부를 확인합니다.",
    note: "접근이 어려운 외창, 외부 고소작업, 커튼·블라인드 전문 세척은 별도 항목입니다.",
  },
  {
    title: "수납장과 선반",
    body: "외부 표면과 내부 청소는 구분합니다. 내부 작업을 원하시면 내용물을 비울 수 있는지, 이동과 원위치 정리를 누가 맡을지 먼저 정합니다.",
    note: "서랍 속 개인 물품과 문서, 의류 등을 임의로 꺼내거나 폐기하지 않도록 작업 범위를 맞춥니다.",
  },
  {
    title: "베란다와 다용도실",
    body: "바닥, 문 주변, 창틀 등 요청 구역의 오염을 확인합니다. 세탁용품, 건조대, 화분 등 생활용품이 있다면 이동 가능한 범위를 정합니다.",
    note: "세탁기 내부·분해 세척이나 무거운 기기 이동, 배관·방수 보수는 일반 공간 청소와 구분합니다.",
  },
];

const separateScopeItems = [
  "세탁과 빨래 개기",
  "식사 준비와 설거지",
  "의류 분류와 수납 체계 변경",
  "식재료·개인 물품의 정리와 폐기",
  "가구 재배치와 이사 수준의 짐 이동",
  "가전·침구·소파 등의 전문 세척",
  "소독·방역 및 별도 냄새 처리",
];

const extraCostItems = [
  "청소할 방이나 공간이 추가되는 경우",
  "예상보다 많은 물품 이동이 필요한 경우",
  "수납장 내부 작업을 추가하는 경우",
  "심하게 누적된 기름때·물때 등의 제거가 필요한 경우",
  "가전 내부나 별도 전문 세척을 요청하는 경우",
  "스티커·접착제 등 특수 오염 제거가 필요한 경우",
  "가구 이동이나 잔여물 반출을 요청하는 경우",
];

const processSteps: [string, string][] = [
  ["불편한 구역과 우선순위 상담", "집의 구조와 현재 상태, 가장 청소가 필요한 곳을 확인합니다. 집 전체인지, 주방·욕실 등 일부 공간인지 함께 알려주세요."],
  ["물품 배치와 작업 범위 확인", "가구와 짐의 위치를 보고 접근 가능한 구간과 이동이 필요한 곳을 구분합니다. 만지면 안 되는 물품, 제외할 방, 내부 청소를 요청할 수납장도 확인합니다."],
  ["견적과 작업 순서 안내", "필요한 인원과 장비·약품, 예상 시간을 안내합니다. 청소 중 가족이 사용할 공간과 이동 동선을 고려해 작업 순서를 정합니다."],
  ["공간별 청소", "합의한 범위에 따라 작업합니다. 물품 이동이 포함됐다면 대상과 임시 보관 위치, 원위치 기준에 맞춰 진행합니다."],
  ["마무리와 확인", "주요 오염 구간과 포함 항목을 확인합니다. 이동한 물품과 작업 구역의 정리 상태, 남은 물기 등도 함께 살펴봅니다."],
];

const caseChecklist = [
  "주방 상판과 벽면의 기름때",
  "욕실 세면대와 바닥의 물때",
  "창틀과 모서리의 먼지",
  "접근 가능한 가구 주변 바닥",
  "청소 범위에 포함된 수납 공간",
  "처음 집중 청소를 요청한 곳",
];

const cases = [
  {
    id: "residential-room",
    title: "방 정리·청소",
    before: "residential-room-01.webp",
    after: "residential-room-02.webp",
    beforeWidth: 1650,
    beforeHeight: 2200,
    afterWidth: 1650,
    afterHeight: 2200,
  },
  {
    id: "residential-living1",
    title: "거실 정리·청소",
    before: "residential-living1-01.webp",
    after: "residential-living1-02.webp",
    beforeWidth: 1650,
    beforeHeight: 2200,
    afterWidth: 1650,
    afterHeight: 2200,
  },
  {
    id: "residential-living2",
    title: "거실 바닥 청소",
    before: "residential-living2-01.webp",
    after: "residential-living2-02.webp",
    beforeWidth: 1650,
    beforeHeight: 2200,
    afterWidth: 1650,
    afterHeight: 2200,
  },
  {
    id: "residential-utility",
    title: "다용도실 청소",
    before: "residential-utility-01.webp",
    after: "residential-utility-02.webp",
    beforeWidth: 1650,
    beforeHeight: 2200,
    afterWidth: 1650,
    afterHeight: 2200,
  },
  {
    id: "residential-veranda",
    title: "베란다 청소",
    before: "residential-veranda-01.webp",
    after: "residential-veranda-02.webp",
    beforeWidth: 1650,
    beforeHeight: 2200,
    afterWidth: 1650,
    afterHeight: 2200,
  },
];

const reservationChecklist = [
  "가족의 재택근무와 외출 시간",
  "아이의 생활시간",
  "반려동물이 머물 공간",
  "조리와 식사 준비 시간",
  "작업 중 사용할 방과 욕실",
  "건물의 소음·주차·출입 조건",
];

const prepItems = [
  "가장 먼저 청소하고 싶은 구역을 알려주세요.",
  "귀중품과 중요 문서, 파손 우려가 있는 물건은 따로 보관해 주세요.",
  "만지면 안 되는 물품과 출입 제외 공간을 알려주세요.",
  "수납장 내부 청소가 있다면 내용물 이동 범위를 정해 주세요.",
  "식재료와 식기 등은 작업 구역과 분리할 수 있도록 준비해 주세요.",
  "고장·파손·누수 등 기존 이상 부위를 알려주세요.",
  "특정 재질이나 제품의 관리 지침이 있다면 전달해 주세요.",
  "아이와 반려동물이 머물 공간을 정해 주세요.",
  "전기·수도·주차·출입 조건을 확인해 주세요.",
  "작업 후 확인 방법과 연락 가능한 시간을 정해 주세요.",
];

const faqItems: [string, string][] = [
  ["입주·이사청소와 거주청소는 어떻게 다른가요?", "입주·이사청소는 주로 짐을 들이기 전 공간을 대상으로 합니다. 거주청소는 생활용품과 가구가 있는 상태에서 접근 범위와 물품 이동을 고려해 진행합니다."],
  ["거주청소 비용은 평당으로 정하나요?", "찐청소는 평수만으로 정하지 않습니다. 오염 상태, 가구·물품 배치, 요청 범위를 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["짐을 전부 빼야 하나요?", "집 전체의 짐을 비워야 하는 것은 아닙니다. 다만 청소할 표면과 수납장 내부에 놓인 물건은 이동이 필요할 수 있어, 누가 어디까지 정리할지 미리 정합니다."],
  ["욕실이나 주방만 맡길 수 있나요?", "필요한 공간만 지정해 상담할 수 있습니다. 작업 범위와 현장 조건에 맞춰 가능 여부와 견적을 안내합니다."],
  ["침대나 소파 아래도 청소하나요?", "가구를 움직이지 않고 접근할 수 있는 범위와 이동이 필요한 범위를 구분합니다. 무거운 가구 이동과 가구 자체의 세척은 자동으로 포함되지 않습니다."],
  ["옷장 정리와 설거지도 해주시나요?", "거주청소에 기본 포함되는 것으로 안내하지 않습니다. 공간 청소와 정리수납·가사 작업은 구분하며, 필요한 요청은 별도로 확인합니다."],
  ["수납장 안에 물건이 있어도 내부 청소가 가능한가요?", "내용물을 옮길 공간과 이동·복귀 담당을 정해야 합니다. 개인 물품을 임의로 꺼내기보다 사전에 합의한 수납장과 범위만 작업하도록 맞춥니다."],
  ["집에 있어도 되나요?", "작업 내용과 생활 동선에 따라 다릅니다. 재택근무 등으로 꼭 사용해야 하는 공간이 있다면 미리 알려주시면 작업 순서와 진행 가능 여부를 검토합니다."],
  ["아이나 반려동물이 있어도 가능한가요?", "작업 구역과 머무는 공간을 분리할 수 있는지 확인해야 합니다. 사용 제품과 작업 후 공간 이용에 관해 확인할 사항도 상담 시 알려주세요."],
  ["냄새나 곰팡이도 모두 해결되나요?", "원인과 자재 상태에 따라 다릅니다. 표면 청소로 다룰 부분과 별도 처리·보수가 필요한 부분을 구분하며, 일반 청소만으로 완전 제거를 보장하지 않습니다."],
  ["정기적으로 받을 수도 있나요?", "희망 주기와 관리할 공간을 알려주시면 가능 여부를 상담할 수 있습니다. 처음 쌓인 오염을 정리하는 작업과 이후 정기관리의 범위·비용은 구분합니다."],
  ["청소 후 미흡한 부분이 있으면 어떻게 하나요?", "작업 범위 안에서 미흡한 위치와 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 주택 유형",
  "면적과 방·욕실의 수",
  "전체 또는 부분 청소 여부",
  "현재 가구·물품 배치 사진",
  "주요 오염 부위 사진",
  "수납장 내부와 가구 이동 등 추가 요청",
  "우선 청소할 구역과 제외할 공간",
  "희망 날짜와 작업 가능 시간",
  "작업 중 사용할 공간과 생활 동선",
  "주차와 출입 조건",
];

const path = "/거주청소/";

export default function ResidentialCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "거주청소",
      serviceType: "거주청소",
      description: "짐과 가구가 있는 집의 거주청소를 안내합니다. 찐청소가 주방·욕실·창틀·바닥의 오염과 접근 조건을 확인하고, 물품 이동 범위와 필요한 인원·작업 시간을 반영해 견적을 상담합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "거주청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>거주청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">거주청소, 이사하지 않아도 집을 한 번 정리할 때</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>매일 청소해도 남아 있는 욕실 물때, 닦으려면 물건부터 치워야 하는 주방, 가구 사이와 창틀에 쌓인 먼지.</p>
            <p>살고 있는 집은 빈집처럼 한 번에 청소하기 어렵습니다. 생활용품을 보호하면서 작업할 공간을 확보해야 하기 때문입니다.</p>
            <p>찐청소는 현재 집의 상태와 가구 배치, 우선 청소할 곳을 확인해 작업 범위를 정합니다.</p>
            <p>청소를 맡기려고 집을 이사 직전처럼 비우실 필요는 없습니다. 무엇을 미리 치우고, 어디까지 작업할지부터 함께 맞추겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">거주청소 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 가족이 계속 생활하는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="거주청소 비용과 견적 산정 기준" />
            <p>거주청소 비용은 평수만으로 정하기 어렵습니다.</p>
            <p className="mt-4">같은 면적이라도 물건이 놓인 정도, 가구 배치, 오염 상태와 청소할 구역에 따라 필요한 시간이 달라집니다.</p>
            <p className="mt-4">찐청소는 실제로 필요한 인원과 장비·약품을 중심으로 작업량을 확인해 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">짐이 있다는 이유만으로 같은 조건을 적용하지 않습니다</h3>
            <p className="mt-2">생활용품이 있어도 통로와 작업할 표면이 확보된 집과, 물건을 옮겨야 바닥이나 수납 공간에 접근할 수 있는 집은 다릅니다.</p>
            <p className="mt-2">물건의 양뿐 아니라 어디에 놓여 있고 청소에 어떤 영향을 주는지 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진을 찍기 전에 무리해서 정리하지 않으셔도 됩니다. 실제 작업할 상태를 보여주시는 편이 상담에 도움이 됩니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">가장 필요한 곳부터 정할 수 있습니다</h3>
            <p className="mt-2">집 전체를 한 번에 청소할지, 욕실과 주방처럼 불편한 곳부터 진행할지 상담할 수 있습니다.</p>
            <p className="mt-2">예산이나 시간이 정해져 있다면 우선순위를 알려주세요. 가능한 작업 범위와 필요한 시간을 함께 검토합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">부분 청소의 비용이 전체 견적에서 면적 비율만큼 줄어드는 것은 아닙니다. 실제 투입 인원과 작업 준비를 기준으로 안내합니다.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <p>거주청소는 생활 중인 물품을 고려해 접근 가능한 곳과 이동이 필요한 곳을 나누어 작업합니다.</p>
            <p className="mt-4">아래 항목은 상담 시 확인하는 내용입니다. 모든 공간과 물품의 청소가 자동으로 포함되는 것은 아니며, 세부 범위는 견적 단계에서 정합니다.</p>

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
              <p className="font-bold text-brand-dark">거주청소와 다른 서비스의 차이</p>
              <p className="mt-2 text-[15.5px]">거주청소는 합의한 공간의 오염을 제거하는 작업입니다. 다음 항목이 모두 포함되는 가사 서비스나 정리수납 서비스와는 구분합니다.</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {separateScopeItems.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">필요한 작업이 있다면 상담 시 알려주세요. 제공 가능 여부와 비용을 확인합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <p>처음 정한 범위보다 작업이 늘어나거나 별도 작업이 필요한 경우 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업이 필요하면 내용과 비용을 확인하고 진행 범위를 정합니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">남길 물건과 버릴 물건은 고객님이 구분해 주세요. 겉으로 보기에는 불필요해 보여도 임의로 폐기 대상으로 판단하지 않습니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="거주청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">거주청소는 얼마나 걸리나요?</h3>
            <p className="mt-2">면적과 오염뿐 아니라 물품 이동, 작업 구역 분할, 투입 인원에 따라 달라집니다.</p>
            <p className="mt-2">빈집 청소와 달리 물건을 보호하고 접근 공간을 확보하는 데 시간이 필요할 수 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 중 꼭 사용해야 하는 방이나 욕실이 있다면 상담 시 알려주세요.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>거주청소 결과는 물건이 얼마나 가지런한지만으로 판단하지 않습니다.</p>
            <p className="mt-4">약속한 구역의 오염이 정리됐는지를 확인하는 것이 중요합니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">정리된 모습과 실제 청소 결과는 구분해서 살펴보세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진이 필요하면 촬영 구역과 전달 가능 여부를 미리 확인해 주세요. 가족사진, 문서, 개인 물품 등 촬영을 원하지 않는 대상도 함께 알려주세요.</p>

            <div className="mt-6 space-y-8">
              {cases.map(item => <CaseFigure key={item.id} item={item} />)}
            </div>
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부를 확인합니다.</p>
            <p className="mt-4">거주청소는 집을 사용하고 있는 만큼 작업 시간과 생활 동선을 함께 맞추는 것이 중요합니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5">아이와 반려동물이 작업 구역에 들어오지 않도록 분리 가능한 공간을 함께 정해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">집에 머무르면서 진행할 수 있는지, 잠시 공간을 비워야 하는지는 작업 내용과 현장 조건에 따라 안내합니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">처음 정한 범위가 기준입니다</h3>
            <p className="mt-2">주방, 욕실, 창틀, 바닥 등 포함된 작업을 기준으로 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">짐이나 가구 때문에 작업하지 못하기로 한 구간도 함께 구분해 두면 결과를 확인하기 쉽습니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">오염과 기존 손상은 구분합니다</h3>
            <p className="mt-2">오래된 변색, 부식, 바닥 마모, 흠집은 청소만으로 원래 상태가 되지 않을 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">추가 세척이 필요한 부분과 보수·교체가 필요한 상태를 구분해 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">이동한 물품도 함께 확인합니다</h3>
            <p className="mt-2">물품 이동과 원위치 작업이 포함됐다면 합의한 대상과 배치를 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">개인 물품의 분류나 수납 방식 변경은 별도 요청 없이 임의로 진행하지 않도록 범위를 맞춥니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <p className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 해당 위치와 상태를 알려주세요.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 내용과 현장 상태를 확인해 후속 처리 방법을 안내합니다. 사후 접수와 처리 조건은 예약 전에 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="거주청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 보내려고 집을 완벽하게 정리하실 필요는 없습니다. 현재 상태를 알아야 어디까지 도와드릴지 정확하게 안내할 수 있습니다.</p>
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
              <p className="text-xl font-bold">거주청소 견적 문의</p>
              <p className="mt-3 text-white/80">몇 평인지와 함께, 지금 가장 불편한 곳이 어디인지 알려주세요.</p>
              <p className="mt-2 text-white/80">욕실 물때가 신경 쓰이는지, 주방 기름때를 정리하고 싶은지, 집 전체에 쌓인 먼지를 한 번 정리하고 싶은지에 따라 작업 구성이 달라집니다.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>거주청소 견적 문의하기 →</CtaButton>
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
