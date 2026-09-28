/**
 * Low-memory image-sequence player for <canvas>.
 *
 * Frames are downloaded as compressed blobs and only a small rolling cache of
 * decoded bitmaps is kept, so long sequences never exhaust phone memory.
 * Frames may carry alpha: the canvas is cleared before every draw, so the
 * sequence sits on whatever background is behind it.
 */
type Decoded = CanvasImageSource & { close?: () => void };

export interface FramePlayer {
  /** Request a frame (fractional values are rounded). Draws the nearest ready frame. */
  setFrame: (f: number) => void;
  /** Re-measure the canvas backing store (call on resize). */
  resize: () => void;
  destroy: () => void;
}

export function createFramePlayer(
  canvas: HTMLCanvasElement,
  count: number,
  src: (i: number) => string,
  opts: { cache?: number; workers?: number; onDraw?: (frame: number) => void } = {},
): FramePlayer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const cache = opts.cache ?? 12;
  const blobs: Array<Blob | null> = new Array(count).fill(null);
  const decoded = new Map<number, Decoded>();
  const decoding = new Set<number>();
  const abort = new AbortController();
  let alive = true;
  let want = 0;
  let drawn = -1;

  const decode = async (i: number): Promise<Decoded | null> => {
    const blob = blobs[i];
    if (!blob) return null;
    if (typeof createImageBitmap === "function") {
      try {
        return await createImageBitmap(blob);
      } catch {
        /* fall back to <img> */
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

  const evict = () => {
    if (decoded.size <= cache) return;
    const keys = Array.from(decoded.keys()).sort((a, b) => Math.abs(b - want) - Math.abs(a - want));
    for (const k of keys) {
      if (decoded.size <= cache) break;
      if (k === drawn) continue;
      decoded.get(k)?.close?.();
      decoded.delete(k);
    }
  };

  const draw = () => {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    drawn = pick;
    opts.onDraw?.(pick);
  };

  const ensure = (i: number) => {
    if (i < 0 || i >= count || decoded.has(i) || decoding.has(i) || !blobs[i]) return;
    decoding.add(i);
    void decode(i).then((bmp) => {
      decoding.delete(i);
      if (!alive || !bmp) {
        bmp?.close?.();
        return;
      }
      decoded.set(i, bmp);
      evict();
      draw();
    });
  };

  const nearestBlob = (i: number) => {
    for (let d = 0; d < count; d++) {
      if (i - d >= 0 && blobs[i - d]) return i - d;
      if (i + d < count && blobs[i + d]) return i + d;
    }
    return -1;
  };

  const setFrame = (f: number) => {
    want = Math.max(0, Math.min(count - 1, Math.round(f)));
    const n = nearestBlob(want);
    if (n < 0) return;
    ensure(n);
    ensure(n + 1);
    ensure(n - 1);
    draw();
  };

  const order: number[] = [];
  const seen = new Set<number>();
  for (const step of [Math.max(1, Math.floor(count / 6)), 6, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  // Always include the final frame early so a jump to the end resolves fast.
  const lastAt = order.indexOf(count - 1);
  if (lastAt > 1) {
    order.splice(lastAt, 1);
    order.splice(1, 0, count - 1);
  }

  let next = 0;
  const worker = async () => {
    while (alive && next < order.length) {
      const i = order[next++];
      try {
        const res = await fetch(src(i), { signal: abort.signal });
        if (res.ok) {
          blobs[i] = await res.blob();
          if (Math.abs(i - want) <= 1) setFrame(want);
        }
      } catch {
        return;
      }
    }
  };
  for (let w = 0; w < (opts.workers ?? 4); w++) void worker();

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    drawn = -1;
    draw();
  };
  resize();

  return {
    setFrame,
    resize,
    destroy: () => {
      alive = false;
      abort.abort();
      decoded.forEach((b) => b.close?.());
      decoded.clear();
    },
  };
}
