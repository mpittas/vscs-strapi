import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProjectsFilter from "@/components/ProjectsFilter";
import { getPaginatedProjects } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Проекти",
  description:
    "Разгледайте нашите завършени и текущи проекти за соларни инсталации.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { data: projects, meta } = await getPaginatedProjects(
    1,
    6,
    undefined,
    locale,
  );

  return (
    <>
      <PageTitle
        title="Проекти"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "ПРОЕКТИ" }]}
      />

      <Section paddingY="sm" bgColor="white">
        <Container>
          <ProjectsFilter
            initialProjects={projects}
            initialMeta={meta}
            locale={locale}
          />
        </Container>
      </Section>
    </>
  );
}
