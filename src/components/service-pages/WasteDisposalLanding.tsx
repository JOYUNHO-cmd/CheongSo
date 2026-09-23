import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import { CtaButton, SectionTitle, TocSidebar, QuickFactsTable } from "@/components/service-pages/shared";
import { BackToTopButton } from "@/components/service-pages/ScrollControls";

const toc = [
  ["quickfacts", "핵심 정보 보기"],
  ["estimate", "비용·견적 기준"],
  ["scope", "수거·처리 가능 품목"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["photos", "작업 전후 사진"],
  ["area", "지역·비대면 예약"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["수집·운반", "찐청소가 직접 진행"],
  ["처리 방식", "폐기물 종류를 확인한 뒤 협력 처리업체와 연계"],
  ["견적 기준", "종류·물량, 필요한 인원·차량·장비, 반출 조건, 처리 비용"],
  ["비대면 진행", "요청 시 가능하며 출입과 수거 대상을 사전 협의"],
  ["결과 확인", "상세한 작업 전후 사진 전달"],
  ["청소 요청", "함께 상담 가능하며 포함 범위와 비용은 별도 확인"],
  ["예약 문의", "현장 위치, 품목 사진, 희망 날짜를 기준으로 상담"],
];

const estimateChecklist = [
  "처리할 물건의 종류와 수량",
  "대략적인 크기·부피·무게",
  "분류나 포장이 필요한 상태인지",
  "물건이 놓인 위치와 반출 거리",
  "층수와 엘리베이터 사용 가능 여부",
  "필요한 인원·차량·장비",
  "분해 등 별도 작업 필요 여부",
  "폐기물 종류별 처리 비용",
  "수거 후 청소 요청 여부",
];

const includedCheckItems = [
  "실내에서 밖으로 옮기는 반출 작업",
  "차량 상차와 운반",
  "폐기물 처리 비용",
  "분해나 추가 장비 사용",
  "수거 후 청소",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][]; beforeAfter?: { label: string; before: string; after: string }[] }[] = [
  {
    title: "가정에서 정리할 물건",
    body: "이사나 집 정리 중 나온 가구·생활용품 등이 있다면 사진과 수량을 보내주세요. 침대, 소파, 장롱처럼 큰 물건은 대략적인 크기와 현재 위치도 알려주시면 좋습니다.",
    note: "품목별 처리 가능 여부와 반출에 필요한 작업을 함께 확인합니다.",
    photoPairs: [
      ["waste-site-01.webp", "waste-site-02.webp"],
      ["waste-bags-01.webp"],
    ],
  },
  {
    title: "사무실·상가에서 정리할 물건",
    body: "책상, 의자, 수납장 등 정리가 필요한 집기의 목록과 수량을 알려주세요. 물건 자체의 크기뿐 아니라 건물의 반출 시간, 엘리베이터와 차량 진입 조건도 중요합니다.",
    note: "전산기기나 보안 문서가 포함되어 있다면 일반 집기와 구분해 상담해 주세요.",
    beforeAfter: [
      { label: "사무실 집기 반출", before: "waste-office-before.webp", after: "waste-office-after.webp" },
      { label: "매장 집기 반출", before: "waste-store-before.webp", after: "waste-store-after.webp" },
    ],
  },
  {
    title: "실내 반출과 운반",
    body: "물건을 미리 건물 밖으로 옮기기 어렵다면 현재 놓인 위치에서 상담하실 수 있습니다. 실내 반출 가능 여부와 필요한 인원·장비를 확인해 견적에 반영합니다.",
    note: "큰 물건은 출입문이나 엘리베이터를 통과할 수 있는지, 분해가 필요한지도 확인해야 합니다. 무리해서 먼저 옮기거나 분해하실 필요는 없습니다.",
  },
  {
    title: "수거 후 청소",
    body: "물건을 비운 뒤 바닥이나 주변 공간의 청소가 필요하면 함께 요청해 주세요. 반출만 필요한지, 남은 먼지와 오염까지 청소할지에 따라 작업 범위가 달라집니다.",
    note: "폐기물처리 서비스에 공간 전체의 청소·소독·냄새 제거가 자동으로 포함되는 것은 아닙니다. 필요한 청소 범위와 비용을 별도로 확인합니다.",
  },
];

const separateNoticeItems = [
  "공사나 철거 과정에서 나온 폐기물",
  "정체를 알 수 없는 액체나 약품",
  "배터리, 가스용기 등 별도 취급 확인이 필요한 물품",
  "깨진 유리나 날카로운 물건",
  "내용물이 남아 있는 용기",
  "특수 오염이 있는 물품",
];

const extraCostItems = [
  "상담한 목록에 없던 물건이 추가되는 경우",
  "사진에 보이지 않던 수납장 내부 물량이 많은 경우",
  "예상보다 무겁거나 부피가 큰 물건인 경우",
  "분해 작업이 추가로 필요한 경우",
  "엘리베이터를 사용할 수 없어 계단 운반이 필요한 경우",
  "차량을 가까이 댈 수 없어 반출 거리가 길어지는 경우",
  "추가 차량이나 장비가 필요한 경우",
  "별도 취급이 필요한 품목이 확인되는 경우",
  "반출 후 청소를 추가로 요청하는 경우",
];

const processFlow = ["품목·사진 상담", "처리 가능 여부와 반출 조건 확인", "견적·일정 협의", "현장 수거 대상 확인", "반출·상차·운반", "협력업체 연계 처리", "작업 결과 확인"];

const processSteps: [string, string][] = [
  ["물건 사진과 위치 전달", "처리할 물건의 사진, 수량, 주소, 층수와 엘리베이터 유무를 알려주세요. 전체를 비울 예정인지 일부 물건만 처리할지도 확인합니다."],
  ["범위와 견적 협의", "수거할 품목과 반출 방법을 정합니다. 분해·장비·추가 인원이 필요한지, 청소까지 맡기실지도 함께 확인합니다."],
  ["수거 대상 확인", "현장에서 처리할 물건과 남길 물건을 구분합니다. 비대면이라면 사진이나 표시 등 사전에 정한 방법으로 대상을 확인합니다."],
  ["반출·상차·운반", "협의한 물건을 반출하고 차량에 상차해 운반합니다. 현장 조건이 사전 안내와 다르면 필요한 작업을 다시 확인합니다."],
  ["처리와 마무리 확인", "폐기물 종류에 맞춰 협력 처리업체와 연계합니다. 현장 작업 전후 사진을 전달하고, 추가로 요청하신 청소가 있다면 그 결과도 확인합니다."],
];

const photoChecklist = [
  "수거하기로 한 물건이 반출되었는지",
  "남겨두기로 한 물건이 그대로 있는지",
  "요청한 구역에 남은 물건이 있는지",
  "반출 후 공간 상태가 어떤지",
  "청소를 함께 요청했다면 합의한 범위가 완료되었는지",
];

const reservationChecklist = [
  "출입 방법과 작업 가능한 시간",
  "수거할 물건의 목록과 위치",
  "남겨둘 물건과 구분 표시",
  "판단이 필요한 상황의 연락 담당자",
  "작업 전후 사진을 받을 연락처",
  "완료 확인과 문단속 방법",
];

const checkupItems = [
  "합의한 품목과 수량의 반출 여부",
  "남길 물건의 상태와 위치",
  "추가·제외한 항목의 반영 여부",
  "반출 동선과 주변 공간의 상태",
  "별도 요청한 청소의 완료 여부",
  "작업 전후 사진 전달 여부",
  "사전 협의한 서류가 있다면 전달 여부",
];

const prepSections: [string, string][] = [
  ["버릴 물건과 남길 물건을 구분해 주세요", "물건마다 표시하거나 사진에 수거 대상을 표시해 보내주시면 좋습니다. 비슷한 가구가 여러 개 있다면 위치까지 함께 알려주세요. 헷갈릴 수 있는 물건은 “이건 남겨주세요”라는 표시 하나가 도움이 됩니다."],
  ["수납장과 가구 내부를 확인해 주세요", "서랍이나 수납장 안에 서류, 귀중품, 열쇠 등 남길 물건이 없는지 확인해 주세요. 직접 확인하기 어렵다면 내부 확인이 필요하다고 미리 말씀해 주세요."],
  ["큰 물건은 크기와 이동 경로를 알려주세요", "출입문, 복도, 엘리베이터를 통과하기 어려워 보이는 물건이 있다면 사진을 보내주세요. 분해가 필요할 수 있지만, 상담 전에 무리해서 직접 분해하실 필요는 없습니다."],
  ["건물의 반출 조건을 확인해 주세요", "주차 위치, 엘리베이터 사용, 관리실 협의, 작업 가능 시간을 알려주세요. 차량이 진입할 수 없는 골목이나 긴 계단이 있다면 함께 말씀해 주세요."],
  ["개인정보가 있는 물건은 별도로 구분해 주세요", "서류, 컴퓨터, 저장장치 등에 개인정보가 남아 있다면 수거 전에 처리 방법을 정해 주세요. 일반 폐기물 반출이 문서 파쇄나 데이터 삭제까지 의미하는 것은 아닙니다."],
  ["청소가 필요하면 미리 요청해 주세요", "물건만 비울지, 반출 후 바닥과 주변 공간까지 청소할지 정해 주세요. 청소가 필요한 구역과 상태를 함께 알려주시면 견적에 반영할 수 있습니다."],
];

const faqItems: [string, string][] = [
  ["찐청소가 직접 수거하나요?", "네. 찐청소가 직접 수집·운반을 진행하고, 폐기물 종류에 맞춰 협력 처리업체와 연계합니다."],
  ["처리업체와 협업하면 비용이 더 저렴한가요?", "협업을 통해 비용에 유리한 조건을 검토할 수 있습니다. 다만 종류와 물량, 인원·차량·반출 여건에 따라 달라지므로 일괄적인 최저가를 보장하지는 않습니다."],
  ["집 안에서 내려주는 작업과 처리까지 모두 포함되나요?", "실내 반출, 운반과 최종 처리 범위를 견적에서 구분합니다. 요청 시 비대면과 전후 사진 전달이 가능하고, 비워진 공간 청소는 포함 범위와 비용을 별도로 상담할 수 있습니다."],
  ["가구 한두 개도 상담할 수 있나요?", "품목 사진과 위치를 보내주시면 수거 가능 여부와 비용을 확인해 드립니다. 소량이라도 차량 이동과 작업 인원 등의 조건이 반영될 수 있습니다."],
  ["엘리베이터가 없어도 가능한가요?", "층수와 계단 구조, 물건의 크기·무게를 확인해야 합니다. 필요한 인원과 반출 가능 여부에 따라 견적이 달라질 수 있습니다."],
  ["큰 가구는 분해해서 가져가나요?", "분해가 필요한지와 가능한 작업인지 먼저 확인합니다. 모든 가구의 분해가 자동으로 포함되는 것은 아니므로 사진과 크기를 알려주세요."],
  ["차량 한 대 가격이면 모든 비용이 포함되나요?", "차량 기준만으로 판단하지 마세요. 인력 반출, 운반, 처리비, 분해와 장비 비용 등이 어디까지 포함되는지 견적에서 확인해야 합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진을 바탕으로 상담할 수 있습니다. 다만 실제 물량이나 무게, 반출 조건이 사진과 다르면 현장 확인 후 견적이 조정될 수 있습니다."],
  ["비대면으로 맡길 수 있나요?", "네. 출입과 수거 대상을 사전에 협의하면 가능합니다. 작업 전후 사진도 자세히 보내드립니다."],
  ["폐기물처리 후 청소까지 해주시나요?", "청소도 함께 요청하실 수 있습니다. 다만 폐기물처리 비용에 공간 전체 청소가 기본으로 포함되는 것은 아니며, 작업 범위와 비용을 별도로 확인합니다."],
  ["어떤 폐기물이든 모두 처리할 수 있나요?", "아닙니다. 종류와 상태를 먼저 확인해야 합니다. 공사 폐기물, 약품, 액체, 별도 취급이 필요한 물품 등은 일반 물건과 구분해 알려주세요."],
  ["처리 관련 서류를 받을 수 있나요?", "필요한 서류명과 용도를 상담 단계에서 알려주세요. 해당 품목과 처리 방식에 따라 발급 가능 여부를 확인해야 합니다. 작업 전후 사진이 처리 증빙 서류를 대신하는 것은 아닙니다."],
  ["당일 수거도 가능한가요?", "현장 위치와 품목, 차량·인원 일정에 따라 달라집니다. 희망 시간을 알려주시면 가능 여부를 확인해 안내합니다."],
];

const contactChecklist = [
  "현장 위치",
  "처리할 물건의 사진과 수량",
  "큰 물건의 대략적인 크기",
  "층수와 엘리베이터 유무",
  "실내 반출이 필요한지",
  "주차 위치와 차량 진입 조건",
  "희망 날짜와 완료해야 하는 시간",
  "비대면 진행 여부",
  "반출 후 청소 요청 여부",
];

const path = "/폐기물처리/";

export default function WasteDisposalLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "폐기물처리",
      serviceType: "폐기물처리·가구 수거",
      description: "이사 후 남은 가구나 사무실 정리 중 나온 물품을 처리해야 하나요? 찐청소는 수거 대상과 물량을 확인해 직접 수집·운반하고, 종류에 맞는 협력 처리업체와 연계합니다. 반출 조건과 처리 비용을 구분해 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "폐기물처리", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/waste-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>폐기물처리</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">특수청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">가구 수거부터 사무실 폐기물까지, 품목과 반출 조건을 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>이사 후 남은 가구나 사무실 정리 중 나온 물품을 처리해야 하나요? 찐청소는 수거 대상과 물량을 확인해 직접 수집·운반하고, 종류에 맞는 협력 처리업체와 연계합니다. 반출 조건과 처리 비용을 구분해 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">폐기물처리 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="폐기물처리 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["같은 개수라도 ","놓인 위치에 따라 "]}>폐기물처리 비용은 집의 평수나 물건 개수만으로 정하기 어렵습니다. 같은 개수라도 크기와 무게, 재질, 놓인 위치에 따라 필요한 인원과 차량, 처리 비용이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["반출 여건을 확인해 "]}>찐청소는 실제 처리할 품목과 물량, 반출 여건을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">어떤 물건을 얼마나 처리하는지 확인합니다</h3>
            <ReadingParagraph className="mt-2">가볍지만 부피가 큰 물건과 작지만 무거운 물건은 운반 조건이 다릅니다. 서로 다른 종류가 섞여 있거나 내용물을 먼저 분류해야 하는 경우에도 작업량이 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">직접 수집·운반하고 처리업체와 협업합니다</h3>
            <ReadingParagraph className="mt-2">찐청소가 현장의 수집·운반을 직접 진행합니다. 이후 처리 과정은 폐기물 종류에 맞춰 협력 처리업체와 연계합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">협업을 통해 비용에 유리한 조건을 검토할 수 있지만, 모든 품목을 같은 가격에 처리하거나 항상 가장 저렴하다고 약속드리지는 않습니다. 실제 물량과 작업 조건에 맞는 견적을 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">차량 비용만인지, 전체 처리 비용인지 확인하세요</h3>
            <ReadingParagraph className="mt-2">차량 한 대를 기준으로 안내받더라도 적재할 물건의 종류와 실제 물량에 따라 조건이 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 비교하실 때는 다음 항목의 포함 여부를 확인해 주세요.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">물건을 가져가는 비용과 최종 처리까지 포함한 비용을 구분해서 보는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 수거·처리 가능 품목 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="수거·운반 범위와 처리 가능 품목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">장롱·책상·의자, 품목과 크기를 함께 알려주세요</h3>
            <ReadingParagraph className="mt-2 mb-6">같은 수량이라도 크기와 재질, 분해 필요 여부에 따라 작업이 달라집니다. 계단·승강기와 차량 접근 조건을 함께 확인합니다. 가구 수거 요청이 재사용품 매입이나 무료 수거를 뜻하지는 않으며, 품목별 처리 가능 여부를 먼저 안내합니다.</ReadingParagraph>
            <ReadingParagraph>처리 가능 여부는 품목과 상태를 확인한 뒤 안내합니다. &lsquo;폐기물&rsquo;이라는 이름으로 모든 종류를 동일하게 수거하는 것은 아닙니다.</ReadingParagraph>

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
                              <Image src={`/images/portfolio-v2/${pair.before}`} alt={`${pair.label} 전`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
                              <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
                            </div>
                            <div className="relative">
                              <Image src={`/images/portfolio-v2/${pair.after}`} alt={`${pair.label} 후`} width={480} height={480} className="aspect-square w-full object-cover" sizes="(min-width: 768px) 170px, 50vw" />
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

            <ReadingParagraph className="mt-6 font-bold text-brand-dark">반드시 별도로 알려주실 품목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {separateNoticeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">이런 품목은 일반 물건에 섞지 말고, 사진과 내용을 먼저 알려주세요. 상담 전에 임의로 처리 가능하다고 판단하지 않으며, 취급 가능 여부와 필요한 절차를 별도로 확인합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>견적은 처음 확인한 품목과 물량, 반출 조건을 기준으로 정합니다. 실제 조건이 달라지면 비용 조정이 필요할 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사진을 보낼 때는 버릴 물건 전체와 반출 동선이 함께 보이도록 전달해 주세요. 추가 작업이 필요한 경우 범위와 비용을 어떻게 협의할지도 계약 전에 확인하면 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="폐기물처리 진행 순서와 소요 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">청소를 함께 요청하셨다면 협의한 범위의 청소도 진행합니다.</ReadingParagraph>

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
            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">품목과 물량, 분해 여부, 계단 운반과 차량 접근 조건에 따라 달라집니다. 소량 수거와 집 전체를 비우는 작업은 같은 시간으로 안내하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">이사나 퇴실처럼 맞춰야 하는 시간이 있다면 상담 시 먼저 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/결과확인 */}
          <section id="photos" className="scroll-mt-36">
            <SectionTitle id="photos-title" kicker="05" title="작업 전후 사진과 처리 결과 확인" />
            <ReadingParagraph>찐청소는 작업 전후 사진을 자세히 촬영해 보내드립니다. 현장에 없으셔도 요청한 물건이 반출되었는지 확인하실 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">사진으로 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {photoChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">다만 현장 사진은 반출 결과를 확인하는 자료입니다. 최종 처리 내역을 증명하는 서류와는 다릅니다. 회사 제출용이나 관리상 필요한 처리 관련 서류가 있다면, 견적 단계에서 필요한 서류명과 발급 가능 여부를 확인해 주세요.</ReadingParagraph>
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/비대면 예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 비대면 예약" />
            <ReadingParagraph>현장 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다. 품목 사진과 반출 조건이 함께 있으면 상담이 더 수월합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">현장에 없어도 진행할 수 있나요?</h3>
            <ReadingParagraph className="mt-2">네. 원하시면 비대면으로 진행할 수 있습니다. 출입 방법과 수거 대상을 명확히 정하고, 작업 전후 사진으로 결과를 전달합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">비대면 진행 전 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">원하는 시간에 수거할 수 있나요?</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="text-[15.5px]">희망 날짜와 시간을 알려주시면 인원·차량 일정과 건물 조건을 확인합니다. 모든 지역의 즉시 수거나 당일 작업을 일괄적으로 약속드리지는 않습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">관리실에서 정한 반출 시간이 있다면 예약 전에 알려주세요.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 사후 문의" />
            <ReadingParagraph>검수는 처음 협의한 수거 목록을 기준으로 진행합니다. 물건이 줄어든 모습만 보기보다 요청한 대상이 정확히 처리되었는지 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5">누락이 의심되거나 확인할 부분이 있다면 해당 물건이나 구역의 사진과 함께 문의해 주세요. 재방문과 추가 작업의 범위·비용은 실제 요청 내용과 계약 기준에 따라 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">폐기한 물건은 되찾기 어려울 수 있으므로, 수거 대상 구분은 반출 전에 마무리하는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="수거 전 준비사항" />
            <div className="mt-4 space-y-5">
              {prepSections.map(([title, body]) => (
                <div key={title}>
                  <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                  <ReadingParagraph className="mt-2">{body}</ReadingParagraph>
                </div>
              ))}
            </div>
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
              <ReadingParagraph className="text-xl font-bold">폐기물처리 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">무엇을 어떻게 버려야 할지 모르겠다면 물건 사진과 위치부터 보내주세요. 직접 옮기거나 차량 적재량을 계산해서 문의하실 필요는 없습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">찐청소가 직접 수집·운반하고, 협력 처리업체와 연계해 진행합니다. 처리 가능한 품목과 견적에 포함되는 범위를 확인한 뒤 결정하세요.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>폐기물처리 견적 문의하기 →</CtaButton>
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
