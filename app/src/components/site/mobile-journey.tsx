import { useEffect, useRef } from "react";

import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";

const FRAMES = 181;
const frameSrc = (i: number) => `/assets/world/m/f-${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Mobile journey: the film plays as a pre-decoded image sequence on a canvas
 * pinned at the top of the screen (no video seeking, so no stutter), while the
 * chapter copy scrolls underneath it and never overlaps the animation.
 */
export function MobileJourney({ scenes, enabled }: { scenes: ScrollScrubScene[]; enabled: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs: Array<HTMLImageElement | null> = new Array(FRAMES).fill(null);
    const ready: boolean[] = new Array(FRAMES).fill(false);
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-mj-ch]"));
    const bar = root.querySelector<HTMLElement>("[data-mj-bar]");
    const count = root.querySelector<HTMLElement>("[data-mj-count]");
    let alive = true;
    let cur = 0;
    let drawn = -1;
    let active = -1;
    let raf = 0;
    let pumpTimer = 0;

    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (i - d >= 0 && ready[i - d]) return i - d;
        if (i + d < FRAMES && ready[i + d]) return i + d;
      }
      return -1;
    };
    const draw = (i: number) => {
      const n = nearest(i);
      if (n < 0 || n === drawn) return;
      const im = imgs[n];
      if (!im) return;
      ctx.drawImage(im, 0, 0, canvas.width, canvas.height);
      drawn = n;
    };
    const load = (i: number) => {
      if (imgs[i]) return;
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        ready[i] = true;
        if (alive) {
          drawn = -1;
          draw(Math.round(cur));
        }
      };
      im.src = frameSrc(i);
      imgs[i] = im;
    };
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [30, 10, 3, 1]) {
      for (let i = 0; i < FRAMES; i += step) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }
    let oi = 0;
    const pump = () => {
      if (!alive) return;
      for (let k = 0; k < 8 && oi < order.length; k++) load(order[oi++]);
      if (oi < order.length) pumpTimer = window.setTimeout(pump, 50);
    };
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1;
      draw(Math.round(cur));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const span = r.height - vh;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const target = p * (FRAMES - 1);
      cur += (target - cur) * (reduce ? 1 : 0.2);
      draw(Math.round(cur));
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
      let best = 0;
      let bd = Infinity;
      chapters.forEach((c, i) => {
        const cr = c.getBoundingClientRect();
        const d = Math.abs(cr.top + cr.height / 2 - vh * 0.7);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      if (best !== active) {
        chapters.forEach((c, i) => c.classList.toggle("is-active", i === best));
        if (count) count.textContent = String(best + 1).padStart(2, "0");
        active = best;
      }
    };

    load(0);
    pump();
    size();
    window.addEventListener("resize", size);
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(pumpTimer);
      window.removeEventListener("resize", size);
    };
  }, [enabled]);

  return (
    <section className="wm-mj" ref={rootRef} aria-label="Как изграждаме сайт">
      <div className="wm-mj__stage">
        <div className="wm-mj__frame">
          <img className="wm-mj__poster" src={frameSrc(0)} alt="" width={960} height={540} />
          <canvas ref={canvasRef} className="wm-mj__canvas" aria-hidden="true" />
        </div>
        <div className="wm-mj__meta" aria-hidden="true">
          <span className="wm-mono" data-mj-count="">
            01
          </span>
          <span className="wm-mj__bar">
            <i data-mj-bar="" />
          </span>
          <span className="wm-mono">0{scenes.length}</span>
        </div>
      </div>
      <div className="wm-mj__chapters">
        {scenes.map((s, i) => (
          <article className={`wm-mj__ch${i === 0 ? " is-active" : ""}`} key={s.id} data-mj-ch="">
            {i === 0 ? <h1 className="wm-mj__title">{s.title}</h1> : <h2 className="wm-mj__title">{s.title}</h2>}
            <p className="wm-mj__body">{s.body}</p>
            {s.tags?.length ? (
              <ul className="wm-mj__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
            {s.actions ? <div className="wm-mj__actions">{s.actions}</div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
