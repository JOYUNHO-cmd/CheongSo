import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import gallery from "@/lib/gallery-data.json";
import { ReadingParagraph } from "@/components/service-pages/ReadingParagraph";

export const metadata = buildMetadata({
  title: "지역별 청소·시공 안내",
  description: "찐청소의 지역별 실제 작업 사진과 견적 기준을 확인하세요. 안양 바닥왁스코팅 사례부터 안내하며, 다른 지역은 상담으로 방문 가능 여부를 확인합니다.",
  path: "/areas/",
});

export default function AreasPage() {
  const photo = gallery.find(category => category.slug === "floor-wax")!.items.find(item => item.id === "floor-wax-g28")!;
  return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 break-keep">
    <nav aria-label="현재 위치" className="mb-8 text-sm text-gray-500"><Link href="/" className="underline underline-offset-4">홈</Link><span aria-hidden="true"> / </span><span aria-current="page">지역별 안내</span></nav>
    <p className="font-bold text-brand">우리 동네 작업, 사진과 기준으로 확인하세요</p>
    <h1 className="mt-3 text-3xl font-black leading-tight text-brand-dark sm:text-4xl">지역별 청소·시공 안내</h1>
    <ReadingParagraph className="mt-5 max-w-2xl text-base leading-8 text-gray-700">실제 작업 사진이 있는 지역부터 안내합니다. 내 공간과 비슷한 사례를 살펴보고, 작업 범위와 견적에 영향을 주는 조건을 확인해 보세요.</ReadingParagraph>
    <section aria-labelledby="gyeonggi-title" className="mt-10 sm:mt-14">
      <h2 id="gyeonggi-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 안양시</h2>
      <Link data-region-card href="/바닥-왁스-코팅/경기도-안양시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', photo.before, photo.beforeWidth, photo.beforeHeight], ['작업 후', photo.after, photo.afterWidth, photo.afterHeight]] as const).map(([label, file, width, height]) => <figure key={file}>
            <Image src={`/images/gallery-v2/${file}`} alt={`${photo.title} · ${label}`} width={width} height={height} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사진 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">안양 바닥왁스코팅</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">학원·음식점·업무시설·사무실의 작업 전후 사진을 확인하세요. 한식뷔페 현장에서 두꺼운 왁스를 박리하고 집기를 나눠 옮기며 작업한 과정도 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">안양 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <aside className="mt-8 rounded-2xl bg-teal-50 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-brand-dark">찾으시는 지역이 아직 없나요?</h2>
      <ReadingParagraph className="mt-3 text-base leading-8 text-gray-700">현재 등록된 지역별 상세 안내입니다. 목록에 없는 지역이 서비스 불가 지역이라는 뜻은 아닙니다. 주소와 필요한 작업을 알려주시면 방문 가능 여부와 일정을 확인해 드립니다.</ReadingParagraph>
      <Link href="/contact/" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">다른 지역 상담하기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
    </aside>
  </div>;
}
