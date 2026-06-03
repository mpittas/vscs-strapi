"use client";

import { useTranslation } from "react-i18next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Image from "next/image";
import { Text } from "@/components/ui/Typography";

const clientLogos = [
  { src: "/clients-logos/green-energy-supplier-logo.png", alt: "Client 1" },
  { src: "/clients-logos/horys-logo.png", alt: "Client 2" },
  { src: "/clients-logos/kp-solar-group-logo.png", alt: "Client 3" },
];

export default function ClientLogos() {
  const { t } = useTranslation("home");

  return (
    <Section paddingY="sm" className="bg-[#e8f0dc] relative z-1">
      <Container>
        {/* Mobile: stacked layout, Desktop: horizontal layout */}
        <div className="flex flex-col items-center lg:flex-row gap-8">
          {/* Left side - Title */}
          <Text
            variant="body-16"
            className="text-slate-900 max-w-[300px] text-center lg:text-left"
          >
            {t("client_logos.title")}
          </Text>

          {/* Middle - Horizontal line (hidden on mobile) */}
          <div className="hidden lg:block flex-1 h-px bg-slate-400/30" />

          {/* Right side - Client logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:flex-nowrap lg:gap-10 shrink-0 max-w-[400px] lg:max-w-none">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={76}
                  unoptimized
                  className={`w-auto object-contain opacity-100 hover:opacity-80 transition-opacity ${
                    index === clientLogos.length - 1
                      ? "h-6 lg:h-12"
                      : "h-8 lg:h-18"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
