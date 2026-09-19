"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqCategories } from "@/lib/faq-data";

export default function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].categoryName);
  function selectCategory(name: string) {
    setActiveCategory(name);
  }

  // 모든 질문과 답변을 HTML에도 렌더링해 구조화 데이터와 본문을 일치시킵니다.
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.qas.map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      }))
    ),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }}
      />
      <noscript><style>{`[data-faq-category][hidden]{display:block}.faq-category-filter{display:none}`}</style></noscript>
      <div className="faq-category-filter flex flex-wrap items-center justify-center gap-2">
        {faqCategories.map((cat, categoryIndex) => (
          <button
            key={cat.categoryName}
            type="button"
            aria-pressed={activeCategory === cat.categoryName}
            aria-controls={`faq-category-${categoryIndex}`}
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

      {faqCategories.map((cat, categoryIndex) => (
      <section key={cat.categoryName} id={`faq-category-${categoryIndex}`} data-faq-category hidden={activeCategory !== cat.categoryName} aria-label={cat.categoryName} className="mt-6 space-y-3">
        {cat.qas.map((qa) => (
            <details key={qa.q} name={`home-faq-${categoryIndex}`} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <summary
                className="flex w-full list-none items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer [&::-webkit-details-marker]:hidden"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-black text-brand">
                    Q
                  </span>
                  <span className="text-sm font-bold text-gray-800 md:text-base">{qa.q}</span>
                </span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand"
                />
              </summary>
                <p className="px-5 pb-4 pl-14 text-sm leading-relaxed text-gray-500">{qa.a}</p>
            </details>
        ))}
      </section>
      ))}
    </div>
  );
}
