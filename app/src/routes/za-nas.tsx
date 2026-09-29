import { createFileRoute } from "@tanstack/react-router";

import { PageHero, pageHead, PillLink, SitePage, StatsSection, TeamSection, TestimonialsSection, ValuesSection } from "@/components/site/page-parts";
import { OfferSection } from "@/components/site/sections";
import "@/components/site/site.css";

export const Route = createFileRoute("/za-nas")({
  head: () =>
    pageHead(
      "За нас: уеб агенция от Варна | Уеб Мастърс Студио",
      "Уеб Мастърс Студио е екип от Варна за уеб дизайн, изработка на сайтове, SEO и онлайн маркетинг. Запознайте се с хората и ценностите ни.",
    ),
  component: ZaNasPage,
});

function ZaNasPage() {
  return (
    <SitePage current="/za-nas">
      <PageHero
        current="/za-nas"
        title="Вашият дигитален партньор от Варна."
        lead="Ние сме емоционални създатели на дигитални преживявания за всеки бизнес и всяка ниша. Екип от дизайнер, разработчик и маркетинг специалист, който работи с вас от идеята до резултатите."
      >
        <PillLink href="/kontakti">Да поговорим</PillLink>
      </PageHero>
      <StatsSection />
      <ValuesSection />
      <TeamSection />
      <TestimonialsSection />
      <OfferSection />
    </SitePage>
  );
}
