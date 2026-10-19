import Image from 'next/image';
import Link from 'next/link';
import cases from '@/lib/trash-batch-01.json';
import photoSets from '@/lib/trash-batch-01-photos.json';
import regions from '@/lib/trash-batch-01-regions.json';
import { TrashCaseSchema } from './TrashCaseSchema';
import { ReadingParagraph } from './ReadingParagraph';
import { BackToContents } from './BackToContents';
import { TocSidebar, CtaButton } from './shared';
import styles from './Readability.module.css';

type Case = Omit<(typeof cases)[number], 'crew' | 'hours'> & { crew: number | null; hours: number | null };
type Photo = (typeof photoSets)['gwanak'][number];
export function batchFaq(c: Case) {
  return [c.faq,
    [`${c.area} 쓰레기집청소비용은 평수로 정하나요?`, `평수만으로 정하지 않습니다. ${c.estimate} 폐기물의 양과 종류, 오염 상태, 필요한 인원과 반출 조건을 함께 살펴 쓰레기집청소견적을 안내합니다.`],
    ['폐기물처리와 바닥청소도 포함되나요?', '폐기물처리와 실내 바닥청소는 쓰레기집청소의 기본 작업 범위입니다. 남길 물건과 처리할 물건을 구분하고, 공간별 세부 범위와 별도 확인 항목은 상담 때 안내합니다.'],
    ['이 사례와 같은 인원과 시간으로 끝나나요?', c.crew !== null && c.hours !== null ? `현장마다 다릅니다. 이번 사례는 ${c.crew}명이 ${c.hours}시간 작업했습니다. 다른 집은 물량과 오염, 이동 조건에 따라 필요한 인원과 시간이 달라집니다.` : '현장마다 다릅니다. 폐기물의 양과 오염 상태, 보관할 물품의 분류 범위, 차량까지의 이동 조건을 함께 확인해 필요한 인원과 일정을 안내합니다.'],
  ];
}
export default function TrashBatchLanding({ item: c, published = false, publishedRegion, photoOverride, previewList = '/preview/trash-batch/' }: { item: Case; published?: boolean; publishedRegion?: string; photoOverride?: Photo[]; previewList?: string }) {
  const faq = batchFaq(c);
  const photos = photoOverride ?? photoSets[c.slug as keyof typeof photoSets];
  const toc = [['case', `${c.area} 작업 사례`], ['scope', '작업 범위'], ['estimate', '비용·견적 확인'], ['process', '상담과 진행 순서'], ['faq', '자주 묻는 질문'], ['contact', '상담 준비와 문의']] as const;
  return <article className={`${styles.landing} ${styles.enhanced}`}>
    {published ? <TrashCaseSchema region={publishedRegion ?? regions[c.slug as keyof typeof regions]} area={c.area} title={c.title} description={c.description} /> : <div className="bg-amber-50 px-5 py-3 text-center text-sm text-amber-950">검토용 미리보기 <Link className="inline-flex min-h-11 items-center underline" href={previewList}>사례 목록 →</Link></div>}
    <header className="bg-brand-dark px-5 py-12 text-white md:py-16"><div className="mx-auto max-w-5xl">
      <nav aria-label="현재 위치" className="mb-6 flex flex-wrap gap-2 text-sm"><Link href="/">홈</Link><span>/</span><Link href="/쓰레기집청소/">쓰레기집청소</Link><span>/</span><span>{c.area} 사례</span></nav>
      <h1 className="max-w-4xl text-3xl font-black md:text-4xl">{c.heading}</h1>
      <p data-case-summary className="mt-5 max-w-3xl text-xl font-bold leading-8 md:text-2xl">{c.summary}</p>
      <ReadingParagraph className="mt-4 max-w-3xl text-lg leading-8">{c.intro}</ReadingParagraph>
      <CtaButton className="mt-6 !bg-white !text-brand-dark">쓰레기집청소 상담하기 →</CtaButton>
    </div></header>
    <div className={styles.layout}><TocSidebar toc={toc} id="service-toc" /><div className={`${styles.body} [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-dark [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold`}>
      <section id="case"><h2>{c.caseHeading}</h2>
        <p className="mb-5 font-bold text-brand-dark">📍 {c.area} · {c.space}{c.crew !== null && c.hours !== null && <> · <span className="whitespace-nowrap">{c.crew}명 · {c.hours}시간</span></>}</p>
        {c.paragraphs.map(p => <ReadingParagraph key={p}>{p}</ReadingParagraph>)}
        <p className="mt-6 font-bold text-brand-dark">📷 현장 사진 {photos.length}장</p>
        <div className="mt-4 grid items-start gap-5 sm:grid-cols-2">{photos.map(p => <figure key={p.src}>
          <p className="mb-2 font-bold text-brand-dark">{p.stage}</p>
          <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 768px) 380px, 100vw" className="block h-auto w-full rounded-sm" />
          <figcaption className="mt-2 text-slate-600">{p.caption}</figcaption>
        </figure>)}</div>
        <ReadingParagraph className="mt-5 text-slate-600">사진마다 촬영 구역과 방향, 조명이 다를 수 있습니다. 사진은 눈에 보이는 상태를 살펴보는 자료이며 냄새 제거 여부나 위생 상태 전체를 증명하지는 않습니다. 현장 조건에 따라 작업 범위와 결과가 달라집니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="scope"><h2>폐기물처리와 실내 바닥청소가 기본입니다</h2>
        <ReadingParagraph>쓰레기집청소에는 폐기물처리와 실내 바닥청소가 기본으로 포함됩니다. 보관할 물건과 처리할 물건부터 구분하고, 요청하시는 공간별 청소 범위를 함께 확인합니다.</ReadingParagraph>
        <ReadingParagraph>{c.slug === 'incheon-seo' ? '이번 현장에서는 냉장고 안의 상한 음식물도 처리했습니다. 냉장고 내부 등 가전 관련 작업이 필요하면 상담 때 함께 말씀해 주세요.' : c.slug === 'bucheon' ? '이번 아파트는 실내에서 쓰레기를 정리한 뒤 사다리차로 반출했습니다. 사다리차 사용은 모든 현장의 기본 조건이 아니며, 장비 사용 가능 여부와 비용을 별도로 확인합니다.' : '주방·욕실의 세부 청소나 가전 내부 정리가 필요하면 상담 때 말씀해 주세요. 사진에 보이는 모든 물품이 폐기 대상인 것은 아니므로 보관 기준을 먼저 확인합니다.'}</ReadingParagraph>
        <ReadingParagraph>청소로 복원이 어려운 자재 손상이나 교체가 필요한 부분은 청소 범위와 구분해 확인합니다. 사용한 약품이나 작업 횟수만으로 결과를 보장하지 않습니다.</ReadingParagraph>
        <Link className="inline-flex min-h-11 items-center font-bold underline" href="/쓰레기집청소/">쓰레기집청소 전체 서비스 안내 →</Link><BackToContents />
      </section>
      <section id="estimate"><h2>{c.area} 쓰레기집청소비용, 실제 작업량부터 봅니다</h2>
        <ReadingParagraph>{c.estimate}</ReadingParagraph>
        <h3 className="mt-6">쓰레기집청소견적 상담 준비</h3>
        <ul className="list-disc space-y-2 pl-5"><li>방·주방·욕실 등 전체 공간 사진</li><li>처리할 물품의 종류와 양, 남길 물건</li><li>오염과 냄새가 있는 구역</li><li>층수·승강기·주차와 차량까지의 반출 동선</li><li>희망 일정과 출입 가능한 시간</li></ul>
        <ReadingParagraph className="mt-5">위 항목은 새 현장을 상담할 때 확인하는 내용입니다. 사진에 가려진 물량이나 별도 장비가 필요한 조건이 있으면 추가로 살펴 작업 범위와 비용을 안내합니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="process"><h2>상담부터 작업 후 확인까지</h2>
        <ReadingParagraph>다음은 새로운 현장을 의뢰하실 때 확인하는 진행 순서입니다.</ReadingParagraph>
        <ol className="mt-4 list-decimal space-y-3 pl-6"><li>위치와 공간 사진, 요청 범위를 알려주세요.</li><li>남길 물건·처리할 물건과 반출 조건을 확인합니다.</li><li>작업 범위와 견적, 필요한 일정·장비를 협의합니다.</li><li>합의한 범위로 폐기물처리와 청소를 진행합니다.</li><li>작업 범위와 남은 주의사항을 확인합니다.</li></ol>
        <ReadingParagraph className="mt-5">작업 시간과 공간을 다시 사용할 수 있는 시점은 같지 않을 수 있습니다. 바닥의 건조 상태와 환기 등 이용 전 확인할 사항은 현장에 맞춰 안내합니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="faq"><h2>자주 묻는 질문</h2><div className="divide-y divide-slate-200 border-y border-slate-200">{faq.map(([q,a]) => <details key={q} className="group py-2"><summary className="cursor-pointer list-none justify-between gap-4 py-3 font-bold text-brand-dark">{q}<span aria-hidden="true" className="shrink-0 group-open:rotate-180">⌄</span></summary><ReadingParagraph className="pb-4">{a}</ReadingParagraph></details>)}</div><BackToContents /></section>
      <section id="contact"><h2>{c.area} 쓰레기집청소 상담</h2>
        <ReadingParagraph>집 전체를 한 번에 정리하기 막막하다면 현재 상태를 사진으로 알려주세요. 보관할 물품과 정리가 필요한 범위를 함께 살펴 안내하겠습니다.</ReadingParagraph>
        <ReadingParagraph>청소 없이 수거만 필요하거나, 기본 청소 외에 냄새에 대한 별도 조치가 필요한 경우에는 아래 안내를 참고해 주세요. 추가 작업 여부는 현장 상태와 요청 범위를 확인한 뒤 정합니다.</ReadingParagraph>
        <ul className="my-5 space-y-2"><li><Link className="inline-flex min-h-11 items-center underline" href="/폐기물처리/">청소 없이 수거만 필요할 때 →</Link></li><li><Link className="inline-flex min-h-11 items-center underline" href="/냄새-악취-제거/">기본 청소 외 냄새 관리가 필요할 때 →</Link></li></ul>
        <CtaButton>{c.area} 쓰레기집청소 견적 문의 →</CtaButton><BackToContents />
      </section>
    </div></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}).replace(/</g,'\\u003c')}} />
  </article>;
}
