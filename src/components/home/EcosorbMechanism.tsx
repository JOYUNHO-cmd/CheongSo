function EcosorbDiagram() {
  return (
    <svg viewBox="0 0 200 170" className="h-auto w-full max-w-[180px]" aria-hidden="true">
      <text x="100" y="16" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1a1f24">
        ECOSORB
      </text>

      <circle cx="95" cy="80" r="34" fill="#3b6fe0" />
      <circle cx="82" cy="70" r="4.5" fill="#8fd14f" />
      <circle cx="102" cy="65" r="4" fill="#8fd14f" />
      <circle cx="108" cy="85" r="4.5" fill="#8fd14f" />
      <circle cx="88" cy="90" r="3.5" fill="#8fd14f" />
      <circle cx="97" cy="78" r="3.5" fill="#8fd14f" />

      {[
        [95, 34],
        [131, 50],
        [138, 80],
        [125, 108],
        [65, 108],
        [52, 80],
        [59, 50],
      ].map(([x, y], i) => (
        <text key={i} x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="800" fill="#1a1f24">
          +
        </text>
      ))}

      <circle cx="168" cy="46" r="8" fill="#3b6fe0" />
      <path d="M158 55 L112 72" stroke="#1a1f24" strokeWidth="1.2" markerEnd="url(#arrow)" />

      <circle cx="35" cy="140" r="8" fill="#3b6fe0" />
      <path d="M43 132 L75 105" stroke="#1a1f24" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x="24" y="160" fontSize="12" fontWeight="700" fill="#1a1f24">
        악취원
      </text>

      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1a1f24" />
        </marker>
      </defs>
    </svg>
  );
}

export default function EcosorbMechanism() {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-6 py-7 sm:px-9 sm:py-9">
      <p className="text-sm font-bold tracking-widest text-brand">사용 약품 — ECOSORB</p>

      <div className="mt-2 grid gap-6 sm:grid-cols-[1fr_180px] sm:items-start">
        <div>
          <h3 className="text-xl font-black text-gray-900 sm:text-2xl">악취제거 메커니즘</h3>
          <ul className="mt-4 space-y-2 text-[15px] leading-7 text-gray-800">
            <li className="flex gap-2">
              <span className="text-gray-400">▪</span>
              <span>
                물과 혼합되어 분사된 <span className="font-bold underline decoration-brand/60">ECOSORB</span>는{" "}
                <span className="underline decoration-gray-300">액적 외부</span>에 얇은{" "}
                <span className="underline decoration-gray-300">기름 막</span>을 형성합니다
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">▪</span>
              <span>
                형성된 <span className="underline decoration-gray-300">액적 외부 기름 막</span>은 표면에 양전하를 형성합니다
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">▪</span>
              <span>
                형성된 전하와 <span className="underline decoration-gray-300">취기성 물질</span> 및{" "}
                <span className="underline decoration-gray-300">유해물질</span>이 정전기적으로 결합합니다
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">▪</span>
              <span>
                이 결합은 액적이나 취기성 물질 및 유해물질의{" "}
                <span className="underline decoration-gray-300">분자크기와 무관하게</span> 진행됩니다
              </span>
            </li>
          </ul>
        </div>
        <div className="hidden justify-self-end sm:flex">
          <EcosorbDiagram />
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <EcosorbDiagram />
      </div>

      <div className="mt-8 border-t border-gray-100 pt-7">
        <h4 className="flex items-center gap-2 text-lg font-black text-blue-700 sm:text-xl">
          <span className="text-red-600">✓</span>이산화황(SO₂) 제거 메커니즘
        </h4>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="text-[15px] leading-7 text-gray-800">
            SO₂가 수용성중간체인 H₂SO₃, <span className="font-bold">ECOSORB</span>이 투입될 경우 제거가 용이한 형태인 HSO₃가 형성된다.
          </p>
          <div className="space-y-2 rounded-md bg-yellow-300 px-5 py-4 font-mono text-sm font-bold text-gray-900 sm:text-[15px]">
            <p className="flex items-center gap-3">
              <span>SO₂ + H₂O</span>
              <span className="text-red-600">➜</span>
              <span>H₂SO₃</span>
            </p>
            <p className="flex items-center gap-3">
              <span>H₂SO₃ + H⁺A⁻</span>
              <span className="text-red-600">➜</span>
              <span>H⁺ + HSO₃ + HA</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-7">
        <h4 className="flex items-center gap-2 text-lg font-black text-blue-700 sm:text-xl">
          <span className="text-red-600">✓</span>아민류 제거 메커니즘
        </h4>
        <p className="mt-3 text-[15px] leading-7 text-gray-800">
          쓰레기(생선, 야채)처리 시설에서 발생되는 2가지의 아민 화합물, 즉 TEA(triethyl amine)과 DMEA(Dimethyl Ethyl Amine)의 경우 다음 기전에 의해 대기 중 제거가 용이한{" "}
          <span className="underline decoration-gray-400">유기염</span>으로 전환된다.
        </p>

        <div className="mt-4 overflow-x-auto rounded-md bg-slate-200/70 px-5 py-4">
          <table className="w-full min-w-[440px] border-collapse text-left font-mono text-sm font-bold text-gray-900 sm:text-[15px]">
            <tbody>
              <tr>
                <td className="py-1.5 pr-4">DMEA</td>
                <td className="py-1.5 pr-4">+</td>
                <td className="py-1.5 pr-4">H⁺A⁻</td>
                <td className="py-1.5 pr-4">=</td>
                <td className="py-1.5">DMEAH⁺A⁻</td>
              </tr>
              <tr className="font-sans text-[13px] font-normal text-gray-700">
                <td className="pb-1.5 pr-4">아민</td>
                <td className="pb-1.5 pr-4">+</td>
                <td className="pb-1.5 pr-4">유기산</td>
                <td className="pb-1.5 pr-4">=</td>
                <td className="pb-1.5 underline">유기염</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4">(CH₃)₂(CH₃CH₂)N</td>
                <td className="py-1.5 pr-4">+</td>
                <td className="py-1.5 pr-4">H⁺A⁻</td>
                <td className="py-1.5 pr-4">=</td>
                <td className="py-1.5">(CH₃)₂(CH₃CH₂)N:H⁺A⁻</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-4">TEA</td>
                <td className="py-1.5 pr-4">+</td>
                <td className="py-1.5 pr-4">H⁺A⁻</td>
                <td className="py-1.5 pr-4">=</td>
                <td className="py-1.5">TEAH⁺A⁻</td>
              </tr>
              <tr className="font-sans text-[13px] font-normal text-gray-700">
                <td className="pb-1.5 pr-4">아민</td>
                <td className="pb-1.5 pr-4">+</td>
                <td className="pb-1.5 pr-4">유기산</td>
                <td className="pb-1.5 pr-4">=</td>
                <td className="pb-1.5 underline">유기염</td>
              </tr>
              <tr>
                <td className="pt-1.5 pr-4">(CH₃CH₂)₃N</td>
                <td className="pt-1.5 pr-4">+</td>
                <td className="pt-1.5 pr-4">H⁺A⁻</td>
                <td className="pt-1.5 pr-4">=</td>
                <td className="pt-1.5">(CH₃CH₂)₃N:H⁺A⁻</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[15px] font-bold text-gray-900">
          이 메커니즘에 의해 생성된 유기염들은 대기 중 제거가 용이하며 독성이 없는 물질입니다.
        </p>
      </div>
    </div>
  );
}
