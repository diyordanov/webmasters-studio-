import { useEffect, useRef, useState, type CSSProperties } from "react";

import { SplitHeading } from "./split";

const NICHES = [
  { name: "Интериорни студия", note: "Портфолио, което показва стила ви и носи запитвания.", img: "/assets/niche/interior.webp", features: ["Портфолио галерии", "Форма за запитване", "Бърза мобилна версия"] },
  { name: "Дентални и медицински практики", note: "Доверие, ясни услуги и лесен начин да ви потърсят.", img: "/assets/niche/dental.webp", features: ["Услуги и цени", "Онлайн записване", "Локално SEO"] },
  { name: "Фотографи", note: "Галерии, които се зареждат бързо на всеки телефон.", img: "/assets/niche/photo.webp", features: ["Галерии на цял екран", "Резервации", "Оптимизирани снимки"] },
  { name: "Магазини и доставчици", note: "Каталози и онлайн поръчки без излишни стъпки.", img: "/assets/niche/promo.webp", features: ["Каталог и филтри", "Онлайн поръчки", "WooCommerce"] },
  { name: "Местен бизнес", note: "Видимост в Google за вашия град и квартал.", img: "/assets/niche/local.webp", features: ["Google профил", "Локално SEO", "Отзиви и контакт"] },
];

/**
 * "За кого работим": a pinned 3D card deck. Scrolling deals the cards one by
 * one (the passed card flies off, the next rises to the front), the niche
 * list and details follow, and on desktop the front card tilts to the cursor.
 */
export function AudienceSection() {
  const secRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const cards = Array.from(sec.querySelectorAll<HTMLElement>("[data-deck-card]"));
    const stack = sec.querySelector<HTMLElement>("[data-deck]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = cards.length;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let f = 0;
    let last = 0;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (!stack || e.pointerType !== "mouse") return;
      const r = stack.getBoundingClientRect();
      tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 16;
      tilt.tx = ((e.clientY - r.top) / r.height - 0.5) * -12;
    };
    const onLeave = () => {
      tilt.tx = 0;
      tilt.ty = 0;
    };
    stack?.addEventListener("pointermove", onMove);
    stack?.addEventListener("pointerleave", onLeave);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return;
      const span = r.height - vh;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const target = p * (n - 1);
      f += (target - f) * (reduce ? 1 : 0.12);
      tilt.x += (tilt.tx - tilt.x) * 0.1;
      tilt.y += (tilt.ty - tilt.y) * 0.1;
      sec.style.setProperty("--deck-p", p.toFixed(4));
      cards.forEach((c, i) => {
        const d = i - f;
        let t: string;
        let o: number;
        if (d >= 0) {
          t = `translate3d(0,${(d * 30).toFixed(1)}px,${(-d * 110).toFixed(1)}px) rotate(${(d * 3).toFixed(2)}deg) scale(${(1 - d * 0.04).toFixed(4)})`;
          o = Math.max(0, 1 - d * 0.3);
        } else {
          t = `translate3d(${(d * 14).toFixed(1)}%,${(d * 120).toFixed(1)}%,0) rotate(${(d * 14).toFixed(2)}deg) scale(${(1 + d * 0.08).toFixed(4)})`;
          o = Math.max(0, 1 + d * 1.15);
        }
        if (Math.abs(d) < 0.6) t = `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) ${t}`;
        c.style.transform = t;
        c.style.opacity = o.toFixed(3);
        c.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      });
      const a = Math.min(n - 1, Math.max(0, Math.round(f)));
      if (a !== last) {
        last = a;
        setActive(a);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      stack?.removeEventListener("pointermove", onMove);
      stack?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const goTo = (i: number) => {
    const sec = secRef.current;
    if (!sec) return;
    const top = window.scrollY + sec.getBoundingClientRect().top;
    const span = sec.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * i) / (NICHES.length - 1) + 2, behavior: "smooth" });
  };

  return (
    <section className="wm-deckwrap" ref={secRef} aria-labelledby="aud-h" id="za-kogo">
      <div className="wm-deck__sticky">
        <div className="wm-wrap wm-deck__grid">
          <div className="wm-deck__copy">
            <SplitHeading id="aud-h" text="За кого работим." />
            <div className="wm-deck__index" aria-hidden="true">
              <span key={active} className="wm-deck__num">
                0{active + 1}
              </span>
              <span className="wm-deck__track">
                <i />
              </span>
              <span className="wm-mono">0{NICHES.length}</span>
            </div>
            <ul className="wm-deck__list">
              {NICHES.map((n, i) => (
                <li key={n.name}>
                  <button type="button" className={i === active ? "is-active" : undefined} aria-pressed={i === active} onClick={() => goTo(i)}>
                    <span className="wm-mono">0{i + 1}</span>
                    {n.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="wm-deck__details">
              {NICHES.map((n, i) => (
                <div key={n.name} className={`wm-deck__detail${i === active ? " is-active" : ""}`} aria-hidden={i !== active}>
                  <h3>{n.name}</h3>
                  <p>{n.note}</p>
                  <ul>
                    {n.features.map((ft, k) => (
                      <li key={ft} style={{ "--k": k } as CSSProperties}>
                        {ft}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="wm-deck" data-deck="">
            {NICHES.map((n, i) => (
              <figure className="wm-deck__card" key={n.name} data-deck-card="" style={{ "--d": i } as CSSProperties}>
                <img src={n.img} srcSet={`${n.img.replace(".webp", "-900.webp")} 900w, ${n.img} 1800w`} sizes="(max-width: 860px) 100vw, 900px" alt={`Концепция на сайт: ${n.name}`} width={1800} height={1350} loading="lazy" />
                <span className="wm-deck__glare" aria-hidden="true" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
