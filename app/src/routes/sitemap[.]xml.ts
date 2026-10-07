import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Always list the production URLs (the preview host is not indexed).
        const origin = "https://webmasters.bg";
        // A real "last changed" date, not today's: a lastmod that moves on every
        // request teaches Google to ignore it. Bump it when page content changes.
        const today = "2026-10-07";
        // Trailing-slash URLs, matching the canonical tags (and the old WordPress URLs).
        const pages: Array<[string, string, string]> = [
          ["/", "weekly", "1.0"],
          ["/izrabotka-na-sayt-varna/", "monthly", "0.9"],
          ["/izrabotka-na-onlayn-magazin-varna/", "monthly", "0.9"],
          ["/seo-optimizatsiya-varna/", "monthly", "0.9"],
          ["/marketing-agentsiya-varna/", "monthly", "0.9"],
          ["/ai-agentsiya-varna/", "monthly", "0.8"],
          ["/uslugi/", "monthly", "0.8"],
          ["/proekti/", "monthly", "0.7"],
          ["/za-nas/", "monthly", "0.6"],
          ["/kontakti/", "yearly", "0.7"],
          ["/obshti-uslovia/", "yearly", "0.2"],
          ["/politika-za-poveritelnost-gdpr/", "yearly", "0.2"],
          ["/politika-za-biskvitki/", "yearly", "0.2"],
        ];
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...pages.map(([path, freq, prio]) =>
            [
              "  <url>",
              `    <loc>${origin}${path}</loc>`,
              `    <lastmod>${today}</lastmod>`,
              `    <changefreq>${freq}</changefreq>`,
              `    <priority>${prio}</priority>`,
              "  </url>",
            ].join("\n"),
          ),
          "</urlset>",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
