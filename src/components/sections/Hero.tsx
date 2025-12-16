"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import gsap from "gsap";

// Helper component to split text into animated characters
function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="hero-char inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get all reveal content elements (excluding heading)
      const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-content");

      // Get all hero characters
      const heroChars = gsap.utils.toArray<HTMLElement>(".hero-char");

      // Initial states - set elements below their clip mask
      gsap.set(revealElements, {
        yPercent: 100,
        opacity: 0,
      });

      // Initial state for characters
      gsap.set(heroChars, {
        y: 40,
        opacity: 0,
      });

      // Create timeline for smooth staggered reveal
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
      });

      // Animate characters with stagger
      tl.to(heroChars, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        delay: 0.3,
      });

      // Animate other elements after characters
      tl.to(
        revealElements,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
        },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navbar is fixed, so it sits outside the wrapper */}
      <Navbar />

      <div className="relative overflow-hidden" ref={heroRef}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-panels-landscape-min.jpg"
            alt="Solar panels background"
            fill
            priority
            quality={85}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,21,17,0.85)] to-[rgba(4,9,15,1)]" />
        </div>

        <section
          className="relative z-10 flex items-center justify-center pt-28"
          style={{ height: "880px" }}
        >
          <div className="container flex gap-y-6 flex-col items-start px-40">
            {/* Badge with reveal animation */}
            <div className="overflow-hidden">
              <div className="reveal-content flex items-center gap-2">
                <Image
                  src="/icons/electricity-bolt-icon-green.svg"
                  alt=""
                  width={14}
                  height={14}
                />
                <Text as="span" variant="small-title">
                  VS Construction Services
                </Text>
              </div>
            </div>

            {/* Title with character-by-character animation */}
            <Heading
              as="h1"
              className="text-[72px] max-w-4xl leading-[1.15] text-white font-normal"
            >
              <span className="block overflow-hidden">
                <AnimatedText text="Вашият партньор" className="block" />
              </span>
              <span className="block">
                <span className="relative inline-block overflow-visible">
                  <span className="overflow-hidden block">
                    <AnimatedText
                      text="в соларния бизнес"
                      className="inline-block"
                    />
                  </span>
                  <Image
                    src="/icons/heading-underline.svg"
                    alt=""
                    width={400}
                    height={20}
                    className="absolute -bottom-2 left-0 w-full h-auto"
                  />
                </span>
              </span>
            </Heading>

            {/* Description with reveal animation */}
            <div className="overflow-hidden">
              <div className="reveal-content">
                <Text
                  variant="body-18"
                  className="max-w-md leading-relaxed text-slate-200 pt-4"
                >
                  Строителни услуги до ключ и иновативни решения за възобновяема
                  енергия.
                </Text>
              </div>
            </div>

            {/* Buttons with reveal animation */}
            <div className="overflow-hidden">
              <div className="reveal-content flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
                <Button href="/contact" size="md" showIcon>
                  Свържете се с нас
                </Button>
                <Button href="/about" variant="secondary" size="md">
                  Научете повече
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
