import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/site/contact";
import { FaqSection } from "@/components/site/faq";
import { ConsultSection, PageHero, pageHead, SitePage } from "@/components/site/page-parts";
import "@/components/site/site.css";

export const Route = createFileRoute("/kontakti")({
  head: () =>
    pageHead(
      "Контакти | Уеб Мастърс Студио, Варна",
      "Свържете се с Уеб Мастърс Студио: +359 876 071 570, office@webmasters.bg. Безплатна консултация за изработка на сайт, SEO и Google Ads.",
      "/kontakti/",
    ),
  component: KontaktiPage,
});

function KontaktiPage() {
  return (
    <SitePage current="/kontakti/">
      <PageHero
        current="/kontakti/"
        title="Имате идея? Нека поговорим."
        lead="Независимо дали сте начинаещ предприемач или утвърден бизнес, ще ви помогнем с нов сайт, редизайн или маркетинг стратегия, която носи повече клиенти. Пишете ни, обадете се или запазете безплатна консултация."
      />
      <ContactSection />
      <ConsultSection />
      <FaqSection />
    </SitePage>
  );
}
