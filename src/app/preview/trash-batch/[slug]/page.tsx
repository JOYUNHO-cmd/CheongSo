import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import cases from '@/lib/trash-batch-01.json';
import TrashBatchLanding from '@/components/service-pages/TrashBatchLanding';
import { buildMetadata } from '@/lib/seo';
type Props = { params: Promise<{slug:string}> };
export const dynamicParams = false;
export function generateStaticParams() { return cases.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug}=await params; const c=cases.find(c=>c.slug===slug); if(!c) notFound();
  return {...buildMetadata({title:c.title,description:c.description,path:`/preview/trash-batch/${slug}/`}),robots:{index:false,follow:false}};
}
export default async function Page({params}:Props) {
  const {slug}=await params; const c=cases.find(c=>c.slug===slug); if(!c) notFound();
  return <TrashBatchLanding item={c} />;
}
