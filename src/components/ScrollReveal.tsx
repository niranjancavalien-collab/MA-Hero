import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  containerClassName?: string;
  wordClassName?: string;
  baseRotation?: number;
  baseOpacity?: number;
  blurStrength?: number;
  start?: string;
  end?: string;
  as?: "h2" | "h3" | "p";
}

/**
 * Splits text into words and, as the block scrolls through the trigger
 * range, un-rotates the whole block while each word individually
 * un-blurs and fades in with a slight stagger — three separate
 * ScrollTrigger-driven tweens scrubbed to scroll position.
 */
export default function ScrollReveal({
  children,
  containerClassName = "",
  wordClassName = "",
  baseRotation = 5,
  baseOpacity = 0.12,
  blurStrength = 8,
  start = "top 85%",
  end = "top 40%",
  as = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = useMemo(() => children.trim().split(/\s+/), [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordEls = el.querySelectorAll<HTMLSpanElement>("[data-sr-word]");
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const rotationTween = gsap.fromTo(
        el,
        { rotate: baseRotation, transformOrigin: "0% 50%" },
        {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );

      const opacityTween = gsap.fromTo(
        wordEls,
        { opacity: baseOpacity },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );

      const blurTween = gsap.fromTo(
        wordEls,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );

      [rotationTween, opacityTween, blurTween].forEach((tween) => {
        const st = tween.scrollTrigger;
        if (st) triggers.push(st);
      });
    }, containerRef);

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, baseRotation, baseOpacity, blurStrength, start, end]);

  const Tag = as;

  return (
    <Tag ref={containerRef as never} className={containerClassName} style={{ willChange: "transform" }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-sr-word
          className={`inline-block ${wordClassName}`}
          style={{ willChange: "opacity, filter" }}
        >
          {word}
          {i !== words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
