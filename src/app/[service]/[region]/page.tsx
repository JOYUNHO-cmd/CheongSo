import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import { findService, normalizeSegment } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { absoluteUrl } from "@/lib/site-url";
export const dynamicParams = true;
export function generateStaticParams() { return regionalPages.map(p => ({ service: p.service, region: p.region })); }
type Props = { params: Promise<{ service: string; region: string }> };
async function getPage(params: Props["params"]) { const p = await params; const record = regionalPages.find(r => r.service === normalizeSegment(p.service) && r.region === normalizeSegment(p.region)); if (!record) notFound(); return record; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const p = await getPage(params); return { title: p.title, description: p.description, ...(p.publicationId ? { other: { "cheongso-publication": p.publicationId } } : {}), alternates: { canonical: absoluteUrl(regionalPath(p)) }, openGraph: { title: p.title, description: p.description, url: absoluteUrl(regionalPath(p)), locale: "ko_KR", type: "website" } }; }
export default async function Page({ params }: Props) { const p = await getPage(params); const s = findService(p.service); if (!s) notFound(); return <ServiceLanding service={s} regional={p} />; }
