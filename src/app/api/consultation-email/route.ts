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

  if (!process.env.RESEND_API_KEY || !process.env.QUOTE_EMAIL_TO) {
    return Response.json({ ok: false, error: "현재 메일 접수가 어렵습니다. 전화로 문의해 주세요" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "찐청소 자동상담 <onboarding@resend.dev>",
        to: process.env.QUOTE_EMAIL_TO,
        subject: "[찐청소] 1분 맞춤봇 상담 내용",
        text: summary,
      }),
    });

    if (!res.ok) {
      console.error("[consultation email] resend failed", res.status);
      return Response.json({ ok: false, error: "메일 발송에 실패했습니다" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요" }, { status: 502 });
  }
}
