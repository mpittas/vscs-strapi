"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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
        <div className="max-w-3xl mb-16">
          <Heading as="h2" className="mb-6 text-slate-900">
            {t("installation_types.title")}
          </Heading>
          <Text className="text-slate-600">
            {t("installation_types.description")}
          </Text>
        </div>

        {/* Cards Row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {installationTypes.map((type, index) => (
            <div key={index} className="flex-1 flex flex-col">
              {/* Image */}
              <div className="relative h-[240px] rounded-[20px] overflow-hidden mb-6">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <Heading
                  as="h4"
                  className="mb-2 text-[22px] font-bold text-slate-900"
                >
                  {type.title}
                </Heading>
                <Text className="text-slate-600 text-base">
                  {type.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
