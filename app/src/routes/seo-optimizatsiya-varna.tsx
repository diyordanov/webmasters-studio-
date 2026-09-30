import { createFileRoute } from "@tanstack/react-router";

import { LocalPage, localHead } from "@/components/site/local-page";
import { LOCAL_PAGES } from "@/components/site/local-pages";
import "@/components/site/site.css";

const page = LOCAL_PAGES.seo;

export const Route = createFileRoute("/seo-optimizatsiya-varna")({
  head: () => localHead(page),
  component: SeoVarnaPage,
});

function SeoVarnaPage() {
  return <LocalPage page={page} />;
}
