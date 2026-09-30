import { createFileRoute } from "@tanstack/react-router";

import { LocalPage, localHead } from "@/components/site/local-page";
import { LOCAL_PAGES } from "@/components/site/local-pages";
import "@/components/site/site.css";

const page = LOCAL_PAGES.izrabotka;

export const Route = createFileRoute("/izrabotka-na-sayt-varna")({
  head: () => localHead(page),
  component: IzrabotkaVarnaPage,
});

function IzrabotkaVarnaPage() {
  return <LocalPage page={page} />;
}
