import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "회사소개",
  description: "15년 현장 경력의 찐청소 대표가 직접 전하는 회사 소개. 투명한 견적과 꼼꼼한 작업으로 신뢰를 지키는 이유를 확인하세요.",
  path: "/about",
  keywords: ["찐청소 대표", "찐청소 소개", "청소업체 신뢰", "투명 견적 청소업체", "조윤호"],
});

// "|" 구분자를 모바일 화면 전용 줄바꿈으로 변환 (PC/태블릿은 자연스럽게 한 줄로 흐름)
function withMobileBreaks(text: string) {
  return text.split("|").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && (
        <>
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
        </>
      )}
    </span>
  ));
}

// "|"는 모바일 화면 전용 줄바꿈 구분자 (PC/태블릿은 자연스럽게 한 줄로 흐름)
// 배열의 각 항목은 하나의 문단으로, 문단 사이에는 여백을 둠
const proofPoints = [
  {
    title: "15년, 안 봐도 압니다",
    body: [
      "현장을 15년 봐온 눈으로, 사진만으로|대략적인 오염 상태를 짐작합니다.",
      "짐작이 틀릴 것 같은 경우엔|무료방문견적을 진행합니다.",
      "견적 내고 나중에 말바꾸는 일은 없습니다.",
    ],
  },
  {
    title: "가격은 숨기지 않습니다",
    body: [
      "어떤 조건에서든 가격이 어떻게 산정되는지|현장에 맞춰 설명합니다.",
      "그리고 변수가 생길시 고객님께 설명드리고,|동의 없이 금액을 추가하는 행위는 없습니다.",
    ],
  },
  {
    title: `"찐"이라 부르는 이유`,
    body: [
      "겉만 훑는 청소와 달리 구석까지|파고드는 청소는 시간부터 다릅니다.",
      "저희는 후자를 선택했고,|그래서 이름도 바로 찐청소입니다.",
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
        <p className="mx-auto mt-4 max-w-xl text-[18px] text-gray-100">
          {withMobileBreaks("입주청소, 특수청소, 바닥시공까지 !!|책임지고 제대로 관리합니다")}
        </p>
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
        <div className="mx-auto max-w-2xl space-y-3 text-center text-[15px] sm:text-base leading-relaxed text-gray-600 break-keep">
          <p>{withMobileBreaks('세상에 "꼼꼼하게 해드립니다"라고|말 안 하는 청소업체는 없습니다.')}</p>
          <p>{withMobileBreaks("문제는 그 말이 진짜인지,|확인할 방법이 없다는 거죠.")}</p>
          <p>저희는 그래서 말 대신 세 가지로 증명합니다.</p>
        </div>

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
                <h3 className="text-lg sm:text-xl md:whitespace-nowrap md:text-[15px] lg:text-lg xl:text-xl font-bold text-brand-dark break-keep">
                  {point.title}
                </h3>
              </div>
              <div className="mt-3 space-y-2 text-[14.5px] sm:text-sm leading-[1.7] text-gray-600 break-keep">
                {point.body.map((para, i) => (
                  <p key={i}>{withMobileBreaks(para)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[280px_1fr] md:items-start md:gap-10 lg:grid-cols-[320px_1fr]">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl shadow-md md:max-w-none">
            <Image
              src="/images/about/ceo-greeting.webp"
              alt="현장에서 직접 작업 중인 찐청소 대표 조윤호"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 320px, 280px"
            />
          </div>

          <div>
            <p className="text-center text-[clamp(10px,3.4vw,20px)] max-sm:whitespace-nowrap sm:text-2xl font-black text-brand-dark leading-snug break-keep md:text-left">
              안녕하세요, 찐청소
              {" "}
              대표 조윤호입니다
            </p>

            <div className="mx-auto mt-8 max-w-xl space-y-5 text-[14.5px] sm:text-[15px] leading-relaxed text-gray-600 break-keep max-sm:text-center md:mx-0 md:max-w-none">
              <p>
                저는 이미 청소로 밥벌이를
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                오래 해온 사람입니다.
              </p>
              <p>
                그런데도 두 번째로 이 일을
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                다시 시작한 이유는 하나입니다.
              </p>
              <p>
                <strong className="font-black text-brand-dark">&quot;진짜 제대로 하는 곳&quot;</strong>이
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                생각보다 많지 않다는 걸,
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                현장에서 계속 느꼈기 때문입니다.
              </p>
              <p>
                번지르르한 말은 쉽습니다.
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                사진도 예쁘게 찍을 수 있습니다.
              </p>
              <p>
                하지만 정작 손님이 없을 때,
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                구석까지 진짜로 닦았는지는
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                아무도 모릅니다.
              </p>
              <p>
                저는 그{" "}
                <strong className="font-black text-brand-dark">&quot;아무도 모르는 순간&quot;</strong>에
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                제대로 하는 사람이고 싶었습니다.
              </p>
              <p>
                그래서 이름도 <strong className="font-black text-brand-dark">찐청소</strong>입니다.
              </p>
              <p>
                화려한 말보다, 끝나고 난
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                뒤의 공간이 모든 걸
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                말해준다고 믿습니다.
              </p>
              <p>
                <strong className="font-black text-brand-dark">찐청소</strong>는 앞으로도
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                그 하나만 보고 가겠습니다.
              </p>
              <p>
                보이지 않는 곳도 보이는 곳처럼,
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                대충이 아닌 진짜로.
              </p>
              <p>읽어주셔서 감사합니다.</p>
            </div>

            <div className="mx-auto mt-10 flex max-w-xl items-center justify-end gap-3 border-t border-gray-100 pt-6 md:mx-0 md:max-w-none">
              <span className="text-sm font-bold text-gray-500">대표이사</span>
              <span className="font-signature text-[34px] sm:text-[40px] leading-none text-brand-dark">
                조윤호
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading title={`${siteConfig.name}가 지키는 약속`} />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-gray-100 bg-white p-5 lg:p-6 shadow-sm max-sm:text-center">
              <h3 className="text-lg font-bold text-brand-dark">{value.title}</h3>
              <p className="mt-2 text-[clamp(10px,3.15vw,14px)] max-sm:whitespace-nowrap sm:text-[13px] md:text-[12px] lg:text-[13.5px] leading-relaxed tracking-tight text-gray-500 break-keep">
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
