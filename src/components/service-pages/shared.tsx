import Link from "next/link";
import Image from "next/image";
import { ServiceEntryGuide, type EntryGuide } from "./ServiceEntryGuide";

export function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Link
      href="/contact/"
      className={`inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-brand-dark ${className}`}
    >
      {children}
    </Link>
  );
}

export type PortfolioItem = { id: string; title: string; before: string; after: string; beforeWidth: number; beforeHeight: number; afterWidth: number; afterHeight: number };

export function CaseFigure({ item }: { item: PortfolioItem }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-100">
      <div className="grid grid-cols-2">
        <div className="relative">
          <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} width={item.beforeWidth} height={item.beforeHeight} className="aspect-[4/3] w-full object-cover" sizes="(min-width: 768px) 340px, 50vw" />
          <span className="absolute left-2 top-2 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-bold text-white">전</span>
        </div>
        <div className="relative">
          <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} width={item.afterWidth} height={item.afterHeight} className="aspect-[4/3] w-full object-cover" sizes="(min-width: 768px) 340px, 50vw" />
          <span className="absolute left-2 top-2 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">후</span>
        </div>
      </div>
      <figcaption className="px-4 py-3 text-sm font-bold text-brand-dark">{item.title}</figcaption>
    </figure>
  );
}

export function SectionTitle({ id, kicker, title }: { id: string; kicker: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-bold tracking-widest text-brand">{kicker}</p>
      <h2 id={id} className="scroll-mt-36 mt-1 text-2xl font-black text-brand-dark md:text-[28px]">{title}</h2>
    </div>
  );
}

export function TocSidebar({ toc, id }: { toc: readonly (readonly [string, string])[]; id?: string }) {
  return (
    <aside id={id} tabIndex={id ? -1 : undefined} className={id ? "scroll-mt-24 md:scroll-mt-48" : undefined}>
      <nav aria-label="목차" className="rounded-2xl bg-gray-50 p-5 md:sticky md:top-36">
        <p className="mb-3 font-bold text-brand-dark">한눈에 보기</p>
        <ol className="space-y-3 text-sm">
          {toc.map(([id, title]) => (
            <li key={id}><a href={`#${id}`} className="hover:text-brand hover:underline">{title}</a></li>
          ))}
        </ol>
        <div className="mt-6 border-t border-gray-200 pt-5">
          <a href="tel:010-9882-8882" className="block rounded-xl bg-brand px-4 py-3 text-center font-bold leading-tight text-white hover:bg-brand-dark">
            <span className="block text-sm">전화상담</span>
            <span className="block text-base">010.9882.8882</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}

export function QuickFactsTable({ facts, headers = ["항목", "안내"], guide }: { facts: [string, string][]; headers?: [string, string]; guide?: EntryGuide }) {
  return (
    <>
      {guide && <ServiceEntryGuide {...guide} />}
      <dl className="mt-4 grid gap-2.5 rounded-2xl border border-gray-200 p-2.5 md:hidden">
        {facts.map(([label, value], i) => (
          <div key={label} className={`rounded-xl p-4 ${i % 2 === 1 ? "bg-gray-50" : "bg-brand-light/40"}`}>
            <dt className="text-[13.5px] font-bold text-brand-dark">{label}</dt>
            <dd className="mt-1 text-[15.5px] leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
        <table className="w-full border-collapse text-left text-[15.5px]">
          <thead>
            <tr className="bg-brand-light/60">
              <th scope="col" className="px-5 py-3.5 font-black text-brand-dark w-[30%]">{headers[0]}</th>
              <th scope="col" className="px-5 py-3.5 font-black text-brand-dark">{headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            {facts.map(([label, value], i) => (
              <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : undefined}>
                <th scope="row" className="px-5 py-3.5 font-bold text-gray-700 align-top">{label}</th>
                <td className="px-5 py-3.5 align-top">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
