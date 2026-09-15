"use client";

import dynamic from "next/dynamic";

// 상담봇은 최초 렌더링에 필요 없는 플로팅 위젯이라, 렌더링 차단 CSS/JS를 줄이기 위해 지연 로드합니다.
const ConsultationBot = dynamic(() => import("@/components/consultation/ConsultationBot"), { ssr: false });

export default function ConsultationBotLoader() {
  return <ConsultationBot />;
}
