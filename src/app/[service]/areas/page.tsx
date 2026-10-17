import { notFound } from 'next/navigation';
import Link from 'next/link';
import { priorityServices, priorityService, serviceRegions } from '@/lib/service-regions';
import { buildMetadata } from '@/lib/seo';
import ServiceRegionFinder from '@/components/areas/ServiceRegionFinder';

type Props = { params: Promise<{ service: string }> };
export function generateStaticParams() { return priorityServices.map(service => ({ service })); }
export async function generateMetadata({ params }: Props) {
  const s = priorityService((await params).service); if (!s) notFound();
  return buildMetadata({ title: `${s.name} 전국 지역별 작업·견적 안내`, description: `${s.name} 전국 방문 상담. 시·군·구와 평촌·산본·송도 등 생활권에서 ${s.name} 작업 범위와 견적 준비사항을 확인하세요.`, path: `/${s.slug}/areas/` });
}
export default async function Page({ params }: Props) {
  const s = priorityService((await params).service); if (!s) notFound();
  return <article className="mx-auto max-w-6xl px-5 py-10 break-keep">
    <nav aria-label="현재 위치" className="mb-7 flex flex-wrap gap-2 text-sm"><Link href="/">홈</Link><span aria-hidden="true">/</span><Link href={`/${s.slug}/`}>{s.name}</Link><span aria-hidden="true">/</span><span>지역별 안내</span></nav>
    <h1 className="text-3xl font-black text-brand-dark">{s.name} 전국 지역별 안내</h1>
    <p className="mt-5 leading-8">{s.name}, 전국 방문이 가능합니다. 현장 지역을 선택해 작업 범위와 비용·견적 준비사항을 확인하세요. 방문 일정은 현장 조건과 함께 상담합니다.</p>
    <ServiceRegionFinder regions={serviceRegions} service={s.slug} name={s.name} />
  </article>;
}
