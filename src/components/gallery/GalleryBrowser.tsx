"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import galleryData from "@/lib/gallery-data.json";

type GalleryItem = {
  id: string;
  title: string;
  before: string;
  after: string;
  beforeWidth: number;
  beforeHeight: number;
  afterWidth: number;
  afterHeight: number;
};
type GalleryCategory = { slug: string; label: string; items: GalleryItem[] };
type FlatItem = GalleryItem & { categorySlug: string; categoryLabel: string };

const categories = galleryData as GalleryCategory[];
const allItems: FlatItem[] = categories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, categorySlug: cat.slug, categoryLabel: cat.label }))
);

const PAGE_SIZE = 24;

function shuffled<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Badge({ label, variant }: { label: string; variant: "before" | "after" }) {
  return (
    <span
      className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm backdrop-blur-sm ${
        variant === "before" ? "bg-brand-dark/85" : "bg-brand/90"
      }`}
    >
      {label}
    </span>
  );
}

export default function GalleryBrowser() {
  // 하이드레이션 직후에 섞어야 서버·클라이언트 초기 마크업이 일치합니다.
  const [items, setItems] = useState(allItems);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(shuffled(allItems));
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openItem, setOpenItem] = useState<FlatItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = activeCategory === "all" ? items : items.filter((item) => item.categorySlug === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      {/* 카테고리 필터 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
            activeCategory === "all" ? "bg-brand text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand"
          }`}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => selectCategory(cat.slug)}
            className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
              activeCategory === cat.slug ? "bg-brand text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-brand"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="mb-5 text-center text-sm text-gray-500">
        {activeCategory === "all" ? "전체" : categories.find((c) => c.slug === activeCategory)?.label} {filtered.length}건 중 {visible.length}건 표시
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenItem(item)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
          >
            <div className="grid grid-cols-2">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image src={`/images/gallery-v2/${item.before}`} alt={`${item.title} 시공 전`} fill className="object-cover" sizes="(min-width: 1024px) 190px, (min-width: 640px) 220px, 45vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image src={`/images/gallery-v2/${item.after}`} alt={`${item.title} 시공 후`} fill className="object-cover" sizes="(min-width: 1024px) 190px, (min-width: 640px) 220px, 45vw" />
                <Badge label="후" variant="after" />
              </div>
            </div>
            <div className="px-3 py-2.5">
              <p className="truncate text-xs sm:text-sm font-bold text-gray-700 group-hover:text-brand-dark">{item.title}</p>
              <p className="mt-0.5 truncate text-[11px] text-gray-400">{item.categoryLabel}</p>
            </div>
          </button>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
            className="rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-brand-dark shadow-sm transition hover:border-brand hover:bg-brand-light"
          >
            사진 더보기 ({filtered.length - visibleCount}건 남음)
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        onClose={() => setOpenItem(null)}
        aria-label="시공 전/후 크게 보기"
        className="m-auto h-fit w-[95vw] max-w-[1300px] max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-4 backdrop:bg-black/80"
      >
        <form method="dialog" className="sticky top-0 z-10 flex justify-end">
          <button autoFocus className="rounded-full bg-brand-dark px-4 py-2 text-white">닫기 ✕</button>
        </form>
        {openItem && (
          <div className="flex w-full flex-col items-center gap-4">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/gallery-v2/${openItem.before}`} alt={`${openItem.title} 시공 전`} fill className="object-cover" sizes="(min-width: 640px) 45vw, 90vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/gallery-v2/${openItem.after}`} alt={`${openItem.title} 시공 후`} fill className="object-cover" sizes="(min-width: 640px) 45vw, 90vw" />
                <Badge label="후" variant="after" />
              </div>
            </div>
            <p className="text-center text-sm font-bold text-gray-700">{openItem.title}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
