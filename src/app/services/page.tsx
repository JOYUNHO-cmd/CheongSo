import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { serviceCategories, itemAnchor } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `서비스 안내 | ${siteConfig.name}`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionHeading
        eyebrow="ALL SERVICES"
        title="서비스 안내"
        description="필요한 서비스를 카테고리별로 확인하세요."
      />

      <div className="grid gap-10">
        {serviceCategories.map((cat) => (
          <div key={cat.slug} id={cat.slug} className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-bold text-brand">{cat.number}</span>
              <h2 className="text-xl font-black text-gray-900 md:text-2xl">{cat.title}</h2>
            </div>
            <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
            <ul className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
              {cat.items.map((item, i) => (
                <li
                  key={item}
                  id={itemAnchor(cat.slug, i)}
                  className="scroll-mt-28 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 target:bg-brand-light target:text-brand-dark target:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-block text-sm font-bold text-brand hover:underline"
            >
              {cat.title} 견적 문의하기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
