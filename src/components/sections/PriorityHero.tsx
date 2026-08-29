"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/lib/motion";

export default function PriorityHero() {
  const { t } = useTranslation("premium");
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const brand = root.querySelector(".priority-hero-brand");
      const headline = root.querySelector(".priority-hero-headline");
      const subline = root.querySelector(".priority-hero-subline");
      const actions = root.querySelector(".priority-hero-actions");

      gsap.set([brand, headline, subline, actions], { opacity: 0, y: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(brand, { opacity: 1, y: 0, duration: 0.7 })
        .to(headline, { opacity: 1, y: 0, duration: 0.75 }, "-=0.45")
        .to(subline, { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
        .to(actions, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      data-motion="skip"
      className="relative min-h-svh flex items-end md:items-center overflow-hidden"
    >
      <Image
        src="/images/solar-panels-landscape-min.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#040A03] via-[#0a1c07]/85 to-[#0a1c07]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(157,224,68,0.18),transparent_55%)]" />

      <Container className="relative z-10 pb-16 pt-32 md:py-36 w-full">
        <div className="max-w-3xl">
          <p className="priority-hero-brand text-brand-green text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 md:mb-8">
            {t("hero.brand")}
          </p>
          <Heading
            as="h1"
            className="priority-hero-headline text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-5 md:mb-6"
          >
            {t("hero.headline")}
          </Heading>
          <Text
            variant="body-18"
            className="priority-hero-subline text-white/75 max-w-xl mb-8 md:mb-10"
          >
            {t("hero.subline")}
          </Text>
          <div className="priority-hero-actions flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              showIcon
              onClick={scrollToWaitlist}
            >
              {t("hero.cta")}
            </Button>
            <Text variant="body-14" className="text-white/55 tracking-wide">
              {t("hero.scarcity")}
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
