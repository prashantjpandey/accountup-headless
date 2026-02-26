 "use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { clientLogos } from "@/lib/assets";
import { fadeUp, useReducedMotionSafe } from "@/lib/animations";

export function TrustedBy() {
  const reduceMotion = useReducedMotionSafe();
  const logos = [...clientLogos, ...clientLogos];
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragOriginRef = useRef(0);
  const currentXRef = useRef(0);
  const singleWidthRef = useRef(0);
  const hasInitRef = useRef(false);
  const startOffsetRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const wrapValue = (value: number, min: number, max: number) => {
    const range = max - min;
    return ((value - min) % range + range) % range + min;
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;

    if (!marquee || !track) {
      return undefined;
    }

    const measure = () => {
      const fullWidth = track.scrollWidth;
      if (fullWidth <= 0) return;
      singleWidthRef.current = fullWidth / 2;
      const startOffset = Math.min(
        0,
        -singleWidthRef.current + marquee.clientWidth
      );
      startOffsetRef.current = startOffset;
      if (!hasInitRef.current) {
        currentXRef.current = startOffset;
        hasInitRef.current = true;
      } else {
        currentXRef.current = wrapValue(
          currentXRef.current,
          startOffset - singleWidthRef.current,
          startOffset
        );
      }
      track.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(marquee);

    if (!reduceMotion) {
      const speed = 0.04;
      const tick = (time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;

        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;

        if (!isDraggingRef.current) {
          const startOffset = startOffsetRef.current;
          const singleWidth = singleWidthRef.current || 1;

          currentXRef.current -= delta * speed;
          currentXRef.current = wrapValue(
            currentXRef.current,
            startOffset - singleWidth,
            startOffset
          );

          track.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
        }

        animationRef.current = requestAnimationFrame(tick);
      };

      animationRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [reduceMotion]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    if ((event.target as Element)?.closest?.("a")) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = event.clientX;

    const singleWidth = singleWidthRef.current || 1;
    const startOffset = startOffsetRef.current;
    const rangeMin = startOffset - singleWidth;
    const rangeMax = startOffset;

    dragOriginRef.current = wrapValue(
      currentXRef.current,
      rangeMin,
      rangeMax
    );

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const delta = event.clientX - dragStartRef.current;
    const singleWidth = singleWidthRef.current || 1;
    const startOffset = startOffsetRef.current;
    const rangeMin = startOffset - singleWidth;
    const rangeMax = startOffset;

    let next = dragOriginRef.current + delta;
    next = wrapValue(next, rangeMin, rangeMax);

    currentXRef.current = next;
    trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <motion.section
      className="hero-bleed py-16 px-6"
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 text-center text-sm font-semibold text-charcoal">
          Trusted by Startup Founders
        </p>

        <div className="flex items-center justify-center">
          <div
            ref={marqueeRef}
            className={`logo-marquee w-full ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerLeave={stopDragging}
            onPointerCancel={stopDragging}
          >
            <div ref={trackRef} className="logo-track">
              {logos.map(({ name, src, href }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex flex-none items-center justify-center px-5"
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${name} website`}
                    >
                      <Image
                        src={src}
                        alt={name}
                        width={360}
                        height={112}
                        draggable={false}
                        className="h-[4.5rem] w-auto grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0 sm:h-20 md:h-[5.5rem]"
                      />
                    </a>
                  ) : (
                    <Image
                      src={src}
                      alt={name}
                      width={360}
                      height={112}
                      draggable={false}
                      className="h-[4.5rem] w-auto grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0 sm:h-20 md:h-[5.5rem]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          overflow: hidden;
          cursor: grab;
          user-select: none;
          touch-action: pan-y;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
        }

        .logo-marquee.is-dragging {
          cursor: grabbing;
        }

        .logo-track {
          display: flex;
          align-items: center;
          gap: 3.25rem;
          white-space: nowrap;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .logo-track {
            gap: 2.25rem;
          }
        }
      `}</style>
    </motion.section>
  );
}
