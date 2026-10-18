import Image from 'next/image';
import Link from 'next/link';
import { TrashCaseSchema } from './TrashCaseSchema';
import { ReadingParagraph } from '@/components/service-pages/ReadingParagraph';
import { BackToContents } from '@/components/service-pages/BackToContents';
import { TocSidebar, CtaButton } from '@/components/service-pages/shared';
import styles from '@/components/service-pages/Readability.module.css';

export const title = '안양 쓰레기집청소, 만안구 석수동 폐기물 반출·집 내부 청소 사례';
export const description = '안양 쓰레기집청소, 쌓인 생활쓰레기와 집 안 오염이 고민이라면 남길 물건부터 함께 확인합니다. 만안구 석수동·안양동·박달동의 원룸·빌라·주거 공간을 상담하며 폐기물처리와 실내 바닥청소를 기본으로 진행합니다. 쓰레기집청소비용과 쓰레기집청소견적은 물량·오염·반출 조건에 맞춰 안내합니다.';
const faq = [
  ['이 현장은 몇 명이 얼마나 작업했나요?', '4명이 6시간 작업했습니다. 집 내부 전체를 케어했고, 폐기물을 밖으로 반출하는 과정이 쉽지 않았던 현장입니다. 다른 현장도 같은 인원과 시간으로 끝나는 것은 아닙니다.'],
  ['쓰레기집청소에 폐기물처리와 바닥청소도 포함되나요?', '폐기물처리와 실내 바닥청소는 쓰레기집청소의 기본 작업 범위에 들어갑니다. 실제 처리할 물품과 청소할 공간, 별도 확인이 필요한 작업은 견적 상담 때 구분합니다.'],
  ['안양 쓰레기집청소비용은 평수로 정하나요?', '평수만으로 정하지 않습니다. 폐기물의 양과 종류, 오염 상태, 집 밖으로 옮기는 동선과 작업 범위가 함께 영향을 줍니다. 전체 공간과 출입구 사진을 보내주시면 견적 상담에 도움이 됩니다.'],
  ['집 내부 전체 케어를 요청하려면 무엇을 알려드리면 되나요?', '청소할 방·주방·욕실 등 공간과 가전 내부 청소 여부, 남길 물건과 처리할 물건을 알려주세요. 사진에 보이는 범위 외에 필요한 작업도 함께 말씀해 주세요.'],
] as const;
const toc = [['case', '석수동 작업 사례'], ['photos', '공간별 전후 사진'], ['scope', '작업 범위'], ['estimate', '비용·견적 확인'], ['faq', '자주 묻는 질문'], ['contact', '상담 준비와 문의']] as const;
const asset = '/images/regional-trash/seoksu-test/';
function Photos({ room, before, after }: { room: string; before: string; after: string }) {
  return <div className="mt-5 grid items-start gap-5 sm:grid-cols-2">{(['before', 'after'] as const).map(state => <figure key={state}>
    <p className="mb-2 font-bold text-brand-dark">{state === 'before' ? '청소 전' : '청소 후'}</p>
    <Image src={`${asset}${room}-${state}.webp`} alt={`안양 만안구 석수동 쓰레기집청소 ${state === 'before' ? before : after}`} width={room === 'room' && state === 'before' ? 1254 : room === 'room' ? 1135 : 1086} height={room === 'room' && state === 'before' ? 1254 : room === 'room' ? 1386 : 1448} sizes="(min-width: 768px) 360px, 100vw" className="block h-auto w-full rounded-sm" />
    <figcaption className="mt-2 text-slate-600">{state === 'before' ? before : after}</figcaption>
  </figure>)}</div>;
}
export default function SeoksuTrashLanding({ preview = false }: { preview?: boolean }) {
  return <article className={`${styles.landing} ${styles.enhanced}`}>
    {preview && <div className="bg-amber-50 px-5 py-3 text-center text-sm text-amber-950">검토용 미리보기 · 운영 사이트에는 아직 반영되지 않았습니다.</div>}
    <header className="bg-brand-dark px-5 py-12 text-white md:py-16"><div className="mx-auto max-w-5xl">
      <nav aria-label="현재 위치" className="mb-6 flex flex-wrap gap-2 text-sm"><Link href="/">홈</Link><span>/</span><Link href="/쓰레기집청소/">쓰레기집청소</Link><span>/</span><span>안양 석수동 사례</span></nav>
      <h1 className="max-w-4xl text-3xl font-black md:text-4xl">안양 쓰레기집청소, 만안구 석수동 작업 사례</h1>
      <p data-case-summary className="mt-5 max-w-3xl text-xl font-bold leading-8 md:text-2xl">안양 쓰레기집청소, 폐기물 반출부터 집 내부 전체 케어까지</p>
      <ReadingParagraph className="mt-4 max-w-3xl text-lg leading-8">안양 쓰레기집청소, 쌓인 생활쓰레기와 방·주방·욕실의 오염 때문에 어디서부터 정리할지 막막하신가요? 찐청소는 남길 물건과 처리할 물건부터 확인하고, 폐기물처리와 실내 바닥청소를 기본으로 필요한 집 내부 청소를 함께 상담합니다. 만안구 석수동·안양동·박달동의 원룸·빌라·주거 공간에서 요청하시는 작업 범위를 확인합니다. 쓰레기집청소비용은 평수만으로 정하지 않습니다. 쓰레기 양과 오염 상태, 반출 동선과 필요한 인원을 살펴 쓰레기집청소견적을 안내합니다.</ReadingParagraph>
      <CtaButton className="mt-6 !bg-white !text-brand-dark">쓰레기집청소 상담하기 →</CtaButton>
    </div></header>
    <div className={styles.layout}><TocSidebar toc={toc} id="service-toc" /><div className={`${styles.body} [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-dark [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold`}>
      <section id="case"><h2>폐기물을 밖으로 옮기는 일이 쉽지 않았습니다</h2>
        <p className="mb-5 font-bold text-brand-dark">📍 안양시 만안구 석수동 · 4명 · 6시간</p>
        <ReadingParagraph>이번 현장은 집 내부 전체 케어를 진행한 사례입니다. 방 안에는 의류와 침구, 상자와 생활 물품이 바닥에 놓여 있었습니다.</ReadingParagraph>
        <ReadingParagraph>작업에서 특히 어려웠던 부분은 폐기물을 집 밖으로 반출하는 과정이었습니다. 실내에 있는 물건을 정리하는 것뿐 아니라 밖으로 옮기는 작업까지 함께 진행했습니다.</ReadingParagraph>
        <Photos room="room" before="방 바닥에 의류·침구·상자와 생활 물품이 놓인 작업 전 모습입니다." after="작업 후 바닥 공간이 드러난 방의 모습입니다." />
        <ReadingParagraph className="mt-5">이 사례의 작업 시간은 6시간입니다. 필요한 인원과 시간은 폐기물량, 오염 상태와 반출 조건에 따라 달라집니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="photos"><h2>방뿐 아니라 욕실과 냉장고까지</h2>
        <ReadingParagraph>집 내부 전체 케어를 진행한 현장입니다. 아래 사진은 같은 현장의 공간별 작업 전후 모습입니다.</ReadingParagraph>
        <h3 className="mt-7">욕실의 전후 모습</h3><ReadingParagraph>작업 전에는 바닥에 용기와 휴지, 생활용품이 놓여 있었습니다. 작업 후 사진에서는 바닥 주변이 정리된 모습을 볼 수 있습니다.</ReadingParagraph>
        <Photos room="bathroom" before="욕실 바닥과 변기 주변에 생활용품과 휴지가 놓인 작업 전 모습입니다." after="바닥 주변이 정리된 욕실의 작업 후 모습입니다." />
        <h3 className="mt-8">냉장고 내부의 전후 모습</h3><ReadingParagraph>작업 전에는 선반과 문 수납부에 식품과 용기가 들어 있었습니다. 작업 후에는 내부가 비워진 상태를 사진으로 확인할 수 있습니다.</ReadingParagraph>
        <Photos room="fridge" before="식품과 용기가 들어 있는 냉장고의 작업 전 모습입니다." after="내용물이 비워진 냉장고 내부의 작업 후 모습입니다." />
        <p className="mt-5 text-slate-600">사진마다 촬영 각도와 조명이 다를 수 있습니다. 사진만으로 냄새나 위생 상태 전체를 판단할 수는 없으며, 현장 조건에 따라 작업 범위와 결과가 달라집니다.</p><BackToContents />
      </section>
      <section id="scope"><h2>이번 현장의 작업 범위</h2><ReadingParagraph>폐기물 반출과 집 내부 전체 케어를 진행했습니다. 방·욕실·냉장고의 전후 사진을 함께 소개했습니다.</ReadingParagraph>
        <h3 className="mt-6">다른 현장을 상담하실 때는</h3><ReadingParagraph>쓰레기집청소에는 폐기물처리와 실내 바닥청소가 기본 작업 범위로 들어갑니다. 집 내부 전체 케어를 원하시면 공간별 청소와 가전 내부 등 필요한 범위를 함께 말씀해 주세요.</ReadingParagraph>
        <ReadingParagraph>남길 물건과 처리할 물건은 미리 구분해 주세요. 같은 ‘전체 청소’라도 물품과 오염 상태가 다르므로 포함 범위와 별도 확인 항목을 상담에서 정합니다.</ReadingParagraph>
        <Link className="inline-flex min-h-11 items-center font-bold underline" href="/쓰레기집청소/">쓰레기집청소 전체 서비스 안내 →</Link><BackToContents />
      </section>
      <section id="estimate"><h2>안양 쓰레기집청소비용, 반출 조건도 함께 봅니다</h2><ReadingParagraph>집 안의 넓이만으로 작업량을 판단하기는 어렵습니다. 이번 석수동 현장처럼 폐기물을 밖으로 옮기는 과정도 작업에 영향을 줍니다.</ReadingParagraph>
        <h3 className="mt-6">쓰레기집청소견적 상담 때 확인하는 내용</h3><ul className="list-disc space-y-2 pl-5"><li>폐기물의 양과 종류, 남겨둘 물품</li><li>방·주방·욕실과 가전 내부 등 요청 범위</li><li>현장 층수와 승강기 사용 여부</li><li>출입구와 차량까지의 반출 동선</li><li>출입 가능한 시간과 희망 일정</li></ul>
        <ReadingParagraph className="mt-5">위 항목은 새 현장을 상담할 때 확인할 내용입니다. 전체 공간 사진과 출입구 사진을 함께 보내주시면 필요한 작업을 구분하는 데 도움이 됩니다.</ReadingParagraph><BackToContents />
      </section>
      <section id="faq"><h2>자주 묻는 질문</h2><div className="divide-y divide-slate-200 border-y border-slate-200">{faq.map(([q,a]) => <details key={q} className="group py-2"><summary className="cursor-pointer list-none justify-between gap-4 py-3 font-bold text-brand-dark">{q}<span aria-hidden="true" className="shrink-0 group-open:rotate-180">⌄</span></summary><ReadingParagraph className="pb-4">{a}</ReadingParagraph></details>)}</div><BackToContents /></section>
      <section id="contact"><h2>석수동 쓰레기집청소 상담 준비</h2><ReadingParagraph>안양 만안구 석수동의 현장 주소와 전체 공간 사진, 남길 물건과 정리할 물건을 알려주세요. 희망 일정과 출입 가능한 시간도 함께 확인합니다.</ReadingParagraph>
        <ReadingParagraph>폐기물처리와 바닥청소는 쓰레기집청소 기본 범위에 포함됩니다. 청소 없이 수거만 필요하거나 바닥청소만 따로 필요한 경우에는 아래 단독 서비스 안내를 참고해 주세요.</ReadingParagraph>
        <ul className="my-5 space-y-2"><li><Link className="inline-flex min-h-11 items-center underline" href="/폐기물처리/">청소 없이 수거만 필요할 때 →</Link></li><li><Link className="inline-flex min-h-11 items-center underline" href="/바닥청소/">바닥청소만 따로 필요할 때 →</Link></li></ul><CtaButton>안양 석수동 쓰레기집청소 견적 문의 →</CtaButton><BackToContents />
      </section>
    </div></div>
    {!preview && <TrashCaseSchema region="경기도-안양시-만안구" area="경기도 안양시 만안구" title={title} description={description} />}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}).replace(/</g,'\\u003c')}} />
  </article>;
}
