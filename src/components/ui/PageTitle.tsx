import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageTitle({ title, breadcrumbs }: PageTitleProps) {
  return (
    <section className="bg-[#0a0f0a] py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[#b4d429] text-sm font-normal tracking-wider uppercase hover:text-[#c5e53a] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#b4d429] text-sm font-normal tracking-wider uppercase  opacity-70">
                    {item.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-[#b4d429]/60 text-sm">&gt;</span>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
