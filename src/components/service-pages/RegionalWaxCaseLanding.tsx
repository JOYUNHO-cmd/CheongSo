import Link from "next/link";
import { absoluteUrl } from "@/lib/site-url";
import { BackToContents } from "./BackToContents";
import { KitchenPhoto } from "./KitchenPhoto";
import { ReadingParagraph } from "./ReadingParagraph";
import styles from "./AnyangKitchenLanding.module.css";

type Photo = readonly [file: string, alt: string, caption: string];

type WaxCase = {
  slug: "bundang" | "seongnam" | "pangyo" | "gwacheon";
  region: string;
  shortRegion: string;
  path: string;
  h1: string;
  hero: string;
  intro: string;
  space: string;
  material: string;
  condition: string;
  crew: string;
  caseTitle: string;
  caseParagraphs: readonly string[];
  photos: readonly Photo[];
  specialQuestion: readonly [string, string];
};

const cases: Record<string, WaxCase> = {
  "경기도-성남시-분당구": {
    slug: "bundang",
    region: "경기도 성남시 분당구",
    shortRegion: "분당",
    path: "/바닥-왁스-코팅/경기도-성남시-분당구/",
    h1: "분당 바닥왁스코팅, 데코타일 사무실 실제 사례",
    hero: "왁스가 고르게 자리 잡기 까다로운 데코타일은 세척 뒤 바닥 상태와 도포 과정을 더 세심하게 확인합니다.",
    intro: "분당 사무실의 회색 데코타일을 세척하고 왁스코팅한 현장입니다. 6명이 9시간 작업했습니다.",
    space: "사무실",
    material: "회색 데코타일",
    condition: "세척 전 바닥 자국과 오염이 보였으며, 소재 자체가 왁스를 잘 먹지 않아 작업이 까다로웠음",
    crew: "6명 · 9시간",
    caseTitle: "왁스가 잘 먹지 않는 데코타일, 왜 작업이 까다로웠나요?",
    caseParagraphs: [
      "이 현장의 회색 데코타일은 소재 자체가 왁스를 잘 먹지 않아 작업이 까다로운 바닥이었습니다. 같은 데코타일이라는 이름만으로 다른 현장과 도포 조건이 같다고 볼 수 없는 이유입니다.",
      "작업 전 사진에는 바닥에 자국과 오염이 보입니다. 작업 중 사진에서는 세척액과 거품을 이용해 표면을 정리하는 과정이 확인되며, 작업 후 사진에서는 조명 반사가 드러나는 코팅 상태를 볼 수 있습니다.",
      "이 사례에는 6명이 9시간 투입됐습니다. 해당 현장의 실제 기록이며, 다른 분당 사무실의 표준 인원이나 시간을 뜻하지 않습니다.",
    ],
    photos: [
      ["01-floor-before.webp", "분당 사무실 바닥왁스코팅 전 회색 데코타일 바닥", "코팅 전 회색 데코타일입니다. 넓은 바닥의 전체 상태와 기존 자국을 확인할 수 있습니다."],
      ["02-work-preparation.webp", "분당 데코타일 사무실 바닥왁스코팅 작업 준비 상태", "집기와 사다리가 남아 있는 작업 준비 구역입니다. 고정된 책상 주변의 접근 조건도 보입니다."],
      ["03-floor-cleaning.webp", "분당 사무실 데코타일 바닥 세척 중 오염과 물기", "세척 중인 데코타일입니다. 젖은 구역과 바닥 자국이 함께 보입니다."],
      ["04-wet-cleaning.webp", "분당 바닥왁스코팅 전 데코타일 거품 세척 과정", "코팅 전에 바닥을 거품 세척하는 과정입니다."],
      ["05-floor-after-cleaning.webp", "분당 사무실 데코타일 세척 후 건조된 바닥", "세척 뒤 정리된 넓은 바닥입니다. 코팅 후 사진과 촬영 위치가 달라 밝기만으로 비교하지 않습니다."],
      ["06-wax-after.webp", "분당 사무실 데코타일 바닥왁스코팅 후 광택", "왁스코팅 후 조명이 바닥에 반사되는 모습입니다."],
    ],
    specialQuestion: ["데코타일이면 모두 왁스가 잘 올라가나요?", "아닙니다. 데코타일도 표면 상태와 기존 관리 이력에 따라 도포가 고르게 자리 잡기 어려울 수 있습니다. 이 분당 사례는 소재 자체가 왁스를 잘 먹지 않아 6명이 9시간 작업한 현장이었습니다."],
  },
  "경기도-성남시": {
    slug: "seongnam",
    region: "경기도 성남시",
    shortRegion: "성남",
    path: "/바닥-왁스-코팅/경기도-성남시/",
    h1: "성남 바닥왁스코팅, 100평 지식산업센터 퇴거청소 사례",
    hero: "사무실에서 반복된 의자 이동은 디럭스타일에 바퀴자국과 검은 오염을 남길 수 있어 오염 상태부터 확인합니다.",
    intro: "성남 지식산업센터 100평 사무실의 퇴거청소와 바닥왁스코팅 사례입니다. 디럭스타일에 의자 바퀴자국이 심했고, 3명이 8시간 작업했습니다.",
    space: "지식산업센터 사무실 · 퇴거청소",
    material: "밝은색 디럭스타일",
    condition: "기존 사무실 사용으로 의자 바퀴자국과 검은 바닥오염이 심했음",
    crew: "3명 · 8시간",
    caseTitle: "100평 퇴거청소, 의자 바퀴자국을 먼저 본 이유",
    caseParagraphs: [
      "이 현장은 기존 사무실을 사용한 뒤 비워진 지식산업센터 퇴거청소 현장이었습니다. 밝은색 디럭스타일 위로 의자 바퀴가 반복해서 지나간 검은 자국과 사용 오염이 두드러졌습니다.",
      "사진에는 세척 장비로 바닥을 정리하는 과정과 세척 전후의 표면 차이가 기록돼 있습니다. 오염을 정리한 뒤 넓은 사무실 바닥에 왁스를 도포했고, 완료 사진에서는 창과 조명의 반사가 보입니다.",
      "면적은 100평이었고 3명이 8시간 작업했습니다. 면적만이 아니라 바퀴자국의 양과 디럭스타일 상태가 실제 작업량에 영향을 준 사례입니다.",
    ],
    photos: [
      ["01-wheel-marks-before.webp", "성남 지식산업센터 퇴거청소 전 디럭스타일 의자 바퀴자국", "작업 전 밝은색 디럭스타일에 검은 의자 바퀴자국과 사용 흔적이 겹쳐 있습니다."],
      ["02-machine-cleaning.webp", "성남 사무실 디럭스타일 바닥 세척 장비 작업", "바닥 세척 장비로 오염을 정리하는 과정입니다."],
      ["03-deep-cleaning.webp", "성남 100평 사무실 디럭스타일 오염 세척 과정", "거품과 세척수가 퍼진 바닥에서 장비 작업이 진행 중입니다."],
      ["04-floor-after-cleaning.webp", "성남 지식산업센터 디럭스타일 세척 후 바닥", "세척 뒤 정리된 넓은 사무실 바닥입니다."],
      ["05-wax-after-wide.webp", "성남 지식산업센터 100평 바닥왁스코팅 완료 전경", "코팅 후 넓은 사무실과 유리 파티션 주변 바닥 전경입니다."],
      ["06-wax-after.webp", "성남 사무실 디럭스타일 바닥왁스코팅 후 광택", "코팅 후 창과 조명이 바닥에 반사되는 모습입니다."],
    ],
    specialQuestion: ["퇴거청소 때 의자 바퀴자국도 함께 지울 수 있나요?", "표면 오염은 바닥 상태를 확인해 세척 범위에 포함할 수 있습니다. 이 성남 사례는 의자 바퀴자국이 심한 디럭스타일을 세척한 뒤 왁스코팅했으며, 재질 손상이나 깊게 남은 흔적은 세척 결과와 구분해 안내합니다."],
  },
  "경기도-성남시-판교": {
    slug: "pangyo",
    region: "경기도 성남시 판교",
    shortRegion: "판교",
    path: "/바닥-왁스-코팅/경기도-성남시-판교/",
    h1: "판교 바닥왁스코팅, 돌타일처럼 보이는 데코타일 사례",
    hero: "무늬가 있는 바닥은 오염과 재질의 패턴을 구분해 세척하고, 현장에 맞는 광택 정도를 확인합니다.",
    intro: "판교 현장의 돌타일처럼 보이는 데코타일을 약품으로 세척하고 은은하게 왁스코팅한 사례입니다. 바닥오염이 상당했으며 3명이 6시간 작업했습니다.",
    space: "업무공간",
    material: "돌타일처럼 보이는 무늬의 데코타일",
    condition: "바닥오염이 상당해 약품을 사용해 오염을 제거한 뒤 은은하게 왁스코팅함",
    crew: "3명 · 6시간",
    caseTitle: "돌타일처럼 보이는 데코타일, 무늬와 오염을 어떻게 구분했나요?",
    caseParagraphs: [
      "사진 속 바닥은 작은 입자 무늬가 있어 돌타일처럼 보이지만 데코타일입니다. 바닥오염이 상당해 코팅 전에 약품을 사용해 오염을 제거했습니다.",
      "작업 중 사진에는 세척 장비와 세척수가 퍼진 구역이 보입니다. 세척 후에는 무늬가 다시 드러났고, 마감은 강한 광택을 과장하기보다 은은한 왁스코팅으로 진행했습니다.",
      "이 사례에는 3명이 6시간 투입됐습니다. 사용한 약품의 제품명과 희석비, 코팅 횟수는 확인된 정보가 없어 임의로 적지 않습니다.",
    ],
    photos: [
      ["01-machine-cleaning.webp", "판교 데코타일 바닥 오염 세척 장비 작업", "오염이 남은 데코타일을 장비로 세척하는 과정입니다."],
      ["02-contamination-before.webp", "판교 돌타일처럼 보이는 데코타일 세척 전 오염", "벽과 장비 주변에 어둡게 쌓인 오염이 보이는 작업 전 바닥입니다."],
      ["03-chemical-cleaning.webp", "판교 데코타일 약품 세척 과정과 바닥 세척수", "약품을 사용해 오염을 정리하는 과정입니다. 제품명과 희석비는 확인되지 않았습니다."],
      ["04-cleaning-progress.webp", "판교 바닥왁스코팅 전 데코타일 오염 제거 과정", "세척 중인 바닥에 오염과 세척수가 함께 보입니다."],
      ["05-floor-after-cleaning.webp", "판교 돌무늬 데코타일 오염 제거 후 바닥", "세척 후 데코타일의 작은 입자 무늬가 드러난 모습입니다."],
      ["06-wax-after.webp", "판교 데코타일 은은한 바닥왁스코팅 완료", "과도하게 번쩍이지 않는 은은한 코팅 상태를 확인할 수 있습니다."],
    ],
    specialQuestion: ["돌타일처럼 보이면 석재용 작업을 해야 하나요?", "겉모습만으로 재질을 확정하지 않습니다. 이 판교 현장의 바닥은 데코타일이며, 실제 재질과 표면 상태를 확인한 뒤 세척과 코팅 방법을 정합니다."],
  },
  "경기도-과천시": {
    slug: "gwacheon",
    region: "경기도 과천시",
    shortRegion: "과천",
    path: "/바닥-왁스-코팅/경기도-과천시/",
    h1: "과천 바닥왁스코팅, 지식산업센터 바닥 페인트 제거 사례",
    hero: "문을 붉게 칠하며 바닥까지 날린 페인트는 일반 먼지와 다르게 제거 범위를 먼저 확인해야 합니다.",
    intro: "과천 지식산업센터에서 문을 붉게 칠하는 과정에 페인트가 바닥까지 날린 현장입니다. 페인트를 제거하면서 바닥왁스코팅까지 진행했고, 3명이 7시간 작업했습니다.",
    space: "지식산업센터",
    material: "사진으로 재질을 확정하지 않음",
    condition: "문을 붉게 칠하며 바닥까지 날린 페인트로 오염됐고, 페인트 제거와 왁스코팅을 함께 진행함",
    crew: "3명 · 7시간",
    caseTitle: "붉은 페인트가 바닥까지 날린 현장, 왜 제거와 코팅을 함께 했나요?",
    caseParagraphs: [
      "이 지식산업센터는 문을 붉게 칠하는 과정에서 페인트가 주변 바닥까지 날려 넓은 구역이 붉게 오염된 상태였습니다. 작업 전 사진에는 문과 벽 주변 바닥에 붉은 흔적이 이어져 있습니다.",
      "바닥의 페인트를 제거하면서 왁스코팅도 함께 진행했습니다. 사진에는 페인트 제거 전 상태, 세척 장비가 놓인 과정, 제거 후 정리된 바닥과 코팅 후 반사가 차례로 기록돼 있습니다.",
      "이 사례에는 3명이 7시간 투입됐습니다. 페인트 종류와 바닥 재질, 굳은 정도가 다른 현장에는 같은 제거 방법이나 결과를 그대로 적용할 수 없습니다.",
    ],
    photos: [
      ["01-red-paint-before.webp", "과천 지식산업센터 바닥왁스코팅 전 붉은 페인트 오염", "붉게 칠한 문 주변에서 바닥까지 페인트가 날린 작업 전 모습입니다."],
      ["02-paint-on-floor.webp", "과천 지식산업센터 바닥에 넓게 날린 붉은 페인트", "바닥 넓은 구역에 퍼진 붉은 페인트와 잔여물을 가까이서 본 모습입니다."],
      ["03-cleaning-machine.webp", "과천 바닥 페인트 제거 작업 후 세척 장비가 놓인 현장", "페인트 제거와 바닥 정리 과정에 사용한 세척 장비가 보입니다."],
      ["04-floor-after-cleaning.webp", "과천 지식산업센터 페인트 제거 후 정리된 바닥", "유리 파티션 안쪽까지 정리된 바닥의 상태를 확인할 수 있습니다."],
      ["05-paint-removed.webp", "과천 지식산업센터 붉은 페인트 제거 후 바닥 표면", "붉은 페인트를 제거한 뒤 드러난 바닥 표면입니다."],
      ["06-wax-after.webp", "과천 지식산업센터 페인트 제거와 바닥왁스코팅 완료", "페인트 제거 후 왁스코팅을 마친 바닥에 조명 반사가 보입니다."],
    ],
    specialQuestion: ["바닥에 날린 페인트도 왁스코팅 전에 제거할 수 있나요?", "가능 여부와 제거 범위는 페인트 종류, 굳은 정도와 바닥 재질을 확인해 안내합니다. 이 과천 사례는 페인트 제거와 왁스코팅을 함께 진행했지만, 모든 페인트 오염에 같은 방법과 결과를 보장하지 않습니다."],
  },
};

const menu = [
  ["photos", "실제 작업 사진"], ["case", "대표 작업 사례"], ["scope", "작업 범위"],
  ["estimate", "견적 확인"], ["process", "진행 순서"], ["local", "지역 상담 안내"],
  ["faq", "자주 묻는 질문"], ["related", "함께 살펴보기"],
] as const;

export function hasRegionalWaxCase(region: string) {
  return region in cases;
}

function ArrowIcon() {
  return <svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path opacity=".4" d="m3 4 4 4-4 4"/><path opacity=".7" d="m12 4 4 4-4 4"/><path d="m21 4 4 4-4 4"/></svg>;
}

export default function RegionalWaxCaseLanding({ region }: { region: string }) {
  const item = cases[region];
  if (!item) return null;

  const faq: [string, string][] = [
    [`${item.shortRegion} 바닥왁스코팅 가격은 평당으로 정하나요?`, "평수만으로 확정하지 않습니다. 바닥 재질과 오염, 기존 피막과 박리 여부, 집기 이동, 필요한 인원·장비, 작업 가능 시간과 건조 조건을 함께 확인합니다."],
    [item.specialQuestion[0], item.specialQuestion[1]],
    ["이 사례와 같은 인원과 시간이 필요한가요?", `그렇지 않습니다. ${item.shortRegion} 사례의 기록은 ${item.crew}이지만, 다른 현장은 면적과 재질, 오염, 집기와 출입 조건에 따라 달라집니다.`],
    ["기존 왁스를 반드시 박리해야 하나요?", "항상 박리하는 것은 아닙니다. 기존 코팅의 들뜸과 겹침, 오염이 피막 아래에 남았는지 확인한 뒤 세척만 할지, 부분 또는 전체 박리가 필요한지 협의합니다."],
    ["코팅 후 언제부터 걸어 다닐 수 있나요?", "사용 제품과 도포 상태, 온도·습도와 환기 조건을 확인한 뒤 안내합니다. 도포가 끝난 시각과 보행·집기 재배치가 가능한 시각은 같지 않을 수 있습니다."],
    ["상담할 때 어떤 사진을 보내면 되나요?", `정확한 ${item.shortRegion} 주소와 층수, 바닥 전체 사진, 오염과 기존 피막의 근접 사진, 모서리와 집기 아래 사진을 보내주세요. 주차·승강기·물 사용 조건과 다시 공간을 사용해야 하는 시간도 함께 알려주세요.`],
  ];
  const structured = [
    { "@context": "https://schema.org", "@type": "Service", name: `${item.shortRegion} 바닥왁스코팅`, serviceType: "바닥왁스코팅", url: absoluteUrl(item.path), description: item.intro, provider: { "@id": absoluteUrl("/#organization") }, areaServed: { "@type": "AdministrativeArea", name: item.region } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["홈", "/"], ["서비스", "/services/"], ["바닥왁스코팅", "/바닥-왁스-코팅/"], [`${item.shortRegion} 바닥왁스코팅`, item.path]].map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(url) })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];

  return <article className={styles.article} data-regional-wax-case={item.slug}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className={styles.hero}><div>
      <nav aria-label="현재 위치"><Link href="/">홈</Link> / <Link href="/services/">서비스</Link> / <Link href="/바닥-왁스-코팅/">바닥왁스코팅</Link> / {item.shortRegion}</nav>
      <p className={styles.eyebrow}>지역별 서비스 안내 · {item.shortRegion}</p>
      <h1>{item.h1}</h1>
      <p>{item.hero}</p>
    </div></div>
    <div className={styles.layout}>
      <aside id="service-toc" tabIndex={-1} className={styles.toc}><h2>이 페이지에서</h2><nav aria-label="페이지 목차">{menu.map(([id, label]) => <a key={id} href={`#${id}`}><ArrowIcon />{label}</a>)}</nav></aside>
      <div className={styles.body}>
        <ReadingParagraph>{item.intro}</ReadingParagraph>
        <dl className={styles.factList}>
          <div><dt>현장</dt><dd>{item.region} · {item.space}</dd></div>
          <div><dt>바닥 재질</dt><dd>{item.material}</dd></div>
          <div><dt>작업 전 상태</dt><dd>{item.condition}</dd></div>
          <div><dt>작업 인원·시간</dt><dd>{item.crew}</dd></div>
        </dl>
        <aside className={styles.notice}><ReadingParagraph>🔎 {item.crew} 작업을 진행했습니다. 공개하지 않은 비용은 적지 않았습니다.</ReadingParagraph></aside>

        <section id="photos"><h2>{item.shortRegion} 바닥왁스코팅 실제 작업 사진</h2><ReadingParagraph>같은 현장의 작업 전·중·후 기록입니다. 사진마다 촬영 위치와 각도, 조명이 달라 밝기와 반사만으로 결과를 판단하지 않습니다.</ReadingParagraph><div className={styles.waxGalleryGrid}>{item.photos.map(([file, alt, caption]) => <KitchenPhoto key={file} src={`/images/regional-wax/${item.slug}/${file}`} alt={alt} caption={caption} width={1600} height={1200} />)}</div><BackToContents /></section>

        <section id="case"><h2>{item.caseTitle}</h2>{item.caseParagraphs.map(paragraph => <ReadingParagraph key={paragraph}>{paragraph}</ReadingParagraph>)}<aside className={styles.notice}><ReadingParagraph>⚠️ 작업 전후 사진의 각도와 조명은 동일하지 않습니다. 사진만으로 다른 현장의 코팅 횟수·내구성·가격이나 같은 결과를 확정하지 않습니다.</ReadingParagraph></aside><BackToContents /></section>

        <section id="scope"><h2>바닥왁스코팅 작업 범위와 별도 확인 항목</h2><h3>기본 작업은 현장 상태에 맞춰 협의합니다</h3><ul><li>바닥 전체 상태와 재질, 기존 피막 확인</li><li>먼지와 표면 오염 정리 및 바닥 세척</li><li>세척 잔여물 정리와 건조 상태 확인</li><li>협의한 구역의 왁스코팅과 마무리 확인</li></ul><h3>다음 항목은 견적 전에 따로 확인합니다</h3><ul><li>기존 왁스의 부분 또는 전체 박리</li><li>페인트·본드·접착제처럼 일반 세척과 다른 오염 제거</li><li>책상·수납장·중량 집기 이동과 원상복귀</li><li>갈라짐·들뜸·변색 등 바닥재 손상과 보수</li><li>야간 작업, 출입 제한, 승강기와 장비 반입 조건</li></ul><BackToContents /></section>

        <section id="estimate"><h2>{item.shortRegion} 바닥왁스코팅 비용과 견적 확인</h2><ReadingParagraph>청소는 찐하게, 견적은 이유 있게 확인합니다. 평수만 보고 가격부터 정하지 않고 실제로 손이 얼마나 가는 현장인지부터 봅니다.</ReadingParagraph><ul><li><strong>재질과 기존 상태:</strong> 바닥재 종류와 코팅이 남아 있는 정도를 확인합니다.</li><li><strong>오염과 전처리:</strong> 표면 세척, 약품 작업, 페인트 제거와 박리 중 필요한 범위를 구분합니다.</li><li><strong>집기와 동선:</strong> 비워진 면적과 집기 아래 작업, 주차·승강기·장비 반입 조건을 확인합니다.</li><li><strong>일정과 건조:</strong> 작업 가능 시간과 보행·집기 재배치가 필요한 시점을 함께 봅니다.</li></ul><ReadingParagraph>이 사례의 정확한 비용은 공개되지 않아 정액 또는 평당 사례로 적지 않았습니다. 사진과 면적, 요청 범위를 받은 뒤 기본 포함 항목과 별도 작업을 나누어 안내합니다.</ReadingParagraph><Link href="/pricing/">찐청소 견적 기준 자세히 보기 →</Link><BackToContents /></section>

        <section id="process"><h2>바닥 세척부터 왁스코팅까지 진행 순서</h2><ol><li><strong>현장 확인:</strong> 바닥 재질, 오염, 기존 코팅과 손상 여부를 살펴봅니다.</li><li><strong>범위 협의:</strong> 세척·박리·특수 오염 제거·집기 이동 중 필요한 작업을 구분합니다.</li><li><strong>바닥 세척:</strong> 합의한 방법으로 오염을 정리하고 잔여물을 회수합니다.</li><li><strong>건조 상태 확인:</strong> 물기와 표면 상태를 살펴 코팅 가능 여부를 확인합니다.</li><li><strong>왁스코팅과 마무리:</strong> 합의한 구역을 코팅하고 이용 재개 전 주의사항을 안내합니다.</li></ol><BackToContents /></section>

        <section id="local"><h2>{item.shortRegion} 바닥왁스코팅 상담 준비</h2><ReadingParagraph>{item.region} 내 정확한 주소와 건물 층수, 주차와 승강기 이용 조건을 알려주세요. 장비 반입 가능 시간과 물 사용 조건도 함께 확인합니다.</ReadingParagraph><ReadingParagraph>바닥 전체가 보이는 사진, 오염과 기존 피막의 근접 사진, 모서리와 집기 아래 사진을 나누어 보내주세요. 마지막 이용 시간과 다음 보행·영업·출근 시간을 알려주시면 건조 시간을 포함해 일정을 검토할 수 있습니다.</ReadingParagraph><ReadingParagraph>이 글에는 {item.shortRegion} 현장에서 촬영한 사진과 작업 기록을 사용했습니다. 다른 지역이나 다른 바닥에는 현장 조건을 다시 확인합니다.</ReadingParagraph><BackToContents /></section>

        <section id="faq"><h2>{item.shortRegion} 바닥왁스코팅 자주 묻는 질문</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><ReadingParagraph>{answer}</ReadingParagraph></details>)}<BackToContents /></section>
        <section id="related"><h2>함께 살펴보기</h2><ul><li><Link href="/바닥-왁스-코팅/">바닥왁스코팅 전체 안내 →</Link></li><li><Link href="/바닥청소/">바닥청소 범위와 견적 조건 →</Link></li><li><Link href="/바닥본드제거/">바닥본드제거 안내 →</Link></li><li><Link href="/사무실청소/">사무실청소 안내 →</Link></li></ul><ReadingParagraph><strong>청소는 찐하게, 견적은 이유 있게.</strong></ReadingParagraph><Link href="/contact/">{item.shortRegion} 바닥왁스코팅 견적 문의 →</Link><BackToContents /></section>
      </div>
    </div>
  </article>;
}
