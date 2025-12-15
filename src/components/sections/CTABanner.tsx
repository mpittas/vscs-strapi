"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import Section from "@/components/ui/Section";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <Section
      paddingY="xl"
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
      <div className="absolute right-0 lg:right-[15%] bottom-0 w-[320px] lg:w-[360px] h-full z-10 hidden lg:block">
        <Image
          src="/images/woman-reading-papers-min.png"
          alt="Консултант преглежда документи"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <div className="container relative z-20">
        <div>
          {/* Left Content */}
          <div className="text-left max-w-[700px]">
            <Heading
              as="h2"
              className="text-white mb-12 leading-tight text-3xl lg:text-4xl xl:text-5xl"
            >
              Свържете се с нас и <br className="hidden sm:block" />
              запазете консултация!
            </Heading>

            {/* Button and Phone Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* CTA Button */}
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                showIcon
                iconPosition="right"
              >
                Свържете се с нас
              </Button>

              {/* Phone Box */}
              <div className="flex items-center gap-3 px-4">
                <div className="flex items-center justify-center w-15 h-15 rounded-full bg-black/10">
                  <Phone className="w-6 h-6 text-white/80" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white">
                    Запазете консултация
                  </span>
                  <a
                    href="tel:+1235485256"
                    className="text-white font-medium text-[24px]"
                  >
                    +123 (548) 5256
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image - shows only on mobile */}
      <div className="relative w-full h-[250px] lg:hidden">
        <Image
          src="/images/woman-reading-papers-min.png"
          alt="Консултант преглежда документи"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </Section>
  );
}
