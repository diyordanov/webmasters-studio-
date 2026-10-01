import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, CalendarClock, Check, LayoutDashboard, Palette, Phone, Plus, Puzzle, Rocket, ShieldCheck, Smartphone } from "lucide-react";

import { CONSULT_URL } from "./chrome";
import { ContactSection } from "./contact";
import { BUSINESS_LD, SITE_URL } from "./head";
import { SiteLink } from "./link";
import { LOCAL_PAGES, type LocalBlock, type LocalPageData, type Motif } from "./local-pages";
import { HeroVisual, MotifVisual } from "./local-visuals";
import { pageHead, PillLink, SitePage, TestimonialsSection } from "./page-parts";
import { SplitHeading } from "./split";

/** <head> for a local landing page: tags plus WebPage, Breadcrumb, Service and FAQ structured data. */
export function localHead(page: LocalPageData) {
  const url = `${SITE_URL}${page.path}`;
  const faq = page.blocks.find((b): b is Extract<LocalBlock, { type: "faq" }> => b.type === "faq");
  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.title,
          description: page.description,
          inLanguage: "bg-BG",
          isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Уеб Мастърс Студио" },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          ...(page.image ? { primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${page.image.src}` } } : {}),
          dateModified: page.modified,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Начало", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi/` },
            { "@type": "ListItem", position: 3, name: page.crumb, item: url },
          ],
        },
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.service.name,
          serviceType: page.service.type,
          url,
          description: page.description,
          provider: { "@id": BUSINESS_LD["@id"] },
          areaServed: [
            { "@type": "City", name: "Варна" },
            { "@type": "AdministrativeArea", name: "Област Варна" },
            { "@type": "Country", name: "България" },
          ],
        },
        ...(faq
          ? [
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: faq.items.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: plain([...f.a, ...(f.bullets ?? []), ...(f.after ?? [])].join(" ")) },
                })),
              },
            ]
          : []),
      ],
    },
    BUSINESS_LD,
  ];
  return pageHead(page.title, page.description, page.path, ld);
}

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Plain text for structured data: "[text](/path/)" becomes "text". */
export const plain = (t: string) => t.replace(LINK, "$1");

/** Renders "[text](/path/)" inside copy as an internal link. */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <SiteLink className="wm-lp__link" href={m[2]} key={at}>
        {m[1]}
      </SiteLink>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Paras({ items, className }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <>
      {items.map((t) => (
        <p className={className} key={t}>
          <Rich text={t} />
        </p>
      ))}
    </>
  );
}

function Ticks({ items, className = "wm-lp__ticks" }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <ul className={className}>
      {items.map((t) => (
        <li key={t}>
          <span className="wm-lp__tick" aria-hidden="true">
            <Check size={13} strokeWidth={3} />
          </span>
          <span>
            <Rich text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Extra copy stays in the page (and in Google's index) but folds away until asked for. */
function More({ children, label = "Прочетете повече" }: { children: ReactNode; label?: string }) {
  return (
    <details className="wm-lp-more">
      <summary>
        <span>{label}</span>
        <Plus size={15} strokeWidth={2.4} aria-hidden="true" />
      </summary>
      <div className="wm-lp-more__body">{children}</div>
    </details>
  );
}

type TextBlock = Extract<LocalBlock, { type: "text" }>;

/** Column spans on a 6-column bento: a wide card, then rows of three; the last row is stretched to fill. */
function spans(n: number) {
  const pattern = [4, 2, 2, 2, 2];
  const out = Array.from({ length: n }, (_, i) => pattern[i % pattern.length]);
  let row = 0;
  let rowStart = 0;
  out.forEach((w, i) => {
    if (row + w > 6) {
      row = 0;
      rowStart = i;
    }
    row += w;
    if (row === 6) {
      row = 0;
      rowStart = i + 1;
    }
  });
  if (row > 0 && rowStart < n) out[n - 1] += 6 - row;
  return out;
}

function ServiceCard({ b, span, i }: { b: TextBlock; span: number; i: number }) {
  const [first, ...rest] = b.paras ?? [];
  const hasMore = rest.length > 0 || (b.after?.length ?? 0) > 0 || (b.h3s?.length ?? 0) > 0;
  return (
    <article className={`wm-lp-svc${span >= 4 ? " is-wide" : ""}`} id={b.id} aria-labelledby={`${b.id}-h`} style={{ "--span": span, "--i": i } as CSSProperties}>
      {b.visual ? <MotifVisual m={b.visual} /> : null}
      <div className="wm-lp-svc__body">
        <span className="wm-lp-svc__n wm-mono">{String(i + 1).padStart(2, "0")}</span>
        <h2 className="wm-lp-svc__h" id={`${b.id}-h`}>
          {b.h2}
        </h2>
        {b.kicker ? <p className="wm-lp__kicker">{b.kicker}</p> : null}
        {first ? (
          <p className="wm-lp-svc__p">
            <Rich text={first} />
          </p>
        ) : null}
        <Ticks items={b.bullets} className="wm-lp-chips" />
        {hasMore ? (
          <More>
            <Paras items={rest} />
            {b.h3s?.map((c) => (
              <div key={c.h3}>
                <h3>{c.h3}</h3>
                <Paras items={c.paras} />
                <Ticks items={c.bullets} />
              </div>
            ))}
            <Paras items={b.after} />
          </More>
        ) : null}
      </div>
    </article>
  );
}

function Bento({ blocks, label }: { blocks: TextBlock[]; label: string }) {
  const w = spans(blocks.length);
  return (
    <section className="wm-lp-sec wm-lp-bento-sec" aria-label={label}>
      <div className="wm-wrap">
        <p className="wm-lp-eyebrow wm-mono">
          <span aria-hidden="true" /> {label}
        </p>
        <div className="wm-lp-bento">
          {blocks.map((b, i) => (
            <ServiceCard b={b} key={b.id} span={w[i]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps({ b }: { b: TextBlock }) {
  const [first, ...rest] = b.paras ?? [];
  const Icon = b.layout === "checks" ? Check : null;
  return (
    <section className="wm-lp-sec wm-lp-steps-sec" id={b.id} aria-labelledby={`${b.id}-h`}>
      <div className="wm-wrap wm-lp-steps-grid">
        <div className="wm-lp-steps__copy">
          <h2 className="wm-lp__h2" id={`${b.id}-h`}>
            {b.h2}
          </h2>
          {first ? (
            <p className="wm-lp-steps__lead">
              <Rich text={first} />
            </p>
          ) : null}
          {rest.length || b.after?.length ? (
            <More>
              <Paras items={rest} />
              <Paras items={b.after} />
            </More>
          ) : null}
        </div>
        <ol className={`wm-lp-steps${Icon ? " is-checks" : ""}`}>
          {(b.bullets ?? []).map((t, i) => {
            const [head, ...tail] = t.split(": ");
            const split = tail.length > 0;
            return (
              <li key={t} style={{ "--i": i } as CSSProperties}>
                <span className="wm-lp-steps__dot" aria-hidden="true">
                  {Icon ? <Icon size={16} strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
                </span>
                {split ? (
                  <span>
                    <strong>{head}</strong>
                    {tail.join(": ")}
                  </span>
                ) : (
                  <span>{t}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const FEAT_ICONS = [Rocket, Palette, ShieldCheck, Smartphone, LayoutDashboard, Puzzle];

function Features({ block }: { block: Extract<LocalBlock, { type: "features" }> }) {
  const [first, ...rest] = block.paras ?? [];
  return (
    <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
      <div className="wm-wrap">
        <div className="wm-lp-split">
          <h2 className="wm-lp__h2" id={`${block.id}-h`}>
            {block.h2}
          </h2>
          <div>
            {first ? (
              <p className="wm-lp-split__lead">
                <Rich text={first} />
              </p>
            ) : null}
            <Paras items={rest} className="wm-lp-split__p" />
          </div>
        </div>
        <div className="wm-lp-feats">
          {block.items.map((f, i) => {
            const Icon = FEAT_ICONS[i % FEAT_ICONS.length];
            return (
              <article className="wm-lp-feat" key={f.title} style={{ "--i": i } as CSSProperties}>
                <span className="wm-lp-feat__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ block }: { block: Extract<LocalBlock, { type: "projects" }> }) {
  return (
    <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
      <div className="wm-wrap">
        <div className="wm-grid-head">
          <div>
            <p className="wm-lp-eyebrow wm-mono">
              <span aria-hidden="true" /> Портфолио
            </p>
            <h2 className="wm-lp__h2" id={`${block.id}-h`}>
              {block.h2}
            </h2>
            <Paras items={block.paras} className="wm-lead" />
          </div>
          <SiteLink className="wm-draw" href="/proekti/">
            Всички проекти
          </SiteLink>
        </div>
        <ul className="wm-lp-shots">
          {block.items.map((p, i) => (
            <li key={p.name} style={{ "--i": i } as CSSProperties}>
              <a href={p.url} target="_blank" rel="noopener" aria-label={`${p.name}: ${p.note} (отваря сайта)`}>
                {p.img ? (
                  <span className="wm-lp-shots__img">
                    <img
                      src={`${p.img}-640.webp`}
                      srcSet={`${p.img}-640.webp 640w, ${p.img}-900.webp 900w`}
                      sizes="(max-width: 860px) 92vw, 400px"
                      alt=""
                      width={640}
                      height={320}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ) : null}
                <span className="wm-lp-shots__meta">
                  <strong>{p.name}</strong>
                  <span>{p.note}</span>
                </span>
                <ArrowUpRight className="wm-lp-shots__arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq({ block }: { block: Extract<LocalBlock, { type: "faq" }> }) {
  return (
    <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
      <div className="wm-wrap wm-lp-faq-grid">
        <div className="wm-lp-faq__side">
          <p className="wm-lp-eyebrow wm-mono">
            <span aria-hidden="true" /> Въпроси
          </p>
          <h2 className="wm-lp__h2" id={`${block.id}-h`}>
            {block.h2}
          </h2>
          {block.sub ? <h2 className="wm-lp__sub">{block.sub}</h2> : null}
          {block.kicker ? <p className="wm-lp__kicker">{block.kicker}</p> : null}
          <div className="wm-lp-ask">
            <p>Не намирате отговор? Питайте ни директно.</p>
            <a className="wm-lp-ask__tel" href="tel:+359876071570">
              <Phone size={16} aria-hidden="true" /> 0876 071 570
            </a>
          </div>
        </div>
        <div className="wm-lp-faq">
          {block.items.map((f, i) => (
            <details className="wm-lp-faq__item" key={f.q} open={i === 0}>
              <summary>
                <span className="wm-lp-faq__q">{f.q}</span>
                <span className="wm-lp-faq__chev" aria-hidden="true">
                  <Plus size={18} strokeWidth={2.2} />
                </span>
              </summary>
              <div className="wm-lp-faq__a">
                <Paras items={f.a} />
                {f.h3 ? <h3 className="wm-lp-faq__h">{f.h3}</h3> : null}
                <Ticks items={f.bullets} />
                <Paras items={f.after} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages({ block }: { block: Extract<LocalBlock, { type: "packages" }> }) {
  return (
    <section className="wm-lp-sec" id={block.id} aria-label="Пакети">
      <div className="wm-wrap">
        <p className="wm-lp-eyebrow wm-mono">
          <span aria-hidden="true" /> Пакети
        </p>
        <div className="wm-pkgs wm-lp-pkgs">
          {block.items.map((p, i) => (
            <article className={`wm-pkg${i === 1 ? " is-featured" : ""}`} key={p.name} style={{ "--i": i } as CSSProperties}>
              <span className="wm-pkg__num wm-mono">{p.sub}</span>
              <h2 className="wm-lp-pkg__h">{p.name}</h2>
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
                Направи запитване
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </SiteLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Groups consecutive plain text blocks into one bento section; the rest render on their own. */
function renderBlocks(blocks: LocalBlock[], label: string) {
  const out: ReactNode[] = [];
  let run: TextBlock[] = [];
  let runs = 0;
  const flush = () => {
    if (!run.length) return;
    out.push(<Bento blocks={run} key={`bento-${runs}`} label={runs === 0 ? label : "Още услуги"} />);
    runs += 1;
    run = [];
  };
  blocks.forEach((b, i) => {
    if (b.type === "text" && !b.layout) {
      run.push(b);
      return;
    }
    flush();
    switch (b.type) {
      case "text":
        out.push(<Steps b={b} key={b.id} />);
        break;
      case "features":
        out.push(<Features block={b} key={b.id} />);
        break;
      case "packages":
        out.push(<Packages block={b} key={b.id} />);
        break;
      case "faq":
        out.push(<Faq block={b} key={b.id} />);
        break;
      case "projects":
        out.push(<Projects block={b} key={b.id} />);
        break;
      case "testimonials":
        out.push(<TestimonialsSection title={b.h2} only={b.only} key={`t-${i}`} />);
        break;
      case "contact":
        out.push(<ContactSection title={b.title} as={b.as ?? "h2"} key={`c-${i}`} />);
        break;
    }
  });
  flush();
  return out;
}

const RELATED_MOTIF: Record<string, Motif> = {
  "/izrabotka-na-sayt-varna/": "site",
  "/marketing-agentsiya-varna/": "ads",
  "/ai-agentsiya-varna/": "chat",
  "/izrabotka-na-onlayn-magazin-varna/": "cart",
  "/seo-optimizatsiya-varna/": "mappack",
};

/** Links to the Varna pages, so each one passes relevance to the rest. */
export function Related({ current, title = "Още услуги във Варна", lead }: { current?: string; title?: string; lead?: string }) {
  const others = Object.values(LOCAL_PAGES).filter((p) => p.path !== current);
  return (
    <section className="wm-lp-sec wm-lp-related" aria-labelledby="related-h">
      <div className="wm-wrap">
        <h2 className="wm-lp__h2" id="related-h">
          {title}
        </h2>
        {lead ? <p className="wm-lead">{lead}</p> : null}
        <div className="wm-lp-related__grid">
          {others.map((p) => (
            <SiteLink className="wm-lp-related__card" href={p.path} key={p.path}>
              <MotifVisual m={RELATED_MOTIF[p.path] ?? "plan"} />
              <span className="wm-lp-related__txt">
                <strong>{p.crumb}</strong>
                <span>{p.teaser}</span>
              </span>
              <ArrowUpRight className="wm-lp-related__arrow" size={20} strokeWidth={2} aria-hidden="true" />
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocalPage({ page, children }: { page: LocalPageData; children?: ReactNode }) {
  const [lead, ...story] = page.intro;
  return (
    <SitePage current="/uslugi/">
      <section className="wm-phero wm-lp-hero" id="top">
        <span className="wm-phero__grid" aria-hidden="true" />
        <span className="wm-phero__glow" aria-hidden="true" />
        <div className="wm-wrap wm-lp-hero__inner">
          <div className="wm-lp-hero__copy">
            <nav className="wm-phero__crumbs wm-mono" aria-label="Навигационна пътека">
              <SiteLink href="/">Начало</SiteLink>
              <span aria-hidden="true">/</span>
              <SiteLink href="/uslugi/">Услуги</SiteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.crumb}</span>
            </nav>
            <SplitHeading as="h1" className="wm-phero__title wm-lp__h1" text={page.h1} />
            <p className="wm-phero__lead wm-lp__lead">
              <Rich text={lead} />
            </p>
            <div className="wm-phero__actions">
              <PillLink href="/kontakti/">{page.cta ?? "Безплатна консултация"}</PillLink>
              <a className="wm-draw" href={CONSULT_URL} target="_blank" rel="noopener">
                Запазете час за разговор
              </a>
            </div>
          </div>
          <div className="wm-lp-hero__visual">
            <HeroVisual kind={page.hero} image={page.image} />
          </div>
        </div>
      </section>

      <section className="wm-lp-facts" aria-label="Накратко">
        <div className="wm-wrap wm-lp-facts__grid">
          {page.stats.map((s) => (
            <div key={s.l}>
              <b>{s.v}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {story.length ? (
        <section className="wm-lp-sec wm-lp-story" aria-label="Накратко">
          <div className="wm-wrap wm-lp-story__grid">
            <div className="wm-lp-story__copy">
              <p className="wm-lp-story__big">
                <Rich text={story[0]} />
              </p>
              <Paras items={story.slice(1)} className="wm-lp-story__p" />
            </div>
          </div>
        </section>
      ) : null}

      {renderBlocks(page.blocks, "Какво правим")}
      <Related current={page.path} />
      {children}
    </SitePage>
  );
}
