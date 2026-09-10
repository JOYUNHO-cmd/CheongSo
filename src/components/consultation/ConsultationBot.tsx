"use client";
import { useEffect, useRef, useState } from "react";
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

function Conversation({ onClose }: { onClose: () => void }) {
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [view, setView] = useState<"chat" | "faq">("chat");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const prompt = getPrompt(answers);
  useEffect(() => {
    const box = scrollRef.current;
    const target = currentRef.current;
    if (box)
      box.scrollTo({
        top: answers.length && target ? target.offsetTop : 0,
        behavior: "auto",
      });
  }, [answers, view]);
  const reset = () => {
    setCopied(false);
    setCopyError(false);
    setAnswers([]);
    setView("chat");
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryText(answers));
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="jjin-chat-shell">
      <header className="jjin-chat-header">
        <button
          type="button"
          aria-label="이전 단계"
          disabled={!answers.length && view === "chat"}
          onClick={() => {
            setCopied(false);
            setCopyError(false);
            if (view === "faq") setView("chat");
            else setAnswers((a) => a.slice(0, -1));
          }}
        >
          <ChevronLeft />
        </button>
        <div className="jjin-chat-heading">
          <BrandImage />
          <span>선택형 자동상담</span>
        </div>
        <button type="button" aria-label="처음부터 상담하기" onClick={reset}>
          <RotateCcw size={19} />
        </button>
        <button type="button" aria-label="상담창 닫기" onClick={onClose}>
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
            {answers.map((answer, i) => (
              <div className="jjin-chat-turn" key={i}>
                <div className="jjin-chat-bot">
                  <span>찐청소 자동안내</span>
                  <p>{getPrompt(answers.slice(0, i))?.text}</p>
                </div>
                <div className="jjin-chat-answer">{answer.label}</div>
              </div>
            ))}
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
                          onClick={() => setAnswers((a) => choose(a, option.value))}
                        >
                          {answers.length === 0 && (
                            <span className="jjin-choice-icon" aria-hidden="true">
                              <SituationIcon size={21} strokeWidth={1.7} />
                            </span>
                          )}
                          <span>{option.label}</span>
                          <ChevronRight size={17} />
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
                  <button type="button" className="jjin-chat-restart" onClick={reset}>
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
            onClick={() => setView("chat")}
            aria-current={view === "chat" ? "page" : undefined}
          >
            <MessageCircle size={19} />
            맞춤 상담
          </button>
          <button
            type="button"
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
  );
}

export default function ConsultationBot() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);
  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="jjin-chat-launcher"
        aria-label="찐청소 자동상담 열기"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="jjin-consultation-dialog"
        onClick={() => setOpen(true)}
      >
        <MessageCircle size={25} />
        <span>자동상담</span>
      </button>
      <dialog
        ref={dialogRef}
        id="jjin-consultation-dialog"
        className="jjin-chat-dialog"
        aria-labelledby="jjin-consultation-title"
        aria-describedby="jjin-consultation-description"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => {
          launcherRef.current?.focus();
        }}
      >
        <h2 className="jjin-chat-sr-only" id="jjin-consultation-title">
          찐청소 선택형 자동상담
        </h2>
        <p className="jjin-chat-sr-only" id="jjin-consultation-description">
          상황과 서비스를 선택해 상담을 준비하세요. 선택 내용은 저장하거나 전송하지 않습니다.
        </p>
        {open && <Conversation onClose={() => setOpen(false)} />}
      </dialog>
    </>
  );
}
