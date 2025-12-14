"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center pt-28"
      style={{ height: "800px" }}
    >

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
              className="absolute -bottom-4 left-0 w-full h-auto z-[-1]"
            />
          </span>
        </Heading>

        <Text
          variant="body-18"
          className="max-w-md leading-relaxed text-slate-200 pt-4"
        >
          Строителни услуги до ключ и иновативни решения за възобновяема
          енергия.
        </Text>

        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button href="/contact" size="md" showIcon>
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
