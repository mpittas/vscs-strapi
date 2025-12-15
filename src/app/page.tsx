import {
  CTA,
  Contact,
  Hero,
  ClientLogos,
  WhyUs,
  AboutUs,
  OurServices,
  ProjectsOverview,
  BlogOverview,
  Marquee,
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
      
      <BlogOverview />
      <Marquee />
      <CTA />
      <Contact />
    </>
  );
}

