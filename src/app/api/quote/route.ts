import nodemailer from "nodemailer";

export const runtime = "nodejs";

type QuoteRequest = {
  service?: string;
  region?: string;
  area?: string;
  schedule?: string;
  notes?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as QuoteRequest;
  const { service, region, area, schedule, notes } = body;

  if (!service || !region) {
    return Response.json({ ok: false, error: "서비스와 지역은 필수입니다" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NAVER_EMAIL_USER,
      pass: process.env.NAVER_EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"찐청소 견적 문의" <${process.env.NAVER_EMAIL_USER}>`,
      to: process.env.QUOTE_EMAIL_TO,
      subject: `[찐청소] 견적 문의 - ${service}`,
      text: [
        "찐청소 견적 문의",
        `서비스: ${service}`,
        `지역: ${region}`,
        `면적: ${area || "확인 필요"}`,
        `희망 일정: ${schedule || "협의"}`,
        `요청 내용: ${notes || "상담 시 협의"}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("[quote email] send failed", error);
    return Response.json({ ok: false, error: "메일 발송에 실패했습니다" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
