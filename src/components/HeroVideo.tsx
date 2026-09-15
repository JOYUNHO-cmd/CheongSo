"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  /** 모바일 전용 무손실 인라인 플레이어 모드 */
  mode?: "background" | "inline";
  className?: string;
}

const HD_SOURCES = ["/videos/hero-hd.mp4", "/videos/hero-web.mp4", "/videos/hero.mp4"];
// 모바일은 영상이 2개 동시 로드되므로, 상대적으로 가벼운 파일을 우선 시도해 데이터 사용량을 줄임
const MOBILE_SOURCES = ["/videos/hero.mp4", "/videos/hero-web.mp4", "/videos/hero-hd.mp4"];

// 배경 영상 1개를 담당하는 내부 컴포넌트 (모바일 좌/우 분할, PC 풀스크린에서 공용)
function BackgroundVideo({ objectPositionClass, sources }: { objectPositionClass: string; sources: string[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const handleFirstInteraction = () => {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
          };
          window.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });
          window.addEventListener("click", handleFirstInteraction, { once: true });
          window.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true });
        });
    };

    tryPlay();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover scale-[1.01] contrast-[1.04] brightness-[1.02] transition-opacity duration-700 pointer-events-none ${objectPositionClass} ${
        isPlaying ? "opacity-100" : "opacity-90"
      }`}
      poster="/videos/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setIsPlaying(true)}
    >
      {sources.map((src) => (
        <source key={src} src={src} type="video/mp4" />
      ))}
    </video>
  );
}

export default function HeroVideo({ mode = "background", className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (mode !== "inline") return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const handleFirstInteraction = () => {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
          };
          window.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });
          window.addEventListener("click", handleFirstInteraction, { once: true });
          window.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true });
        });
    };

    tryPlay();
  }, [mode]);

  if (mode === "inline") {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/20 ${className}`}>
        <video
          ref={videoRef}
          className={`w-full aspect-video object-cover transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-90"
          }`}
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setIsPlaying(true)}
        >
          <source src="/videos/hero-web.mp4" type="video/mp4" />
          <source src="/videos/hero-hd.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* 세련된 현장 시공 라이브 뱃지 */}
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
      {/* 모바일: 화면이 좌/우로 갈리는 특성에 맞춰 왼쪽은 왼쪽 가장자리로, 오른쪽은 오른쪽 가장자리로 더 치우치게 크롭 */}
      <div className="grid h-full w-full grid-cols-2 md:hidden">
        <div className="relative h-full w-full overflow-hidden">
          <BackgroundVideo objectPositionClass="object-[20%_35%]" sources={MOBILE_SOURCES} />
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <BackgroundVideo objectPositionClass="object-[80%_35%]" sources={MOBILE_SOURCES} />
        </div>
      </div>

      {/* PC/태블릿: 기존 방식대로 풀스크린 단일 영상 */}
      <div className="relative hidden h-full w-full md:block">
        <BackgroundVideo objectPositionClass={className || "object-[center_35%]"} sources={HD_SOURCES} />
      </div>
    </>
  );
}
