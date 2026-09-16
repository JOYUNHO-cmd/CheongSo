"use client";

import { ArrowUp } from "lucide-react";

// 랜딩페이지 맨 아래에서 처음 상태(맨 위)로 되돌아가는 버튼
export function BackToTopButton() {
  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-brand-dark shadow-sm transition hover:border-brand hover:bg-brand-light"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        처음으로 돌아가기
      </button>
    </div>
  );
}
