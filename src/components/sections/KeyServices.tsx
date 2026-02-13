"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function KeyServices() {
  const { t } = useTranslation("services");

  const services = useMemo(
    () => [
      {
        title: t("key_services.items.preparation.title"),
        description: t("key_services.items.preparation.description"),
        image: "/images/man-in-solar-panel-field.jpg",
        icon: "/icons/project-icon-dark.svg",
        items: t("key_services.items.preparation.list", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("key_services.items.electrical.title"),
        description: t("key_services.items.electrical.description"),
        image: "/images/team-crew-inspecting-panels.jpg",
        icon: "/icons/project-icon-dark.svg",
        items: t("key_services.items.electrical.list", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("key_services.items.logistics.title"),
        description: t("key_services.items.logistics.description"),
        image: "/images/panel-rows-outdoors.jpg",
        icon: "/icons/project-icon-dark.svg",
        items: t("key_services.items.logistics.list", {
          returnObjects: true,
        }) as string[],
      },
    ],
    [t],
  );

  return (
    <Section paddingY="xl" className="bg-[#EDEDED]">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <Heading as="h2" className="mb-6">
              {t("key_services.title")}
            </Heading>
            <Text className="text-slate-600 max-w-xl">
              {t("key_services.description")}
            </Text>
          </div>
          <Button href="/kontakti" variant="primary" showIcon>
            {t("key_services.contact_us")}
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-[10px] rounded-[22px] flex flex-col h-full flex-1"
            >
              {/* Image Section */}
              <div className="relative h-[240px] rounded-[20px] mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-[20px]"
                />

                {/* Icon Badge */}
                <div className="absolute bottom-[-14] left-4 w-16 h-16 rounded-full bg-brand-green flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="text-black" // The SVG is black by default as per request
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-6 flex-grow flex flex-col">
                <Heading as="h4" className="mb-2 text-[22px] font-bold">
                  {service.title}
                </Heading>

                <Text className="text-slate-600 text-base pb-5">
                  {service.description}
                </Text>

                <div className="mt-auto space-y-5 pt-5 border-t border-slate-100">
                  {Array.isArray(service.items) &&
                    service.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="inline-flex items-start gap-3 text-dark-green text-sm"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full bg-black mt-0.5 bg-[url('/icons/small-chevron.svg')] bg-[length:5px] bg-[position:50%_50%] bg-no-repeat" />
                        <span className="font-medium text-black leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
