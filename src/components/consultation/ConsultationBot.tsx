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
} from "lucide-react";
import { chatFaq, choose, getPrompt, summaryText, type Choice } from "./chat-flow";
import Logo from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";
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
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [view, setView] = useState<"chat" | "faq">("chat");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

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
    setView((v) => {
      if (v === "faq") return "chat";
      setAnswers((a) => a.slice(0, -1));
      return "chat";
    });
  }, []);

  const handleReset = useCallback(() => {
    setCopied(false);
    setCopyError(false);
    setAnswers([]);
    setView("chat");
  }, []);

  const handleJumpBack = useCallback((index: number) => {
    setCopied(false);
    setCopyError(false);
    setAnswers((a) => a.slice(0, index));
    setView("chat");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback((forcedState?: boolean) => {
    setOpen((prev) => (typeof forcedState === "boolean" ? forcedState : !prev));
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      launcherRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
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

  return (
    <>
      {/* Floating launcher - hidden when dialog is open */}
      <button
        ref={launcherRef}
        type="button"
        id="jjin-chat-launcher-btn"
        className="jjin-chat-launcher cursor-pointer"
        style={{ display: open ? "none" : "flex" }}
        aria-label="찐청소 간편 자동상담 열기"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="jjin-consultation-dialog"
        onClick={() => toggle(true)}
      >
        <MessageCircle size={25} className="pointer-events-none" />
        <span className="pointer-events-none">자동상담</span>
      </button>

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
      <div
        id="jjin-consultation-dialog"
        className={`jjin-chat-dialog ${open ? "is-open" : ""}`}
        style={{ display: open ? "flex" : "none" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="jjin-consultation-title"
        aria-describedby="jjin-consultation-description"
      >
        <h2 className="jjin-chat-sr-only" id="jjin-consultation-title">
          찐청소 선택형 자동상담
        </h2>
        <p className="jjin-chat-sr-only" id="jjin-consultation-description">
          상황과 서비스를 선택해 상담을 준비하세요. 선택 내용은 저장하거나 전송하지 않습니다.
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
                        "상담에 필요한 내용을 정리했어요 😊\n아래 내용을 확인하고 찐청소에 전화해 주세요."}
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
                        가격과 작업 가능 여부는 전화 상담으로 확인해 주세요.
                      </p>
                      <a className="jjin-chat-call" href={"tel:" + chatContact.phone}>
                        <Phone size={18} />
                        {chatContact.displayPhone} 전화상담
                      </a>
                      <p className="jjin-chat-note">선택 내용은 전화로 자동 전달되지 않아요.</p>
                      <button type="button" className="jjin-chat-copy" onClick={copy}>
                        {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
                        {copied ? "상담 내용 복사 완료" : "상담 내용 복사"}
                      </button>
                      <output className="jjin-chat-copy-status">
                        {copied
                          ? "복사한 내용을 상담 시 활용해 주세요."
                          : copyError
                            ? "복사가 차단되어 있어요. 아래 내용을 직접 선택해 복사해 주세요."
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
              <button
                type="button"
                data-chat-view="chat"
                onClick={() => setView("chat")}
                aria-current={view === "chat" ? "page" : undefined}
              >
                <MessageCircle size={19} />
                맞춤 상담
              </button>
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
    </>
  );
}
