import Link from 'next/link';
import type { ServiceProfile } from '@/lib/service-profiles';
import { priorityServices, priorityService, serviceRegionPath, type ServiceRegion } from '@/lib/service-regions';
import { serviceSearchCopy } from '@/lib/service-search-copy';
import { absoluteUrl } from '@/lib/site-url';
import { regionalPages, regionalPath } from '@/lib/regional-pages';
import { ReadingParagraph } from './ReadingParagraph';
import { BackToContents } from './BackToContents';
import { TocSidebar, CtaButton } from './shared';
import readability from './Readability.module.css';

export default function RegionalServiceGuide({ service: s, region: r }: { service: ServiceProfile; region: ServiceRegion }) {
  const copy = serviceSearchCopy(s, r.label);
  const path = serviceRegionPath(s.slug, r.region);
  const toc = [['scope', '작업 범위'], ['estimate', '비용·견적 확인'], ['visit', '지역 상담 준비'], ['related', '관련 서비스']] as const;
  const cases = regionalPages.filter(p => p.service === s.slug && (p.region === r.parent || p.region === r.region.split('-').slice(0, 2).join('-')));
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Service', name: copy.keyword, serviceType: s.name, description: copy.intro, url: absoluteUrl(path), provider: { '@id': absoluteUrl('/#organization') }, areaServed: { '@type': r.kind === 'neighborhood' ? 'Place' : 'AdministrativeArea', name: r.region.replaceAll('-', ' ') } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: '홈', path: '/' }, { name: s.name, path: `/${s.slug}/` }, { name: copy.keyword, path }].map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path) })) },
  ];
  return <article className={`${readability.landing} ${readability.enhanced}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="bg-brand-dark px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="현재 위치" className="mb-7 flex flex-wrap gap-2 text-sm"><Link href="/">홈</Link><span aria-hidden="true">/</span><Link href={`/${s.slug}/`}>{s.name}</Link><span aria-hidden="true">/</span><span>{r.label}</span></nav>
        <h1 className="text-3xl font-black leading-tight md:text-4xl">{copy.heading}</h1>
        <ReadingParagraph className="mt-5 max-w-3xl text-lg leading-8">{copy.intro}</ReadingParagraph>
        <CtaButton className="mt-6 !bg-white !text-brand-dark">{copy.keyword} 상담하기 →</CtaButton>
      </div>
    </header>
    <div className={readability.layout}>
      <TocSidebar toc={toc} id="service-toc" />
      <div className={`${readability.body} [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-dark [&_h3]:text-xl [&_h3]:font-bold`}>
        <section id="scope" className="scroll-mt-40"><h2>{r.label}에서 확인할 {s.name} 작업 범위</h2><ul>{s.scope.map(item => <li key={item}>{item}</li>)}</ul><ReadingParagraph>{s.limitation}</ReadingParagraph><Link href={`/${s.slug}/`} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">{s.name} 전체 작업 범위 보기 →</Link><BackToContents /></section>
        <section id="estimate" className="scroll-mt-40"><h2>{copy.keyword}비용·견적 기준</h2><ReadingParagraph>{`${s.name}비용은 평수만으로 정하지 않습니다. ${s.check}을 확인해 필요한 작업과 별도 항목을 구분합니다.`}</ReadingParagraph><ReadingParagraph>전체 공간 사진과 오염이 심한 부분의 가까운 사진, 면적, 층수, 승강기와 차량 접근 조건을 알려주세요. 방문 일정과 필요한 작업을 함께 확인합니다.</ReadingParagraph><BackToContents /></section>
        <section id="visit" className="scroll-mt-40"><h2>{r.label} 방문 상담 준비</h2><ReadingParagraph>{`${r.region.replaceAll('-', ' ')} 현장의 ${s.name} 방문 상담이 가능합니다. 정확한 주소와 건물 용도, 출입 가능한 시간, 희망 일정을 알려주세요.`}</ReadingParagraph>{r.kind === 'neighborhood' && <ReadingParagraph>생활권 이름과 실제 주소가 다를 수 있으므로 방문지는 도로명주소로 확인합니다.</ReadingParagraph>}{cases.length > 0 && <><h3>인근 지역 상세 안내</h3><ul>{cases.map(p => <li key={p.region}><Link href={regionalPath(p)}>{p.heading} →</Link></li>)}</ul></>}<BackToContents /></section>
        <section id="related" className="scroll-mt-40"><h2>{r.label} 다른 서비스 안내</h2><ul>{priorityServices.filter(slug => slug !== s.slug).map(slug => <li key={slug}><Link prefetch={false} className="inline-flex min-h-11 items-center underline underline-offset-4" href={serviceRegionPath(slug, r.region)}>{r.label} {priorityService(slug)!.name} →</Link></li>)}</ul><Link className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href={`/${s.slug}/areas/`}>다른 지역 {s.name} 찾기 →</Link><BackToContents /></section>
        <CtaButton>{copy.keyword} 견적 문의 →</CtaButton>
      </div>
    </div>
  </article>;
}
