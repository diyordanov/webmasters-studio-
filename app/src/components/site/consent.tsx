import { useEffect, useState } from "react";

import { SiteLink } from "./link";

/**
 * Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Empty: nothing is loaded.
 * GA is only injected after the visitor allows analytics (GDPR, Consent Mode v2 basic).
 */
export const GA_ID = "G-5W9GHC8T33";

/** Fired (e.g. from the footer) to reopen the cookie settings. */
export const CONSENT_OPEN_EVENT = "wm-consent-open";

type Consent = { v: 1; analytics: boolean; marketing: boolean; at: string };
const KEY = "wm-consent";

function readConsent(): Consent | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) ?? "null") as Consent | null;
    return c?.v === 1 ? c : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    // Private mode / blocked storage: the choice holds for this page view only.
  }
}

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; __wmGa?: boolean };

/** Loads GA once analytics or marketing is allowed, and keeps Google's consent state in sync. */
function applyConsent(c: Consent) {
  if (!GA_ID) return;
  const w = window as GtagWindow;
  const state = {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  };
  if (w.__wmGa) {
    w.gtag?.("consent", "update", state);
    return;
  }
  if (!c.analytics && !c.marketing) return;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    // gtag.js reads the raw `arguments` object from dataLayer.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  w.gtag("consent", "update", state);
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  w.__wmGa = true;
}

/** GDPR cookie banner: shown until the visitor chooses; reopened from the footer. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) applyConsent(saved);
    else setOpen(true);
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (a: boolean, m: boolean) => {
    const c: Consent = { v: 1, analytics: a, marketing: m, at: new Date().toISOString() };
    saveConsent(c);
    applyConsent(c);
    setOpen(false);
    setSettings(false);
  };

  if (!open) return null;
  return (
    <div className="wm-consent" role="dialog" aria-labelledby="wm-consent-h" aria-describedby="wm-consent-t">
      <p className="wm-consent__h" id="wm-consent-h">Бисквитки</p>
      <p className="wm-consent__t" id="wm-consent-t">
        Използваме необходими бисквитки, за да работи сайтът. С ваше съгласие ползваме и бисквитки за анализ и реклама, които ни
        помагат да подобряваме сайта. Можете да промените избора си по всяко време от долната част на страницата.{" "}
        <SiteLink href="/politika-za-biskvitki/">Политика за бисквитки</SiteLink>
      </p>
      {settings ? (
        <div className="wm-consent__opts">
          <label className="wm-consent__opt">
            <input type="checkbox" checked disabled />
            <span>
              <b>Необходими</b> Работата на сайта и запомняне на този избор. Винаги включени.
            </span>
          </label>
          <label className="wm-consent__opt">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>
              <b>Анализи</b> Анонимна статистика за посещенията (Google Analytics).
            </span>
          </label>
          <label className="wm-consent__opt">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>
              <b>Маркетинг</b> Измерване на рекламите в Google и Meta.
            </span>
          </label>
        </div>
      ) : null}
      <div className="wm-consent__btns">
        <button type="button" className="wm-consent__btn" onClick={() => choose(false, false)}>
          Само необходимите
        </button>
        {settings ? (
          <button type="button" className="wm-consent__btn" onClick={() => choose(analytics, marketing)}>
            Запази избора
          </button>
        ) : (
          <button type="button" className="wm-consent__btn" onClick={() => setSettings(true)}>
            Настройки
          </button>
        )}
        <button type="button" className="wm-consent__btn wm-consent__btn--acc" onClick={() => choose(true, true)}>
          Приемам всички
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the cookie settings. */
export function ConsentLink() {
  return (
    <button type="button" className="wm-foot__cookies" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      Настройки за бисквитки
    </button>
  );
}
