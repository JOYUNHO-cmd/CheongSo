"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { Phone, Tag, MessageCircle } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { servicePath } from "@/lib/service-profiles";
import { siteConfig } from "@/lib/site-config";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import Logo from "@/components/Logo";
import KakaoIcon from "@/components/icons/KakaoIcon";
import styles from "./Header.module.css";

// 상단 주요 안내 메뉴
const mainNavLinks = [
  { label: "찐현장사진들", href: "/gallery" },
  { label: "지역별 안내", href: "/areas" },
  { label: "가격안내", href: "/pricing" },
  { label: "회사소개", href: "/about" },
  { label: "견적문의", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  // 모바일 메뉴 드로어 열림 상태
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string>("");

  // PC & 태블릿 메가 드롭다운 상태
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mobileCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 모바일 메뉴에서 대분류를 펼쳤을 때, 하단 고정 바에 가려지지 않도록 자동으로 스크롤
  useEffect(() => {
    if (!openMobileCategory) return;
    const el = mobileCategoryRefs.current[openMobileCategory];
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
    return () => clearTimeout(timer);
  }, [openMobileCategory]);

  // 모바일 메뉴 열기/닫기 (오버레이의 표시 여부는 오직 mobileMenuOpen 상태 하나로만 결정)
  const openMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // mobileMenuOpen 전환 시점에만 정확히 한 번씩 body 스크롤 잠금/해제
  useEffect(() => {
    if (mobileMenuOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => {
      if (mobileMenuOpen) unlockBodyScroll();
    };
  }, [mobileMenuOpen]);

  // 전역 편의 함수 등록 (어느 버튼에서나 window.openServiceMenu() 호출 가능)
  useEffect(() => {
    const handleOpen = () => openMenu();
    const handleClose = () => closeMenu();
    window.addEventListener("open-service-menu", handleOpen);
    window.addEventListener("close-service-menu", handleClose);

    if (typeof window !== "undefined") {
      (window as unknown as { openServiceMenu?: () => void }).openServiceMenu = openMenu;
      (window as unknown as { closeServiceMenu?: () => void }).closeServiceMenu = closeMenu;
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
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, [openMenu, closeMenu]);

  // 네비게이션 드롭다운 열려있을 때만 외부 클릭 감지
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const navBar = document.getElementById("main-navigation-bar");
      if (navBar && !navBar.contains(event.target as Node)) {
        setDropdownOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // PC & 태블릿: 마우스(만) 진입 시 즉시 7열 전체 드롭다운 펼침
  // 터치 기기는 탭 직전에 합성 pointerenter를 먼저 쏘는 "고스트 호버"가 있어,
  // 실제 마우스(pointerType === "mouse")가 아니면 무시해야 첫 탭에서 바로
  // 네비게이션되지 않고 의도한 대로 서브메뉴가 먼저 펼쳐진다.
  const handlePointerEnterNav = (e: React.PointerEvent, catSlug?: string) => {
    if (e.pointerType !== "mouse") return;
    handleMouseEnterNav(catSlug);
  };

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

  // PC & 태블릿: 마우스 이탈 시 부드럽게 닫힘
  const handleMouseLeaveNav = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setActiveCategory(null);
    }, 280);
  };

  // PC & 태블릿: 카테고리 클릭/터치 시 메뉴창 토글 (페이지 이동 없이 드롭다운만 여닫음)
  const handleCategoryClick = (catSlug: string) => {
    if (!dropdownOpen || activeCategory !== catSlug) {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setDropdownOpen(true);
      setActiveCategory(catSlug);
    } else {
      setDropdownOpen(false);
      setActiveCategory(null);
    }
  };

  // 같은 페이지(홈) 안의 #섹션으로 이동하는 메뉴는 상단이 아닌 화면 중앙에 오도록 직접 스크롤 처리
  const handleAnchorNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.includes("#")) return;
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (pathname !== targetPath) return;
    e.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", `${targetPath}#${hash}`);
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
              <span>전지역 어디든 방문 견적 가능</span>
            </div>
          </div>
        </div>

        {/* 2. 메인 헤더 바 */}
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-1.5 sm:py-3.5">
            {/* 로고 & [모바일: "진짜 청소" + 최고 크기 로고] & [PC/태블릿: 로고 + 주요 메뉴] */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-6 xl:gap-10">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-2.5 shrink-0"
                onClick={() => {
                  setDropdownOpen(false);
                  setActiveCategory(null);
                  closeMenu();
                  if (pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (window.location.hash) window.history.replaceState(null, "", "/");
                  }
                }}
              >
                {/* [모바일 전용] "진짜 청소" 텍스트 (사용자 지정: font-weight: bold, line-height: 40px, font-size: 38px) */}
                <span className="md:hidden inline-flex items-center font-brush font-bold text-[38px] leading-[40px] text-gray-900 whitespace-nowrap select-none -rotate-2 tracking-tight">
                  진짜 청소
                </span>

                {/* 우리회사 로고 (모바일, 태블릿, PC 밸런스 조정: 태블릿은 md:h-8 로 컴팩트하게) */}
                <Logo className="h-[48px] sm:h-12 md:h-8 lg:h-11 xl:h-14 w-auto object-contain transition-all" />
              </Link>

              {/* PC/태블릿 로고 옆 안내 메뉴 (태블릿은 md:text-[11.5px] md:px-1.5 로 벨런스 있게) */}
              <nav aria-label="주요 안내" className="hidden md:flex items-center md:gap-0.5 lg:gap-1.5 xl:gap-2">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorNavClick(e, link.href)}
                    className={`rounded-lg px-2 py-1.5 md:px-1.5 md:py-1 md:text-[13.5px] lg:text-[16.5px] xl:px-3.5 xl:py-2 xl:text-[19px] font-bold transition-all cursor-pointer whitespace-nowrap ${link.href === "/contact" ? "bg-brand text-white hover:bg-brand-dark" : "text-gray-900 hover:bg-teal-50 hover:text-brand"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 우측 상담 및 버튼 영역 (태블릿은 md:gap-1.5) */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-1.5 xl:gap-3">
              {/* PC/태블릿 24시 전화상담 버튼 (태블릿 화면 맞춤 축소) */}
              {siteConfig.phoneRaw && (
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="group hidden whitespace-nowrap rounded-full bg-brand px-2.5 py-1 md:px-2 md:py-1 md:gap-1 lg:px-3.5 lg:py-1.5 lg:gap-2 xl:px-4.5 xl:py-2 xl:gap-2.5 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-brand-dark hover:shadow-md active:scale-95 cursor-pointer sm:inline-flex items-center select-none"
                  aria-label={`24시 빠른 전화상담 ${siteConfig.phone}`}
                >
                  <span className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12">
                    <Phone className="h-3.5 w-3.5 md:h-3.5 md:w-3.5 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  <div className="text-left leading-none">
                    <span className="block text-[8px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-teal-100 uppercase tracking-wider mb-0.5">
                      24시 빠른 전화상담
                    </span>
                    <span className="block text-[11px] md:text-[11px] lg:text-sm xl:text-base font-black tracking-wide text-white">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>
              )}

              {/* PC/태블릿 카카오톡 실시간 상담 바로가기 버튼 (태블릿 화면 맞춤 축소) */}
              <a
                href={siteConfig.kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden whitespace-nowrap rounded-full bg-[#FEE500] px-2.5 py-1 md:px-2 md:py-1 md:gap-1 lg:px-3.5 lg:py-1.5 lg:gap-2 xl:px-4.5 xl:py-2 xl:gap-2 text-[#191919] shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#fed900] hover:shadow-md active:scale-95 cursor-pointer sm:inline-flex items-center select-none"
                aria-label="카카오톡 1:1 실시간 상담 바로가기 (새 창 열림)"
              >
                <span className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12">
                  <KakaoIcon className="h-3.5 w-3.5 md:h-3.5 md:w-3.5 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-[#381E1F]" />
                </span>
                <div className="text-left leading-none">
                  <span className="block text-[8px] md:text-[8px] lg:text-[10px] xl:text-[11px] font-bold text-[#6a5300] uppercase tracking-wider mb-0.5">
                    실시간 1:1 상담
                  </span>
                  <span className="block text-[11px] md:text-[11px] lg:text-sm xl:text-base font-black tracking-wide text-[#191919]">
                    카카오톡 문의
                  </span>
                </div>
              </a>

              {/* [모바일 전용] 상단 우측 버튼 세트 (전체 메뉴 버튼) */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  id="mobile-all-menu-btn"
                  onClick={openMenu}
                  className="flex min-h-[38px] items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-xs active:scale-95 cursor-pointer touch-manipulation hover:bg-brand-dark select-none relative z-50"
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

        {/* 3. [PC & 태블릿 전용] 7개 전문 청소 카테고리 상시 노출 & 마우스 호버 시 7열 자동 펼침 네비게이션 */}
        <div
          id="main-navigation-bar"
          className="relative hidden md:block border-b border-gray-200 bg-white group/gnb"
          onPointerEnter={(e) => handlePointerEnterNav(e)}
          onMouseLeave={handleMouseLeaveNav}
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-4 xl:px-6">
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
                      onPointerEnter={(e) => handlePointerEnterNav(e, cat.slug)}
                    >
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`block w-full py-2 md:py-2 lg:py-3.5 xl:py-4 px-0.5 md:px-1 xl:px-2 text-[12.5px] md:text-[12px] lg:text-[14px] xl:text-[17px] font-extrabold whitespace-nowrap tracking-tight transition-colors cursor-pointer ${
                          isHovered ? "text-brand" : "text-gray-900 group-hover/item:text-brand"
                        }`}
                      >
                        {cat.title}
                      </button>

                      {/* 마우스 호버 밑줄 */}
                      <span
                        className={`absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 xl:left-3 xl:right-3 h-[2.5px] xl:h-[3px] bg-brand rounded-t-sm transition-all duration-150 ${
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

          {/* [PC & 태블릿 전용] 서브메뉴 패널 */}
          <div
            id="full-service-dropdown"
            className={`absolute inset-x-0 top-full bg-white shadow-2xl border-t border-gray-100 border-b border-gray-200 z-50 transition-all duration-200 ease-out origin-top overflow-hidden ${
              dropdownOpen
                ? "is-open opacity-100 translate-y-0 pointer-events-auto visible max-h-[850px]"
                : "opacity-0 -translate-y-1 pointer-events-none invisible max-h-0"
            }`}
            onMouseEnter={() => {
              if (leaveTimerRef.current) {
                clearTimeout(leaveTimerRef.current);
                leaveTimerRef.current = null;
              }
            }}
            onMouseLeave={handleMouseLeaveNav}
          >
            {/* [태블릿 전용: 큰서비스 마우스 호버 시 나오는 작은서비스들이 한 줄로 표시 - 768px ~ 1023px] */}
            <div className="hidden md:block lg:hidden bg-slate-50/90 border-b border-gray-200 py-2.5 px-3">
              {(() => {
                const currentCat = serviceCategories.find((c) => c.slug === activeCategory) || serviceCategories[0];
                return (
                  <div className="mx-auto max-w-7xl flex items-center justify-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                    <span className="shrink-0 text-[11px] font-extrabold text-brand bg-teal-50 border border-brand/40 px-2.5 py-1 rounded-full mr-1 shadow-2xs">
                      {currentCat.title}
                    </span>
                    {currentCat.items.map((item) => (
                      <Link
                        key={item}
                        href={servicePath(item)}
                        onClick={() => {
                          setDropdownOpen(false);
                          setActiveCategory(null);
                        }}
                        className="inline-flex items-center text-[11.5px] font-semibold text-gray-700 hover:text-brand hover:bg-white px-2 py-1 rounded-md transition-all shrink-0 border border-transparent hover:border-gray-200 hover:shadow-2xs cursor-pointer"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* [PC 전용: 7열 전체 펼침 그리드 - 1024px 이상] */}
            <div className="hidden lg:block mx-auto max-w-7xl px-1.5 md:px-2 lg:px-4 xl:px-6 pt-3 md:pt-4 lg:pt-5 xl:pt-6 pb-6 md:pb-6 lg:pb-8 xl:pb-10">
              <div
                className="grid w-full items-start"
                style={{ gridTemplateColumns: `repeat(${serviceCategories.length}, minmax(0, 1fr))` }}
              >
                {serviceCategories.map((cat) => {
                  const isHovered = activeCategory === cat.slug;
                  return (
                    <div
                      key={cat.slug}
                      className="px-0.5 md:px-0.5 lg:px-1 xl:px-2"
                      onMouseEnter={() => handleMouseEnterNav(cat.slug)}
                      onMouseLeave={handleMouseLeaveNav}
                    >
                      <ul className="flex flex-col gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 text-center">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={servicePath(item)}
                              onClick={() => {
                                setDropdownOpen(false);
                                setActiveCategory(null);
                              }}
                              className={`block text-[11px] md:text-[11.5px] md:tracking-tighter lg:text-[13px] lg:tracking-tight xl:text-[15px] xl:tracking-tight whitespace-nowrap transition-all py-0.5 md:py-1 px-0.5 md:px-0.5 lg:px-1 rounded cursor-pointer ${
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

      {/* 5. 모바일 및 태블릿 전용 미니멀 계층형 메뉴 드로어 */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-[99999999] ${mobileMenuOpen ? "flex is-open" : "hidden"} flex-col bg-white overflow-hidden`}
        style={{
          touchAction: "pan-y",
          display: mobileMenuOpen ? "flex" : "none",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        {/* 1) 상단 바: "제대로 합니다" (날리는 붓글씨 서체) + 찐청소 로고 + 세련된 '✕' 닫기 버튼 (상단에 맞춘 최고 크기 적용) */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2.5 border-b border-gray-200 shrink-0 bg-white">
          <Link
            href="/"
            onClick={() => {
              closeMenu();
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                if (window.location.hash) window.history.replaceState(null, "", "/");
              }
            }}
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

        {/* 2) 주요 안내와 서비스 메뉴 */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-gray-100">
          <nav aria-label="모바일 주요 안내" className="-mx-3 grid grid-cols-3 gap-1 py-4 sm:mx-0 sm:gap-2">
            {mainNavLinks.filter(link => link.href !== "/pricing" && link.href !== "/contact").map(link => <Link key={link.href} href={link.href} onClick={closeMenu} className="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-lg bg-teal-50 px-0.5 py-2 text-[12px] font-bold whitespace-nowrap text-brand-dark hover:bg-teal-100 sm:text-[15px]">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand"><path d="m2 9 3 5 3-5m8-3-5 6 5 6m7-12-5 6 5 6" /></svg>
              {link.label}
            </Link>)}
          </nav>
          {serviceCategories.map((cat, idx) => {
            const isOpen = openMobileCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                id={`mobile-service-cat-${idx}`}
                ref={(el) => {
                  mobileCategoryRefs.current[cat.slug] = el;
                }}
                className="group py-0.5"
              >
                {/* 대분류 헤더 - 터치/클릭 시 100% 즉시 토글 */}
                <button
                  type="button"
                  onClick={() => setOpenMobileCategory(isOpen ? "" : cat.slug)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-3.5 text-left cursor-pointer list-none select-none touch-manipulation"
                >
                  <span className={`text-[18px] font-bold tracking-tight transition-colors ${isOpen ? "text-gray-950 font-extrabold" : "text-gray-800 hover:text-gray-950"}`}>
                    {cat.title}
                  </span>

                  {/* 큰 서비스 화살표: 닫혀있을 시 ◁, 열렸을 시 ▼ */}
                  <div className="relative shrink-0 pl-2 flex items-center justify-center">
                      <span data-category-arrows aria-hidden="true" className={styles.categoryArrows} style={{ visibility: isOpen ? "hidden" : "visible" }}>
                        {[0, 1, 2].map(index => <svg key={index} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 4L5 12L19 20Z" strokeLinejoin="round" /></svg>)}
                      </span>
                    {isOpen && (
                      <div className="absolute right-0 flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="text-[#00a8cc] fill-current drop-shadow-[0_0_8px_rgba(0,168,204,0.6)]"
                        >
                          <path d="M4 6L12 19L20 6Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {/* 세부 서비스 목록 (서비스 왼쪽에 작은 ▽, 호버 시 작은 ▼) */}
                {isOpen && (
                  <div className="relative pl-3.5 pb-3 pt-1 animate-in fade-in duration-100">
                    {/* 세로 연결 안내선 */}
                    <div className="absolute left-[21px] top-2 bottom-3.5 w-[1.5px] bg-cyan-100" />

                    <div className="space-y-2">
                      {cat.items.map((item) => (
                        <Link
                          key={item}
                          href={servicePath(item)}
                          onClick={closeMenu}
                          className="group/item relative flex items-center gap-2.5 py-1 text-[16px] font-medium text-gray-700 hover:text-[#00a8cc] active:opacity-75 transition-colors cursor-pointer"
                        >
                          {/* 작은 서비스 왼쪽 인디케이터: 평소 ▽, 호버 시 ▼ */}
                          <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center bg-white transition-all">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              className="block group-hover/item:hidden text-gray-400 fill-none stroke-current stroke-[2.5]"
                            >
                              <path d="M4 6L12 18L20 6Z" strokeLinejoin="round" />
                            </svg>
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
                )}
              </div>
            );
          })}
        </div>

        {/* 3) 하단 고정 바: 가격안내, 24시 전화안내, 빠른 무료견적 신청하기 */}
        <div className="border-t border-gray-200 bg-gray-50/80 px-5 py-4 shrink-0 space-y-2.5">
          {/* 가격안내 & 자동상담 & 카톡상담 & 24시 전화안내 4열 */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-sky-100 bg-sky-50 py-2.5 px-1 text-[11px] sm:text-xs font-bold text-sky-700 shadow-2xs transition-all hover:bg-sky-100 active:scale-95 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
                <Tag className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden="true" />
              </span>
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
              className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-teal-100 bg-teal-50 py-2.5 px-1 text-[11px] sm:text-xs font-bold text-teal-800 shadow-2xs transition-all hover:bg-teal-100 active:scale-95 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span>자동상담</span>
            </button>

            <a
              href={siteConfig.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-amber-200 bg-[#FEE500]/25 py-2.5 px-1 text-[11px] sm:text-xs font-bold text-[#381E1F] shadow-2xs transition-all hover:bg-[#FEE500]/40 active:scale-95"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE500] text-[#381E1F] shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
                <KakaoIcon className="h-4.5 w-4.5" />
              </span>
              <span>카톡상담</span>
            </a>

            {siteConfig.phoneRaw ? (
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-emerald-100 bg-emerald-50 py-2.5 px-1 text-[11px] sm:text-xs font-bold text-emerald-700 shadow-2xs transition-all hover:bg-emerald-100 active:scale-95"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                  <Phone className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span>전화상담</span>
              </a>
            ) : (
              <Link
                href="/contact"
                onClick={closeMenu}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-emerald-100 bg-emerald-50 py-2.5 px-1 text-xs font-bold text-emerald-700 shadow-2xs transition-all hover:bg-emerald-100 active:scale-95 cursor-pointer"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                  <Phone className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden="true" />
                </span>
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
