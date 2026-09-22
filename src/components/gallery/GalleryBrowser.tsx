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

const categories = galleryData as GalleryCategory[];

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
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  return (
    <>
      {/* 카테고리 빠른 이동 칩 */}
      <div className="sticky top-[56px] sm:top-[72px] z-30 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/95 backdrop-blur-sm border-y border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max mx-auto justify-start sm:justify-center">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs sm:text-sm font-extrabold text-gray-700 hover:bg-brand hover:text-white transition-all active:scale-95"
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-60">{cat.items.length}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-14">
        {categories.map((cat, idx) => (
          <section key={cat.slug} id={cat.slug} className="scroll-mt-32">
            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand text-xs font-black text-white shadow-xs">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">{cat.label}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">현장 사진 {cat.items.length}건</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {cat.items.map((item) => (
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
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

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
