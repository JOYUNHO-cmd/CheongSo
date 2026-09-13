import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `회사소개 | ${siteConfig.name}`,
};

const values = [
  {
    title: "범위부터 분명하게",
    line1: "어디를 청소하고 무엇을 따로 확인할지,",
    line2: "작업전에 목록으로 정리합니다",
  },
  {
    title: "소재부터 세심하게",
    line1: "같은 얼룩이라도 바닥과 벽의 재질은 다릅니다.",
    line2: "현장 상태에 맞는 방법을 살펴봅니다",
  },
  {
    title: "마무리까지 함께",
    line1: "협의한 범위의 결과를 확인하고, 이후",
    line2: "공간 이용과 관리에 필요한 내용을 안내합니다",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-dark to-brand px-6 py-20 text-center text-white">
        <h1 className="mx-auto max-w-2xl text-2xl font-black md:text-4xl leading-snug md:leading-tight">
          <span className="block">믿을 수 있는 위생관리 전문기업,</span>
          <span className="block mt-1 sm:mt-2">찐청소는 제대로 합니다</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[18px] text-gray-100">{siteConfig.description}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading title={`${siteConfig.name}가 지키는 약속`} />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark">{value.title}</h3>
              <p className="mt-2 text-[12.5px] sm:text-[13px] md:text-[12px] lg:text-[13.5px] leading-relaxed tracking-tight text-gray-500 keep-all">
                <span className="block">{value.line1}</span>
                <span className="block mt-0.5">{value.line2}</span>
              </p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
