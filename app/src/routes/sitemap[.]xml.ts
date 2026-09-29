import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = new Date().toISOString().split("T")[0];
        const pages: Array<[string, string, string]> = [
          ["/", "weekly", "1.0"],
          ["/uslugi", "monthly", "0.9"],
          ["/proekti", "monthly", "0.8"],
          ["/za-nas", "monthly", "0.6"],
          ["/kontakti", "yearly", "0.7"],
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
