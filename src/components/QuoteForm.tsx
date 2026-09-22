"use client";

import { useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

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
          name: d.get("name"),
          phone: d.get("phone"),
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
      <div className="rounded-xl bg-brand-light/40 p-4 leading-6 text-brand-dark sm:text-sm">
        <p className="text-lg font-bold">이메일로 견적 문의하기</p>
        <p className="mt-2 whitespace-nowrap text-[clamp(9px,2.8vw,11px)] sm:text-sm">
          아래 내용을 작성해서 보내주시면 바로 문의가 접수됩니다.
        </p>
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2 font-black text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95 sm:gap-2 sm:px-4 sm:py-3 sm:text-base"
        >
          <Phone className="h-[clamp(10px,3.2vw,13px)] w-[clamp(10px,3.2vw,13px)] shrink-0 sm:h-5 sm:w-5" strokeWidth={2.6} />
          <span className="whitespace-nowrap text-[clamp(10px,3.2vw,13px)] sm:text-base">긴급 상황시 {siteConfig.phone}(빠른연결)</span>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          성함 (또는 업체명)
          <input required name="name" className="input" placeholder="홍길동" maxLength={60} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          연락처
          <input
            required
            name="phone"
            type="tel"
            className="input"
            placeholder="010-0000-0000"
            maxLength={20}
          />
        </label>
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

      <label className="flex items-start gap-2.5 text-xs text-gray-600">
        <input required name="privacyConsent" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-brand" />
        <span>(필수) 견적 상담을 위한 개인정보 수집·이용에 동의합니다.</span>
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
