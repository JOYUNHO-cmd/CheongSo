"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/components/service-pages/shared";

const GROUP_SIZE = 2;

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

function Card({ item, onOpen }: { item: PortfolioItem; onOpen: (item: PortfolioItem) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group flex min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
    >
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <div className="relative overflow-hidden bg-gray-100">
          <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} fill className="object-cover" sizes="(min-width: 640px) 25vw, 45vw" />
          <Badge label="전" variant="before" />
        </div>
        <div className="relative overflow-hidden bg-gray-100">
          <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} fill className="object-cover" sizes="(min-width: 640px) 25vw, 45vw" />
          <Badge label="후" variant="after" />
        </div>
      </div>
      <div className="shrink-0 px-4 py-3">
        <p className="truncate text-sm font-bold text-gray-700 group-hover:text-brand-dark">{item.title}</p>
      </div>
    </button>
  );
}

// 메인페이지 "찐현장사진들"과 동일한 커튼 전환 방식으로, 해당 서비스 사례만 모아 보여줍니다.
export function CaseGallery({ items }: { items: PortfolioItem[] }) {
  const groupSize = GROUP_SIZE;
  const [start, setStart] = useState(0);
  const [moving, setMoving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stopped = hovered || focused || !!openItem;

  useEffect(() => {
    if (stopped || items.length <= groupSize) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMoving(true);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [stopped, items.length, groupSize]);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      setStart(value => (value + groupSize) % items.length);
      setMoving(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [moving, items.length, groupSize]);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  return (
    <>
      <div className="case-curtain-window" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`case-curtain-track${moving ? " is-moving" : ""}`}>
          {[0, 1].map(panel => (
            <div key={panel} className="case-curtain-panel" aria-hidden={panel === 1} inert={panel === 1}>
              {Array.from({ length: Math.min(groupSize, items.length) }, (_, index) => {
                const position = (start + panel * groupSize + index) % items.length;
                const item = items[position];
                return <Card key={index} item={item} onOpen={setOpenItem} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-brand-dark">사진을 누르면 크게 볼 수 있어요</p>

      <dialog
        ref={dialog}
        onClose={() => { setOpenItem(null); setHovered(false); setFocused(false); }}
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
