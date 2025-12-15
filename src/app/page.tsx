import {
  CTA,
  Contact,
  Hero,
  ClientLogos,
  WhatWeOffer,
  AboutUs,
  OurServices,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />
      <OurServices />
      <WhatWeOffer />
      <CTA />
      <Contact />
    </>
  );
}
