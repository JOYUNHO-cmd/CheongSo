"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  mode?: "background" | "inline";
  className?: string;
}

const HD_SOURCES = ["/videos/hero-hd.mp4", "/videos/hero-web.mp4"];
// 모바일은 검증한 경량 영상만 사용합니다. 재생할 수 없으면 기존 포스터를 유지합니다.
const MOBILE_SOURCES = ["/videos/hero-mobile.mp4"];

function BackgroundVideo({ objectPositionClass, sources, media = "all", inline = false, waitForInteraction = false }: {
  objectPositionClass: string;
  sources: string[];
  media?: string;
  inline?: boolean;
  waitForInteraction?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [active, setActive] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const shouldPlay = active && readyToPlay && (!waitForInteraction || interacted);

  useEffect(() => {
    if (!waitForInteraction) return;
    // 실제 입력을 기다립니다. 초기 앵커 이동·스크롤 복원·화면 크기 변경은 재생하지 않습니다.
    const events = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    const removeListeners = () => {
      for (const event of events) window.removeEventListener(event, start);
    };
    const start = () => {
      setInteracted(true);
      removeListeners();
    };
    for (const event of events) window.addEventListener(event, start, { passive: true });
    return removeListeners;
  }, [waitForInteraction]);

  useEffect(() => {
    let timer: number | undefined;
    let idle: number | undefined;
    // 먼저 포스터와 본문을 표시한 뒤 장식 영상을 내려받습니다.
    const prepare = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(() => setReadyToPlay(true), { timeout: 2000 });
        } else {
          setReadyToPlay(true);
        }
      }, 500);
    };
    if (document.readyState === "complete") prepare();
    else window.addEventListener("load", prepare, { once: true });
    return () => {
      window.removeEventListener("load", prepare);
      if (timer !== undefined) window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const viewport = window.matchMedia(media);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setActive(inView && viewport.matches && !reducedMotion.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    viewport.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [media]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay) {
      // source를 제거한 비활성 영상만 초기화해 숨김 영상의 다운로드를 중단합니다.
      video.pause();
      video.load();
      return;
    }
    // source를 삽입한 직후 load()를 반복하면 진행 중인 선택·다운로드가 초기화됩니다.
    // 활성 영상은 브라우저의 source 선택을 그대로 두고 재생만 요청합니다.
    const play = () => { void video.play().catch(() => {}); };
    play();
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    return () => {
      video.pause();
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      className={`${inline ? "w-full aspect-video" : "absolute inset-0 h-full w-full scale-[1.01] contrast-[1.04] brightness-[1.02]"} object-cover pointer-events-none ${objectPositionClass}`}
      poster="/videos/hero-poster.jpg"
      autoPlay={shouldPlay}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {shouldPlay && sources.map((src) => <source key={src} src={src} type="video/mp4" />)}
    </video>
  );
}

export default function HeroVideo({ mode = "background", className = "" }: HeroVideoProps) {
  if (mode === "inline") {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/20 ${className}`}>
        <BackgroundVideo objectPositionClass="" sources={MOBILE_SOURCES} inline />
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/15">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>전문 시공 현장 실황</span>
        </div>
        <div className="absolute bottom-2.5 right-3 z-10 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-gray-200">
          100% 실제 작업 영상
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative h-full w-full overflow-hidden md:hidden">
        <BackgroundVideo objectPositionClass="object-[center_35%]" sources={MOBILE_SOURCES} media="(max-width: 767px)" waitForInteraction />
      </div>
      <div className="relative hidden h-full w-full md:block">
        <BackgroundVideo objectPositionClass={className || "object-[center_35%]"} sources={HD_SOURCES} media="(min-width: 768px)" />
      </div>
    </>
  );
}
