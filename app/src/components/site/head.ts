/** Production origin. Canonical and og:url always point here (the preview host is not indexed). */
export const SITE_URL = "https://webmasters.bg";
export const OG_IMAGE = `${SITE_URL}/assets/og-2026.jpg`;

/** The business as a local service (schema.org). Street address to be added once confirmed. */
export const BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Уеб Мастърс Студио",
  alternateName: ["Web Masters Studio", "Webmasters"],
  legalName: "Уебмастърс ЕООД",
  taxID: "207299525",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/brand/apple-touch-icon.png`,
  image: `${SITE_URL}/assets/og-2026.jpg`,
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

/** The site itself (schema.org WebSite), so engines tie every page to one entity. */
export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Уеб Мастърс Студио",
  alternateName: "Webmasters",
  inLanguage: "bg-BG",
  publisher: { "@id": `${SITE_URL}/#business` },
};

/**
 * Structured data for an inner page: a WebPage of the given type (AboutPage,
 * ContactPage, CollectionPage, ...) plus its breadcrumb, linked to the business.
 */
export function innerPageLd(type: string, path: string, name: string, description: string, crumb: string, extra: object = {}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "bg-BG",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...extra,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Начало", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ],
      },
    ],
  };
}

/** FAQPage from [question, answer] pairs. */
export function faqLd(items: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

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
