"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import { ReadingParagraph } from "@/components/service-pages/ReadingParagraph";
import { areaCases, areaProvinces, regionsOf, servicesOf, type AreaCase } from "@/lib/area-cases";

type Pick = { province: string; region: string | null; service: string | null };

function CaseCard({ item }: { item: AreaCase }) {
  return <Link data-region-card href={item.href} className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
      {item.photos.map(photo => <figure key={photo.src}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 240px, 45vw" className="object-cover" style={photo.position ? { objectPosition: photo.position } : undefined} />
        </div>
        <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{photo.label}</figcaption>
      </figure>)}
    </div>
    <div className="flex flex-col justify-center p-5 sm:p-8">
      <p className="text-xs font-semibold text-gray-500">{item.province} · {item.region} · {item.service}</p>
      <p className="mt-3 text-sm font-semibold text-brand">{item.eyebrow}</p>
      <h3 className="mt-3 text-2xl font-bold text-brand-dark">{item.title}</h3>
      <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">{item.body}</ReadingParagraph>
      <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">{item.cta}<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
    </div>
  </Link>;
}

function Option({ active, onClick, label, n }: { active: boolean; onClick: () => void; label: string; n: number }) {
  return <button type="button" aria-pressed={active} onClick={onClick}
    className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 text-left text-sm transition-colors ${active
      ? "border-brand-dark bg-brand-dark font-bold text-white"
      : "border-gray-200 bg-white font-semibold text-gray-700 hover:border-gray-400"}`}>
    <span className="truncate">{label}</span>
    <span className={`text-xs tabular-nums ${active ? "text-white/80" : "text-gray-400"}`}>{n}</span>
  </button>;
}

function Row({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return <div className="grid gap-3 border-t border-gray-100 px-5 py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:px-7">
    <p className="pt-2.5 text-sm font-bold text-gray-900"><span className="mr-1.5 text-gray-400 tabular-nums">{step}</span>{title}</p>
    {children}
  </div>;
}

const tally = (p: Partial<Pick>) => areaCases.filter(c =>
  (!p.province || c.province === p.province) && (!p.region || c.region === p.region) && (!p.service || c.service === p.service)).length;

export default function AreaFinder() {
  const [pick, setPick] = useState<Pick>({ province: areaProvinces[0], region: null, service: null });
  const results = useRef<HTMLDivElement>(null);

  // 공유된 주소(?광역=경기도&지역=안양시&서비스=주방청소)로 들어오면 같은 선택을 복원
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const province = q.get("광역") ?? areaProvinces[0];
    if (!areaProvinces.includes(province)) return;
    const region = q.get("지역"), service = q.get("서비스");
    const okRegion = region && regionsOf(province).includes(region) ? region : null;
    const okService = service && servicesOf(province, okRegion).includes(service) ? service : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPick({ province, region: okRegion, service: okService });
  }, []);

  const update = (next: Pick, scroll = false) => {
    setPick(next);
    const q = new URLSearchParams();
    if (areaProvinces.length > 1 || next.region) q.set("광역", next.province);
    if (next.region) q.set("지역", next.region);
    if (next.service) q.set("서비스", next.service);
    const query = q.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    if (scroll && window.innerWidth < 768) requestAnimationFrame(() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const { province, region, service } = pick;
  const regions = regionsOf(province);
  const services = region ? servicesOf(province, region) : [];
  const shown = areaCases.filter(c => c.province === province && (!region || c.region === region) && (!service || c.service === service));
  const groups = regions.filter(r => shown.some(c => c.region === r));

  return <>
    <section aria-labelledby="finder-title" className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white sm:mt-10">
      <div className="px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
        <h2 id="finder-title" className="text-lg font-bold text-brand-dark sm:text-xl">우리 동네 사례 찾기</h2>
        <p className="mt-1 text-sm text-gray-500">광역 지역 → 시·군 → 서비스 순서로 고르면 해당 작업 기록만 보여드립니다.</p>
      </div>

      <Row step={1} title="광역 지역">
        <div role="group" aria-label="광역 지역" className="flex flex-wrap gap-2">
          {areaProvinces.map(p => <button key={p} type="button" aria-pressed={province === p} onClick={() => update({ province: p, region: null, service: null })}
            className={`min-h-11 rounded-full px-4 text-sm transition-colors ${province === p ? "bg-brand-dark font-bold text-white" : "border border-gray-200 font-semibold text-gray-700 hover:border-gray-400"}`}>
            {p} <span className={`ml-1 text-xs tabular-nums ${province === p ? "text-white/80" : "text-gray-400"}`}>{tally({ province: p })}</span>
          </button>)}
        </div>
      </Row>

      <Row step={2} title="시·군">
        <div role="group" aria-label="시·군" className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          <Option active={!region} onClick={() => update({ province, region: null, service: null })} label="전체" n={tally({ province })} />
          {regions.map(r => <Option key={r} active={region === r} onClick={() => update({ province, region: r, service: null })} label={r} n={tally({ province, region: r })} />)}
        </div>
      </Row>

      <Row step={3} title="서비스">
        {region
          ? <div role="group" aria-label="서비스" className="flex flex-wrap gap-2">
            <Option active={!service} onClick={() => update({ province, region, service: null })} label="전체" n={tally({ province, region })} />
            {services.map(s => <Option key={s} active={service === s} onClick={() => update({ province, region, service: s }, true)} label={s} n={tally({ province, region, service: s })} />)}
          </div>
          : <p className="pt-2.5 text-sm text-gray-400">시·군을 먼저 선택하면 그 지역의 서비스가 나타납니다.</p>}
      </Row>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3 sm:px-7">
        <p aria-live="polite" className="flex flex-wrap items-center gap-1 text-sm font-semibold text-gray-700">
          {[province, region ?? "전체", ...(region ? [service ?? "전체 서비스"] : [])].map((part, i) => <span key={i} className="inline-flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-gray-400" />}{part}
          </span>)}
          <span className="ml-2 text-gray-500">사례 {shown.length}건</span>
        </p>
        {region && <button type="button" onClick={() => update({ province, region: null, service: null })} className="min-h-11 text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-gray-800">선택 초기화</button>}
      </div>
    </section>

    <div ref={results} className="scroll-mt-24">
      {groups.map(r => <section key={r} aria-label={`${province} ${r}`} className="mt-10 sm:mt-14">
        <h2 className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />{province} · {r}</h2>
        <div className="mt-5 grid gap-5 sm:gap-6">
          {shown.filter(c => c.region === r).map(c => <CaseCard key={c.href} item={c} />)}
        </div>
      </section>)}
    </div>
  </>;
}
