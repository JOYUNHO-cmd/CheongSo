"use client";

import { useState, type FormEvent } from "react";
import { serviceCategories } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

const QUOTE_EMAIL = "Danger3662@naver.com";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setStatus("sending");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: d.get("service"),
          region: d.get("region"),
          area: d.get("area"),
          schedule: d.get("schedule"),
          notes: d.get("notes"),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="rounded-xl bg-brand-light/40 p-4 text-sm leading-6 text-brand-dark">
        <p className="text-lg font-bold">이메일로 견적 문의하기</p>
        <p className="mt-2">
          아래 내용을 작성하고 보내주시면 {QUOTE_EMAIL} 앞으로 바로 문의가 접수됩니다.
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

      <button
        className="rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-60"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "보내는 중..." : "이메일 보내기 (견적 문의 발송)"}
      </button>

      {status === "sent" && (
        <p role="status" className="rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700">
          문의가 접수되었습니다. 빠르게 연락드릴게요!
        </p>
      )}
      {status === "error" && (
        <p role="status" className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
          메일 발송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 연락해 주세요.
        </p>
      )}
    </form>
  );
}
