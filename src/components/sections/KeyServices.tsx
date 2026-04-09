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
  // Component renders 'Technologies' section title and cards

  const services = useMemo(
    () => [
      {
        title: t("key_services.items.fixed_tilt.title"),
        description: t("key_services.items.fixed_tilt.description"),
        image: "/images/service-box-img-1.jpg",
        icon: "/icons/service-white-box-icon-1.svg",
        items: t("key_services.items.fixed_tilt.list", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("key_services.items.tracker.title"),
        description: t("key_services.items.tracker.description"),
        image: "/images/service-box-img-2.jpg",
        icon: "/icons/service-white-box-icon-2.svg",
        items: t("key_services.items.tracker.list", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("key_services.items.agrivoltaic.title"),
        description: t("key_services.items.agrivoltaic.description"),
        image: "/images/service-box-img-3.jpg",
        icon: "/icons/service-white-box-icon-3.svg",
        items: t("key_services.items.agrivoltaic.list", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("key_services.items.bess.title"),
        description: t("key_services.items.bess.description"),
        image: "/images/vscs-energy-storage_converted.avif",
        icon: "/icons/service-white-box-icon-4.svg",
        items: t("key_services.items.bess.list", {
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
            <Text className="text-slate-700 max-w-xl">
              {t("key_services.description")}
            </Text>
          </div>
          <Button href="/kontakti" variant="primary" showIcon>
            {t("key_services.contact_us")}
          </Button>
        </div>

        {/* Cards Grid - Updated to 2 columns for 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-[10px] rounded-[22px] flex flex-col h-full"
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
                    className="text-black" // SVG color control
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-6 flex-grow flex flex-col">
                <Heading as="h4" className="mb-2 text-[22px] font-bold">
                  {service.title}
                </Heading>

                <Text className="text-slate-700 text-base pb-5">
                  {service.description}
                </Text>

                <div className="mt-auto space-y-5 pt-5 border-t border-slate-100">
                  {Array.isArray(service.items) &&
                    service.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="inline-flex items-start gap-3 text-dark-green"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full bg-black mt-0.5 mt-1.5 bg-[url('/icons/small-chevron.svg')] bg-[length:5px] bg-[position:56%_50%] bg-no-repeat" />
                        <span className="">{item}</span>
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
