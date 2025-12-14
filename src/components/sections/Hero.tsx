"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "700px" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/solar-hero.jpg"
          alt="Solar panels background"
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f172a]/80" />{" "}
        {/* Dark overlay matches other sections */}
      </div>

      <div className="relative z-10 container flex gap-y-6 flex-col items-start px-4">
        <div className="flex items-center gap-2">
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

        <Heading
          as="h1"
          className="text-[72px] max-w-4xl leading-[1.15] text-white font-normal"
        >
          Вашият партньор{" "}
          <span className="relative inline-block">
            в соларния бизнес
            <Image
              src="/icons/heading-underline.svg"
              alt=""
              width={400}
              height={20}
              className="absolute -bottom-2 left-0 w-full h-auto"
            />
          </span>
        </Heading>

        <Text
          variant="body-16"
          className="max-w-sm leading-relaxed text-slate-200"
        >
          Строителни услуги до ключ и иновативни решения за възобновяема
          енергия.
        </Text>

        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button href="/contact" size="md">
            Свържете се с нас
          </Button>
          <Button href="/about" variant="secondary" size="md">
            Научете повече
          </Button>
        </div>
      </div>
    </section>
  );
}
