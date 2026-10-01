import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { NavLogo } from "./brand-motion";
import { CONTACTS, NAV_LINKS, type NavHref } from "./chrome";
import { SiteLink } from "./link";



const FEATURED = [
  { img: "/assets/work/tonchev-900.webp", title: "Tonchev Design", note: "Landing page с калкулатор" },
  { img: "/assets/work/elan-900.webp", title: "Design Escape Academy", note: "Продажбена страница за събития" },
  { img: "/assets/work/tumbarkov-900.webp", title: "Димитър Тумбарков", note: "Комплексен сайт" },
  { img: "/assets/work/feedermania-900.webp", title: "Feedermania", note: "Онлайн магазин с над 500 продукта" },
  { img: "/assets/work/yug-900.webp", title: "Yug Property", note: "Сайт с онлайн резервации" },
];

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
 * Links get a sliding underline and the current page is marked.
 * On phones a hamburger opens a full-screen menu with a moving strip of
 * project visuals under the links.
 */
export function SiteHeader({ current }: { current: NavHref | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [slide, setSlide] = useState(0);
  const progRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const time = useSofiaTime(sheet);

  useEffect(() => {
    let raf = 0;
    let was = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      if (progRef.current) progRef.current.style.transform = `scaleX(${Math.min(1, y / max).toFixed(4)})`;
      // On phones the hero film sits behind the header, so keep the bar clear while it is on screen.
      const hero = document.querySelector<HTMLElement>(".wm-mj");
      const overHero = !!hero && hero.offsetParent !== null && hero.getBoundingClientRect().bottom > 90;
      const s = y > 40 && !overHero;
      if (s !== was) {
        was = s;
        setScrolled(s);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!sheet) return undefined;
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
          <SiteLink className="wm-top__logo" href="/" aria-label="Web Masters Studio, начало" onClick={() => setSheet(false)}>
            <NavLogo />
          </SiteLink>
          <nav className="wm-top__links" aria-label="Основна навигация">
            {NAV_LINKS.map((l) => (
              <SiteLink key={l.href} href={l.href} className={l.href === current ? "is-current" : undefined} aria-current={l.href === current ? "page" : undefined}>
                {l.label}
              </SiteLink>
            ))}
          </nav>
          <SiteLink className="wm-top__cta" href="/kontakti/">
            Заявете оферта
            <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </SiteLink>
          <button
            type="button"
            className="wm-top__burger"
            aria-expanded={sheet}
            aria-controls="wm-sheet"
            aria-label={sheet ? "Затвори менюто" : "Отвори менюто"}
            onClick={() => {
              if (!sheet) setSlide(0);
              setSheet(!sheet);
            }}
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
          {NAV_LINKS.map((l, i) => {
            const isCurrent = l.href === current;
            return (
              <SiteLink
                key={l.href}
                href={l.href}
                tabIndex={sheet ? 0 : -1}
                className={isCurrent ? "is-current" : undefined}
                aria-current={isCurrent ? "page" : undefined}
                style={{ "--i": i } as CSSProperties}
                onClick={() => setSheet(false)}
              >
                <span className="wm-sheet__num wm-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="wm-sheet__label">
                  <span>{l.label}</span>
                </span>
                {isCurrent ? <span className="wm-sheet__here wm-mono">тук сте</span> : null}
                <ArrowUpRight className="wm-sheet__arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </SiteLink>
            );
          })}
        </nav>

        <SiteLink className="wm-sheet__feature" href="/proekti/" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
          <span className="wm-sheet__shots" aria-hidden="true">
            {FEATURED.map((f, i) => (
              <img key={f.img} src={sheet ? f.img : undefined} alt="" width={900} height={562} className={i === slide ? "is-on" : undefined} />
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
        </SiteLink>

        <div className="wm-sheet__foot">
          <SiteLink className="wm-sheet__cta" href="/kontakti/" tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>
            Заявете оферта
            <span className="wm-sheet__ctadisc">
              <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </span>
          </SiteLink>
          <div className="wm-sheet__contacts">
            <SiteLink href={CONTACTS.office.href} tabIndex={sheet ? 0 : -1} aria-label={`Обадете се: ${CONTACTS.office.display}`}>
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              <span>Обадете се</span>
            </SiteLink>
            <SiteLink href={CONTACTS.email.href} tabIndex={sheet ? 0 : -1} aria-label={`Пишете ни: ${CONTACTS.email.display}`}>
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
              <span>Пишете ни</span>
            </SiteLink>
          </div>
        </div>
      </div>
    </>
  );
}
