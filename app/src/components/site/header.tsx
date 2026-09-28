import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import { NavLogo } from "./brand-motion";
import { CONTACTS, NavCta } from "./chrome";

const SECTIONS = [
  { id: "top", label: "Начало", img: "/assets/world/scene-04-poster.png" },
  { id: "uslugi", label: "Услуги", img: "/assets/world/scene-03-poster.png" },
  { id: "proekti", label: "Проекти", img: "/assets/work/interior-900.webp" },
  { id: "za-kogo", label: "За кого", img: "/assets/work/local-900.webp" },
  { id: "proces", label: "Процес", img: "/assets/world/scene-02-poster.png" },
  { id: "oferta", label: "Оферта", img: "/assets/work/promo-900.webp" },
  { id: "vaprosi", label: "Въпроси", img: "/assets/work/photo-900.webp" },
  { id: "kontakt", label: "Контакт", img: "/assets/work/dental-900.webp" },
];

const RING = 2 * Math.PI * 15;

/**
 * "Dynamic island" header: logo, island and CTA float as separate pieces.
 * The island shows the section you are in plus a scroll-progress ring, and
 * morphs into a large menu panel (a bottom sheet on phones).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(0);
  const [hover, setHover] = useState(0);
  const [hidden, setHidden] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    let cur = -1;
    let hid = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING * (1 - Math.min(1, y / max)));
      let idx = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < vh * 0.4) idx = i;
      });
      if (idx !== cur) {
        cur = idx;
        setSection(idx);
      }
      const dy = y - lastY;
      if (Math.abs(dy) > 4) {
        const h = dy > 0 && y > 240 && !openRef.current;
        if (h !== hid) {
          hid = h;
          setHidden(h);
        }
        lastY = y;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!open) return;
    setHover(section);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, section]);

  const current = SECTIONS[section];

  return (
    <>
      <div className={`wm-scrim${open ? " is-open" : ""}`} aria-hidden="true" />
      <header className={`wm-hdr${hidden ? " is-hidden" : ""}${open ? " is-open" : ""}`}>
        <a className="wm-hdr__logo" href="#top" aria-label="Web Masters Studio, начало">
          <NavLogo />
        </a>

        <div className="wm-island" ref={islandRef}>
          <button
            type="button"
            className="wm-island__pill"
            aria-expanded={open}
            aria-controls="wm-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="wm-island__ring" viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="15" />
              <circle ref={ringRef} cx="18" cy="18" r="15" style={{ strokeDasharray: RING, strokeDashoffset: RING }} />
            </svg>
            <span className="wm-island__label">
              <span key={current.id} className="wm-island__now">
                <b>0{section + 1}</b> {current.label}
              </span>
            </span>
            <span className="wm-island__menu">{open ? "Затвори" : "Меню"}</span>
            <span className="wm-island__burger" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>

          <nav id="wm-menu" className="wm-island__panel" aria-label="Основна навигация" aria-hidden={!open}>
            <ul className="wm-island__links">
              {SECTIONS.map((s, i) => (
                <li key={s.id} style={{ "--i": i } as CSSProperties}>
                  <a
                    href={`#${s.id}`}
                    tabIndex={open ? 0 : -1}
                    className={i === section ? "is-current" : undefined}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="wm-mono">0{i + 1}</span>
                    <span className="wm-island__txt">{s.label}</span>
                    <ArrowUpRight size={22} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="wm-island__side">
              <div className="wm-island__preview" aria-hidden="true">
                {open
                  ? SECTIONS.map((s, i) => (
                      <img key={s.id} src={s.img} alt="" className={i === hover ? "is-on" : undefined} loading="lazy" />
                    ))
                  : null}
                <span className="wm-island__cap wm-mono">
                  0{hover + 1} / 0{SECTIONS.length} · {SECTIONS[hover].label}
                </span>
              </div>
              <div className="wm-island__contacts">
                <a href={CONTACTS.office.href} tabIndex={open ? 0 : -1}>
                  <small>{CONTACTS.office.label}</small>
                  {CONTACTS.office.display}
                </a>
                <a href={CONTACTS.email.href} tabIndex={open ? 0 : -1}>
                  <small>Имейл</small>
                  {CONTACTS.email.display}
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="wm-hdr__cta">
          <NavCta />
        </div>
      </header>
    </>
  );
}
