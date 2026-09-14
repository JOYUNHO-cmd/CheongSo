"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Phone,
  X,
  House,
  Truck,
  Sofa,
  Paintbrush,
  Store,
  Building2,
  Heart,
  Plane,
  PartyPopper,
  PawPrint,
  Copy,
  Check,
  HelpCircle,
  Headset,
  Mail,
} from "lucide-react";
import { chatFaq, choose, getPrompt, summaryText, type Choice } from "./chat-flow";
import Logo from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import "./chatbot.css";

const chatContact = { phone: siteConfig.phoneRaw, displayPhone: siteConfig.phone };

function BrandImage() {
  return (
    <span className="jjin-chat-brand-image">
      <Logo />
    </span>
  );
}

const situationIcons = [
  House,
  Truck,
  Sofa,
  Paintbrush,
  Store,
  Building2,
  Heart,
  Plane,
  PartyPopper,
  PawPrint,
];

export default function ConsultationBot() {
  const [open, setOpen] = useState(false);
  const [launcherHovered, setLauncherHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [view, setView] = useState<"chat" | "faq">("chat");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const prompt = getPrompt(answers);

  const handleSelect = useCallback((val: string) => {
    setAnswers((prev) => choose(prev, val));
  }, []);

  const handleBack = useCallback(() => {
    setCopied(false);
    setCopyError(false);
    setEmailStatus("idle");
    if (view === "faq") {
      setView("chat");
    } else {
      setAnswers((a) => a.slice(0, -1));
      setView("chat");
    }
  }, [view]);

  const handleReset = useCallback(() => {
    setCopied(false);
    setCopyError(false);
    setEmailStatus("idle");
    setAnswers([]);
    setView("chat");
  }, []);

  const handleJumpBack = useCallback((index: number) => {
    setCopied(false);
    setCopyError(false);
    setEmailStatus("idle");
    setAnswers((a) => a.slice(0, index));
    setView("chat");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback((forcedState?: boolean) => {
    setOpen((prev) => (typeof forcedState === "boolean" ? forcedState : !prev));
  }, []);

  // Lock body scroll when open (ref-counted so Header's mobile drawer can be open at the same time)
  useEffect(() => {
    if (open) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => {
      if (open) unlockBodyScroll();
    };
  }, [open]);

  // Expose global control APIs for Header and other triggers
  useEffect(() => {
    const openBot = () => setOpen(true);
    const closeBot = () => setOpen(false);
    const toggleBot = () => setOpen((prev) => !prev);

    (window as unknown as { openConsultationBot?: () => void }).openConsultationBot = openBot;
    (window as unknown as { closeConsultationBot?: () => void }).closeConsultationBot = closeBot;
    (window as unknown as { toggleConsultationBot?: () => void }).toggleConsultationBot = toggleBot;

    window.addEventListener("open-consultation-bot", openBot);
    window.addEventListener("close-consultation-bot", closeBot);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      delete (window as unknown as { openConsultationBot?: () => void }).openConsultationBot;
      delete (window as unknown as { closeConsultationBot?: () => void }).closeConsultationBot;
      delete (window as unknown as { toggleConsultationBot?: () => void }).toggleConsultationBot;
      window.removeEventListener("open-consultation-bot", openBot);
      window.removeEventListener("close-consultation-bot", closeBot);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Auto-scroll on answers or view change
  useEffect(() => {
    if (!open) return;
    const box = scrollRef.current;
    if (!box) return;

    if (answers.length > 0) {
      const timer = setTimeout(() => {
        if (box) {
          box.scrollTo({
            top: box.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      box.scrollTop = 0;
    }
  }, [answers.length, view, open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryText(answers));
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }

  async function sendEmail() {
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/consultation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: summaryText(answers) }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch {
      setEmailStatus("error");
    }
  }

  return (
    <>
      {/* Floating launcher - hidden when dialog is open */}
      {!open && (
        <div className={`jjin-launcher-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
          {/* Floating hint bubble */}
          <button
            type="button"
            id="jjin-launcher-bubble-btn"
            className={`jjin-launcher-bubble ${launcherHovered ? "is-launcher-hovered" : ""}`}
            onClick={() => toggle(true)}
            aria-label="1분 맞춤견적 자동상담 열기"
          >
            <span>1분 맞춤견적</span>
          </button>

          {/* Launcher Button Container */}
          <div className="jjin-launcher-btn-container">
            <button
              ref={launcherRef}
              type="button"
              id="jjin-chat-launcher-btn"
              className="jjin-chat-launcher cursor-pointer"
              aria-label="찐청소 간편 자동상담 열기"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="jjin-consultation-dialog"
              onClick={() => toggle(true)}
              onMouseEnter={() => setLauncherHovered(true)}
              onMouseLeave={() => setLauncherHovered(false)}
            >
              <div className="jjin-launcher-icon-box">
                <Headset strokeWidth={2.2} className="pointer-events-none jjin-launcher-icon" />
              </div>

              {/* Alive notification alert badge with ripple */}
              <span className="jjin-live-alert-badge" aria-label="상담 준비완료">
                <span className="jjin-live-alert-ping" />
                <span className="jjin-live-alert-core" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {open && (
        <div
          id="jjin-chat-backdrop"
          className="jjin-chat-backdrop is-open"
          style={{ display: "block" }}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Consultation Dialog */}
      {open && (
        <div
          id="jjin-consultation-dialog"
          className="jjin-chat-dialog is-open"
          style={{ display: "flex" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="jjin-consultation-title"
          aria-describedby="jjin-consultation-description"
        >
        <h2 className="jjin-chat-sr-only" id="jjin-consultation-title">
          찐청소 선택형 자동상담
        </h2>
        <p className="jjin-chat-sr-only" id="jjin-consultation-description">
          상황과 서비스를 선택해 상담을 준비하세요. 선택 내용은 저장하거나 전송하지 않습니다
        </p>

        <div className="jjin-chat-shell">
          <header className="jjin-chat-header">
            <button
              type="button"
              id="jjin-chat-back-btn"
              aria-label="이전 단계"
              disabled={!answers.length && view === "chat"}
              onClick={handleBack}
            >
              <ChevronLeft />
            </button>
            <div className="jjin-chat-heading">
              <BrandImage />
              <span>선택형 자동상담</span>
            </div>
            <button
              type="button"
              id="jjin-chat-reset-btn"
              aria-label="처음부터 상담하기"
              onClick={handleReset}
            >
              <RotateCcw size={19} />
            </button>
            <button
              type="button"
              id="jjin-chat-close-btn"
              aria-label="상담창 닫기"
              onClick={handleClose}
            >
              <X />
            </button>
          </header>

          <div className="jjin-chat-scroll" ref={scrollRef}>
            <p className="jjin-chat-disclosure">
              버튼을 고르면 준비된 안내가 나와요.
              <br />
              실시간 상담사·AI 채팅이 아닙니다.
            </p>

            {view === "faq" ? (
              <section className="jjin-chat-faq">
                <h2>자주 묻는 질문</h2>
                {chatFaq.map((f) => (
                  <details key={f.question}>
                    <summary>
                      {f.question}
                      <ChevronRight size={17} />
                    </summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
                <a className="jjin-chat-call" href={"tel:" + chatContact.phone}>
                  <Phone size={18} />
                  찐청소 전화상담
                </a>
              </section>
            ) : (
              <>
                {/* Previously answered turns */}
                {answers.map((answer, i) => (
                  <div className="jjin-chat-turn" key={i}>
                    <div className="jjin-chat-bot">
                      <span>찐청소 자동안내</span>
                      <p>{getPrompt(answers.slice(0, i))?.text}</p>
                    </div>
                    <button
                      type="button"
                      className="jjin-chat-answer cursor-pointer text-left"
                      title="이 단계로 돌아가기"
                      onClick={() => handleJumpBack(i)}
                    >
                      {answer.label}
                    </button>
                  </div>
                ))}

                {/* Current step prompt & choices */}
                <div ref={currentRef} className="jjin-chat-current">
                  <div className="jjin-chat-bot" aria-live="polite" aria-atomic="true">
                    <span>찐청소 자동안내</span>
                    <p>
                      {prompt?.text ||
                        "상담에 필요한 내용을 정리했어요 😊\n아래 내용을 확인하고 찐청소에 전화해 주세요"}
                    </p>
                  </div>

                  {prompt ? (
                    <>
                      <p className="jjin-chat-step">
                        {answers.length + 1} / 5 · {prompt.title}
                      </p>
                      {prompt.note && <p className="jjin-chat-note">{prompt.note}</p>}
                      <div className="jjin-chat-choices" aria-label={prompt.title}>
                        {prompt.options.map((option, i) => {
                          const SituationIcon = situationIcons[i];
                          return (
                            <button
                              type="button"
                              key={option.value}
                              className="jjin-choice-btn cursor-pointer"
                              data-choice-value={option.value}
                              onClick={() => handleSelect(option.value)}
                            >
                              {answers.length === 0 && SituationIcon && (
                                <span className="jjin-choice-icon" aria-hidden="true">
                                  <SituationIcon size={21} strokeWidth={1.7} />
                                </span>
                              )}
                              <span className="jjin-choice-label">{option.label}</span>
                              <ChevronRight size={17} className="jjin-choice-chevron" />
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <section className="jjin-chat-result">
                      <h2>나의 상담 준비 내용</h2>
                      <dl>
                        {answers.map((a, i) => (
                          <div key={i}>
                            <dt>{["상황", "희망 서비스", "지역", "면적", "희망 시기"][i]}</dt>
                            <dd>{a.label}</dd>
                          </div>
                        ))}
                      </dl>
                      <p>
                        아직 접수·예약되지 않았습니다.
                        <br />
                        가격과 작업 가능 여부는 전화 상담으로 확인해 주세요
                      </p>
                      <a className="jjin-chat-call" href={"tel:" + chatContact.phone}>
                        <Phone size={18} />
                        {chatContact.displayPhone} 전화상담
                      </a>
                      <p className="jjin-chat-note">선택 내용은 전화로 자동 전달되지 않아요</p>
                      <button
                        type="button"
                        className="jjin-chat-copy"
                        onClick={sendEmail}
                        disabled={emailStatus === "sending"}
                      >
                        {emailStatus === "sent" ? <Check size={17} /> : <Mail size={17} />}{" "}
                        {emailStatus === "sending"
                          ? "보내는 중..."
                          : emailStatus === "sent"
                            ? "이메일 전송 완료"
                            : "상담 내용 이메일로 보내기"}
                      </button>
                      <output className="jjin-chat-copy-status">
                        {emailStatus === "sent"
                          ? "찐청소로 상담 내용을 보냈어요. 확인 후 연락드릴게요"
                          : emailStatus === "error"
                            ? "전송에 실패했어요. 잠시 후 다시 시도하거나 전화로 연락해 주세요"
                            : ""}
                      </output>
                      <button type="button" className="jjin-chat-copy" onClick={copy}>
                        {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
                        {copied ? "상담 내용 복사 완료" : "상담 내용 복사"}
                      </button>
                      <output className="jjin-chat-copy-status">
                        {copied
                          ? "복사한 내용을 상담 시 활용해 주세요"
                          : copyError
                            ? "복사가 차단되어 있어요. 아래 내용을 직접 선택해 복사해 주세요"
                            : ""}
                      </output>
                      {copyError && (
                        <textarea
                          readOnly
                          aria-label="복사할 상담 내용"
                          value={summaryText(answers)}
                          rows={9}
                        />
                      )}
                      <button
                        type="button"
                        id="jjin-chat-restart-btn"
                        className="jjin-chat-restart"
                        onClick={handleReset}
                      >
                        다른 상황 알아보기
                      </button>
                    </section>
                  )}
                </div>
              </>
            )}
          </div>

          <footer className="jjin-chat-footer">
            <nav aria-label="상담 메뉴">
              <a href={siteConfig.kakaoUrl} target="_blank" rel="noopener noreferrer" data-chat-view="kakao">
                <MessageCircle size={19} />
                맞춤 상담
              </a>
              <button
                type="button"
                data-chat-view="faq"
                onClick={() => setView("faq")}
                aria-current={view === "faq" ? "page" : undefined}
              >
                <HelpCircle size={19} />
                이용 안내
              </button>
            </nav>
            <p>찐청소 · 선택 내용은 전송·저장되지 않습니다</p>
          </footer>
        </div>
      </div>
      )}
    </>
  );
}
