"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import galleryData from "@/lib/gallery-data.json";
import { useRouter } from "next/navigation";
import { galleryHref, GALLERY_PAGE_SIZE as PAGE_SIZE } from "@/lib/gallery-navigation";

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

export default function GalleryBrowser({ initialCategory = "all", initialItem = null, initialPage = 1 }: { initialCategory?: string; initialItem?: string | null; initialPage?: number }) {
  const router = useRouter();

  const activeCategory = initialCategory;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const openItem = allItems.find(item => item.id === initialItem) ?? null;
  const [filterOpen, setFilterOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  function selectCategory() {
    setVisibleCount(PAGE_SIZE);
    setFilterOpen(false);
  }

  // 고정 순서와 실제 페이지 URL로 모든 사진을 서버 HTML에서 발견할 수 있게 합니다.
  const filtered = activeCategory === "all" ? allItems : allItems.filter((item) => item.categorySlug === activeCategory);
  const offset = (initialPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(offset, offset + visibleCount);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const activeLabel = activeCategory === "all" ? "전체" : categories.find((c) => c.slug === activeCategory)?.label;

  return (
    <>
      {/* 카테고리 필터: 모바일은 펼침형 선택창, 태블릿 이상은 한 줄 가로 스크롤 칩 */}
      <div className="relative mb-8 sm:hidden">
        <button
          type="button"
          onClick={() => setFilterOpen((value) => !value)}
          aria-expanded={filterOpen}
          aria-controls="gallery-mobile-filters"
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            <span className="shrink-0 font-extrabold text-brand-dark">{activeLabel}</span>
            <span className="truncate text-xs font-semibold text-brand-dark">(궁금하신 현장 사례를 선택해주세요)</span>
          </span>
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown className="block h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
          </span>
        </button>
        {filterOpen && (
          <div id="gallery-mobile-filters" className="absolute inset-x-0 top-full z-20 mt-1.5 max-h-80 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg divide-y divide-gray-100">
            <Link
              href={galleryHref("all")}
              scroll={false}
              onClick={selectCategory}
              aria-current={activeCategory === "all" ? "page" : undefined}
              className={`block w-full px-4 py-3 text-left text-sm font-bold ${activeCategory === "all" ? "bg-brand-light text-brand-dark" : "text-gray-700 hover:bg-teal-50"}`}
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={galleryHref(cat.slug)}
                scroll={false}
                onClick={selectCategory}
                aria-current={activeCategory === cat.slug ? "page" : undefined}
                className={`block w-full px-4 py-3 text-left text-sm font-bold ${activeCategory === cat.slug ? "bg-brand-light text-brand-dark" : "text-gray-700 hover:bg-teal-50"}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 hidden rounded-2xl border border-gray-100 bg-gray-50/60 p-2.5 sm:block">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link
            href={galleryHref("all")}
            scroll={false}
            onClick={selectCategory}
            aria-current={activeCategory === "all" ? "page" : undefined}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
              activeCategory === "all" ? "bg-brand text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand"
            }`}
          >
            전체
          </Link>
          <div className="h-6 w-px shrink-0 bg-gray-200" aria-hidden="true" />
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={galleryHref(cat.slug)}
              scroll={false}
              onClick={selectCategory}
              aria-current={activeCategory === cat.slug ? "page" : undefined}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
                activeCategory === cat.slug ? "bg-brand text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => router.push(galleryHref(activeCategory, item.id, initialPage), { scroll: false })}
            className="group flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
          >
            <div className="grid w-full shrink-0 grid-cols-2">
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
            </div>
          </button>
        ))}
      </div>

      {offset + visibleCount < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
            className="rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-brand-dark shadow-sm transition hover:border-brand hover:bg-brand-light"
          >
            사진 더보기
          </button>
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="현장사진 페이지 이동" className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-brand-dark">
          {initialPage > 1 && <Link href={galleryHref(activeCategory, null, initialPage - 1)} className="inline-flex min-h-11 items-center underline underline-offset-4">← 이전 페이지</Link>}
          <span>{initialPage} / {pageCount} 페이지</span>
          {initialPage < pageCount && <Link href={galleryHref(activeCategory, null, initialPage + 1)} className="inline-flex min-h-11 items-center underline underline-offset-4">다음 페이지 →</Link>}
        </nav>
      )}

      <dialog
        ref={dialog}
        onClose={() => { if (openItem) router.replace(galleryHref(activeCategory, null, initialPage), { scroll: false }); }}
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
