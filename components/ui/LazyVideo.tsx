"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  ariaHidden?: boolean;
};

export function LazyVideo({ src, className = "", ariaHidden }: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-contain"
          aria-hidden={ariaHidden}
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
