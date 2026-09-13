import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import PricingInteractiveView from "@/components/pricing/PricingInteractiveView";

export const metadata: Metadata = {
  title: `가격안내 | ${siteConfig.name}`,
  description: "찐청소의 7대 전문 청소 분야별 투명한 가격 기준표와 산정 이유, 신뢰 보장 가이드를 확인하세요",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <SectionHeading
          as="h1"
          title="견적도 찐하게, 기준부터 분명하게"
          description="왜 서비스마다 가격 산정이 다른지 솔직하게 공개합니다. 거품 없는 정직한 단가와 신뢰할 수 있는 전문 서비스를 만나보세요"
        />
      </div>

      {/* 대화형 카테고리 탭, 상세 견적 카드 및 심층 Q&A 뷰 */}
      <PricingInteractiveView />
    </div>
  );
}
