import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight, CalendarClock, Check, Quote } from "lucide-react";

import { CONSULT_URL, NAV_LINKS, SiteFooter, SiteMotion, type NavHref } from "./chrome";
import { OG_IMAGE, SITE_URL, siteHead } from "./head";
import { SiteHeader } from "./header";
import { PACKAGES, PROJECT_CATS, PROJECTS, STATS, TEAM, TESTIMONIALS, VALUES, type ProjectCat } from "./pages-data";
import { SplitHeading } from "./split";
import { SiteLink } from "./link";

/** Shared shell for every page: header, content, footer and the motion loop. */
export function SitePage({ current, children }: { current: NavHref; children: ReactNode }) {
  return (
    <div className="wm">
      <SiteHeader current={current} />
      <main>{children}</main>
      <SiteFooter />
      <SiteMotion />
    </div>
  );
}

/** Per-page <head>: title, description, canonical, social tags and optional JSON-LD, plus the shared icons. */
export function pageHead(title: string, description: string, path: string, jsonLd: object[] = []) {
  const url = `${SITE_URL}${path}`;
  return {
    links: [...siteHead.links, { rel: "canonical", href: url }],
    meta: [
      ...siteHead.meta,
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:locale", content: "bg_BG" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Уеб Мастърс Студио" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: jsonLd.map((data) => ({ type: "application/ld+json", children: JSON.stringify(data) })),
  };
}

const TICKER = ["Изработка на сайт", "Онлайн магазини", "SEO оптимизация", "Google Ads", "Уеб дизайн", "Поддръжка", "Варна · София · Пловдив"];

/**
 * Inner-page hero: breadcrumb, a large H1 whose words rise in, a lead, and a
 * lime glow that follows the pointer over a faint grid. A keyword ticker runs
 * along the bottom edge.
 */
export function PageHero({ current, title, lead, children }: { current: NavHref; title: string; lead: string; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const idx = NAV_LINKS.findIndex((l) => l.href === current);
  const label = NAV_LINKS[idx]?.label ?? "";
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };
  return (
    <section className="wm-phero" id="top" ref={ref} onPointerMove={move}>
      <span className="wm-phero__grid" aria-hidden="true" />
      <span className="wm-phero__glow" aria-hidden="true" />
      <div className="wm-wrap wm-phero__inner">
        <nav className="wm-phero__crumbs wm-mono" aria-label="Навигационна пътека">
          <SiteLink href="/">Начало</SiteLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <span className="wm-phero__num wm-mono" aria-hidden="true">
          {String(idx + 1).padStart(2, "0")} / {String(NAV_LINKS.length).padStart(2, "0")}
        </span>
        <SplitHeading as="h1" className="wm-phero__title" text={title} />
        <p className="wm-phero__lead">{lead}</p>
        {children ? <div className="wm-phero__actions">{children}</div> : null}
      </div>
      <div className="wm-phero__ticker" aria-hidden="true">
        <div className="wm-phero__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small lime pill link used in page heroes. */
export function PillLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <SiteLink className="wm-pill" href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
      <span className="wm-pill__disc" aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={2.2} />
      </span>
    </SiteLink>
  );
}

/** Packages: three cards with a pointer-following spotlight. */
export function PackagesSection() {
  const spot = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section className="wm-sec" id="paketi" aria-labelledby="paketi-h">
      <div className="wm-wrap">
        <SplitHeading id="paketi-h" text="Пакети за изработка на сайт." />
        <p className="wm-lead">Функционален и удобен сайт за 5 до 21 работни дни, който управлявате сами. Всеки пакет започва с безплатна консултация, а цената получавате като конкретна оферта.</p>
        <div className="wm-pkgs">
          {PACKAGES.map((p, i) => (
            <article className="wm-pkg" key={p.key} onPointerMove={spot} style={{ "--i": i } as CSSProperties}>
              <span className="wm-pkg__num wm-mono">0{i + 1}</span>
              <h3>{p.name}</h3>
              <p className="wm-pkg__text">{p.text}</p>
              <span className="wm-pkg__days">
                <CalendarClock size={16} strokeWidth={2} aria-hidden="true" />
                {p.days}
              </span>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <SiteLink className="wm-pkg__cta" href="/kontakti/">
                Поискайте оферта
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </SiteLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Animated counters that run once when the strip scrolls into view. */
export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Reduced motion: keep the final values (p stays 0, which renders the full numbers).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          setP(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="wm-wrap">
      <div className="wm-stats" ref={ref}>
        {STATS.map((s) => (
          <div className="wm-stat" key={s.label}>
            <strong>
              {/* Full value in the HTML for crawlers and no-JS; the counter only animates on screen. */}
              <span aria-hidden="true">{p === 0 ? s.value : Math.round(s.value * p)}</span>
              <span className="wm-vh">{s.value}</span>
              <em>{s.suffix}</em>
            </strong>
            <span className="wm-mono">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Full portfolio with category filters. */
export function ProjectsGrid() {
  const [cat, setCat] = useState<ProjectCat | "all">("all");
  const list = cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);
  const catLabel = (k: ProjectCat) => PROJECT_CATS.find((c) => c.key === k)?.label ?? "";
  return (
    <section className="wm-sec wm-sec--tight" id="vsichki" aria-labelledby="vsichki-h">
      <div className="wm-wrap">
        <div className="wm-grid-head">
          <div>
            <SplitHeading id="vsichki-h" text="Още проекти от портфолиото." />
            <p className="wm-lead">Сайтове, онлайн магазини и SEO за бизнеси от цяла България и Европа.</p>
          </div>
          <div className="wm-filters" role="group" aria-label="Филтър по категория">
            {PROJECT_CATS.map((c) => {
              const n = c.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c.key).length;
              return (
                <button type="button" key={c.key} className={cat === c.key ? "is-on" : undefined} aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
                  {c.label}
                  <small>{n}</small>
                </button>
              );
            })}
          </div>
        </div>
        <ul className="wm-plist" key={cat}>
          {list.map((p, i) => {
            const inner = (
              <>
                <span className="wm-plist__cat wm-mono">{catLabel(p.cat)}</span>
                <strong>{p.name}</strong>
                <span className="wm-plist__note">{p.note}</span>
                {p.url ? <ArrowUpRight className="wm-plist__arrow" size={18} strokeWidth={2} aria-hidden="true" /> : null}
              </>
            );
            return (
              <li key={p.name} style={{ "--i": Math.min(i, 16) } as CSSProperties}>
                {p.url ? (
                  <SiteLink href={p.url} target="_blank" rel="noopener" aria-label={`${p.name}: ${p.note} (отваря сайта)`}>
                    {inner}
                  </SiteLink>
                ) : (
                  <div>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Client testimonials on two marquee rows that run in opposite directions and pause on hover. */
export function TestimonialsSection({ title = "Какво казват клиентите ни.", only }: { title?: string; only?: number } = {}) {
  const list = only ? TESTIMONIALS.slice(0, only) : TESTIMONIALS;
  const half = Math.ceil(list.length / 2);
  const rows = [list.slice(0, half), list.slice(half)];
  return (
    <section className="wm-sec wm-sec--tight" id="otzivi" aria-labelledby="otzivi-h">
      <div className="wm-wrap">
        <SplitHeading id="otzivi-h" text={title} />
      </div>
      <div className="wm-quotes">
        {rows.map((row, r) => (
          <div className={`wm-quotes__row${r ? " is-rev" : ""}`} key={r}>
            <div className="wm-quotes__track">
              {[...row, ...row].map((t, i) => (
                <figure className="wm-quote" key={i} aria-hidden={i >= row.length ? true : undefined}>
                  <Quote className="wm-quote__mark" size={22} strokeWidth={2} aria-hidden="true" />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <b>{t.who}</b>
                    <span className="wm-mono">{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** About: intro statement next to the studio's values. */
export function ValuesSection() {
  return (
    <section className="wm-sec" id="cennosti" aria-labelledby="cennosti-h">
      <div className="wm-wrap wm-values">
        <div className="wm-values__head">
          <SplitHeading id="cennosti-h" text="Хората, които превръщат идеите ви в реалност." />
          <p className="wm-lead">Уеб Мастърс Студио е екип от Варна, който изгражда сайтове, онлайн магазини и маркетинг за малък и среден бизнес. Правим пълния път: от дизайна и изработката до рекламата и SEO оптимизацията, които превръщат посетителите в дългосрочни клиенти.</p>
        </div>
        <ol className="wm-values__list">
          {VALUES.map((v, i) => (
            <li key={v.title}>
              <span className="wm-values__num wm-mono">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Team: tall portrait cards. The cut-out portrait stands in front of the
 * person's first name set huge in outline; the card tilts toward the pointer,
 * the name drifts the other way, and the portrait moves from muted to full
 * colour as it lifts. Without a photo, a large outlined monogram takes its place.
 */
export function TeamSection() {
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", (((e.clientY - r.top) / r.height - 0.5) * -8).toFixed(2));
    el.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2));
  };
  const reset = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0");
    e.currentTarget.style.setProperty("--ry", "0");
  };
  return (
    <section className="wm-sec wm-sec--tight" id="ekip" aria-labelledby="ekip-h">
      <div className="wm-wrap">
        <div className="wm-grid-head">
          <SplitHeading id="ekip-h" text="Събрахме се, за да творим заедно." />
          <p className="wm-lead">Малък екип, в който всеки отговаря за своята част: стратегия и маркетинг, дизайн и връзката с вас.</p>
        </div>
        <div className="wm-crew">
          {TEAM.map((m, i) => (
            <article className="wm-crew__card" key={m.name} style={{ "--i": i, "--len": m.first.length } as CSSProperties}>
              <div className="wm-crew__stage" onPointerMove={tilt} onPointerLeave={reset}>
                <span className="wm-crew__idx wm-mono" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="wm-crew__word" aria-hidden="true">
                  {m.first}
                </span>
                <span className="wm-crew__glow" aria-hidden="true" />
                {m.photo ? (
                  <img
                    className="wm-crew__photo"
                    src={`${m.photo}.webp`}
                    srcSet={`${m.photo}-400.webp 400w, ${m.photo}-520.webp 520w, ${m.photo}.webp 900w`}
                    sizes="(max-width: 860px) 88vw, (max-width: 1080px) 45vw, 380px"
                    alt={`${m.name}, ${m.role.toLowerCase()} в Уеб Мастърс Студио`}
                    width={900}
                    height={1125}
                    loading="lazy"
                  />
                ) : (
                  <span className="wm-crew__mono" aria-hidden="true">
                    {m.initials}
                  </span>
                )}
                <span className="wm-crew__role">{m.role}</span>
              </div>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Free consultation card with the booking link. */
export function ConsultSection() {
  return (
    <section className="wm-sec wm-sec--tight" id="konsultacia" aria-labelledby="konsultacia-h">
      <div className="wm-wrap">
        <div className="wm-consult">
          <div>
            <span className="wm-mono">Безплатно · 45 минути · онлайн</span>
            <h2 id="konsultacia-h" className="wm-consult__title">
              Запазете безплатна консултация.
            </h2>
            <p>Изберете удобен час в календара и ще обсъдим целите ви, какъв сайт или кампания ви трябва и какви са следващите стъпки. Без ангажимент.</p>
          </div>
          <PillLink href={CONSULT_URL} external>
            Изберете час
          </PillLink>
        </div>
      </div>
    </section>
  );
}
