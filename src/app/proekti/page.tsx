import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProjectsFilter from "@/components/ProjectsFilter";
import { getProjects } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Проекти",
  description:
    "Разгледайте нашите завършени и текущи проекти за соларни инсталации.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageTitle
        title="Проекти"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "ПРОЕКТИ" }]}
      />

      <Section paddingY="sm" bgColor="white">
        <Container>
          <ProjectsFilter projects={projects} />
        </Container>
      </Section>
    </>
  );
}
