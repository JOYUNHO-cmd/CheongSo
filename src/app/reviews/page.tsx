import type { Metadata } from "next";
import ReviewShowcase from "@/components/home/ReviewShowcase";
import SectionHeading from "@/components/SectionHeading";
export const metadata: Metadata = { title: "고객 후기 | 찐청소", description: "찐청소에 등록된 고객 후기 자료를 확인해 보세요." };
export default function ReviewsPage() { return <div className="py-16"><div className="px-6"><SectionHeading as="h1" eyebrow="CUSTOMER REVIEW" title="청소가 끝난 뒤, 남겨주신 이야기." description="등록된 후기 이미지를 확인해 보세요. 현장과 서비스에 따라 작업 범위는 달라집니다." /></div><ReviewShowcase /></div>; }
