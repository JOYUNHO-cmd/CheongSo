import Link from "next/link";

export default function PricingTransparency() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <h2 className="text-center text-[15.5px] min-[360px]:text-[16.5px] min-[390px]:text-[18px] sm:text-2xl md:text-3xl font-black tracking-tight text-brand-dark whitespace-nowrap sm:whitespace-normal">
        견적에도 이유가 있어야, 고객님 마음이 편합니다
      </h2>
      <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-center text-[13.5px] sm:text-base leading-relaxed text-gray-600">
        <span className="block whitespace-nowrap sm:whitespace-normal tracking-tight">같은 평수여도 짐의 양과 바닥 재질, 오염 상태는 다릅니다</span>
        <span className="block mt-1 sm:mt-1 whitespace-nowrap sm:whitespace-normal tracking-tight">필요한 작업을 먼저 정리하고 그에 맞는 비용을 협의합니다</span>
      </p>
      <dl className="mt-8 grid gap-4 md:grid-cols-2 max-sm:text-center">
        {[
          { title: "공간과 면적", text: "방과 욕실 수, 공용 공간, 실제 작업할 면적" },
          { title: "소재와 오염", text: "바닥 재질, 기존 코팅, 찌든 때와 잔여물" },
          { title: "짐과 동선", text: "가구 이동, 승강기, 주차와 장비 반입" },
          {
            title: "일정과 추가 항목",
            text: "작업 가능 시간, 건조 시간, 별도 세척·반출",
            mobileText: "작업가능시간, 건조시간, 별도 세척&반출",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-white px-4 py-5 sm:p-6">
            <dt className="font-bold text-brand-dark">{item.title}</dt>
            <dd className="mt-2 text-[13.5px] min-[360px]:text-[14.5px] sm:text-base leading-7 text-gray-600">
              {item.mobileText ? (
                <>
                  <span className="sm:hidden whitespace-nowrap tracking-tight">{item.mobileText}</span>
                  <span className="hidden sm:inline">{item.text}</span>
                </>
              ) : (
                item.text
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-center">
        <Link href="/pricing/" className="font-bold text-brand">
          서비스별 견적 기준 확인 →
        </Link>
      </p>
    </div>
  );
}
