import Link from "next/link";
import Image from "next/image";
import { serviceCategories } from "@/lib/services-data";
import { serviceProfiles, servicePath, type ServiceProfile } from "@/lib/service-profiles";
import { regionalPages, regionalPath, type RegionalPage } from "@/lib/regional-pages";
import { absoluteUrl } from "@/lib/site-url";
import portfolio from "@/lib/portfolio-highlights.json";

const portfolioGroups: Record<string, string> = {
  "입주청소": "move-in", "신축청소": "new-construction", "준공청소": "new-construction",
  "인테리어청소": "interior", "사무실청소": "office", "관공서청소": "government",
  "주방청소": "kitchen", "후드청소": "hood", "침수청소": "flood", "화재청소": "fire",
  "외벽청소": "exterior-wall", "바닥본드제거": "floor-adhesive", "바닥왁스코팅": "floor-wax", "마루코팅": "floor-wood",
};

export default function ServiceLanding({ service, regional }: { service: ServiceProfile; regional?: RegionalPage }) {
  const category = serviceCategories.find(c => c.slug === service.category)!;
  const heading = regional?.heading || service.name;
  const path = regional ? regionalPath(regional) : servicePath(service.name);
  const example = portfolio.find(p => p.id === `${portfolioGroups[service.name]}-01`);
  const toc = [["scope", "작업 범위"], ["estimate", "견적 확인"], ["process", "진행 순서"], ...(regional ? [["local", "지역 상담 안내"]] : []), ["faq", "자주 묻는 질문"], ["related", "함께 살펴보기"]];
  const structured = [
    { "@context": "https://schema.org", "@type": "Service", name: heading, serviceType: service.name, description: regional?.intro || service.intro, url: absoluteUrl(path), provider: { "@type": "Organization", name: "찐청소", url: absoluteUrl("/") }, ...(regional ? { areaServed: { "@type": "AdministrativeArea", name: regional.region.replaceAll("-", " ") } } : {}) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "서비스", item: absoluteUrl("/services/") }, { "@type": "ListItem", position: 3, name: service.name, item: absoluteUrl(servicePath(service.name)) }, ...(regional ? [{ "@type": "ListItem", position: 4, name: heading, item: absoluteUrl(path) }] : [])] },
  ];
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-white md:py-20">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="현재 위치" className="mb-8 flex flex-wrap gap-2 text-sm text-white/80"><Link href="/">홈</Link><span>/</span><Link href="/services/">서비스</Link><span>/</span><Link href={servicePath(service.name)}>{service.name}</Link>{regional && <><span>/</span><span>{regional.region.replaceAll("-", " ")}</span></>}</nav>
        <p className="text-sm font-bold tracking-widest text-brand-light">JJIN CHEONGSO · {category.title}</p>
        <h1 className="mt-4 text-3xl font-black md:text-5xl">{heading}</h1>
        <p className="mt-5 text-xl font-bold md:text-2xl">{service.headline}</p>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">{regional?.intro || service.intro}</p>
        <Link href="/contact/" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold text-brand-dark">상담 준비 항목 확인 →</Link>
      </div>
    </section>
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[190px_1fr]">
      <aside><nav aria-label="목차" className="rounded-2xl bg-gray-50 p-5 md:sticky md:top-36"><p className="mb-3 font-bold text-brand-dark">이 페이지에서</p><ol className="space-y-3 text-sm">{toc.map(([id, title]) => <li key={id}><a href={`#${id}`} className="hover:text-brand hover:underline">{title}</a></li>)}</ol></nav></aside>
      <div className="space-y-12 text-base leading-8 text-gray-700">
        {example && <section aria-label="서비스 참고 사진"><h2 className="text-2xl font-black text-brand-dark">사진으로 살펴보는 {service.name}</h2><p className="mt-3 text-sm text-gray-500">등록된 서비스 참고 사진입니다.{regional ? " 이 지역에서 촬영한 현장 사진을 의미하지 않습니다." : " 현장마다 작업 범위와 결과는 달라집니다."}</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{[{ label: "작업 전", file: example.before, width: example.beforeWidth, height: example.beforeHeight }, { label: "작업 후", file: example.after, width: example.afterWidth, height: example.afterHeight }].map(photo => <figure key={photo.file}><Image src={`/images/portfolio-v2/${photo.file}`} alt={`${service.name} 참고 사진 · ${photo.label}`} width={photo.width} height={photo.height} className="aspect-[4/3] w-full rounded-xl object-cover" sizes="(min-width: 768px) 340px, 100vw" /><figcaption className="mt-2 text-sm font-bold text-brand-dark">{photo.label}</figcaption></figure>)}</div></section>}
        <section id="scope" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">{heading}, 어디까지 청소하나요?</h2><p className="mt-4">다음 항목을 기준으로 현장 상태를 확인합니다. 실제 포함 범위는 상담 후 견적서에서 확인해 주세요.</p><ul className="mt-5 grid gap-3">{service.scope.map((item, i) => <li key={item} className="rounded-xl border border-gray-100 p-4"><span className="mr-3 font-black text-brand">0{i + 1}</span>{item}</li>)}</ul><p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-7">{service.limitation}</p></section>
        <section id="estimate" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">견적도 꼼꼼하게, 이 항목부터.</h2><p className="mt-4">{service.check}을 확인합니다. 전체 모습과 집중 관리가 필요한 부분의 사진을 준비해 주시면 작업 범위를 구체적으로 협의하기 좋습니다.</p><p className="mt-3">기본 작업, 추가 작업, 포함되지 않는 항목을 나눠 확인해 주세요. 현장 상태가 예상과 다르면 진행 전에 범위와 비용을 다시 협의합니다.</p><Link href="/pricing/" className="mt-4 inline-block font-bold text-brand">견적 기준 자세히 보기 →</Link></section>
        <section id="process" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">처음부터 마무리까지, 순서대로.</h2><ol className="mt-5 space-y-4">{[["상태 확인", "서비스 종류, 주소, 사진과 희망 일정을 확인합니다."], ["범위 협의", "포함 항목과 별도 작업, 비용과 출입 조건을 정리합니다."], ["작업 진행", "협의한 구역을 순서대로 진행하고 변경 사항을 확인합니다."], ["완료 확인", "작업한 부분을 확인하고 이용·관리 시 주의할 점을 안내합니다."]].map(([title, body], i) => <li key={title}><h3 className="font-bold">{i + 1}. {title}</h3><p>{body}</p></li>)}</ol></section>
        {regional && <section id="local" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">{regional.region.replaceAll("-", " ")} 상담 준비</h2><p className="mt-3 text-sm text-gray-500">이 글은 서비스 이용 안내이며 특정 현장의 시공 후기가 아닙니다.</p>{regional.sections.map(s => <div key={s.heading} className="mt-6"><h3 className="text-lg font-bold">{s.heading}</h3><p className="mt-2">{s.body}</p></div>)}{regional.media.map(m => <figure key={m.src} className="mt-6">{m.type === "image" ? <Image src={m.src} alt={m.alt} width={1200} height={800} className="h-auto w-full rounded-xl" /> : <video src={m.src} controls preload="metadata" aria-label={m.alt} className="w-full rounded-xl" />}<figcaption className="mt-2 text-sm text-gray-500">{m.caption}</figcaption></figure>)}</section>}
        <section id="faq" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">{service.name} 자주 묻는 질문</h2>{[["상담 전에 무엇을 준비하면 좋나요?", `${service.check}을 알려주세요. 작업 대상의 전체 사진과 오염 부분 사진이 있으면 범위를 확인하는 데 도움이 됩니다.`], ["신청하면 모든 작업이 포함되나요?", service.limitation], ["작업 시간과 비용은 어떻게 정하나요?", "면적만으로 확정하지 않고 오염과 소재, 필요한 인원·장비, 출입 가능한 시간을 함께 확인합니다. 작업 전 포함 범위와 완료 확인 방법을 협의해 주세요."]].map(([q, a]) => <details key={q} className="mt-4 rounded-xl border border-gray-200 p-4"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-3">{a}</p></details>)}</section>
        <section id="related" className="scroll-mt-36"><h2 className="text-2xl font-black text-brand-dark">필요한 관리, 함께 살펴보세요.</h2><div className="mt-5 flex flex-wrap gap-3">{serviceProfiles.filter(s => s.category === service.category && s.slug !== service.slug).map(s => <Link className="rounded-full bg-brand-light px-4 py-2 text-sm font-bold text-brand-dark" key={s.slug} href={servicePath(s.name)}>{s.name} →</Link>)}</div>{!regional && regionalPages.filter(p => p.service === service.slug).map(p => <p className="mt-5" key={p.region}><Link href={regionalPath(p)} className="font-bold text-brand">{p.heading} 지역 안내 →</Link></p>)}</section>
        <div className="rounded-2xl bg-brand-dark p-7 text-white"><p className="text-xl font-bold">청소가 필요한 곳, 구체적으로 알려주세요.</p><p className="mt-3 text-white/80">어떤 공간인지, 어디가 고민인지부터 정리하면 상담이 한결 쉬워집니다.</p><Link href="/contact/" className="mt-5 inline-block rounded-full bg-white px-5 py-2 font-bold text-brand-dark">상담 내용 정리하기 →</Link></div>
      </div>
    </div>
  </article>;
}
