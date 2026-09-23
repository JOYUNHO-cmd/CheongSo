import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import galleryData from "@/lib/gallery-data.json";
import { buildMetadata } from "@/lib/seo";
import { resolveGallerySelection } from "@/lib/gallery-navigation";
import Link from "next/link";
import { serviceConnections } from "@/lib/service-connections";

const totalCount = (galleryData as { items: unknown[] }[]).reduce((sum, cat) => sum + cat.items.length, 0);

export const metadata = buildMetadata({
  title: "현장사진들",
  description: `찐청소가 실제로 작업한 전/후 현장 사진 ${totalCount}쌍을 서비스 분야별로 모아 확인하세요.`,
  path: "/gallery",
  keywords: ["찐현장사진", "청소 전후사진", "청소업체 시공사례", "청소 현장 사진"],
});

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string | string[]; item?: string | string[] }> }) {
  const selection = resolveGallerySelection(galleryData, await searchParams);
  const categoryItems = galleryData.find(category => category.slug === selection.category)?.items ?? [];
  const services = Object.entries(serviceConnections).filter(([, connection]) =>
    connection.gallery === selection.category || connection.cases?.some(id =>
      selection.item ? id === selection.item : categoryItems.some(item => item.id === id)));
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
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
      <GalleryBrowser key={selection.category} initialCategory={selection.category} initialItem={selection.item} />
    </div>
  );
}
