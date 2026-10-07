import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { AudienceSection } from "@/components/site/audience";
import { ContactSection } from "@/components/site/contact";
import { FAQ, FaqSection } from "@/components/site/faq";
import { BUSINESS_LD, faqLd, OG_IMAGE, SITE_URL, siteHead, WEBSITE_LD } from "@/components/site/head";
import { MobileJourney } from "@/components/site/mobile-journey";
import { SitePage } from "@/components/site/page-parts";
import { OfferSection, ProcessSection, ServicesSection, WorkSection } from "@/components/site/sections";
import "@/components/site/site.css";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  head: () => ({
    ...siteHead,
    links: [...siteHead.links, { rel: "canonical", href: `${SITE_URL}/` }],
    meta: [
      ...siteHead.meta,
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "bg_BG" },
      { property: "og:site_name", content: "Уеб Мастърс Студио" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Уеб Мастърс Студио: изработка на сайт, SEO, маркетинг и AI във Варна" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    ],
    scripts: [BUSINESS_LD, WEBSITE_LD, faqLd(FAQ)].map((data) => ({ type: "application/ld+json", children: JSON.stringify(data) })),
  }),
  component: Index,
});

/** Desktop plays the scrub film; phones get the pinned canvas sequence. */
function Hero() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <div id="top">
      {mobile ? null : (
        <div className="wm-desk">
          <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />
        </div>
      )}
      <MobileJourney scenes={scrollScrubScenes} enabled={mobile} />
    </div>
  );
}

function Index() {
  return (
    <SitePage current="/">
      <Hero />
      <ServicesSection more />
      <WorkSection more />
      <AudienceSection />
      <ProcessSection />
      <OfferSection />
      <FaqSection />
      <ContactSection />
    </SitePage>
  );
}
