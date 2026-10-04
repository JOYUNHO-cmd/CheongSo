"use client";

import { Headset, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import KakaoIcon from "@/components/icons/KakaoIcon";

/**
 * 모바일 상담 수단을 한 줄로 모아 좌우 플로팅 버튼이 본문을 가리지 않게 합니다.
 * 공통 레이아웃의 하단 여백과 함께 사용합니다.
 */
export default function MobileQuickContact() {
  return (
    <aside
      aria-label="모바일 빠른 상담 바로가기"
      className="mobile-contact-dock fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-brand/15 bg-white px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] md:hidden"
    >
      {/* 1. 24시 전화걸기 버튼 (PC처럼 마우스 호버 시 바탕색 변경 및 확대 반응) */}
      {siteConfig.phoneRaw && (
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          title="24시 빠른 전화상담 연결"
          className="group flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-brand px-1.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          aria-label={`24시 빠른 전화상담 연결 (${siteConfig.phone})`}
        >
          <Phone
            className="h-5 w-5 shrink-0 text-white animate-phone-ring transition-transform duration-200 group-hover:scale-110"
            strokeWidth={2.4}
            aria-hidden="true"
          />
          <span className="whitespace-nowrap">전화상담</span>
        </a>
      )}

      {/* 2. 카톡문의 바로가기 버튼 (PC처럼 마우스 호버 시 바탕색 변경 및 확대 반응) */}
      {siteConfig.kakaoUrl && (
        <a
          href={siteConfig.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="카카오톡 1:1 실시간 상담"
          className="group flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-[#FEE500] px-1.5 text-sm font-bold text-[#381E1F] shadow-sm transition-colors hover:bg-[#fed900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          aria-label="카카오톡 1:1 실시간 상담 바로가기 (새 창 열림)"
        >
          <KakaoIcon className="h-5 w-5 shrink-0 text-[#381E1F] animate-kakao-ring transition-transform duration-200 group-hover:scale-110" />
          <span className="whitespace-nowrap">카카오톡</span>
        </a>
      )}
      <button
        type="button"
        title="1분 맞춤견적 자동상담"
        aria-label="찐청소 간편 자동상담 열기"
        aria-haspopup="dialog"
        aria-controls="jjin-consultation-dialog"
        onClick={() => window.dispatchEvent(new Event("open-consultation-bot"))}
        className="group flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl bg-[#0096a6] px-1.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        <Headset className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">자동상담</span>
      </button>
    </aside>
  );
}
