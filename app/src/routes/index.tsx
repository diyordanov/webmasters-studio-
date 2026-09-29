import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { AudienceSection } from "@/components/site/audience";
import { ContactSection } from "@/components/site/contact";
import { FaqSection } from "@/components/site/faq";
import { siteHead } from "@/components/site/head";
import { MobileJourney } from "@/components/site/mobile-journey";
import { SitePage } from "@/components/site/page-parts";
import { OfferSection, ProcessSection, ServicesSection, WorkSection } from "@/components/site/sections";
import "@/components/site/site.css";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  head: () => siteHead,
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
