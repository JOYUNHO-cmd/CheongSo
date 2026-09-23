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
  ["scope", "바닥 재질·청소 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인·관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "사무실·상가·학원·주거 공간 등 바닥 세척이 필요한 현장"],
  ["작업 범위", "합의한 바닥 구역의 오염 제거와 마무리 정리"],
  ["사전 확인", "바닥 재질, 기존 코팅, 찌든 때와 손상 상태"],
  ["견적 기준", "필요한 인원, 장비·약품, 실제 작업 면적, 집기와 동선"],
  ["별도 확인", "집기 이동, 왁스 박리, 코팅, 본드 제거, 바닥 보수"],
  ["일정 안내", "작업 시간과 건조·사용 재개 시간을 구분"],
  ["서비스 지역·예약", "현장 위치와 사진, 희망 일정을 기준으로 상담"],
];

const estimateChecklist = [
  "바닥 재질과 실제 작업 면적",
  "찌든 때, 기름때, 얼룩 등 오염 상태",
  "기존 왁스·코팅의 유무와 상태",
  "가구·집기의 양과 이동 가능 여부",
  "모서리, 계단, 좁은 구역 등 공간 구조",
  "필요한 인원과 장비·약품",
  "급수·배수와 전원 사용 여건",
  "작업 가능 시간과 사용 재개 일정",
  "별도 박리·코팅·본드 제거 필요 여부",
];

const includedCheckItems = [
  "바닥 세척과 마무리 정리",
  "기존 왁스층 제거가 필요한 경우의 박리",
  "별도로 요청하는 코팅",
  "본드·페인트 등 특수 오염 제거",
  "자재 손상 보수",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "데코타일 등 기존 코팅이 있는 바닥",
    body: "표면 오염인지, 기존 코팅층에 남은 흔적인지 먼저 확인합니다. 세척으로 정리할 수 있는 부분과 박리 등 추가 작업이 필요한 부분을 구분합니다.",
    note: "검게 보이는 자국이라도 모두 같은 오염은 아닙니다. 마모나 변색처럼 청소 후에도 남을 수 있는 흔적이 있는지 함께 살펴봅니다.",
    photoPairs: [["floorclean-decotile-01.webp", "floorclean-decotile-02.webp"], ["floorclean-decotile-03.webp", "floorclean-decotile-04.webp"]],
  },
  {
    title: "포세린타일 등 타일 바닥",
    body: "타일 제품과 표면 질감, 오염 상태를 확인합니다. 물걸레질 후 남는 얼룩이 생활 오염인지, 세정제나 시공 잔여물인지도 구분할 필요가 있습니다.",
    note: "타일 표면 세척과 줄눈 세척은 작업 범위를 따로 확인합니다. 줄눈 보수·재시공이나 타일 코팅이 자동으로 포함되는 것은 아닙니다.",
    photoPairs: [["floorclean-porcelain-01.webp", "floorclean-porcelain-02.webp"], ["floorclean-porcelain-03.webp", "floorclean-porcelain-04.webp"]],
  },
  {
    title: "마루·석재 등 별도 확인이 필요한 바닥",
    body: "재질과 표면 마감에 따라 물과 약품, 장비를 적용하는 조건이 달라집니다. 사진과 제품 정보를 확인해 작업 가능 여부와 방법을 안내합니다.",
    note: "바닥 재질을 정확히 모르셔도 괜찮습니다. 추측해서 알려주시기보다 전체 사진과 가까이 촬영한 사진을 보내주세요.",
  },
  {
    title: "모서리와 집기 주변",
    body: "벽과 바닥이 만나는 가장자리, 책상과 진열장 주변 등 필요한 구역을 협의합니다. 기계가 들어가기 어려운 부분과 집기를 옮겨야 접근할 수 있는 부분도 확인합니다.",
    note: "가구 아래까지 작업하려면 이동 가능 여부와 담당 범위를 미리 정해야 합니다. 움직이지 않는 고정 집기 아래까지 자동으로 청소되는 것은 아닙니다.",
  },
  {
    title: "마무리 정리",
    body: "세척 후 작업 구역의 오염 잔여물과 물기 등을 확인하고 마무리합니다. 마감 상태와 출입 가능 시점을 확인한 뒤 공간을 다시 사용하도록 안내합니다.",
    note: "청소가 끝났다는 이유만으로 모든 바닥을 즉시 평소처럼 사용할 수 있다고 일괄적으로 약속하지 않습니다.",
  },
];

const separateScopeItems = [
  "무거운 가구와 집기 이동",
  "고정 집기 해체",
  "왁스 박리와 재코팅",
  "마루코팅과 포세린타일 나노코팅",
  "본드·페인트 등 특수 오염 제거",
  "줄눈 보수와 재시공",
  "바닥 연마·광택·파손 보수",
  "카펫 세척",
  "폐기물 처리",
  "벽면·천장·창문 등 바닥 외 구역 청소",
];

const extraCostItems = [
  "상담한 구역 외에 방·복도·계단 등을 추가하는 경우",
  "사진에 보이지 않던 심한 오염이 확인되는 경우",
  "단순 세척 외에 기존 왁스 박리가 필요한 경우",
  "본드나 페인트 제거를 추가로 요청하는 경우",
  "이동할 가구와 집기가 예상보다 많은 경우",
  "별도 코팅이나 바닥 보수를 요청하는 경우",
  "출입 제한으로 작업을 나누거나 추가 방문해야 하는 경우",
];

const processFlow = ["사진·현장 상담", "바닥 재질과 오염 확인", "작업 구역·견적·일정 협의", "집기와 출입 동선 정리", "재질에 맞는 세척", "잔여물·물기 정리", "검수와 사용 안내"];

const processSteps: [string, string][] = [
  ["현재 불편한 점 확인", "잘 지워지지 않는 얼룩, 끈적임, 검은 동선 자국 등 신경 쓰이는 부분을 알려주세요. 세척으로 기대할 수 있는 결과와 별도 확인이 필요한 상태를 구분합니다."],
  ["바닥 상태와 작업 범위 확인", "바닥 재질과 기존 코팅, 손상 여부를 확인합니다. 필요하다면 일부 구역에서 세척 반응을 확인할 수 있는지도 협의합니다. 청소할 구역과 제외할 구역, 집기 이동 범위를 함께 정합니다."],
  ["작업 준비", "합의한 범위의 물품과 동선을 정리합니다. 전기 배선과 바닥 주변 설비 등 주의할 부분도 미리 확인합니다."],
  ["바닥 세척", "재질과 오염 상태에 맞춰 세척합니다. 넓은 면과 가장자리 등 협의한 작업 구역을 확인하며 진행합니다. 모든 바닥에 강한 약품이나 같은 장비를 적용한다고 안내하지 않습니다."],
  ["마무리와 검수", "오염 잔여물과 물기를 정리하고 결과를 확인합니다. 남은 자국이 오염인지, 기존 손상인지 추가로 살펴볼 부분도 안내합니다."],
];

const caseChecklist = [
  "내 바닥과 같은 재질인지",
  "세척만 했는지, 박리·코팅까지 했는지",
  "기존 오염과 마모 상태가 어느 정도였는지",
  "비슷한 위치와 조명에서 비교한 사진인지",
  "바닥이 마른 뒤에도 같은 상태인지",
  "별도 보수나 광택 작업이 있었는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "대략적인 작업 면적",
  "바닥 재질 또는 전체 사진",
  "오염이 잘 보이는 근접 사진",
  "집기 종류와 이동 가능 여부",
  "전원·급수·배수 사용 여건",
  "건물의 작업 가능 시간",
  "다음 출근·수업·영업 시작 시간",
];

const checkupItems = [
  "합의한 구역의 청소 여부",
  "모서리와 가장자리의 작업 상태",
  "집기를 이동하기로 한 구역의 청소 여부",
  "오염 잔여물과 끈적임",
  "남은 물기와 출입 가능 상태",
  "기존 흠집·변색·마모",
  "별도 작업을 계약했다면 해당 공정의 완료 여부",
];

const prepSections: [string, string][] = [
  ["바닥 전체와 오염 구역을 보여주세요", "전체 공간 사진과 오염이 가까이 보이는 사진을 함께 보내주세요. 특히 지워졌으면 하는 자국이 있다면 따로 표시해 주시면 좋습니다."],
  ["이전 관리 이력을 알려주세요", "왁스코팅이나 나노코팅을 했는지, 어떤 세정제를 사용했는지 아는 범위에서 알려주세요. 직접 제거를 시도한 자국이 있다면 그 내용도 도움이 됩니다."],
  ["남길 물건과 이동할 물건을 구분해 주세요", "바닥에 놓인 서류, 전선, 작은 물품을 정리할 수 있는지 알려주세요. 큰 가구와 집기는 무리해서 옮기지 말고 이동 범위를 먼저 협의해 주세요. 책상 아래까지 청소하려면, 책상 아래에 무엇이 있는지도 함께 알아야 하니까요."],
  ["주의할 설비와 손상을 알려주세요", "바닥 전원함, 노출된 배선, 들뜬 타일, 물이 닿으면 안 되는 설비가 있다면 미리 알려주세요. 바닥청소에 전기 설비 내부 청소가 자동으로 포함되는 것은 아닙니다."],
  ["작업과 사용 시간을 함께 정해 주세요", "청소 날짜뿐 아니라 언제 다시 공간을 사용할지도 알려주세요. 건물의 출입 시간과 급수·배수 사용 조건도 확인해 주시면 작업 계획에 도움이 됩니다."],
];

const faqItems: [string, string][] = [
  ["물걸레질로 안 지워지는 찌든 때도 가능한가요?", "바닥 재질과 오염 상태를 확인해 제거 가능 범위를 안내합니다. 다만 변색이나 마모처럼 청소로 해결되지 않는 흔적도 있을 수 있습니다."],
  ["바닥청소 비용은 평당으로 정하나요?", "면적은 참고하지만 면적만으로 정하지 않습니다. 필요한 인원과 장비·약품, 오염 상태, 집기와 동선을 함께 확인합니다."],
  ["포세린타일 얼룩 제거를 원하면 나노코팅을 신청해야 하나요?", "현재 오염을 정리하려면 바닥청소로 먼저 상담할 수 있습니다. 코팅은 적용 가능 여부와 관리 목적을 확인한 뒤 선택하는 별도 작업이며, 얼룩이 있다고 반드시 코팅해야 하는 것은 아닙니다."],
  ["세척하면 바닥이 반짝반짝해지나요?", "바닥 본래의 마감에 따라 다릅니다. 무광 바닥은 청소 후에도 무광일 수 있으며, 세척과 광택·코팅 작업은 구분해야 합니다."],
  ["기존 왁스도 청소하면서 제거되나요?", "일반 세척과 왁스 박리는 다른 작업입니다. 기존 코팅 상태를 확인해 박리가 필요한지와 견적 포함 여부를 협의합니다."],
  ["데코타일과 포세린타일은 같은 방식으로 청소하나요?", "아닙니다. 재질과 표면 마감, 오염 상태에 따라 적용할 방법을 확인해야 합니다."],
  ["바닥 재질을 모르는데 상담할 수 있나요?", "네. 전체 사진과 가까이 찍은 사진을 보내주세요. 사진만으로 확인이 어려우면 제품 정보나 현장 확인이 필요할 수 있습니다."],
  ["책상이나 진열장 아래까지 청소하나요?", "집기 이동과 접근 가능 여부를 먼저 확인해야 합니다. 이동할 물건과 청소할 구역을 사전에 정해 주세요."],
  ["줄눈 청소도 포함되나요?", "타일 표면과 줄눈은 작업 범위를 구분해 확인해야 합니다. 줄눈 세척이나 보수·재시공이 자동으로 모두 포함되는 것은 아닙니다."],
  ["본드와 페인트 자국도 제거해 주시나요?", "일반적인 바닥 오염과 구분해 상담합니다. 재질과 접착 상태에 따라 별도 작업이 필요할 수 있으므로 사진을 보내주세요."],
  ["바닥의 흠집과 변색도 없어지나요?", "세척은 자재 손상을 수리하는 작업이 아닙니다. 제거할 오염과 남을 수 있는 흠집·변색을 구분해 확인합니다."],
  ["청소 후 바로 걸어도 되나요?", "물기와 바닥 상태를 확인한 뒤 안내합니다. 코팅 등 추가 공정을 진행했다면 별도의 건조·사용 기준이 적용됩니다."],
  ["영업을 쉬지 않고 작업할 수 있나요?", "작업 구역과 이동 동선을 안전하게 분리할 수 있는지 확인해야 합니다. 현장에 따라 구역별 작업이나 영업 종료 후 작업을 협의합니다."],
  ["정기적으로 관리할 수도 있나요?", "필요한 인원과 작업 시간, 방문 횟수와 범위를 기준으로 상담할 수 있습니다. 정기청소와 별도 박리·코팅의 포함 범위는 구분해 확인합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "사진을 바탕으로 상담할 수 있습니다. 다만 기존 코팅 상태와 가려진 오염, 실제 동선은 현장 확인 후 견적에 반영될 수 있습니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 작업 면적",
  "바닥 전체와 오염 구역 사진",
  "기존 코팅이나 관리 이력",
  "가구·집기의 종류와 양",
  "집기 이동 가능 여부",
  "희망 날짜와 작업 가능한 시간",
  "다음 출근·수업·영업 일정",
  "세척 외에 함께 상담할 작업",
];

const caseIds = ["etc-01"] as const;
const path = "/바닥청소/";

export default function FloorCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "바닥청소",
      serviceType: "바닥청소·바닥 세척",
      description: "사무실 데코타일의 묵은 때, 매장 타일의 발자국과 줄눈 오염이 고민이신가요? 찐청소는 바닥 재질과 기존 코팅, 집기 배치를 확인해 세척 범위와 필요한 작업을 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "바닥청소", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/floor-clean-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>바닥청소</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">바닥시공</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">데코타일·포세린타일 바닥청소, 닦아도 남는 오염을 살펴봅니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>사무실 데코타일의 묵은 때, 매장 타일의 발자국과 줄눈 오염이 고민이신가요? 찐청소는 바닥 재질과 기존 코팅, 집기 배치를 확인해 세척 범위와 필요한 작업을 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">바닥청소 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="바닥청소 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["같은 면적이라도 ","집기 유무에 따라 "]}>바닥청소 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 바닥 재질, 오염 정도, 기존 코팅 상태와 집기 유무에 따라 필요한 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업 조건을 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">면적보다 작업량이 더 중요한 경우도 있습니다</h3>
            <ReadingParagraph className="mt-2">집기가 많은 50평 공간은 비어 있는 100평 공간보다 작업이 복잡할 수 있습니다. 책상과 의자 사이, 좁은 통로, 이동해야 할 물건이 많으면 준비와 세척에 시간이 더 필요하기 때문입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">평수는 참고하되, 실제 청소할 면적과 작업 동선을 함께 확인합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">청소와 추가 공정은 구분해서 안내합니다</h3>
            <ReadingParagraph className="mt-2">바닥 세척과 기존 왁스 제거, 새 코팅은 서로 다른 작업입니다. 현재 바닥에 필요한 공정을 확인한 뒤 견적에 어디까지 포함되는지 구분해야 합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">세척만으로 정리할 수 있는 상태인지부터 확인하고, 추가 공정은 필요성과 비용을 함께 살펴보세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 바닥 재질/청소 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="바닥 재질별 확인 사항과 청소 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">타일 발자국·끈적임·줄눈 오염을 나눠 확인합니다</h3>
            <ReadingParagraph className="mt-2 mb-6">같은 바닥도 통행 구역과 가장자리의 오염이 다릅니다. 세정제 잔여물인지 묵은 때인지, 기존 피막이나 표면 손상인지 구분하고 재질에 맞춰 작업합니다. 왁스 박리·코팅, 본드 제거와 바닥 보수는 일반 세척과 별도입니다.</ReadingParagraph>
            <ReadingParagraph>바닥청소는 모든 표면을 같은 약품과 장비로 닦는 작업이 아닙니다. 재질과 기존 마감을 확인해 적용 가능한 방법과 작업 범위를 정합니다.</ReadingParagraph>
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
            <ReadingParagraph className="mt-6 font-bold text-brand-dark">별도로 확인할 작업</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {separateScopeItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">페인트 오염 제거 사례</ReadingParagraph>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["floorclean-paint-01.webp", "floorclean-paint-02.webp", "floorclean-paint-03.webp", "floorclean-paint-04.webp"].map(photo => (
                <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                  <Image src={`/images/portfolio-v2/${photo}`} alt="바닥 페인트 오염 제거 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                </div>
              ))}
            </div>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">테이프·특수 오염 제거 사례</ReadingParagraph>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["floorclean-tape-01.webp", "floorclean-tape-02.webp", "floorclean-tape-03.webp", "floorclean-tape-04.webp"].map(photo => (
                <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                  <Image src={`/images/portfolio-v2/${photo}`} alt="바닥 테이프·특수 오염 제거 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                </div>
              ))}
            </div>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">필요한 항목이 있다면 진행 가능 여부와 견적 포함 범위를 별도로 확인해 주세요.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>견적은 처음 확인한 바닥 상태와 작업 구역을 기준으로 정합니다. 실제 조건이나 요청 범위가 달라지면 비용 조정이 필요할 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">견적 단계에서 확정할 수 있는 작업과 현장 확인이 더 필요한 작업을 구분해 주세요. 변경이 필요한 경우 비용과 일정을 어떻게 협의할지도 미리 확인하는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="바닥청소 진행 순서와 소요 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>

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
            <ReadingParagraph className="mt-2" breakAfter={["같은 면적이라도 "]}>작업 면적, 오염 상태, 집기 이동과 건조 여건에 따라 달라집니다. 빈 공간과 영업 중인 공간은 같은 면적이라도 일정이 다를 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">당일 세척이 가능한 현장이라도 작업 종료와 정상 사용 가능 시점은 구분해야 합니다. 다음 출근·수업·영업 시간이 정해져 있다면 먼저 알려주세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <ReadingParagraph>바닥청소 사례는 같은 재질과 비슷한 오염 상태인지 함께 확인하는 것이 좋습니다. 반짝이는 결과가 모두 세척만으로 만들어진 것은 아닐 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">사례에서 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">청소 후에도 바닥재 본래의 무광 질감은 그대로일 수 있습니다. 광택이 강해졌는지만으로 청소 결과를 판단하지 않는 것이 좋습니다. 작업 기록이 필요하면 촬영할 구역과 전달 방법을 상담 시 협의해 주세요. 사진만으로 끈적임이나 물기 상태까지 모두 확인할 수는 없습니다.</ReadingParagraph>
            {cases.length > 0 && (
              <div className="mt-6 space-y-8">
                {cases.map(item => <CaseFigure key={item.id} item={item} />)}
              </div>
            )}
            <ServicePhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <ReadingParagraph>현장 위치와 바닥 사진, 희망 날짜를 알려주시면 방문 가능 여부와 일정을 안내합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">상담 시 필요한 정보</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">영업 중에도 청소할 수 있나요?</h3>
            <ReadingParagraph className="mt-2">작업 구역과 고객·직원의 이동 동선을 분리할 수 있는지 먼저 확인합니다. 물기가 있는 구역을 계속 통과해야 한다면 작업 시간을 조정해야 할 수 있습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">부분 작업이 가능한지, 휴무나 영업 종료 후 작업이 필요한지는 현장 여건에 따라 협의합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">야간이나 주말 작업이 필요한 경우</h3>
            <ReadingParagraph className="mt-2">희망 시간대를 알려주시면 가능한 일정을 확인합니다. 건물의 소음 제한과 출입 규정, 작업 후 건조 시간도 함께 고려해야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">모든 지역과 시간대의 즉시 작업을 일괄적으로 약속드리지는 않습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">정기적인 바닥 관리가 필요한 경우</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="text-[15.5px]">일회성 세척인지, 반복적인 관리가 필요한지 알려주세요. 정기청소는 필요한 인원과 작업 시간을 중심으로, 방문 횟수와 범위를 협의합니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">정기 관리와 별도의 박리·코팅 작업이 어디까지 포함되는지도 구분해 확인합니다.</ReadingParagraph>
            </div>
          <BackToContents />
          </section>

          {/* 7. 검수/관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 관리 방법" />
            <ReadingParagraph>검수는 처음 협의한 구역과 오염 제거 범위를 기준으로 진행합니다. 전체 인상뿐 아니라 특히 신경 쓰였던 부분을 함께 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">지워지지 않는 자국은 원인을 구분합니다</h3>
            <ReadingParagraph className="mt-2">청소가 덜 된 오염과 자재 자체의 손상은 다릅니다. 남은 자국이 있다면 위치와 상태를 확인해 추가 세척 대상인지, 보수 등 다른 작업이 필요한지 살펴봅니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">모든 얼룩이 사라지거나 처음 시공한 상태로 돌아간다고 약속하지 않습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">일상 관리도 바닥에 맞춰 주세요</h3>
            <ReadingParagraph className="mt-2">청소 후 사용할 세정제와 도구는 바닥 재질과 기존 코팅에 맞춰 확인하는 것이 좋습니다. 강하게 문지르거나 다른 관리제를 덧바르기 전에 적합성을 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">새 코팅을 함께 진행했다면 물걸레질과 집기 반입 시점은 해당 제품 기준을 따라야 합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">작업 후 문의할 부분이 있다면 사진과 위치를 함께 알려주세요. 재확인과 사후 처리의 범위·기간은 계약 시 확인하시기 바랍니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="작업 전 준비사항" />
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
              <ReadingParagraph className="text-xl font-bold">바닥청소 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">바닥 재질이나 오염의 이름을 정확히 모르셔도 괜찮습니다. 현재 사진과 가장 불편한 부분부터 알려주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">찐청소는 바닥 상태에 맞춰 필요한 세척 범위와 비용을 안내합니다. 코팅이나 보수가 꼭 필요한지부터 확인하고, 청소로 가능한 결과를 구체적으로 상담하겠습니다.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>바닥청소 견적 문의하기 →</CtaButton>
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
