"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import InfoItem from "@/components/ui/InfoItem";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";

import { useTranslation } from "react-i18next";

export default function WhyUs() {
  const { t } = useTranslation("home");

  const infoItems = [
    {
      title: t("why_us.items.team.title"),
      description: t("why_us.items.team.desc"),
    },
    {
      title: t("why_us.items.solutions.title"),
      description: t("why_us.items.solutions.desc"),
    },
    {
      title: t("why_us.items.plans.title"),
      description: t("why_us.items.plans.desc"),
    },
    {
      title: t("why_us.items.support.title"),
      description: t("why_us.items.support.desc"),
    },
    {
      title: t("why_us.items.equipment.title"),
      description: t("why_us.items.equipment.desc"),
    },
    {
      title: t("why_us.items.installation.title"),
      description: t("why_us.items.installation.desc"),
    },
  ];

  return (
    <Section paddingY="xl" bgColor="dark">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          {/* Left Column - Images */}
          <div className="relative pr-12 pb-12">
            {/* Main Image */}
            <div className="relative h-[300px] lg:h-[580px] rounded-4xl overflow-hidden ">
              <Image
                src="/images/why-us-big.jpg"
                alt="Solar panels installation"
                fill
                unoptimized
                className="object-cover"
              />

              {/* Stats Badge */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-3xl px-5 py-5 text-center">
                <Text className="text-white text-3xl lg:text-4xl mb-1">
                  325%
                </Text>
                <Text variant="body-12" className="text-white">
                  {t("why_us.stats_badge.text_1")}
                  <br />
                  {t("why_us.stats_badge.text_2")}
                </Text>
              </div>
            </div>

            {/* Overlapping Image with Badge */}
            <div className="absolute bottom-0 right-0 w-[200px] lg:w-[280px] h-[160px] lg:h-[360px] rounded-4xl overflow-hidden">
              <Image
                src="/images/why-us-sm.jpg"
                alt="Solar installation close-up"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Subheading */}
            <BadgeDefault variant="glass" uppercase className="mb-6">
              {t("why_us.subheader")}
            </BadgeDefault>

            {/* Title */}
            <Heading as="h2" className="text-white mb-12">
              {t("why_us.title_part1")}
              <br />
              <span className="text-brand-green">
                {t("why_us.title_highlight")}
              </span>
              {t("why_us.title_q")}
            </Heading>

            {/* Info Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
              {infoItems.map((item, index) => (
                <InfoItem
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
