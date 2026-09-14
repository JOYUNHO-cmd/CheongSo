"use client";

import { useState, type FormEvent } from "react";
import { serviceCategories } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

const QUOTE_EMAIL = "Danger3662@naver.com";

export default function QuoteForm() {
  const [summary, setSummary] = useState("");

  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setSummary(
      `찐청소 견적 문의\n서비스: ${d.get("service")}\n지역: ${d.get("region")}\n면적: ${d.get("area") || "확인 필요"}\n희망 일정: ${d.get("schedule") || "협의"}\n요청 내용: ${d.get("notes") || "상담 시 협의"}`
    );
  }

  const mailtoHref = summary
    ? `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent("[찐청소] 견적 문의")}&body=${encodeURIComponent(summary)}`
    : undefined;

  return (
    <form onSubmit={prepare} className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="rounded-xl bg-brand-light/40 p-4 text-sm leading-6 text-brand-dark">
        <p className="text-lg font-bold">이메일로 견적 문의하기</p>
        <p className="mt-2">
          아래 내용을 작성하고 &quot;이메일 보내기&quot;를 누르면 이메일 앱이 열리면서 {QUOTE_EMAIL} 앞으로
          문의 내용이 미리 채워집니다. 내용을 확인하고 보내기만 하시면 문의가 완료돼요.
        </p>
        <p className="mt-3 text-xs text-brand-dark/70">
          급하신 경우 전화로도 연락 주세요:{" "}
          <a className="font-bold underline" href={`tel:${siteConfig.phoneRaw}`}>
            {siteConfig.phone}
          </a>
        </p>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        서비스
        <select required name="service" className="input" defaultValue="">
          <option value="" disabled>
            서비스 선택
          </option>
          {serviceCategories.map((c) => (
            <optgroup key={c.slug} label={c.title}>
              {c.items.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold">
        지역
        <input
          required
          name="region"
          className="input"
          placeholder="예: 경기도 안양시 동안구 (상세 주소 제외)"
          maxLength={100}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          면적
          <input name="area" className="input" placeholder="예: 약 30평" maxLength={60} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          희망 일정
          <input name="schedule" className="input" placeholder="예: 평일 영업 종료 후" maxLength={100} />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        공간 상태와 요청 내용
        <textarea
          name="notes"
          className="input min-h-28"
          maxLength={2000}
          placeholder="바닥 재질, 짐 유무, 집중적으로 청소할 부분 등"
        />
      </label>

      <button className="rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark" type="submit">
        견적 문의 내용 작성하기
      </button>

      {summary && (
        <section aria-live="polite" className="rounded-xl border border-brand-light p-4">
          <h3 className="font-bold text-brand-dark">문의 내용 미리보기</h3>
          <pre className="my-4 whitespace-pre-wrap break-words font-sans text-sm leading-7">{summary}</pre>
          <a
            href={mailtoHref}
            className="inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
          >
            이메일 보내기 (견적 문의 발송)
          </a>
        </section>
      )}
    </form>
  );
}
