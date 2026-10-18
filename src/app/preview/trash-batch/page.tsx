import type { Metadata } from 'next';
import Link from 'next/link';
import cases from '@/lib/trash-batch-01.json';
import { buildMetadata } from '@/lib/seo';
export const metadata:Metadata={...buildMetadata({title:'쓰레기집청소 사례 10개 검토',description:'지역별 실제 작업 사례 검토용 목록입니다.',path:'/preview/trash-batch/'}),robots:{index:false,follow:false}};
export default function Page(){return <div className="mx-auto max-w-5xl px-5 py-12 text-brand-dark">
  <p className="mb-4">검토용 미리보기 · 배포 전</p><h1 className="text-3xl font-black">쓰레기집청소 사례 10개</h1>
  <p className="my-5 leading-8">각 항목을 눌러 본문과 사진을 확인하실 수 있습니다. 기존 운영 페이지는 변경하지 않았습니다.</p>
  <ol className="divide-y divide-slate-200 border-y border-slate-200">{cases.map((c,i)=><li key={c.slug}><Link className="block py-6 focus-visible:outline-2 focus-visible:outline-offset-4" href={`/preview/trash-batch/${c.slug}/`}><h2 className="text-xl font-bold">{i+1}. {c.area} 쓰레기집청소 →</h2><p className="mt-2">{c.space} · {c.crew}명 · {c.hours}시간</p><p className="mt-2 leading-7 text-slate-600">{c.caseHeading}</p></Link></li>)}</ol>
</div>}
