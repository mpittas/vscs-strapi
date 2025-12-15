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
      <CTA />
      <Contact />
    </>
  );
}
