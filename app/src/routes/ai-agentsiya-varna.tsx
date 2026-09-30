import { createFileRoute } from "@tanstack/react-router";

import { LocalPage, localHead } from "@/components/site/local-page";
import { LOCAL_PAGES } from "@/components/site/local-pages";
import "@/components/site/site.css";

const page = LOCAL_PAGES.ai;

export const Route = createFileRoute("/ai-agentsiya-varna")({
  head: () => localHead(page),
  component: AiVarnaPage,
});

function AiVarnaPage() {
  return <LocalPage page={page} />;
}
