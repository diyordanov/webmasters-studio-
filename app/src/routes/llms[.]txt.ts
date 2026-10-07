import { createFileRoute } from "@tanstack/react-router";

// llms.txt: a plain summary of the studio and its key pages for AI assistants
// and answer engines (ChatGPT, Perplexity, Gemini, Claude).
const BODY = `# Уеб Мастърс Студио (webmasters.bg)

> Уеб агенция от Варна, България. Изработка на сайтове и онлайн магазини по поръчка, SEO оптимизация, маркетинг (Google Ads, Facebook и Instagram реклама) и AI решения (чатботове, асистенти, автоматизации) за малък и среден бизнес във Варна, София, Пловдив и цялата страна.

- Телефон: +359 876 071 570
- Имейл: office@webmasters.bg
- Град: Варна, България
- Езици: български, английски
- Над 50 изработени сайта и онлайн магазина; работим с договор и фактура, на живо или онлайн.

## Услуги

- [Изработка на сайт Варна](https://webmasters.bg/izrabotka-na-sayt-varna/): landing страници, сайтове тип визитка и сайтове по поръчка, мобилни и SEO оптимизирани.
- [Изработка на онлайн магазин Варна](https://webmasters.bg/izrabotka-na-onlayn-magazin-varna/): WooCommerce магазини с плащане с карта, наложен платеж, Еконт и Спиди.
- [SEO оптимизация Варна](https://webmasters.bg/seo-optimizatsiya-varna/): технически SEO одит, локално SEO, Google Business Profile, съдържание, оптимизация за AI търсене.
- [Маркетинг агенция Варна](https://webmasters.bg/marketing-agentsiya-varna/): Google Ads, реклама във Facebook и Instagram, анализи и проследяване на конверсии.
- [AI агенция Варна](https://webmasters.bg/ai-agentsiya-varna/): AI чатботове за сайт, асистенти за продажби, автоматизация на бизнес процеси.
- [Всички услуги и пакети](https://webmasters.bg/uslugi/)

## За студиото

- [Проекти и портфолио](https://webmasters.bg/proekti/)
- [За нас и екипът](https://webmasters.bg/za-nas/)
- [Контакти и запитване](https://webmasters.bg/kontakti/)
`;

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BODY, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        }),
    },
  },
});
