"use client";

import { useEffect } from "react";

// 다른 페이지에서 /#portfolio, /#reviews 같은 해시로 들어왔을 때
// 브라우저 기본 동작(섹션 상단 정렬)이 아니라 화면 중앙에 오도록 보정
export default function HashScrollCenter() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}
