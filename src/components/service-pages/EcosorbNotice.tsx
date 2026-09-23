import Image from "next/image";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";

export function EcosorbNotice() {
  return (
    <section id="safety" className="scroll-mt-36">
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-xl border border-gray-200">
              <Image src="/images/safety/safety-voc-report.webp" alt="ECOSORB 관련 VOC 시험자료" width={933} height={1245} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
              <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">VOC 시험자료 · PACE Inc.</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl border border-gray-200">
              <Image src="/images/safety/safety-toxicity-report.webp" alt="ECOSORB 관련 독성 시험자료" width={1905} height={1200} className="w-full object-contain" sizes="(min-width: 768px) 340px, 100vw" />
              <figcaption className="border-t border-gray-100 px-4 py-2.5 text-sm text-gray-500">독성 시험자료 · Tox Monitor/BSR, Inc.</figcaption>
            </figure>
          </div>
          <div className="mt-5 rounded-xl border border-brand/20 bg-brand-light/20 p-5">
            <h2 className="font-bold text-brand-dark">ECOSORB 제품 시험자료</h2>
            <ReadingParagraph className="mt-2">찐청소에서 냄새 제거와 공기질 관리에 사용하는 ECOSORB의 VOC 및 독성 관련 시험자료입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-2 text-[15px] text-gray-600">시험 결과는 자료에 기재된 제품과 조건에 해당하며, 현장 상태에 맞춰 사용합니다.</ReadingParagraph>
          </div>
          <BackToContents />
    </section>
  );
}
