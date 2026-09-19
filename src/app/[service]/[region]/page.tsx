import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import { findService, normalizeSegment } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const dynamicParams = true;
export function generateStaticParams() { return regionalPages.map(p => ({ service: p.service, region: p.region })); }
type Props = { params: Promise<{ service: string; region: string }> };
async function getPage(params: Props["params"]) { const p = await params; const record = regionalPages.find(r => r.service === normalizeSegment(p.service) && r.region === normalizeSegment(p.region)); if (!record) notFound(); return record; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
export default async function Page({ params }: Props) { const p = await getPage(params); const s = findService(p.service); if (!s) notFound(); return <ServiceLanding service={s} regional={p} />; }
