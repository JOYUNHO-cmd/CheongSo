"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import reviewManifest from "@/lib/review-manifest.json";

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function mixedReviews() {
  const groups = shuffled([
    shuffled(reviewManifest.filter(review => review.file.startsWith("kakao-"))),
    shuffled(reviewManifest.filter(review => review.file.startsWith("soomgo-"))),
  ]);
  return Array.from({ length: Math.max(...groups.map(group => group.length)) }, (_, i) => groups.flatMap(group => group[i] ? [group[i]] : [])).flat();
}

export default function ReviewShowcase() {
  const [reviews, setReviews] = useState(reviewManifest);
  useEffect(() => {
    // Shuffle after hydration so the server and initial client markup agree.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReviews(mixedReviews());
  }, []);
  const [start, setStart] = useState(0);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openFile, setOpenFile] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stopped = paused || hovered || focused || !!openFile;
  useEffect(() => {
    if (stopped || reviews.length <= 4) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMoving(true);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [stopped, reviews.length]);
  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      setStart(value => (value + 4) % reviews.length);
      setMoving(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [moving, reviews.length]);
  useEffect(() => {
    if (openFile) dialog.current?.showModal();
    else dialog.current?.close();
  }, [openFile]);
  function next() {
    if (moving) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStart(value => (value + 4) % reviews.length);
    else setMoving(true);
  }
  const selected = reviews.find(item => item.file === openFile);
  return (
    <section aria-label="고객 후기 모아보기" aria-roledescription="캐러셀" className="mx-auto max-w-6xl px-6">
      <div className="review-curtain-window" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`review-curtain-track${moving ? " is-moving" : ""}`}>
          {[0, 1].map(panel => (
            <div key={panel} className="review-curtain-panel" aria-hidden={panel === 1} inert={panel === 1}>
              {Array.from({ length: Math.min(4, reviews.length) }, (_, index) => {
                const position = (start + panel * 4 + index) % reviews.length;
                const review = reviews[position];
                return <button key={index} type="button" onClick={() => setOpenFile(review.file)} className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-brand" aria-label={`고객 후기 ${position + 1} 크게 보기`}>
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-gray-50"><Image src={`/images/reviews-v2/${review.file}`} alt={`실제 고객 후기 ${position + 1}`} width={review.width} height={review.height} className="h-full w-full object-contain" sizes="(min-width: 768px) 25vw, 45vw" /></div>
                  <span className="flex shrink-0 justify-end border-t border-gray-100 px-4 py-3 text-xs font-bold text-brand-dark">크게 보기 ↗</span>
                </button>;
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-gray-500">선택하면 크게 읽을 수 있어요.</p>
        <div className="flex gap-2"><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="rounded-full border border-gray-200 px-4 py-2">{paused ? "자동 넘김 재개" : "자동 넘김 멈춤"}</button><button type="button" disabled={moving} onClick={next} className="rounded-full bg-brand-dark px-4 py-2 text-white disabled:opacity-50">다음 후기 ↑</button></div>
      </div>
      <dialog ref={dialog} onClose={() => setOpenFile(null)} aria-label="고객 후기 크게 보기" className="m-auto max-h-[90dvh] max-w-[95vw] rounded-2xl bg-white p-4 backdrop:bg-black/80">
        <form method="dialog" className="sticky top-0 z-10 flex justify-end"><button autoFocus className="rounded-full bg-brand-dark px-4 py-2 text-white">닫기 ✕</button></form>
        {selected && <Image src={`/images/reviews-v2/${selected.file}`} alt="실제 고객 후기 원문" width={selected.width} height={selected.height} className="h-auto max-w-full" sizes="90vw" />}
      </dialog>
    </section>
  );
}
