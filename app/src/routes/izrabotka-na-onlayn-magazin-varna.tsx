import { createFileRoute } from "@tanstack/react-router";

import { LocalPage, localHead } from "@/components/site/local-page";
import { LOCAL_PAGES } from "@/components/site/local-pages";
import "@/components/site/site.css";

const page = LOCAL_PAGES.shop;

export const Route = createFileRoute("/izrabotka-na-onlayn-magazin-varna")({
  head: () => localHead(page),
  component: ShopVarnaPage,
});

function ShopVarnaPage() {
  return <LocalPage page={page} />;
}
