"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  PhoneCall, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Coins
} from "lucide-react";
import { PRICING_GUIDE_DATA } from "@/lib/pricing-guide-data";
import { siteConfig } from "@/lib/site-config";

export default function PricingInteractiveView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const displayedData = activeCategory === "all" 
    ? PRICING_GUIDE_DATA 
    : PRICING_GUIDE_DATA.filter((cat) => cat.id === activeCategory);

  const toggleFaq = (faqId: string) => {
    setOpenFaq((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <div className="space-y-12">
      {/* 1. 안심 약속 3대 원칙 (신뢰성 강조 배너) */}
      <section className="rounded-3xl bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs sm:text-sm font-semibold text-brand-gold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>찐청소 가격 정직 선언</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              왜 찐청소 견적은 투명하고 신뢰할 수 있을까요?
            </h2>
            <p className="text-sm sm:text-base text-gray-200">
              무책임한 저가 미끼 견적 후 현장 강제 추가금? 찐청소에서는 절대 없습니다
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-black text-brand-dark transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <PhoneCall className="h-4 w-4" />
              <span>실시간 전화 견적</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 px-5 py-3 text-sm font-bold text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>맞춤 견적 정리</span>
            </Link>
          </div>
        </div>

        {/* 3대 핵심 보장 원칙 카드 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-white/10 pt-6">
          <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <span className="text-2xl">🤝</span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">동의 없는 추가금 0원</h3>
              <p className="mt-1 text-xs text-gray-300">현장 특이사항 발생 시 사전 설명 후 동의하셔야만 진행합니다</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <span className="text-2xl">🚗</span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">무료 현장 방문 견적</h3>
              <p className="mt-1 text-xs text-gray-300">사업장·특수·외벽 등 복합 현장은 100% 무료로 방문 진단합니다</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <span className="text-2xl">🔎</span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">고객 동행 당일 검수</h3>
              <p className="mt-1 text-xs text-gray-300">구석구석 꼼꼼하게 직접 눈으로 확인 후 만족하셔야 결제합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 카테고리 빠른 필터 탭 바 (모바일 가로 스크롤) */}
      <div className="sticky top-20 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/90 backdrop-blur-md border-y sm:border sm:rounded-2xl border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === "all"
                ? "bg-brand text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🌟 전체 보기 (7개 분야)
          </button>
          {PRICING_GUIDE_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeCategory === cat.id
                  ? "bg-brand text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 각 카테고리별 정밀 가격표 & 심층 Q&A 아코디언 */}
      <div className="space-y-14">
        {displayedData.map((cat) => (
          <article
            key={cat.id}
            id={cat.id}
            className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
          >
            {/* 카테고리 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-2xl shadow-inner">
                  {cat.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-brand-light px-2 py-0.5 text-xs font-black text-brand">
                      {cat.categoryNumber}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                      {cat.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-brand-dark mt-1">
                    {cat.title}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {cat.services.map((srv) => (
                  <span
                    key={srv}
                    className="rounded-lg bg-gray-50 border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600"
                  >
                    #{srv}
                  </span>
                ))}
              </div>
            </div>

            {/* 짧은 설명 */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              {cat.tagline}
            </p>

            {/* 비용 상세 안내 카드 리스트 */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="h-4 w-4 text-brand" />
                <h3 className="text-sm sm:text-base font-black text-gray-900">
                  {cat.title} 예상 비용 기준
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.pricingItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative flex flex-col justify-between rounded-2xl p-4 transition-all ${
                      item.highlight
                        ? "border-2 border-brand bg-brand-light/30 shadow-sm"
                        : "border border-gray-100 bg-gray-50/70 hover:bg-gray-50"
                    }`}
                  >
                    {item.highlight && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-brand px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                        인기 / 추천
                      </span>
                    )}
                    <div>
                      <div className="text-xs font-bold text-gray-500">항목</div>
                      <h4 className="text-base font-bold text-gray-900 mt-0.5">
                        {item.name}
                      </h4>
                    </div>
                    <div className="mt-4 border-t border-gray-200/60 pt-3">
                      <div className="text-xs font-medium text-gray-500">예상 비용</div>
                      <div className="text-base sm:text-lg font-black text-brand-dark mt-0.5">
                        {item.price}
                      </div>
                      {item.note && (
                        <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 신뢰 팁 배너 */}
            {cat.trustTip && (
              <div className="mt-6 rounded-xl bg-amber-50/80 border border-amber-200/70 p-3.5 text-xs sm:text-sm font-semibold text-amber-900 flex items-start gap-2">
                <span>{cat.trustTip}</span>
              </div>
            )}

            {/* 자주 묻는 질문 & 가격 책정 이유 (신뢰도 핵심) */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-brand" />
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  고객님들이 가장 많이 묻는 가격 궁금증
                </h3>
              </div>

              <div className="space-y-3">
                {cat.faqs.map((faq, fIdx) => {
                  const faqKey = `${cat.id}-${fIdx}`;
                  const isOpen = openFaq === faqKey;

                  return (
                    <div
                      key={fIdx}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faqKey)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left font-bold text-sm sm:text-base text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-black text-brand">
                            Q
                          </span>
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-brand" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="border-t border-gray-100 bg-gray-50/60 p-4 text-xs sm:text-sm leading-relaxed text-gray-700">
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-black text-emerald-700 mt-0.5">
                              A
                            </span>
                            <div className="space-y-1">
                              <p>{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 하단 바로 문의 바 */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gray-50 p-4">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                💬 {cat.title} 관련 더 궁금한 점이 있거나 실시간 견적이 필요하신가요?
              </span>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark transition-all shadow-sm"
              >
                <span>전화로 즉시 확인하기</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* 4. 하단 견적 준비 가이드 & 문의 콜투액션 */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>투명 견적 무료 상담</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            정확한 견적을 가장 빠르게 받는 3단계 꿀팁
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            아래 3가지만 준비해서 연락주시면 5분 내로 가장 합리적이고 군더더기 없는 견적을 받아보실 수 있습니다
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-4 text-left">
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <span className="text-xl">📸</span>
              <h3 className="font-bold text-sm text-gray-900 mt-2">1. 현장 사진 촬영</h3>
              <p className="text-xs text-gray-500 mt-1">공간 전체 및 창문, 오염이 심한 부위 사진 2~3장</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <span className="text-xl">📐</span>
              <h3 className="font-bold text-sm text-gray-900 mt-2">2. 대략적인 평수 및 일정</h3>
              <p className="text-xs text-gray-500 mt-1">실평수나 공급평형, 희망하시는 작업 날짜와 시간</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100">
              <span className="text-xl">📞</span>
              <h3 className="font-bold text-sm text-gray-900 mt-2">3. 전화 또는 카톡 전송</h3>
              <p className="text-xs text-gray-500 mt-1">010.9882.8882 또는 카카오톡으로 사진 전송</p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-black text-white hover:bg-brand-dark transition-transform hover:scale-105 shadow-lg shadow-brand/20"
            >
              <PhoneCall className="h-5 w-5" />
              <span>전화 상담 바로 연결 ({siteConfig.phone})</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-4 text-base font-bold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <span>온라인 견적 항목 정리하기</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
