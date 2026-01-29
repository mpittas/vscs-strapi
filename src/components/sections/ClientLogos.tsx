import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const clientLogos = [
  { src: "/clients-logos/client-logo-1.svg", alt: "Client 1" },
  { src: "/clients-logos/client-logo-2.svg", alt: "Client 2" },
  { src: "/clients-logos/client-logo-3.svg", alt: "Client 3" },
  { src: "/clients-logos/client-logo-4.svg", alt: "Client 4" },
  { src: "/clients-logos/client-logo-5.svg", alt: "Client 5" },
];

export default function ClientLogos() {
  return (
    <Section paddingY="sm" className="bg-[#e8f0dc]">
      <Container>
        {/* Mobile: stacked layout, Desktop: horizontal layout */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Left side - Title */}
          <div className="text-dark-green max-w-[300px]">
            Ние винаги се страмим нашите клиенти да бъдат доволни
          </div>

          {/* Middle - Horizontal line (hidden on mobile) */}
          <div className="hidden lg:block flex-1 h-px bg-slate-400/30" />

          {/* Right side - Client logos */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 sm:gap-6 lg:gap-10 shrink-0">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="w-26 lg:w-auto flex items-center justify-center"
              >
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
