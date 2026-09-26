import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import article from "@/lib/anyang-kitchen-article.json";
import { absoluteUrl } from "@/lib/site-url";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";
import { KitchenPhoto } from "./KitchenPhoto";
import styles from "./AnyangKitchenLanding.module.css";

const source = article.markdown.trim().split(/\r?\n/);
const title = source[0].slice(2);
const chunks = article.markdown.trim().split(/^## /m);
const intro = chunks[0].split(/\r?\n/).slice(1).join("\n");
const sections = chunks.slice(1).map((chunk, index) => {
  const split = chunk.indexOf("\n");
  return { id: `section-${index + 1}`, heading: chunk.slice(0, split).trim(), body: chunk.slice(split + 1).trim() };
});
const faq = sections[7].body.split(/^### /m).filter(Boolean).map(chunk => {
  const split = chunk.indexOf("\n");
  return [chunk.slice(0, split).trim(), chunk.slice(split + 1).trim()];
});
const menu = [[1,"안양 실제 작업 사진"],[5,"작업 범위"],[4,"견적 확인"],[7,"진행 순서"],[6,"지역 상담 안내"],[8,"자주 묻는 질문"],[9,"함께 살펴보기"]] as const;

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)]+\))/g).map((part,i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2,-2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return link ? <Link key={i} href={link[2]}>{link[1]}</Link> : part;
  });
}
function blocks(text: string) {
  const paragraphs = text.split(/\n\s*\n/);
  const rendered: ReactNode[] = [];
  for (let i=0;i<paragraphs.length;i++) {
    const block = paragraphs[i].trim();
    const photo = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (photo) {
      // 연속된 사진은 다른 지역 사례처럼 2열로 묶어 한 장이 과하게 커지지 않게 합니다.
      const group: ReactNode[] = [];
      let match: RegExpMatchArray | null = photo;
      while (match) {
        const caption = paragraphs[i+1]?.trim();
        const hasCaption = caption?.startsWith("*") && caption.endsWith("*");
        group.push(<KitchenPhoto key={i} src={match[2]} alt={match[1]} caption={hasCaption ? caption.slice(1,-1) : ""} />);
        if (hasCaption) i++;
        match = paragraphs[i+1]?.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/) ?? null;
        if (match) i++;
      }
      rendered.push(<div key={`photos-${i}`} className={styles.photoGrid}>{group}</div>);
    } else if (/^(?:- |\d+\. )/.test(block)) {
      const List = block.startsWith("- ") ? "ul" : "ol";
      rendered.push(<List key={i}>{block.split("\n").map((line,j)=><li key={j}>{inline(line.replace(/^(?:- |\d+\. )/,""))}</li>)}</List>);
    } else if (block.startsWith("> ")) {
      rendered.push(<aside key={i} className={styles.notice}><ReadingParagraph>{inline(block.slice(2))}</ReadingParagraph></aside>);
    } else if (block) rendered.push(<ReadingParagraph key={i}>{inline(block)}</ReadingParagraph>);
  }
  return rendered;
}

export default function AnyangKitchenLanding() {
  const path = "/주방청소/경기도-안양시/";
  const structured = [
    {"@context":"https://schema.org","@type":"Service",name:"안양 주방청소",serviceType:"주방청소",url:absoluteUrl(path),description:"안양 배달 돈까스 주방의 실제 사진과 작업 범위·견적 상담 안내",provider:{"@id":absoluteUrl("/#organization")},areaServed:{"@type":"AdministrativeArea",name:"경기도 안양시"}},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[["홈","/"],["서비스","/services/"],["주방청소","/주방청소/"],["안양 주방청소",path]].map(([name,url],i)=>({"@type":"ListItem",position:i+1,name,item:absoluteUrl(url)}))},
    {"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))},
  ];
  return <article className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}} />
    <div className={styles.hero}><div>
      <nav aria-label="현재 위치"><Link href="/">홈</Link> / <Link href="/services/">서비스</Link> / <Link href="/주방청소/">주방청소</Link> / 안양</nav>
      <p className={styles.eyebrow}>지역별 서비스 안내 · 안양</p><h1>{title}</h1>
      <p>평수와 함께, 기기 안팎과 아래쪽에 필요한 작업을 살펴봅니다.</p>
    </div></div>
    <div className={styles.layout}>
      <aside id="service-toc" tabIndex={-1} className={styles.toc}><h2>이 페이지에서</h2><nav aria-label="페이지 목차">{menu.map(([id,label])=><a key={id} href={`#section-${id}`}><svg aria-hidden="true" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path opacity=".4" d="m3 4 4 4-4 4"/><path opacity=".7" d="m12 4 4 4-4 4"/><path d="m21 4 4 4-4 4"/></svg>{label}</a>)}</nav></aside>
      <div className={styles.body} data-kitchen-body>{blocks(intro)}{sections.map(section=><section key={section.id} id={section.id}>
        <h2>{section.heading}</h2>
        {section.id === "section-8" ? faq.map(([question,answer])=><details key={question}><summary>{question}</summary><ReadingParagraph>{answer}</ReadingParagraph></details>) : <Fragment>{blocks(section.body)}</Fragment>}
        <BackToContents />
      </section>)}</div>
    </div>
  </article>;
}
