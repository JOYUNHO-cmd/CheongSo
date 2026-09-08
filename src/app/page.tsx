import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { label: "누적 이용 고객", value: "250,000+" },
  { label: "전문 청소팀", value: "80+" },
  { label: "전문 시공팀", value: "30+" },
  { label: "고객 만족도", value: "98%" },
];

const reviews = [
  { name: "김O영", service: "입주청소", text: "꼼꼼하게 구석구석 청소해 주셔서 만족스러웠어요." },
  { name: "이O진", service: "냄새악취제거", text: "집안 냄새 걱정이 사라졌어요. 확실히 다릅니다." },
  { name: "박O수", service: "나노코팅", text: "시공 후 바닥이 새 집처럼 밝아졌어요. 추천합니다." },
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
              간편 견적 신청
            </Link>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              전화 상담 {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 서비스 카테고리 */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="OUR SERVICE"
          title="상황에 맞는 서비스를 선택하세요"
          description="간편청소부터 특수청소, 예방시공까지 한 곳에서 해결합니다."
        />
        <ServiceCategoryGrid />
      </section>

      {/* 통계 */}
      <section className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-brand-light md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 고객 후기 */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="CUSTOMER REVIEW" title="이용 고객님의 실제 후기" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-brand">{review.service}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-gray-800">{review.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/reviews" className="text-sm font-bold text-brand hover:underline">
            후기 더 보기 →
          </Link>
        </div>
      </section>

      {/* 간편 견적 신청 */}
      <section className="bg-brand-light/30 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="ONLINE QUOTE"
            title="365일 24시간, 간편하게 견적을 접수하세요"
            description="간단한 정보 확인 후 상담원이 빠르게 연락드립니다."
          />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
