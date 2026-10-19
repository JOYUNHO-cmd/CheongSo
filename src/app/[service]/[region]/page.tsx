import TrashBatchLanding from '@/components/service-pages/TrashBatchLanding';
import trashCases from '@/lib/trash-batch-01.json';
import trashRegions from '@/lib/trash-batch-01-regions.json';
import type { Metadata } from "next";
import SeoksuTrashLanding from '@/components/service-pages/SeoksuTrashLanding';
import HwagokTrashLanding from '@/components/service-pages/HwagokTrashLanding';
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import AnyangKitchenLanding from "@/components/service-pages/AnyangKitchenLanding";
import GwacheonInteriorLanding from "@/components/service-pages/GwacheonInteriorLanding";
import RegionalInteriorCaseLanding, { hasRegionalInteriorCase } from "@/components/service-pages/RegionalInteriorCaseLanding";
import RegionalWaxCaseLanding, { hasRegionalWaxCase } from "@/components/service-pages/RegionalWaxCaseLanding";
import UiwangStoreLanding from "@/components/service-pages/UiwangStoreLanding";
import { findService, normalizeSegment } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import RegionalServiceGuide from '@/components/service-pages/RegionalServiceGuide';
import { findServiceRegion, priorityService, priorityServices, serviceRegions } from '@/lib/service-regions';
import { serviceSearchCopy } from '@/lib/service-search-copy';
export const dynamicParams = true;
export function generateStaticParams() {
  const routes = [...regionalPages.map(p => ({ service: p.service, region: p.region })), ...priorityServices.flatMap(service => serviceRegions.filter(r => r.kind === 'neighborhood').map(r => ({ service, region: r.region })))];
  return [...new Map(routes.map(p => [`${p.service}/${p.region}`, p])).values()];
}
type Props = { params: Promise<{ service: string; region: string }> };
async function getGuide(params: Props['params']) {
  const p = await params;
  if (regionalPages.some(r => r.service === normalizeSegment(p.service) && r.region === normalizeSegment(p.region))) return undefined;
  const service = priorityService(p.service);
  const region = findServiceRegion(p.region);
  if (region && normalizeSegment(p.region) !== region.region) return undefined;
  return service && region ? { service, region } : undefined;
}
async function getPage(params: Props["params"]) { const p = await params; const record = regionalPages.find(r => r.service === normalizeSegment(p.service) && r.region === normalizeSegment(p.region)); if (!record) notFound(); return record; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuide(params);
  if (guide) {
    const copy = serviceSearchCopy(guide.service, guide.region.label);
    return { ...buildMetadata({ title: copy.title, description: copy.description, path: `/${guide.service.slug}/${guide.region.region}/` }), robots: { index: false, follow: true } };
  }
  const p = await getPage(params);
  const s = findService(p.service);
  const regionLabel = p.region.replaceAll("-", " ");
  const keywords = [p.heading, regionLabel, `${regionLabel} ${s?.name ?? ""}`.trim(), s?.name, siteConfig.name].filter((v): v is string => !!v);
  return {
    ...buildMetadata({ title: p.title, description: p.description, keywords, path: regionalPath(p) }),
    other: {
      "geo.placename": regionLabel,
      ...(p.publicationId ? { "cheongso-publication": p.publicationId } : {}),
    },
  };
}
export default async function Page({ params }: Props) { const route = await params; const approved = normalizeSegment(route.service) === "쓰레기집청소" ? approvedTrashCases.find(c => c.region === normalizeSegment(route.region)) : undefined; if (approved) return <TrashBatchLanding item={approved} published publishedRegion={approved.region} photoOverride={approvedTrashPhotos[approved.slug as keyof typeof approvedTrashPhotos]} />; const guide = await getGuide(params); if (guide) return <RegionalServiceGuide {...guide} />; const p = await getPage(params); const s = findService(p.service); if (!s) notFound(); const trashCase = p.service === "쓰레기집청소" ? trashCases.find(c => trashRegions[c.slug as keyof typeof trashRegions] === p.region) : undefined; if (trashCase) return <TrashBatchLanding item={trashCase} published />; if (p.service === "쓰레기집청소" && p.region === "경기도-안양시-만안구") return <SeoksuTrashLanding />; if (p.service === "쓰레기집청소" && p.region === "서울특별시-강서구") return <HwagokTrashLanding />; if (p.service === "주방청소" && p.region === "경기도-안양시") return <AnyangKitchenLanding />; if (p.service === "인테리어청소" && p.region === "경기도-과천시") return <GwacheonInteriorLanding />; if (p.service === "인테리어청소" && hasRegionalInteriorCase(p.region)) return <RegionalInteriorCaseLanding region={p.region} />; if (p.service === "상가청소" && p.region === "경기도-의왕시") return <UiwangStoreLanding />; if (p.service === "바닥-왁스-코팅" && hasRegionalWaxCase(p.region)) return <RegionalWaxCaseLanding region={p.region} />; return <ServiceLanding service={s} regional={p} />; }
import approvedTrashCases from '@/lib/trash-batch-02-published.json';
import approvedTrashPhotos from '@/lib/trash-batch-02-published-photos.json';
