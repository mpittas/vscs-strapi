import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProjectsFilter from "@/components/ProjectsFilter";
import { getPaginatedProjects } from "@/lib/strapi";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["projects"]);

  return {
    title: t("projects:metadata.title"),
    description: t("projects:metadata.description"),
  };
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "projects",
    "common",
  ]);
  const { data: projects, meta } = await getPaginatedProjects(
    1,
    6,
    undefined,
    locale,
  );

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["projects", "common"]}
    >
      <PageTitle
        title={t("projects:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("projects:breadcrumbs.projects") },
        ]}
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
    </TranslationsProvider>
  );
}
