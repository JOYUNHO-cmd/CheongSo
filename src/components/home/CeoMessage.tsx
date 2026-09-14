import Image from "next/image";

// 대표 인사말 요약 섹션 (모바일: 세로 카드 / PC: 좌우 배치로 넓게 노출)
export default function CeoMessage() {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="mx-auto max-w-sm px-6 md:max-w-5xl">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid md:grid-cols-[300px_1fr] md:items-center md:gap-12 md:p-12">
          <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-md md:max-w-none">
            <Image
              src="/images/about/ceo-greeting.webp"
              alt="현장에서 직접 작업 중인 찐청소 대표 조윤호"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 300px, 100vw"
            />
          </div>

          <div>
            <p className="mt-5 text-center text-xs font-bold tracking-widest text-brand md:mt-0 md:text-left md:text-sm">
              CEO MESSAGE
            </p>

            <div className="mt-3 space-y-3 text-center text-[14px] leading-relaxed text-gray-600 break-keep md:mt-5 md:space-y-4 md:text-left md:text-[17px]">
              <p className="text-base font-black text-brand-dark md:text-2xl">
                안녕하세요, 찐청소 대표 조윤호입니다.
              </p>
              <p>
                청소를 오래 해오면서 느낀 게 하나 있습니다.
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                <strong className="font-black text-brand-dark">&quot;제대로 하는 곳&quot;</strong>은
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                생각보다 많지 않다는 것.
              </p>
              <p>
                말은 쉽고, 사진은 예쁘게 찍힙니다.
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                하지만 손님이 없을 때
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                구석까지 닦았는지는
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                아무도 모릅니다.
              </p>
              <p>
                저는 그 순간에 진짜이고 싶었습니다.
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                그래서 이름도, <strong className="font-black text-brand-dark">찐청소</strong>입니다.
              </p>
              <p className="font-bold text-gray-800">보이지 않는 곳도, 보이는 곳처럼.</p>
            </div>

            <p className="mt-5 text-right font-signature text-2xl text-brand-dark md:mt-6 md:text-3xl">
              대표 조윤호
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
