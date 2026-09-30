import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        // Only the real domain is indexed; preview hosts (e.g. *.higgsfield.app) are kept out of search.
        const host = new URL(request.url).hostname.replace(/^www\./, "");
        const body =
          host === "webmasters.bg"
            ? ["User-agent: *", "Allow: /", "", `Sitemap: ${origin}/sitemap.xml`].join("\n")
            : ["User-agent: *", "Disallow: /"].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
