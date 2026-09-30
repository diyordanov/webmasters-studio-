import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, CalendarClock, Check, ChevronDown } from "lucide-react";

import { CONSULT_URL } from "./chrome";
import { ContactSection } from "./contact";
import { BUSINESS_LD, SITE_URL } from "./head";
import { SiteLink } from "./link";
import { LOCAL_PAGES, type LocalBlock, type LocalPageData } from "./local-pages";
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

function Ticks({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="wm-lp__ticks">
      {items.map((t) => (
        <li key={t}>
          <span className="wm-lp__tick" aria-hidden="true">
            <Check size={14} strokeWidth={3} />
          </span>
          <span>
            <Rich text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: LocalBlock }) {
  switch (block.type) {
    case "text":
      return (
        <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
          <div className="wm-wrap wm-lp-text">
            <div className="wm-lp-text__head">
              <h2 className="wm-lp__h2" id={`${block.id}-h`}>
                {block.h2}
              </h2>
              {block.kicker ? <p className="wm-lp__kicker">{block.kicker}</p> : null}
            </div>
            <div className="wm-lp-text__body">
              <Paras items={block.paras} />
              <Ticks items={block.bullets} />
              {block.h3s?.length ? (
                <div className="wm-lp-cards">
                  {block.h3s.map((c, i) => (
                    <article className="wm-lp-card" key={c.h3} style={{ "--i": i } as CSSProperties}>
                      <span className="wm-mono">0{i + 1}</span>
                      <h3>{c.h3}</h3>
                      <Paras items={c.paras} />
                      <Ticks items={c.bullets} />
                    </article>
                  ))}
                </div>
              ) : null}
              <Paras items={block.after} />
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
          <div className="wm-wrap">
            <div className="wm-lp-text">
              <div className="wm-lp-text__head">
                <h2 className="wm-lp__h2" id={`${block.id}-h`}>
                  {block.h2}
                </h2>
              </div>
              <div className="wm-lp-text__body">
                <Paras items={block.paras} />
              </div>
            </div>
            <div className="wm-lp-feats">
              {block.items.map((f, i) => (
                <article className="wm-lp-feat" key={f.title} style={{ "--i": i } as CSSProperties}>
                  <span className="wm-lp-feat__n wm-mono">0{i + 1}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "packages":
      return (
        <section className="wm-lp-sec" id={block.id} aria-label="Пакети">
          <div className="wm-wrap">
            {block.intro ? <p className="wm-lp__kicker wm-lp__kicker--solo">{block.intro}</p> : null}
            <div className="wm-pkgs wm-lp-pkgs">
              {block.items.map((p, i) => (
                <article className="wm-pkg" key={p.name} style={{ "--i": i } as CSSProperties}>
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
    case "faq":
      return (
        <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
          <div className="wm-wrap wm-lp-text">
            <div className="wm-lp-text__head">
              <h2 className="wm-lp__h2" id={`${block.id}-h`}>
                {block.h2}
              </h2>
              {block.sub ? <h2 className="wm-lp__sub">{block.sub}</h2> : null}
              {block.kicker ? <p className="wm-lp__kicker">{block.kicker}</p> : null}
            </div>
            <div className="wm-lp-text__body wm-lp-faq">
              {block.items.map((f, i) => (
                <details className="wm-lp-faq__item" key={f.q} open={i === 0}>
                  <summary>
                    <span className="wm-mono">0{i + 1}</span>
                    <span className="wm-lp-faq__q">{f.q}</span>
                    <ChevronDown className="wm-lp-faq__chev" size={20} strokeWidth={2} aria-hidden="true" />
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
    case "projects": {
      const list = block.items;
      return (
        <section className="wm-lp-sec" id={block.id} aria-labelledby={`${block.id}-h`}>
          <div className="wm-wrap">
            <div className="wm-grid-head">
              <div>
                <h2 className="wm-lp__h2" id={`${block.id}-h`}>
                  {block.h2}
                </h2>
                <Paras items={block.paras} className="wm-lead" />
              </div>
              <SiteLink className="wm-draw" href="/proekti/">
                Всички проекти
              </SiteLink>
            </div>
            <ul className="wm-plist wm-lp-plist">
              {list.map((p, i) => (
                <li key={p.name} style={{ "--i": i } as CSSProperties}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener" aria-label={`${p.name}: ${p.note} (отваря сайта)`}>
                      <span className="wm-plist__cat wm-mono">Проект</span>
                      <strong>{p.name}</strong>
                      <span className="wm-plist__note">{p.note}</span>
                      <ArrowUpRight className="wm-plist__arrow" size={18} strokeWidth={2} aria-hidden="true" />
                    </a>
                  ) : (
                    <div>
                      <span className="wm-plist__cat wm-mono">Проект</span>
                      <strong>{p.name}</strong>
                      <span className="wm-plist__note">{p.note}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    }
    case "testimonials":
      return <TestimonialsSection title={block.h2} only={block.only} />;
    case "contact":
      return <ContactSection title={block.title} as={block.as ?? "h2"} />;
  }
}

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
              <span className="wm-mono">Варна</span>
              <strong>{p.crumb}</strong>
              <span>{p.teaser}</span>
              <ArrowUpRight className="wm-lp-related__arrow" size={20} strokeWidth={2} aria-hidden="true" />
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocalPage({ page, children }: { page: LocalPageData; children?: ReactNode }) {
  const toc = page.blocks.filter((b) => "h2" in b && b.type !== "testimonials") as Array<Extract<LocalBlock, { h2: string }>>;
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
            <Paras items={page.intro.slice(0, 1)} className="wm-phero__lead" />
            <Paras items={page.intro.slice(1)} className="wm-lp__intro" />
            <div className="wm-phero__actions">
              <PillLink href="/kontakti/">{page.cta ?? "Безплатна консултация"}</PillLink>
              <a className="wm-draw" href={CONSULT_URL} target="_blank" rel="noopener">
                Запазете час за разговор
              </a>
            </div>
          </div>
          {page.image ? (
            <div className="wm-lp-hero__visual">
              <span className="wm-work__win">
                <img src={page.image.src} alt={page.image.alt} width={1600} height={799} fetchPriority="high" />
              </span>
            </div>
          ) : null}
        </div>
      </section>

      {toc.length > 2 ? (
        <nav className="wm-wrap wm-lp-toc" aria-label="На тази страница">
          <span className="wm-mono">На тази страница</span>
          <div>
            {toc.map((b) => (
              <a key={b.id} href={`#${b.id}`}>
                {b.h2}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      {page.blocks.map((b, i) => (
        <Block block={b} key={i} />
      ))}
      <Related current={page.path} />
      {children}
    </SitePage>
  );
}
