"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Headset } from "lucide-react";
import styles from "./ConsultationLauncher.module.css";

// 안내 버튼은 즉시 제공하고 상담창의 코드·스타일은 실제로 열 때만 가져옵니다.
const ConsultationBot = dynamic(() => import("@/components/consultation/ConsultationBot"), {
  ssr: false,
  loading: () => <p className={styles.loading} role="status">상담창을 불러오는 중입니다...</p>,
});

export default function ConsultationBotLoader() {
  const [requested, setRequested] = useState(false);
  const [open, setOpen] = useState(false);
  const openBot = useCallback(() => { setRequested(true); setOpen(true); }, []);
  const closeBot = useCallback(() => setOpen(false), []);
  const toggleBot = useCallback(() => { setRequested(true); setOpen(value => !value); }, []);

  useEffect(() => {
    const controls = window as unknown as {
      openConsultationBot?: () => void;
      closeConsultationBot?: () => void;
      toggleConsultationBot?: () => void;
    };
    controls.openConsultationBot = openBot;
    controls.closeConsultationBot = closeBot;
    controls.toggleConsultationBot = toggleBot;
    window.addEventListener("open-consultation-bot", openBot);
    window.addEventListener("close-consultation-bot", closeBot);
    return () => {
      delete controls.openConsultationBot;
      delete controls.closeConsultationBot;
      delete controls.toggleConsultationBot;
      window.removeEventListener("open-consultation-bot", openBot);
      window.removeEventListener("close-consultation-bot", closeBot);
    };
  }, [openBot, closeBot, toggleBot]);

  return (
    <>
      <div className={styles.wrapper} hidden={open}>
        <button
          type="button"
          id="jjin-launcher-bubble-btn"
          className={styles.bubble}
          onClick={openBot}
          aria-label="1분 맞춤견적 자동상담 열기"
        >
          <span>1분 맞춤견적</span>
        </button>
        <button
          type="button"
          id="jjin-chat-launcher-btn"
          className={styles.launcher}
          aria-label="찐청소 간편 자동상담 열기"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="jjin-consultation-dialog"
          onClick={openBot}
        >
          <Headset strokeWidth={2.2} className={styles.icon} aria-hidden="true" />
          <span className={styles.badge} aria-label="상담 준비완료">
            <span className={styles.ping} />
            <span className={styles.core} />
          </span>
        </button>
      </div>
      {requested && <ConsultationBot open={open} onClose={closeBot} />}
    </>
  );
}
