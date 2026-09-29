import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import { SplitHeading } from "./split";
import { SiteLink } from "./link";

const FAQ = [
  ["Работите ли с договор и фактура?", "Да. За всеки проект подписваме договор, в който подробно описваме условията, етапите и сроковете, и издаваме фактура."],
  ["Можем ли да се срещнем онлайн?", "Разбира се. Срещаме се на живо или по видео разговор в Zoom, Google Meet или друга удобна за вас платформа."],
  ["В кои градове работите?", "Работим с клиенти от Варна, София, Пловдив и цялата страна. Повечето проекти протичат изцяло онлайн."],
  ["С какви технологии изграждате сайтовете?", "Според задачата: React, Vite и TypeScript за сайтове по поръчка или WordPress и WooCommerce, когато искате сами да управлявате съдържанието и магазина."],
  ["Защо ми е сайт, като имам социални мрежи?", "Социалните мрежи са страхотен канал за комуникация, но сайтът е мястото, където контролирате всичко: съдържанието, начина, по който клиентите се свързват с вас, и как ви намират в Google. Двете работят най-добре заедно."],
  ["Колко време отнема изработката?", "Landing страница е готова до 5 работни дни, сайт тип визитка до 12, а онлайн магазин до 21 работни дни. По-сложните проекти по поръчка планираме заедно с вас."],
  ["Поддържате ли сайта след пускането?", "Да. Предлагаме абонаментна поддръжка: обновления, сигурност, архиви и промени по съдържанието."],
];

/** FAQ as a conversation: pick a question, it is "sent", the studio types and answers. */
export function FaqSection() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(false);
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(true);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (i: number) => {
    if (i === active) {
      setOpen((o) => !o);
      return;
    }
    setOpen(true);
    setActive(i);
    setTyping(true);
    window.clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setShown(i);
    }, reduce ? 0 : 850);
  };

  const a = FAQ[shown][1];

  return (
    <section className="wm-sec" id="vaprosi" aria-labelledby="vaprosi-h">
      <div className="wm-wrap">
        <SplitHeading id="vaprosi-h" text="Често задавани въпроси." />
        <div className="wm-chat">
          <ul className="wm-chat__qs" aria-label="Въпроси">
            {FAQ.map(([question], i) => (
              <li key={question}>
                <button type="button" className={i === active ? "is-active" : undefined} aria-pressed={i === active} aria-expanded={i === active && open} onClick={() => pick(i)}>
                  <span className="wm-mono">0{i + 1}</span>
                  <span className="wm-chat__qtext">{question}</span>
                  <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
                </button>
                {i === active && open ? (
                  <div className="wm-chat__inline" aria-live="polite">
                    <img src="/assets/brand/mark.webp" alt="" width={28} height={28} />
                    {typing ? (
                      <p className="wm-chat__bubble wm-chat__bubble--typing" aria-label="Пише отговор">
                        <i />
                        <i />
                        <i />
                      </p>
                    ) : (
                      <p className="wm-chat__bubble wm-chat__bubble--us" key={`m-${shown}`}>
                        {FAQ[shown][1].split(" ").map((w, k) => (
                          <span key={k} style={{ "--i": k } as CSSProperties}>
                            {w}{" "}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="wm-chat__panel">
            <div className="wm-chat__head">
              <img src="/assets/brand/mark.webp" alt="" width={40} height={40} />
              <div>
                <b>Екипът на webmasters.bg</b>
                <span className="wm-mono">Отговори на най-честите въпроси</span>
              </div>
            </div>
            <div className="wm-chat__body" aria-live="polite">
              <p className="wm-chat__bubble wm-chat__bubble--me" key={`q-${active}`}>
                {FAQ[active][0]}
              </p>
              {typing ? (
                <p className="wm-chat__bubble wm-chat__bubble--typing" aria-label="Пише отговор">
                  <i />
                  <i />
                  <i />
                </p>
              ) : (
                <p className="wm-chat__bubble wm-chat__bubble--us" key={`a-${shown}`}>
                  {a.split(" ").map((w, i) => (
                    <span key={i} style={{ "--i": i } as CSSProperties}>
                      {w}{" "}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="wm-chat__foot">
              <span>Не намирате отговор?</span>
              <SiteLink className="wm-ask" href="/kontakti">
                Попитайте ни
                <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              </SiteLink>
            </div>
          </div>
        </div>
        <dl className="wm-sr">
          {FAQ.map(([qq, aa]) => (
            <div key={qq}>
              <dt>{qq}</dt>
              <dd>{aa}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
