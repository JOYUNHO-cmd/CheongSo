"use client";
import { useState, type FormEvent } from "react";
import { serviceCategories } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
export default function QuoteForm() {
 const [summary, setSummary] = useState(""); const [copyState, setCopyState] = useState("");
 function prepare(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const d = new FormData(e.currentTarget); setSummary(`찐청소 상담 준비\n서비스: ${d.get("service")}\n지역: ${d.get("region")}\n면적: ${d.get("area") || "확인 필요"}\n희망 일정: ${d.get("schedule") || "협의"}\n요청 내용: ${d.get("notes") || "상담 시 협의"}`); setCopyState(""); }
 async function copy() { try { await navigator.clipboard.writeText(summary); setCopyState("복사했습니다. 아직 업체에 전송되지는 않았습니다."); } catch { setCopyState("자동 복사가 지원되지 않습니다. 내용을 선택해서 복사해 주세요."); } }
 return <form onSubmit={prepare} className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
 <div className="rounded-xl bg-brand-light/40 p-4 text-sm leading-6 text-brand-dark"><a className="text-xl font-bold" href={`tel:${siteConfig.phoneRaw}`}>전화 상담 {siteConfig.phone}</a><p className="mt-3">아래에서 상담 내용을 정리해 전화 또는 문자 상담에 활용하세요. 이 양식은 내용을 자동으로 전송하거나 저장하지 않습니다.</p></div>
 <label className="grid gap-2 text-sm font-bold">서비스<select required name="service" className="input" defaultValue=""><option value="" disabled>서비스 선택</option>{serviceCategories.map(c => <optgroup key={c.slug} label={c.title}>{c.items.map(item => <option key={item}>{item}</option>)}</optgroup>)}</select></label>
 <label className="grid gap-2 text-sm font-bold">지역<input required name="region" className="input" placeholder="예: 경기도 안양시 동안구 (상세 주소 제외)" maxLength={100} /></label>
 <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">면적<input name="area" className="input" placeholder="예: 약 30평" maxLength={60} /></label><label className="grid gap-2 text-sm font-bold">희망 일정<input name="schedule" className="input" placeholder="예: 평일 영업 종료 후" maxLength={100} /></label></div>
 <label className="grid gap-2 text-sm font-bold">공간 상태와 요청 내용<textarea name="notes" className="input min-h-28" maxLength={2000} placeholder="바닥 재질, 짐 유무, 집중적으로 청소할 부분 등" /></label>
 <button className="rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark" type="submit">상담 내용 정리하기</button>
 {summary && <section aria-live="polite" className="rounded-xl border border-brand-light p-4"><h3 className="font-bold text-brand-dark">상담 준비 내용 · 미전송</h3><pre className="my-4 whitespace-pre-wrap break-words font-sans text-sm leading-7">{summary}</pre><button type="button" onClick={copy} className="rounded-full border border-brand px-4 py-2 text-sm font-bold text-brand-dark">내용 복사</button>{copyState && <p className="mt-3 text-sm" role="status">{copyState}</p>}</section>}
 </form>;
}
