import QuoteForm from "@/components/QuoteForm";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "상담 준비",
  description: "청소가 필요한 공간과 서비스를 정리해 보세요. 견적 상담에 필요한 항목을 안내합니다.",
  path: "/contact",
  keywords: ["청소 견적 문의", "청소 상담", "이메일 견적", "청소 비용 문의", "찐청소 문의"],
});
export default function ContactPage() { return <div className="mx-auto max-w-2xl px-6 py-16"><SectionHeading as="h1" title="청소 고민, 하나씩 정리해 볼까요?" description="필요한 서비스와 현장 상태를 먼저 정리해 두세요" /><QuoteForm /></div>; }
