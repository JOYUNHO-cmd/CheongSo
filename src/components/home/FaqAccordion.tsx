"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqCategories } from "@/lib/faq-data";

export default function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].categoryName);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeQas = faqCategories.find((c) => c.categoryName === activeCategory)?.qas ?? [];

  function selectCategory(name: string) {
    setActiveCategory(name);
    setOpenQuestion(null);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {faqCategories.map((cat) => (
          <button
            key={cat.categoryName}
            type="button"
            onClick={() => selectCategory(cat.categoryName)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
              activeCategory === cat.categoryName
                ? "bg-brand text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {activeQas.map((qa) => {
          const isOpen = openQuestion === qa.q;
          return (
            <div key={qa.q} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : qa.q)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-black text-brand">
                    Q
                  </span>
                  <span className="text-sm font-bold text-gray-800 md:text-base">{qa.q}</span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 pl-14 text-sm leading-relaxed text-gray-500">{qa.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
