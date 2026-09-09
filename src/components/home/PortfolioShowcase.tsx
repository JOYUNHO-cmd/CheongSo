"use client";

import { useState } from "react";
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
const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];

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
      className="group mx-2.5 w-80 shrink-0 rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md md:w-96"
    >
      <div className="grid grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-tl-2xl bg-gray-100">
          <Image src={`/images/portfolio-v2/${item.before}`} alt={`${item.title} 시공 전`} fill className="object-cover" sizes="192px" />
          <Badge label="전" variant="before" />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-tr-2xl bg-gray-100">
          <Image src={`/images/portfolio-v2/${item.after}`} alt={`${item.title} 시공 후`} fill className="object-cover" sizes="192px" />
          <Badge label="후" variant="after" />
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="truncate text-sm font-bold text-gray-700 group-hover:text-brand-dark">{item.title}</p>
      </div>
    </button>
  );
}

export default function PortfolioShowcase() {
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className="space-y-5">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="marquee-row overflow-hidden">
            <div className={`flex w-max ${rowIdx % 2 === 1 ? "animate-marquee-right-slow" : "animate-marquee-left-slow"}`}>
              {[...row, ...row].map((item, idx) => (
                <Card key={`${item.id}-${idx}`} item={item} onOpen={setOpenItem} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpenItem(null)}
        >
          <button
            type="button"
            onClick={() => setOpenItem(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
            aria-label="닫기"
          >
            ✕
          </button>
          <div className="flex max-h-full max-w-4xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="grid w-full grid-cols-2 gap-2 md:gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/portfolio-v2/${openItem.before}`} alt={`${openItem.title} 시공 전`} fill className="object-cover" sizes="50vw" />
                <Badge label="전" variant="before" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={`/images/portfolio-v2/${openItem.after}`} alt={`${openItem.title} 시공 후`} fill className="object-cover" sizes="50vw" />
                <Badge label="후" variant="after" />
              </div>
            </div>
            <p className="text-center text-sm font-bold text-white">{openItem.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
