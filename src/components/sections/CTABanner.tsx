"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import Section from "@/components/ui/Section";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

// Default content for CTA Banner
const defaultContent = {
  bg: {
    title: "Свържете се с нас и запазете консултация!",
    btn_text: "Свържете се с нас",
    phone_label: "Запазете консултация",
  },
  en: {
    title: "Contact us and book a consultation!",
    btn_text: "Contact Us",
    phone_label: "Book a consultation",
  },
  fr: {
    title: "Contactez-nous et réservez une consultation !",
    btn_text: "Contactez-nous",
    phone_label: "Réservez une consultation",
  },
};

export default function CTABanner() {
  const { t, i18n } = useTranslation("home");

  // Get current locale content, fallback to default
  const locale = (i18n.language as "bg" | "en" | "fr") || "bg";
  const content = {
    title: t("cta_banner.title", {
      defaultValue: defaultContent[locale].title,
    }),
    btn_text: t("cta_banner.btn_text", {
      defaultValue: defaultContent[locale].btn_text,
    }),
    phone_label: t("cta_banner.phone_label", {
      defaultValue: defaultContent[locale].phone_label,
    }),
  };
  return (
    <Section
      paddingY="lg"
      bgColor="bg-[#377B2C]"
      className="relative overflow-hidden"
    >
      {/* Background Line Art - positioned behind the woman */}
      <div className="absolute right-0 bottom-0 w-[680px] h-[440px] pointer-events-none z-0">
        <Image
          src="/images/solar-panel-line-art.svg"
          alt=""
          fill
          className="object-contain object-center opacity-30"
          aria-hidden="true"
        />
      </div>

      {/* Woman Image - Absolute positioned */}
      <div className="absolute right-0 lg:right-[15%] bottom-0 w-[350px] h-full z-10 hidden lg:block">
        <Image
          src="/images/woman-reading-papers-min.png"
          alt={content.phone_label}
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <Container className="relative z-20">
        <div>
          {/* Left Content */}
          <div className="text-left max-w-[700px]">
            <Heading as="h2" className="text-white mb-6 md:mb-14 max-w-2xl">
              {content.title}
            </Heading>

            {/* Button and Phone Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* CTA Button */}
              <Button
                href="/kontakti"
                variant="primary"
                size="lg"
                showIcon
                iconPosition="right"
                className="w-full md:w-auto"
              >
                {content.btn_text}
              </Button>

              {/* Phone Box */}
              <div className="flex items-center gap-3 px-4">
                <div className="flex items-center justify-center w-15 h-15 rounded-full bg-black/10">
                  <Phone className="w-6 h-6 text-white/80" />
                </div>
                <div className="flex flex-col">
                  <Text variant="body-14" className="text-white">
                    {content.phone_label}
                  </Text>
                  <a href="tel:+359877159858" className="text-white">
                    <Text variant="body-22" className="text-white" as="span">
                      +359 877 15 98 58
                    </Text>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Image - shows only on mobile */}
      <div className="hidden lg:block relative w-full h-[250px] lg:hidden">
        <Image
          src="/images/woman-reading-papers-min.png"
          alt={content.phone_label}
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
