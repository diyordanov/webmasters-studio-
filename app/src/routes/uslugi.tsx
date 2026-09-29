import { createFileRoute } from "@tanstack/react-router";

import { CONSULT_URL } from "@/components/site/chrome";
import { FaqSection } from "@/components/site/faq";
import { PackagesSection, PageHero, pageHead, PillLink, SitePage } from "@/components/site/page-parts";
import { OfferSection, ProcessSection, ServicesSection } from "@/components/site/sections";
import "@/components/site/site.css";

export const Route = createFileRoute("/uslugi")({
  head: () =>
    pageHead(
      "Услуги: изработка на сайт, SEO и Google Ads | Уеб Мастърс Студио",
      "Изработка на сайт по поръчка, онлайн магазини, SEO оптимизация, Google Ads и абонаментна поддръжка от Уеб Мастърс Студио във Варна.",
    ),
  component: UslugiPage,
});

function UslugiPage() {
  return (
    <SitePage current="/uslugi">
      <PageHero
        current="/uslugi"
        title="Уеб дизайн, SEO и реклама под един покрив."
        lead="Добрата визия е само началото. След изработката идват маркетингът, рекламата и оптимизацията, които превръщат посетителите в дългосрочни клиенти. Поемаме целия път."
      >
        <PillLink href="/kontakti">Поискайте оферта</PillLink>
        <a className="wm-draw" href={CONSULT_URL} target="_blank" rel="noopener">
          Безплатна консултация
        </a>
      </PageHero>
      <ServicesSection />
      <PackagesSection />
      <ProcessSection />
      <FaqSection />
      <OfferSection />
    </SitePage>
  );
}
