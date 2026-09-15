import Link from "next/link";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import portfolio from "@/lib/portfolio-highlights.json";

const toc = [
  ["quickfacts", "핵심 정보 한눈에"],
  ["safety", "사용 약품 안전성"],
  ["estimate", "비용·견적 기준"],
  ["scope", "청소 범위"],
  ["extra", "추가 비용"],
  ["process", "진행 순서"],
  ["cases", "작업 전후 사진"],
  ["area", "지역·예약"],
  ["checkup", "완료 확인"],
  ["prep", "준비사항"],
  ["faq", "자주 묻는 질문"],
] as const;

const quickFacts: [string, string][] = [
  ["기본 범위", "집기와 바닥 코팅을 제외한 전체 내부"],
  ["일반 청소 견적", "필요한 인원과 장비·약품 비용 중심"],
  ["정기청소 견적", "필요한 인원과 작업 시간 기준"],
  ["작업 시간", "현장 상태·작업량·투입 인원에 따라 안내"],
  ["지역·일정", "사무실 위치와 희망 시간을 기준으로 확인"],
  ["예약 문의", `${siteConfig.phone} / 홈페이지 견적 문의`],
];

const estimateChecklist = [
  "작업에 필요한 인원",
  "사용할 장비와 약품",
  "오염의 종류와 정도",
  "집기 배치와 작업 공간",
  "출입·주차·장비 반입 조건",
  "별도 요청이나 특수 작업 여부",
];

const scopeItems: { title: string; body: string; note?: string }[] = [
  {
    title: "사무 공간과 회의실",
    body: "바닥과 벽면, 걸레받이, 모서리 등 내부 공간의 먼지와 오염을 확인합니다. 집기가 놓인 공간은 작업자가 접근할 수 있는 주변과 틈새까지 살핍니다.",
    note: "집기 자체는 기본 범위에서 제외됩니다. 집기 이동이 필요한 곳이나 접근이 어려운 부분은 작업 전 확인합니다.",
  },
  {
    title: "바닥과 걸레받이",
    body: "바닥 재질과 오염에 맞춰 청소하고, 가장자리와 걸레받이 주변도 함께 확인합니다.",
    note: "바닥청소는 기본 범위에 포함되며, 바닥 코팅은 제외됩니다. 코팅을 원하시면 기존 바닥 상태와 필요한 작업을 확인한 뒤 별도로 안내합니다.",
  },
  {
    title: "탕비실과 내부 화장실",
    body: "탕비실과 사무실 내부 화장실도 기본 청소 대상입니다. 물때나 찌든 오염은 소재와 상태를 확인해 작업합니다.",
    note: "가전·가구 등 집기에 해당하는 항목과 건물 공용 화장실은 기본 범위와 구분해 확인합니다.",
  },
  {
    title: "실내 유리와 출입문",
    body: "실내 유리와 출입문은 표면 상태와 접근 조건에 맞춰 청소합니다. 외창이나 별도 장비가 필요한 높은 위치는 상담 시 작업 가능 여부와 범위를 확인합니다.",
  },
  {
    title: "구석과 틈새",
    body: "평소 손이 잘 닿지 않는 가장자리와 틈새의 분진도 확인합니다. 먼지는 책상 밑이라고 봐주지 않으니까요. 접근 가능한 부분은 구석까지 살피고, 집기나 시설물 때문에 작업이 제한되는 곳은 설명드립니다.",
  },
];

const exclusions = [
  "집기 청소와 이동",
  "바닥 코팅",
  "외창과 고소 작업",
  "시설물 분해가 필요한 작업",
  "폐기물 반출과 특수 오염 처리",
];

const processSteps: [string, string][] = [
  ["상담", "위치, 면적, 공간 사진과 희망 일정을 확인합니다."],
  ["현장 조건 확인", "오염과 소재, 집기 배치, 출입 및 장비 반입 조건을 살핍니다."],
  ["범위와 견적 협의", "기본 청소 범위와 별도 작업, 필요한 인원과 비용을 안내합니다."],
  ["청소 진행", "협의한 내용을 기준으로 공간별 청소를 진행합니다."],
  ["마무리 확인", "작업 결과와 확인이 필요한 부분, 이후 관리 방법을 안내합니다."],
];

const reservationChecklist = [
  "사무실 주소와 면적",
  "희망 날짜와 작업 가능한 시간",
  "건물 출입 및 보안 절차",
  "주차와 승강기 사용 조건",
  "청소 후 업무 재개 시간",
];

const prepItems = [
  "중요한 서류와 귀중품은 별도로 보관해 주세요.",
  "출입 제한 구역과 취급에 주의할 장비를 알려주세요.",
  "이동하면 안 되는 집기와 물품을 구분해 주세요.",
  "물과 전기 사용 가능 여부를 확인해 주세요.",
  "출입 방법, 주차, 승강기 이용 조건을 알려주세요.",
  "작업 중 회의나 방문 일정이 있다면 미리 말씀해 주세요.",
];

const faqItems: [string, string][] = [
  ["사무실청소는 평당 얼마인가요?", "찐청소는 평당 단가만으로 견적을 정하지 않습니다. 집기 배치와 오염 상태 등 실제 작업 조건을 확인하고, 필요한 인원과 장비·약품을 중심으로 비용을 산정합니다."],
  ["기본 청소 범위는 어디까지인가요?", "집기와 바닥 코팅을 제외한 전체 내부입니다. 접근이 어려운 곳이나 시설물 분해, 특수 작업이 필요한 부분은 현장 상태를 확인해 별도로 안내합니다."],
  ["집기가 있어도 청소할 수 있나요?", "집기가 있는 상태의 작업 조건을 확인해 견적을 안내합니다. 집기 자체는 기본 범위에서 제외되며, 이동이 필요한 부분과 접근이 어려운 구역은 사전에 협의합니다."],
  ["바닥청소와 코팅은 함께 포함되나요?", "바닥청소는 기본 범위에 포함되고, 코팅은 제외됩니다. 코팅을 요청하시면 바닥 상태와 필요한 작업을 확인한 뒤 별도로 안내합니다."],
  ["사무실 정기청소 비용은 어떻게 정하나요?", "필요한 인원과 작업 시간을 기준으로 산정합니다. 관리할 구역과 작업 내용, 방문 주기를 함께 확인하므로 월 방문 횟수만으로 비용을 비교하기보다는 실제 작업 조건을 같이 확인해 주세요."],
  ["야간이나 주말에도 청소를 맡길 수 있나요?", "희망 날짜와 시간을 알려주시면 일정 가능 여부를 확인합니다. 건물 출입 제한과 장비 사용 조건도 함께 확인해야 합니다."],
  ["사진만으로 견적을 받을 수 있나요?", "전체 공간과 오염 부위 사진이 있으면 상담에 도움이 됩니다. 사진만으로 작업량이나 현장 조건을 판단하기 어려운 경우에는 추가 정보나 현장 확인이 필요할 수 있습니다."],
];

const caseIds = ["office-03", "office-02", "office-01"] as const;
const extraCaseIds = ["office-05", "office-06", "office-07"] as const;
const path = "/사무실청소/";

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Link
      href="/contact/"
      className={`inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-brand-dark ${className}`}
    >
      {children}
    </Link>
  );
}

type PortfolioItem = { id: string; title: string; before: string; after: string; beforeWidth: number; beforeHeight: number; afterWidth: number; afterHeight: number };

function CaseFigure({ item }: { item: PortfolioItem }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-100">
      <div className="grid grid-cols-2">
        <div className="relative">
          <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} width={item.beforeWidth} height={item.beforeHeight} className="aspect-[4/3] w-full object-cover" sizes="(min-width: 768px) 340px, 50vw" />
          <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
        </div>
        <div className="relative">
          <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} width={item.afterWidth} height={item.afterHeight} className="aspect-[4/3] w-full object-cover" sizes="(min-width: 768px) 340px, 50vw" />
          <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">후</span>
        </div>
      </div>
      <figcaption className="px-4 py-3 text-sm font-bold text-brand-dark">{item.title}</figcaption>
    </figure>
  );
}

function SectionTitle({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-bold tracking-widest text-brand">{kicker}</p>
      <h2 id={id} className="scroll-mt-36 mt-1 text-2xl font-black text-brand-dark md:text-[28px]">{title}</h2>
    </div>
  );
}

export default function OfficeCleaningLanding() {
  const cases = caseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const extraCases = extraCaseIds
    .map(id => portfolio.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "사무실청소",
      serviceType: "사무실청소",
      description: "찐청소 사무실청소는 집기와 바닥 코팅을 제외한 전체 내부를 기본으로 합니다. 필요한 인원과 장비·약품을 기준으로 산정하는 청소 비용, 정기청소 견적과 예약 절차를 안내합니다.",
      url: absoluteUrl(path),
      provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") },
        { "@type": "ListItem", position: 3, name: "사무실청소", item: absoluteUrl(path) },
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
            <Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><span>사무실청소</span>
          </nav>
          <p className="text-sm font-bold tracking-widest text-brand-light">사업장청소</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">사무실청소 비용과 서비스 안내</h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base sm:text-lg leading-relaxed text-white/90">
            <p>사무실청소를 맡길 때는 어디까지 청소하는지, 비용은 어떻게 정하는지부터 확인해야 합니다.</p>
            <p>찐청소는 집기와 바닥 코팅을 제외한 전체 내부를 기본 범위로 청소합니다. 눈에 띄는 바닥뿐 아니라 평소 관리하기 어려운 구석과 틈새의 분진까지 살핍니다.</p>
            <p>견적은 현장에 필요한 인원과 장비·약품을 기준으로 산정합니다. 평수만 듣고 계산기를 두드리기에는, 사무실마다 사정이 꽤 다르거든요.</p>
          </div>
          <CtaButton className="mt-8 !bg-white !text-brand-dark hover:!bg-brand-light">사무실청소 견적 문의하기 →</CtaButton>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[190px_1fr]">
        {/* 목차 - 급한 고객이 원하는 항목으로 바로 이동 */}
        <aside>
          <nav aria-label="목차" className="rounded-2xl bg-gray-50 p-5 md:sticky md:top-36">
            <p className="mb-3 font-bold text-brand-dark">이 페이지에서</p>
            <ol className="space-y-3 text-sm">
              {toc.map(([id, title]) => (
                <li key={id}><a href={`#${id}`} className="hover:text-brand hover:underline">{title}</a></li>
              ))}
            </ol>
            <div className="mt-6 border-t border-gray-200 pt-5">
              <a href="tel:010-9882-8882" className="block rounded-xl bg-brand px-4 py-3 text-center text-sm font-bold text-white hover:bg-brand-dark">
                전화 상담 010-9882-8882
              </a>
            </div>
          </nav>
        </aside>

        <div className="space-y-14 text-[17px] leading-8 text-gray-800">
          {/* 핵심 정보 표 - 눈이 편하게, 한눈에 스캔 가능하도록 */}
          <section id="quickfacts" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">상단 핵심 정보</h2>

            {/* 모바일: 세로 카드 - 표 가로 스크롤 없이 바로 읽히도록 */}
            <dl className="mt-4 grid gap-2.5 rounded-2xl border border-gray-200 p-2.5 md:hidden">
              {quickFacts.map(([label, value], i) => (
                <div key={label} className={`rounded-xl p-4 ${i % 2 === 1 ? "bg-gray-50" : "bg-brand-light/40"}`}>
                  <dt className="text-[13.5px] font-bold text-brand-dark">{label}</dt>
                  <dd className="mt-1 text-[15.5px] leading-6">{value}</dd>
                </div>
              ))}
            </dl>

            {/* 데스크톱: 표 형태로 한눈에 비교 */}
            <div className="mt-4 hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
              <table className="w-full border-collapse text-left text-[15.5px]">
                <thead>
                  <tr className="bg-brand-light/60">
                    <th scope="col" className="px-5 py-3.5 font-black text-brand-dark w-[30%]">항목</th>
                    <th scope="col" className="px-5 py-3.5 font-black text-brand-dark">안내</th>
                  </tr>
                </thead>
                <tbody>
                  {quickFacts.map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : undefined}>
                      <th scope="row" className="px-5 py-3.5 font-bold text-gray-700 align-top">{label}</th>
                      <td className="px-5 py-3.5 align-top">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 약품 안전성 - "약품"이 언급되는 견적 기준 앞에 배치해 신뢰를 먼저 확인시킵니다 */}
          <section id="safety" className="scroll-mt-36">
            <h2 className="text-xl font-black text-brand-dark">사용하는 약품, 인체에 안전한가요?</h2>
            <p className="mt-4">공기질 정화, 냄새제거에 사용되는 약품은 해외 공인 시험기관의 검증을 거친 제품입니다. 사무실처럼 사람이 계속 머무는 공간이라 저희도 이 부분을 가장 신경 씁니다.</p>
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
            <SectionTitle id="estimate-title" kicker="01" title="사무실청소 비용과 견적 산정 기준" />
            <p>사무실청소 비용은 실제 작업에 필요한 인원과 장비·약품을 중심으로 산정합니다.</p>
            <p className="mt-4">집기가 빼곡한 50평 사무실과 비어 있는 100평 사무실을 생각해보세요. 집기가 많으면 이동할 공간이 좁고, 집기 주변과 틈새를 청소하는 데 시간이 더 걸릴 수 있습니다. 면적이 작아도 작업량은 더 많을 수 있는 거죠.</p>
            <p className="mt-4">그래서 찐청소는 평수만으로 금액을 정하지 않습니다. 면적과 함께 집기 배치, 오염 상태, 바닥 재질, 작업 동선을 확인합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">견적을 낼 때 주로 확인하는 내용은 다음과 같습니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {estimateChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">면적은 필요한 정보입니다. 다만 평수가 곧 청소 난이도는 아닙니다.</p>

            <h3 className="mt-8 text-lg font-bold text-brand-dark">정기청소 비용은 어떻게 정하나요?</h3>
            <p className="mt-3">사무실 정기청소는 필요한 인원과 작업 시간을 기준으로 금액을 산정합니다.</p>
            <p className="mt-3">방문할 때마다 관리할 구역과 작업 내용을 정하고, 방문 주기를 함께 협의합니다. 견적을 비교하실 때는 회당 인원과 작업 시간, 월 방문 횟수, 포함 범위를 같이 확인해 주세요.</p>
          </section>

          {/* 2. 범위 */}
          <section id="scope" className="scroll-mt-36">
            <SectionTitle id="scope-title" kicker="02" title="사무실청소 기본 범위와 제외 항목" />
            <p>찐청소의 기본 범위는 집기와 바닥 코팅을 제외한 전체 내부입니다.</p>
            <p className="mt-4">사무 공간과 회의실, 탕비실, 사무실 내부 화장실 등 내부 공간을 확인하고, 각 소재와 오염 상태에 맞춰 작업합니다. 건물 공용 구역과 별도 요청 작업은 상담 시 구분합니다.</p>

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
              <p className="font-bold text-brand-dark">별도 확인이 필요한 작업</p>
              <p className="mt-2 text-[15.5px] text-gray-600">다음 항목은 전체 내부 청소와 구분해 상담합니다.</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {exclusions.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[15.5px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-gray-500">시설물의 손상이나 변색처럼 청소만으로 해결하기 어려운 부분도 현장 상태를 보고 안내합니다.</p>
            </div>
          </section>

          {/* 3. 추가비용 */}
          <section id="extra" className="scroll-mt-36">
            <SectionTitle id="extra-title" kicker="03" title="추가 비용이 발생할 수 있는 경우" />
            <p>기본 범위를 벗어난 요청이나 별도 인원·장비·약품이 필요한 작업은 견적이 달라질 수 있습니다.</p>
            <p className="mt-4">예를 들어 바닥 코팅을 추가하거나, 사전에 확인하지 못한 특수 오염이 있거나, 장비 반입에 제약이 있는 경우입니다.</p>
            <p className="mt-4">견적 상담 시 현장 사진과 요청 사항을 구체적으로 전달해 주세요. 작업 조건을 정확히 알수록 필요한 인원과 비용도 더 정확하게 안내할 수 있습니다.</p>
            <p className="mt-4">추가 작업이 필요한 경우에는 해당 작업과 비용을 사전에 협의합니다.</p>
          </section>

          {/* 4. 진행순서 */}
          <section id="process" className="scroll-mt-36">
            <SectionTitle id="process-title" kicker="04" title="사무실청소 진행 순서와 소요 시간" />
            <p>작업 시간은 면적만으로 정하지 않습니다. 오염 상태와 집기 배치, 작업량, 투입 인원을 함께 확인해 안내합니다.</p>
            <ol className="mt-6 space-y-4">
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
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">청소 후 바로 업무를 시작해야 한다면 상담할 때 알려주세요. 바닥 건조 등 이용 재개에 필요한 조건도 함께 확인합니다.</p>
          </section>

          {/* 5. 전후사진/사례 */}
          <section id="cases" className="scroll-mt-36">
            <SectionTitle id="cases-title" kicker="05" title="사무실청소 작업 전후 사진과 실제 사례" />
            <p>청소 전후 사진은 우리 사무실에 필요한 작업을 판단하는 데 도움이 됩니다. 비슷한 공간에서 어떤 오염을 어떻게 청소했는지 확인해 보세요.</p>
            <p className="mt-4">찐청소 홈페이지의 사무실 현장 사례를 함께 소개합니다.</p>

            <div className="mt-6 space-y-8">
              {cases.map(item => <CaseFigure key={item.id} item={item} />)}
            </div>
            <p className="mt-5 text-[15px] text-gray-500">부분공사 후 분진 청소는 일상적인 사무실 관리와 작업 조건이 다릅니다. 사진과 함께 실제 작업 내용을 구분해 안내합니다.</p>

            {extraCases.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-brand-dark">현장에서 직접 찍은 전후 사진 더 보기</h3>
                <div className="mt-5 space-y-8">
                  {extraCases.map(item => <CaseFigure key={item.id} item={item} />)}
                </div>
              </div>
            )}

            <Link href="#cases" className="mt-4 inline-block font-bold text-brand">사무실청소 현장 사진 보기 →</Link>
          </section>

          {/* 6. 지역/예약 */}
          <section id="area" className="scroll-mt-36">
            <SectionTitle id="area-title" kicker="06" title="서비스 가능 지역과 예약 일정" />
            <p>사무실 위치와 희망 날짜를 알려주시면 방문 가능 여부와 일정을 확인합니다.</p>
            <p className="mt-4">업무 시간 중 작업이 어려우면 퇴근 후나 주말 등 원하는 시간을 말씀해 주세요. 현장 일정과 건물 출입 조건을 함께 확인해 조율합니다.</p>
            <p className="mt-5 font-bold text-brand-dark">예약 상담 시 아래 내용을 알려주시면 좋습니다.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {reservationChecklist.map(item => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-5">정기청소는 필요한 인원과 작업 시간을 확인하고, 방문 주기를 함께 협의합니다.</p>
          </section>

          {/* 7. 검수/사후처리 */}
          <section id="checkup" className="scroll-mt-36">
            <SectionTitle id="checkup-title" kicker="07" title="청소 완료 후 검수 및 사후 처리 기준" />
            <p>청소가 끝나면 사전에 협의한 범위를 기준으로 작업 결과를 확인합니다.</p>
            <p className="mt-4">평소 신경 쓰였던 위치나 오염 부위를 미리 알려주시면 마무리할 때 함께 확인하기 좋습니다. 현장에서 검수하기 어렵다면 결과 확인 방법을 사전에 협의해 주세요.</p>
            <p className="mt-4">작업 후 확인이 필요한 부분은 위치와 사진을 전달해 주세요. 협의한 작업 범위와 현장 상태를 기준으로 확인하고 처리 방법을 안내합니다.</p>
            <p className="mt-4 text-[15px] text-gray-500">구체적인 사후 처리 조건은 예약 전 확인해 주세요.</p>
          </section>

          {/* 8. 준비사항 */}
          <section id="prep" className="scroll-mt-36">
            <SectionTitle id="prep-title" kicker="08" title="사무실청소 전 준비사항" />
            <p>작업 전에 다음 사항을 준비해 주시면 청소 진행에 도움이 됩니다.</p>
            <ul className="mt-5 space-y-2.5">
              {prepItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-gray-100 px-4 py-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-[15.5px] leading-7">모든 짐을 옮겨두실 필요가 있는지는 현장마다 다릅니다. 힘쓰시기 전에 먼저 말씀해 주세요. 필요한 준비사항부터 안내해드리겠습니다.</p>
          </section>

          {/* 9. FAQ */}
          <section id="faq" className="scroll-mt-36">
            <SectionTitle id="faq-title" kicker="09" title="사무실청소 자주 묻는 질문" />
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
              <p className="text-xl font-bold">사무실청소 견적 문의</p>
              <p className="mt-3 text-white/80">사무실 위치와 면적, 현장 사진, 희망 일정을 알려주세요.</p>
              <p className="mt-2 text-white/80">찐청소가 작업에 필요한 인원과 장비·약품을 확인하고 청소 범위와 비용을 안내해드립니다. 정기청소를 원하시면 방문 주기와 작업 가능한 시간도 함께 남겨주세요.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaButton>사무실청소 견적 문의하기 →</CtaButton>
                <a href="tel:010-9882-8882" className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-base font-bold text-white hover:bg-white/10">
                  전화 상담: 010-9882-8882
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
