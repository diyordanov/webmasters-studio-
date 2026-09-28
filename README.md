# webmasters.bg: редизайн

Нов уебсайт на Уеб Мастърс Студио: тъмносин фон, акцент `#B4FF00`, скрол анимация с генериран филм, 3D тесте „За кого работим“, въпроси като чат и контактна форма.

Демо: https://webmasters-studio.higgsfield.app

## Технологии

- React 19 + TanStack Start (SSR), Vite, TypeScript
- Cloudflare Workers; контактната форма пише в Cloudflare D1 (таблица `leads`, виж `app/migrations/`)
- Визиите и видеото са генерирани с Higgsfield

## Структура

- `app/src/routes/index.tsx`: началната страница
- `app/src/components/site/`: секциите, анимациите (`chrome.tsx` → `SiteMotion`), стиловете (`site.css`)
- `app/src/components/scroll-scrub/`: скрол видеото за десктоп
- `app/src/components/site/mobile-journey.tsx`: мобилната версия на филма (кадри върху canvas)
- `app/src/scroll-scrub-scenes.ts`: текстовете на четирите глави
- `app/public/assets/`: изображения, икони, видео и мобилни кадри
- `app/design-brief.md`: дизайн брифът
- `refs/`: сторибордове и изходни генерирани изображения

## Локално стартиране

```bash
cd app
bun install
bun run dev
```

Build: `bun run build`. Деплой: `wrangler deploy` след като свържеш D1 база в `wrangler.jsonc` (binding `DB`).
