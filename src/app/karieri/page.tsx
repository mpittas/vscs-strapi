import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import BadgeDefault from "@/components/ui/BadgeDefault";
import CareerItem from "@/components/CareerItem";
import { getCareers } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Кариери | VSCS",
  description:
    "Разгледайте отворените позиции и кандидатствайте за работа в VSCS.",
};

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <>
      <PageTitle
        title="Кариери"
        breadcrumbs={[{ label: "Начало", href: "/" }, { label: "Кариери" }]}
      />

      <Section bgColor="bg-white" paddingY="lg">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <BadgeDefault variant="primary" size="sm" className="mb-6">
              ОТВОРЕНИ ПОЗИЦИИ
            </BadgeDefault>
            <Heading as="h2" className="text-3xl md:text-4xl lg:text-5xl">
              Кандидатствай днес
            </Heading>
          </div>

          {/* Career Listings */}
          <div className="space-y-4">
            {careers.length > 0 ? (
              careers.map((career) => (
                <CareerItem
                  key={career.id}
                  title={career.title}
                  slug={career.slug}
                  location={career.location}
                  shortDescription={career.shortDescription}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Heading as="h3" className="text-xl text-slate-600">
                  Няма отворени позиции в момента
                </Heading>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
