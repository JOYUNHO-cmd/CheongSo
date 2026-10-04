"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  mode?: "background" | "inline";
  className?: string;
}

const HD_SOURCES = ["/videos/hero-hd.mp4", "/videos/hero-web.mp4"];
// 원본 전체 장면과 화면비를 유지한 모바일 전용 인코딩을 먼저 사용합니다.
const MOBILE_SOURCES = ["/videos/hero-mobile.mp4", "/videos/hero-web.mp4"];

function BackgroundVideo({ objectPositionClass, sources, media = "all", inline = false }: {
  objectPositionClass: string;
  sources: string[];
  media?: string;
  inline?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [active, setActive] = useState(false);

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
    // 숨김 영상의 다운로드와 디코딩을 중단합니다. 포스터와 기존 크롭은 유지됩니다.
    video.load();
    if (!active || !readyToPlay) return;
    const play = () => { void video.play().catch(() => {}); };
    play();
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
    return () => {
      video.pause();
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, [active, readyToPlay]);

  return (
    <video
      ref={videoRef}
      className={`${inline ? "w-full aspect-video" : "absolute inset-0 h-full w-full scale-[1.01] contrast-[1.04] brightness-[1.02]"} object-cover pointer-events-none ${objectPositionClass}`}
      poster="/videos/hero-poster.jpg"
      autoPlay={active && readyToPlay}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {active && readyToPlay && sources.map((src) => <source key={src} src={src} type="video/mp4" />)}
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
        <BackgroundVideo objectPositionClass="object-[center_35%]" sources={MOBILE_SOURCES} media="(max-width: 767px)" />
      </div>
      <div className="relative hidden h-full w-full md:block">
        <BackgroundVideo objectPositionClass={className || "object-[center_35%]"} sources={HD_SOURCES} media="(min-width: 768px)" />
      </div>
    </>
  );
}
