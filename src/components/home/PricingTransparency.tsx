import { Banknote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function PricingTransparency() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark md:text-sm">
          <Banknote size={14} />
          인건비, 숨기지 않고 공개합니다
        </span>
        <h2 className="mb-3 text-xl font-black leading-tight text-gray-900 md:text-3xl">왜 견적이 이렇게 나올까요?</h2>
        <p className="text-sm leading-relaxed text-gray-500 md:text-base">
          가격을 숨기는 업체는 믿지 않으셔도 됩니다. 인건비 산정 기준부터 투명하게 말씀드리고, 정확한 인원은 현장을 직접 보고 결정합니다.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
        <h3 className="mb-4 flex items-center gap-2 text-base font-black text-gray-900 md:text-xl">
          <span className="h-5 w-1.5 rounded-full bg-brand md:h-6" />
          인건비, 왜 다른가요?
        </h3>
        <div className="grid grid-cols-3 overflow-hidden rounded-xl border-2 border-gray-200 text-sm">
          <div className="bg-gray-100" />
          <div className="border-l border-gray-200 bg-gray-100 py-3 text-center text-xs font-bold text-gray-600 md:text-sm">일반 인력사무소</div>
          <div className="border-l border-brand-dark bg-gradient-to-r from-brand-dark to-brand py-3 text-center text-xs font-black text-white md:text-sm">
            {siteConfig.name} 전문팀
          </div>

          <div className="flex items-center border-t-2 border-gray-200 px-3 py-3 text-xs font-semibold text-gray-500 md:text-sm">일당</div>
          <div className="flex items-center justify-center border-l border-t-2 border-gray-200 py-3 font-semibold text-gray-700">14~16만원</div>
          <div className="flex items-center justify-center border-l border-t-2 border-gray-200 bg-brand-light/40 py-3 font-black text-brand-dark">20만원</div>

          <div className="flex items-center border-t-2 border-gray-200 px-3 py-3 text-xs font-semibold text-gray-500 md:text-sm">투입 인력</div>
          <div className="flex items-center justify-center border-l border-t-2 border-gray-200 py-3 text-xs text-gray-700 md:text-sm">비전문 일용직</div>
          <div className="flex items-center justify-center border-l border-t-2 border-gray-200 bg-brand-light/40 py-3 text-xs font-bold text-brand-dark md:text-sm">
            15년 경력 전담팀
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-gray-400">
          일용직은 소개 수수료(약 10%) 제외 시 실수령 13~15만원 수준으로, 청소 방법을 제대로 숙지하지 못한 비전문 인력인 경우가 많습니다.
        </p>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <h3 className="mb-3 flex items-center gap-2 text-base font-black text-gray-900 md:text-xl">
            <span className="h-5 w-1.5 rounded-full bg-brand md:h-6" />
            투입 인원, 어떻게 정하나요?
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-gray-700">
            전화로 대충 정하지 않습니다. 대표가 직접 방문해 평수·오염도·난이도를 확인 후, 꼭 필요한 인원만 산정합니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold text-brand-dark">방문 견적 무료</span>
            <span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold text-brand-dark">계약 의무 없음</span>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <h3 className="mb-3 flex items-center gap-2 text-base font-black text-gray-900 md:text-xl">
            <span className="h-5 w-1.5 rounded-full bg-brand md:h-6" />
            추가 요금이 생기면 어떻게 하나요?
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            예상 못한 특수 오염이나 상황이 발견되면, 먼저 안내드리고 동의 받은 후에 진행합니다.{" "}
            <strong className="text-brand-dark">사전 협의 없는 추가 청구는 없습니다.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
