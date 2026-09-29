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
