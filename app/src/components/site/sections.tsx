import type { CSSProperties } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { OfferCta } from "./chrome";
import { SplitHeading } from "./split";

const SERVICES = [
  { icon: "/assets/icons/icon-1.png", title: "Уеб разработка по поръчка", text: "Уникален дизайн и код, изградени около вашия бизнес, без готови шаблони.", stack: "React · Vite · TypeScript · Tailwind" },
  { icon: "/assets/icons/icon-2.png", title: "Онлайн магазини", text: "WordPress и WooCommerce магазини, които управлявате сами, без програмист за всяка промяна.", stack: "WordPress · WooCommerce" },
  { icon: "/assets/icons/icon-3.png", title: "SEO одит и оптимизация", text: "Технически одит, структура, скорост и съдържание, за да ви намират клиентите в Google.", stack: "Search Console · Core Web Vitals" },
  { icon: "/assets/icons/icon-4.png", title: "Google Ads", text: "Кампании с ясна структура, проследяване на конверсии и редовна оптимизация на бюджета.", stack: "Търсене · Ремаркетинг" },
  { icon: "/assets/icons/icon-5.png", title: "Абонаментна поддръжка", text: "Обновления, сигурност, архиви и промени по сайта, без да мислите за тях.", stack: "Месечен абонамент" },
];

export function ServicesSection() {
  return (
    <section className="wm-sec" id="uslugi" aria-labelledby="uslugi-h">
      <div className="wm-wrap wm-svc">
        <div className="wm-svc__head">
          <SplitHeading id="uslugi-h" text="Всичко за онлайн присъствието ви." />
          <p className="wm-lead">Пет услуги, един екип. Започваме от целта на бизнеса, а технологията избираме след това.</p>
          <div className="wm-svc__count" aria-hidden="true">
            <span data-svc-count="">01</span>
            <small>/ 05</small>
          </div>
        </div>
        <ul className="wm-svc__list">
          {SERVICES.map((s, i) => (
            <li className={`wm-svc__item${i === 0 ? " is-active" : ""}`} key={s.title} data-svc-item="">
              <span className="wm-svc__icon">
                <img src={s.icon} alt="" width={72} height={72} loading="lazy" />
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="wm-mono wm-svc__stack">{s.stack}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const WORK = [
  { key: "tonchev", title: "Tonchev Design", note: "Landing page с калкулатор", url: "https://tonchevdesign.bg/", alt: "Сайт на Tonchev Design за опънати тавани с калкулатор за цена" },
  { key: "elan", title: "Design Escape Academy", note: "Продажбена страница за събития", url: "https://academy.elandeluxedesign.com/", alt: "Продажбена страница на Design Escape Academy от Elan Deluxe Design" },
  { key: "tumbarkov", title: "Димитър Тумбарков", note: "Комплексен сайт", url: "https://tumbarkov.com/", alt: "Сайт на Димитър Тумбарков с книги, консултации и магазин" },
  { key: "feedermania", title: "Feedermania", note: "Онлайн магазин с над 500 продукта", url: "https://feedermaniabg.com/", alt: "Онлайн магазин Feedermania за риболовни принадлежности" },
  { key: "yug", title: "Yug Property", note: "Сайт с онлайн резервации", url: "https://yugproperty.com/", alt: "Сайт на Yug Property с апартаменти и онлайн резервации" },
];

export function WorkSection() {
  return (
    <section className="wm-work" id="proekti" data-pan="" aria-labelledby="proekti-h">
      <div className="wm-work__sticky">
        <div className="wm-wrap wm-work__head">
          <SplitHeading id="proekti-h" text="Сайтове, създадени за конкретен бизнес." />
          <p className="wm-lead">Реални проекти, които изработихме за наши клиенти: от landing страници до онлайн магазини.</p>
        </div>
        <div className="wm-work__track" data-pan-track="">
          {WORK.map((w) => (
            <article className="wm-work__card" key={w.key}>
              <a className="wm-work__link" href={w.url} target="_blank" rel="noopener" aria-label={`${w.title}: ${w.note} (отваря сайта)`}>
                <div className="wm-work__media" data-par="">
                  <img src={`/assets/work/${w.key}.webp`} srcSet={`/assets/work/${w.key}-900.webp 900w, /assets/work/${w.key}.webp 1800w`} sizes="(max-width: 860px) 100vw, 900px" alt={w.alt} width={1800} height={1125} loading="lazy" />
                </div>
                <div className="wm-work__meta">
                  <h3>{w.title}</h3>
                  <span className="wm-mono">
                    {w.note}
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Разговор", text: "Среща на живо или онлайн в Zoom или Google Meet. Изясняваме цели, аудитория и бюджет, преди да говорим за технологии." },
  { title: "Договор и дизайн", text: "Описваме обхвата, етапите и сроковете в договор. После проектираме структурата и визията на всяка страница." },
  { title: "Разработка и пускане", text: "Изграждаме, тестваме и публикуваме. След старта следим резултатите и поддържаме сайта актуален." },
];

export function ProcessSection() {
  return (
    <section className="wm-sec" id="proces" aria-labelledby="proces-h">
      <div className="wm-wrap">
        <SplitHeading id="proces-h" text="Как работим." />
        <p className="wm-lead">Три ясни стъпки, без изненади по пътя.</p>
        <div className="wm-steps">
          <span className="wm-steps__rail" data-rail="" aria-hidden="true">
            <i />
          </span>
          {STEPS.map((s, i) => (
            <div className="wm-step" key={s.title} data-step="">
              <span className="wm-step__dot" aria-hidden="true" />
              <span className="wm-step__ghost" data-drift="0.08" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="wm-step__head">
                <span className="wm-mono">Стъпка {i + 1}</span>
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INCLUDED = [
  "Уникален дизайн, без готови шаблони",
  "Адаптивен за телефон, таблет и компютър",
  "SEO-готова структура от първия ден",
  "Договор и фактура за всеки проект",
  "Поддръжка след пускането, по избор",
];

export function OfferSection() {
  return (
    <section className="wm-sec" id="oferta" aria-labelledby="oferta-h">
      <div className="wm-wrap wm-offer__stage">
        <div className="wm-offer" data-tilt="">
          <div>
            <SplitHeading id="oferta-h" text="Ясна оферта, преди да започнем." />
            <p className="wm-lead">Изпращате ни какво ви трябва, ние връщаме конкретно предложение с обхват, срокове и цена.</p>
          </div>
          <div>
            <ul className="wm-offer__check">
              {INCLUDED.map((t, i) => (
                <li key={t} style={{ "--i": i } as CSSProperties}>
                  <span className="wm-offer__tick">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <OfferCta />
          </div>
        </div>
      </div>
    </section>
  );
}

