"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { serviceCategories } from "@/lib/services-data";
import { servicePath } from "@/lib/service-profiles";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/Logo";

// 상단 주요 안내 메뉴
const mainNavLinks = [
  { label: "회사소개", href: "/about" },
  { label: "가격안내", href: "/pricing" },
  { label: "고객후기", href: "/reviews" },
  { label: "문의하기", href: "/contact" },
];

export default function Header() {
  // 모바일 메뉴 드로어 열림 상태
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // PC 메가 드롭다운 상태
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 모바일 메뉴 열기
  const openMenu = useCallback(() => {
    setMobileMenuOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  // 모바일 메뉴 닫기
  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  // 전역 편의 함수 등록 (어느 버튼에서나 window.openServiceMenu() 호출 가능)
  useEffect(() => {
    const handleOpen = () => openMenu();
    const handleClose = () => closeMenu();
    window.addEventListener("open-service-menu", handleOpen);
    window.addEventListener("close-service-menu", handleClose);

    if (typeof window !== "undefined") {
      (window as unknown as { openServiceMenu?: () => void }).openServiceMenu = openMenu;
      (window as unknown as { closeServiceMenu?: () => void }).closeServiceMenu = closeMenu;

      // 초기 기본값으로 이사·입주청소(1번째) 열기
      const defaultEl = document.getElementById("mobile-service-cat-1") as HTMLDetailsElement | null;
      if (defaultEl) {
        defaultEl.open = true;
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setActiveCategory(null);
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-service-menu", handleOpen);
      window.removeEventListener("close-service-menu", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, [openMenu, closeMenu]);

  // PC: 마우스 진입 시 즉시 7열 전체 드롭다운 펼침
  const handleMouseEnterNav = (catSlug?: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (catSlug) {
      setActiveCategory(catSlug);
    }
    setDropdownOpen(true);
  };

  // PC: 마우스 이탈 시 부드럽게 닫힘
  const handleMouseLeaveNav = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setActiveCategory(null);
    }, 180);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* 1. 최상단 미니 안내 바 (PC 전용) */}
        <div className="hidden border-b border-gray-100 bg-gray-50/90 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-bold text-brand">
                <span className="inline-block h-2 w-2 rounded-full bg-brand animate-pulse" />
                전국 24시간 긴급 청소·시공 출동망 운영
              </span>
              <span className="text-gray-300">|</span>
              <span>서울 · 경기 · 인천 및 전국 전지역 방문 견적 가능</span>
            </div>
          </div>
        </div>

        {/* 2. 메인 헤더 바 */}
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-1.5 sm:py-3.5">
            {/* 로고 & [모바일: "진짜 청소" + 최고 크기 로고] & [PC: 로고 + 주요 메뉴] */}
            <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-10">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-2.5 shrink-0"
                onClick={() => {
                  setDropdownOpen(false);
                  setActiveCategory(null);
                  closeMenu();
                }}
              >
                {/* [모바일 전용] "진짜 청소" 텍스트 (사용자 지정: font-weight: bold, line-height: 40px, font-size: 38px) */}
                <span className="md:hidden inline-flex items-center font-brush font-bold text-[38px] leading-[40px] text-gray-900 whitespace-nowrap select-none -rotate-2 tracking-tight">
                  진짜 청소
                </span>

                {/* 우리회사 로고 (모바일 헤더 상단을 해치지 않는 최적의 최대 크기 및 완벽한 중앙 배치) */}
                <Logo className="h-[48px] sm:h-12 lg:h-14 w-auto object-contain transition-all" />
              </Link>

              {/* PC 전용 로고 옆 안내 메뉴 */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3.5 py-2 text-[15px] lg:text-[16px] font-bold text-gray-900 transition-all hover:bg-teal-50 hover:text-brand cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 우측 상담 및 버튼 영역 */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* PC 전용 전화번호 */}
              {siteConfig.phoneRaw && (
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hidden whitespace-nowrap text-right sm:block group"
                >
                  <span className="text-[11px] font-bold tracking-wider text-brand block uppercase">
                    24시 빠른 전화상담
                  </span>
                  <span className="text-base lg:text-lg font-black text-gray-900 group-hover:text-brand transition-colors">
                    {siteConfig.phone}
                  </span>
                </a>
              )}

              {/* PC 전용 무료견적 버튼 */}
              <Link
                href="/contact"
                className="hidden md:inline-flex whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-base font-bold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md cursor-pointer"
              >
                무료견적신청
              </Link>

              {/* [모바일 전용] 상단 우측 버튼 세트 (전체 메뉴 버튼) */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  onClick={openMenu}
                  className="flex min-h-[38px] items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-xs active:scale-95 cursor-pointer touch-manipulation hover:bg-brand-dark select-none"
                  aria-label="전체 메뉴 열기"
                >
                  <svg
                    className="h-4 w-4 shrink-0 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                  </svg>
                  <span className="whitespace-nowrap font-bold text-xs pointer-events-none">
                    전체 메뉴
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. [PC 전용] 7개 전문 청소 카테고리 상시 노출 & 마우스 호버 시 7열 자동 펼침 네비게이션 */}
        <div
          id="main-navigation-bar"
          className="relative hidden md:block border-b border-gray-200 bg-white group/gnb"
          onMouseEnter={() => handleMouseEnterNav()}
          onMouseLeave={handleMouseLeaveNav}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-6">
            <nav>
              <div
                className="grid w-full items-center"
                style={{ gridTemplateColumns: `repeat(${serviceCategories.length}, minmax(0, 1fr))` }}
              >
                {serviceCategories.map((cat) => {
                  const isHovered = activeCategory === cat.slug;
                  return (
                    <div
                      key={cat.slug}
                      className="group/item relative text-center"
                      onMouseEnter={() => handleMouseEnterNav(cat.slug)}
                    >
                      <Link
                        href={`/services#${cat.slug}`}
                        onClick={() => {
                          setDropdownOpen(false);
                          setActiveCategory(null);
                        }}
                        className={`block py-3.5 sm:py-4 px-1 sm:px-2 text-[15.5px] sm:text-[17px] font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                          isHovered ? "text-brand" : "text-gray-900 group-hover/item:text-brand"
                        }`}
                      >
                        {cat.title}
                      </Link>

                      {/* 마우스 호버 밑줄 */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-[3px] bg-brand rounded-t-sm transition-all duration-150 ${
                          isHovered
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-75 group-hover/item:opacity-100 group-hover/item:scale-x-100"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* [PC 전용] 7열 서브메뉴 패널 */}
          <div
            id="full-service-dropdown"
            className={`absolute inset-x-0 top-full bg-white shadow-2xl border-t border-gray-100 border-b border-gray-200 z-50 transition-all duration-200 ease-out origin-top overflow-hidden ${
              dropdownOpen
                ? "opacity-100 translate-y-0 pointer-events-auto visible max-h-[700px]"
                : "opacity-0 -translate-y-1 pointer-events-none invisible max-h-0 group-hover/gnb:opacity-100 group-hover/gnb:translate-y-0 group-hover/gnb:pointer-events-auto group-hover/gnb:visible group-hover/gnb:max-h-[700px]"
            }`}
            onMouseEnter={() => {
              if (leaveTimerRef.current) {
                clearTimeout(leaveTimerRef.current);
                leaveTimerRef.current = null;
              }
            }}
          >
            <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6 pb-10">
              <div
                className="grid w-full"
                style={{ gridTemplateColumns: `repeat(${serviceCategories.length}, minmax(0, 1fr))` }}
              >
                {serviceCategories.map((cat) => {
                  const isHovered = activeCategory === cat.slug;
                  return (
                    <div
                      key={cat.slug}
                      className="px-1.5 sm:px-2"
                      onMouseEnter={() => setActiveCategory(cat.slug)}
                    >
                      <ul className="flex flex-col gap-3 text-center">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={servicePath(item)}
                              onClick={() => {
                                setDropdownOpen(false);
                                setActiveCategory(null);
                              }}
                              className={`block text-[14px] sm:text-[15px] tracking-tight transition-all py-1 px-1 rounded cursor-pointer ${
                                isHovered
                                  ? "text-gray-900 font-semibold hover:text-brand hover:bg-teal-50/70"
                                  : "text-gray-700 font-normal hover:text-brand hover:font-bold hover:bg-teal-50/50"
                              }`}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. 브라우저 레벨에서 100% 무조건 열리게 하는 숨김 체크박스 트리거 */}
      <input
        type="checkbox"
        id="mobile-menu-toggle"
        className="peer hidden"
        checked={mobileMenuOpen}
        onChange={(e) => {
          if (e.target.checked) {
            openMenu();
          } else {
            closeMenu();
          }
        }}
      />

      {/* 5. 모바일 전용 미니멀 계층형 메뉴 드로어 (한스클린 레퍼런스 스타일) */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-[99999999] md:hidden ${mobileMenuOpen ? "flex" : "hidden"} flex-col bg-white overflow-hidden`}
        style={{ touchAction: "pan-y" }}
      >
        {/* 1) 상단 바: "제대로 합니다" (날리는 붓글씨 서체) + 찐청소 로고 + 세련된 '✕' 닫기 버튼 (상단에 맞춘 최고 크기 적용) */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2.5 border-b border-gray-200 shrink-0 bg-white">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer"
          >
            {/* 날리는 붓글씨 서체 "제대로 합니다" (상단 바 맞춤 최고 크기) */}
            <span className="font-brush font-bold text-[34px] sm:text-[38px] leading-[38px] sm:leading-[40px] text-gray-900 whitespace-nowrap select-none -rotate-2 tracking-tight">
              제대로 합니다
            </span>

            {/* 찐청소 로고 (상단 바 맞춤 최고 크기) */}
            <Logo className="h-[44px] sm:h-[48px] w-auto object-contain" />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors active:scale-90 cursor-pointer p-1"
            aria-label="메뉴 닫기"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 2) 본문: 오직 서비스 메뉴만 세로로 깔끔하게 나열되는 브라우저 네이티브 아코디언 트리 */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-gray-100">
          {serviceCategories.map((cat, idx) => {
            return (
              <details
                key={cat.slug}
                name="service-group"
                id={`mobile-service-cat-${idx}`}
                className="group py-0.5"
              >
                {/* 대분류 헤더 - 브라우저 네이티브 토글 (터치 시 0.00초 즉시 반응) */}
                <summary className="flex w-full items-center justify-between py-3.5 text-left cursor-pointer list-none select-none touch-manipulation">
                  <span className="text-[18px] font-bold tracking-tight text-gray-800 group-hover:text-gray-950 group-open:text-gray-950 transition-colors">
                    {cat.title}
                  </span>

                  {/* 큰 서비스 화살표: 기본 ◁, 마우스 커서 호버 시 ◀ 불 들어옴, 열렸을 시 ▼ (호버 시 중복 발생 완벽 방지) */}
                  <div className="shrink-0 pl-2 transition-all flex items-center justify-center">
                    {/* 1) 닫혀있을 때만 표시 (열리면 group-open:hidden으로 완전 숨김 처리되어 ◀ 중복 발생 원천 차단) */}
                    <div className="group-open:hidden flex items-center">
                      {/* 평소: ◁ (빈 왼쪽 큰 삼각형) */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="block group-hover:hidden text-gray-400 fill-none stroke-current stroke-[2.5]"
                      >
                        <path d="M19 4L5 12L19 20Z" strokeLinejoin="round" />
                      </svg>

                      {/* 호버 시: ◀ (꽉 찬 왼쪽 큰 삼각형 + 시안색 불빛) */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="hidden group-hover:block text-[#00a8cc] fill-current drop-shadow-[0_0_8px_rgba(0,168,204,0.7)]"
                      >
                        <path d="M19 4L5 12L19 20Z" />
                      </svg>
                    </div>

                    {/* 2) 열려있을 때만 표시: ▼ (아래를 가리키며 호버 시에도 오직 ▼만 유지) */}
                    <div className="hidden group-open:flex items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-[#00a8cc] fill-current drop-shadow-[0_0_8px_rgba(0,168,204,0.6)] group-hover:scale-110 transition-transform"
                      >
                        <path d="M4 6L12 19L20 6Z" />
                      </svg>
                    </div>
                  </div>
                </summary>

                {/* 세부 서비스 목록 (서비스 왼쪽에 작은 ▽, 마우스 호버 시 작은 ▼ 불 들어옴) */}
                <div className="relative pl-3.5 pb-3 pt-1 animate-in fade-in duration-100">
                  {/* 세로 연결 안내선 (작은 삼각형 중심 정렬) */}
                  <div className="absolute left-[21px] top-2 bottom-3.5 w-[1.5px] bg-cyan-100" />

                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        href={servicePath(item)}
                        onClick={closeMenu}
                        className="group/item relative flex items-center gap-2.5 py-1 text-[16px] font-medium text-gray-700 hover:text-[#00a8cc] active:opacity-75 transition-colors cursor-pointer"
                      >
                        {/* 작은 서비스 왼쪽 인디케이터: 평소 ▽, 호버 시 ▼ 불 들어옴 */}
                        <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center bg-white transition-all">
                          {/* 평소: ▽ (빈 역삼각형) */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            className="block group-hover/item:hidden text-gray-400 fill-none stroke-current stroke-[2.5]"
                          >
                            <path d="M4 6L12 18L20 6Z" strokeLinejoin="round" />
                          </svg>
                          {/* 마우스 커서 호버 시: ▼ (꽉 찬 역삼각형 + 불 들어옴) */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            className="hidden group-hover/item:block text-[#00a8cc] fill-current drop-shadow-[0_0_6px_rgba(0,168,204,0.7)] scale-110"
                          >
                            <path d="M4 6L12 18L20 6Z" />
                          </svg>
                        </span>

                        {/* 세부 서비스명 */}
                        <span className="tracking-tight transition-colors group-hover/item:text-[#00a8cc] group-hover/item:font-bold">
                          {item}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        {/* 3) 하단 고정 바: 가격안내, 24시 전화안내, 빠른 무료견적 신청하기 */}
        <div className="border-t border-gray-200 bg-gray-50/80 px-5 py-4 shrink-0 space-y-2.5">
          {/* 가격안내 & 자동상담 & 24시 전화안내 3열 */}
          <div className="grid grid-cols-3 gap-1.5">
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white py-2 px-1 text-xs font-bold text-gray-800 shadow-2xs hover:border-brand hover:text-brand transition-colors active:scale-98 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <span>가격안내</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                if (typeof window !== "undefined") {
                  (window as unknown as { openConsultationBot?: () => void }).openConsultationBot?.();
                }
              }}
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-teal-200 bg-teal-50/70 py-2 px-1 text-xs font-bold text-teal-800 shadow-2xs hover:bg-teal-100 transition-colors active:scale-98 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>자동상담</span>
            </button>

            {siteConfig.phoneRaw ? (
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white py-2 px-1 text-xs font-bold text-gray-800 shadow-2xs hover:border-brand hover:text-brand transition-colors active:scale-98"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>전화상담</span>
              </a>
            ) : (
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white py-2 px-1 text-xs font-bold text-gray-800 shadow-2xs hover:border-brand hover:text-brand transition-colors active:scale-98 cursor-pointer"
              >
                <span>상담안내</span>
              </Link>
            )}
          </div>

          {/* 빠른 무료견적 신청하기 */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[15px] font-bold text-white shadow-sm hover:bg-brand-dark transition-all active:scale-98 cursor-pointer"
          >
            <span>빠른 무료견적 신청하기</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
