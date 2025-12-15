import Image from "next/image";

const clientLogos = [
  { src: "/clients-logos/client-logo-1.svg", alt: "Client 1" },
  { src: "/clients-logos/client-logo-2.svg", alt: "Client 2" },
  { src: "/clients-logos/client-logo-3.svg", alt: "Client 3" },
  { src: "/clients-logos/client-logo-4.svg", alt: "Client 4" },
  { src: "/clients-logos/client-logo-5.svg", alt: "Client 5" },
];

export default function ClientLogos() {
  return (
    <section className="py-6 bg-[#e8f0dc]">
      <div className="container">
        <div className="flex items-center gap-8">
          {/* Left side - Title */}
          <div className="text-dark-green text-md font-medium shrink-0 leading-[1.5]">
            Ние винаги се страмим нашите
            <br />
            клиенти да бъдат доволни
          </div>

          {/* Middle - Horizontal line */}
          <div className="flex-1 h-px bg-slate-400/30" />

          {/* Right side - Client logos */}
          <div className="flex items-center gap-10 shrink-0">
            {clientLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={36}
                className="h-9 w-auto object-contain opacity-100 hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
