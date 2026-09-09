import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `회사소개 | ${siteConfig.name}`,
};

const values = [
  { title: "범위부터 분명하게", text: "어디를 청소하고 무엇을 따로 확인할지, 작업 전에 목록으로 정리합니다." },
  { title: "소재부터 세심하게", text: "같은 얼룩이라도 바닥과 벽의 재질은 다릅니다. 현장 상태에 맞는 방법을 살펴봅니다." },
  { title: "마무리까지 함께", text: "협의한 범위의 결과를 확인하고, 이후 공간 이용과 관리에 필요한 내용을 안내합니다." },
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


    </div>
  );
}
