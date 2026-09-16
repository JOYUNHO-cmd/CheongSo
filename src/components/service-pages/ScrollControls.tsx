"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, ArrowUp } from "lucide-react";

// 랜딩페이지 옆에 고정되는 위/아래 스크롤 버튼. 화면 끝에 도달하면 해당 방향 버튼이 흐려집니다.
export function ScrollSideNav() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      setAtTop(window.scrollY < 80);
      setAtBottom(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByViewport = (direction: 1 | -1) => {
    window.scrollBy({ top: direction * window.innerHeight * 0.7, behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-full border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm sm:flex">
      <button
        type="button"
        onClick={() => scrollByViewport(-1)}
        disabled={atTop}
        aria-label="위로 스크롤"
        className="flex h-10 w-10 items-center justify-center text-brand-dark transition-colors hover:bg-brand-light disabled:text-gray-300 disabled:hover:bg-transparent sm:h-11 sm:w-11"
      >
        <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
      </button>
      <div className="h-px bg-gray-100" />
      <button
        type="button"
        onClick={() => scrollByViewport(1)}
        disabled={atBottom}
        aria-label="아래로 스크롤"
        className="flex h-10 w-10 items-center justify-center text-brand-dark transition-colors hover:bg-brand-light disabled:text-gray-300 disabled:hover:bg-transparent sm:h-11 sm:w-11"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

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
