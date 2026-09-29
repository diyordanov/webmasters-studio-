import { useEffect, useRef } from "react";

import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";

const FRAMES = 181;
/** Decoded frames kept in memory at once. Everything else stays as small compressed blobs. */
const CACHE = 10;
const frameSrc = (i: number) => `/assets/world/m/f-${String(i + 1).padStart(3, "0")}.webp`;

type Decoded = CanvasImageSource & { close?: () => void };

/**
 * Mobile journey: the film plays as an image sequence on a canvas pinned at
 * the top of the screen (no video seeking, so no stutter), while the chapter
 * copy scrolls underneath it and never overlaps the animation.
 *
 * Memory: phones kill tabs that hold hundreds of decoded frames, so frames are
 * downloaded as compressed blobs (~20 KB each) and only a small rolling cache
 * of decoded bitmaps is kept around the current scroll position.
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
    const blobs: Array<Blob | null> = new Array(FRAMES).fill(null);
    const decoded = new Map<number, Decoded>();
    const decoding = new Set<number>();
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-mj-ch]"));
    const bar = root.querySelector<HTMLElement>("[data-mj-bar]");
    const count = root.querySelector<HTMLElement>("[data-mj-count]");
    const abort = new AbortController();
    let alive = true;
    let cur = 0;
    let want = 0;
    let drawn = -1;
    let active = -1;
    let raf = 0;

    const decode = async (i: number): Promise<Decoded | null> => {
      const blob = blobs[i];
      if (!blob) return null;
      if (typeof createImageBitmap === "function") {
        try {
          return await createImageBitmap(blob);
        } catch {
          /* fall through to <img> decode */
        }
      }
      const url = URL.createObjectURL(blob);
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        return img;
      } catch {
        return null;
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    const nearestBlob = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (i - d >= 0 && blobs[i - d]) return i - d;
        if (i + d < FRAMES && blobs[i + d]) return i + d;
      }
      return -1;
    };

    const evict = () => {
      if (decoded.size <= CACHE) return;
      const keys = Array.from(decoded.keys()).sort((a, b) => Math.abs(b - want) - Math.abs(a - want));
      for (const k of keys) {
        if (decoded.size <= CACHE) break;
        if (k === drawn) continue;
        decoded.get(k)?.close?.();
        decoded.delete(k);
      }
    };

    const ensure = (i: number) => {
      if (i < 0 || i >= FRAMES || decoded.has(i) || decoding.has(i) || !blobs[i]) return;
      decoding.add(i);
      void decode(i).then((bmp) => {
        decoding.delete(i);
        if (!alive || !bmp) {
          bmp?.close?.();
          return;
        }
        decoded.set(i, bmp);
        evict();
      });
    };

    const draw = () => {
      const n = nearestBlob(want);
      if (n < 0) return;
      ensure(n);
      ensure(n + 1);
      ensure(n - 1);
      // Draw the requested frame if it is decoded, otherwise the closest decoded one.
      let pick = -1;
      let best = Infinity;
      decoded.forEach((_, k) => {
        const d = Math.abs(k - want);
        if (d < best) {
          best = d;
          pick = k;
        }
      });
      if (pick < 0 || pick === drawn) return;
      const bmp = decoded.get(pick);
      if (!bmp) return;
      // Cover-fit: the frame is taller than 16:9 on phones, so crop the sides.
      const iw = (bmp as { width: number }).width || 960;
      const ih = (bmp as { height: number }).height || 540;
      const k = Math.max(canvas.width / iw, canvas.height / ih);
      const dw = iw * k;
      const dh = ih * k;
      ctx.drawImage(bmp, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
      drawn = pick;
    };

    // Download compressed frames progressively: coarse first, then fill in.
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
    // Slow or data-saving connections get every second frame (half the data, still smooth).
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lite = !!conn && (conn.saveData === true || /(^|-)(2g|3g)$/.test(conn.effectiveType ?? ""));
    if (lite) {
      for (let i = order.length - 1; i >= 0; i--) if (order[i] % 2 === 1) order.splice(i, 1);
    }
    const fetchAll = async () => {
      // Let the page itself finish loading before the frames compete for bandwidth.
      if (document.readyState !== "complete") {
        await new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
      }
      let next = 0;
      const worker = async () => {
        while (alive && next < order.length) {
          const i = order[next++];
          try {
            const res = await fetch(frameSrc(i), { signal: abort.signal });
            if (res.ok) blobs[i] = await res.blob();
          } catch {
            return;
          }
        }
      };
      await Promise.all([worker(), worker(), worker(), worker()]);
    };
    void fetchAll();

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawn = -1;
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
      want = Math.round(cur);
      draw();
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

    size();
    window.addEventListener("resize", size);
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      abort.abort();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      decoded.forEach((b) => b.close?.());
      decoded.clear();
    };
  }, [enabled]);

  return (
    <section className="wm-mj" ref={rootRef} aria-label="Как изграждаме сайт">
      <div className="wm-mj__stage">
        <div className="wm-mj__frame">
          <img className="wm-mj__poster" src={frameSrc(0)} alt="" width={960} height={540} />
          <canvas ref={canvasRef} className="wm-mj__canvas" aria-hidden="true" />
        </div>
      </div>
      <div className="wm-mj__chapters">
        {scenes.map((s, i) => (
          <article className={`wm-mj__ch${i === 0 ? " is-active" : ""}`} key={s.id} data-mj-ch="">
            {/* Headings only once the mobile layout is active, so the page never carries a second set of H1/H2. */}
            {!enabled ? (
              <p className="wm-mj__title">{s.title}</p>
            ) : i === 0 ? (
              <h1 className="wm-mj__title">{s.title}</h1>
            ) : (
              <h2 className="wm-mj__title">{s.title}</h2>
            )}
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
