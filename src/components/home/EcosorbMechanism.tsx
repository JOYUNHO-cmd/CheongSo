export default function EcosorbMechanism() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-brand-light/40 px-6 py-5 sm:px-8">
        <p className="text-sm font-bold tracking-widest text-brand">사용 약품</p>
        <h3 className="mt-1 text-xl font-black text-brand-dark sm:text-2xl">
          ECOSORB, 어떻게 냄새와 유해물질을 제거할까요?
        </h3>
        <p className="mt-2 text-[15px] text-gray-600">
          찐청소가 사용하는 약품은 ECOSORB입니다. 위 공인 시험 자료는 이 약품의 무독성·무자극 검증 결과이며, 아래는 실제 제거가 이뤄지는 원리입니다.
        </p>
      </div>

      <div className="space-y-8 px-6 py-7 sm:px-8">
        <div>
          <h4 className="font-black text-gray-900">악취·유해물질 제거 원리</h4>
          <ul className="mt-3 space-y-2 text-[15px] leading-6 text-gray-700">
            <li className="flex gap-2"><span className="text-brand">•</span><span>물과 혼합되어 분사된 ECOSORB는 액적 외부에 얇은 기름막을 형성합니다.</span></li>
            <li className="flex gap-2"><span className="text-brand">•</span><span>형성된 기름막은 액적 표면에 양전하를 만듭니다.</span></li>
            <li className="flex gap-2"><span className="text-brand">•</span><span>이 전하가 취기성 물질·유해물질과 정전기적으로 결합합니다.</span></li>
            <li className="flex gap-2"><span className="text-brand">•</span><span>이 결합은 분자크기와 무관하게 일어나, 다양한 냄새·유해물질에 동일하게 작동합니다.</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-gray-900">이산화황(SO₂) 제거 원리</h4>
          <p className="mt-3 text-[15px] leading-6 text-gray-700">
            SO₂가 수용성 중간체인 H₂SO₃로 전환된 상태에서 ECOSORB가 투입되면, 제거가 쉬운 형태인 HSO₃로 바뀝니다.
          </p>
          <div className="mt-3 space-y-1 rounded-xl bg-amber-50 px-5 py-4 font-mono text-sm text-gray-800 sm:text-[15px]">
            <p>SO₂ + H₂O → H₂SO₃</p>
            <p>H₂SO₃ + H⁺A⁻ → H⁺ + HSO₃ + HA</p>
          </div>
        </div>

        <div>
          <h4 className="font-black text-gray-900">아민류 제거 원리</h4>
          <p className="mt-3 text-[15px] leading-6 text-gray-700">
            쓰레기(생선·야채) 처리 시설 등에서 발생하는 TEA(triethyl amine), DMEA(Dimethyl Ethyl Amine) 같은 아민 화합물은 아래 반응을 거쳐 대기 중 제거가 쉬운 유기염으로 바뀝니다.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[420px] border-collapse text-left font-mono text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-bold text-gray-800">DMEA</td>
                  <td className="px-2 py-2.5 text-gray-400">+</td>
                  <td className="px-2 py-2.5">H⁺A⁻</td>
                  <td className="px-2 py-2.5 text-gray-400">=</td>
                  <td className="px-4 py-2.5">DMEAH⁺A⁻</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50 font-sans text-gray-500">
                  <td className="px-4 py-2 text-xs">아민</td>
                  <td className="px-2 py-2 text-xs">+</td>
                  <td className="px-2 py-2 text-xs">유기산</td>
                  <td className="px-2 py-2 text-xs">=</td>
                  <td className="px-4 py-2 text-xs underline">유기염</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-bold text-gray-800">TEA</td>
                  <td className="px-2 py-2.5 text-gray-400">+</td>
                  <td className="px-2 py-2.5">H⁺A⁻</td>
                  <td className="px-2 py-2.5 text-gray-400">=</td>
                  <td className="px-4 py-2.5">TEAH⁺A⁻</td>
                </tr>
                <tr className="bg-gray-50 font-sans text-gray-500">
                  <td className="px-4 py-2 text-xs">아민</td>
                  <td className="px-2 py-2 text-xs">+</td>
                  <td className="px-2 py-2 text-xs">유기산</td>
                  <td className="px-2 py-2 text-xs">=</td>
                  <td className="px-4 py-2 text-xs underline">유기염</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[15px] font-bold text-gray-800">
            이 반응으로 만들어진 유기염은 대기 중 제거가 쉽고 독성이 없는 물질입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
