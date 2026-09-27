import Link from "next/link";
import { absoluteUrl } from "@/lib/site-url";
import { BackToContents } from "./BackToContents";
import { KitchenPhoto } from "./KitchenPhoto";
import { ReadingParagraph } from "./ReadingParagraph";
import styles from "./AnyangKitchenLanding.module.css";

type Photo = readonly [file: string, alt: string, caption: string];
type CaseData = {
  region: string;
  pathLabel: string;
  areaName: string;
  title: string;
  h1: string;
  space: string;
  crew: string;
  hours: string;
  lead: string;
  difficulty: string;
  caseParagraphs: string[];
  photos: Photo[];
  galleryPhotoIndexes: readonly number[];
  evidencePhotoIndexes: readonly [number, number, number];
};

const cases: Record<string, CaseData> = {
  "경기도-양주시": {
    region: "경기도 양주시",
    pathLabel: "양주",
    areaName: "경기도 양주시",
    title: "양주 인테리어청소 | 레드랩 댄스스튜디오 실제 사례 | 찐청소",
    h1: "양주 인테리어청소, 레드랩 댄스스튜디오 실제 사례",
    space: "레드랩 댄스스튜디오",
    crew: "4명",
    hours: "8시간",
    lead: "천장이 높고 바닥이 푹신해 장비 사용 시 바닥 자국까지 주의해야 했던 현장입니다.",
    difficulty: "높은 천장의 에어컨과 스피커를 청소하기 위해 LS 사다리를 사용했습니다. 푹신한 바닥에 자국이 남지 않도록 사다리의 바닥 접촉 부분에 장갑을 여러 겹 끼워 작업했습니다.",
    caseParagraphs: [
      "천장이 높아 에어컨과 스피커를 청소하려면 LS 사다리가 필요했습니다. 높은 곳의 작업 범위뿐 아니라 사다리가 닿는 바닥 상태도 함께 살펴야 했습니다.",
      "바닥은 푹신한 소재여서 사다리를 그대로 놓으면 자국이 생길 수 있었습니다. 사다리의 바닥 접촉 부분에 장갑을 여러 겹 끼워 자국이 나지 않도록 신경 썼습니다.",
      "이 현장은 4명이 8시간 작업했습니다. 같은 댄스스튜디오라도 천장 높이와 바닥 재질, 고소 구역의 범위에 따라 인원과 시간은 달라집니다.",
    ],
    photos: [
      ["01-common-area.webp", "양주 레드랩 댄스스튜디오 인테리어청소 중 공용부 바닥 정리", "작업 기록 · 스튜디오로 이어지는 공용부 바닥을 정리하는 모습입니다."],
      ["02-window-ledge.webp", "양주 레드랩 댄스스튜디오 인테리어청소 후 길게 이어진 창가 턱", "작업 기록 · 통유리 아래 길게 이어진 창가 턱입니다."],
      ["03-studio.webp", "양주 레드랩 댄스스튜디오 인테리어청소 현장의 내부와 푹신한 바닥", "현장 내부 · 조명과 수납장, 푹신한 바닥이 보이는 스튜디오입니다."],
      ["04-high-light.webp", "양주 레드랩 댄스스튜디오 인테리어청소 대상인 높은 천장의 조명", "고소 구역 · 높은 곳에 설치된 조명 주변입니다."],
      ["05-speaker.webp", "양주 레드랩 댄스스튜디오 인테리어청소 중 스피커 표면", "작업 기록 · 높은 위치에서 확인한 스피커 표면입니다."],
      ["06-glass-wall.webp", "양주 레드랩 댄스스튜디오 인테리어청소 후 통유리와 스튜디오 바닥", "작업 기록 · 통유리와 내부 바닥이 함께 보이는 공간입니다."],
    ],
    galleryPhotoIndexes: [0, 1, 5],
    evidencePhotoIndexes: [2, 3, 4],
  },
  "경기도-남양주시": {
    region: "경기도 남양주시 화도읍",
    pathLabel: "화도읍",
    areaName: "경기도 남양주시",
    title: "화도읍 인테리어청소 | 카페 천장·옥상 실제 사례 | 찐청소",
    h1: "화도읍 인테리어청소, 카페 실제 사례",
    space: "카페",
    crew: "3명",
    hours: "9시간",
    lead: "천장 인테리어 조형물의 범위가 넓어 닦기 어려웠고 옥상까지 청소한 현장입니다.",
    difficulty: "천장 인테리어 조형물 때문에 닦는 작업이 어려웠습니다. 조형물의 범위가 상당했고, 실내뿐 아니라 옥상 청소도 진행했습니다.",
    caseParagraphs: [
      "천장에는 여러 방향으로 길게 이어진 인테리어 조형물이 있었습니다. 평평한 천장과 달리 면과 틈이 반복되어 닦아야 하는 범위가 상당했습니다.",
      "실내 계단과 창가, 출입구뿐 아니라 옥상까지 청소 범위에 포함됐습니다. 한 공간의 평수만으로 작업량을 판단하기 어려운 이유입니다.",
      "이 현장은 3명이 9시간 작업했습니다. 다른 카페는 천장 구조와 층별 범위, 외부·옥상 포함 여부에 따라 인원과 시간이 달라집니다.",
    ],
    photos: [
      ["01-entrance.webp", "남양주 화도읍 카페 인테리어청소 현장의 벽돌 외벽과 유리 출입문", "현장 외부 · 벽돌 외벽과 유리 출입문, 외부 공간이 함께 보입니다."],
      ["02-ceiling-structure.webp", "남양주 화도읍 카페 인테리어청소 대상인 천장 인테리어 조형물", "작업 범위 · 여러 방향으로 이어진 천장 인테리어 조형물입니다."],
      ["03-stairs.webp", "남양주 화도읍 카페 인테리어청소 중 계단 작업", "작업 기록 · 실내 계단을 정리하는 모습입니다."],
      ["04-window-ledge.webp", "남양주 화도읍 카페 인테리어청소 전 창가 턱에 남은 오염", "작업 전 · 창가 턱에 자국과 오염이 남아 있습니다."],
      ["05-rooftop.webp", "남양주 화도읍 카페 인테리어청소 범위에 포함된 옥상 공간", "옥상 청소 · 카페 외부와 옥상 공간이 함께 보이는 모습입니다."],
      ["06-interior.webp", "남양주 화도읍 카페 인테리어청소 현장의 내부 바닥과 벽면", "현장 내부 · 바닥과 벽면, 창이 있는 실내 공간입니다."],
    ],
    galleryPhotoIndexes: [0, 3, 5],
    evidencePhotoIndexes: [1, 2, 4],
  },
  "서울특별시-서초구": {
    region: "서울특별시 서초구",
    pathLabel: "서초",
    areaName: "서울특별시 서초구",
    title: "서초 인테리어청소 | 스튜디오 짐 이동 실제 사례 | 찐청소",
    h1: "서초 인테리어청소, 스튜디오 실제 사례",
    space: "스튜디오",
    crew: "4명",
    hours: "8시간",
    lead: "내부에 짐이 많아 물건을 옮겨가며 작업해야 했던 스튜디오 현장입니다.",
    difficulty: "스튜디오 안에 짐이 많았습니다. 작업 구역을 확보하기 위해 짐을 옮겨가며 진행해야 해서 쉽지 않았습니다.",
    caseParagraphs: [
      "스튜디오 내부에는 선반과 장비, 여러 짐이 놓여 있었습니다. 비어 있는 현장처럼 한 번에 바닥과 설비 주변을 작업할 수 없는 상태였습니다.",
      "짐을 옮기며 작업 구역을 만들고, 가려져 있던 바닥과 설비 주변을 순서대로 확인했습니다. 사진에는 배관과 환풍기, 바닥 주변의 오염도 보입니다.",
      "이 현장은 4명이 8시간 작업했습니다. 다른 스튜디오는 짐의 양과 이동 조건, 설비 주변 접근 범위에 따라 인원과 시간이 달라집니다.",
    ],
    photos: [
      ["01-entrance.webp", "서초 스튜디오 인테리어청소 현장의 유리 출입문과 내부", "현장 입구 · 유리 출입문 너머로 내부 공간과 짐이 보입니다."],
      ["02-stored-items.webp", "서초 스튜디오 인테리어청소 전 선반에 놓인 짐", "작업 전 · 선반과 통로에 여러 짐이 놓여 있습니다."],
      ["03-pipe-dust.webp", "서초 스튜디오 인테리어청소 전 배관 주변에 남은 분진", "작업 전 · 배관과 벽면 주변에 분진과 흔적이 보입니다."],
      ["04-exhaust-fan.webp", "서초 스튜디오 인테리어청소 전 환풍기에 쌓인 먼지", "작업 전 · 환풍기 안쪽에 먼지가 쌓인 모습입니다."],
      ["05-floor.webp", "서초 스튜디오 인테리어청소 전 설비 아래 바닥 오염", "작업 전 · 설비 아래쪽 바닥에 오염이 남아 있습니다."],
      ["06-equipment-area.webp", "서초 스튜디오 인테리어청소 중 장비를 옮겨 확보한 작업 구역", "작업 기록 · 장비와 짐을 옮기며 확보한 바닥 작업 구역입니다."],
    ],
    galleryPhotoIndexes: [0, 2, 3],
    evidencePhotoIndexes: [1, 4, 5],
  },
  "경기도-화성시-동탄구": {
    region: "경기도 화성시 동탄구",
    pathLabel: "동탄",
    areaName: "경기도 화성시 동탄구",
    title: "동탄 인테리어청소 | BAR 주류병·폐기물 처리 사례 | 찐청소",
    h1: "동탄 인테리어청소, BAR 실제 사례",
    space: "BAR",
    crew: "3명",
    hours: "8시간",
    lead: "내부의 큰 고급 주류병을 모두 치우고 일반 분리수거가 어려워 폐기물 처리로 마무리한 현장입니다.",
    difficulty: "내부의 병을 전부 치워야 했습니다. 병 대부분이 크기가 큰 고급 주류병이어서 일반적인 분리수거가 어려웠고, 폐기물 처리로 마무리했습니다.",
    caseParagraphs: [
      "BAR 내부 선반과 작업 구역에는 주류병이 많이 놓여 있었습니다. 청소할 면을 확보하려면 병을 먼저 모두 치워야 했습니다.",
      "병 대부분은 크기가 큰 고급 주류병이어서 일반적인 분리수거가 어려운 상황이었습니다. 현장에서는 폐기물 처리로 마무리했습니다.",
      "이 현장은 3명이 8시간 작업했습니다. 다른 BAR는 병과 집기의 양, 반출 동선, 폐기물 처리 범위에 따라 인원과 시간이 달라집니다.",
    ],
    photos: [
      ["01-bar-floor.webp", "동탄 BAR 인테리어청소 현장의 바닥과 선반", "현장 내부 · 바닥과 벽면 선반이 있는 BAR 공간입니다."],
      ["02-counter.webp", "동탄 BAR 인테리어청소 현장의 긴 카운터와 작업 통로", "현장 내부 · 긴 카운터와 안쪽 작업 통로가 보입니다."],
      ["03-work.webp", "동탄 BAR 인테리어청소 중 카운터 안쪽 작업", "작업 기록 · 카운터 안쪽과 유리잔 선반 주변을 정리하는 모습입니다."],
      ["04-refrigerator.webp", "동탄 BAR 인테리어청소 중 냉장 설비 안쪽", "작업 기록 · 냉장 설비 안쪽을 확인하는 모습입니다."],
      ["05-bottles.webp", "동탄 BAR 인테리어청소 중 반출을 위해 모은 주류병", "폐기물 처리 · 반출을 위해 한곳에 모은 크기가 큰 주류병입니다."],
      ["06-shelves.webp", "동탄 BAR 인테리어청소 현장의 병과 집기가 놓인 선반", "현장 내부 · 병과 집기가 놓인 벽면 선반입니다."],
      ["07-bottle-shelves.webp", "동탄 BAR 인테리어청소 전 병과 상자가 놓인 선반과 통로", "현장 상태 · 병과 상자가 놓인 선반과 통로입니다."],
      ["08-bottles-sorting.webp", "동탄 BAR 인테리어청소 중 반출을 위해 분류한 주류병과 짐", "반출 준비 · 주류병과 짐을 한곳에 모아 분류한 모습입니다."],
      ["09-cleared-shelves.webp", "동탄 BAR 인테리어청소 중 병을 치운 뒤 드러난 선반과 카운터", "작업 기록 · 병과 집기를 치운 뒤 드러난 선반과 카운터입니다."],
    ],
    galleryPhotoIndexes: [0, 1, 2, 3, 4, 5],
    evidencePhotoIndexes: [6, 7, 8],
  },
};

const menu = [
  ["photos", "실제 작업 사진"], ["case", "작업 사례"], ["scope", "작업 범위"],
  ["estimate", "견적 확인"], ["process", "진행 순서"], ["local", "지역 상담 안내"],
  ["faq", "자주 묻는 질문"], ["related", "함께 살펴보기"],
] as const;

export function hasRegionalInteriorCase(region: string) { return region in cases; }

export default function RegionalInteriorCaseLanding({ region }: { region: string }) {
  const data = cases[region];
  const path = `/인테리어청소/${region}/`;
  const faq: [string, string][] = [
    [`${data.pathLabel} 인테리어청소 비용은 평당으로 정하나요?`, `평수만으로 확정하지 않습니다. ${data.space}의 작업 범위와 오염, 집기 이동, 고소 구역, 폐기물, 장비 반입 조건과 작업 가능한 시간을 함께 확인해 견적을 안내합니다.`],
    [`이 사례는 몇 명이 얼마나 작업했나요?`, `${data.crew}이 ${data.hours} 작업했습니다. 이 인원과 시간은 해당 ${data.space} 사례의 기록이며 다른 현장의 기준으로 보장하지 않습니다.`],
    ["집기나 짐이 있어도 작업할 수 있나요?", "가능 여부와 범위는 짐의 양과 이동 조건에 따라 달라집니다. 이동 주체와 보관 위치, 파손 우려가 있는 물건, 가려진 구역의 작업 범위를 상담에서 정합니다."],
    ["천장이나 높은 설비도 청소할 수 있나요?", "천장 높이와 대상 설비, 사다리나 장비를 놓을 바닥 상태를 먼저 확인합니다. 안전하게 접근하기 어렵거나 별도 장비가 필요한 구역은 작업 가능 여부와 비용을 따로 안내합니다."],
    ["폐기물 처리도 함께 요청할 수 있나요?", "종류와 양, 크기, 분리수거 가능 여부와 반출 동선을 먼저 확인합니다. 일반 청소와 별도인 항목은 포함 범위와 처리 방법을 상담에서 구분합니다."],
    ["상담할 때 어떤 자료를 보내야 하나요?", `정확한 주소와 층수, ${data.space} 전체 사진, 오염과 높은 구역의 근접 사진, 집기와 폐기물, 주차·승강기·장비 반입 조건, 사용 시작 시간을 보내주세요.`],
  ];
  const structured = [
    { "@context": "https://schema.org", "@type": "Service", name: `${data.pathLabel} 인테리어청소`, serviceType: "인테리어청소", url: absoluteUrl(path), description: data.lead, provider: { "@id": absoluteUrl("/#organization") }, areaServed: { "@type": "AdministrativeArea", name: data.areaName } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["홈", "/"], ["서비스", "/services/"], ["인테리어청소", "/인테리어청소/"], [`${data.pathLabel} 인테리어청소`, path]].map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(url) })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  const imageBase = `/images/interior-cases/${region === "경기도-양주시" ? "yangju" : region === "경기도-남양주시" ? "hwado" : region === "서울특별시-서초구" ? "seocho" : "dongtan"}`;

  return <article className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className={styles.hero}><div>
      <nav aria-label="현재 위치"><Link href="/">홈</Link> / <Link href="/services/">서비스</Link> / <Link href="/인테리어청소/">인테리어청소</Link> / {data.pathLabel}</nav>
      <p className={styles.eyebrow}>지역별 서비스 안내 · {data.pathLabel}</p>
      <h1>{data.h1}</h1><p>{data.lead}</p>
    </div></div>
    <div className={styles.layout}>
      <aside id="service-toc" tabIndex={-1} className={styles.toc}><h2>이 페이지에서</h2><nav aria-label="페이지 목차">{menu.map(([id, label]) => <a key={id} href={`#${id}`}><svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path opacity=".4" d="m3 4 4 4-4 4"/><path opacity=".7" d="m12 4 4 4-4 4"/><path d="m21 4 4 4-4 4"/></svg>{label}</a>)}</nav></aside>
      <div className={styles.body} data-regional-interior-body>
        <ReadingParagraph>{data.region} {data.space} 인테리어청소 현장입니다. {data.difficulty}</ReadingParagraph>
        <dl className={styles.factList}><div><dt>현장</dt><dd>{data.region} · {data.space}</dd></div><div><dt>인원·시간</dt><dd>{data.crew} · {data.hours}</dd></div><div><dt>작업량에 영향을 준 조건</dt><dd>{data.difficulty}</dd></div></dl>
        <aside className={styles.notice}><ReadingParagraph>🔎 {data.crew}이 {data.hours} 작업했습니다.</ReadingParagraph></aside>

        <section id="photos"><h2>{data.pathLabel} 실제 작업 사진</h2><ReadingParagraph>같은 현장의 작업 기록입니다. 촬영 위치와 각도, 조명이 서로 달라 사진의 밝기만으로 결과를 판단하지 않습니다.</ReadingParagraph><div className={styles.galleryGrid}>{data.galleryPhotoIndexes.map(index => { const [file, alt, caption] = data.photos[index]; return <KitchenPhoto key={file} src={`${imageBase}/${file}`} alt={alt} caption={caption} width={1200} height={1600} />; })}</div><BackToContents /></section>

        <section id="case"><h2>{data.space} 인테리어청소, 무엇이 어려웠나요?</h2>{data.caseParagraphs.map(paragraph => <ReadingParagraph key={paragraph}>{paragraph}</ReadingParagraph>)}<h3>사진으로 확인하는 작업 조건</h3><div className={styles.galleryGrid}>{data.evidencePhotoIndexes.map(index => { const [file, alt, caption] = data.photos[index]; return <KitchenPhoto key={`evidence-${file}`} src={`${imageBase}/${file}`} alt={alt} caption={caption} width={1200} height={1600} />; })}</div><aside className={styles.notice}><ReadingParagraph>⚠️ 사진만으로 재질의 손상 여부나 다른 현장의 작업 결과를 확정하지 않습니다. 청소로 바뀌는 오염과 보수·교체가 필요한 부분을 구분합니다.</ReadingParagraph></aside><BackToContents /></section>

        <section id="scope"><h2>인테리어청소 작업 범위와 별도 확인 항목</h2><h3>기본 범위는 상담에서 합의한 구역입니다</h3><ul><li>바닥·벽면·창과 창틀 등 요청한 실내 구역</li><li>접근 가능한 집기와 설비의 외부 표면</li><li>사진과 현장 확인을 통해 합의한 공사 분진과 표면 오염</li><li>상담에서 포함하기로 한 부대공간</li></ul><h3>다음 항목은 별도로 확인합니다</h3><ul><li>높은 천장과 별도 장비가 필요한 고소 구역</li><li>무거운 집기 이동과 파손 우려 물품의 보관</li><li>설비 분해와 내부 청소, 전기 설비 주변 작업</li><li>외부·옥상·공용부처럼 실내와 구분되는 구역</li><li>폐기물 반출과 처리</li><li>찍힘·변색·파손 등 청소가 아닌 보수나 교체</li></ul><BackToContents /></section>

        <section id="estimate"><h2>{data.pathLabel} 인테리어청소 비용과 견적 확인</h2><ReadingParagraph>평수만 보고 가격부터 정하지 않습니다. 같은 면적이라도 높은 구역, 천장 구조, 집기와 폐기물, 외부·옥상 포함 여부에 따라 작업량이 달라집니다.</ReadingParagraph><ul><li><strong>공간 상태:</strong> 공사가 끝났는지와 다른 공정의 출입 여부를 확인합니다.</li><li><strong>작업 범위:</strong> 실내와 고소 구역, 외부·옥상, 집기와 설비 중 필요한 구역을 나눕니다.</li><li><strong>이동·반출:</strong> 옮길 짐과 폐기물의 종류·양, 보관 위치와 반출 동선을 확인합니다.</li><li><strong>현장 조건:</strong> 주차·승강기·층수·물 사용·장비 반입과 작업 가능 시간을 봅니다.</li></ul><ReadingParagraph>이 사례는 {data.crew}이 {data.hours} 작업했습니다. 다른 현장의 비용과 인원·시간은 사진과 요청 범위를 확인한 뒤 안내합니다.</ReadingParagraph><Link href="/pricing/">찐청소 견적 기준 자세히 보기 →</Link><BackToContents /></section>

        <section id="process"><h2>인테리어청소 진행 순서</h2><ol><li><strong>현장 정보 확인:</strong> 주소와 업종, 전체 사진, 공사 종료일과 사용 시작 시간을 확인합니다.</li><li><strong>구역별 상태 확인:</strong> 실내·고소·외부 구역과 집기·폐기물을 나누어 봅니다.</li><li><strong>포함·별도 범위 협의:</strong> 장비 사용, 집기 이동과 폐기물 처리 범위를 구분합니다.</li><li><strong>합의한 범위 작업:</strong> 현장 동선과 재질을 고려해 구역별로 진행합니다.</li><li><strong>마무리 확인:</strong> 요청한 구역과 남은 흔적, 사용 전 확인사항을 살핍니다.</li></ol><BackToContents /></section>

        <section id="local"><h2>{data.pathLabel} {data.space} 상담 준비</h2><ReadingParagraph>정확한 주소와 층수, 주차·승강기 이용 여부, 물 사용과 장비 반입 조건을 알려주세요. 공사가 끝나는 시점과 공간을 사용해야 하는 시간도 필요합니다.</ReadingParagraph><ReadingParagraph>사진은 입구에서 본 전체 공간, 바닥과 천장, 집기와 설비, 오염이 심한 부분, 외부·옥상, 반출할 폐기물 순서로 보내주시면 범위를 확인하는 데 도움이 됩니다.</ReadingParagraph><ReadingParagraph>이 페이지의 사진은 {data.region} {data.space} 현장에서 촬영한 자료입니다. 다른 지역과 업종은 해당 현장의 사진과 조건을 다시 확인해 안내합니다.</ReadingParagraph><BackToContents /></section>

        <section id="faq"><h2>{data.pathLabel} 인테리어청소 자주 묻는 질문</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><ReadingParagraph>{answer}</ReadingParagraph></details>)}<BackToContents /></section>
        <section id="related"><h2>함께 살펴보기</h2><ul><li><Link href="/인테리어청소/">인테리어청소 전체 범위 안내 →</Link></li><li><Link href="/상가청소/">상가청소 범위와 견적 조건 →</Link></li><li><Link href="/폐기물처리/">폐기물 처리 상담 안내 →</Link></li><li><Link href="/외창청소/">외창청소 별도 확인 항목 →</Link></li></ul><ReadingParagraph><strong>청소는 찐하게, 견적은 이유 있게.</strong></ReadingParagraph><Link href="/contact/">{data.pathLabel} 인테리어청소 견적 문의 →</Link><BackToContents /></section>
      </div>
    </div>
  </article>;
}
