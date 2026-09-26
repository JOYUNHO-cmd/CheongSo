import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks } from "@/components/service-pages/ServiceConnections";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
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
  ["청소 대상", "주택·사무실·상가 등의 인테리어·리모델링 후 공간"],
  ["공사 유형", "전체 리모델링과 주방·욕실·창호 등 부분공사"],
  ["주요 확인", "공사 분진, 마감 잔여물, 보양재와 기존 생활 오염"],
  ["견적 기준", "필요한 인원, 장비·약품, 구조와 실제 작업량"],
  ["범위 구분", "공사 구역, 주변 구역, 가구·가전, 잔여물 처리"],
  ["일정 조율", "공사·보수·설치 종료와 입주·영업 재개 일정 반영"],
  ["예약 문의", "010-9882-8882"],
];

const estimateChecklist = [
  "전체 면적과 청소할 구역",
  "공사한 부위와 공사 내용",
  "분진과 마감 잔여물의 상태",
  "바닥·벽면·가구 등의 재질",
  "보양재와 접착 흔적 제거 여부",
  "기존 가구·가전·짐의 유무",
  "생활 오염을 함께 청소할 범위",
  "필요한 인원과 장비·약품",
  "작업 가능한 일정과 반입 조건",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥과 가장자리",
    body: "바닥 재질과 새 마감 상태를 확인해 분진과 제거 가능한 오염을 청소합니다. 벽 쪽 가장자리, 문 주변, 모서리 등 먼지가 남기 쉬운 구간도 살펴봅니다.",
    note: "접착제·도료·보호재 잔여물은 일반 먼지와 구분합니다. 바닥 코팅, 연마, 들뜸이나 흠집 보수는 별도 작업입니다.",
    photoPairs: [["interior-floor-01.webp", "interior-floor-02.webp"], ["interior-floor-03.webp", "interior-floor-04.webp"]],
  },
  {
    title: "창틀과 유리",
    body: "창틀과 프레임에 남은 분진, 요청한 유리 면의 오염을 확인합니다. 창호 교체 후 보호필름이나 라벨이 남아 있다면 제거할 대상인지 먼저 확인합니다.",
    note: "유리의 어느 면까지 청소할지, 방충망과 창문 탈거가 필요한지도 범위에 반영합니다. 접근이 어려운 외창은 별도 검토가 필요합니다.",
    photoPairs: [["interior-window-01.webp", "interior-window-02.webp"], ["interior-window-03.webp"]],
  },
  {
    title: "주방과 새 수납 공간",
    body: "싱크대, 상판, 수납장 등 요청 부위의 공사 먼지와 잔여물을 살펴봅니다. 수납장 내부와 서랍·선반 탈거는 구조와 상태에 따라 작업 여부를 정합니다.",
    note: "기존 주방을 그대로 사용한다면 생활 기름때 청소를 포함할지도 확인합니다. 가전 내부·분해 세척은 공간 청소와 구분합니다.",
    photoPairs: [["interior-kitchen-01.webp", "interior-kitchen-02.webp"], ["interior-kitchen-03.webp", "interior-kitchen-04.webp"]],
  },
  {
    title: "욕실과 세면 공간",
    body: "바닥, 벽면, 세면대, 변기 등 합의한 부위의 분진과 표면 오염을 확인합니다. 새로 시공된 줄눈·실리콘과 제거할 잔여물을 구분하고, 청소를 시작해도 되는 상태인지 시공 담당자의 안내를 확인합니다.",
    note: "배관 작업, 누수 보수, 줄눈·실리콘 재시공은 별도입니다.",
    photoPairs: [["interior-bathroom-01.webp", "interior-bathroom-02.webp"], ["interior-bathroom-03.webp", "interior-bathroom-04.webp"]],
  },
  {
    title: "문·몰딩·벽면",
    body: "문과 문틀, 몰딩 등 요청한 표면의 먼지와 오염을 확인합니다. 벽지, 도장면, 필름 마감 등은 재질과 시공 상태에 따라 가능한 작업이 다릅니다.",
    note: "모든 표면을 같은 방식으로 세척하지 않습니다. 새 마감재의 취급 제한과 관리 지침이 있다면 작업 전에 전달해 주세요.",
    photoPairs: [["interior-door-01.webp", "interior-door-02.webp"], ["interior-door-03.webp", "interior-door-04.webp"]],
  },
  {
    title: "공사하지 않은 주변 공간",
    body: "부분공사라면 주변 방과 복도, 출입 동선 등 실제 분진이 남은 곳을 확인합니다.",
    note: "공사 구역 밖이라고 무조건 제외하거나, 집 전체를 무조건 청소해야 한다고 정하지 않습니다. 현재 상태와 고객님의 요청을 함께 확인해 범위를 정합니다.",
    photoPairs: [["interior-area-01.webp", "interior-area-02.webp"], ["interior-area-03.webp", "interior-area-04.webp"]],
  },
  {
    title: "남아 있는 가구와 생활용품",
    body: "짐이 있는 현장은 공간 청소와 물품 자체의 청소를 구분해야 합니다. 가구 주변 바닥을 청소할지, 가구 표면까지 닦을지, 물건 이동이 필요한지 확인합니다.",
    note: "침구·의류·소파·가전 내부의 전문 세척이나 정리수납은 일반 공간 청소에 자동으로 포함되지 않습니다.",
    photoPairs: [["interior-furniture-01.webp", "interior-furniture-02.webp"], ["interior-furniture-03.webp", "interior-furniture-04.webp"]],
  },
  {
    title: "보양재와 공사 잔여물",
    body: "보양지, 테이프, 보호필름은 제거 대상과 시점을 먼저 확인합니다. 추가 공사 때문에 유지해야 하는 보호재는 임의로 제거하지 않습니다.",
    note: "보양재를 걷는 작업, 접착 흔적을 제거하는 작업, 나온 잔여물을 반출하는 작업은 구분해 범위와 비용을 정합니다.",
    photoPairs: [["interior-protect-01.webp", "interior-protect-02.webp"], ["interior-protect-03.webp", "interior-protect-04.webp"]],
  },
];

const extraCostItems = [
  "공사 구역 외에 주변 공간 청소를 추가하는 경우",
  "기존 주방·욕실의 생활 오염 제거를 추가하는 경우",
  "가구와 짐의 이동이 필요한 경우",
  "예상보다 많은 보양재와 접착 흔적이 남은 경우",
  "도료·시멘트계 잔여물 등 별도 제거가 필요한 경우",
  "외창이나 높은 곳의 작업을 요청하는 경우",
  "대량 자재·폐기물 반출이 필요한 경우",
  "추가 공사 후 다시 방문해야 하는 경우",
];

const processSteps: [string, string][] = [
  ["공사 내용과 현재 상태 상담", "주소, 구조, 공사한 부위, 남은 작업과 오염 상태를 확인합니다. 전체 리모델링인지, 살고 있는 상태에서 진행한 부분공사인지도 알려주세요."],
  ["작업 범위와 견적 안내", "공사 구역과 주변 공간, 새 마감재와 기존 시설을 구분합니다. 필요한 인원과 장비·약품, 포함·제외 항목을 안내합니다."],
  ["마감 상태와 작업 조건 확인", "청소를 시작해도 되는 시점과 자재별 관리 지침을 확인합니다. 제거할 보호재, 남겨둘 물건, 기존 파손이나 시공상 확인이 필요한 부분도 살펴봅니다."],
  ["공간별 청소", "합의한 범위에 따라 분진과 제거 가능한 잔여물을 정리합니다. 예상하지 못한 손상이나 작업 제한이 발견되면 해당 부분을 안내합니다."],
  ["마무리와 결과 확인", "처음 정한 항목과 주요 오염 구간을 확인합니다. 청소로 정리한 부분과 시공팀의 보수·확인이 필요한 부분을 구분합니다."],
];

const caseChecklist = [
  "바닥 가장자리와 모서리의 분진",
  "창틀과 프레임의 먼지",
  "청소 범위에 포함된 수납장 내부",
  "욕실과 주방의 마감 잔여물",
  "보양재 제거 후 작업 부위",
  "부분공사 주변 공간의 분진",
  "처음 집중 청소를 요청한 곳",
];

const reservationChecklist = [
  "먼지가 발생하는 공정의 종료",
  "도장·줄눈 등 마감재별 작업 가능 시점",
  "보수와 재시공 일정",
  "보양재 제거 시점",
  "가구·가전·조명 등의 설치",
  "청소와 완료 확인",
  "이삿짐·상품 반입",
  "입주 또는 영업 재개",
];

const prepItems = [
  "공사한 공간과 청소할 공간을 구분해 주세요.",
  "남아 있는 공정과 보수 일정을 알려주세요.",
  "자재별 관리 지침과 청소 가능 시점을 확인해 주세요.",
  "제거할 보양재와 유지할 보호재를 표시해 주세요.",
  "기존 가구·가전·생활용품의 이동 범위를 정해 주세요.",
  "귀중품과 중요 문서는 따로 보관해 주세요.",
  "기존 파손이나 시공상 확인이 필요한 부분을 알려주세요.",
  "자재와 폐기물 처리 담당을 정해 주세요.",
  "전기·수도·배수와 장비 반입 조건을 확인해 주세요.",
  "입주·영업 재개와 물품 반입 시간을 알려주세요.",
];

const faqItems: [string, string][] = [
  ["인테리어청소와 입주청소는 어떻게 다른가요?", "이 페이지에서는 인테리어·리모델링 후 생긴 분진과 마감 잔여물을 중심으로 안내합니다. 입주 전 청소와 겹칠 수 있으므로 이름보다 공사 내용과 실제 오염, 작업 범위를 확인하는 것이 중요합니다."],
  ["인테리어청소 비용은 평당으로 정하나요?", "찐청소는 평수만으로 정하지 않습니다. 공사 내용, 오염 상태, 짐의 유무와 요청 범위를 확인해 필요한 인원과 장비·약품을 기준으로 안내합니다."],
  ["욕실만 리모델링했는데 집 전체 청소가 필요한가요?", "공사 규모만으로 정하지 않습니다. 욕실 밖 복도·방·수납 공간에 분진이 퍼진 범위를 확인해 필요한 구역을 정합니다. 공사 전후 사진과 보양 상태가 상담에 도움이 됩니다."],
  ["공사하지 않은 곳의 기름때나 물때도 청소하나요?", "원하시면 함께 요청할 수 있습니다. 공사 분진 청소와 기존 생활 오염 제거를 구분해 작업 범위와 비용에 반영합니다."],
  ["짐과 가구가 있는 상태에서도 가능한가요?", "배치와 접근 가능한 구간을 확인해야 합니다. 물품 이동과 가구 자체의 청소는 구분하며, 빈집과는 작업 시간과 범위가 달라질 수 있습니다."],
  ["보호필름과 보양지는 모두 제거하나요?", "제거할 대상과 시점을 확인한 뒤 진행합니다. 추가 공사 때문에 남겨야 하는 보호재나 시공팀 확인이 필요한 부착물은 임의로 제거하지 않습니다."],
  ["본드·페인트·백시멘트 흔적도 모두 없어지나요?", "오염의 종류와 마감재, 고착 상태에 따라 결과가 다릅니다. 필요한 경우 일부 구간을 확인해 작업 가능 범위와 예상 결과를 안내합니다."],
  ["공사가 끝난 날 바로 청소할 수 있나요?", "남은 공정과 마감재의 작업 가능 시점을 확인해야 합니다. 종료 날짜만으로 정하지 않고, 시공 담당자의 안내와 현장 상태를 함께 검토합니다."],
  ["가구와 가전 설치는 청소 전후 중 언제 하는 게 좋나요?", "설치 때 먼지가 발생하는지, 반입 후 바닥과 주변에 접근할 수 있는지에 따라 달라집니다. 설치 내용을 알려주시면 전체 일정에 맞춰 순서를 검토합니다."],
  ["페인트 냄새나 새집 냄새도 없어지나요?", "일반 청소로 모든 냄새나 유해물질이 제거된다고 보장하지 않습니다. 표면 오염 제거와 별도 냄새·실내공기 관련 서비스는 구분해서 확인해야 합니다."],
  ["공사 폐기물도 포함되나요?", "분진 청소와 자재·폐기물 반출은 다른 작업입니다. 남은 물품의 종류와 양, 처리 담당을 확인해 포함 여부와 비용을 정합니다."],
  ["청소 후 보수공사를 하면 다시 방문해 주나요?", "보수공사 후 생긴 오염의 재청소는 최초 작업의 미흡한 부분과 구분합니다. 추가 방문이 필요하다면 포함 범위와 비용을 미리 확인해 주세요."],
];

const contactChecklist = [
  "현장 주소와 공간의 용도",
  "면적과 공사한 구역",
  "공사 내용과 현재 진행 상태",
  "전체 공간과 주요 잔여물 사진",
  "가구·가전·짐의 유무",
  "기존 공간의 생활 오염 청소 요청",
  "보양재 제거와 폐기물 처리 요청",
  "남은 공정과 설치 일정",
  "희망 청소일과 입주·영업 재개일",
  "전기·수도·주차·출입 조건",
];

const cases = [
  { id: "interior-case-gym", title: "수원 헬스장 청소", before: "interior-case-gym-before.webp", after: "interior-case-gym-after.webp", beforeWidth: 1650, beforeHeight: 2200, afterWidth: 1650, afterHeight: 2200 },
  { id: "interior-case-soccer", title: "박주호축구교실 청소", before: "interior-case-soccer-before.webp", after: "interior-case-soccer-after.webp", beforeWidth: 1650, beforeHeight: 2200, afterWidth: 1650, afterHeight: 2200 },
  { id: "interior-case-lakeside", title: "에버랜드 필란드셋방 청소", before: "interior-case-lakeside-before.webp", after: "interior-case-lakeside-after.webp", beforeWidth: 1650, beforeHeight: 2200, afterWidth: 1650, afterHeight: 2200 },
  { id: "interior-case-candy", title: "에버랜드 캔디샾 청소", before: "interior-case-candy-before.webp", after: "interior-case-candy-after.webp", beforeWidth: 1080, beforeHeight: 1440, afterWidth: 1080, afterHeight: 1440 },
];
const path = "/인테리어청소/";

export default function InteriorCleaningLanding() {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "인테리어청소",
      serviceType: "인테리어청소",
      description: "주방·욕실·창호 공사 뒤 주변 방까지 먼지가 퍼졌거나, 리모델링 후 바닥과 수납장에 분진이 남았나요? 찐청소는 공사한 구역과 주변으로 오염이 번진 구역을 나눠 인테리어청소 범위를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "인테리어청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/interior-hero.webp" alt="" fill className="scale-110 object-cover blur-2xl" sizes="25vw" />
          <Image src="/images/hero-bg/interior-hero.webp" alt="" fill priority className="object-contain" sizes="100vw" />
          <div className="absolute inset-0 hidden bg-gradient-to-br from-brand-dark/78 to-brand/60 md:block" />
        </div>
        <div className="relative mx-auto my-auto w-full max-w-5xl pt-8 md:pt-0">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>인테리어청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">이사·입주청소</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">리모델링·부분공사 후 청소, 새 마감과 남은 짐을 함께 살펴봅니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>주방·욕실·창호 공사 뒤 주변 방까지 먼지가 퍼졌거나, 리모델링 후 바닥과 수납장에 분진이 남았나요? 찐청소는 공사한 구역과 주변으로 오염이 번진 구역을 나눠 인테리어청소 범위를 안내합니다.</ReadingParagraph>
            <ReadingParagraph>인테리어는 마음에 드는데 마지막 기억이 먼지 닦기일 필요는 없으니까요. 사용할 날짜에 맞춰 청소 범위와 순서부터 정하겠습니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">인테리어청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="인테리어청소 비용과 견적 산정 기준" />
            <ReadingParagraph>인테리어청소 비용은 면적만으로 정하기 어렵습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["같은 평수라도 ","가구와 짐의 유무에 따라 "]}>같은 평수라도 공사 내용, 남은 분진과 잔여물, 마감재, 가구와 짐의 유무에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 현장의 실제 작업량을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">전체 공사와 부분공사는 확인할 범위가 다릅니다</h3>
            <ReadingParagraph className="mt-2">전체 리모델링은 공간별 마감 상태와 잔여물을 폭넓게 확인해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">부분공사는 공사한 구역뿐 아니라 주변 공간의 상태도 살펴봅니다. 공사 면적이 작더라도 작업자 이동 구간이나 주변 방에 분진이 남았다면 청소할 범위가 달라질 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">반대로 주변에 오염이 없다면 필요한 구역만 정해 상담할 수 있습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">새로 시공한 곳과 기존 공간을 나눕니다</h3>
            <ReadingParagraph className="mt-2">새 주방의 공사 분진을 정리하는 작업과 기존 욕실의 물때를 제거하는 작업은 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">공사 후 청소를 맡기면서 기존 공간의 생활 오염도 함께 정리하고 싶다면 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">공사 오염과 생활 오염을 구분해 실제 필요한 작업을 견적에 반영합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">견적에 반영되는 주요 항목</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">공사 전 사진보다 현재 작업할 상태의 사진이 견적에 도움이 됩니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="공간별 청소 범위와 제외 항목" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">공사하지 않은 방의 먼지도 알려주세요</h3>
            <ReadingParagraph className="mt-2 mb-6">공사 분진이 이동한 범위와 기존 생활 오염을 구분합니다. 남아 있는 가구·가전의 보호 상태와 청소할 표면을 확인하고, 새로 시공한 마감재의 양생과 보수 일정에 맞춰 작업합니다. 도료나 접착제 잔여물은 일반 먼지와 별도로 확인합니다.</ReadingParagraph>
            <ReadingParagraph>인테리어청소는 공사 내용과 실제 오염을 기준으로 작업 범위를 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">아래 항목이 모든 견적에 자동으로 포함되는 것은 아닙니다. 공간별 청소와 탈거·이동·별도 제거 작업을 구분해 안내합니다.</ReadingParagraph>

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
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생하는 경우" />
            <ReadingParagraph>처음 확인한 범위보다 작업이 늘어나거나 현장 조건이 달라지면 견적이 달라질 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 작업이 필요하면 내용과 비용을 확인하고 진행 범위를 정합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">인테리어 업체가 정리할 항목과 청소팀에 맡길 항목을 미리 나누면 견적을 비교하기도 쉽습니다.</ReadingParagraph>
          <BackToContents />
          </section>


          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="인테리어청소 진행 순서와 소요 시간" />
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 시간은 얼마나 걸리나요?</h3>
            <ReadingParagraph className="mt-2">면적, 공사 내용, 잔여물 상태, 짐의 유무와 투입 인원에 따라 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2">부분공사라도 물품을 옮기거나 여러 공간을 나누어 작업해야 한다면 시간이 더 필요할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사용 시작일뿐 아니라 검수와 물품 정리에 필요한 시간도 함께 고려해 일정을 안내합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인" />
            <ReadingParagraph>인테리어청소 결과는 새 마감재의 광택보다 남아 있던 오염이 정리됐는지를 확인하는 것이 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4">다음 구역을 함께 살펴보면 좋습니다.</ReadingParagraph>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">가능하면 비슷한 위치와 조명에서 전후 상태를 비교해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">기존 흠집이나 시공 흔적을 청소 후 새로 발견할 수도 있으므로, 작업 전에 확인 가능한 상태를 함께 살펴보는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">사진이나 완료 자료가 필요하면 촬영 구역과 제공 가능 범위를 상담 시 확인해 주세요.</ReadingParagraph>

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
            <ReadingParagraph className="mt-4">청소 날짜는 인테리어 업체가 안내한 종료일뿐 아니라 실제 남아 있는 공정을 기준으로 검토해야 합니다.</ReadingParagraph>

            <ReadingParagraph className="mt-5 font-bold text-brand-dark">함께 확인할 일정</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">청소 후 타공이나 절단, 보수 작업이 예정되어 있다면 다시 오염될 수 있습니다. 가능한 순서를 시공팀과 함께 맞춰주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">살고 있는 집의 부분공사라면</h3>
            <ReadingParagraph className="mt-2">가족이 사용할 공간과 청소할 구역을 나누어 검토합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">아이와 반려동물의 생활 동선, 재택근무 시간, 물품을 옮길 위치 등을 미리 알려주시면 작업 가능 여부와 순서를 정하는 데 도움이 됩니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 7. 검수/사후확인 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수와 사후 확인" />
            <h3 className="text-lg font-bold text-brand-dark">합의한 구역과 항목을 기준으로 확인합니다</h3>
            <ReadingParagraph className="mt-2">공사한 공간만 포함했는지, 주변 방이나 기존 주방·욕실도 청소하기로 했는지 작업 범위를 기준으로 검수합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">제거하기로 한 보양재와 남겨두기로 한 보호재도 구분합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 시공 보수는 다릅니다</h3>
            <ReadingParagraph className="mt-2">도장 얼룩, 필름 들뜸, 타일 파손, 흠집 등은 청소로 해결하는 작업이 아닐 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">제거 가능한 오염과 시공팀의 확인이 필요한 상태를 구분해 안내합니다. 인테리어청소가 전문 하자 점검을 대신하거나 시공 품질을 보증하지는 않습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">미흡한 부분은 위치와 상태를 알려주세요</h3>
            <ReadingParagraph className="mt-2">작업 범위 안에서 추가 확인이 필요한 곳은 해당 위치와 상태를 알려주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">작업 내용과 현장을 확인해 후속 처리 방법을 안내합니다. 접수와 처리 조건은 예약 전에 확인해 주세요.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">추가 공사 후 재청소는 구분합니다</h3>
            <ReadingParagraph className="mt-2">최초 청소가 미흡했던 부분과, 이후 설치·보수로 새로 생긴 오염은 다릅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">추가 방문이 필요한 일정이라면 처음부터 횟수와 범위, 비용 포함 여부를 확인하는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="인테리어청소 전 준비사항" />
            <ul className="mt-4 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 전에 공사 흔적을 전부 정리해 두실 필요는 없습니다. 누가 어디까지 정리할지 먼저 맞추는 것이 중요합니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">인테리어청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">몇 평인지와 함께, 어디를 어떻게 공사했는지 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">전체 리모델링을 마친 빈 공간인지, 살고 있는 집에서 욕실만 공사했는지, 기존 시설의 생활 오염까지 정리하고 싶은지에 따라 작업 구성이 달라집니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>인테리어청소 견적 문의하기 →</CtaButton>
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
