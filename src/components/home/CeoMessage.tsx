import Image from "next/image";

// 대표 인사말 요약 섹션 (PC/모바일 동일하게 표시)
export default function CeoMessage() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-sm px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/about/ceo-greeting.webp"
              alt="현장에서 직접 작업 중인 찐청소 대표 조윤호"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>

          <p className="mt-5 text-center text-xs font-bold tracking-widest text-brand">
            CEO MESSAGE
          </p>

          <div className="mt-3 space-y-3 text-center text-[14px] leading-relaxed text-gray-600 break-keep">
            <p className="text-base font-black text-brand-dark">
              안녕하세요, 찐청소 대표 조윤호입니다.
            </p>
            <p>
              청소를 오래 해오면서 느낀 게 하나 있습니다.
              <br />
              &quot;진짜 제대로 하는 곳&quot;은 생각보다 많지 않다는 것.
            </p>
            <p>
              말은 쉽고, 사진은 예쁘게 찍힙니다.
              <br />
              하지만 손님이 없을 때 구석까지 닦았는지는 아무도 모릅니다.
            </p>
            <p>
              저는 그 순간에 진짜이고 싶었습니다.
              <br />
              그래서 이름도, 찐청소입니다.
            </p>
            <p>보이지 않는 곳도, 보이는 곳처럼.</p>
          </div>

          <p className="mt-5 text-right font-signature text-2xl text-brand-dark">대표 조윤호</p>
        </div>
      </div>
    </section>
  );
}
