"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import reviewManifest from "@/lib/review-manifest.json";

type Review = { file: string; width: number; height: number };
const initialReviews = reviewManifest as Review[];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function ReviewShowcase() {
  const [openFile, setOpenFile] = useState<string | null>(null);
  // Server/first-client-render use the same fixed order (avoids a hydration
  // mismatch); reshuffled client-side right after mount so each visit sees
  // the reviews in a different order.
  const [reviews, setReviews] = useState(initialReviews);
  useEffect(() => {
    // Randomizing only makes sense post-hydration (SSR output must match
    // the deterministic initial order), so this one-time reshuffle has to
    // happen here rather than during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReviews(shuffle(initialReviews));
  }, []);

  return (
    <>
      <div className="marquee-row overflow-hidden">
        <div className="flex w-max animate-marquee-left items-start">
          {[...reviews, ...reviews].map((review, idx) => (
            <button
              key={`${review.file}-${idx}`}
              type="button"
              onClick={() => setOpenFile(review.file)}
              className="mx-2 w-48 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg md:mx-3 md:w-60"
              aria-label="후기 크게 보기"
            >
              <Image
                src={`/images/reviews-v2/${review.file}`}
                alt="실제 고객 후기"
                width={review.width}
                height={review.height}
                className="h-auto w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {openFile && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpenFile(null)}
        >
          <button
            type="button"
            onClick={() => setOpenFile(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
            aria-label="닫기"
          >
            ✕
          </button>
          <img
            src={`/images/reviews-v2/${openFile}`}
            alt="실제 고객 후기"
            className="max-h-full max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
