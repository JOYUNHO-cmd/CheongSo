import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `회사소개 | ${siteConfig.name}`,
};

const proofPoints = [
  {
    title: "15년, 안 봐도 압니다",
    body: [
      "현장을 15년 봐온 눈으로,",
      "사진 한장 안 보내도 대략적인",
      "오염 상태를 짐작합니다.",
      "짐작이 틀릴 것 같은 경우엔",
      "무료방문견적을 진행합니다.",
      "대충 견적 내고 나중에",
      "말바꾸는 일은 없습니다.",
    ],
  },
  {
    title: "가격은 숨기지 않습니다",
    body: [
      "어떤 조건에서든 가격이 어떻게",
      "산정되는지 현장에 맞춰 설명합니다.",
      "그리고 변수가 생길시에 고객님께",
      "설명드리고, 동의 없이는 금액을",
      "추가하는 행위를 하지 않습니다.",
    ],
  },
  {
    title: `"찐"이라 부르는 이유`,
    body: [
      "겉만 훑는 청소와 구석까지 파고드는",
      "청소는 시간부터 다릅니다.",
      "저희는 후자를 선택했고, 그래서",
      "이름도 바로 찐청소입니다.",
    ],
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

      <section className="mx-auto max-w-5xl px-6 pt-12 sm:pt-16">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-3xl shadow-md">
          <Image
            src="/images/about/team-briefing.webp"
            alt="현장 투입 전, 팀원들과 작업 범위를 브리핑하는 찐청소"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
          />
        </div>
        <p className="mt-3 text-center text-xs sm:text-sm text-gray-500">
          매 현장마다, 꼼꼼한 브리핑부터 시작합니다
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="찐청소 소개" title="말 대신, 세 가지로 증명합니다" />
        <p className="mx-auto max-w-2xl text-center text-[15px] sm:text-base leading-relaxed text-gray-600 break-keep">
          세상에 &quot;꼼꼼하게 해드립니다&quot;라고 말 안 하는 청소업체는 없습니다.
          <br />
          문제는 그 말이 진짜인지, 확인할 방법이 없다는 거죠.
          <br />
          <br />
          저희는 그래서 말 대신 세 가지로 증명합니다.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {proofPoints.map((point, idx) => (
            <div
              key={point.title}
              className="rounded-2xl border border-gray-100 border-l-4 border-l-brand bg-white p-6 shadow-sm"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-brand/30 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-brand-dark break-keep">{point.title}</h3>
              </div>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-gray-600 break-keep md:hidden">
                {point.body.join(" ")}
              </p>
              <p className="mt-3 hidden text-sm leading-[1.7] text-gray-600 break-keep md:block">
                {point.body.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < point.body.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-light/60 px-6 py-10 text-center">
          <p className="text-lg sm:text-xl font-black text-brand-dark leading-relaxed">
            찐찐찐찐 찐이야~♪ 가짜는 가라, 제대로 하는 찐 청소!
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
            대충이 아닌 꼼꼼함으로, 말이 아닌 결과로 보여드립니다.
          </p>
          <p className="mt-4 text-base sm:text-lg font-bold text-gray-900">
            청소는 제대로. 신뢰는 확실하게. 찐청소입니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="대표 인사말" title="대표의 말" />
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-10 sm:px-12 sm:py-14 shadow-sm">
          <p className="text-center text-xl sm:text-2xl font-black text-brand-dark leading-snug break-keep">
            &quot;진짜였으면 좋겠다는 마음, 그거 하나로 시작했습니다.&quot;
          </p>

          <div className="mx-auto mt-8 max-w-xl space-y-5 text-[14.5px] sm:text-[15px] leading-relaxed text-gray-600 break-keep">
            <p>안녕하세요, 찐청소 대표 조윤호입니다.</p>
            <p>
              저는 이미 청소로 밥벌이를 오래 해온 사람입니다.
              <br />
              그런데도 두 번째로 이 일을 다시 시작한 이유는 하나입니다.
              <br />
              &quot;진짜 제대로 하는 곳&quot;이 생각보다 많지 않다는 걸, 현장에서 계속 느꼈기 때문입니다.
            </p>
            <p>
              번지르르한 말은 쉽습니다. 사진도 예쁘게 찍을 수 있습니다.
              <br />
              하지만 정작 손님이 없을 때, 구석까지 진짜로 닦았는지는 아무도 모릅니다.
              <br />
              저는 그 &quot;아무도 모르는 순간&quot;에 제대로 하는 사람이고 싶었습니다. 그래서 이름도 찐청소입니다.
            </p>
            <p>
              화려한 말보다, 끝나고 난 뒤의 공간이 모든 걸 말해준다고 믿습니다.
              <br />
              찐청소는 앞으로도 그 하나만 보고 가겠습니다.
              <br />
              보이지 않는 곳도 보이는 곳처럼, 대충이 아닌 진짜로.
            </p>
            <p>읽어주셔서 감사합니다.</p>
          </div>

          <div className="mx-auto mt-10 flex max-w-xl items-center justify-end gap-3 border-t border-gray-100 pt-6">
            <span className="text-sm font-bold text-gray-500">대표이사</span>
            <span className="font-signature text-[34px] sm:text-[40px] leading-none text-brand-dark">
              조윤호
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading title={`${siteConfig.name}가 지키는 약속`} />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark">{value.title}</h3>
              <p className="mt-2 text-[12.5px] sm:text-[13px] md:text-[12px] lg:text-[13.5px] leading-relaxed tracking-tight text-gray-500 break-keep">
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
