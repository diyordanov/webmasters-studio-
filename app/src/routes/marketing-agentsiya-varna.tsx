import { createFileRoute } from "@tanstack/react-router";

import { LocalPage, localHead } from "@/components/site/local-page";
import { LOCAL_PAGES } from "@/components/site/local-pages";
import "@/components/site/site.css";

const page = LOCAL_PAGES.marketing;

export const Route = createFileRoute("/marketing-agentsiya-varna")({
  head: () => localHead(page),
  component: MarketingVarnaPage,
});

function MarketingVarnaPage() {
  return <LocalPage page={page} />;
}
