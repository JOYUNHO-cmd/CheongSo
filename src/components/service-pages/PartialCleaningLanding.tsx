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
  ["scope", "선택 가능한 청소 구역"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·일정 조율"],
  ["checkup", "검수·사후 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 방식", "전체 공간이 아닌 요청 구역을 선택해 상담"],
  ["주요 구역", "욕실, 주방, 창틀·유리, 베란다, 특정 방과 바닥"],
  ["견적 기준", "필요한 인원, 장비·약품, 오염 상태와 작업량"],
  ["범위 구분", "공간 청소, 내부·탈거 작업, 물품 이동과 별도 세척"],
  ["일정 조율", "생활시간과 작업 중 사용할 공간 고려"],
  ["서비스 지역", "현장 주소를 기준으로 가능 여부 확인"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "청소할 구역과 수량",
  "기름때·물때·분진 등 오염의 종류와 정도",
  "표면 재질과 기존 상태",
  "물품과 가구의 배치",
  "내부 세척과 탈거 필요 여부",
  "작업 높이와 접근 조건",
  "필요한 인원과 장비·약품",
  "급수·전원·주차 등 현장 조건",
];

const scopeItems: { title: string; paragraphs: string[] }[] = [
  {
    title: "욕실·화장실 부분청소",
    paragraphs: [
      "변기, 세면대, 거울, 바닥과 벽면 등 필요한 부위의 물때와 오염을 확인합니다.",
      "수납장 내부, 환기구 커버, 배수구의 접근 가능한 부품 등은 포함할 범위를 정합니다.",
      "욕실 전체를 요청하는지, 샤워부스나 바닥 등 특정 부위만 요청하는지도 구분해 주세요.",
      "배관 막힘 해결, 누수 수리, 줄눈·실리콘 교체는 일반 청소와 별도입니다.",
    ],
  },
  {
    title: "주방 부분청소",
    paragraphs: [
      "싱크대, 상판, 벽면, 바닥 등 요청 부위의 기름때와 생활 오염을 살펴봅니다.",
      "상·하부장 내부, 후드·필터, 가전 주변 등은 세부 범위를 확인합니다.",
      "주방 공간 청소와 설거지, 식품 정리, 냉장고 내부·가전 분해 세척은 다른 작업입니다.",
    ],
  },
  {
    title: "창틀·유리 부분청소",
    paragraphs: [
      "청소할 창의 수와 위치, 창틀 오염과 유리 면을 확인합니다.",
      "창틀만 청소할지 유리도 함께 할지, 내부와 외부 중 어느 면인지 구분합니다.",
      "방충망과 창문 탈거, 접근이 어려운 외창은 구조와 작업 조건을 확인해 별도로 검토합니다.",
    ],
  },
  {
    title: "베란다·다용도실 부분청소",
    paragraphs: [
      "바닥, 창틀, 문 주변 등 필요한 구역의 오염을 확인합니다.",
      "화분, 건조대, 세탁용품 등이 있다면 이동할 대상과 보관 위치를 먼저 정합니다.",
      "세탁기 등 무거운 기기 이동과 기기 내부 세척은 별도 항목입니다.",
    ],
  },
  {
    title: "특정 방·바닥·수납 공간",
    paragraphs: [
      "방 하나, 현관, 바닥 일부, 수납장 등 지정한 구역을 상담할 수 있습니다.",
      "가구를 그대로 둔 상태에서 접근할 수 있는 곳과 이동해야 하는 곳을 구분합니다.",
      "수납장 내부를 청소하려면 내용물 이동과 복귀를 누가 맡을지도 정해야 합니다.",
    ],
  },
  {
    title: "부분공사 후 청소",
    paragraphs: [
      "욕실 교체, 주방 공사, 창호 설치 등 일부 공사 후 청소가 필요하다면 공사 내용을 알려주세요.",
      "일상적인 부분청소와 달리 공사 분진·접착제·마감 잔여물 등을 확인해야 합니다.",
      "공사한 곳 밖에도 오염이 남아 있다면 실제 상태를 보고 범위를 정합니다. 필요하면 인테리어청소 기준으로 별도 작업을 검토합니다.",
    ],
  },
];

const separateScopeItems = [
  "정리수납과 생활용품 분류",
  "가전·소파·침구 등의 전문 세척",
  "무거운 가구와 기기의 이동",
  "폐기물 반출·처리",
  "소독·방역과 별도 냄새 처리",
  "코팅·연마·보수·자재 교체",
];

const extraCostItems = [
  "욕실 한 곳에서 두 곳으로 늘어나는 경우",
  "창틀 청소에 유리·방충망 작업을 추가하는 경우",
  "수납장 외부에서 내부 청소까지 확대하는 경우",
  "후드·가전 내부 등 별도 세척을 요청하는 경우",
  "예상보다 많은 물품 이동이 필요한 경우",
  "공사 잔여물이나 특수 오염이 확인되는 경우",
  "높은 곳이나 좁은 구간에 별도 장비가 필요한 경우",
];

const processSteps: [string, string][] = [
  ["원하는 구역과 불편한 점 상담", "어느 공간의 어떤 오염이 신경 쓰이는지 확인합니다. 공간 전체를 맡기려는지, 특정 부위만 필요한지도 함께 알려주세요."],
  ["세부 범위와 견적 안내", "청소할 부위와 제외할 곳, 내부·탈거·물품 이동 요청을 구분합니다. 필요한 인원과 장비·약품, 예상 시간을 검토해 안내합니다."],
  ["작업 전 상태 확인", "재질과 기존 파손, 물품 배치와 접근 조건을 살펴봅니다. 사진으로 확인하기 어려웠던 부분이 있다면 작업 전에 범위를 맞춥니다."],
  ["선택한 구역 청소", "합의한 항목에 따라 작업합니다. 주변 물품의 보호와 이동은 사전에 정한 범위를 기준으로 진행합니다."],
  ["마무리와 결과 확인", "요청한 오염 구간과 작업 항목을 확인합니다. 남은 물기와 잔여물, 이동한 물품 등 마무리 상태도 함께 살펴봅니다."],
];

const caseChecklist = [
  "욕실의 세면대·샤워부스·바닥 등 요청 구역",
  "주방 상판과 벽면의 기름때",
  "창틀의 모서리와 유리 면",
  "베란다 바닥과 가장자리",
  "수납장 안쪽 등 포함된 작업 부위",
];

const reservationChecklist = [
  "욕실과 주방을 사용할 시간",
  "가족의 재택근무와 외출 일정",
  "아이와 반려동물이 머물 공간",
  "물품을 잠시 옮겨둘 위치",
  "출입·주차·엘리베이터 이용 조건",
];

const prepItems = [
  "청소할 공간과 부위를 구체적으로 알려주세요.",
  "전체 구역과 오염 부위 사진을 준비해 주세요.",
  "포함할 작업과 제외할 곳을 정해 주세요.",
  "귀중품과 파손 우려가 있는 물건은 따로 보관해 주세요.",
  "수납장 내부 작업이 있다면 내용물 이동 범위를 맞춰주세요.",
  "식재료·식기·세면용품 등의 보관 위치를 정해 주세요.",
  "기존 파손·누수·기기 이상을 알려주세요.",
  "물을 사용하면 안 되는 곳과 관리 지침을 전달해 주세요.",
  "작업 중 사용할 다른 공간을 확인해 주세요.",
  "전기·수도·주차·출입 조건을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["욕실 하나나 창틀만 맡겨도 되나요?", "필요한 구역만 지정해 상담할 수 있습니다. 수량과 오염 상태, 접근 조건을 확인해 가능 여부와 견적을 안내합니다."],
  ["부분청소 비용은 어떻게 정하나요?", "집 전체 평수보다 실제 작업할 구역과 오염을 확인합니다. 필요한 인원과 장비·약품, 탈거·이동 등 작업량을 기준으로 안내합니다."],
  ["구역이 작으면 아주 저렴한가요?", "작은 구역도 장비 준비와 세척·마무리에 필요한 작업이 있습니다. 전체 청소 비용을 단순히 면적 비율로 나눈 금액과 같지는 않을 수 있습니다."],
  ["욕실과 주방을 함께 맡길 수도 있나요?", "여러 구역을 묶어 상담할 수 있습니다. 함께 진행할 때 필요한 인원과 시간을 검토해 견적을 안내합니다."],
  ["예약할 때와 다른 곳을 현장에서 추가해도 되나요?", "준비한 장비·약품과 작업 일정에 따라 달라집니다. 추가 범위와 비용을 확인한 뒤 진행 여부를 정하며, 가능하면 미리 알려주시는 것이 좋습니다."],
  ["가구나 짐을 전부 치워야 하나요?", "전체 짐을 비울 필요는 없습니다. 다만 청소할 표면과 수납 공간에 접근하려면 물품 이동이 필요할 수 있어 대상과 담당 범위를 먼저 정합니다."],
  ["부분청소와 부분공사 후 청소는 다른가요?", "부분청소는 필요한 공간을 선택하는 방식입니다. 부분공사 후 청소는 공사 분진과 마감 잔여물 등을 다루므로 오염과 작업 방법을 별도로 확인해야 합니다."],
  ["주방을 맡기면 후드나 냉장고 내부도 포함되나요?", "자동으로 포함되지는 않습니다. 공간 청소와 후드·가전의 내부·분해 세척을 구분해 요청 범위를 정합니다."],
  ["욕실 곰팡이나 냄새도 모두 해결되나요?", "원인과 자재 상태에 따라 다릅니다. 표면 청소로 다룰 부분과 누수·배관·자재 보수 등 별도 조치가 필요한 부분을 구분합니다."],
  ["창틀 청소에 외창과 방충망도 포함되나요?", "창틀, 유리의 내외부 면, 방충망과 탈거 여부를 구분해 안내합니다. 접근이 어려운 곳은 작업 가능 여부를 별도로 확인합니다."],
  ["청소 중 집에 있어도 되나요?", "작업 구역과 생활 동선을 분리할 수 있는지 확인해야 합니다. 꼭 사용해야 하는 공간이나 시간대가 있다면 상담 시 알려주세요."],
  ["청소 후 미흡한 부분이 있으면 어떻게 하나요?", "합의한 범위 안에서 해당 위치와 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 사후 접수 조건은 예약 전에 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "청소할 구역과 수량",
  "전체 구역과 주요 오염 부위 사진",
  "가장 먼저 해결하고 싶은 부분",
  "내부 세척·탈거 등 추가 요청",
  "물품과 가구 이동 필요 여부",
  "부분공사 여부와 공사 내용",
  "희망 날짜와 작업 가능 시간",
  "출입과 주차 조건",
];

const path = "/부분청소/";

export default function PartialCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "부분청소",
      serviceType: "부분청소",
      description: "집 전체가 아닌 필요한 곳만 청소하세요. 찐청소가 욕실·주방·창틀·베란다 등 요청 구역의 오염과 작업 범위를 확인하고, 필요한 인원과 장비·약품을 기준으로 견적을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "부분청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>부분청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">간단청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">부분청소, 신경 쓰이는 곳만 골라 맡기세요</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>집 전체를 청소할 정도는 아닌데, 욕실 물때는 혼자 해결하기 어렵고, 주방 기름때나 창틀 먼지는 자꾸 미루게 된다면.</p>
            <p>필요한 구역만 정해 상담해 보세요.</p>
            <p>찐청소 부분청소는 욕실, 주방, 창틀, 베란다 등 요청하신 공간의 오염과 작업 조건을 확인해 진행합니다.</p>
            <p>욕실 하나 때문에 집 전체 청소를 고민하실 필요는 없습니다. 어느 곳을 어디까지 청소할지부터 함께 정하겠습니다.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">부분청소 견적 문의하기 →</CtaButton>
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
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 생활 중인 공간의 일부만 작업하는 경우가 많아 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="부분청소 비용과 견적 산정 기준" />
            <p>부분청소 비용은 집 전체 평수보다 실제로 청소할 구역과 오염 상태를 기준으로 정합니다.</p>
            <p className="mt-4">같은 욕실 하나라도 물때의 정도와 구조가 다르고, 같은 창틀이라도 창의 수와 접근 조건에 따라 작업량이 달라집니다.</p>
            <p className="mt-4">찐청소는 필요한 인원과 장비·약품을 중심으로 견적을 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작은 구역이라고 작업도 간단한 것은 아닙니다</h3>
            <p className="mt-2">좁은 공간에 오래 쌓인 오염이 있다면 넓은 바닥의 가벼운 먼지를 청소하는 것보다 시간이 더 필요할 수 있습니다.</p>
            <p className="mt-2">장비 반입과 주변 보호, 세척과 마무리 등 기본적으로 필요한 작업도 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">그래서 전체 청소 비용을 면적 비율로 나눈 금액이 부분청소 가격이 되는 것은 아닙니다.</p>

            <p className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">여러 구역을 함께 요청할 수도 있습니다</h3>
            <p className="mt-2">욕실과 주방, 창틀과 베란다처럼 필요한 곳을 묶어서 상담할 수 있습니다.</p>
            <p className="mt-2">함께 진행할 때의 인원과 작업 시간을 검토해 견적을 안내합니다. 구역을 묶으면 무조건 할인된다고 정하기보다 실제 작업 구성을 기준으로 확인합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">예산이나 시간이 정해져 있다면 가장 우선적인 구역부터 알려주세요.</p>
          </section>

          {/* 2. 선택 가능한 청소 구역 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="선택할 수 있는 청소 구역과 작업 범위" />
            <p>부분청소는 &lsquo;어느 공간인지&rsquo;와 함께 &lsquo;그 안의 무엇을 청소할지&rsquo;를 정하는 서비스입니다.</p>
            <p className="mt-4">아래 내용은 상담 시 검토하는 항목이며, 내부·탈거·이동 작업이 모두 자동으로 포함되는 것은 아닙니다.</p>

            <div className="mt-6 space-y-6">
              {scopeItems.map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
                  {item.paragraphs.map((p, i) => (
                    <p key={p} className={i === item.paragraphs.length - 1 ? "mt-2 text-[15px] text-gray-500" : "mt-2"}>{p}</p>
                  ))}
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
              <p className="mt-4 text-[15px] text-gray-500">필요한 항목이 있다면 함께 알려주세요. 제공 가능한 범위와 비용을 확인합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용과 현장 요청 기준" />
            <p>처음 정한 범위보다 구역이나 작업이 늘어나면 견적이 달라질 수 있습니다.</p>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">&ldquo;오신 김에 이것도&rdquo;는 가능 여부부터 확인합니다</h3>
            <p className="mt-2">현장에서 추가로 청소하고 싶은 곳이 생길 수 있습니다.</p>
            <p className="mt-2">다만 준비한 장비와 약품, 작업 인원, 다음 일정에 따라 당일 추가 작업이 어려울 수도 있습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">가능하면 요청 구역을 미리 알려주세요. 현장 추가 요청은 수행 가능 여부와 비용을 확인한 뒤 범위를 정합니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">오염 사진은 실제 상태 그대로 보내주세요</h3>
            <p className="mt-2">사진을 찍기 위해 먼저 닦거나 오염이 심한 곳을 빼실 필요는 없습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">전체 구역과 가까운 사진을 함께 보내주시면 필요한 작업을 판단하는 데 도움이 됩니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="부분청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">부분청소는 얼마나 걸리나요?</h3>
            <p className="mt-2">구역의 크기뿐 아니라 오염 정도, 재질, 탈거와 물품 이동, 투입 인원에 따라 달라집니다.</p>
            <p className="mt-2">&lsquo;욕실 하나&rsquo;나 &lsquo;창틀 몇 개&rsquo;라는 정보만으로 같은 시간을 적용하지 않습니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">작업 시간에 제한이 있다면 상담 시 알려주시면 가능 범위를 함께 검토합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <p>부분청소는 요청한 구역이 분명한 만큼 전후에 같은 부위를 확인하는 것이 좋습니다.</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">가능한 한 비슷한 위치와 조명에서 비교해 주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">반짝임이나 정돈된 모습만 보기보다 약속한 부위의 오염이 정리됐는지 확인하는 것이 중요합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">사진 제공이 필요하면 촬영 구역과 전달 가능 여부를 상담 시 확인해 주세요.</p>
          </section>

          {/* 6. 지역/일정 조율 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>현장 주소와 희망 날짜를 알려주시면 서비스 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">살고 있는 공간이라면 청소할 곳과 계속 사용할 곳을 함께 정합니다.</p>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-gray-500">작업 중 선택한 구역의 사용이 제한될 수 있으므로, 꼭 사용해야 하는 시간이 있다면 미리 알려주세요.</p>
            <p className="mt-2 text-[15px] text-gray-500">부분공사 후 청소라면 남은 공정과 마감재의 청소 가능 시점도 함께 확인합니다.</p>
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">선택한 범위가 검수 기준입니다</h3>
            <p className="mt-2">욕실 전체인지 샤워부스만인지, 창틀만인지 유리까지인지, 수납장 외부인지 내부까지인지 확인합니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">견적에서 정한 항목을 기준으로 결과를 살펴봅니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 보수가 필요한 상태를 구분합니다</h3>
            <p className="mt-2">오래된 변색, 부식, 표면 마모, 실리콘 손상 등은 청소만으로 원래 상태가 되지 않을 수 있습니다.</p>
            <p className="mt-2 text-[15px] text-gray-500">제거 가능한 오염과 보수·교체가 필요한 상태를 구분해 안내합니다.</p>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 보완과 새 요청은 다릅니다</h3>
            <p className="mt-2">합의한 구역의 미흡한 부분을 확인하는 것과, 제외했던 곳을 새롭게 청소하는 것은 구분합니다.</p>
            <p className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳이 있다면 위치와 상태를 알려주세요. 작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다.</p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">접수와 처리 조건은 예약 전에 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="부분청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">집 전체를 정리해 두실 필요는 없습니다. 선택한 구역에 접근하려면 무엇을 옮겨야 하는지만 함께 확인하면 됩니다.</p>
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
              <p className="text-xl font-bold">부분청소 견적 문의</p>
              <p className="mt-3 text-white/80">집 전체 사진보다, 지금 불편한 곳의 사진부터 보내주셔도 좋습니다.</p>
              <p className="mt-2 text-white/80">욕실 물때인지, 주방 기름때인지, 창틀 먼지나 부분공사 후 분진인지 알려주세요.</p>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>부분청소 견적 문의하기 →</CtaButton>
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
