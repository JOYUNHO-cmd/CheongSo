import Link from "next/link";
import { absoluteUrl } from "@/lib/site-url";
import { BackToContents } from "./BackToContents";
import { KitchenPhoto } from "./KitchenPhoto";
import { ReadingParagraph } from "./ReadingParagraph";
import styles from "./AnyangKitchenLanding.module.css";

const path = "/상가청소/경기도-의왕시/";
const menu = [
  ["photos", "의왕 실제 작업 사진"], ["case", "내손동 작업 사례"], ["scope", "작업 범위"],
  ["estimate", "견적 확인"], ["process", "진행 순서"], ["local", "지역 상담 안내"],
  ["faq", "자주 묻는 질문"], ["related", "함께 살펴보기"],
] as const;
const photos = [
  ["01-open-area-before.webp", "의왕 내손동 상가 복원청소 전 노출 콘크리트 바닥과 통유리 창이 있는 내부", "작업 전 넓은 내부입니다. 노출 콘크리트 바닥과 통유리 창, 노출형 천장 설비가 보입니다."],
  ["02-open-area-after.webp", "의왕 내손동 상가 복원청소 후 노출 콘크리트 바닥과 통유리 창이 있는 내부", "작업 후 기록입니다. 바닥의 균열과 표면 흔적은 재질과 기존 상태의 일부로 남아 있습니다."],
  ["03-window-ledge-before.webp", "의왕 내손동 상가 복원청소 전 창가 턱과 바닥에 쌓인 공사 분진과 잔여물", "창가 턱과 바닥 가장자리에 분진과 작은 잔여물이 보이는 작업 전 모습입니다."],
  ["04-tile-cleaning.webp", "의왕 내손동 상가 복원청소 중 회색 타일 바닥의 오염과 세척수 자국", "회색 타일 바닥을 정리하는 과정입니다. 물기와 발자국, 작은 잔여물이 함께 보입니다."],
  ["05-tile-after.webp", "의왕 내손동 상가 복원청소 후 정리된 회색 타일 바닥과 점자블록", "작업 후 회색 타일 구역입니다. 앞 사진과 촬영 위치·각도가 달라 일대일 전후 비교 사진은 아닙니다."],
  ["06-restroom-after.webp", "의왕 내손동 상가 복원청소 후 정리된 화장실 타일 바닥과 유리문", "작업 후 화장실 구역입니다. 타일 바닥과 유리문, 칸막이 주변의 상태를 확인할 수 있습니다."],
] as const;
const faq: [string, string][] = [
  ["의왕 상가청소 비용은 평당으로 정하나요?", "평수만으로 확정하지 않습니다. 바닥 재질과 공사 분진·잔여물의 양, 창가와 유리 구역의 범위, 집기 유무, 장비 반입과 작업 가능 시간을 함께 확인합니다."],
  ["인테리어 후 분진과 마감 흔적도 청소 범위에 들어가나요?", "표면에 남은 분진과 협의한 잔여물은 범위를 확인해 안내합니다. 굳은 접착제·실리콘·도료, 재질의 변색과 손상은 일반 청소와 구분하며 시험 작업이나 별도 보수가 필요할 수 있습니다."],
  ["유리 파티션과 창틀도 함께 청소할 수 있나요?", "접근 가능한 실내 유리와 창틀은 요청 범위를 확인해 상담합니다. 유리의 안쪽·바깥쪽, 보호필름과 접착 흔적, 고소 작업 여부에 따라 작업 조건이 달라집니다."],
  ["집기가 들어온 뒤에도 상가청소가 가능한가요?", "가능 여부는 집기의 양과 이동 조건에 따라 달라집니다. 비어 있는 구역과 집기 아래·뒤쪽을 나누고, 무거운 집기의 이동 담당과 보양 범위를 먼저 협의합니다."],
  ["오픈이나 입점 전까지 끝낼 수 있나요?", "현장 상태와 확보된 시간을 확인한 뒤 일정을 안내합니다. 공사가 완전히 끝나는 시점, 다른 공정의 출입, 검수와 입점 시간을 함께 알려주셔야 합니다."],
  ["상담할 때 무엇을 보내면 되나요?", "의왕시 내 정확한 주소와 층수, 전체 공간 사진, 바닥·창가·화장실 등 요청 구역의 근접 사진, 주차·승강기 조건, 공사 종료일과 입점 희망일을 보내주세요."],
];

export default function UiwangStoreLanding() {
  const structured = [
    { "@context": "https://schema.org", "@type": "Service", name: "의왕 상가청소", serviceType: "상가청소", url: absoluteUrl(path), description: "의왕시 내손동 상가 복원청소 실제 사례와 작업 범위·견적 상담 안내", provider: { "@id": absoluteUrl("/#organization") }, areaServed: { "@type": "AdministrativeArea", name: "경기도 의왕시" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["홈", "/"], ["서비스", "/services/"], ["상가청소", "/상가청소/"], ["의왕 상가청소", path]].map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(url) })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <article className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className={styles.hero}><div>
      <nav aria-label="현재 위치"><Link href="/">홈</Link> / <Link href="/services/">서비스</Link> / <Link href="/상가청소/">상가청소</Link> / 의왕</nav>
      <p className={styles.eyebrow}>지역별 서비스 안내 · 의왕</p>
      <h1>의왕 상가청소, 내손동 상가 복원청소 실제 사례</h1>
      <p>공사 뒤 남은 분진과 잔여물은 면적보다 재질과 구역별 상태를 먼저 봅니다.</p>
    </div></div>
    <div className={styles.layout}>
      <aside id="service-toc" tabIndex={-1} className={styles.toc}><h2>이 페이지에서</h2><nav aria-label="페이지 목차">{menu.map(([id, label]) => <a key={id} href={`#${id}`}><svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path opacity=".4" d="m3 4 4 4-4 4"/><path opacity=".7" d="m12 4 4 4-4 4"/><path d="m21 4 4 4-4 4"/></svg>{label}</a>)}</nav></aside>
      <div className={styles.body} data-uiwang-store-body>
        <ReadingParagraph>의왕시 내손동 상가 복원청소 현장입니다. 넓은 노출 콘크리트 바닥과 회색 타일 구역, 통유리 창과 유리문, 화장실이 함께 있는 공간이었습니다.</ReadingParagraph>
        <ul><li><strong>확인된 작업 사례:</strong> 경기도 의왕시 내손동 상가 복원청소</li><li><strong>사진에서 보이는 상태:</strong> 공사 분진과 작은 잔여물, 바닥의 자국과 창가 턱 오염</li><li><strong>작업 인원·시간:</strong> 3명 · 9시간</li><li><strong>상담 시 확인할 범위:</strong> 바닥·창가·유리·화장실 중 필요한 구역과 별도 작업</li><li><strong>견적을 정하는 조건:</strong> 재질, 오염과 잔여물, 집기, 장비 반입, 작업 가능 시간</li></ul>
        <aside className={styles.notice}><ReadingParagraph>🔎 3명이 9시간 작업한 해당 현장의 실제 기록입니다. 공개하지 않은 금액은 임의로 넣지 않았습니다.</ReadingParagraph></aside>

        <section id="photos"><h2>의왕 내손동 실제 작업 사진</h2><ReadingParagraph>사진은 같은 현장의 작업 전·중·후 기록입니다. 촬영 위치와 각도, 조명이 서로 달라 사진의 밝기만으로 결과를 판단하지 않습니다.</ReadingParagraph><div className={styles.galleryGrid}>{photos.map(([file, alt, caption]) => <KitchenPhoto key={file} src={`/images/uiwang-store/${file}`} alt={alt} caption={caption} width={1200} height={1600} />)}</div><BackToContents /></section>

        <section id="case"><h2>내손동 상가 복원청소, 무엇을 먼저 봤나요?</h2>
          <ReadingParagraph>이 현장은 바닥이 한 가지 재질로만 이루어진 공간이 아니었습니다. 넓은 구역에는 노출 콘크리트 바닥이 있었고, 복도와 화장실 쪽에는 회색 타일 바닥이 확인됩니다.</ReadingParagraph>
          <ReadingParagraph>작업 전 사진에는 창가 턱과 바닥 가장자리에 분진과 작은 잔여물이 보입니다. 타일 구역의 작업 중 사진에는 물기와 발자국, 모서리 쪽 잔여물이 함께 남아 있습니다.</ReadingParagraph>
          <ReadingParagraph>따라서 ‘상가 전체 청소’라는 말만으로 묶기보다 노출 콘크리트, 타일, 창가, 유리문과 화장실을 각각 나누어 상태를 확인하는 것이 중요합니다. 바닥의 균열이나 재질 자체의 흔적처럼 청소만으로 바뀌지 않는 부분도 결과와 구분해야 합니다.</ReadingParagraph>
          <ReadingParagraph>서로 다른 바닥 구역과 창가·유리·화장실을 나누어 확인하며 3명이 9시간 작업했습니다. 이 인원과 시간은 내손동 사례의 기록이며 다른 상가의 표준 작업 시간이 아닙니다.</ReadingParagraph>
          <aside className={styles.notice}><ReadingParagraph>⚠️ 작업 전과 작업 후 사진은 같은 각도가 아닙니다. 사진만으로 내구성이나 다른 현장의 결과를 보장하지 않습니다.</ReadingParagraph></aside><BackToContents />
        </section>

        <section id="scope"><h2>상가청소 작업 범위와 별도 확인 항목</h2><h3>기본 범위는 현장에서 합의한 구역입니다</h3><ul><li>노출 콘크리트와 타일 등 합의한 실내 바닥의 표면 오염</li><li>접근 가능한 창틀·창가 턱과 실내 유리</li><li>유리문과 파티션의 접근 가능한 면</li><li>화장실 등 상담에서 정한 부대공간</li></ul><h3>다음 항목은 별도로 확인합니다</h3><ul><li>외부 유리와 장비가 필요한 고소 구역</li><li>보호필름과 굳은 접착제·실리콘·도료 제거</li><li>대량 폐기물과 공사 자재의 반출·처리</li><li>무거운 집기 이동과 보양, 바닥 코팅</li><li>균열·찍힘·변색 등 시설 보수와 마감 공사</li></ul><BackToContents /></section>

        <section id="estimate"><h2>의왕 상가청소 비용과 견적 확인</h2><ReadingParagraph>평수만 보고 가격부터 확정하지 않습니다. 같은 면적이어도 공사 분진의 양, 굳은 잔여물의 종류, 서로 다른 재질의 수, 집기와 접근 조건에 따라 필요한 작업이 달라집니다.</ReadingParagraph><ul><li><strong>공간 상태:</strong> 공사가 완전히 끝났는지, 다른 공정이 다시 들어오는지 확인합니다.</li><li><strong>재질과 오염:</strong> 노출 콘크리트·타일·유리처럼 구역별 재질과 남은 흔적을 봅니다.</li><li><strong>작업 범위:</strong> 실내 유리, 화장실, 보호필름, 폐기물, 코팅을 각각 포함할지 정합니다.</li><li><strong>현장 조건:</strong> 주차·승강기·층수·물 사용·장비 반입 가능 시간과 집기 유무를 확인합니다.</li></ul><ReadingParagraph>이 현장은 3명이 9시간 작업했습니다. 정확한 금액은 공개되지 않아 정액 사례로 제시하지 않으며, 다른 현장은 사진과 요청 범위를 받은 뒤 포함 항목과 별도 항목을 나누어 안내합니다.</ReadingParagraph><Link href="/pricing/">찐청소 견적 기준 자세히 보기 →</Link><BackToContents /></section>

        <section id="process"><h2>상가 복원청소 진행 순서</h2><ol><li><strong>현장 정보 확인:</strong> 주소, 상가 용도, 사진, 공사 종료일과 입점 일정을 확인합니다.</li><li><strong>구역별 범위 협의:</strong> 바닥·창가·유리·화장실과 별도 작업을 나눕니다.</li><li><strong>재질과 접근 조건 확인:</strong> 시험이 필요한 흔적, 집기와 장비 반입 동선을 살펴봅니다.</li><li><strong>합의한 범위 작업:</strong> 다른 공정과 겹치지 않도록 구역별로 진행합니다.</li><li><strong>마무리 확인:</strong> 요청 구역과 남은 흔적, 이용 전 확인사항을 함께 살핍니다.</li></ol><BackToContents /></section>

        <section id="local"><h2>의왕시 내손동 상가 상담 준비</h2><ReadingParagraph>의왕시 내손동 현장은 도로명 주소와 건물 층수, 주차·승강기 이용 가능 여부를 함께 알려주세요. 장비를 옮길 수 있는 시간과 물 사용 조건도 상담에 필요합니다.</ReadingParagraph><ReadingParagraph>사진은 입구에서 찍은 전체 공간, 바닥 재질별 모습, 창가와 유리, 화장실, 제거를 원하는 흔적의 근접 사진 순서로 보내주시면 좋습니다. 공사가 끝나는 날짜와 입점·오픈 전에 공간을 사용해야 하는 시점도 함께 알려주세요.</ReadingParagraph><ReadingParagraph>이 글의 사진은 의왕시 내손동 현장에서 촬영한 자료입니다. 다른 지역의 상가청소는 해당 현장의 사진과 조건을 다시 확인해 안내합니다.</ReadingParagraph><BackToContents /></section>

        <section id="faq"><h2>의왕 상가청소 자주 묻는 질문</h2>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><ReadingParagraph>{answer}</ReadingParagraph></details>)}<BackToContents /></section>
        <section id="related"><h2>함께 살펴보기</h2><ul><li><Link href="/상가청소/">상가청소 전체 범위 안내 →</Link></li><li><Link href="/인테리어청소/">인테리어 공사 후 청소 안내 →</Link></li><li><Link href="/바닥청소/">바닥청소 범위와 견적 조건 →</Link></li><li><Link href="/폐기물처리/">공사 후 폐기물 처리 안내 →</Link></li></ul><ReadingParagraph><strong>청소는 찐하게, 견적은 이유 있게.</strong></ReadingParagraph><Link href="/contact/">의왕 상가청소 견적 문의 →</Link><BackToContents /></section>
      </div>
    </div>
  </article>;
}
