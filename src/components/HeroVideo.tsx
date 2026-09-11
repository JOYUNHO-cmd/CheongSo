"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  /** 모바일 전용 무손실 인라인 플레이어 모드 */
  mode?: "background" | "inline";
  className?: string;
}

export default function HeroVideo({ mode = "background", className = "" }: HeroVideoProps) {
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
    <video
      ref={videoRef}
      id="hero-background-video"
      className={`absolute inset-0 h-full w-full object-cover scale-[1.01] contrast-[1.04] brightness-[1.02] transition-opacity duration-700 pointer-events-none ${
        isPlaying ? "opacity-100" : "opacity-90"
      } ${className}`}
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
  );
}
