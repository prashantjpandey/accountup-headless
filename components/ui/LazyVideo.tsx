"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  ariaHidden?: boolean;
  loopStartSeconds?: number;
  loopEndSeconds?: number;
};

const LOOP_EPSILON = 0.05;
const LOOP_THRESHOLD = 0.06;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function LazyVideo({
  src,
  className = "",
  ariaHidden,
  loopStartSeconds,
  loopEndSeconds,
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasLoopWindow = typeof loopStartSeconds === "number";
  const [isLoopReady, setIsLoopReady] = useState(!hasLoopWindow);
  const containerRef = useRef<HTMLDivElement>(null);
  const loopBoundsRef = useRef<{ start: number; end: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const resetToLoopStart = (video: HTMLVideoElement) => {
    if (!hasLoopWindow) return;

    const bounds = loopBoundsRef.current;
    if (!bounds) return;

    if (video.currentTime >= bounds.end - LOOP_THRESHOLD) {
      video.currentTime = bounds.start;
      if (video.paused) {
        void video.play().catch(() => {});
      }
    }
  };

  const onLoadedMetadata = (video: HTMLVideoElement) => {
    if (!hasLoopWindow || loopStartSeconds === undefined) {
      loopBoundsRef.current = null;
      setIsLoopReady(true);
      return;
    }

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      loopBoundsRef.current = null;
      setIsLoopReady(true);
      return;
    }

    if (duration <= LOOP_EPSILON * 2) {
      loopBoundsRef.current = { start: 0, end: duration };
      setIsLoopReady(true);
      return;
    }

    const start = clamp(loopStartSeconds, 0, duration - LOOP_EPSILON);
    const requestedEnd = loopEndSeconds ?? duration;
    const end = clamp(requestedEnd, start + LOOP_EPSILON, duration);

    loopBoundsRef.current = { start, end };
    video.currentTime = start;
    setIsLoopReady(true);
    void video.play().catch(() => {});
  };

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          src={src}
          autoPlay
          muted
          loop={!hasLoopWindow}
          playsInline
          preload="metadata"
          className={`w-full h-full object-contain ${hasLoopWindow && !isLoopReady ? "opacity-0" : "opacity-100"}`}
          aria-hidden={ariaHidden}
          onLoadStart={() => {
            if (hasLoopWindow) {
              setIsLoopReady(false);
            }
          }}
          onLoadedMetadata={(event) => onLoadedMetadata(event.currentTarget)}
          onTimeUpdate={(event) => resetToLoopStart(event.currentTarget)}
          onEnded={(event) => resetToLoopStart(event.currentTarget)}
          onError={() => setIsLoopReady(true)}
        />
      ) : (
        <div
          className="w-full h-full min-h-[180px] flex items-center justify-center"
          aria-hidden
        >
          <span className="text-sm text-charcoal/40">Loading...</span>
        </div>
      )}
    </div>
  );
}
