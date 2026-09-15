import ReviewShowcase from "@/components/home/ReviewShowcase";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "고객 후기",
  description: "가짜가 아닌 진짜 고객님들의 후기입니다. 찐청소를 직접 이용한 고객들의 실제 시공 사진과 후기를 확인해 보세요.",
  path: "/reviews",
});
export default function ReviewsPage() { return <div className="py-16"><div className="px-6"><SectionHeading as="h1" title="청소가 끝난 뒤, 남겨주신 이야기" description="등록된 후기 이미지를 확인해 보세요. 현장과 서비스에 따라 작업 범위는 달라집니다" /></div><ReviewShowcase /></div>; }
