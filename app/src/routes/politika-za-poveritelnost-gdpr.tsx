import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/site/legal-page";
import { LEGAL_PAGES } from "@/components/site/legal-pages";
import "@/components/site/site.css";

const page = LEGAL_PAGES.privacy;

export const Route = createFileRoute("/politika-za-poveritelnost-gdpr")({
  head: () => legalHead(page),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalPage page={page} />;
}
