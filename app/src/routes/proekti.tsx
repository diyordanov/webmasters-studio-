import { createFileRoute } from "@tanstack/react-router";

import { PageHero, pageHead, PillLink, ProjectsGrid, SitePage, StatsSection, TestimonialsSection } from "@/components/site/page-parts";
import { OfferSection, WorkSection } from "@/components/site/sections";
import { innerPageLd } from "@/components/site/head";
import "@/components/site/site.css";

export const Route = createFileRoute("/proekti")({
  head: () =>
    pageHead(
      "Проекти: изработени сайтове и онлайн магазини | Уеб Мастърс Студио",
      "Портфолио на Уеб Мастърс Студио: над 50 изработени сайта, landing страници и онлайн магазини за бизнеси от България и Европа.",
      "/proekti/",
      [innerPageLd("CollectionPage", "/proekti/", "Проекти", "Портфолио: изработени сайтове, landing страници и онлайн магазини.", "Проекти")],
    ),
  component: ProektiPage,
});

function ProektiPage() {
  return (
    <SitePage current="/proekti/">
      <PageHero
        current="/proekti/"
        title="Сайтове, които работят за бизнеса."
        lead="Над 50 проекта за малък и среден бизнес: landing страници, фирмени сайтове и онлайн магазини. Разгледайте избраните и цялото портфолио по категории."
      >
        <PillLink href="/kontakti/">Искам такъв сайт</PillLink>
      </PageHero>
      <StatsSection />
      <WorkSection />
      <ProjectsGrid />
      <TestimonialsSection />
      <OfferSection />
    </SitePage>
  );
}
