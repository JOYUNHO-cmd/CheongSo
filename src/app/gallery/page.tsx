import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import galleryData from "@/lib/gallery-data.json";
import { buildMetadata } from "@/lib/seo";
import { resolveGallerySelection, galleryHref, galleryPageNumber, GALLERY_PAGE_SIZE } from "@/lib/gallery-navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceConnections } from "@/lib/service-connections";

const totalCount = (galleryData as { items: unknown[] }[]).reduce((sum, cat) => sum + cat.items.length, 0);

type GalleryParams = { category?: string | string[]; item?: string | string[]; page?: string | string[] };

function galleryState(params: GalleryParams) {
  const selection = resolveGallerySelection(galleryData, params);
  const category = galleryData.find(category => category.slug === selection.category);
  const count = category?.items.length ?? totalCount;
  const page = galleryPageNumber(params.page);
  if (page === null || page > Math.max(1, Math.ceil(count / GALLERY_PAGE_SIZE))) notFound();
  return { ...selection, page, label: category?.label, count };
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<GalleryParams> }) {
  const state = galleryState(await searchParams);
  return buildMetadata({
    title: `${state.label ? `${state.label} ` : ""}현장사진들${state.page > 1 ? ` · ${state.page}페이지` : ""}`,
    description: state.label || state.page > 1
      ? `찐청소의 ${state.label ?? "전체 서비스"} 작업 전/후 사진 ${state.count}쌍 중 ${state.page}페이지입니다. 실제 현장 사진과 관련 서비스 안내를 확인하세요.`
      : `찐청소가 실제로 작업한 전/후 현장 사진 ${totalCount}쌍을 서비스 분야별로 모아 확인하세요.`,
    path: galleryHref(state.category, null, state.page),
    keywords: ["찐현장사진", "청소 전후사진", "청소업체 시공사례", "청소 현장 사진"],
  });
}

export default async function GalleryPage({ searchParams }: { searchParams: Promise<GalleryParams> }) {
  const selection = galleryState(await searchParams);
  const categoryItems = galleryData.find(category => category.slug === selection.category)?.items ?? [];
  const services = Object.entries(serviceConnections).filter(([, connection]) =>
    connection.gallery === selection.category || connection.cases?.some(id =>
      selection.item ? id === selection.item : categoryItems.some(item => item.id === id)));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-[clamp(12px,3.8vw,24px)] max-sm:whitespace-nowrap sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
          찐청소가 실제로 작업한 전/후 현장 사진입니다
        </h1>
        <p className="text-base sm:text-lg font-bold text-gray-700 leading-relaxed">분야를 선택하면 해당 사진만 볼 수 있습니다.</p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-light px-4 py-2 text-sm sm:text-base font-extrabold text-brand-dark shadow-sm animate-bounce">
          사진을 누르면 크게 볼 수 있어요 <span aria-hidden="true">🔍</span>
        </p>
      </div>
      {services.length > 0 && <aside aria-label="사진과 관련된 서비스 안내" className="mb-6 rounded-2xl bg-brand-light/40 p-5 text-sm leading-7">
        <p className="font-bold text-brand-dark">사진을 보셨다면, 작업 범위와 견적 기준도 확인해 보세요.</p>
        {services.map(([slug]) => <Link key={slug} href={`/${slug}/`} className="mt-2 inline-block font-bold text-brand-dark underline underline-offset-4">{slug.replaceAll("-", "")} 서비스 안내 →</Link>)}
        {selection.category === "fire" && <p data-fire-pilot className="mt-3"><Link href="/화재청소/#cases" className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">화재청소의 사례 확인 안내로 돌아가기 →</Link></p>}
        <ul className="mt-3 space-y-1">
          {services.filter(([slug]) => slug !== "화재청소").map(([slug]) => <li key={slug}><Link href={`/${slug}/#${slug === "유품정리" ? "photos" : "cases"}`} className="inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">{slug.replaceAll("-", "")}의 작업 전후 확인 안내로 돌아가기 →</Link></li>)}
        </ul>
      </aside>}
      <GalleryBrowser key={`${selection.category}-${selection.page}`} initialCategory={selection.category} initialItem={selection.item} initialPage={selection.page} />
    </div>
  );
}
