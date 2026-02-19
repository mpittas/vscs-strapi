"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import ServiceSteps from "./ServiceSteps";

export default function InstallationTypes() {
  const { t } = useTranslation("services");

  const installationTypes = useMemo(
    () => [
      {
        title: t("installation_types.items.ground.title"),
        description: t("installation_types.items.ground.description"),
        image: "/images/type-of-service-1.jpg",
      },
      {
        title: t("installation_types.items.industrial.title"),
        description: t("installation_types.items.industrial.description"),
        image: "/images/type-of-service-2.jpg",
      },
      {
        title: t("installation_types.items.hybrid.title"),
        description: t("installation_types.items.hybrid.description"),
        image: "/images/type-of-service-3.jpg",
      },
    ],
    [t],
  );

  return (
    <Section paddingY="xl" bgColor="white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <Heading as="h2" className="mb-6 text-slate-900">
            {t("installation_types.title")}
          </Heading>
        </div>

        <ServiceSteps />
      </Container>
    </Section>
  );
}
