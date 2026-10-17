import Link from 'next/link';
import { servicePath } from '@/lib/service-profiles';
import { priorityService, serviceRegions } from '@/lib/service-regions';
import ServiceRegionFinder from '@/components/areas/ServiceRegionFinder';

export function RegionJumpLink({ service }: { service: string }) {
  const slug = servicePath(service).slice(1, -1);
  if (!priorityService(slug)) return null;
  return <Link href="#service-regions" className="mt-4 flex min-h-11 w-fit items-center font-bold underline underline-offset-4">지역별 {service} 안내 →</Link>;
}

export default function ServiceRegionLinks({ service }: { service: string }) {
  const s = priorityService(service);
  if (!s) return null;
  return <section id="service-regions" className="mx-auto max-w-5xl scroll-mt-40 px-6 py-12 break-keep" aria-labelledby="service-regions-title">
    <h2 id="service-regions-title" className="text-2xl font-bold text-brand-dark">지역별 {s.name} 안내</h2>
    <p className="mt-3 leading-8">전국 방문이 가능합니다. 현장 지역을 선택해 작업 범위와 견적 준비사항을 확인하세요.</p>
    <ServiceRegionFinder regions={serviceRegions} service={s.slug} name={s.name} />
    <Link className="mt-4 inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4" href={`/${s.slug}/areas/`}>전국 시·군·구에서 {s.name} 찾기 →</Link>
  </section>;
}
