import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `회사소개 | ${siteConfig.name}`,
};

const values = [
  { title: "표준화된 청소", text: "전국 어디서나 동일한 기준으로 관리되는 서비스를 제공합니다." },
  { title: "전문 인력", text: "각 분야에 특화된 교육을 받은 현장팀이 직접 방문합니다." },
  { title: "합리적인 가격", text: "불필요한 비용 없이 투명한 견적으로 안내해 드립니다." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-20 text-center text-white">
        <p className="text-sm font-bold tracking-widest text-brand-light">ABOUT US</p>
        <h1 className="mx-auto mt-3 max-w-xl text-2xl font-black md:text-4xl">
          {siteConfig.tagline}, {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-100">{siteConfig.description}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="CORE VALUE" title={`${siteConfig.name}가 지키는 약속`} />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-sm leading-relaxed text-gray-600">
        <h2 className="mb-3 text-lg font-bold text-gray-900">회사 정보</h2>
        <dl className="grid grid-cols-[100px_1fr] gap-y-2">
          <dt className="text-gray-400">대표</dt>
          <dd>{siteConfig.ceo}</dd>
          <dt className="text-gray-400">사업자등록번호</dt>
          <dd>{siteConfig.businessNumber}</dd>
          <dt className="text-gray-400">주소</dt>
          <dd>{siteConfig.address}</dd>
          <dt className="text-gray-400">고객센터</dt>
          <dd>
            {siteConfig.phone} ({siteConfig.hours.weekday}, {siteConfig.hours.weekend})
          </dd>
          <dt className="text-gray-400">이메일</dt>
          <dd>{siteConfig.email}</dd>
        </dl>
      </section>
    </div>
  );
}
