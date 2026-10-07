import { createFileRoute } from "@tanstack/react-router";

import { PageHero, pageHead, PillLink, SitePage, StatsSection, TeamSection, TestimonialsSection, ValuesSection } from "@/components/site/page-parts";
import { OfferSection } from "@/components/site/sections";
import { innerPageLd, SITE_URL } from "@/components/site/head";
import { TEAM } from "@/components/site/pages-data";
import "@/components/site/site.css";

export const Route = createFileRoute("/za-nas")({
  head: () =>
    pageHead(
      "За нас: уеб агенция от Варна | Уеб Мастърс Студио",
      "Уеб Мастърс Студио е екип от Варна за уеб дизайн, изработка на сайтове, SEO и онлайн маркетинг. Запознайте се с хората и ценностите ни.",
      "/za-nas/",
      [
        innerPageLd("AboutPage", "/za-nas/", "За нас", "Екипът на Уеб Мастърс Студио от Варна: дизайн, разработка, SEO и маркетинг.", "За нас", {
          mainEntity: {
            "@id": `${SITE_URL}/#business`,
            employee: TEAM.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, worksFor: { "@id": `${SITE_URL}/#business` } })),
          },
        }),
      ],
    ),
  component: ZaNasPage,
});

function ZaNasPage() {
  return (
    <SitePage current="/za-nas/">
      <PageHero
        current="/za-nas/"
        title="Вашият дигитален партньор от Варна."
        lead="Ние сме емоционални създатели на дигитални преживявания за всеки бизнес и всяка ниша. Екип от дизайнер, разработчик и маркетинг специалист, който работи с вас от идеята до резултатите."
      >
        <PillLink href="/kontakti/">Да поговорим</PillLink>
      </PageHero>
      <StatsSection />
      <ValuesSection />
      <TeamSection />
      <TestimonialsSection />
      <OfferSection />
    </SitePage>
  );
}
