import Link from "next/link";
import { Phone } from "lucide-react";
import { serviceCategories, itemAnchor } from "@/lib/services-data";
import { servicePath, serviceProfiles } from "@/lib/service-profiles";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

const totalServiceCount = serviceProfiles.length;

export const metadata = buildMetadata({
  title: `${totalServiceCount}개 전체 서비스 안내`,
  description: `간단청소부터 특수청소, 바닥시공까지 찐청소의 ${totalServiceCount}가지 전문 관리 서비스를 한눈에 확인하세요.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16">
      {/* 1. 상단 타이틀 */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
          찐청소 {totalServiceCount}가지 전문 서비스 안내
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          고객님의 공간과 상황에 딱 맞춘 7개 분야 {totalServiceCount}개 전문 청소·시공 솔루션입니다.
          원하시는 서비스를 선택하시면 상세 작업 범위와 예상 비용을 확인하실 수 있습니다
        </p>

        {/* 상단 빠른 상담 액션 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {siteConfig.phoneRaw && (
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 shadow-2xs hover:border-brand hover:text-brand"
            >
              <Phone className="h-[15px] w-[15px] text-brand" strokeWidth={2.2} aria-hidden="true" />
              <span>24시 전화문의 {siteConfig.phone}</span>
            </a>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark"
          >
            <span>무료 견적신청하기 →</span>
          </Link>
        </div>
      </div>

      {/* 2. [모바일 & PC 공통] 7개 분야 빠른 바로가기 퀵 네비게이션 칩 */}
      <div className="sticky top-[56px] sm:top-[72px] z-30 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-white/95 backdrop-blur-sm border-y border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max mx-auto justify-start sm:justify-center">
          {serviceCategories.map((cat, idx) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs sm:text-sm font-extrabold text-gray-700 hover:bg-brand hover:text-white transition-all active:scale-95"
            >
              <span className="text-[11px] opacity-60">{idx + 1}</span>
              <span>{cat.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. 7개 분야별 전체 서비스 카드 리스트 */}
      <div className="space-y-8 sm:space-y-12">
        {serviceCategories.map((cat, idx) => (
          <section
            key={cat.slug}
            id={cat.slug}
            className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 shadow-xs hover:border-teal-200 transition-colors"
          >
            {/* 카테고리 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-xs font-black text-white shadow-xs">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    {cat.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="self-start sm:self-auto text-xs sm:text-sm font-bold text-brand hover:underline"
              >
                {cat.title} 견적 문의 &gt;
              </Link>
            </div>

            {/* 세부 서비스 그리드 (모바일 2열, 태블릿 3열, PC 4열) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {cat.items.map((item, i) => (
                <Link
                  key={item}
                  id={itemAnchor(cat.slug, i)}
                  href={servicePath(item)}
                  className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-teal-50/40 hover:shadow-xs active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-brand group-hover:text-brand-dark">
                      #{cat.title}
                    </span>
                    <svg
                      className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brand"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 group-hover:text-brand-dark">
                      {item}
                    </h3>
                    <span className="text-[11px] text-gray-500 group-hover:text-brand font-medium">
                      상세 안내 및 견적 보기 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 하단 고정형 견적 안내 */}
      <div className="mt-12 rounded-2xl sm:rounded-3xl bg-teal-900 text-white p-6 sm:p-10 text-center">
        <h3 className="text-xl sm:text-3xl font-black mb-2">
          찾으시는 청소 서비스가 없으신가요?
        </h3>
        <p className="text-sm sm:text-base text-teal-100 max-w-xl mx-auto mb-6">
          복합 공간, 다용도 건물, 대형 사업장 등 맞춤형 특수 작업도 모두 가능합니다.
          24시간 언제든 전문가에게 직접 물어보세요!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {siteConfig.phoneRaw && (
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-teal-950 hover:bg-teal-50 transition-colors shadow-md"
            >
              <Phone className="h-4 w-4 text-teal-900 shrink-0" strokeWidth={2.4} aria-hidden="true" />
              <span>24시간 전화상담 {siteConfig.phone}</span>
            </a>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brand-dark transition-colors shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white shrink-0">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <span>온라인 무료견적 신청</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
