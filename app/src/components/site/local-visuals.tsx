/**
 * Code-drawn illustrations for the Varna landing pages.
 * Everything is HTML/SVG, so it is sharp, tiny and needs no image requests.
 * Figures inside the UI mock-ups are illustrative, and marked as such where they look like data.
 */
import type { CSSProperties, ReactNode } from "react";
import {
  BadgeCheck,
  Bot,
  Check,
  CreditCard,
  FileText,
  Globe,
  ImageIcon,
  Lock,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Video,
  Zap,
} from "lucide-react";

import type { HeroKind, Motif } from "./local-pages";

const img = (base: string, w: 640 | 900) => `${base}-${w}.webp`;

function Win({ src, alt, eager, className }: { src: string; alt: string; eager?: boolean; className?: string }) {
  return (
    <span className={`lv-win ${className ?? ""}`}>
      <img
        src={img(src, 900)}
        srcSet={`${img(src, 640)} 640w, ${img(src, 900)} 900w`}
        sizes="(max-width: 860px) 90vw, 560px"
        alt={alt}
        width={900}
        height={449}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
      />
    </span>
  );
}

function Chip({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={`lv-chip ${className ?? ""}`} style={style}>
      {children}
    </span>
  );
}

/* ---------- Hero visuals ---------- */

export function HeroVisual({ kind, image }: { kind: HeroKind; image?: { src: string; alt: string } }) {
  switch (kind) {
    case "sites":
      return (
        <div className="lvh lvh--sites" aria-hidden={image ? undefined : true}>
          <Win src="/assets/work/tumbarkov" alt="" className="lvh-sites__back lvh-sites__back--l" />
          <Win src="/assets/work/yug" alt="" className="lvh-sites__back lvh-sites__back--r" />
          <span className="lv-win lvh-sites__front">
            <img
              src={image?.src ?? "/assets/work/tonchev.webp"}
              srcSet="/assets/work/tonchev-640.webp 640w, /assets/work/tonchev-900.webp 900w, /assets/work/tonchev.webp 1600w"
              sizes="(max-width: 860px) 92vw, 620px"
              alt={image?.alt ?? ""}
              width={1600}
              height={799}
              fetchPriority="high"
            />
          </span>
          <Chip className="lvh-float lvh-float--a">
            <Sparkles size={15} aria-hidden="true" /> Безплатен дизайн до 24 ч
          </Chip>
          <Chip className="lvh-float lvh-float--b">
            <Zap size={15} aria-hidden="true" /> Бърз и мобилен
          </Chip>
        </div>
      );
    case "shop":
      return (
        <div className="lvh lvh--shop">
          <span className="lv-win lvh-shop__win">
            <img
              src="/assets/work/feedermania-900.webp"
              srcSet="/assets/work/feedermania-640.webp 640w, /assets/work/feedermania-900.webp 900w, /assets/work/feedermania.webp 1600w"
              sizes="(max-width: 860px) 92vw, 600px"
              alt={image?.alt ?? ""}
              width={1600}
              height={799}
              fetchPriority="high"
            />
          </span>
          <div className="lv-panel lvh-shop__checkout" aria-hidden="true">
            <div className="lv-row lv-row--head">
              <ShoppingCart size={16} /> <b>Поръчка</b> <span className="lv-muted">2 продукта</span>
            </div>
            <div className="lv-opt is-on">
              <span className="lv-radio" /> <Truck size={15} /> Еконт – до офис <span className="lv-muted">авт. цена</span>
            </div>
            <div className="lv-opt">
              <span className="lv-radio" /> <Package size={15} /> Спиди – до автомат
            </div>
            <div className="lv-pay">
              <Chip className="is-on">
                <CreditCard size={14} /> Карта
              </Chip>
              <Chip>Наложен платеж</Chip>
            </div>
            <span className="lv-btn">Завърши поръчката</span>
          </div>
          <Chip className="lvh-float lvh-float--a">
            <BadgeCheck size={15} aria-hidden="true" /> Нова поръчка
          </Chip>
        </div>
      );
    case "ads":
      return (
        <div className="lvh lvh--ads" aria-hidden="true">
          <div className="lv-panel lvh-ads__dash">
            <div className="lv-row lv-row--head">
              <span className="lv-logo-dot" /> <b>Google Ads · Варна</b> <span className="lv-muted lv-mono">примерен отчет</span>
            </div>
            <div className="lvh-ads__kpis">
              <div>
                <span className="lv-muted">Обаждания</span>
                <b>86</b>
                <em>+38%</em>
              </div>
              <div>
                <span className="lv-muted">Запитвания</span>
                <b>124</b>
                <em>+21%</em>
              </div>
              <div>
                <span className="lv-muted">Цена / запитване</span>
                <b>−17%</b>
                <em>по-евтино</em>
              </div>
            </div>
            <svg className="lv-chart" viewBox="0 0 400 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lvh-ads-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.45" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 110 L40 102 L80 106 L120 88 L160 92 L200 70 L240 74 L280 52 L320 46 L360 30 L400 18 L400 130 L0 130 Z" fill="url(#lvh-ads-g)" />
              <path className="lv-chart__line" d="M0 110 L40 102 L80 106 L120 88 L160 92 L200 70 L240 74 L280 52 L320 46 L360 30 L400 18" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="lv-panel lvh-ads__meta">
            <div className="lv-map">
              <span className="lv-map__ring" />
              <MapPin className="lv-map__pin" size={22} />
            </div>
            <div>
              <b>Facebook и Instagram</b>
              <span className="lv-muted">Радиус 3 км около обекта</span>
            </div>
          </div>
          <Chip className="lvh-float lvh-float--b">
            <Search size={15} /> „счетоводител варна“
          </Chip>
        </div>
      );
    case "chat":
      return (
        <div className="lvh lvh--chat" aria-hidden="true">
          <div className="lv-panel lvh-chat__win">
            <div className="lv-row lv-row--head">
              <span className="lv-avatar">
                <Bot size={18} />
              </span>
              <span>
                <b>AI асистент</b>
                <span className="lv-muted lv-online">хотел във Варна · онлайн</span>
              </span>
            </div>
            <div className="lv-bubbles">
              <p className="lv-b lv-b--me">Здравейте! Имате ли свободна стая за 12–15 юли?</p>
              <p className="lv-b">Да, имаме двойна стая с изглед към морето за 3 нощувки. Да я запазя ли за вас?</p>
              <p className="lv-b lv-b--me">Да, моля. За двама възрастни.</p>
              <p className="lv-b lv-b--typing">
                <i />
                <i />
                <i />
              </p>
            </div>
            <div className="lv-quick">
              <Chip>Цени</Chip>
              <Chip>Паркинг</Chip>
              <Chip>Говори с човек</Chip>
            </div>
          </div>
          <Chip className="lvh-float lvh-float--a">
            <Zap size={15} /> Отговор за секунди, 24/7
          </Chip>
          <Chip className="lvh-float lvh-float--b">
            <Globe size={15} /> BG · EN
          </Chip>
        </div>
      );
    case "serp":
      return (
        <div className="lvh lvh--serp" aria-hidden="true">
          <div className="lv-panel lvh-serp__win">
            <div className="lv-search">
              <Search size={16} /> seo оптимизация варна
            </div>
            <div className="lvh-serp__map">
              <svg viewBox="0 0 400 150" preserveAspectRatio="none">
                <path d="M0 40 C80 30 120 70 200 60 S330 20 400 40" />
                <path d="M0 110 C90 100 150 130 240 110 S350 90 400 120" />
                <path d="M120 0 C130 50 110 100 130 150" />
                <path d="M290 0 C280 60 300 100 285 150" />
              </svg>
              <MapPin className="lvh-serp__pin lvh-serp__pin--1" size={26} />
              <MapPin className="lvh-serp__pin lvh-serp__pin--2" size={20} />
              <MapPin className="lvh-serp__pin lvh-serp__pin--3" size={20} />
            </div>
            <div className="lvh-serp__list">
              <div className="is-top">
                <b>Уеб Мастърс Студио</b>
                <span className="lv-muted">SEO агенция · Варна · Отворено</span>
              </div>
              <div>
                <b className="lv-ghost" />
                <span className="lv-ghost lv-ghost--s" />
              </div>
              <div>
                <b className="lv-ghost" />
                <span className="lv-ghost lv-ghost--s" />
              </div>
            </div>
          </div>
          <Chip className="lvh-float lvh-float--a">
            <Check size={15} /> Core Web Vitals: добри
          </Chip>
          <Chip className="lvh-float lvh-float--b">
            <MapPin size={15} /> Google Maps
          </Chip>
        </div>
      );
  }
}

/* ---------- Card visuals ---------- */

export function MotifVisual({ m }: { m: Motif }) {
  return (
    <div className={`lv lv--${m}`} aria-hidden="true">
      <MotifBody m={m} />
    </div>
  );
}

function Lines({ n = 3 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span className="lv-line" key={i} style={{ "--w": `${92 - i * 17}%` } as CSSProperties} />
      ))}
    </>
  );
}

function MotifBody({ m }: { m: Motif }) {
  switch (m) {
    case "plan":
      return (
        <div className="lv-plan">
          {["Месец 1", "Месец 2", "Месец 3"].map((t, i) => (
            <div key={t} style={{ "--i": i } as CSSProperties}>
              <span className="lv-plan__bar" />
              <span className="lv-mono">{t}</span>
            </div>
          ))}
        </div>
      );
    case "channels":
      return (
        <div className="lv-orbit">
          <span className="lv-orbit__core">WM</span>
          {["Google", "Maps", "Facebook", "Instagram", "ChatGPT"].map((t, i) => (
            <Chip key={t} style={{ "--i": i } as CSSProperties}>
              {t}
            </Chip>
          ))}
        </div>
      );
    case "ads":
      return (
        <div className="lv-stack">
          <div className="lv-search">
            <Search size={14} /> счетоводител варна
          </div>
          <div className="lv-panel lv-ad">
            <span className="lv-mono">Спонсорирано</span>
            <b>Счетоводна кантора във Варна</b>
            <span className="lv-ad__call">☎ Обадете се</span>
          </div>
        </div>
      );
    case "radius":
      return (
        <div className="lv-map lv-map--big">
          <span className="lv-map__ring" />
          <span className="lv-map__ring lv-map__ring--2" />
          <MapPin className="lv-map__pin" size={24} />
          <Chip className="lv-map__label">Радиус 3 км</Chip>
        </div>
      );
    case "rank":
      return (
        <div className="lv-rank">
          <svg className="lv-chart" viewBox="0 0 300 120" preserveAspectRatio="none">
            <path className="lv-chart__line" d="M0 100 L50 92 L100 80 L150 70 L200 44 L250 30 L300 12" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <Chip className="is-on">Топ позиции</Chip>
        </div>
      );
    case "palette":
      return (
        <div className="lv-palette">
          <span className="lv-palette__mark">W</span>
          <div className="lv-palette__sw">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="lv-palette__type">Aa</span>
        </div>
      );
    case "site":
      return <Win src="/assets/work/yug" alt="" className="lv-site" />;
    case "chat":
      return (
        <div className="lv-bubbles lv-bubbles--mini">
          <p className="lv-b lv-b--me">Работите ли в събота?</p>
          <p className="lv-b">Да, от 10 до 16 ч. Да ви запиша ли час?</p>
        </div>
      );
    case "offer":
      return (
        <div className="lv-panel lv-doc">
          <div className="lv-row">
            <FileText size={16} /> <b>Оферта № 124</b>
          </div>
          <Lines n={3} />
          <Chip className="is-on">
            <Sparkles size={13} /> AI чернова
          </Chip>
        </div>
      );
    case "flow":
      return (
        <div className="lv-flow">
          {["Форма", "CRM", "Имейл"].map((t, i) => (
            <span className="lv-flow__node" key={t} style={{ "--i": i } as CSSProperties}>
              {t}
            </span>
          ))}
          <span className="lv-flow__ai">
            <Sparkles size={13} /> AI
          </span>
        </div>
      );
    case "media":
      return (
        <div className="lv-media">
          <span>
            <ImageIcon size={22} />
          </span>
          <span>
            <Video size={22} />
          </span>
          <span>
            <FileText size={22} />
          </span>
          <span className="is-on">
            <Sparkles size={22} />
          </span>
        </div>
      );
    case "ask":
      return (
        <div className="lv-stack">
          <div className="lv-search">
            <MessageCircle size={14} /> Коя е добра фирма във Варна?
          </div>
          <div className="lv-panel lv-answer">
            <span className="is-on">1. Уеб Мастърс Студио</span>
            <span className="lv-ghost" />
            <span className="lv-ghost lv-ghost--s" />
          </div>
        </div>
      );
    case "shield":
      return (
        <div className="lv-shield">
          <ShieldCheck size={54} strokeWidth={1.6} />
          <div>
            <Chip>
              <Check size={13} /> Архиви
            </Chip>
            <Chip>
              <Check size={13} /> Обновления
            </Chip>
            <Chip>
              <Lock size={13} /> SSL
            </Chip>
          </div>
        </div>
      );
    case "orders":
      return (
        <div className="lv-panel lv-orders">
          {[
            ["#1042", "Платена"],
            ["#1041", "Изпратена"],
            ["#1040", "Доставена"],
          ].map(([n, s], i) => (
            <div className="lv-row" key={n} style={{ "--i": i } as CSSProperties}>
              <span className="lv-mono">{n}</span>
              <span className="lv-line" style={{ "--w": "60%" } as CSSProperties} />
              <Chip className={i === 0 ? "is-on" : ""}>{s}</Chip>
            </div>
          ))}
        </div>
      );
    case "pay":
      return (
        <div className="lv-payv">
          <div className="lv-card">
            <CreditCard size={22} />
            <span className="lv-mono">•••• 4821</span>
          </div>
          <div className="lv-payv__chips">
            <Chip>Apple Pay</Chip>
            <Chip>Google Pay</Chip>
            <Chip className="is-on">Наложен платеж</Chip>
          </div>
        </div>
      );
    case "delivery":
      return (
        <div className="lv-panel lv-deliv">
          <div className="lv-opt is-on">
            <span className="lv-radio" /> <Truck size={15} /> Еконт – офис
          </div>
          <div className="lv-opt">
            <span className="lv-radio" /> <Package size={15} /> Спиди – автомат
          </div>
          <span className="lv-mono lv-muted">Доставката се смята сама</span>
        </div>
      );
    case "cart":
      return (
        <div className="lv-panel lv-prod">
          <span className="lv-prod__img">
            <Package size={30} strokeWidth={1.5} />
          </span>
          <div>
            <Lines n={2} />
            <b className="lv-prod__price">49,90 лв.</b>
            <span className="lv-btn lv-btn--s">
              <ShoppingCart size={13} /> Добави
            </span>
          </div>
        </div>
      );
    case "pillars":
      return (
        <div className="lv-pillars">
          {["Техника", "Съдържание", "Авторитет"].map((t, i) => (
            <div key={t} style={{ "--i": i } as CSSProperties}>
              <span className="lv-plan__bar" />
              <span className="lv-mono">{t}</span>
            </div>
          ))}
        </div>
      );
    case "mappack":
      return (
        <div className="lv-mappack">
          <div className="lv-map">
            <MapPin className="lv-map__pin" size={22} />
          </div>
          <div className="lv-panel">
            <span className="is-on">
              <b>Вашата фирма</b>
              <span className="lv-stars">
                <Star size={10} />
                <Star size={10} />
                <Star size={10} />
                <Star size={10} />
                <Star size={10} />
              </span>
            </span>
            <span className="lv-ghost" />
            <span className="lv-ghost lv-ghost--s" />
          </div>
        </div>
      );
    case "gauge":
      return (
        <div className="lv-gauge">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" className="lv-gauge__bg" />
            <circle cx="60" cy="60" r="50" className="lv-gauge__fg" />
          </svg>
          <b>95+</b>
          <span className="lv-mono">скорост</span>
        </div>
      );
    case "doc":
      return (
        <div className="lv-panel lv-doc">
          <span className="lv-line" style={{ "--w": "70%" } as CSSProperties} />
          <span className="lv-doc__kw">ключова дума + Варна</span>
          <Lines n={3} />
        </div>
      );
    case "links":
      return (
        <svg className="lv-links" viewBox="0 0 300 160">
          <g className="lv-links__edges">
            <path d="M150 80 L50 35" />
            <path d="M150 80 L60 130" />
            <path d="M150 80 L250 30" />
            <path d="M150 80 L255 125" />
            <path d="M150 80 L150 12" />
          </g>
          <circle className="lv-links__hub" cx="150" cy="80" r="18" />
          {[
            [50, 35],
            [60, 130],
            [250, 30],
            [255, 125],
            [150, 12],
          ].map(([x, y]) => (
            <circle className="lv-links__node" cx={x} cy={y} r="8" key={`${x}-${y}`} />
          ))}
        </svg>
      );
  }
}
