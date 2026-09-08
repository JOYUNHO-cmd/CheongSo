"use client";

import { useState } from "react";
import Image from "next/image";
import reviewManifest from "@/lib/review-manifest.json";

type Review = { file: string; width: number; height: number };
const reviews = reviewManifest as Review[];

export default function ReviewShowcase() {
  const [openFile, setOpenFile] = useState<string | null>(null);

  return (
    <>
      <div className="scrollbar-hide flex items-start gap-3 overflow-x-auto px-6 pb-4 md:gap-4">
        {reviews.map((review) => (
          <button
            key={review.file}
            type="button"
            onClick={() => setOpenFile(review.file)}
            className="w-48 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg md:w-60"
            aria-label="후기 크게 보기"
          >
            <Image
              src={`/images/reviews/${review.file}`}
              alt="실제 고객 후기"
              width={review.width}
              height={review.height}
              className="h-auto w-full"
            />
          </button>
        ))}
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
            src={`/images/reviews/${openFile}`}
            alt="실제 고객 후기"
            className="max-h-full max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
