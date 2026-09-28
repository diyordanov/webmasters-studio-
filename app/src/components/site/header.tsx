import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import { NavLogo } from "./brand-motion";
import { CONTACTS } from "./chrome";

const LINKS = [
  { id: "uslugi", label: "Услуги" },
  { id: "proekti", label: "Проекти" },
  { id: "za-kogo", label: "За кого" },
  { id: "proces", label: "Процес" },
  { id: "oferta", label: "Оферта" },
  { id: "vaprosi", label: "Въпроси" },
];

const REEL = ["interior", "dental", "photo", "promo", "local"].map((n) => `/assets/work/${n}-900.webp`);

/**
 * Header: logo, then the links right next to it, CTA on the far right.
 * No frames: the bar is transparent over the hero and turns into a soft
 * blurred navy strip after scrolling, with a lime scroll-progress hairline.
 * Links get a sliding underline and the current section is marked.
 * On phones a hamburger opens a full-screen menu with a moving strip of
 * project visuals under the links.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [section, setSection] = useState(-1);
  const progRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    let was = false;
    let cur = -2;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      if (progRef.current) progRef.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
      const s = y > 40;
      if (s !== was) {
        was = s;
        setScrolled(s);
      }
      let idx = -1;
      LINKS.forEach((l, i) => {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < vh * 0.4) idx = i;
      });
      if (idx !== cur) {
        cur = idx;
        setSection(idx);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!sheet) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [sheet]);

  return (
    <>
      <header className={`wm-top${scrolled ? " is-scrolled" : ""}${sheet ? " is-sheet" : ""}`}>
        <div className="wm-top__inner">
          <a className="wm-top__logo" href="#top" aria-label="Web Masters Studio, начало" onClick={() => setSheet(false)}>
            <NavLogo />
          </a>
          <nav className="wm-top__links" aria-label="Основна навигация">
            {LINKS.map((l, i) => (
              <a key={l.id} href={`#${l.id}`} className={i === section ? "is-current" : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="wm-top__cta" href="#kontakt">
            Заявете оферта
            <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="wm-top__burger"
            aria-expanded={sheet}
            aria-controls="wm-sheet"
            aria-label={sheet ? "Затвори менюто" : "Отвори менюто"}
            onClick={() => setSheet((s) => !s)}
          >
            <i />
            <i />
          </button>
        </div>
        <span className="wm-top__prog" aria-hidden="true">
          <i ref={progRef} />
        </span>
      </header>

      <div id="wm-sheet" className={`wm-sheet${sheet ? " is-open" : ""}`} aria-hidden={!sheet}>
        <ul className="wm-sheet__links">
          {[{ id: "top", label: "Начало" }, ...LINKS, { id: "kontakt", label: "Контакт" }].map((l, i) => (
            <li key={l.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${l.id}`} tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
                <span className="wm-mono">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="wm-sheet__reel" aria-hidden="true">
          <div className="wm-sheet__track">
            {[...REEL, ...REEL].map((src, i) => (
              <img key={i} src={sheet ? src : undefined} alt="" width={180} height={135} />
            ))}
          </div>
        </div>

        <div className="wm-sheet__foot">
          <a className="wm-sheet__cta" href="#kontakt" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
            Заявете оферта
            <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
          </a>
          <div className="wm-sheet__contacts">
            <a href={CONTACTS.office.href} tabIndex={sheet ? 0 : -1}>
              <small>{CONTACTS.office.label}</small>
              {CONTACTS.office.display}
            </a>
            <a href={CONTACTS.email.href} tabIndex={sheet ? 0 : -1}>
              <small>Имейл</small>
              {CONTACTS.email.display}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
