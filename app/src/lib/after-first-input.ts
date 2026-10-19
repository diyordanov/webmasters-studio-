/**
 * Resolves on the visitor's first scroll, touch, click or key press, or `idleMs`
 * after the page has loaded, whichever comes first.
 *
 * Used to hold back the heavy hero film (MBs of clips / frames) until it is
 * actually needed: the static first frame already shows exactly what the film
 * starts with, and the page's own paint (LCP) is not left competing with the film
 * for bandwidth on slow mobile connections.
 */
export function afterFirstInput(idleMs = 6000): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    let timer = 0;
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, finish);
      window.removeEventListener("load", arm);
      resolve();
    };
    const arm = () => {
      timer = window.setTimeout(finish, idleMs);
    };
    for (const e of events) window.addEventListener(e, finish, { once: true, passive: true });
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
  });
}
