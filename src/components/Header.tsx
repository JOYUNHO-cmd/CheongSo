"use client";

import Link from "next/link";
import { useState } from "react";
import { serviceCategories, itemAnchor } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/Logo";

const utilityLinks = [
  { label: "가격안내", href: "/pricing" },
  { label: "고객후기", href: "/reviews" },
  { label: "회사소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm relative">
      {/* 상단 유틸리티 바 */}
      <div className="hidden border-b border-gray-100 bg-gray-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-base text-gray-500">
          <nav className="flex gap-4">
            {utilityLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <span>{siteConfig.hours.weekday}</span>
            <span className="mx-1">·</span>
            <span>{siteConfig.hours.weekend}</span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Logo className="h-16 w-auto lg:h-20 2xl:h-24" />
        </Link>

        <div
          className="relative ml-6 hidden flex-1 lg:block"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <nav
            className="grid"
            style={{ gridTemplateColumns: `repeat(${serviceCategories.length}, minmax(0, 1fr))` }}
          >
            {serviceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services#${cat.slug}`}
                className="border-b-2 border-transparent px-1 py-6 text-center text-base font-medium whitespace-nowrap text-gray-700 transition-colors hover:border-brand hover:text-brand"
              >
                {cat.title}
              </Link>
            ))}
          </nav>

          {megaOpen && (
            <div className="absolute inset-x-0 top-full border-t border-gray-100 bg-white shadow-lg">
              <div
                className="grid py-6"
                style={{ gridTemplateColumns: `repeat(${serviceCategories.length}, minmax(0, 1fr))` }}
              >
                {serviceCategories.map((cat) => (
                  <ul key={cat.slug} className="flex flex-col items-center gap-2 px-2 text-center">
                    {cat.items.map((item, i) => (
                      <li key={item}>
                        <Link
                          href={`/services#${itemAnchor(cat.slug, i)}`}
                          className="block text-base text-gray-600 hover:text-brand"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="hidden text-xl font-bold text-brand-dark md:block 2xl:text-2xl"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-dark 2xl:px-8 2xl:py-4 2xl:text-lg"
          >
            간편 견적 신청
          </Link>
          <button
            type="button"
            aria-label="메뉴 열기"
            className="text-gray-700 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {serviceCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/services#${cat.slug}`}
                  className="text-lg font-medium text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.number}. {cat.title}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-gray-100 pt-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base text-gray-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
