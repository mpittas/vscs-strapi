import LocalizedLink from "@/components/LocalizedLink";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageTitle({
  title,
  breadcrumbs,
  subtitle,
  backgroundImage,
}: PageTitleProps) {
  return (
    <section
      data-reveal-hero=""
      className="relative py-8 overflow-hidden flex flex-col items-center justify-center min-h-[260px]"
    >
      {/* Background Image */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover z-0"
            priority
          />
          {/* Dark Green Overlay */}
          <div className="absolute inset-0 bg-[#001D13] opacity-80 z-10" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0a0f0a] z-0" />
      )}

      {/* Content */}
      <div className="container relative z-20">
        <div className="flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav data-reveal="fade" className="flex items-center gap-2 mb-6">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.href ? (
                  <LocalizedLink
                    href={item.href}
                    className="text-[#b4d429] text-sm font-normal tracking-wider uppercase hover:text-[#c5e53a] transition-colors"
                  >
                    {item.label}
                  </LocalizedLink>
                ) : (
                  <span className="text-[#b4d429] text-sm font-normal tracking-wider uppercase opacity-70">
                    {item.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#b4d429]/60" />
                )}
              </div>
            ))}
          </nav>

          {/* Title */}
          <h1
            data-reveal="title"
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-white drop-shadow-sm"
          >
            {title}
          </h1>

          {subtitle && (
            <p
              data-reveal="rise"
              className="mt-6 text-lg text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-sm"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
