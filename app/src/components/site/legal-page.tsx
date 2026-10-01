import type { ReactNode } from "react";

import { type LegalItem, type LegalPageData, LEGAL_PAGES } from "./legal-pages";
import { SiteLink } from "./link";
import { pageHead, SitePage } from "./page-parts";

export const legalHead = (page: LegalPageData) => pageHead(page.title, page.description, page.path);

// Emails, web addresses and mentions of the cookie policy become links.
const TOKEN = /([\w.+-]+@[\w-]+\.[\w.]+)|(https?:\/\/[^\s,]+|www\.[^\s,]+)|(Политика за бисквитки)/g;

function Linked({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [whole, mail, url, cookie] = m;
    if (mail) out.push(<a className="wm-lp__link" href={`mailto:${mail}`} key={at}>{mail}</a>);
    else if (url) {
      const href = url.startsWith("http") ? url : `https://${url}`;
      const internal = href.startsWith("https://webmasters.bg");
      out.push(
        internal ? (
          <SiteLink className="wm-lp__link" href="/" key={at}>{url}</SiteLink>
        ) : (
          <a className="wm-lp__link" href={href} target="_blank" rel="noopener" key={at}>{url}</a>
        ),
      );
    } else if (cookie) out.push(<SiteLink className="wm-lp__link" href="/politika-za-biskvitki/" key={at}>{cookie}</SiteLink>);
    else out.push(whole);
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Item({ item }: { item: LegalItem }) {
  if ("h3" in item) return <h3>{item.h3}</h3>;
  if ("ul" in item)
    return (
      <ul>
        {item.ul.map((t) => (
          <li key={t}>
            <Linked text={t} />
          </li>
        ))}
      </ul>
    );
  return (
    <p>
      <Linked text={item.p} />
    </p>
  );
}

export function LegalPage({ page }: { page: LegalPageData }) {
  const slug = (i: number) => `r${i + 1}`;
  return (
    <SitePage current={null}>
      <section className="wm-legal-hero" id="top">
        <div className="wm-wrap">
          <nav className="wm-phero__crumbs wm-mono" aria-label="Навигационна пътека">
            <SiteLink href="/">Начало</SiteLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.label}</span>
          </nav>
          <h1 className="wm-legal__h1">{page.label}</h1>
          <p className="wm-legal__upd wm-mono">Последна актуализация: {page.updated}</p>
        </div>
      </section>
      <div className="wm-wrap wm-legal">
        <aside className="wm-legal__side">
          <nav aria-label="Съдържание">
            <span className="wm-foot__label">Съдържание</span>
            <ol>
              {page.sections.map((s, i) => (
                <li key={s.h2}>
                  <a href={`#${slug(i)}`}>{s.h2.replace(/^\d+\.\s*/, "")}</a>
                </li>
              ))}
            </ol>
          </nav>
          <nav aria-label="Други документи" className="wm-legal__docs">
            <span className="wm-foot__label">Документи</span>
            {Object.values(LEGAL_PAGES).map((p) => (
              <SiteLink key={p.path} href={p.path} className={p.path === page.path ? "is-current" : undefined}>
                {p.label}
              </SiteLink>
            ))}
          </nav>
        </aside>
        <article className="wm-legal__body">
          {page.sections.map((s, i) => (
            <section key={s.h2} id={slug(i)} aria-labelledby={`${slug(i)}-h`}>
              <h2 id={`${slug(i)}-h`}>{s.h2}</h2>
              {s.items.map((it, j) => (
                <Item item={it} key={j} />
              ))}
            </section>
          ))}
        </article>
      </div>
    </SitePage>
  );
}
