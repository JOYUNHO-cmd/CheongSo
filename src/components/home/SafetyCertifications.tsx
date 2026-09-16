"use client";

import { useState } from "react";
import Image from "next/image";
import { safetyDocuments } from "@/lib/safety-certifications-data";

export default function SafetyCertifications() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {safetyDocuments.map((doc, idx) => (
          <button
            key={doc.title}
            type="button"
            onClick={() => setOpenIdx(idx)}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <Image src={doc.image} alt={doc.title} fill className="object-contain p-3" sizes="(min-width: 640px) 45vw, 90vw" />
              <span className="absolute left-3 top-3 rounded-full bg-brand-dark/85 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-sm">
                공인 시험 자료
              </span>
            </div>
            <div className="border-t border-gray-100 px-4 py-3.5">
              <p className="text-sm font-bold text-gray-900 group-hover:text-brand-dark sm:text-base">{doc.title}</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{doc.description}</p>
              <span className="mt-2 inline-block text-xs font-bold text-brand">문서 크게 보기 →</span>
            </div>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpenIdx(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
            aria-label="닫기"
          >
            ✕
          </button>
          <div className="flex max-h-full flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={safetyDocuments[openIdx].image}
              alt={safetyDocuments[openIdx].title}
              width={safetyDocuments[openIdx].width}
              height={safetyDocuments[openIdx].height}
              className="max-h-[75vh] w-auto max-w-full rounded-xl bg-white object-contain shadow-2xl"
            />
            <p className="text-center font-bold text-white">{safetyDocuments[openIdx].title}</p>
          </div>
        </div>
      )}
    </>
  );
}
