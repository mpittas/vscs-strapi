"use client";
import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReadMoreButton from "@/components/ui/ReadMoreButton";

export default function AboutUs() {
  const { t } = useTranslation("home");
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    t("about_us.features.innovative"),
    t("about_us.features.sustainable"),
    t("about_us.features.expert"),
    t("about_us.features.quality"),
  ];

  const moreParagraphs = t("about_us.more_paragraphs", {
    returnObjects: true,
  }) as string[];

  return (
    <Section paddingY="lg" bgColor="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-20 items-center">
          {/* Left Column - Images */}
          <div className="relative">
            {/* Main images container */}
            <div className="flex gap-4 pb-10 lg:pb-20 pr-12 lg:pr-24">
              {/* First image */}
              <div className="flex-1 rounded-[50px] overflow-hidden z-1">
                <Image
                  src="/images/Enpal-KIT-Ruler-Solar-scaled.webp"
                  alt="Solar panel installation"
                  width={600}
                  height={800}
                  unoptimized
                  className="w-full h-[400] lg:h-[560px] object-cover rounded-4xl"
                />
              </div>

              <div className="absolute bottom-5 right-0 w-[60%] pr-4">
                <Image
                  src="/images/solar-bg-green-blur.jpg"
                  alt="Blurred solar background"
                  width={600}
                  height={600}
                  quality={100}
                  unoptimized
                  className="w-full h-[460px] object-cover rounded-[50px] blur-[15px]"
                />
              </div>
            </div>

            <div className="absolute top-5 left-autp rotate-180 right-0 lg:right-auto lg:-left-[25px] w-[90px] h-[90px] z-2">
              <Image
                src="/icons/globe-yellow-circle.svg"
                alt="Blurred solar background"
                width={90}
                height={90}
                quality={100}
                unoptimized
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="pt-2 lg:pt-0">
            {/* Title */}
            <div className="mb-6">
              <Heading as="h2">
                <span className="text-brand-green">
                  {t("about_us.title_highlight")}
                </span>{" "}
                {t("about_us.title_rest")}
              </Heading>
            </div>

            {/* Description */}
            <div className="mb-8">
              <Text variant="body-16" className="mb-4">
                {t("about_us.description_1")}
              </Text>
              <Text variant="body-16" className="mb-4">
                {t("about_us.description_2")}
              </Text>

              {/* Revealable content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded
                  ? "max-h-[1500px] opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-4 pt-0 pb-4">
                  {Array.isArray(moreParagraphs) &&
                    moreParagraphs.map((paragraph, index) => (
                      <Text
                        key={index}
                        variant="body-16"
                        className="text-slate-900"
                      >
                        {paragraph}
                      </Text>
                    ))}
                </div>
              </div>

              <div className="mt-1">
                <ReadMoreButton
                  onClick={() => setIsExpanded(!isExpanded)}
                  isExpanded={isExpanded}
                  text={
                    isExpanded
                      ? t("about_us.read_less")
                      : t("about_us.read_more")
                  }
                />
              </div>
            </div>

            {/* Features list - 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10 mt-5 pt-5 border-t-1 border-slate-200">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-green text-white shrink-0">
                    <Check className="w-2 h-2" strokeWidth={6} />
                  </span>
                  <Text variant="body-16" className="text-slate-900">
                    {feature}
                  </Text>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button variant="black" size="md" href="/za-nas" showIcon>
              {t("about_us.cta")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
