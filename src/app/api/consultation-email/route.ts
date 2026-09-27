export const runtime = "nodejs";

type ConsultationEmailRequest = {
  summary?: string;
};

export async function POST(request: Request) {
  let input: unknown;
  try { input = await request.json(); }
  catch { return Response.json({ ok: false, error: "상담 내용을 확인해 주세요" }, { status: 400 }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json({ ok: false, error: "상담 내용을 확인해 주세요" }, { status: 400 });
  }
  const body = input as ConsultationEmailRequest;
  const { summary } = body;

  if (typeof summary !== "string" || !summary.trim() || summary.length > 10000) {
    return Response.json({ ok: false, error: "상담 내용이 없습니다" }, { status: 400 });
  }

  try {
    // Recipient is managed in the owner's existing Formspree form.
    const res = await fetch("https://formspree.io/f/xqeqoorz", {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(request.headers.get("referer") ? { Referer: request.headers.get("referer")! } : {}),
      },
      body: JSON.stringify({
        subject: "[찐청소] 1분 맞춤봇 상담 내용",
        website: "찐청소 — https://www.cheongso.co.kr",
        message: summary,
      }),
    });

    const result = await res.json().catch(() => null);
    if (!res.ok || result?.ok !== true) {
      console.error("[consultation email] formspree failed", res.status);
      return Response.json({ ok: false, error: "메일 발송에 실패했습니다" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요" }, { status: 502 });
  }
}
