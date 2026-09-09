"use client";

import { useState } from "react";
import { faqCategories } from "@/lib/faq-data";

export default function FaqAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {faqCategories.map((cat) => (
        <div key={cat.categoryName}>
          <h3 className="mb-3 text-sm font-bold text-brand">{cat.categoryName}</h3>
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {cat.qas.map((qa) => {
              const key = `${cat.categoryName}-${qa.q}`;
              const open = openKey === key;
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : key)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold text-gray-800 md:text-base">Q. {qa.q}</span>
                    <span className={`shrink-0 text-brand transition-transform ${open ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {open && (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-gray-500">{qa.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
