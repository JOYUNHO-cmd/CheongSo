import Image from "next/image";

export default function TrustConcerns() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 max-sm:text-center">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <h2 className="text-[18.5px] leading-[21px] sm:text-2xl sm:leading-tight md:text-4xl font-black tracking-tight text-brand-dark whitespace-nowrap sm:whitespace-normal">
            궁금한 것들은 다! 찐하게 말씀드립니다
          </h2>
          {/* 모바일 전용 4줄 텍스트 */}
          <div className="mt-6 text-[14px] min-[360px]:text-[15px] leading-[1.65] text-gray-600 sm:hidden">
            <p className="whitespace-nowrap">어디까지 청소하는지, 짐은 옮겨야 하는지,</p>
            <p className="whitespace-nowrap">비용은 어떻게 측정이 되는지..</p>
            <p className="mt-2.5 whitespace-nowrap">찐 청소는 현장마다 필요한 작업은 구체적으로</p>
            <p className="whitespace-nowrap">별도 확인할 부분은 미리 말씀드립니다</p>
          </div>

          {/* PC / 태블릿 전용 텍스트 */}
          <div className="mt-6 hidden space-y-3.5 text-base sm:text-[17px] leading-relaxed text-gray-600 sm:block">
            <p>
              <span className="block">어디까지 청소하는지, 짐은 옮겨야 하는지, 비용은 어떻게 측정이 되는지..</span>
              <span className="block mt-1">찐 청소는 현장마다 필요한 작업은 구체적으로,</span>
            </p>
            <p>
              별도 확인할 부분은 미리 말씀드립니다.
            </p>
          </div>
        </div>
        <Image
          src="/images/process/professional-cleaning.webp"
          alt="청소 작업 안내 이미지"
          width={280}
          height={280}
          className="mx-auto rounded-2xl"
        />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["어디까지 해주나요?", "포함 구역과 별도 작업을 나눠 확인합니다"],
          ["견적은 왜 달라지나요?", "면적뿐 아니라 소재, 오염, 동선을 함께 봅니다"],
          ["끝나면 무엇을 확인하나요?", "협의한 작업과 이후 관리 방법을 확인합니다"],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-white px-4 py-5 sm:p-6">
            <h3 className="text-[16px] sm:text-base font-bold text-brand-dark">{title}</h3>
            <p className="mt-2 sm:mt-3 text-[14.5px] sm:text-base leading-relaxed text-gray-600 whitespace-nowrap sm:whitespace-normal tracking-tight">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
