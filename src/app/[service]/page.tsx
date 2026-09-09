import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLanding from "@/components/ServiceLanding";
import { serviceProfiles, findService, servicePath } from "@/lib/service-profiles";
import { absoluteUrl } from "@/lib/site-url";
// 목록 밖 주소는 아래 조회에서 404로 처리합니다. 한글 경로도 같은 조회를 거칩니다.
export const dynamicParams = true;
export function generateStaticParams() { return serviceProfiles.map(s => ({ service: s.slug })); }
type Props = { params: Promise<{ service: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findService((await params).service); if (!s) notFound();
  const title = `${s.name} | 작업 범위·견적 안내 | 찐청소`;
  return { title, description: s.intro, alternates: { canonical: absoluteUrl(servicePath(s.name)) }, openGraph: { title, description: s.intro, url: absoluteUrl(servicePath(s.name)), locale: "ko_KR", type: "website" } };
}
export default async function Page({ params }: Props) { const s = findService((await params).service); if (!s) notFound(); return <ServiceLanding service={s} />; }
