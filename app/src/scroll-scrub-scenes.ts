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
import { HeroActions, SceneLink } from "@/components/site/chrome";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#B4FF00",
  background: "#0A1024",
  ink: "#EEF1F8",
  muted: "#9AA3BD",
};

const seg = (n: number) => ({
  clip: `/assets/world/scene-0${n}-sharp.mp4`,
  poster: `/assets/world/scene-0${n}-poster-sharp.webp`,
});

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    ...seg(1),
    id: "start",
    label: "Старт",
    title: "Изработка на сайт Варна",
    body: "Уеб Мастърс Студио е екип от Варна, който изработва бързи сайтове и онлайн магазини по поръчка за малък и среден бизнес. Без шаблони, с ясна структура и дизайн, който носи запитвания.",
    actions: createElement(HeroActions),
    scroll: 1.3,
  },
  {
    ...seg(2),
    id: "struktura",
    label: "Структура",
    title: "SEO оптимизация Варна",
    body: "Технически SEO одит, оптимизация на съдържанието и локално SEO с Google Business Profile, за да ви намират клиентите във Варна и региона точно когато търсят вашите услуги.",
    tags: ["SEO одит", "Локално SEO", "Google Business Profile"],
    actions: createElement(SceneLink, { href: "/seo-optimizatsiya-varna/", children: "SEO оптимизация във Варна" }),
    align: "right",
    scroll: 1.2,
  },
  {
    ...seg(3),
    id: "razrabotka",
    label: "Разработка",
    title: "Маркетинг агенция Варна",
    body: "Google Ads кампании, анализи и проследяване на конверсиите от един екип. Свързваме сайта, рекламата и SEO-то в обща стратегия, която води повече клиенти към бизнеса ви.",
    tags: ["Google Ads", "Анализи", "Конверсии"],
    actions: createElement(SceneLink, { href: "/marketing-agentsiya-varna/", children: "Маркетинг агенция Варна" }),
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
