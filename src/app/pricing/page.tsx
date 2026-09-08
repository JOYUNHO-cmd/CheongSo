import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { serviceCategories } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `가격안내 | ${siteConfig.name}`,
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading
        eyebrow="PRICING"
        title="가격안내"
        description="공간 크기, 오염도, 작업 범위에 따라 견적이 달라집니다. 정확한 비용은 무료 상담 후 안내드립니다."
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3 font-bold">분류</th>
              <th className="px-5 py-3 font-bold">서비스</th>
              <th className="px-5 py-3 font-bold">예상 비용</th>
            </tr>
          </thead>
          <tbody>
            {serviceCategories.map((cat) => (
              <tr key={cat.slug} className="border-t border-gray-100">
                <td className="px-5 py-4 font-bold text-gray-800">{cat.title}</td>
                <td className="px-5 py-4 text-gray-600">{cat.items.join(", ")}</td>
                <td className="px-5 py-4 text-gray-500">상담 후 안내</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/contact"
          className="inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
        >
          무료 견적 받기
        </Link>
      </div>
    </div>
  );
}
