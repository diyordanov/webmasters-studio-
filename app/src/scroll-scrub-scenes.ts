/**
 * Scene data for the scroll-scrub journey. Single-shot film, split at exact
 * frame boundaries into four consecutive segments so every chapter owns a
 * stretch of the same continuous take (seams are pixel-identical).
 */
import { createElement } from "react";

import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";
import { HeroActions } from "@/components/site/chrome";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#B4FF00",
  background: "#0A1024",
  ink: "#EEF1F8",
  muted: "#9AA3BD",
};

const seg = (n: number) => ({
  clip: `/assets/world/scene-0${n}.mp4`,
  poster: `/assets/world/scene-0${n}-poster.png`,
});

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    ...seg(1),
    id: "start",
    label: "Старт",
    title: "Сайтове, които продават.",
    body: "Уеб Мастърс Студио проектира и изгражда сайтове, онлайн магазини и рекламни кампании за малък и среден бизнес в България.",
    actions: createElement(HeroActions),
    scroll: 1.3,
  },
  {
    ...seg(2),
    id: "struktura",
    label: "Структура",
    title: "Първо структура.",
    body: "Всеки проект започва с цел, аудитория и ясна архитектура на страниците, преди първия пиксел дизайн.",
    tags: ["UX структура", "Прототип"],
    align: "right",
    scroll: 1.2,
  },
  {
    ...seg(3),
    id: "razrabotka",
    label: "Разработка",
    title: "Код без шаблони.",
    body: "React, Vite и TypeScript или WordPress и WooCommerce, според задачата. Бързо, адаптивно и готово за SEO.",
    tags: ["React", "WordPress", "SEO"],
    scroll: 1.2,
  },
  {
    ...seg(4),
    id: "rastezh",
    label: "Растеж",
    title: "Пускане и растеж.",
    body: "Search Console, анализи, Google Ads и абонаментна поддръжка, за да расте сайтът заедно с бизнеса ви.",
    align: "right",
    scroll: 1.3,
  },
];
