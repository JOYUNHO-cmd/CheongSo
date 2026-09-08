import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `문의하기 | ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading
        eyebrow="CONTACT"
        title="문의하기"
        description="아래 정보를 남겨주시면 상담원이 빠르게 연락드립니다."
      />

      <div className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-600 shadow-sm md:grid-cols-2">
        <p>
          <span className="font-bold text-gray-800">전화</span> · {siteConfig.phone}
        </p>
        <p>
          <span className="font-bold text-gray-800">이메일</span> · {siteConfig.email}
        </p>
        <p>
          <span className="font-bold text-gray-800">평일</span> · {siteConfig.hours.weekday}
        </p>
        <p>
          <span className="font-bold text-gray-800">주말</span> · {siteConfig.hours.weekend}
        </p>
      </div>

      <QuoteForm />
    </div>
  );
}
