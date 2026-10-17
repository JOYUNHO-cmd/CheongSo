'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import type { ServiceRegion } from '@/lib/service-regions';

export default function ServiceRegionFinder({ regions, service, name }: { regions: ServiceRegion[]; service: string; name: string }) {
  const [query, setQuery] = useState('');
  const id = useId();
  const provinces = [...new Set(regions.map(r => r.province))];
  const filtered = regions.filter(r => `${r.region} ${r.label}`.replaceAll('-', ' ').includes(query.trim()));
  const summary = 'flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 font-bold text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark [&::-webkit-details-marker]:hidden';
  const regionLink = (r: ServiceRegion) => <li key={r.region}><Link prefetch={false} href={`/${service}/${r.region}/`} className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-brand-dark hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-brand-dark"><span>{r.label} {name}</span><span aria-hidden="true">→</span></Link></li>;
  return <div className="mt-8">
    <div>
      <label className="font-bold">지역 이름 검색<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="예: 안양, 평촌, 산본, 송도" className="mt-2 block min-h-12 w-full rounded-lg border border-gray-300 px-3 font-normal" /></label>
    </div>
    <p className="mt-3 text-sm leading-6 text-slate-600">시·도를 누른 뒤 시·군·구와 생활권을 선택하세요.</p>
    <p role="status" className="mt-2 text-sm text-gray-600">{filtered.length}개 지역</p>
    {!filtered.length && <p className="mt-4">검색 결과가 없습니다. 시·군·구 이름으로 검색하거나 전화로 현장 주소를 알려주세요.</p>}
    <div key={query.trim()} className="mt-4 space-y-3">{provinces.map(p => {
      const items = filtered.filter(r => r.province === p);
      if (!items.length) return null;
      const cities = [...new Set(items.map(r => r.region.split('-')[1] || p))];
      return <details key={p} name={query.trim() ? undefined : `${id}-province`} open={query.trim() ? true : undefined} className="group/province rounded-xl border border-slate-200 bg-slate-50">
        <summary className={summary}><span>{p}<span className="ml-2 text-sm font-normal text-slate-500">{items.length}개 지역</span></span><span aria-hidden="true" className="text-xl text-teal-700 group-open/province:rotate-180">⌄</span></summary>
        <div className="space-y-2 border-t border-slate-200 p-3 sm:p-4">{cities.map(city => {
          const children = items.filter(r => (r.region.split('-')[1] || p) === city);
          if (children.length === 1) return <ul key={city}>{children.map(regionLink)}</ul>;
          return <details key={city} name={query.trim() ? undefined : `${id}-${p}-city`} open={query.trim() ? true : undefined} className="group/city rounded-lg border border-slate-200 bg-white">
            <summary className={summary}><span>{city}<span className="ml-2 text-sm font-normal text-slate-500">{children.length}개 지역</span></span><span aria-hidden="true" className="text-xl text-teal-700 group-open/city:rotate-180">⌄</span></summary>
            <ul className="grid gap-2 border-t border-slate-100 p-3 sm:grid-cols-2">{children.map(regionLink)}</ul>
          </details>;
        })}</div>
      </details>;
    })}</div>
  </div>;
}
