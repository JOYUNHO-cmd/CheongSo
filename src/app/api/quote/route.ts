export const runtime = "nodejs";

type QuoteRequest = {
  name?: string;
  phone?: string;
  service?: string;
  region?: string;
  area?: string;
  schedule?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let input: unknown;
  try { input = await request.json(); }
  catch { return Response.json({ ok: false, error: "문의 내용을 확인해 주세요" }, { status: 400 }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json({ ok: false, error: "문의 내용을 확인해 주세요" }, { status: 400 });
  }
  const body = input as QuoteRequest;
  const { name, phone, service, region, area, schedule, notes } = body;

  if ([name, phone, service, region].some(value => typeof value !== "string" || !value.trim()) ||
      [name, phone, service, region, area, schedule].some(value => value !== undefined && (typeof value !== "string" || value.length > 200)) ||
      (notes !== undefined && (typeof notes !== "string" || notes.length > 5000))) {
    return Response.json({ ok: false, error: "성함, 연락처, 서비스, 지역은 필수입니다" }, { status: 400 });
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
        from: "찐청소 견적 문의 <onboarding@resend.dev>",
        to: process.env.QUOTE_EMAIL_TO,
        subject: `[찐청소] 견적 문의 - ${service}`,
        text: [
          "찐청소 견적 문의",
          `성함(업체명): ${name}`,
          `연락처: ${phone}`,
          `서비스: ${service}`,
          `지역: ${region}`,
          `면적: ${area || "확인 필요"}`,
          `희망 일정: ${schedule || "협의"}`,
          `요청 내용: ${notes || "상담 시 협의"}`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[quote email] resend failed", res.status);
      return Response.json({ ok: false, error: "메일 발송에 실패했습니다" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요" }, { status: 502 });
  }
}
