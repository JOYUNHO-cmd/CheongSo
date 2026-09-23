import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { EcosorbNotice } from "@/components/service-pages/EcosorbNotice";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { CaseGallery } from "@/components/service-pages/CaseGallery";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "기본 범위·확인 항목"],
  ["extra", "추가 비용"],
  ["safety", "ECOSORB·냄새 관리"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·비대면 예약"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["청소 대상", "쓰레기와 생활용품이 쌓여 혼자 정리하기 어려운 주거 공간"],
  ["기본 포함", "쓰레기 수거, 폐기물 처리, 청소, 소독, 냄새 제거"],
  ["견적 기준", "필요한 인원, 장비·약품, 폐기물의 종류와 양, 오염 상태, 반출 조건"],
  ["비대면 진행", "요청 시 가능하며 출입 방법과 정리 범위를 사전 협의"],
  ["결과 확인", "상세한 작업 전후 사진 전달"],
  ["서비스 지역·예약", "현장 위치와 희망 일정을 기준으로 가능 여부 안내"],
];

const estimateChecklist = [
  "공간의 크기와 청소할 구역",
  "쓰레기와 폐기물의 종류·양",
  "남길 물건과 버릴 물건의 분류 정도",
  "음식물, 기름때, 찌든 때 등 오염 상태",
  "냄새가 발생하는 위치와 오염 범위",
  "층수, 엘리베이터, 주차 위치, 반출 거리",
  "필요한 인원과 장비·약품",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "쓰레기 수거와 폐기물 처리",
    body: "합의한 폐기 대상의 분류·수거·반출·처리를 진행합니다. 큰 가구와 가전도 버리실 예정이라면 견적 상담 때 함께 알려주세요.",
    note: "서류, 사진, 귀중품, 추억이 담긴 물건처럼 보관할 물건은 폐기 대상과 구분해 전달해 주세요. 찾아야 할 물건이 있다면 특징이나 예상 위치도 함께 알려주시면 좋습니다.",
    photoPairs: [
      ["trash-storage-01.webp", "trash-storage-02.webp"],
      ["trash-storage-03.webp", "trash-storage-04.webp"],
      ["trash-waste-01.webp", "trash-waste-02.webp"],
      ["trash-waste-04.webp", "trash-waste-03.webp"],
    ],
  },
  {
    title: "방과 거실",
    body: "쓰레기와 폐기물을 정리한 뒤, 작업 가능한 바닥과 합의한 생활 공간의 오염을 청소합니다.",
    note: "물건에 가려져 있던 바닥이나 벽면은 반출 후에야 상태를 확인할 수 있습니다. 청소로 제거할 수 있는 오염과 변색·손상 등 남을 수 있는 흔적을 구분해 확인합니다.",
    beforeAfter: [
      { label: "방 바닥", before: "trash-room-before.webp", after: "trash-room-after.webp" },
      { label: "발코니 바닥", before: "trash-balcony-before.webp", after: "trash-balcony-after.webp" },
    ],
  },
  {
    title: "주방과 수납 공간",
    body: "합의한 범위의 싱크대, 조리대, 주방 바닥 등 오염을 청소합니다.",
    note: "냉장고 내부 음식물 정리, 수납장 내부, 식기 세척처럼 작업량 차이가 큰 항목은 상담할 때 요청해 주세요. 주방 청소에 어떤 항목이 포함되는지 미리 맞춰두면 결과를 확인하기도 수월합니다.",
    beforeAfter: [
      { label: "냉장고 내부", before: "trash-fridge-before.webp", after: "trash-fridge-after.webp" },
      { label: "주방 작업대", before: "trash-kitchen-before.webp", after: "trash-kitchen-after.webp" },
    ],
  },
  {
    title: "욕실과 다용도 공간",
    body: "합의한 범위의 변기, 세면대, 욕실 바닥과 벽면 등의 오염을 청소합니다. 베란다와 다용도실도 정리가 필요하다면 함께 알려주세요.",
    note: "배수 불량, 누수, 설비 고장은 청소와 별도로 확인할 사항입니다.",
    beforeAfter: [
      { label: "변기와 바닥", before: "trash-bath-before.webp", after: "trash-bath-after.webp" },
      { label: "세면대와 욕조", before: "trash-bath2-before.webp", after: "trash-bath2-after.webp" },
    ],
  },
  {
    title: "소독과 냄새 제거",
    body: "소독과 냄새 제거는 기본 작업에 포함됩니다. 쓰레기 반출 후 남은 오염과 냄새 발생 지점을 확인하며 진행합니다.",
    note: "다만 오염이 벽지나 바닥재 등 자재 내부까지 스며든 경우에는 청소와 탈취만으로 해결하기 어려울 수 있습니다. 이런 부분은 자재 상태와 추가 조치 필요 여부를 따로 확인해야 합니다.",
  },
];

const separateScopeItems = [
  "냉장고·수납장 내부 정리와 세척",
  "식기 세척, 의류 세탁, 물건의 세부 정리수납",
  "가구·가전의 분해나 이동이 필요한 작업",
  "해충 방제",
  "벽지·바닥재 철거와 교체, 설비 수리",
];

const extraCostItems = [
  "사진이나 상담에서 확인한 것보다 폐기물의 양이 많은 경우",
  "처음에 없던 방이나 베란다 등 청소 구역이 추가되는 경우",
  "보관 예정이던 큰 가구·가전을 추가로 폐기하는 경우",
  "물건을 반출한 뒤 가려져 있던 심한 오염이 확인되는 경우",
  "엘리베이터 사용 불가 등 반출 조건이 달라지는 경우",
  "별도 방제, 철거·교체, 수리 등의 작업을 요청하는 경우",
];

const processSteps: [string, string][] = [
  ["현재 상태와 요청사항 상담", "현장 위치, 공간 크기, 사진, 희망 일정을 확인합니다. 계속 거주할 집인지, 이사나 퇴실을 앞둔 집인지도 알려주세요."],
  ["남길 물건과 작업 범위 확인", "보관할 물건, 폐기할 물건, 청소할 구역을 정합니다. 비대면 진행이라면 출입 방법과 작업 중 연락 방법도 함께 협의합니다."],
  ["분류·수거·폐기물 반출", "협의한 기준에 따라 물건과 폐기물을 구분하고 반출합니다. 처리 여부가 애매한 물건의 확인 방법도 작업 전에 정해두면 좋습니다."],
  ["공간별 청소", "폐기물이 빠진 공간의 상태를 확인하고, 합의한 범위의 오염을 청소합니다."],
  ["소독과 냄새 제거", "청소 후 소독과 냄새 제거 작업을 진행합니다. 자재 손상이나 깊이 스며든 오염처럼 별도 확인이 필요한 부분도 살펴봅니다."],
  ["마무리 확인과 사진 전달", "협의한 작업 범위가 마무리되었는지 확인합니다. 작업 전후 사진은 상세하게 촬영해 전달해 드립니다."],
];

const photoCheckItems = [
  "요청한 쓰레기와 폐기물이 반출되었는지",
  "남겨두기로 한 물건이 보관되어 있는지",
  "바닥과 주요 생활 공간이 어떻게 달라졌는지",
  "주방과 욕실의 합의한 작업 구역이 청소되었는지",
  "가려져 있던 오염이나 손상 중 남은 부분이 있는지",
];

const remoteSteps = [
  "출입 방법과 작업 가능한 시간",
  "남길 물건과 버릴 물건",
  "작업 중 확인이 필요할 때 연락할 방법",
  "완료 사진을 받을 방법",
  "작업 후 문단속과 열쇠 등 출입 수단의 반환 방법",
];

const checkupItems = [
  "폐기하기로 한 물건의 반출 여부",
  "보관하기로 한 물건의 상태와 위치",
  "합의한 구역의 청소 여부",
  "소독·냄새 제거 작업 내용",
  "제거되지 않은 오염이나 남아 있는 손상",
  "추가로 확인해야 할 자재·설비 문제",
];

const contactChecklist = [
  "현장 위치와 주거 형태",
  "대략적인 면적과 청소할 구역",
  "현재 상태를 보여주는 사진",
  "버릴 가구·가전과 남길 물건",
  "층수, 엘리베이터, 주차 여건",
  "희망 날짜와 완료해야 하는 기한",
  "비대면 진행 여부",
];

const faqItems: [string, string][] = [
  ["집 상태가 많이 심해도 상담할 수 있나요?", "네. 미리 정리한 모습이 아니라 현재 상태를 기준으로 상담합니다. 쓰레기의 양과 오염 정도를 알려주시면 필요한 작업을 확인하겠습니다."],
  ["사진을 찍을 공간도 부족한데 먼저 정리해야 하나요?", "작업을 위해 미리 모두 정리하실 필요는 없습니다. 안전하게 찍을 수 있는 출입구와 각 구역 사진부터 보내주세요. 사진으로 보이지 않는 물량과 오염은 추가 확인이 필요할 수 있습니다."],
  ["폐기물 처리비와 소독비가 별도인가요?", "찐청소의 쓰레기집청소는 수거·폐기물 처리·청소·소독·냄새 제거가 기본에 포함됩니다. 다만 실제 물량과 작업 범위에 따라 전체 견적은 달라집니다."],
  ["원룸이면 정해진 가격이 있나요?", "같은 원룸이라도 쓰레기 양, 분류에 필요한 시간, 오염 상태, 반출 조건이 달라 평수만으로 비용을 정하지 않습니다."],
  ["제가 현장에 없어도 되나요?", "네. 비대면 진행이 가능합니다. 출입 방법과 정리 범위를 사전에 협의하고, 작업 전후 사진을 자세히 보내드립니다."],
  ["남기고 싶은 물건이나 찾아야 할 물건이 있으면요?", "작업 전에 목록과 특징을 알려주세요. 물건을 찾을 수 있다고 무조건 보장할 수는 없지만, 분류 기준과 확인 방법을 미리 협의할 수 있습니다."],
  ["냉장고 안이나 수납장 안도 청소하나요?", "내부 정리와 세척이 필요하면 상담 시 말씀해 주세요. 내용물의 양과 상태를 확인해 작업 범위와 비용을 안내합니다."],
  ["소독을 하면 벌레 문제도 모두 해결되나요?", "소독과 해충 방제는 서로 다른 작업입니다. 벌레가 보이거나 방제가 필요하다면 별도 대응 가능 여부와 범위를 확인해야 합니다."],
  ["냄새 제거까지 하면 냄새가 완전히 없어지나요?", "냄새 제거는 기본으로 진행하지만, 오염이 스며든 깊이나 자재 상태에 따라 결과가 달라질 수 있습니다. 벽지나 바닥재 등의 추가 조치가 필요한지도 확인해야 합니다."],
  ["하루 안에 끝낼 수 있나요?", "현장마다 다릅니다. 쓰레기의 양과 청소 범위, 반출 여건을 확인한 뒤 예상 시간을 안내합니다. 반드시 맞춰야 하는 일정이 있다면 먼저 알려주세요."],
  ["청소가 끝난 모습은 어떻게 확인하나요?", "상세한 작업 전후 사진을 보내드립니다. 사진과 함께 남겨둔 물건, 작업 범위, 추가 확인이 필요한 부분을 확인해 주세요."],
];

const caseIds = [
  "special-02", "special-01", "special-04", "special-05", "special-06", "special-07",
  "special-08", "special-09", "special-10", "special-11", "special-12", "special-13",
  "special-14", "special-15", "special-16", "special-17", "special-18", "special-19",
] as const;
const path = "/쓰레기집청소/";

export default function TrashHouseCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "쓰레기집청소",
      serviceType: "쓰레기집청소·폐기물 처리",
      description: "원룸이나 집 안에 쓰레기와 생활용품이 쌓여 어디부터 정리할지 막막하신가요? 찐청소는 보관할 물건을 먼저 확인하고 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행합니다. 요청 시 비대면 진행과 상세한 작업 전후 사진 전달이 가능합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "쓰레기집청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/trash-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>쓰레기집청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">쓰레기가 쌓인 원룸·주거 공간, 남길 물건부터 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>원룸이나 집 안에 쓰레기와 생활용품이 쌓여 어디부터 정리할지 막막하신가요? 찐청소는 보관할 물건을 먼저 확인하고 수거·폐기물 처리·청소·소독·냄새 제거를 기본으로 진행합니다. 요청 시 비대면 진행과 상세한 작업 전후 사진 전달이 가능합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">쓰레기집청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="쓰레기집청소 비용은 어떻게 정하나요?" />
            <ReadingParagraph>쓰레기집청소 비용은 평수만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 원룸이라도 ","바닥과 주방의 오염 상태에 따라 "]}>같은 원룸이라도 쌓인 물건의 양, 분류에 필요한 시간, 바닥과 주방의 오염 상태에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로, "]}>찐청소는 필요한 인원과 장비·약품을 중심으로, 폐기물 처리량과 현장 조건을 함께 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">면적보다 실제 작업량을 확인합니다</h3>
            <ReadingParagraph className="mt-2">쓰레기가 봉투에 담겨 있는 공간과 생활용품·서류·음식물이 뒤섞인 공간은 정리에 필요한 시간이 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">넓은 집이라도 반출할 물건이 적으면, 물건이 빽빽하게 쌓인 작은 집보다 작업량이 적을 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 font-bold text-brand-dark">폐기물 처리와 소독도 포함된 견적인가요?</h3>
            <ReadingParagraph className="mt-2">찐청소의 쓰레기집청소는 수거·폐기물 처리·청소·소독·냄새 제거가 기본에 포함됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">다만 기본 포함이라는 말이 폐기물의 양이나 작업 범위에 관계없이 같은 금액이라는 뜻은 아닙니다. 상담 때 확인한 현장 상태와 처리 범위를 기준으로 견적을 산정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">다른 견적과 비교하실 때도 금액뿐 아니라 폐기물 처리, 소독, 냄새 제거가 어디까지 포함되어 있는지 함께 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">사진만으로도 상담할 수 있나요?</h3>
            <ReadingParagraph className="mt-2">사진을 보내주시면 작업 범위와 예상 비용을 상담하는 데 도움이 됩니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">방 전체 모습, 주방과 욕실, 쓰레기가 집중된 곳, 큰 가구나 가전이 함께 보이면 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">다만 사진에 가려진 바닥이나 수납장 내부 등은 확인이 어려워, 현장 확인이 필요한 경우도 있습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="기본 청소 범위와 미리 확인할 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">주방 음식물·생활 쓰레기·보관 물품을 구분합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">방과 주방, 욕실마다 물건이 쌓인 양과 오염 상태를 나눠 확인합니다. 중요한 서류와 귀중품, 남길 물건은 폐기 대상과 분리합니다. 해충을 발견했다면 위치를 알려주시고, 전문 방제의 필요 여부와 범위는 소독과 구분해 확인해주세요.</ReadingParagraph>
            <ReadingParagraph>찐청소는 쓰레기만 반출하고 끝내는 것이 아니라, 합의한 구역의 청소와 소독·냄새 제거까지 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">남길 물건이 있다면 작업 전에 알려주세요. 집을 전부 비우는 작업인지, 필요한 물건을 남기고 다시 생활할 수 있도록 정리하는 작업인지에 따라 진행 방식이 달라집니다.</ReadingParagraph>

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
                  {item.beforeAfter && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {item.beforeAfter.map(pair => (
                        <figure key={pair.label} className="overflow-hidden rounded-xl border border-gray-100">
                          <div className="grid grid-cols-2">
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.before}`} alt={`${pair.label} 청소 전`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
                            </div>
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.after}`} alt={`${pair.label} 청소 후`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">후</span>
                            </div>
                          </div>
                          <figcaption className="px-3 py-2 text-sm font-bold text-brand-dark">{pair.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-bold text-brand-dark">별도로 범위를 확인해야 하는 작업</h3>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">위 항목은 기본 작업에 자동으로 포함되는 것으로 보지 않으며, 진행 가능 여부와 비용을 사전에 확인합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>


          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>수거·폐기물 처리·소독·냄새 제거는 기본 포함 항목입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">추가 비용 여부는 해당 작업의 명칭보다, 처음 협의한 물량과 범위가 달라지는지를 기준으로 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">다음과 같은 경우에는 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적 상담 시 기본 포함 항목, 별도 요청 항목, 현장 확인이 필요한 항목을 함께 확인해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          <EcosorbNotice />

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="청소 진행 순서와 소요 시간" />
            <ReadingParagraph>기본 진행 흐름은 상담 → 범위·견적 확인 → 분류·반출 → 청소 → 소독·냄새 제거 → 검수입니다.</ReadingParagraph>

            <ol className="mt-6 space-y-4">
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

            <h3 className="mt-6 font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">소요 시간은 쓰레기의 양, 분류 작업, 오염 정도, 반출 조건에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">평수만으로 당일 완료를 약속하기보다는, 현장을 확인한 뒤 예상 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">퇴실이나 이사처럼 정해진 기한이 있다면 상담할 때 먼저 말씀해 주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진 */}
          {cases.length > 0 && (
            <section id="cases" className="scroll-mt-36">
              <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진으로 확인할 내용" />
              <ReadingParagraph>청소가 끝났다는 설명만으로는 집 상태를 충분히 알기 어렵습니다. 찐청소는 작업 전후 사진을 자세히 촬영해 보내드립니다.</ReadingParagraph>
              <div className="mt-6">
                <CaseGallery items={cases} />
              </div>
              <ReadingParagraph className="mt-5 font-bold text-brand-dark">전체 모습과 함께 아래 항목을 확인해 주세요.</ReadingParagraph>
              <ul className="mt-3 space-y-2.5">
                {photoCheckItems.map(item => (
                  <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4">비대면으로 맡기시는 경우, 특히 확인하고 싶은 구역을 미리 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-4 text-[15px] text-gray-500">사진은 눈에 보이는 상태를 확인하는 자료입니다. 냄새나 자재 내부 상태까지 사진만으로 판단할 수는 없으므로, 이런 부분은 작업 설명과 함께 확인하는 것이 좋습니다.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
            <BackToContents />
          </section>
          )}

          {/* 6. 지역/비대면 예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 비대면 예약" />
            <ReadingParagraph>현장 주소와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">층수, 엘리베이터 유무, 주차·반출 여건도 함께 알려주시면 상담에 도움이 됩니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">현장에 없어도 맡길 수 있나요?</h3>
            <ReadingParagraph className="mt-2">네. 원하시면 비대면으로 진행할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">작업 전후 사진도 상세하게 전달해 드립니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">비대면 진행 전에는 다음 내용을 협의합니다.</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {remoteSteps.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-gray-50 p-5">
              <h3 className="font-bold text-brand-dark">주변 시선이 걱정된다면</h3>
              <ReadingParagraph className="mt-2 text-[15.5px]">방문 시간이나 반출 동선 등 걱정되는 부분을 상담할 때 알려주세요. 현장 조건에서 조정할 수 있는 방법을 함께 확인하겠습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15px] text-gray-500">다만 공동현관, 복도, 엘리베이터 등을 이용해야 하므로 주변에서 작업 사실을 전혀 알 수 없다고 약속드리기는 어렵습니다.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 문의" />
            <ReadingParagraph>검수는 처음 협의한 범위를 기준으로 진행합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">집이 비워졌는지뿐 아니라, 요청한 청소와 정리가 어디까지 이루어졌는지 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">검수 시 확인할 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4">작업 후 궁금한 부분이 있다면 해당 구역의 사진과 함께 문의해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">재확인이나 사후 처리의 적용 범위와 기간은 계약 시 확인하시기 바랍니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소로 제거할 수 있는 오염과 자재 자체의 변색·파손은 구분해서 안내받는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="청소 전에 준비할 사항" />
            <ReadingParagraph>상담을 받기 위해 쓰레기를 미리 정리하거나 봉투에 모두 담아두실 필요는 없습니다. 가능한 범위에서 아래 내용만 알려주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">남길 물건을 알려주세요</h3>
            <ReadingParagraph className="mt-2">신분증, 통장, 계약서, 사진, 귀중품 등 보관할 물건의 목록을 전달해 주세요. 직접 꺼내기 어렵다면 무리해서 찾기보다 특징과 예상 위치를 알려주시면 됩니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">현재 상태를 보여주세요</h3>
            <ReadingParagraph className="mt-2">사진을 찍을 수 있다면 방 전체와 주요 오염 구역을 보내주세요. 사진 촬영이 어렵다면 그 상황부터 말씀해 주세요.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">출입과 반출 조건을 알려주세요</h3>
            <ReadingParagraph className="mt-2">층수, 엘리베이터, 주차 위치, 건물의 작업 가능 시간 등을 확인해 주세요. 관리실과의 사전 협의가 필요한지도 살펴보시면 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 font-bold text-brand-dark">작업 후 원하는 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">계속 거주할 예정인지, 이사 때문에 집을 비워야 하는지에 따라 남길 물건과 마무리 범위가 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">&ldquo;쓰레기는 전부 버리되 가구는 남기고 싶어요.&rdquo;<br />&ldquo;퇴실 예정이라 큰 가구도 함께 처리하고 싶어요.&rdquo;<br /><span className="mt-2 block text-gray-700">이렇게 구체적으로 알려주시면 범위를 정하기가 수월합니다.</span></ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">쓰레기집청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">어디부터 설명해야 할지 모르겠다면, 현장 위치와 현재 상태부터 알려주세요. 사진이 있으면 도움이 되지만, 모든 내용을 완벽하게 정리해서 문의하실 필요는 없습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-sm font-bold text-white">상담할 때 알려주시면 좋은 내용</ReadingParagraph>
              <ul className="mt-2 grid gap-1.5 text-[15px] text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ReadingParagraph className="mt-4 text-white/80">찐청소는 쓰레기 수거와 폐기물 처리부터 청소·소독·냄새 제거까지 진행합니다. 필요한 작업과 견적에 포함되는 범위를 확인한 뒤 결정하세요.</ReadingParagraph>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>쓰레기집청소 견적 문의하기 →</CtaButton>
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
