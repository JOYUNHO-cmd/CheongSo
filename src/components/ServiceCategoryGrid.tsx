import Link from "next/link";
import { serviceCategories } from "@/lib/services-data";

export default function ServiceCategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {serviceCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/services#${cat.slug}`}
          className="group rounded-2xl border border-gray-100 bg-white p-3 min-[360px]:p-3.5 sm:p-5 md:p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
        >
          <span className="text-xs font-bold text-brand">{cat.number}</span>
          <h3 className="mt-1.5 sm:mt-2 text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-dark">
            {cat.title}
          </h3>
          <p className="mt-2 text-[10px] min-[360px]:text-[11px] min-[390px]:text-[12px] sm:text-[12px] md:text-[12.5px] leading-snug sm:leading-relaxed text-gray-500">
            <span className="block whitespace-nowrap sm:whitespace-normal tracking-tight">
              {cat.descLine1}
            </span>
            <span className="block mt-0.5 whitespace-nowrap sm:whitespace-normal tracking-tight">
              {cat.descLine2}
            </span>
          </p>
        </Link>
      ))}
    </div>
  );
}

