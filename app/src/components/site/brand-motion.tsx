import { useEffect, useRef } from "react";

import { createFramePlayer } from "./frame-player";

/** Icon → wordmark transition, rendered as transparent WebP frames. */
export const NAV_FRAMES = 61;
const navSrc = (i: number) => `/assets/brand/nav/f-${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Nav logo: shows the W icon; on hover (desktop) it plays forward into the
 * wordmark, and back to the icon when the pointer leaves.
 */
export function NavLogo() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const link = wrap?.closest("a");
    if (!wrap || !canvas || !link) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const player = createFramePlayer(canvas, NAV_FRAMES, navSrc, { cache: 16, workers: 2 });
    if (!player) return;
    let cur = 0;
    let target = 0;
    let raf = 0;
    const step = () => {
      const dir = Math.sign(target - cur);
      cur += dir * 1.1;
      if ((dir > 0 && cur >= target) || (dir < 0 && cur <= target)) cur = target;
      player.setFrame(cur);
      wrap.classList.toggle("is-playing", cur > 0.5);
      if (cur !== target) raf = requestAnimationFrame(step);
      else raf = 0;
    };
    const go = (t: number) => {
      target = t;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const enter = () => go(NAV_FRAMES - 1);
    const leave = () => go(0);
    link.addEventListener("pointerenter", enter);
    link.addEventListener("pointerleave", leave);
    link.addEventListener("focus", enter);
    link.addEventListener("blur", leave);
    return () => {
      cancelAnimationFrame(raf);
      link.removeEventListener("pointerenter", enter);
      link.removeEventListener("pointerleave", leave);
      link.removeEventListener("focus", enter);
      link.removeEventListener("blur", leave);
      player.destroy();
    };
  }, []);

  return (
    <span className="wm-logo" ref={wrapRef} aria-hidden="true">
      <img className="wm-logo__icon" src="/assets/brand/nav/f-001.webp" alt="" width={240} height={96} />
      <canvas ref={canvasRef} className="wm-logo__canvas" />
    </span>
  );
}
