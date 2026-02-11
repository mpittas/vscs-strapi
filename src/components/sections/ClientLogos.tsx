"use client";

import { useTranslation } from "react-i18next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Image from "next/image";

const clientLogos = [
  { src: "/clients-logos/client-logo-1.svg", alt: "Client 1" },
  { src: "/clients-logos/client-logo-2.svg", alt: "Client 2" },
  { src: "/clients-logos/client-logo-3.svg", alt: "Client 3" },
  { src: "/clients-logos/client-logo-4.svg", alt: "Client 4" },
  { src: "/clients-logos/client-logo-5.svg", alt: "Client 5" },
];

export default function ClientLogos() {
  const { t } = useTranslation("home");

  return (
    <Section paddingY="sm" className="bg-[#e8f0dc]">
      <Container>
        {/* Mobile: stacked layout, Desktop: horizontal layout */}
        <div className="flex flex-col items-center lg:flex-row gap-8">
          {/* Left side - Title */}
          <div className="text-dark-green max-w-[300px] text-center lg:text-left">
            {t("client_logos.title")}
          </div>

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
                  height={36}
                  className="h-8 lg:h-9 w-auto object-contain opacity-100 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
