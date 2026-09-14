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
  Coins,
  SprayCan,
  House,
  Building2,
  ShieldAlert,
  Landmark,
  Layers,
  LayoutGrid,
  Handshake,
  Car,
  SearchCheck,
  Lightbulb,
  Camera,
  Ruler,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";
import { PRICING_GUIDE_DATA } from "@/lib/pricing-guide-data";
import { siteConfig } from "@/lib/site-config";

// 7대 분야별 Lucide 아이콘 매핑 (절제된 톤의 라인 아이콘으로 통일)
const categoryIconMap: Record<string, LucideIcon> = {
  easy: SprayCan,
  moving: House,
  commercial: Building2,
  hygiene: ShieldCheck,
  special: ShieldAlert,
  exterior: Landmark,
  floor: Layers,
};

function getCategoryIcon(id: string): LucideIcon {
  return categoryIconMap[id] || Sparkles;
}

export default function PricingInteractiveView() {
  const [activeCategory, setActiveCategory] = useState<string>(PRICING_GUIDE_DATA[0].id);
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
      <section className="rounded-3xl bg-gradient-to-br from-[#002a52] via-brand-dark to-[#004e8a] p-6 sm:p-9 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs sm:text-sm font-bold text-teal-200 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
              <span>찐청소 가격 정직 선언</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              왜 찐청소 견적은 투명하고 신뢰할 수 있을까요?
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
              무책임한 저가 미끼 견적 후 현장 강제 추가금? 찐청소에서는 절대 없습니다
            </p>
          </div>

          {/* 선명하고 또렷한 실시간 견적 액션 버튼 그룹 */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-[#009aa8] text-white px-5 py-3.5 text-sm sm:text-base font-black transition-all hover:scale-105 active:scale-95 shadow-md shadow-black/20 cursor-pointer"
              aria-label="실시간 전화 견적"
            >
              <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" strokeWidth={2.4} />
              <span>실시간 전화 견적</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 px-5 py-3.5 text-sm sm:text-base font-bold text-white transition-all backdrop-blur-sm shadow-md"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>맞춤 견적 정리</span>
            </Link>
          </div>
        </div>

        {/* 3대 핵심 보장 원칙 카드 (벡터 아이콘 스퀴클 배지 적용) */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-white/15 pt-6">
          <div className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 sm:p-5 backdrop-blur-sm border border-white/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400/20 text-teal-200 border border-teal-300/30 shadow-xs">
              <Handshake className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">동의 없는 추가금 0원</h3>
              <p className="mt-1 text-xs sm:text-[13px] text-teal-100/85 leading-relaxed">
                현장 특이사항 발생 시 사전 설명 후 동의하셔야만 진행합니다
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 sm:p-5 backdrop-blur-sm border border-white/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400/20 text-teal-200 border border-teal-300/30 shadow-xs">
              <Car className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">무료 현장 방문 견적</h3>
              <p className="mt-1 text-xs sm:text-[13px] text-teal-100/85 leading-relaxed">
                사업장·특수·외벽 등 복합 현장은 100% 무료로 방문 진단합니다
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 sm:p-5 backdrop-blur-sm border border-white/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400/20 text-teal-200 border border-teal-300/30 shadow-xs">
              <SearchCheck className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">고객 동행 당일 검수</h3>
              <p className="mt-1 text-xs sm:text-[13px] text-teal-100/85 leading-relaxed">
                구석구석 꼼꼼하게 직접 눈으로 확인 후 만족하셔야 결제합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 카테고리 빠른 필터 탭 바 — 카드마다 소속 서비스명을 함께 보여줘 한눈에 파악 가능 */}
      <div className="sticky top-20 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/95 backdrop-blur-md border-y sm:border sm:rounded-2xl border-gray-200 shadow-xs">
        <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 w-[104px] sm:w-28 flex flex-col items-center justify-center gap-1.5 rounded-xl px-2.5 py-3 text-center transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-brand text-white shadow-md ring-2 ring-brand/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200/60"
            }`}
          >
            <LayoutGrid size={18} strokeWidth={2.2} className="shrink-0" />
            <span className="text-xs font-extrabold">전체 보기</span>
            <span className={`text-[10px] font-medium ${activeCategory === "all" ? "text-white/80" : "text-gray-400"}`}>
              7개 분야
            </span>
          </button>
          {PRICING_GUIDE_DATA.map((cat) => {
            const CatIcon = getCategoryIcon(cat.id);
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 w-36 sm:w-40 flex flex-col items-start gap-1 rounded-xl px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand text-white shadow-md ring-2 ring-brand/30"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <CatIcon size={16} strokeWidth={2.2} className="shrink-0" />
                  <span className="text-xs sm:text-[13px] font-extrabold whitespace-nowrap">{cat.title}</span>
                </span>
                <span
                  className={`text-[10.5px] leading-snug line-clamp-2 break-keep ${
                    isSelected ? "text-white/85" : "text-gray-500"
                  }`}
                >
                  {cat.services.join(" · ")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 각 카테고리별 정밀 가격표 & 심층 Q&A 아코디언 */}
      <div className="space-y-14">
        {displayedData.map((cat) => {
          const CatIcon = getCategoryIcon(cat.id);

          return (
            <article
              key={cat.id}
              id={cat.id}
              className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-9 shadow-xs transition-all hover:border-teal-200 hover:shadow-md"
            >
              {/* 카테고리 헤더 (간결하게: 아이콘 + 뱃지 + 제목만) */}
              <div className="flex items-center gap-3.5 border-b border-gray-100 pb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-brand shadow-2xs">
                  <CatIcon size={24} strokeWidth={2.1} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-brand-dark px-2 py-0.5 text-xs font-black text-white">
                      {cat.categoryNumber}
                    </span>
                    <span className="rounded-full bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                      {cat.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
                    {cat.title}
                  </h2>
                </div>
              </div>

              {/* 서비스 요약 설명 (좌측 컬러 바 적용으로 시각적 앵커 부여) */}
              <div className="mt-5 rounded-xl bg-slate-50/90 border-l-4 border-brand p-3.5 sm:p-4 text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                {cat.tagline}
              </div>

              {/* 비용 안내 — 메뉴판처럼 항목·가격을 한 줄에 나란히 */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="h-4 w-4 text-brand shrink-0" strokeWidth={2.2} />
                  <h3 className="text-sm font-bold text-gray-500">예상 비용</h3>
                </div>

                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
                  {cat.pricingItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start justify-between gap-4 px-4 sm:px-5 py-4 ${
                        item.highlight ? "bg-teal-50/50" : "bg-white"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] sm:text-base font-bold text-gray-900">{item.name}</h4>
                          {item.highlight && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-black text-white">
                              <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                              추천
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="mt-1 text-xs sm:text-[13px] text-gray-500 leading-relaxed">{item.note}</p>
                        )}
                      </div>
                      <div className="shrink-0 whitespace-nowrap text-right text-base sm:text-lg font-black text-brand-dark tracking-tight">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 신뢰 팁 배너 (Lucide 전구 아이콘 적용) */}
              {cat.trustTip && (
                <div className="mt-6 rounded-2xl bg-amber-50/90 border border-amber-200/80 p-4 sm:p-5 flex items-start gap-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
                    <Lightbulb className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-amber-950 leading-relaxed pt-0.5">
                    {cat.trustTip}
                  </div>
                </div>
              )}

              {/* 자주 묻는 질문 & 가격 책정 이유 (가독성 높은 아코디언) */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-brand border border-teal-100 shrink-0">
                    <HelpCircle className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">자주 묻는 질문</h3>
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
                          className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-900 hover:bg-gray-50/80 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-xs font-black text-teal-800">
                              Q
                            </span>
                            <span className="leading-snug">{faq.q}</span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-brand" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="border-t border-teal-100 bg-teal-50/40 p-4 sm:p-5 text-sm sm:text-[15px] leading-relaxed text-gray-800">
                            <div className="flex items-start gap-3">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-black text-emerald-800 mt-0.5">
                                A
                              </span>
                              <div className="space-y-1">
                                <p className="leading-relaxed">{faq.a}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 하단 바로 문의 바 (Lucide 아이콘 적용) */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-brand border border-teal-100">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-semibold">
                    {cat.title} 관련 더 궁금한 점이 있거나 실시간 맞춤 견적이 필요하신가요?
                  </span>
                </div>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-dark transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>전화로 즉시 확인하기</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. 하단 견적 준비 가이드 & 문의 콜투액션 (벡터 아이콘 스퀴클 배지 적용) */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xs text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-900 border border-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-800" />
            <span>투명 견적 무료 상담</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            정확한 견적을 가장 빠르게 받는 3단계 꿀팁
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            아래 3가지만 준비해서 연락주시면 5분 내로 가장 합리적이고 군더더기 없는 견적을 받아보실 수 있습니다
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-4 text-left">
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-brand border border-teal-100 shadow-2xs">
                <Camera className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-950 mt-3">1. 현장 사진 촬영</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                공간 전체 및 창문, 오염이 심한 부위 사진 2~3장
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-brand border border-teal-100 shadow-2xs">
                <Ruler className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-950 mt-3">2. 대략적인 평수 및 일정</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                실평수나 공급평형, 희망하시는 작업 날짜와 시간
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-brand border border-teal-100 shadow-2xs">
                <PhoneCall className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-950 mt-3">3. 전화 또는 문자 전송</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                {siteConfig.phone} 또는 문자로 사진 전송 시 빠른 확인
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-3.5">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-black text-white hover:bg-brand-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand/20 cursor-pointer"
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

