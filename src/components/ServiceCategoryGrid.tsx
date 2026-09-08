import Link from "next/link";
import { serviceCategories } from "@/lib/services-data";

export default function ServiceCategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {serviceCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/services#${cat.slug}`}
          className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-md"
        >
          <span className="text-xs font-bold text-brand">{cat.number}</span>
          <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-brand-dark">
            {cat.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{cat.description}</p>
        </Link>
      ))}
    </div>
  );
}
