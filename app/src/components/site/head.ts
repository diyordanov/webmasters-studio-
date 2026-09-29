export const siteHead = {
  meta: [{ name: "theme-color", content: "#0A1024" }],
  links: [
    // Fonts load from <head> in parallel with the CSS (no @import chain).
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Geist+Mono:wght@400;500&display=swap",
    },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/brand/favicon-32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/brand/favicon-16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/brand/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
};
