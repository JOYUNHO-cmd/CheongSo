"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import portfolioHighlights from "@/lib/portfolio-highlights.json";

type PortfolioItem = {
  id: string;
  categoryLabel: string;
  title: string;
  before: string;
  after: string;
  beforeWidth: number;
  beforeHeight: number;
  afterWidth: number;
  afterHeight: number;
};

const items = portfolioHighlights as PortfolioItem[];
const GROUP_SIZE = 3;

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
          <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} fill className="object-cover" sizes="(min-width: 768px) 20vw, 45vw" />
          <Badge label="전" variant="before" />
        </div>
        <div className="relative overflow-hidden bg-gray-100">
          <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} fill className="object-cover" sizes="(min-width: 768px) 20vw, 45vw" />
          <Badge label="후" variant="after" />
        </div>
      </div>
      <div className="shrink-0 px-4 py-3">
        <p className="truncate text-sm font-bold text-gray-700 group-hover:text-brand-dark">{item.title}</p>
      </div>
    </button>
  );
}

export default function PortfolioShowcase() {
  const [start, setStart] = useState(0);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stopped = paused || hovered || focused || !!openItem;

  useEffect(() => {
    if (stopped || items.length <= GROUP_SIZE) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMoving(true);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [stopped]);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      setStart(value => (value + GROUP_SIZE) % items.length);
      setMoving(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [moving]);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  function next() {
    if (moving) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStart(value => (value + GROUP_SIZE) % items.length);
    else setMoving(true);
  }

  return (
    <section aria-label="시공 전/후 현장 모아보기" aria-roledescription="캐러셀" className="mx-auto max-w-6xl px-6">
      <div className="portfolio-curtain-window" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`portfolio-curtain-track${moving ? " is-moving" : ""}`}>
          {[0, 1].map(panel => (
            <div key={panel} className="portfolio-curtain-panel" aria-hidden={panel === 1} inert={panel === 1}>
              {Array.from({ length: Math.min(GROUP_SIZE, items.length) }, (_, index) => {
                const position = (start + panel * GROUP_SIZE + index) % items.length;
                const item = items[position];
                return <Card key={index} item={item} onOpen={setOpenItem} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-gray-500">사진을 누르면 크게 볼 수 있어요</p>
        <div className="flex gap-2"><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="rounded-full border border-gray-200 px-4 py-2">{paused ? "자동 넘김 재개" : "자동 넘김 멈춤"}</button><button type="button" disabled={moving} onClick={next} className="rounded-full bg-brand-dark px-4 py-2 text-white disabled:opacity-50">다음 현장 ↑</button></div>
      </div>
      <dialog ref={dialog} onClose={() => setOpenItem(null)} aria-label="시공 전/후 크게 보기" className="m-auto max-h-[90dvh] max-w-[95vw] rounded-2xl bg-white p-4 backdrop:bg-black/80">
        <form method="dialog" className="sticky top-0 z-10 flex justify-end"><button autoFocus className="rounded-full bg-brand-dark px-4 py-2 text-white">닫기 ✕</button></form>
        {openItem && (
          <div className="flex max-w-4xl flex-col items-center gap-4">
            <div className="grid w-full grid-cols-2 gap-2 md:gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/portfolio-v2/${openItem.before}`} alt={`${openItem.title} 시공 전`} fill className="object-cover" sizes="90vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/portfolio-v2/${openItem.after}`} alt={`${openItem.title} 시공 후`} fill className="object-cover" sizes="90vw" />
                <Badge label="후" variant="after" />
              </div>
            </div>
            <p className="text-center text-sm font-bold text-gray-700">{openItem.title}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
