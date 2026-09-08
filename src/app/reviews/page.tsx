import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `고객후기 | ${siteConfig.name}`,
};

const reviews = [
  { name: "김O영", service: "입주청소", text: "꼼꼼하게 구석구석 청소해 주셔서 만족스러웠어요.", date: "2026-09-02" },
  { name: "이O진", service: "냄새악취제거", text: "집안 냄새 걱정이 사라졌어요. 확실히 다릅니다.", date: "2026-08-27" },
  { name: "박O수", service: "나노코팅", text: "시공 후 바닥이 새 집처럼 밝아졌어요. 추천합니다.", date: "2026-08-21" },
  { name: "정O희", service: "이사청소", text: "예약부터 시공까지 응대가 친절하고 빨랐습니다.", date: "2026-08-15" },
  { name: "최O우", service: "쓰레기집청소", text: "부담스러운 상황이었는데 전문적으로 잘 처리해 주셨어요.", date: "2026-08-09" },
  { name: "한O민", service: "새집증후군 시공", text: "냄새와 유해물질 걱정이 많이 줄었습니다.", date: "2026-08-03" },
];

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading eyebrow="CUSTOMER REVIEW" title="이용 고객님의 실제 후기" />
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name + review.date} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-brand">{review.service}</p>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">&ldquo;{review.text}&rdquo;</p>
            <p className="mt-4 text-sm font-bold text-gray-800">{review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
