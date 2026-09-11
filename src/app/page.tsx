import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import QuoteForm from "@/components/QuoteForm";
import HeroVideo from "@/components/HeroVideo";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import ReviewShowcase from "@/components/home/ReviewShowcase";
import TrustConcerns from "@/components/home/TrustConcerns";
import ProcessSteps from "@/components/home/ProcessSteps";
import TrustFeatures from "@/components/home/TrustFeatures";
import Certifications from "@/components/home/Certifications";
import PricingTransparency from "@/components/home/PricingTransparency";
import FaqAccordion from "@/components/home/FaqAccordion";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { label: "필요에 맞는 서비스", value: "33가지" },
  { label: "작업 전 범위 확인", value: "꼼꼼히" },
  { label: "마무리까지 함께", value: "차근차근" },
];

export default function Home() {
  return (
    <>
      {/* 히어로: 모바일 뷰포트 72% 이상 및 PC 92%를 시원하게 채우는 웅장한 비디오 쇼케이스 */}
      <section className="relative flex min-h-[72svh] sm:min-h-[82vh] md:min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-20 text-center text-white">
        {/* 풀스크린 배경 영상 (모바일 화면의 70% 이상을 시원하게 채우며 현장 작업 실황 재생) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <HeroVideo mode="background" className="object-[center_35%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-2 w-full">
          {/* H1 메인 헤드라인 (모바일 기준 21px, PC는 이전의 웅장한 56px 스케일로 완벽 복원) */}
          <h1 className="mx-auto max-w-4xl text-[21px] font-black leading-[1.25] tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl lg:text-[56px]">
            {siteConfig.heroHeadline.map((line) => (
              <span
                key={line}
                className="block mt-1 sm:mt-2 text-[21px] sm:text-4xl md:text-5xl lg:text-[56px]"
              >
                {line}
              </span>
            ))}
          </h1>

          {/* 서브 문구 (모바일 text-sm, PC 이전 크기인 lg:text-[26px] 복원) */}
          <p className="mx-auto mt-4 sm:mt-7 max-w-3xl text-sm sm:text-xl md:text-2xl lg:text-[26px] font-normal leading-relaxed text-gray-100 [text-shadow:0_2px_14px_rgba(0,0,0,0.8)]">
            {siteConfig.heroSubcopy.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          {/* 클로징 강조 문구 (모바일 text-base, PC 이전 크기인 lg:text-[32px] 복원) */}
          <p className="mx-auto mt-3 sm:mt-5 text-base sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-normal text-teal-300 [text-shadow:0_2px_14px_rgba(0,0,0,0.8)]">
            {siteConfig.heroClosing}
          </p>

          {/* 중앙 강조 대형 무료견적신청 버튼 */}
          <div className="mt-6 sm:mt-12 flex items-center justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-2xl font-extrabold text-white shadow-[0_10px_35px_rgba(13,148,136,0.6)] transition-all duration-200 hover:scale-105 hover:bg-brand-dark hover:shadow-[0_15px_45px_rgba(13,148,136,0.8)] active:scale-95 cursor-pointer"
            >
              <span>무료견적신청</span>
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section className="bg-gray-900 px-6 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/10 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-black text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-gray-400 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 시공 전/후 포트폴리오 */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <SectionHeading
            eyebrow="BEFORE & AFTER"
            title="직접 찐으로 뛴 현장 보여드립니다"
            description="실제 시공 현장의 전/후 비교 사진입니다. 사진을 누르면 크게 볼 수 있어요."
          />
        </div>
        <PortfolioShowcase />
      </section>

      {/* 고객 후기 */}
      <section className="bg-gradient-to-b from-white via-amber-50/30 to-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <SectionHeading
            eyebrow="CUSTOMER REVIEW"
            title="직접 이용해보신 고객님들의 후기"
            description="저희가 아닌, 실제로 청소를 맡기신 고객님들의 이야기입니다."
          />
        </div>
        <ReviewShowcase />
      </section>

      {/* 청소업체 불안 포인트 + 대표 인사말 */}
      <section className="bg-gradient-to-b from-white via-brand-light/20 to-brand-light/30 py-16 md:py-24">
        <TrustConcerns />
      </section>

      {/* 5단계 진행 과정 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mb-12 text-center">
          <SectionHeading
            eyebrow="OUR PROCESS"
            title="고객님을 위한 5단계 진행 과정"
            description={`처음부터 끝까지 투명하고 철저하게 진행되는 ${siteConfig.name}만의 안심 청소 서비스 시스템입니다.`}
          />
        </div>
        <ProcessSteps />
      </section>

      {/* 4대 안심 보장 */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mb-10 text-center">
          <SectionHeading eyebrow="WHY US" title="맡기기 전부터 마무리까지, 네 가지 기준" />
        </div>
        <TrustFeatures />
      </section>

      {/* 자격증 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <SectionHeading
              eyebrow="CERTIFIED"
              title="청소를 공부하고, 현장에 적용합니다"
              description="등록된 자격증 자료를 확인하실 수 있습니다. 이미지를 누르면 크게 볼 수 있어요."
            />
          </div>
          <Certifications />
        </div>
      </section>

      {/* 투명 견적 안내 */}
      <section className="bg-gray-50 py-16 md:py-24">
        <PricingTransparency />
      </section>

      {/* 서비스 카테고리 */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="OUR SERVICE"
          title="상황에 맞는 서비스를 선택하세요"
          description="간단청소부터 특수청소, 예방시공까지 한 곳에서 해결합니다."
        />
        <ServiceCategoryGrid />

        {/* 모바일 전용 33개 세부 서비스 한눈에 보기 바로가기 */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/services"
            className="flex items-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-extrabold text-white shadow-md active:scale-95 hover:bg-brand-dark cursor-pointer touch-manipulation select-none"
          >
            <span>📋 33개 전체 서비스 세부목록 보기</span>
            <svg className="h-4 w-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mb-10 text-center">
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
        </div>
        <FaqAccordion />
      </section>

      {/* 상담 준비하기 */}
      <section className="bg-brand-light/30 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="ONLINE QUOTE"
            title="상담 전에 정리하면, 청소가 한결 쉬워집니다"
            description={`공간과 필요한 서비스를 정리한 뒤 ${siteConfig.phone}로 전화해 주세요.`}
          />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
