import Image from 'next/image';
import Link from 'next/link';
import { TrashCaseSchema } from './TrashCaseSchema';
import { ReadingParagraph } from '@/components/service-pages/ReadingParagraph';
import { BackToContents } from '@/components/service-pages/BackToContents';
import { TocSidebar, CtaButton } from '@/components/service-pages/shared';
import styles from '@/components/service-pages/Readability.module.css';

export const title = '강서구 쓰레기집청소, 화곡동 원룸 정리·폐기물처리와 청소견적';
export const description = '강서구 쓰레기집청소, 쌓인 쓰레기와 악취로 집 안 정리가 막막하다면 남길 물건부터 확인합니다. 화곡동·등촌동·가양동 원룸과 주거 공간의 폐기물처리·실내 바닥청소를 상담합니다. 쓰레기집청소비용과 쓰레기집청소견적은 물량과 오염 상태, 반출 동선에 맞춰 안내합니다.';
const faq = [
  ['8평 원룸이면 작업이 금방 끝나나요?', '면적만으로 소요 시간을 정하기는 어렵습니다. 이번 화곡동 원룸은 4명이 8시간 작업했고, 악취와 청소 동선에 불편함이 있었습니다. 같은 평수라도 물량과 오염, 이동 조건에 따라 필요한 인원과 시간이 달라집니다.'],
  ['강서구 쓰레기집청소비용은 무엇을 보고 정하나요?', '폐기물의 양과 종류, 오염 상태, 청소할 범위와 반출 동선을 함께 봅니다. 방 전체와 주방·욕실, 출입구 사진을 보내주시면 쓰레기집청소견적 상담에 도움이 됩니다.'],
  ['쓰레기집청소에 폐기물처리와 바닥청소도 포함되나요?', '폐기물처리와 실내 바닥청소는 기본 작업 범위에 포함됩니다. 남길 물건과 처리할 물건을 구분하고, 가전 내부 등 추가로 필요한 범위는 상담 때 함께 확인합니다.'],
  ['쓰레기를 치우면 악취도 모두 없어지나요?', '쓰레기를 치우는 것만으로 모든 냄새가 사라진다고 단정할 수는 없습니다. 냄새가 나는 위치와 오염 상태를 함께 확인하고, 기본 청소 외에 필요한 조치가 있는지 상담합니다.'],
] as const;
const toc = [['case', '화곡동 원룸 사례'], ['photos', '욕실 전후 사진'], ['scope', '작업 범위'], ['estimate', '비용·견적 확인'], ['faq', '자주 묻는 질문'], ['contact', '상담 준비와 문의']] as const;
function Photos({ room, before, after }: { room: 'room' | 'bathroom'; before: string; after: string }) {
  return <div className="mt-5 grid items-start gap-5 sm:grid-cols-2">{(['before', 'after'] as const).map(state => <figure key={state}>
    <p className="mb-2 font-bold text-brand-dark">{state === 'before' ? '청소 전' : '청소 후'}</p>
    <Image src={`/images/regional-trash/hwagok-test/${room}-${state}.webp`} alt={`서울 강서구 화곡동 쓰레기집청소 ${state === 'before' ? before : after}`} width={room === 'room' ? state === 'before' ? 1152 : 1056 : state === 'before' ? 1024 : 1080} height={room === 'room' ? state === 'before' ? 864 : 792 : state === 'before' ? 768 : 810} sizes="(min-width: 768px) 360px, 100vw" className="block h-auto w-full rounded-sm" />
    <figcaption className="mt-2 text-slate-600">{state === 'before' ? before : after}</figcaption>
  </figure>)}</div>;
}
export default function HwagokTrashLanding({ preview = false }: { preview?: boolean }) {
  return <article className={`${styles.landing} ${styles.enhanced}`}>
    {preview && <div className="bg-amber-50 px-5 py-3 text-center text-sm text-amber-950">검토용 미리보기 · 운영 사이트에는 아직 반영되지 않았습니다.</div>}
    <header className="bg-brand-dark px-5 py-12 text-white md:py-16"><div className="mx-auto max-w-5xl">
      <nav aria-label="현재 위치" className="mb-6 flex flex-wrap gap-2 text-sm"><Link href="/">홈</Link><span>/</span><Link href="/쓰레기집청소/">쓰레기집청소</Link><span>/</span><span>서울 강서구 화곡동 사례</span></nav>
      <h1 className="max-w-4xl text-3xl font-black md:text-4xl">강서구 쓰레기집청소, 화곡동 원룸 작업 사례</h1>
      <p data-case-summary className="mt-5 max-w-3xl text-xl font-bold leading-8 md:text-2xl">강서구 쓰레기집청소, 쌓인 쓰레기와 악취가 고민이라면</p>
      <ReadingParagraph className="mt-4 max-w-3xl text-lg leading-8">강서구 쓰레기집청소, 원룸에 쌓인 쓰레기와 악취 때문에 어디서부터 손대야 할지 막막하신가요? 남길 물건과 처리할 물건부터 구분하고, 폐기물처리와 실내 바닥청소를 기본으로 필요한 청소 범위를 함께 확인합니다. 화곡동·등촌동·가양동의 원룸과 주거 공간을 상담합니다. 쓰레기집청소비용은 방 크기만으로 정하지 않습니다. 쌓인 물량과 오염 상태, 집 밖으로 옮기는 동선을 살펴 쓰레기집청소견적을 안내합니다.</ReadingParagraph>
      <CtaButton className="mt-6 !bg-white !text-brand-dark">쓰레기집청소 상담하기 →</CtaButton>
    </div></header>
    <div className={styles.layout}><TocSidebar toc={toc} id="service-toc" /><div className={`${styles.body} [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-dark [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold`}>
      <section id="case"><h2>8평 원룸, 악취와 청소 동선도 살펴야 했습니다</h2>
        <p className="mb-5 font-bold text-brand-dark">📍 서울 강서구 화곡동 · 8평 원룸 · 4명 · 8시간</p>
        <ReadingParagraph>이번 화곡동 현장은 4명이 8시간 작업했습니다. 악취가 있었고, 청소 동선에도 조금 불편함이 있었습니다.</ReadingParagraph>
        <ReadingParagraph>작업 전 사진에는 침대와 가구 사이 바닥에 봉투와 상자, 생활 물품이 놓여 있습니다. 작업 후에는 같은 방의 바닥 공간이 드러난 모습을 볼 수 있습니다.</ReadingParagraph>
        <Photos room="room" before="침대와 가구 사이 바닥에 봉투·상자와 생활 물품이 놓인 작업 전 모습입니다." after="물품이 정리되고 바닥 공간이 드러난 원룸의 작업 후 모습입니다." />
        <ReadingParagraph className="mt-5">같은 8평이라도 물건이 쌓인 양과 이동할 수 있는 공간은 다릅니다. 다른 현장의 인원과 소요 시간은 현장 조건에 맞춰 확인합니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="photos"><h2>욕실 바닥과 주변 공간의 전후 모습</h2>
        <ReadingParagraph>작업 전 욕실에는 봉투와 생활용품이 바닥과 세탁기 주변에 놓여 있었습니다. 작업 후 사진에서는 바닥에 놓여 있던 물품이 정리된 모습을 확인할 수 있습니다.</ReadingParagraph>
        <Photos room="bathroom" before="봉투와 생활용품이 욕실 바닥과 세탁기 주변에 놓인 작업 전 모습입니다." after="바닥 물품이 정리된 욕실의 작업 후 모습입니다." />
        <p className="mt-5 text-slate-600">전후 사진의 촬영 각도와 조명은 다를 수 있습니다. 작업 후에도 사진에 보이는 변색과 흔적이 있으며, 사진만으로 냄새 제거 여부나 위생 상태 전체를 판단할 수는 없습니다.</p><BackToContents />
      </section>
      <section id="scope"><h2>폐기물처리와 실내 바닥청소가 기본입니다</h2>
        <ReadingParagraph>쓰레기집청소에는 폐기물처리와 실내 바닥청소가 기본으로 들어갑니다. 남길 물건까지 함께 버리지 않도록 처리할 물품을 먼저 구분해 주세요.</ReadingParagraph>
        <ReadingParagraph>주방·욕실의 청소 범위나 냉장고 같은 가전 내부 청소가 필요하면 상담 때 함께 말씀해 주세요. 공간과 오염 상태를 보고 포함 범위와 별도 확인 항목을 정합니다.</ReadingParagraph>
        <Link className="inline-flex min-h-11 items-center font-bold underline" href="/쓰레기집청소/">쓰레기집청소 전체 서비스 안내 →</Link><BackToContents />
      </section>
      <section id="estimate"><h2>강서구 쓰레기집청소비용, 평수보다 작업 조건을 봅니다</h2>
        <ReadingParagraph>이번 사례처럼 원룸에서도 악취와 청소 동선이 작업에 영향을 줄 수 있습니다. 쓰레기집청소견적을 상담할 때는 방 크기뿐 아니라 실제로 정리할 물량과 움직일 수 있는 공간을 함께 봅니다.</ReadingParagraph>
        <ul className="my-5 list-disc space-y-2 pl-5"><li>방 전체와 주방·욕실의 현재 모습</li><li>처리할 물품과 남길 물품, 폐기물의 양</li><li>악취가 느껴지는 위치와 오염 상태</li><li>출입구·복도·차량까지의 반출 동선</li><li>층수와 승강기 사용 여부, 희망 일정</li></ul>
        <ReadingParagraph>위 항목은 새로운 현장의 상담 준비사항입니다. 반출 동선은 집 안 사진만으로 알기 어려우니 출입구 주변 사진도 함께 보내주세요.</ReadingParagraph><BackToContents />
      </section>
      <section id="faq"><h2>자주 묻는 질문</h2><div className="divide-y divide-slate-200 border-y border-slate-200">{faq.map(([q,a]) => <details key={q} className="group py-2"><summary className="cursor-pointer list-none justify-between gap-4 py-3 font-bold text-brand-dark">{q}<span aria-hidden="true" className="shrink-0 group-open:rotate-180">⌄</span></summary><ReadingParagraph className="pb-4">{a}</ReadingParagraph></details>)}</div><BackToContents /></section>
      <section id="contact"><h2>화곡동 쓰레기집청소 상담 준비</h2>
        <ReadingParagraph>현장 위치와 전체 공간 사진, 남길 물건과 정리할 물건을 알려주세요. 악취가 고민이라면 냄새가 나는 위치도 함께 말씀해 주세요.</ReadingParagraph>
        <ReadingParagraph>기본 청소 외에 냄새에 대한 별도 조치가 필요한지는 상태를 살펴 상담합니다. 청소 없이 수거만 필요한 경우에는 단독 서비스 안내를 참고해 주세요.</ReadingParagraph>
        <ul className="my-5 space-y-2"><li><Link className="inline-flex min-h-11 items-center underline" href="/냄새-악취-제거/">기본 청소 외 냄새 관리가 필요할 때 →</Link></li><li><Link className="inline-flex min-h-11 items-center underline" href="/폐기물처리/">청소 없이 수거만 필요할 때 →</Link></li></ul>
        <CtaButton>강서구 화곡동 쓰레기집청소 견적 문의 →</CtaButton><BackToContents />
      </section>
    </div></div>
    {!preview && <TrashCaseSchema region="서울특별시-강서구" area="서울특별시 강서구" title={title} description={description} />}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}).replace(/</g,'\\u003c')}} />
  </article>;
}
