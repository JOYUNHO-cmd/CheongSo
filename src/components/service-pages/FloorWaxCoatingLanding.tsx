import readability from "./Readability.module.css";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { ServiceNextStep, ServicePhotoLinks, RegionalPhotoLinks } from "@/components/service-pages/ServiceConnections";
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
  ["scope", "세척·박리·코팅 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약 일정"],
  ["checkup", "완료 확인·관리"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["상담 대상", "사무실·학원·상가 등 바닥 관리가 필요한 공간"],
  ["적용 여부", "바닥 재질과 기존 마감 상태를 확인한 뒤 안내"],
  ["작업 범위", "필요한 세척·박리 여부와 코팅 범위를 사전 협의"],
  ["견적 기준", "필요한 인원, 장비·약품, 바닥 상태, 집기와 작업 동선"],
  ["일정 확인", "작업 시간과 건조·사용 재개 시간을 구분"],
  ["별도 확인", "집기 이동, 본드 제거, 바닥 보수 등"],
  ["예약 문의", "현장 사진과 위치, 희망 일정을 기준으로 상담"],
];

const estimateChecklist = [
  "바닥 재질과 작업 면적",
  "기존 왁스·코팅의 유무와 상태",
  "찌든 때, 얼룩 등 오염 정도",
  "세척만 필요한지, 박리까지 필요한지",
  "책상·의자·수납장 등 집기의 양",
  "이동 가능한 집기와 고정된 집기",
  "작업 구역과 출입 동선",
  "필요한 제품과 도포 계획",
  "작업 가능 시간과 사용 재개 일정",
];

const includedCheckItems = [
  "코팅 전 바닥 세척",
  "기존 왁스 제거가 필요한 경우의 박리 작업",
  "박리·세척 후 잔여물 정리와 건조",
  "코팅할 구역과 도포 계획",
  "집기 이동과 원위치 배치",
  "작업 후 사용·관리 안내",
];

const scopeItems: { title: string; body: string; note?: string; photoPairs?: string[][] }[] = [
  {
    title: "바닥 세척",
    body: "바닥의 먼지와 오염을 제거하는 작업입니다. 세척으로 정리할 수 있는 상태인지, 코팅까지 필요한지 확인합니다.",
    note: "코팅은 오염을 닦는 작업을 대신하지 않습니다. 새 코팅 전에 필요한 세척과 바탕 준비 범위를 맞춰야 합니다.",
    photoPairs: [["wax-warehouse-01.webp", "wax-warehouse-02.webp"], ["wax-warehouse-03.webp", "wax-warehouse-04.webp"]],
  },
  {
    title: "기존 왁스 박리",
    body: "박리는 기존 왁스층을 제거하는 작업입니다. 기존 코팅의 들뜸, 오염 축적, 새 제품과의 적합성 등을 보고 필요 여부를 판단합니다.",
    note: "모든 현장에 전체 박리가 필요한 것도 아니고, 모든 바닥에 바로 덧바를 수 있는 것도 아닙니다. 박리 필요 여부와 견적 포함 범위를 먼저 확인해 주세요.",
    photoPairs: [["wax-strip-01.webp", "wax-strip-02.webp"], ["wax-strip-03.webp", "wax-strip-04.webp"]],
  },
  {
    title: "바닥왁스코팅",
    body: "작업 대상에 적합한 제품으로 바닥 표면에 코팅층을 형성하는 작업입니다. 제품과 바닥 조건에 따라 외관과 표면 관리에 도움을 줄 수 있습니다.",
    note: "다만 깨진 타일, 들뜬 바닥, 깊은 흠집을 수리하는 작업은 아닙니다. 코팅으로 기대할 수 있는 변화와 별도 보수가 필요한 부분을 구분해 안내합니다.",
    photoPairs: [["wax-eqfloor-01.webp", "wax-eqfloor-02.webp"], ["wax-eqfloor-03.webp", "wax-eqfloor-04.webp"]],
  },
  {
    title: "데코타일·기존 코팅 바닥",
    body: "데코타일이라고 해서 모두 같은 제품과 공정을 적용하는 것은 아닙니다. 제품별 표면 처리와 기존 관리 이력이 다를 수 있어 현재 상태를 먼저 확인합니다.",
    note: "바닥재 제조사의 관리 기준이나 이전 시공 내역이 있다면 알려주세요. 별도 코팅을 권하지 않는 바닥인지도 확인이 필요합니다.",
  },
];

const separateScopeItems = [
  "무거운 가구와 집기 이동",
  "고정 집기의 해체",
  "카펫·타일 등 바닥재 철거",
  "본드·페인트 등 특수 오염 제거",
  "균열·들뜸·파손 보수",
  "연마·평탄화·별도 광택 작업",
  "바닥 외 공간의 전체 청소",
];

const extraCostItems = [
  "세척 후 기존 왁스 상태가 드러나 박리가 추가되는 경우",
  "예상보다 두껍거나 여러 겹의 코팅층이 확인되는 경우",
  "본드나 페인트 등 별도 오염 제거가 필요한 경우",
  "상담 당시보다 이동할 집기가 많은 경우",
  "처음에 없던 방이나 복도의 작업을 추가하는 경우",
  "바닥 보수나 별도 마감을 요청하는 경우",
  "작업을 여러 차례 나누어 방문하도록 일정이 변경되는 경우",
];

const processFlow = ["바닥 상태 상담", "재질·기존 코팅 확인", "작업 범위와 일정 협의", "집기·출입 동선 정리", "필요한 세척 또는 박리", "잔여물 정리와 바탕 건조", "코팅과 제품 기준에 따른 건조", "검수·사용 안내"];

const processSteps: [string, string][] = [
  ["현재 상태와 사용 방식 확인", "바닥 재질과 관리 이력, 현재 불편한 점을 확인합니다. 광택이 줄어든 것인지, 오염이 잘 지워지지 않는지, 기존 코팅이 벗겨지는지 알려주세요. 사람이 많이 다니는 구역과 의자를 자주 이동하는 구역도 함께 확인합니다."],
  ["범위와 일정 협의", "세척·박리·코팅 중 필요한 공정과 집기 이동 범위를 정합니다. 출입을 제한할 구역과 사용을 재개해야 하는 시점도 함께 협의합니다."],
  ["바닥 준비", "협의한 세척이나 박리를 진행하고 잔여물을 정리합니다. 코팅할 수 있는 바탕 상태와 건조 상태를 확인합니다."],
  ["코팅과 건조", "바닥과 제품에 맞춰 코팅을 진행합니다. 여러 번 도포하는 경우에는 도포 사이의 건조 조건도 확인해야 합니다."],
  ["마감 확인과 사용 안내", "합의한 작업 구역의 마감 상태를 확인합니다. 보행, 집기 배치, 일상적인 사용과 청소가 가능한 시점을 구분해 안내받으세요."],
];

const timingChecklist = [
  "제한적으로 걸어도 되는 시점",
  "책상과 의자 등 집기를 다시 놓을 시점",
  "많은 사람이 다니거나 의자를 사용하는 시점",
  "물걸레질과 일상 청소를 시작할 시점",
];

const caseChecklist = [
  "내 현장과 같은 바닥 재질인지",
  "세척만 했는지, 박리 후 코팅했는지",
  "기존 오염과 손상이 어느 정도였는지",
  "비슷한 위치와 조명에서 비교한 사진인지",
  "별도 연마나 보수까지 진행했는지",
  "집기가 있는 상태에서 어디까지 작업했는지",
];

const reservationChecklist = [
  "현장 주소와 공간 용도",
  "대략적인 작업 면적",
  "바닥 재질 또는 전체 사진",
  "이전 왁스코팅 여부",
  "집기의 종류와 이동 가능 여부",
  "작업 가능한 시간",
  "다음 출근·수업·영업 시작 시간",
  "원하는 마감과 현재 불편한 점",
];

const checkupItems = [
  "합의한 구역의 작업 여부",
  "가장자리와 모서리의 마감 상태",
  "도포 자국이나 뭉침 등 확인이 필요한 부분",
  "남아 있는 기존 흠집과 자재 손상",
  "집기 이동을 계약했다면 배치 상태",
  "보행과 집기 반입 가능 시점",
  "일상 청소 시작 시점과 관리 방법",
];

const prepSections: [string, string][] = [
  ["가장 불편한 점을 알려주세요", "“닦아도 바닥이 칙칙해요.” “사람이 다니는 길만 광택이 없어졌어요.” “전에 바른 왁스가 얼룩처럼 보여요.” 이처럼 현재 상태를 알려주시면 세척과 박리, 코팅 중 필요한 작업을 판단하는 데 도움이 됩니다."],
  ["이전 작업 이력이 있으면 알려주세요", "기존에 사용한 왁스나 코팅 제품, 최근 작업 시점을 아는 범위에서 알려주세요. 정확히 모르셔도 괜찮습니다. 바닥 사진과 현재 상태부터 확인하겠습니다."],
  ["집기 이동 범위를 정해 주세요", "책상 위 물건과 바닥의 작은 물품을 누가 정리할지, 큰 가구는 이동할 수 있는지 확인해 주세요. 책상 아래와 수납장 밑까지 작업할지도 미리 정하는 것이 좋습니다. 작은 의자 몇 개와 서류가 가득한 책장은 같은 이동 작업이 아니니까요."],
  ["출입 동선을 확보해 주세요", "작업과 건조 중에 출입을 제한할 구역을 정해야 합니다. 화장실이나 출입문으로 가는 길이 작업 구역과 겹친다면 미리 알려주세요."],
  ["다음 날 사용 계획까지 전달해 주세요", "작업 날짜뿐 아니라 다음 출근·수업·영업 시간과 집기 반입 일정을 알려주세요. 작업을 끝내는 시간과 공간을 다시 사용하는 시간을 함께 맞춰야 합니다."],
];

const faqItems: [string, string][] = [
  ["바닥이 칙칙하면 무조건 왁스코팅을 해야 하나요?", "아닙니다. 표면 오염인지, 기존 코팅층의 문제인지, 바닥재 자체의 손상인지 먼저 확인해야 합니다. 세척으로 정리할 수 있는 부분과 코팅이 필요한 부분을 구분합니다."],
  ["바닥왁스코팅 비용은 평수로 정하나요?", "면적은 참고하지만 면적만으로 정하지 않습니다. 필요한 인원과 장비·약품, 기존 왁스 상태, 박리 여부, 집기와 동선을 함께 확인합니다."],
  ["기존 왁스를 꼭 벗겨야 하나요?", "모든 현장에 박리가 필요한 것은 아닙니다. 기존 코팅 상태와 새 제품의 적합성 등을 확인해 필요 여부를 판단합니다."],
  ["박리 비용도 기본에 포함되나요?", "현장별 견적에서 확인해야 합니다. 세척과 코팅만 포함된 것인지, 박리까지 포함된 것인지 작업 전에 구분해 주세요."],
  ["데코타일이면 모두 왁스코팅을 해도 되나요?", "바닥 제품과 기존 마감, 제조사 관리 기준에 따라 다릅니다. 적용 가능한 코팅인지 먼저 확인해야 하며, 모든 데코타일에 같은 제품과 방법을 사용하는 것은 아닙니다."],
  ["마루나 석재도 같은 방식으로 작업하나요?", "아닙니다. 바닥마다 적합한 관리 방식과 제품이 다릅니다. 일반적인 바닥왁스코팅과 같은 공정으로 볼 수 있는지부터 확인해야 합니다."],
  ["몇 번 코팅해 주시나요?", "바닥 상태와 사용할 제품의 기준, 협의한 마감 계획에 따라 정합니다. 횟수만으로 품질을 판단하기보다는 준비 작업과 도포·건조 조건을 함께 확인해 주세요."],
  ["코팅하면 깊은 흠집도 없어지나요?", "바닥왁스코팅은 깊은 흠집이나 파손을 수리하는 작업이 아닙니다. 외관상 변화가 있을 수 있지만 손상 자체가 사라진다고 보장하지는 않습니다."],
  ["책상과 의자는 모두 옮겨주시나요?", "집기 이동은 사전에 범위를 확인해야 합니다. 이동할 물건의 종류와 양, 해체 필요 여부를 알려주시면 가능 여부와 비용을 안내합니다."],
  ["퇴근 후 작업하면 다음 날 출근해도 되나요?", "제품과 현장 조건, 작업 완료 시간에 따라 달라집니다. 보행뿐 아니라 의자 사용과 집기 배치까지 가능한지 구분해 확인해야 합니다."],
  ["코팅하면 미끄럽지 않나요?", "외관상 광택만으로 미끄러움을 판단할 수는 없습니다. 제품과 바닥 상태, 물기·오염 등 사용 조건을 함께 고려해야 하며, 미끄럼 방지 성능을 무조건 보장하는 서비스로 보시면 안 됩니다."],
  ["냄새가 전혀 없는 제품인가요?", "사용하는 제품에 따라 다릅니다. 무취나 무해를 일괄적으로 약속하지 않으며, 냄새에 민감한 공간이라면 제품 정보와 환기·출입 조건을 사전에 확인해 주세요."],
  ["코팅 후 바로 물걸레질해도 되나요?", "사용한 제품의 기준과 현장 상태에 맞춰 시작 시점을 확인해야 합니다. 겉이 말랐다는 이유만으로 바로 물걸레질을 시작하지 마세요."],
  ["얼마나 오래 유지되나요?", "통행량과 의자 사용, 청소 방법, 바닥 상태에 따라 달라집니다. 모든 현장에 같은 유지 기간을 보장하기보다 실제 사용 조건에 맞춰 관리 계획을 세우는 것이 좋습니다."],
];

const contactChecklist = [
  "현장 위치와 공간 용도",
  "대략적인 작업 면적",
  "바닥 전체와 오염·마모 구역 사진",
  "바닥 재질과 이전 코팅 이력",
  "집기 종류와 이동 가능 여부",
  "작업 가능한 날짜와 시간",
  "다음 출근·수업·영업 시작 시간",
  "원하는 마감과 현재 불편한 점",
];

const caseIds = ["floor-wax-01", "floor-wax-02", "floor-wax-03"] as const;
const path = "/바닥-왁스-코팅/";

export default function FloorWaxCoatingLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "바닥왁스코팅",
      serviceType: "바닥왁스코팅·바닥 관리",
      description: "사무실이나 학원 바닥을 닦아도 칙칙하거나 기존 왁스에 때가 겹쳐 보이나요? 찐청소는 바닥 재질과 기존 피막 상태를 살펴 세척·박리 필요 여부와 코팅 범위를 나눠 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "바닥왁스코팅", item: absoluteUrl(path) },
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
          <Image src="/images/hero-bg/floor-wax-hero.webp" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/78 to-brand/60" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80">
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>바닥왁스코팅</span>
          </nav>
          <ReadingParagraph className="text-sm font-bold tracking-widest text-brand-light">바닥시공</ReadingParagraph>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">데코타일·사무실 바닥왁스코팅, 기존 오염과 피막부터 확인합니다</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <ReadingParagraph>사무실이나 학원 바닥을 닦아도 칙칙하거나 기존 왁스에 때가 겹쳐 보이나요? 찐청소는 바닥 재질과 기존 피막 상태를 살펴 세척·박리 필요 여부와 코팅 범위를 나눠 안내합니다.</ReadingParagraph>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">바닥왁스코팅 견적 문의하기 →</CtaButton>
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
            <SectionTitle id="estimate-title" kicker="01" title="바닥왁스코팅 비용과 견적 산정 기준" />
            <ReadingParagraph breakAfter={["같은 면적이라도 ","필요한 준비 작업에 따라 "]}>바닥왁스코팅 비용은 평수만으로 정하기 어렵습니다. 같은 면적이라도 기존 왁스의 상태, 오염 정도, 집기 유무와 필요한 준비 작업에 따라 작업량이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4" breakAfter={["장비·약품을 중심으로 "]}>찐청소는 필요한 인원과 장비·약품을 중심으로 실제 작업 범위를 확인해 견적을 안내합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">비어 있는 넓은 공간보다 집기 많은 작은 공간이 더 복잡할 수 있습니다</h3>
            <ReadingParagraph className="mt-2">넓어도 바닥이 비어 있으면 작업 동선이 단순할 수 있습니다. 반대로 책상과 수납장이 많은 공간은 이동할 물건과 작업할 구역을 나누는 데 시간이 필요합니다. 평수는 참고하되, 실제 작업 조건을 함께 봐야 하는 이유입니다.</ReadingParagraph>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["wax-furniture-01.webp", "wax-furniture-02.webp", "wax-furniture-03.webp", "wax-furniture-04.webp"].map(photo => (
                <div key={photo} className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-48">
                  <Image src={`/images/portfolio-v2/${photo}`} alt="집기 이동 작업 사진" width={960} height={720} className="h-full w-full object-cover object-center" sizes="(min-width: 768px) 220px, 45vw" />
                </div>
              ))}
            </div>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">견적을 위해 다음 내용을 확인합니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">코팅 가격뿐 아니라 준비 작업의 포함 범위를 확인하세요</h3>
            <ReadingParagraph className="mt-2">같은 &lsquo;왁스코팅&rsquo; 견적이라도 포함된 공정은 다를 수 있습니다.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {includedCheckItems.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">총액을 비교하기 전에 내 바닥에 필요한 공정이 포함되어 있는지 확인하는 것이 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">제품과 도포 횟수도 작업 조건에 맞춰 확인합니다</h3>
            <ReadingParagraph className="mt-2">도포 횟수가 많다는 이유만으로 무조건 좋은 결과를 보장하지는 않습니다. 바닥과 기존 마감에 맞는 제품인지, 제품 기준에 맞춰 준비와 건조가 이루어지는지가 함께 중요합니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">사용할 제품과 도포 계획은 현장 상태를 확인한 뒤 상담에서 안내받으세요.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 2. 세척/박리/코팅 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="세척·박리·코팅의 차이와 작업 범위" />
            <h3 className="mt-6 text-lg font-bold text-brand-dark">때를 제거하는 세척과 왁스를 벗기는 박리는 다릅니다</h3>
            <ReadingParagraph className="mt-2 mb-6">오염이 표면에 붙어 있는지 기존 피막에 쌓였는지를 확인합니다. 코팅을 덧바르는 것만으로 해결할 수 있는지 단정하지 않고, 필요한 준비 작업과 도포 범위를 협의합니다. 집기 이동과 이용 재개 시간도 견적에서 확인합니다.</ReadingParagraph>
            <ReadingParagraph>바닥이 칙칙해졌다고 해서 무조건 왁스를 덧바르는 것은 아닙니다. 표면 오염인지, 기존 코팅층의 문제인지, 바닥재 자체의 손상인지부터 구분해야 합니다.</ReadingParagraph>
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
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">위 항목은 왁스코팅에 자동으로 포함되는 것으로 보지 않으며, 진행 가능 여부와 비용을 사전에 확인합니다.</ReadingParagraph>
            <ServiceNextStep path={path} />
          <BackToContents />
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className={`${readability.extraCosts} scroll-mt-36`}>
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <ReadingParagraph>견적은 처음 확인한 바닥 상태와 작업 범위를 기준으로 정합니다. 현장 조건이나 요청 범위가 달라지면 추가 작업이 필요할 수 있습니다.</ReadingParagraph>
            <ul className="mt-5 space-y-2.5">
              {extraCostItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">박리와 집기 이동 등이 이미 견적에 포함되어 있는지 먼저 확인해 주세요. 작업 중 범위 변경이 필요할 때는 비용과 일정을 어떻게 협의할지도 정해두는 것이 좋습니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="진행 순서와 건조·사용 재개 시간" />
            <div className="mt-4 flex flex-wrap gap-2">
              {processFlow.map((step, i) => (
                <span key={step} className="flex items-center gap-2 text-[15px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1.5 font-bold text-brand-dark">{step}</span>
                  {i < processFlow.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">구체적인 공정과 반복 도포 여부는 바닥 상태와 사용할 제품에 맞춰 정합니다.</ReadingParagraph>

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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">&lsquo;말랐다&rsquo;와 &lsquo;평소처럼 써도 된다&rsquo;는 다를 수 있습니다</h3>
            <ReadingParagraph className="mt-2">겉으로 마른 상태와 일상적인 사용을 견딜 상태를 같은 의미로 보면 안 됩니다. 사용 제품과 도포 조건, 온도·습도·환기 등에 따라 필요한 시간이 달라집니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 font-bold text-brand-dark">상담할 때 아래 시점을 구분해 확인해 주세요.</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {timingChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">&lsquo;몇 시간 뒤면 모두 가능&rsquo;이라고 한 가지 시간으로 안내하기보다, 실제 사용 계획에 맞춰 확인하는 것이 중요합니다.</ReadingParagraph>
          <BackToContents />
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="작업 전후 사진과 결과 확인 방법" />
            <ReadingParagraph>바닥왁스코팅 사례는 광택이 강한 사진만으로 비교하기 어렵습니다. 조명과 촬영 각도에 따라 같은 바닥도 다르게 보일 수 있기 때문입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">사례를 볼 때 확인할 내용</ReadingParagraph>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {caseChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <ReadingParagraph className="mt-5 text-[15px] text-gray-500">바닥이 반짝이는 모습뿐 아니라 준비 과정과 실제 작업 범위를 함께 확인해 주세요. 완료 사진이 필요하다면 촬영 구역과 전달 방법을 상담 시 협의하실 수 있습니다. 사진으로는 끈적임, 건조 상태, 실제 사용감을 모두 판단할 수 없어 현장 확인도 중요합니다.</ReadingParagraph>
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

            <h3 className="mt-6 text-lg font-bold text-brand-dark">퇴근 후나 휴무일에도 상담할 수 있나요?</h3>
            <ReadingParagraph className="mt-2">원하는 작업 시간대를 알려주시면 가능 여부를 확인합니다. 다만 야간에 작업을 마친다고 다음 날 아침 모든 활동이 가능하다고 단정할 수는 없습니다. 실제 건조와 사용 조건을 고려해 작업 시간을 정해야 합니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">영업 중인 공간도 가능한가요?</h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-5">
              <ReadingParagraph className="text-[15.5px]">구역을 나누어 작업할 수 있는지와 출입 통제가 가능한지 먼저 확인합니다. 작업 구역을 사람들이 계속 통과해야 한다면 일정이나 작업 방식을 조정해야 할 수 있습니다.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-[15.5px]">현장 조건에 따라 전체 휴무가 필요한지, 부분 작업이 가능한지 상담합니다.</ReadingParagraph>
            </div>
            <RegionalPhotoLinks path={path} />
          <BackToContents />
          </section>

          {/* 7. 검수/관리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="완료 후 검수와 관리 방법" />
            <ReadingParagraph>검수는 합의한 구역과 마감 계획을 기준으로 진행합니다. 광택뿐 아니라 작업 누락과 마감 상태, 사용 안내까지 함께 확인해 주세요.</ReadingParagraph>
            <ReadingParagraph className="mt-5 font-bold text-brand-dark">주요 검수 항목</ReadingParagraph>
            <ul className="mt-3 space-y-2.5">
              {checkupItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">작업 후에는 제품에 맞는 관리가 필요합니다</h3>
            <ReadingParagraph className="mt-2">사용한 바닥재와 코팅 제품의 관리 기준에 맞춰 청소해 주세요. 물걸레질을 시작할 시점과 사용할 세정제, 피해야 할 관리 방법을 확인하는 것이 좋습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-500">집기는 안내받은 시점 이후에 배치하고, 이동할 때 바닥을 끌어 손상시키지 않도록 주의해 주세요. 의자 다리와 바퀴 등 반복적으로 바닥에 닿는 부분의 상태도 함께 살펴보시면 좋습니다.</ReadingParagraph>

            <h3 className="mt-6 text-lg font-bold text-brand-dark">재코팅 주기는 공간마다 다릅니다</h3>
            <ReadingParagraph className="mt-2">방문객 수, 이동 동선, 의자 사용, 청소 방법에 따라 코팅층이 닳는 속도가 달라집니다. 모든 공간에 같은 재코팅 주기를 적용하지는 않습니다.</ReadingParagraph>
            <ReadingParagraph className="mt-4 text-[15px] text-gray-500">통행이 많은 구역의 변화와 청소 후 상태를 보며 필요한 관리 시점을 상담해 주세요. 사후 문의와 재확인 범위·기간은 계약 시 확인하시기 바랍니다.</ReadingParagraph>
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
              <ReadingParagraph className="text-xl font-bold">바닥왁스코팅 견적 문의</ReadingParagraph>
              <ReadingParagraph className="mt-3 text-white/80">지금 바닥에 코팅이 필요한지, 박리부터 해야 하는지 모르셔도 괜찮습니다. 전체 사진과 상태가 잘 보이는 사진을 보내주세요.</ReadingParagraph>
              <ReadingParagraph className="mt-2 text-white/80">찐청소는 바닥 상태에 맞는 준비 작업과 코팅 범위를 먼저 확인합니다. 반짝이는 마감뿐 아니라, 다시 사용하는 일정과 관리 방법까지 함께 상담하세요.</ReadingParagraph>
              <ul className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {contactChecklist.map(item => (
                  <li key={item} className="flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>바닥왁스코팅 견적 문의하기 →</CtaButton>
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
