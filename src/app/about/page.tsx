import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `회사소개 | ${siteConfig.name}`,
};

const proofPoints = [
  {
    title: "15년, 안 봐도 압니다",
    body: "현장을 15년 봐온 눈으로, 사진 한 장 안 보내도 대략적인 오염 상태를 짐작합니다. 짐작이 틀릴 것 같은 경우엔 방문 확인을 먼저 권해드립니다 — 대충 견적 내고 나중에 말 바꾸는 일은 없습니다.",
  },
  {
    title: "가격은 숨기지 않습니다",
    body: "평당 얼마, 어떤 조건에서 얼마가 올라가는지 미리 다 알려드립니다. 현장에서 사정이 다르면 그 자리에서 다시 설명드리고, 동의 없이는 금액을 올리지 않습니다.",
  },
  {
    title: `"찐"이라 부르는 이유`,
    body: "겉만 훑는 청소와 구석까지 파고드는 청소는 시간부터 다릅니다. 저희는 후자를 택했고, 그래서 이름도 찐청소입니다.",
  },
];

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

      <section className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="찐청소 소개" title="말 대신, 세 가지로 증명합니다" />
        <p className="mx-auto max-w-2xl text-center text-[15px] sm:text-base leading-relaxed text-gray-600 keep-all">
          세상에 &quot;꼼꼼하게 해드립니다&quot;라고 말 안 하는 청소업체는 없습니다.
          <br />
          문제는 그 말이 진짜인지, 확인할 방법이 없다는 거죠.
          <br />
          <br />
          저희는 그래서 말 대신 세 가지로 증명합니다.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {proofPoints.map((point, idx) => (
            <div key={point.title} className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-6 shadow-sm">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-xs font-black text-brand">
                {idx + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold text-brand-dark">{point.title}</h3>
              <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-gray-500 keep-all">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-light/60 px-6 py-10 text-center">
          <p className="text-lg sm:text-xl font-black text-brand-dark leading-relaxed">
            찐찐찐찐 찐이야~♪ 가짜는 가라, 제대로 하는 찐 청소!
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed keep-all">
            대충이 아닌 꼼꼼함으로, 말이 아닌 결과로 보여드립니다.
          </p>
          <p className="mt-4 text-base sm:text-lg font-bold text-gray-900">
            청소는 제대로. 신뢰는 확실하게. 찐청소입니다.
          </p>
        </div>
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
