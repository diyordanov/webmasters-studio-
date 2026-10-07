import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

import { submitLead } from "@/lib/api/contact.functions";

import { CONTACTS } from "./chrome";
import { SplitHeading } from "./split";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = { tone: "idle" | "ok" | "err"; text: string };

const SERVICES = [
  "Уеб разработка по поръчка",
  "Онлайн магазин",
  "SEO одит и оптимизация",
  "Google Ads",
  "Абонаментна поддръжка",
  "Още не съм сигурен",
];

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get("name") ?? "").trim();
  const email = String(f.get("email") ?? "").trim();
  const message = String(f.get("message") ?? "").trim();
  if (name.length < 2) e.name = "Въведете името си.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Въведете валиден имейл.";
  if (message.length < 10) e.message = "Разкажете ни малко повече (поне 10 символа).";
  return e;
}

/** Submit CTA: outlined pill with a green sweep fill and a pending state. */
function SubmitCta({ pending }: { pending: boolean }) {
  return (
    <span className="wm-magnet" data-magnet="">
      <button className="wm-submit" type="submit" disabled={pending}>
        {pending ? "Изпращане..." : "Изпратете"}
      </button>
    </span>
  );
}

export function ContactSection({ title = "Разкажете ни за проекта.", as = "h2" }: { title?: string; as?: "h2" | "h3" } = {}) {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const found = validate(fd);
    setErrors(found);
    if (Object.keys(found).length) return;
    setPending(true);
    setStatus({ tone: "idle", text: "" });
    try {
      const res = await submitLead({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          service: String(fd.get("service") ?? ""),
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
        },
      });
      if (res.ok) {
        form.reset();
        setStatus({ tone: "ok", text: "Благодарим! Получихме запитването ви и ще се свържем с вас." });
      } else {
        setStatus({ tone: "err", text: "Не успяхме да изпратим запитването. Опитайте отново или ни пишете на office@webmasters.bg." });
      }
    } catch {
      setStatus({ tone: "err", text: "Възникна грешка при изпращането. Проверете връзката и опитайте отново." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="wm-sec" id="kontakt" aria-labelledby="kontakt-h">
      <div className="wm-wrap wm-contact">
        <div>
          <img className="wm-contact__icon" data-drift="-0.1" src="/assets/icons/icon-6.webp" alt="" width={64} height={64} />
          <SplitHeading id="kontakt-h" text={title} as={as} />
          <p className="wm-lead">
            Попълнете формата и ще се свържем с вас, за да уточним детайлите. Срещата може да е на живо или онлайн.
          </p>
          <ul className="wm-contact__direct">
            <li>
              <span className="wm-mono">{CONTACTS.office.label}</span>
              <a href={CONTACTS.office.href}>{CONTACTS.office.display}</a>
            </li>
            <li>
              <span className="wm-mono">{CONTACTS.manager.label}</span>
              <a href={CONTACTS.manager.href}>{CONTACTS.manager.display}</a>
            </li>
            <li>
              <span className="wm-mono">Имейл</span>
              <a href={CONTACTS.email.href}>{CONTACTS.email.display}</a>
            </li>
            <li>
              <span className="wm-mono">Адрес</span>
              <a href="https://share.google/4RPn33PomfQR7hgXd" target="_blank" rel="noopener">
                бул. „Цар Освободител“ 24, Варна
              </a>
            </li>
            <li>
              <span className="wm-mono">Работно време</span>
              <span>Понеделник – петък, 9:30 – 18:30</span>
            </li>
          </ul>
        </div>
        <form className="wm-form" onSubmit={onSubmit} noValidate>
          <div className="wm-form__row">
            <div className="wm-field">
              <label htmlFor="f-name">Име</label>
              <input id="f-name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name ? <p className="wm-field__err">{errors.name}</p> : null}
            </div>
            <div className="wm-field">
              <label htmlFor="f-email">Имейл</label>
              <input id="f-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
              {errors.email ? <p className="wm-field__err">{errors.email}</p> : null}
            </div>
          </div>
          <div className="wm-form__row">
            <div className="wm-field">
              <label htmlFor="f-phone">Телефон (по избор)</label>
              <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="wm-field">
              <label htmlFor="f-service">Услуга</label>
              <div className="wm-select">
                <select id="f-service" name="service" defaultValue={SERVICES[0]}>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="wm-field">
            <label htmlFor="f-msg">Съобщение</label>
            <textarea id="f-msg" name="message" placeholder="С какво се занимавате и какъв сайт ви трябва?" aria-invalid={!!errors.message} />
            {errors.message ? <p className="wm-field__err">{errors.message}</p> : null}
          </div>
          <div className="wm-hp" aria-hidden="true">
            <label htmlFor="f-web">Уебсайт</label>
            <input id="f-web" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <SubmitCta pending={pending} />
          </div>
          <p className="wm-form__status" data-tone={status.tone} role="status" aria-live="polite">
            {status.text}
          </p>
        </form>
      </div>
    </section>
  );
}
