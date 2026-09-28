import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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

/**
 * Header: a bare logo on the left and ONE capsule on the right that holds the
 * section links, the menu toggle and the lime CTA together.
 * - At the top of the page the capsule is expanded; after scrolling it folds
 *   down to "Меню + Заявете оферта" and unfolds again on hover.
 * - A soft highlight glides under the hovered link and rests on the section
 *   you are in; a lime hairline along the capsule shows scroll progress.
 * - On phones "Меню" opens a full-screen sheet with a circular reveal.
 */
export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [section, setSection] = useState(-1);
  const ulRef = useRef<HTMLUListElement>(null);
  const blobRef = useRef<HTMLLIElement>(null);
  const progRef = useRef<HTMLElement>(null);
  const hoverIdx = useRef(-1);
  const expanded = !compact || pinned || hovering;

  const moveBlob = useCallback((idx: number) => {
    const ul = ulRef.current;
    const blob = blobRef.current;
    if (!ul || !blob) return;
    const a = idx >= 0 ? ul.querySelectorAll<HTMLAnchorElement>("a")[idx] : null;
    if (!a) {
      blob.style.opacity = "0";
      return;
    }
    blob.style.opacity = "1";
    blob.style.width = `${a.offsetWidth}px`;
    blob.style.transform = `translateX(${a.offsetLeft}px)`;
  }, []);

  useEffect(() => {
    let raf = 0;
    let wasCompact = false;
    let cur = -2;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      if (progRef.current) progRef.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
      const c = y > 120;
      if (c !== wasCompact) {
        wasCompact = c;
        setCompact(c);
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

  // Rest the highlight on the current section whenever nothing is hovered.
  useEffect(() => {
    if (hoverIdx.current < 0) {
      const t = window.setTimeout(() => moveBlob(expanded ? section : -1), expanded ? 250 : 0);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [section, expanded, moveBlob]);

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

  const onToggle = () => {
    if (window.matchMedia("(max-width: 860px)").matches) setSheet((s) => !s);
    else setPinned((p) => !p);
  };
  const menuOpen = sheet || pinned;

  return (
    <>
      <header className={`wm-hdr2${expanded ? " is-expanded" : ""}${sheet ? " is-sheet" : ""}`}>
        <a className="wm-hdr2__logo" href="#top" aria-label="Web Masters Studio, начало">
          <NavLogo />
        </a>

        <div className="wm-bar" onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
          <nav className="wm-bar__links" aria-label="Основна навигация">
            <div className="wm-bar__clip">
              <ul
                ref={ulRef}
                onPointerLeave={() => {
                  hoverIdx.current = -1;
                  moveBlob(section);
                }}
              >
                <li className="wm-bar__blob" ref={blobRef} aria-hidden="true" />
                {LINKS.map((l, i) => (
                  <li key={l.id} style={{ "--i": i } as CSSProperties}>
                    <a
                      href={`#${l.id}`}
                      className={i === section ? "is-current" : undefined}
                      tabIndex={expanded ? 0 : -1}
                      onPointerEnter={() => {
                        hoverIdx.current = i;
                        moveBlob(i);
                      }}
                      onFocus={() => moveBlob(i)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <button type="button" className="wm-bar__toggle" aria-expanded={menuOpen} onClick={onToggle}>
            <span className="wm-bar__dots" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>{sheet ? "Затвори" : "Меню"}</span>
          </button>
          <a className="wm-bar__cta" href="#kontakt" onClick={() => setSheet(false)}>
            <span className="wm-bar__cta-l">Заявете оферта</span>
            <span className="wm-bar__cta-s">Оферта</span>
            <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </a>
          <span className="wm-bar__prog" aria-hidden="true">
            <i ref={progRef} />
          </span>
        </div>
      </header>

      <div className={`wm-sheet${sheet ? " is-open" : ""}`} aria-hidden={!sheet}>
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
        <div className="wm-sheet__foot">
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
    </>
  );
}
