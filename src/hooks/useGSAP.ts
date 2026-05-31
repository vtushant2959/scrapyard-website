"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPReveal(selector: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(selector);

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}

export function useGSAPCounter(value: number, trigger: boolean) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !trigger) return;
    gsap.fromTo(
      ref.current,
      { textContent: 0 },
      {
        textContent: value,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (ref.current) {
            ref.current.textContent = Math.round(
              parseFloat(ref.current.textContent || "0")
            ).toString();
          }
        },
      }
    );
  }, [value, trigger]);

  return ref;
}
