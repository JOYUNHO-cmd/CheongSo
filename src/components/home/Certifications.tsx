"use client";

import { useState } from "react";
import Image from "next/image";
import { certifications } from "@/lib/certifications-data";

export default function Certifications() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-5">
        {certifications.map((cert, idx) => (
          <button
            key={cert.title}
            type="button"
            onClick={() => setOpenIdx(idx)}
            className="group text-center"
            aria-label={`${cert.title} 자격증 크게 보기`}
          >
            <div className="relative mb-2 aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all group-hover:border-brand group-hover:shadow-lg">
              <Image src={cert.image} alt={cert.title} fill className="object-cover" sizes="150px" />
            </div>
            <p className="text-[11px] font-bold leading-tight text-gray-700 md:text-sm">{cert.title}</p>
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
            <img
              src={certifications[openIdx].image}
              alt={certifications[openIdx].title}
              className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl"
            />
            <p className="text-center font-bold text-white">
              {certifications[openIdx].title} · {certifications[openIdx].issuer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
