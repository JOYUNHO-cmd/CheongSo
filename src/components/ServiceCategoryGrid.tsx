import Image from "next/image";
import Link from "next/link";
import { serviceCategories } from "@/lib/services-data";

export default function ServiceCategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {serviceCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/services#${cat.slug}`}
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <Image
              src={`/images/main-services/${cat.slug}.webp`}
              alt={`${cat.title} 작업 현장`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>
          <div className="p-3 min-[360px]:p-3.5 sm:p-5 md:p-6">
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
          </div>
        </Link>
      ))}
    </div>
  );
}

