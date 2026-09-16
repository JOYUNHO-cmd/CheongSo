"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/components/service-pages/shared";

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

// 메인페이지 "찐현장사진들" 갤러리와 동일한 카드·확대보기 형태로, 해당 서비스 사례만 모아 보여줍니다.
export function CaseGallery({ items }: { items: PortfolioItem[] }) {
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenItem(item)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
          >
            <div className="grid grid-cols-2">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} fill className="object-cover" sizes="(min-width: 768px) 260px, 45vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} fill className="object-cover" sizes="(min-width: 768px) 260px, 45vw" />
                <Badge label="후" variant="after" />
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="truncate text-sm font-bold text-gray-700 group-hover:text-brand-dark">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-bold text-brand-dark">사진을 누르면 크게 볼 수 있어요</p>

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
                <Image src={`/images/portfolio-v2/${openItem.before}`} alt={`${openItem.title} 시공 전`} fill className="object-cover" sizes="(min-width: 640px) 45vw, 90vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/portfolio-v2/${openItem.after}`} alt={`${openItem.title} 시공 후`} fill className="object-cover" sizes="(min-width: 640px) 45vw, 90vw" />
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
