import Link from "next/link";

const legalLinks = [
  { label: "Политика за поверителност", href: "/privacy" },
  { label: "Общи условия", href: "/terms" },
  { label: "Бисквитки", href: "/cookies" },
];

interface FooterBottomProps {
  className?: string;
  isMobile?: boolean;
}

export default function FooterBottom({
  className,
  isMobile = false,
}: FooterBottomProps) {
  const currentYear = new Date().getFullYear();

  if (isMobile) {
    return (
      <div className={className}>
        <div className="text-brand-green font-normal mb-3 text-left">
          Правна информация
        </div>
        <div className="flex flex-col gap-2 text-xs">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="text-white/30 mt-2">VSCS BG, {currentYear} ©</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-xs text-white/50">
          VSCS BG, {currentYear} © Всички права са запазени
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 text-xs">
          {legalLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              <Link
                href={link.href}
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
              {index < legalLinks.length - 1 && (
                <span className="text-brand-green hidden lg:inline">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
