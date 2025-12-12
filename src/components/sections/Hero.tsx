"use client";

import Button from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "700px" }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/solar-hero.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/80" />{" "}
        {/* Dark overlay matches other sections */}
      </div>

      <div className="relative z-10 container flex flex-col items-center px-4 text-center">
        <Text as="span" className="mb-4 text-lg tracking-wide text-white">
          VS Construction Services
        </Text>

        <Heading as="h1" className="mb-2 max-w-3xl leading-tight text-white">
          Вашият партньор в{" "}
          <span className="text-[#4ade80]">соларния бизнес</span>
        </Heading>

        <Text
          variant="body-16"
          className="mb-12 max-w-sm leading-relaxed text-slate-200"
        >
          Строителни услуги до ключ и иновативни решения за възобновяема
          енергия.
        </Text>

        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            href="/contact"
            className="rounded-full border-none bg-[#10b981] px-10 py-4 text-base font-bold text-white shadow-lg shadow-green-900/20 hover:bg-[#059669]"
          >
            Свържете се с нас
          </Button>
          <Button
            href="/about"
            variant="secondary"
            className="rounded-full border-white/20 bg-white/10 px-10 py-4 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20"
          >
            Научете повече
          </Button>
        </div>
      </div>
    </section>
  );
}
