import {
  CTA,
  Contact,
  Hero,
  ClientLogos,
  WhatWeOffer,
  AboutUs,
  OurServices,
  ProjectsOverview,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />
      <OurServices />
      <ProjectsOverview />
      <WhatWeOffer />
      <CTA />
      <Contact />
    </>
  );
}
