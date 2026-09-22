import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import galleryData from "@/lib/gallery-data.json";
import { buildMetadata } from "@/lib/seo";

const totalCount = (galleryData as { items: unknown[] }[]).reduce((sum, cat) => sum + cat.items.length, 0);

export const metadata = buildMetadata({
  title: `찐현장사진 ${totalCount}건 모아보기`,
  description: `찐청소가 실제로 작업한 전/후 현장 사진 ${totalCount}건을 서비스 분야별로 모아 확인하세요.`,
  path: "/gallery",
  keywords: ["찐현장사진", "청소 전후사진", "청소업체 시공사례", "청소 현장 사진"],
});

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
          찐현장사진 {totalCount}건 모아보기
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          찐청소가 실제로 작업한 전/후 현장 사진입니다. 분야를 선택하면 해당 사진만 모아볼 수 있어요.
          사진을 누르면 크게 볼 수 있어요
        </p>
      </div>
      <GalleryBrowser />
    </div>
  );
}
