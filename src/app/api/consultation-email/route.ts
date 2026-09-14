export const runtime = "nodejs";

type ConsultationEmailRequest = {
  summary?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ConsultationEmailRequest;
  const { summary } = body;

  if (!summary) {
    return Response.json({ ok: false, error: "상담 내용이 없습니다" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
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
    console.error("[consultation email] resend failed", res.status, await res.text());
    return Response.json({ ok: false, error: "메일 발송에 실패했습니다" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
