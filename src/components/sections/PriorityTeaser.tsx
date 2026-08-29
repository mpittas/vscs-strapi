"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function PriorityTeaser() {
  const { t } = useTranslation("premium");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const content = root.querySelector(".priority-teaser-content");
      if (!content) return;

      gsap.fromTo(
        content,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Section
        paddingY="none"
        reveal={false}
        className="relative overflow-hidden py-20 md:py-24 bg-[#0a1c07]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/solar-bg-green-blur.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a1c07] via-[#0a1c07]/90 to-[#377B2C]/40" />

        <Container className="relative z-10">
          <div className="priority-teaser-content max-w-3xl">
            <Text
              variant="body-14"
              className="text-brand-green uppercase tracking-[0.2em] font-medium mb-4"
            >
              {t("teaser.brand")}
            </Text>
            <Heading
              as="h2"
              className="text-white text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-5"
            >
              {t("teaser.title")}
            </Heading>
            <Text variant="body-16" className="text-white/70 mb-8 max-w-xl">
              {t("teaser.description")}
            </Text>
            <Button href="/prioritet" variant="primary" size="md" showIcon>
              {t("teaser.cta")}
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
