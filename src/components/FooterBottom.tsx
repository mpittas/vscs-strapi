"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface FooterBottomProps {
  className?: string;
  isMobile?: boolean;
}

export default function FooterBottom({
  className,
  isMobile = false,
}: FooterBottomProps) {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();

  const legalLinks = useMemo(
    () => [
      { label: t("footer.privacy_policy"), href: "/privacy" },
      { label: t("footer.terms"), href: "/terms" },
      { label: t("footer.cookies"), href: "/cookies" },
    ],
    [t],
  );

  if (isMobile) {
    return (
      <div className={className}>
        <div className="text-brand-green font-normal mb-3 text-left">
          {t("footer.legal_info")}
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
          <div className="text-white/30 mt-2">
            {t("footer.copyright", { year: currentYear })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-xs text-white/50">
          {t("footer.copyright", { year: currentYear })}{" "}
          {t("footer.all_rights_reserved")}
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
