import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

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

const FEATURED = [
  { img: "/assets/work/interior-900.webp", title: "Интериорно студио", note: "Портфолио и запитвания" },
  { img: "/assets/work/dental-900.webp", title: "Дентална клиника", note: "Услуги и записване на час" },
  { img: "/assets/work/photo-900.webp", title: "Фотограф", note: "Галерия и резервации" },
  { img: "/assets/work/promo-900.webp", title: "Рекламни продукти", note: "Каталог и онлайн поръчки" },
];
const SHEET_LINKS = [{ id: "top", label: "Начало" }, ...LINKS, { id: "kontakt", label: "Контакт" }];

/** Current time in Sofia, refreshed while the menu is open. */
function useSofiaTime(on: boolean) {
  const [t, setT] = useState("");
  useEffect(() => {
    if (!on) return undefined;
    const fmt = new Intl.DateTimeFormat("bg-BG", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Sofia" });
    const upd = () => setT(fmt.format(new Date()));
    upd();
    const id = window.setInterval(upd, 15000);
    return () => window.clearInterval(id);
  }, [on]);
  return t;
}

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
  const [slide, setSlide] = useState(0);
  const progRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const time = useSofiaTime(sheet);

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
    setSlide(0);
    const id = window.setInterval(() => setSlide((n) => (n + 1) % FEATURED.length), 3200);
    return () => window.clearInterval(id);
  }, [sheet]);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return undefined;
    const move = (e: PointerEvent) => {
      el.style.setProperty("--gx", `${e.clientX}px`);
      el.style.setProperty("--gy", `${e.clientY}px`);
    };
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointermove", move);
    };
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

      <div id="wm-sheet" ref={sheetRef} className={`wm-sheet${sheet ? " is-open" : ""}`} aria-hidden={!sheet}>
        <div className="wm-sheet__bg" aria-hidden="true">
          <span className="wm-sheet__grid" />
          <span className="wm-sheet__glow" />
          <span className="wm-sheet__glow wm-sheet__glow--touch" />
        </div>

        <div className="wm-sheet__meta">
          <span className="wm-sheet__live">
            <i aria-hidden="true" />
            Приемаме нови проекти
          </span>
          <span className="wm-mono">София {time}</span>
        </div>

        <nav className="wm-sheet__links" aria-label="Мобилна навигация">
          {SHEET_LINKS.map((l, i) => {
            const current = i - 1 === section && section >= 0;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                tabIndex={sheet ? 0 : -1}
                className={current ? "is-current" : undefined}
                style={{ "--i": i } as CSSProperties}
                onClick={() => setSheet(false)}
              >
                <span className="wm-sheet__num wm-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="wm-sheet__label">
                  <span>{l.label}</span>
                </span>
                {current ? <span className="wm-sheet__here wm-mono">тук сте</span> : null}
                <ArrowUpRight className="wm-sheet__arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            );
          })}
        </nav>

        <a className="wm-sheet__feature" href="#proekti" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
          <span className="wm-sheet__shots" aria-hidden="true">
            {FEATURED.map((f, i) => (
              <img key={f.img} src={sheet ? f.img : undefined} alt="" width={900} height={675} className={i === slide ? "is-on" : undefined} />
            ))}
          </span>
          <span className="wm-sheet__cap">
            <span className="wm-mono">Проекти · {String(slide + 1).padStart(2, "0")}/{String(FEATURED.length).padStart(2, "0")}</span>
            <strong>{FEATURED[slide].title}</strong>
            <small>{FEATURED[slide].note}</small>
          </span>
          <span className="wm-sheet__bars" aria-hidden="true">
            {FEATURED.map((f, i) => (
              <i key={f.img} className={i === slide ? "is-on" : i < slide ? "is-done" : undefined} />
            ))}
          </span>
        </a>

        <div className="wm-sheet__foot">
          <a className="wm-sheet__cta" href="#kontakt" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
            Заявете оферта
            <span className="wm-sheet__ctadisc">
              <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </a>
          <div className="wm-sheet__contacts">
            <a href={CONTACTS.office.href} tabIndex={sheet ? 0 : -1} aria-label={`Обадете се: ${CONTACTS.office.display}`}>
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              <span>Обадете се</span>
            </a>
            <a href={CONTACTS.email.href} tabIndex={sheet ? 0 : -1} aria-label={`Пишете ни: ${CONTACTS.email.display}`}>
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
              <span>Пишете ни</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
