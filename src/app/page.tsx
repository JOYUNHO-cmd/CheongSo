import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import QuoteForm from "@/components/QuoteForm";
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
      {/* 히어로 */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-white md:min-h-[92vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative">
          <p className="text-sm font-bold tracking-widest text-brand-light [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
            {siteConfig.nameEn}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-xl font-black leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] sm:text-2xl md:text-4xl">
            {siteConfig.heroHeadline.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-100 [text-shadow:0_2px_10px_rgba(0,0,0,0.6)] md:text-base">
            {siteConfig.heroSubcopy.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <p className="mx-auto mt-4 text-base font-bold tracking-wide text-brand-light [text-shadow:0_2px_10px_rgba(0,0,0,0.6)] md:text-lg">
            {siteConfig.heroClosing}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition-transform hover:scale-105"
            >
              상담 준비하기
            </Link>
            {siteConfig.phoneRaw && (<a
              href={`tel:${siteConfig.phoneRaw}`}
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              전화 상담 {siteConfig.phone}
            </a>)}
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
            description="공간과 필요한 서비스를 정리한 뒤 010-9882-8882로 전화해 주세요."
          />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
