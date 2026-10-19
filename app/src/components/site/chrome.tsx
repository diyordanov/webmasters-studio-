import { useEffect, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Mail, Phone } from "lucide-react";
import { AwardBadge } from "./award";
import { ConsentLink } from "./consent";
import { SiteLink } from "./link";


/** Site pages, in menu order. */
export const NAV_LINKS = [
  { href: "/", label: "Начало" },
  { href: "/uslugi/", label: "Услуги" },
  { href: "/proekti/", label: "Проекти" },
  { href: "/za-nas/", label: "За нас" },
  { href: "/kontakti/", label: "Контакти" },
] as const;

export type NavHref = (typeof NAV_LINKS)[number]["href"];

/** Free 45-minute consultation booking. */
export const CONSULT_URL = "https://calendly.com/dimo-uordanov/45min";

/** Nav CTA: small outline pill that floods green on hover. */
export function NavCta() {
  return (
    <span className="wm-magnet" data-magnet="">
      <SiteLink className="wm-navcta" href="/kontakti/">
        Заявете оферта
      </SiteLink>
    </span>
  );
}

/** Hero CTA: filled pill with a sliding arrow disc and magnetic pull. */
export function MagnetCta() {
  return (
    <span className="wm-magnet" data-magnet="">
      <SiteLink className="wm-magcta" href="/kontakti/">
        Заявете оферта
        <span className="wm-magcta__disc" aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2.2} />
        </span>
      </SiteLink>
    </span>
  );
}

/** Secondary hero action: plain link whose underline draws on hover. */
export function DrawLink({ href = "/proekti/", children = "Вижте проектите" }: { href?: string; children?: string } = {}) {
  return (
    <SiteLink className="wm-draw" href={href}>
      {children}
    </SiteLink>
  );
}

/** Hero chapter link to the matching Varna page (keyword anchor for local SEO). */
export function SceneLink({ href, children }: { href: string; children: string }) {
  return <DrawLink href={href}>{children}</DrawLink>;
}

/** Offer CTA: full-width block bar with a travelling arrow. */
export function OfferCta() {
  return (
    <SiteLink className="wm-blockcta" href="/kontakti/">
      <span>Заявете оферта</span>
      <ArrowUpRight size={24} strokeWidth={2} aria-hidden="true" />
    </SiteLink>
  );
}

export function HeroActions() {
  return (
    <>
      <MagnetCta />
      <DrawLink href="/izrabotka-na-sayt-varna/">Изработка на сайт във Варна</DrawLink>
      <AwardBadge />
    </>
  );
}


export const CONTACTS = {
  office: { label: "Офис", display: "+359 876 071 570", href: "tel:+359876071570" },
  manager: { label: "Мениджър", display: "+359 878 325 920", href: "tel:+359878325920" },
  email: { display: "office@webmasters.bg", href: "mailto:office@webmasters.bg" },
};

const FOOT_SERVICES = [
  { label: "Изработка на сайт Варна", href: "/izrabotka-na-sayt-varna/" },
  { label: "Изработка на онлайн магазин Варна", href: "/izrabotka-na-onlayn-magazin-varna/" },
  { label: "SEO оптимизация Варна", href: "/seo-optimizatsiya-varna/" },
  { label: "Маркетинг агенция Варна", href: "/marketing-agentsiya-varna/" },
  { label: "AI агенция Варна", href: "/ai-agentsiya-varna/" },
  { label: "Всички услуги", href: "/uslugi/" },
];

/** Back-to-top: round outline button that fills on hover. */
function TopCta() {
  return (
    <span className="wm-magnet" data-magnet="">
      <SiteLink className="wm-topcta" href="#top" aria-label="Нагоре">
        <ArrowUpRight size={22} strokeWidth={2} aria-hidden="true" style={{ transform: "rotate(-45deg)" }} />
      </SiteLink>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="wm-foot">
      <div className="wm-wrap">
        <div className="wm-foot__grid">
          <div className="wm-foot__brand">
            <SiteLink className="wm-foot__logo" href="/" aria-label="Уеб Мастърс Студио – начало">
              <img src="/assets/brand/foot-mark.webp" alt="" width={120} height={76} loading="lazy" />
              <img src="/assets/brand/wordmark.webp" alt="Web Masters Studio" width={520} height={106} loading="lazy" />
            </SiteLink>
            <p className="wm-foot__tag">Сайтове и маркетинг, създадени да носят клиенти.</p>
            <div className="wm-foot__circles">
              <a href={CONTACTS.office.href} aria-label={`Обадете се: ${CONTACTS.office.display}`}>
                <Phone size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a href={CONTACTS.email.href} aria-label={`Пишете ни: ${CONTACTS.email.display}`}>
                <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a href={CONSULT_URL} target="_blank" rel="noopener" aria-label="Запазете час за безплатна консултация">
                <CalendarDays size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
          <nav className="wm-foot__col" aria-label="Разгледайте">
            <h3 className="wm-foot__label">Разгледайте</h3>
            {NAV_LINKS.map((l) => (
              <SiteLink key={l.href} href={l.href}>
                {l.label}
              </SiteLink>
            ))}
          </nav>
          <nav className="wm-foot__col" aria-label="Услуги">
            <h3 className="wm-foot__label">Услуги</h3>
            {FOOT_SERVICES.map((s) => (
              <SiteLink key={s.href} href={s.href}>
                {s.label}
              </SiteLink>
            ))}
          </nav>
          <div className="wm-foot__col">
            <h3 className="wm-foot__label">Свържете се с нас</h3>
            <a href={CONTACTS.office.href}>{CONTACTS.office.display}</a>
            <a href={CONTACTS.manager.href}>{CONTACTS.manager.display}</a>
            <a href={CONTACTS.email.href}>{CONTACTS.email.display}</a>
            <a href="https://www.facebook.com/webmastersstudio" target="_blank" rel="noopener">Facebook</a>
            <a href="https://share.google/4RPn33PomfQR7hgXd" target="_blank" rel="noopener">Google профил и отзиви</a>
            <h3 className="wm-foot__label wm-foot__label--gap">Студио</h3>
            <p className="wm-foot__ink">Уеб Мастърс Студио ЕООД · ЕИК 207299525</p>
            <p className="wm-foot__ink">бул. „Цар Освободител“ 24, Варна</p>
            <p>Понеделник – петък, 9:30 – 18:30</p>
            <p>Проекти във Варна, София, Пловдив и цялата страна</p>
          </div>
        </div>
        <div className="wm-foot__row">
          <span>© 2026 Уеб Мастърс Студио ЕООД. Всички права запазени.</span>
          <nav className="wm-foot__legal" aria-label="Правна информация">
            <SiteLink href="/obshti-uslovia/">Общи условия</SiteLink>
            <SiteLink href="/politika-za-poveritelnost-gdpr/">Политика за поверителност</SiteLink>
            <SiteLink href="/politika-za-biskvitki/">Бисквитки</SiteLink>
            <ConsentLink />
          </nav>
          <TopCta />
        </div>
      </div>
    </footer>
  );
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * One rAF loop for all surrounding motion. Transform / CSS-variable writes
 * only, never React state. It never touches the scroll-scrub video (the
 * engine owns media time). Everything is fully visible without JS.
 */
export function SiteMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia("(max-width: 860px)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const all = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));
    const one = (s: string) => document.querySelector<HTMLElement>(s);

    const work = one("[data-pan]");
    const track = one("[data-pan-track]");
    const pars = all("[data-par]");
    const mocks = all("[data-mock]");
    const rail = one("[data-rail]");
    const drift = all("[data-drift]");
    const mags = all("[data-magnet]");
    const splits = all("[data-split]");
    const fills = all("[data-fill]");
    const svcItems = all("[data-svc-item]");
    const svcCount = one("[data-svc-count]");
    const steps = all("[data-step]");
    const offer = one("[data-tilt]");
    const peek = one("[data-peek-box]");
    const peekImg = peek?.querySelector("img") ?? null;
    const peekRows = all("[data-peek]");

    const magState = mags.map(() => ({ x: 0, y: 0 }));
    const lastP = new Map<HTMLElement, Map<string, string>>();
    const mouse = { x: -9999, y: -9999 };
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const pk = { x: 0, y: 0, vx: 0 };
    let svcActive = 0;
    let dist = 0;
    let raf = 0;
    const offs: Array<() => void> = [];
    const on = (el: HTMLElement | Window, ev: string, fn: (e: never) => void) => {
      el.addEventListener(ev, fn as EventListener, { passive: true });
      offs.push(() => el.removeEventListener(ev, fn as EventListener));
    };
    const setP = (el: HTMLElement, name: string, v: number) => {
      const val = v.toFixed(3);
      let m = lastP.get(el);
      if (!m) lastP.set(el, (m = new Map()));
      if (m.get(name) === val) return;
      m.set(name, val);
      el.style.setProperty(name, val);
    };

    const measure = () => {
      if (!work || !track) return;
      if (mq.matches) {
        work.style.height = "";
        track.style.transform = "";
        dist = 0;
        return;
      }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      work.style.height = `${dist + window.innerHeight}px`;
    };

    on(window, "pointermove", (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    if (fine) {
      for (const it of svcItems) {
        on(it, "pointermove", (e: PointerEvent) => {
          const r = it.getBoundingClientRect();
          it.style.setProperty("--mx", `${e.clientX - r.left}px`);
          it.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      }
      if (offer) {
        on(offer, "pointermove", (e: PointerEvent) => {
          const r = offer.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          tilt.tx = (y - 0.5) * -6;
          tilt.ty = (x - 0.5) * 8;
          offer.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
          offer.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        });
        on(offer, "pointerleave", () => {
          tilt.tx = 0;
          tilt.ty = 0;
        });
      }
      if (peek && peekImg) {
        for (const row of peekRows) {
          on(row, "pointerenter", () => {
            const src = row.dataset.peek;
            if (src && peekImg.getAttribute("src") !== src) peekImg.setAttribute("src", src);
            if (pk.x === 0) {
              pk.x = mouse.x;
              pk.y = mouse.y;
            }
            peek.classList.add("is-on");
          });
          on(row, "pointerleave", () => peek.classList.remove("is-on"));
        }
      }
    }

    // Every element whose position drives an effect. Their rects are read together at
    // the start of a frame (one layout), before any style is written: interleaving
    // reads and writes forced a full style/layout recalculation per element.
    const svcParent = svcItems[0]?.parentElement ?? null;
    const measured = [work, rail, offer, svcParent, ...pars, ...mocks, ...splits, ...fills, ...steps, ...svcItems, ...drift, ...mags].filter(
      (el): el is HTMLElement => !!el,
    );
    const rects = new Map<Element, DOMRect>();
    // Only elements near the viewport are measured. Reading the rect of a far-away element
    // would force the browser to lay out sections it otherwise skips (content-visibility).
    const near = new Set<Element>();
    const R = (el: Element) => rects.get(el);

    // The loop only runs while something moves (scroll, pointer, resize) and briefly after,
    // so the easing settles; an idle page costs nothing.
    let awakeUntil = 0;
    const wake = () => {
      awakeUntil = performance.now() + 1500;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (performance.now() > awakeUntil) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      rects.clear();
      for (const el of measured) if (near.has(el)) rects.set(el, el.getBoundingClientRect());

      const wr = work && R(work);
      if (wr && track && dist > 0) {
        const r = wr;
        const span = r.height - vh;
        const p = span > 0 ? clamp01(-r.top / span) : 0;
        track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      }
      for (const el of pars) {
        const r = R(el);
        if (!r) continue;
        if (r.bottom < -200 || r.top > vh + 200 || r.right < -200 || r.left > vw + 200) continue;
        const cx = (r.left + r.width / 2 - vw / 2) / vw;
        const cy = (r.top + r.height / 2 - vh / 2) / vh;
        const img = el.querySelector<HTMLElement>("img");
        if (img) img.style.transform = `translate3d(${(cx * -46).toFixed(1)}px,${(cy * -24).toFixed(1)}px,0) scale(1.1)`;
      }
      // Project mockups: a 3D tilt that eases toward the viewer as the card nears the centre.
      for (const el of mocks) {
        const r = R(el);
        if (!r) continue;
        if (r.bottom < -200 || r.top > vh + 200 || r.right < -200 || r.left > vw + 200) continue;
        const cx = Math.max(-1, Math.min(1, (r.left + r.width / 2 - vw / 2) / vw));
        const cy = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        setP(el, "--tx", Number(cx.toFixed(3)));
        setP(el, "--ty", Number(cy.toFixed(3)));
      }
      for (const el of splits) {
        const r = R(el);
        if (!r) continue;
        if (r.top > vh + 80 || r.bottom < -80) continue;
        setP(el, "--p", clamp01((vh * 0.94 - r.top) / (vh * 0.42)));
      }
      for (const el of fills) {
        const r = R(el);
        if (!r) continue;
        if (r.top > vh + 40 || r.bottom < -40) continue;
        setP(el, "--p", clamp01((vh * 0.9 - r.top) / (vh * 0.3)));
      }
      const rr = rail && R(rail);
      if (rail && rr) {
        const r = rr;
        setP(rail, "--p", clamp01((vh * 0.62 - r.top) / Math.max(1, r.height)));
      }
      for (const el of steps) {
        const sr = R(el);
        if (!sr) continue;
        const active = sr.top < vh * 0.62;
        if (el.classList.contains("is-active") !== active) el.classList.toggle("is-active", active);
      }
      if (svcItems.length) {
        const parent = svcParent && R(svcParent);
        if (parent && parent.bottom > 0 && parent.top < vh) {
          let best = svcActive;
          let bestD = Infinity;
          svcItems.forEach((it, i) => {
            const r = R(it);
            if (!r) return;
            const d = Math.abs(r.top + r.height / 2 - vh * 0.5);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          if (best !== svcActive) {
            svcItems[svcActive]?.classList.remove("is-active");
            svcItems[best].classList.add("is-active");
            svcActive = best;
            if (svcCount) {
              svcCount.textContent = String(best + 1).padStart(2, "0");
              svcCount.classList.remove("is-flip");
              void svcCount.offsetWidth;
              svcCount.classList.add("is-flip");
            }
          }
        }
      }
      if (offer) {
        const r = R(offer);
        if (r && r.top < vh + 100 && r.bottom > -100) {
          const p = clamp01((vh - r.top) / (vh * 0.7));
          const s = 0.9 + 0.1 * (1 - Math.pow(1 - p, 3));
          tilt.x += (tilt.tx - tilt.x) * 0.1;
          tilt.y += (tilt.ty - tilt.y) * 0.1;
          offer.style.transform = `perspective(1400px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale(${s.toFixed(4)})`;
          setP(offer, "--p", p);
        }
      }
      if (peek && fine) {
        const nx = pk.x + (mouse.x - pk.x) * 0.14;
        pk.vx = nx - pk.x;
        pk.x = nx;
        pk.y += (mouse.y - pk.y) * 0.14;
        peek.style.transform = `translate3d(${pk.x.toFixed(1)}px,${pk.y.toFixed(1)}px,0) translate(-50%,-50%) rotate(${Math.max(-12, Math.min(12, pk.vx * 0.6)).toFixed(2)}deg)`;
      }
      for (const el of drift) {
        const r = R(el);
        if (!r) continue;
        if (r.bottom < 0 || r.top > vh) continue;
        const c = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0,${(c * Number(el.dataset.drift || 0)).toFixed(1)}px,0)`;
      }
      if (fine) {
        mags.forEach((el, i) => {
          const s = magState[i];
          const r = R(el);
          if (!r) return;
          const cx = r.left + r.width / 2 - s.x;
          const cy = r.top + r.height / 2 - s.y;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const close = Math.abs(dx) < r.width * 0.85 && Math.abs(dy) < r.height * 1.5;
          s.x += ((close ? dx * 0.22 : 0) - s.x) * 0.14;
          s.y += ((close ? dy * 0.3 : 0) - s.y) * 0.14;
          el.style.transform = `translate3d(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px,0)`;
        });
      }
    };

    // Half a screen of margin, so effects are already in place when an element scrolls in.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) near.add(e.target);
          else near.delete(e.target);
        }
        wake();
      },
      { rootMargin: "50% 0px" },
    );
    for (const el of measured) io.observe(el);
    offs.push(() => io.disconnect());

    measure();
    for (const ev of ["scroll", "pointermove", "resize", "touchmove", "wheel"]) on(window, ev, wake);
    wake();
    const imgs = track ? Array.from(track.querySelectorAll("img")) : [];
    imgs.forEach((i) => i.addEventListener("load", measure));
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      offs.forEach((f) => f());
      imgs.forEach((i) => i.removeEventListener("load", measure));
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);
  return null;
}
