import {
  CTA,
  Contact,
  Hero,
  ClientLogos,
  WhyUs,
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
      <WhyUs />
      <CTA />
      <Contact />
    </>
  );
}
