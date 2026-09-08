"use client";

import { useState, type FormEvent } from "react";
import { serviceCategories } from "@/lib/services-data";

export default function QuoteForm() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-light bg-brand-light/40 p-10 text-center">
        <p className="text-lg font-bold text-brand-dark">신청이 접수되었습니다.</p>
        <p className="mt-2 text-sm text-gray-600">
          입력하신 연락처로 담당자가 빠르게 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="이름" required>
          <input
            required
            type="text"
            name="name"
            placeholder="이름을 입력해 주세요"
            className="input"
          />
        </Field>
        <Field label="휴대폰" required>
          <input
            required
            type="tel"
            name="phone"
            placeholder="010-0000-0000"
            className="input"
          />
        </Field>
      </div>

      <Field label="주소" required>
        <input
          required
          type="text"
          name="address"
          placeholder="시공/청소가 필요한 주소를 입력해 주세요"
          className="input"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="평수">
          <input type="text" name="area" placeholder="예) 24평" className="input" />
        </Field>
        <Field label="서비스명" required>
          <select required name="service" defaultValue="" className="input">
            <option value="" disabled>
              서비스를 선택해 주세요
            </option>
            {serviceCategories.map((cat) => (
              <option key={cat.slug} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 accent-brand"
        />
        개인정보 처리방침에 동의합니다
      </label>

      <button
        type="submit"
        disabled={!agreed}
        className="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        신청하기
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-gray-700">
      <span>
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}
