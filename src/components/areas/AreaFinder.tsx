"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowUpRight, Briefcase, Building2, ChefHat, Factory, MapPin, PaintRoller, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { ReadingParagraph } from "@/components/service-pages/ReadingParagraph";
import { areaCases, areaRegions, areaServices, type AreaCase } from "@/lib/area-cases";

const serviceIcons: Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  바닥왁스코팅: Sparkles,
  주방청소: ChefHat,
  쓰레기집청소: Trash2,
  신축준공청소: Building2,
  공장청소: Factory,
  사무실청소: Briefcase,
  인테리어청소: PaintRoller,
};

const count = (region: string | null, service: string | null) =>
  areaCases.filter(c => (!region || c.region === region) && (!service || c.service === service)).length;

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return <div>
    <p className="flex items-center gap-2 text-sm font-bold text-white/90">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-black text-brand-dark">{n}</span>{title}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">{children}</div>
  </div>;
}

function Chip({ active, disabled, onClick, children }: { active: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={active} disabled={disabled} onClick={onClick}
    className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold transition-colors sm:px-4 ${active
      ? "border-white bg-white text-brand-dark shadow-md"
      : disabled ? "cursor-not-allowed border-white/10 bg-white/5 text-white/35"
      : "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"}`}>
    {children}
  </button>;
}

function Badge({ n, active }: { n: number; active: boolean }) {
  return <span className={`rounded-full px-1.5 text-[11px] font-black leading-5 ${active ? "bg-brand text-white" : "bg-white/15"}`}>{n}</span>;
}

function CaseCard({ item }: { item: AreaCase }) {
  const Icon = serviceIcons[item.service];
  return <Link data-region-card href={item.href} className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
    <div className={`${item.photos.length > 1 ? "grid grid-cols-2 gap-2" : ""} bg-gray-50 p-4 sm:p-5`}>
      {item.photos.map(photo => photo.label
        ? <figure key={photo.src}>
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
          <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{photo.label}</figcaption>
        </figure>
        : <Image key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 640px) 440px, 100vw" className="h-auto w-full rounded-lg" />)}
    </div>
    <div className="flex flex-col justify-center p-5 sm:p-8">
      <div className="flex flex-wrap gap-1.5 text-xs font-bold">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-light/60 px-2.5 py-1 text-brand-dark"><MapPin aria-hidden className="h-3.5 w-3.5" />{item.region}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-gray-700"><Icon aria-hidden className="h-3.5 w-3.5" />{item.service}</span>
      </div>
      <p className="mt-4 text-sm font-semibold text-brand">{item.eyebrow}</p>
      <h3 className="mt-3 text-2xl font-bold text-brand-dark">{item.title}</h3>
      <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">{item.body}</ReadingParagraph>
      <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">{item.cta}<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
    </div>
  </Link>;
}

const ids: Record<string, string> = { 안양시: "anyang", 군포시: "gunpo", 안산시: "ansan", 시흥시: "siheung", 수원시: "suwon", 용인시: "yongin" };

export default function AreaFinder() {
  const [region, setRegion] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const results = useRef<HTMLDivElement>(null);

  // 공유된 주소(?지역=안양시&서비스=주방청소)로 들어오면 같은 선택을 복원
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("지역"), s = params.get("서비스");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (r && (areaRegions as readonly string[]).includes(r)) setRegion(r);
    if (s && (areaServices as readonly string[]).includes(s)) setService(s);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const update = (r: string | null, s: string | null, scroll = false) => {
    setRegion(r);
    setService(s);
    const params = new URLSearchParams();
    if (r) params.set("지역", r);
    if (s) params.set("서비스", s);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    if (scroll && window.innerWidth < 768) requestAnimationFrame(() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const shown = areaCases.filter(c => (!region || c.region === region) && (!service || c.service === service));
  const regionsShown = areaRegions.filter(r => shown.some(c => c.region === r));
  const summary = `${region ?? "전체 지역"} · ${service ?? "전체 서비스"}`;

  return <>
    <section aria-labelledby="finder-title" className="mt-8 rounded-3xl bg-gradient-to-br from-brand-dark to-brand p-5 text-white shadow-lg sm:mt-10 sm:p-8">
      <h2 id="finder-title" className="text-xl font-black sm:text-2xl">우리 동네 사례 찾기</h2>
      <p className="mt-2 text-sm leading-6 text-white/85 sm:text-base">지역과 서비스를 차례로 누르면 실제 작업 기록만 골라 보여드립니다.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Step n={1} title="어느 지역인가요? (경기도)">
          <Chip active={!region} onClick={() => update(null, service)}>전체 <Badge n={count(null, service)} active={!region} /></Chip>
          {areaRegions.map(r => {
            const n = count(r, service);
            return <Chip key={r} active={region === r} disabled={n === 0} onClick={() => update(region === r ? null : r, service)}>
              <MapPin aria-hidden className="h-4 w-4" />{r} <Badge n={n} active={region === r} />
            </Chip>;
          })}
        </Step>
        <Step n={2} title="어떤 작업이 필요하세요?">
          <Chip active={!service} onClick={() => update(region, null)}>전체 <Badge n={count(region, null)} active={!service} /></Chip>
          {areaServices.map(s => {
            const n = count(region, s);
            const Icon = serviceIcons[s];
            return <Chip key={s} active={service === s} disabled={n === 0} onClick={() => update(region, service === s ? null : s, service !== s)}>
              <Icon aria-hidden className="h-4 w-4" />{s} <Badge n={n} active={service === s} />
            </Chip>;
          })}
        </Step>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4">
        <p aria-live="polite" className="text-sm font-bold sm:text-base">{summary} <span className="text-white/80">— 사례 {shown.length}건</span></p>
        {(region || service) && <button type="button" onClick={() => update(null, null)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/15 px-4 text-sm font-bold hover:bg-white/25">
          <RotateCcw aria-hidden className="h-4 w-4" />처음부터 다시 고르기
        </button>}
      </div>
    </section>

    <div ref={results} className="scroll-mt-24">
      {regionsShown.map(r => <section key={r} aria-labelledby={`${ids[r]}-title`} className="mt-10 sm:mt-14">
        <h2 id={`${ids[r]}-title`} className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · {r}</h2>
        <div className="mt-5 grid gap-5 sm:gap-6">
          {shown.filter(c => c.region === r).map(c => <CaseCard key={c.href} item={c} />)}
        </div>
      </section>)}
    </div>
  </>;
}
