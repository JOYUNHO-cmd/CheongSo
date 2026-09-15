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
const MOBILE_GROUP_SIZE = 4;
const DESKTOP_GROUP_SIZE = 3;

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
  const [portfolioItems, setPortfolioItems] = useState(items);
  useEffect(() => {
    // 하이드레이션 이후에 섞어야 서버·클라이언트 초기 마크업이 일치합니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortfolioItems(shuffled(items));
  }, []);
  const [groupSize, setGroupSize] = useState(DESKTOP_GROUP_SIZE);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setGroupSize(mq.matches ? MOBILE_GROUP_SIZE : DESKTOP_GROUP_SIZE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const [start, setStart] = useState(0);
  const [moving, setMoving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stopped = hovered || focused || !!openItem;

  useEffect(() => {
    if (stopped || portfolioItems.length <= groupSize) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMoving(true);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [stopped, portfolioItems.length, groupSize]);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      setStart(value => (value + groupSize) % portfolioItems.length);
      setMoving(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [moving, portfolioItems.length, groupSize]);

  useEffect(() => {
    if (openItem) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openItem]);

  return (
    <section aria-label="시공 전/후 현장 모아보기" aria-roledescription="캐러셀" className="mx-auto max-w-6xl px-6">
      <div className="portfolio-curtain-window" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`portfolio-curtain-track${moving ? " is-moving" : ""}`}>
          {[0, 1].map(panel => (
            <div key={panel} className="portfolio-curtain-panel" aria-hidden={panel === 1} inert={panel === 1}>
              {Array.from({ length: Math.min(groupSize, portfolioItems.length) }, (_, index) => {
                const position = (start + panel * groupSize + index) % portfolioItems.length;
                const item = portfolioItems[position];
                return <Card key={index} item={item} onOpen={setOpenItem} />;
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-base font-bold text-brand-dark sm:text-lg">사진을 누르면 크게 볼 수 있어요</p>
      <dialog ref={dialog} onClose={() => setOpenItem(null)} aria-label="시공 전/후 크게 보기" className="m-auto h-fit w-[95vw] max-w-[1300px] max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-4 backdrop:bg-black/80">
        <form method="dialog" className="sticky top-0 z-10 flex justify-end"><button autoFocus className="rounded-full bg-brand-dark px-4 py-2 text-white">닫기 ✕</button></form>
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
    </section>
  );
}
