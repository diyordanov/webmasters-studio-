import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/site/legal-page";
import { LEGAL_PAGES } from "@/components/site/legal-pages";
import "@/components/site/site.css";

const page = LEGAL_PAGES.terms;

export const Route = createFileRoute("/obshti-uslovia")({
  head: () => legalHead(page),
  component: TermsPage,
});

function TermsPage() {
  return <LegalPage page={page} />;
}
