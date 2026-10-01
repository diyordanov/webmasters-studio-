import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/site/legal-page";
import { LEGAL_PAGES } from "@/components/site/legal-pages";
import "@/components/site/site.css";

const page = LEGAL_PAGES.cookies;

export const Route = createFileRoute("/politika-za-biskvitki")({
  head: () => legalHead(page),
  component: CookiesPage,
});

function CookiesPage() {
  return <LegalPage page={page} />;
}
