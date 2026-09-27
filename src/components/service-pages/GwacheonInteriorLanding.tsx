import Link from "next/link";
import { absoluteUrl } from "@/lib/site-url";
import { BackToContents } from "./BackToContents";
import { KitchenPhoto } from "./KitchenPhoto";
import { ReadingParagraph } from "./ReadingParagraph";
import styles from "./AnyangKitchenLanding.module.css";

const path = "/인테리어청소/경기도-과천시/";
const menu = [
  ["photos", "과천 실제 작업 사진"], ["case", "술집 작업 사례"], ["scope", "작업 범위"],
  ["estimate", "견적 확인"], ["process", "진행 순서"], ["local", "지역 상담 안내"],
  ["faq", "자주 묻는 질문"], ["related", "함께 살펴보기"],
] as const;

const photos = [
  ["01-kitchen-wall-before.webp", "과천 술집 인테리어청소 전 주방 벽면과 설비 주변 기름때", "작업 전 · 주방 벽면과 설비 주변에 남아 있던 기름때입니다."],
  ["02-kitchen-floor-before.webp", "과천 술집 인테리어청소 전 주방 바닥과 분리된 설비 주변 오염", "작업 전 · 주방 바닥과 설비 주변의 오염 상태입니다."],
  ["03-filter-before.webp", "과천 술집 인테리어청소 전 먼지와 오염이 쌓인 필터", "작업 전 · 먼지와 오염이 쌓여 있던 필터입니다."],
  ["04-kitchen-after.webp", "과천 술집 인테리어청소 후 정리된 주방 바닥과 스테인리스 설비", "작업 후 · 주방 바닥과 스테인리스 설비가 정리된 모습입니다."],
  ["05-hall-after.webp", "과천 술집 인테리어청소 후 정리된 홀 좌석과 바닥", "작업 후 · 좌석과 바닥이 있는 홀 구역입니다."],
  ["06-window-before.webp", "과천 술집 인테리어청소 전 오염이 남은 창과 창틀", "작업 전 · 창과 창틀에 오염이 남아 있던 모습입니다."],
  ["07-window-after.webp", "과천 술집 인테리어청소 후 정리된 창과 창틀", "작업 후 · 창과 창틀을 정리한 모습입니다. 앞 사진과 촬영 위치는 다릅니다."],
] as const;

const faq: [string, string][] = [
  ["과천 인테리어청소 비용은 평당으로 정하나요?", "평수만으로 확정하지 않습니다. 주방 기름때와 흡연실 니코틴처럼 오염의 종류와 정도, 작업 구역, 집기와 설비, 장비 반입 조건, 작업 가능한 시간을 함께 확인해 견적을 안내합니다."],
  ["술집 주방의 기름때도 인테리어청소에 포함되나요?", "포함 여부는 상담에서 범위를 정합니다. 주방 벽·바닥처럼 접근 가능한 표면과 후드·덕트 내부, 설비 분해 작업은 범위가 다르므로 사진과 요청 내용을 먼저 확인합니다."],
  ["흡연실 니코틴 오염도 청소할 수 있나요?", "오염된 표면과 재질을 먼저 확인해야 합니다. 니코틴이 깊게 배거나 변색·손상이 남은 부분은 청소만으로 모두 바뀌지 않을 수 있어, 작업 가능한 범위와 남을 수 있는 한계를 미리 안내합니다."],
  ["3명이 9시간이면 다른 술집도 같은 시간에 끝나나요?", "같다고 볼 수 없습니다. 3명·9시간은 이 과천 술집 사례의 기록이며, 다른 현장은 면적과 오염, 집기, 주방과 흡연실의 범위에 따라 달라집니다."],
  ["영업 시작 전에 작업을 끝낼 수 있나요?", "현장 상태와 확보된 시간을 확인한 뒤 일정을 안내합니다. 공사나 집기 설치가 끝나는 시점, 출입 가능 시간, 검수와 영업 시작 시간을 함께 알려주세요."],
  ["상담할 때 어떤 사진을 보내야 하나요?", "전체 공간과 주방·흡연실, 기름때와 니코틴이 심한 부분, 창호와 바닥, 이동이 필요한 집기, 주차·승강기 동선을 함께 보내주세요. 원하는 작업 범위와 사용 시작 시간도 알려주시면 좋습니다."],
];

export default function GwacheonInteriorLanding() {
  const structured = [
    { "@context": "https://schema.org", "@type": "Service", name: "과천 인테리어청소", serviceType: "인테리어청소", url: absoluteUrl(path), description: "과천 술집의 주방 기름때와 흡연실 니코틴 오염을 청소한 실제 사례와 견적 안내", provider: { "@id": absoluteUrl("/#organization") }, areaServed: { "@type": "AdministrativeArea", name: "경기도 과천시" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["홈", "/"], ["서비스", "/services/"], ["인테리어청소", "/인테리어청소/"], ["과천 인테리어청소", path]].map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(url) })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];

  return <article className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className={styles.hero}><div>
      <nav aria-label="현재 위치"><Link href="/">홈</Link> / <Link href="/services/">서비스</Link> / <Link href="/인테리어청소/">인테리어청소</Link> / 과천</nav>
      <p className={styles.eyebrow}>지역별 서비스 안내 · 과천</p>
      <h1>과천 인테리어청소, 술집 주방·흡연실 실제 사례</h1>
      <p>주방 기름때와 흡연실 니코틴은 오염 구역과 상태를 나누어 확인해야 합니다.</p>
    </div></div>

    <div className={styles.layout}>
      <aside id="service-toc" tabIndex={-1} className={styles.toc}><h2>이 페이지에서</h2><nav aria-label="페이지 목차">{menu.map(([id, label]) => <a key={id} href={`#${id}`}><svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path opacity=".4" d="m3 4 4 4-4 4"/><path opacity=".7" d="m12 4 4 4-4 4"/><path d="m21 4 4 4-4 4"/></svg>{label}</a>)}</nav></aside>

      <div className={styles.body} data-gwacheon-interior-body>
        <ReadingParagraph>경기도 과천시 술집 인테리어청소 현장입니다. 주방에는 기름때가 제법 있었고, 흡연실에는 니코틴 오염이 심했습니다.</ReadingParagraph>
        <ul>
          <li><strong>확인된 작업 사례:</strong> 경기도 과천시 술집 인테리어청소</li>
          <li><strong>주요 오염:</strong> 주방 기름때 · 흡연실 니코틴</li>
          <li><strong>작업 인원·시간:</strong> 3명 · 9시간</li>
          <li><strong>기본 확인 범위:</strong> 요청한 구역과 접근 가능한 표면</li>
          <li><strong>별도 확인 항목:</strong> 후드·덕트 내부, 설비 분해, 냄새 작업, 보수나 교체가 필요한 부분</li>
        </ul>
        <aside className={styles.notice}><ReadingParagraph>🔎 3명이 9시간 작업했습니다.</ReadingParagraph></aside>

        <section id="photos"><h2>과천 술집 실제 작업 사진</h2><ReadingParagraph>같은 현장의 작업 전·후 기록입니다. 사진마다 촬영 위치와 각도, 조명이 달라 밝기만으로 결과를 판단하지 않습니다.</ReadingParagraph><div className={styles.galleryGrid}>{photos.map(([file, alt, caption]) => <KitchenPhoto key={file} src={`/images/gwacheon-interior/${file}`} alt={alt} caption={caption} width={1200} height={1600} />)}</div><BackToContents /></section>

        <section id="case"><h2>주방 기름때와 흡연실 니코틴이 함께 있던 현장</h2>
          <ReadingParagraph>주방에는 기름때가 제법 쌓여 있어 쉽지 않은 상태였습니다. 사진에서는 벽면과 바닥, 설비 주변, 필터에 남은 오염을 확인할 수 있습니다.</ReadingParagraph>
          <ReadingParagraph>흡연실에는 니코틴 오염이 심했습니다. 니코틴은 묻은 표면과 재질에 따라 청소 가능한 범위와 남는 흔적이 달라질 수 있으므로, 상담할 때 오염 부위의 전체 사진과 근접 사진을 함께 확인해야 합니다.</ReadingParagraph>
          <ReadingParagraph>주방과 흡연실처럼 성격이 다른 오염이 한 공간에 있으면 면적만으로 작업량을 판단하기 어렵습니다. 이 과천 술집은 3명이 9시간 작업했으며, 다른 현장의 표준 인원이나 시간으로 보장하지 않습니다.</ReadingParagraph>
          <aside className={styles.notice}><ReadingParagraph>⚠️ 청소로 바뀌는 표면 오염과 재질의 변색·손상은 구분해야 합니다. 사진만으로 제거 정도나 다른 현장의 결과를 확정하지 않습니다.</ReadingParagraph></aside><BackToContents />
        </section>

        <section id="scope"><h2>인테리어청소 작업 범위와 별도 확인 항목</h2>
          <h3>기본 범위는 상담에서 합의한 구역입니다</h3>
          <ul><li>홀과 주방 등 요청한 실내 구역의 접근 가능한 표면</li><li>바닥·벽면·창과 창틀의 합의한 범위</li><li>접근 가능한 집기와 설비 외부 표면</li><li>흡연실 등 별도로 요청한 부대공간</li></ul>
          <h3>다음 항목은 별도로 확인합니다</h3>
          <ul><li>후드·덕트 내부와 설비 분해가 필요한 작업</li><li>집기 이동과 내부 청소, 전기·가스 설비 주변 작업</li><li>별도의 냄새 제거 작업</li><li>외부 유리와 고소 장비가 필요한 구역</li><li>변색·손상·도장처럼 청소가 아닌 보수나 교체가 필요한 부분</li><li>폐기물 반출과 처리</li></ul><BackToContents />
        </section>

        <section id="estimate"><h2>과천 인테리어청소 비용과 견적 확인</h2>
          <ReadingParagraph>평수만 보고 가격부터 정하지 않습니다. 이 사례처럼 주방 기름때와 흡연실 니코틴이 함께 있으면 구역별 오염 상태와 손이 가는 범위를 먼저 봅니다.</ReadingParagraph>
          <ul><li><strong>오염 상태:</strong> 기름때와 니코틴의 범위, 표면에 남은 정도를 확인합니다.</li><li><strong>작업 범위:</strong> 홀·주방·흡연실·창호 중 필요한 구역과 별도 작업을 나눕니다.</li><li><strong>집기와 설비:</strong> 이동 또는 분해가 필요한지, 내부 작업을 포함하는지 확인합니다.</li><li><strong>현장 조건:</strong> 층수와 주차·승강기, 물 사용, 장비 반입, 작업 가능 시간을 확인합니다.</li></ul>
          <ReadingParagraph>이 현장은 3명이 9시간 작업했습니다. 다른 현장의 비용과 인원·시간은 사진과 요청 범위를 확인한 뒤 안내합니다.</ReadingParagraph>
          <Link href="/pricing/">찐청소 견적 기준 자세히 보기 →</Link><BackToContents />
        </section>

        <section id="process"><h2>인테리어청소 진행 순서</h2><ol>
          <li><strong>현장 정보 확인:</strong> 주소와 업종, 전체 사진, 원하는 작업일을 확인합니다.</li>
          <li><strong>구역별 상태 확인:</strong> 홀·주방·흡연실과 창호의 오염을 나누어 봅니다.</li>
          <li><strong>포함·별도 범위 협의:</strong> 설비 분해, 집기 이동, 냄새 작업과 폐기물 처리를 구분합니다.</li>
          <li><strong>합의한 범위 작업:</strong> 현장 동선과 사용 일정을 고려해 구역별로 진행합니다.</li>
          <li><strong>마무리 확인:</strong> 요청한 구역과 남은 흔적, 사용 전 확인사항을 살핍니다.</li>
        </ol><BackToContents /></section>

        <section id="local"><h2>과천 술집 인테리어청소 상담 준비</h2>
          <ReadingParagraph>과천시 내 정확한 주소와 층수, 주차·승강기 이용 여부, 물 사용과 장비 반입 조건을 알려주세요. 공사나 집기 설치가 끝나는 시점과 영업 시작 전 사용할 수 있는 시간도 필요합니다.</ReadingParagraph>
          <ReadingParagraph>사진은 입구에서 본 전체 공간, 홀과 주방, 흡연실, 기름때와 니코틴이 심한 부분, 창호와 바닥, 이동이 필요한 집기 순서로 보내주시면 범위를 확인하는 데 도움이 됩니다.</ReadingParagraph>
          <ReadingParagraph>이 페이지의 사진은 과천시 술집 현장에서 촬영한 자료입니다. 다른 지역과 다른 업종은 해당 현장의 사진과 조건을 다시 확인해 안내합니다.</ReadingParagraph><BackToContents />
        </section>

        <section id="faq"><h2>과천 인테리어청소 자주 묻는 질문</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><ReadingParagraph>{answer}</ReadingParagraph></details>)}<BackToContents /></section>

        <section id="related"><h2>함께 살펴보기</h2><ul>
          <li><Link href="/인테리어청소/">인테리어청소 전체 범위 안내 →</Link></li>
          <li><Link href="/주방청소/">주방청소 범위와 견적 조건 →</Link></li>
          <li><Link href="/후드청소/">후드청소 별도 확인 항목 →</Link></li>
          <li><Link href="/냄새악취제거/">냄새·악취 제거 상담 안내 →</Link></li>
        </ul><ReadingParagraph><strong>청소는 찐하게, 견적은 이유 있게.</strong></ReadingParagraph><Link href="/contact/">과천 인테리어청소 견적 문의 →</Link><BackToContents /></section>
      </div>
    </div>
  </article>;
}
