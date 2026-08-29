"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/lib/motion";

// Helper component removed as we use simple line animation now

export default function Hero() {
  const { t } = useTranslation("home");
  const heroRef = useRef<HTMLDivElement>(null);

  // ============================================
  // ANIMATION CONFIG - Easy timeline control
  // ============================================
  const animConfig = {
    // Global
    defaultEase: "power3.out",
    initialDelay: 0.1,

    // Badge animation
    badge: {
      duration: 0.5,
      y: 20,
    },

    // Title lines animation
    title: {
      duration: 0.8,
      stagger: 0.1,
      y: "100%", // Move from 100% (below) to 0
      delayAfterBadge: 0.1,
    },

    // Underline animation (fades in with title)
    underline: {
      duration: 1,
      delay: 0.2, // relative to title start
      ease: "power2.out",
    },

    // Description animation
    description: {
      duration: 0.6,
      delayAfterTitle: 0,
      y: 20,
    },

    // Buttons animation
    buttons: {
      duration: 0.6,
      y: 20,
      delayAfterDescription: 0.1,
    },
  };

  useEffect(() => {
    if (!heroRef.current) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Get specific elements
      const badge = document.querySelector(".hero-badge");
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-title-line");
      const underline = document.querySelector(".hero-underline");
      const description = document.querySelector(".hero-description");
      const buttons = document.querySelector(".hero-buttons");

      // Initial states
      if (badge) gsap.set(badge, { y: animConfig.badge.y, opacity: 0 });
      // Set lines to be translated down by 100% initially
      gsap.set(heroLines, { y: animConfig.title.y });

      if (underline)
        gsap.set(underline, {
          opacity: 0,
        });
      if (description)
        gsap.set(description, { y: animConfig.description.y, opacity: 0 });
      if (buttons) gsap.set(buttons, { y: animConfig.buttons.y, opacity: 0 });

      // Create timeline for smooth staggered reveal
      const tl = gsap.timeline({
        defaults: {
          ease: animConfig.defaultEase,
        },
      });

      // 1. Animate badge first
      if (badge) {
        tl.to(badge, {
          y: 0,
          opacity: 1,
          duration: animConfig.badge.duration,
          delay: animConfig.initialDelay,
        });
      }

      // 2. Animate title lines + underline
      const titleLabel = "titleStart";
      tl.addLabel(titleLabel, `+=${animConfig.title.delayAfterBadge}`);

      if (heroLines.length > 0) {
        tl.to(
          heroLines,
          {
            y: 0,
            duration: animConfig.title.duration,
            stagger: animConfig.title.stagger,
          },
          titleLabel,
        );
      }

      if (underline) {
        tl.to(
          underline,
          {
            opacity: 1,
            duration: animConfig.underline.duration,
            delay: animConfig.underline.delay,
            ease: animConfig.underline.ease,
          },
          titleLabel,
        );
      }

      // Calculate when title animation ends
      // duration + (count-1)*stagger
      const titleDuration =
        animConfig.title.duration +
        Math.max(0, heroLines.length - 1) * animConfig.title.stagger;
      const titleEndLabel = "titleEnd";
      tl.addLabel(titleEndLabel, `${titleLabel}+=${titleDuration}`);

      // 3. Animate description
      if (description) {
        tl.to(
          description,
          {
            y: 0,
            opacity: 1,
            duration: animConfig.description.duration,
          },
          // Start slightly before title ends for better flow, or right after
          // using straight logic: after title finishes
          `${titleEndLabel}+=${animConfig.description.delayAfterTitle}`,
        );
      }

      // 4. Animate buttons
      if (buttons) {
        tl.to(
          buttons,
          {
            y: 0,
            opacity: 1,
            duration: animConfig.buttons.duration,
          },
          `+=${animConfig.buttons.delayAfterDescription}`,
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navbar is fixed, so it sits outside the wrapper */}
      <Navbar />

      <div className="relative overflow-hidden" ref={heroRef} data-motion="skip">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-panels-landscape-min.jpg"
            alt="Solar panels background"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,21,17,0.85)] to-[rgba(4,9,15,1)]" />
        </div>

        <section className="relative z-10 flex items-center justify-center pt-20 sm:pt-24 lg:pt-28 min-h-[85dvh] sm:min-h-0 sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[880px]">
          <Container className="flex gap-y-5 lg:gap-y-6 flex-col items-start">
            {/* Badge with reveal animation */}
            <div className="hero-badge flex items-center gap-2">
              <Image
                src="/icons/electricity-bolt-icon-green.svg"
                alt=""
                width={14}
                height={14}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              />
              <Text as="span" variant="small-title">
                {t("hero.badge")}
              </Text>
            </div>

            {/* Title with line-by-line slide up animation */}
            <Heading
              as="h1"
              className="sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl text-white"
            >
              <span className="block overflow-hidden">
                <span className="hero-title-line block">
                  {t("hero.title_part1")}
                </span>
              </span>
              <span className="block">
                <span className="relative inline-block overflow-visible">
                  <span className="overflow-hidden block relative z-1">
                    <span className="hero-title-line block">
                      {t("hero.title_part2")}
                    </span>
                  </span>
                  <Image
                    src="/icons/heading-underline.svg"
                    alt=""
                    width={400}
                    height={20}
                    className="hero-underline absolute -bottom-1 sm:-bottom-4 left-0 w-full h-auto opacity-20"
                  />
                </span>
              </span>
            </Heading>

            {/* Description with reveal animation */}
            <div className="hero-description mb-5">
              <Text
                variant="body-18"
                className="max-w-[480px] text-white sm:pt-3 lg:pt-4"
              >
                {t("hero.description")}
              </Text>
            </div>

            <div className="hero-buttons flex w-full flex-col justify-center gap-3 sm:gap-4 sm:w-auto sm:flex-row">
              <Button
                href="/kontakti"
                size="md"
                showIcon
                className="w-full sm:w-auto"
              >
                {t("hero.cta")}
              </Button>
              <Button
                href="/za-nas"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                {t("hero.learn_more")}
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
