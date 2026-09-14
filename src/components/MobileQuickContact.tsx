"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import KakaoIcon from "@/components/icons/KakaoIcon";

/**
 * 모바일 전용 좌측 플로팅 빠른 상담 도크 (전화걸기 & 카톡문의)
 * - 상단 영역에서는 최적의 중간 위치(calc(25% + 9px))에 자리하다가,
 *   스크롤 다운 시 최하단으로 자연스럽게 부드럽게 이동(slide down)
 */
export default function MobileQuickContact() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!siteConfig.phoneRaw && !siteConfig.kakaoUrl) return null;

  return (
    <aside
      aria-label="모바일 빠른 상담 바로가기"
      className={`fixed left-2.5 z-40 flex flex-col items-center gap-2.5 md:hidden pointer-events-none select-none transition-all duration-500 ease-out ${
        isScrolled
          ? "bottom-[max(18px,env(safe-area-inset-bottom))] translate-y-0"
          : "bottom-[calc(25%+9px)] translate-y-1/2"
      }`}
    >
      {/* 1. 24시 전화걸기 버튼 (PC처럼 마우스 호버 시 바탕색 변경 및 확대 반응) */}
      {siteConfig.phoneRaw && (
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          title="24시 빠른 전화상담 연결"
          className="group pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-brand-dark hover:shadow-lg active:scale-90 cursor-pointer"
          aria-label={`24시 빠른 전화상담 연결 (${siteConfig.phone})`}
        >
          <Phone
            className="h-5 w-5 text-white animate-phone-ring transition-transform duration-200 group-hover:scale-110"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </a>
      )}

      {/* 2. 카톡문의 바로가기 버튼 (PC처럼 마우스 호버 시 바탕색 변경 및 확대 반응) */}
      {siteConfig.kakaoUrl && (
        <a
          href={siteConfig.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="카카오톡 1:1 실시간 상담"
          className="group pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE500] text-[#381E1F] shadow-md transition-all duration-200 hover:scale-110 hover:bg-[#fed900] hover:shadow-lg active:scale-90 cursor-pointer"
          aria-label="카카오톡 1:1 실시간 상담 바로가기 (새 창 열림)"
        >
          <KakaoIcon className="h-5 w-5 text-[#381E1F] animate-kakao-ring transition-transform duration-200 group-hover:scale-110" />
        </a>
      )}
    </aside>
  );
}
