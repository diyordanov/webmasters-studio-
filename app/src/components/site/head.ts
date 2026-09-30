/** Production origin. Canonical and og:url always point here (the preview host is not indexed). */
export const SITE_URL = "https://webmasters.bg";
export const OG_IMAGE = `${SITE_URL}/assets/og.jpg`;

/** The business as a local service (schema.org). Street address to be added once confirmed. */
export const BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Уеб Мастърс Студио",
  alternateName: ["Web Masters Studio", "Webmasters"],
  legalName: "Уеб Мастърс Студио 2024 ЕООД",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/brand/apple-touch-icon.png`,
  image: `${SITE_URL}/assets/og.jpg`,
  telephone: "+359876071570",
  email: "office@webmasters.bg",
  address: { "@type": "PostalAddress", addressLocality: "Варна", addressRegion: "Варна", addressCountry: "BG" },
  areaServed: [
    { "@type": "City", name: "Варна" },
    { "@type": "City", name: "София" },
    { "@type": "City", name: "Пловдив" },
    { "@type": "Country", name: "България" },
  ],
  founder: { "@type": "Person", name: "Димо Йорданов" },
  knowsAbout: ["Изработка на уебсайт", "Онлайн магазини", "SEO оптимизация", "Google Ads", "Дигитален маркетинг", "Изкуствен интелект"],
};

export const siteHead = {
  meta: [{ name: "theme-color", content: "#0A1024" }],
  links: [
    // Self-hosted fonts: preload the two files every page needs first (Cyrillic + Latin).
    { rel: "preload", href: "/assets/fonts/geist-300-800-cyrillic.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
    { rel: "preload", href: "/assets/fonts/geist-300-800-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/brand/favicon-32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/brand/favicon-16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/brand/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
};
