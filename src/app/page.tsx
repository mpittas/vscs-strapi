import {
  CTA,
  Contact,
  Hero,
  ClientLogos,
  WhatWeOffer,
  AboutUs,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />
      <WhatWeOffer />
      <CTA />
      <Contact />
    </>
  );
}
