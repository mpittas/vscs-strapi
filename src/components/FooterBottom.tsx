"use client";

import LocalizedLink from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Text } from "./ui/Typography";

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
      { label: t("footer.cookies"), href: "/cookies" },
    ],
    [t],
  );

  if (isMobile) {
    return (
      <div className={className}>
        <Text variant="small-title" className="text-brand-green mb-3">
          {t("footer.legal_info")}
        </Text>
        <div className="flex flex-col gap-2">
          {legalLinks.map((link) => (
            <LocalizedLink
              key={link.href}
              href={link.href}
              className="text-white hover:text-brand-green transition-colors"
            >
              <Text variant="body-12" as="span">
                {link.label}
              </Text>
            </LocalizedLink>
          ))}
          <div className="mt-2">
            <Text variant="body-12" className="text-white">
              {t("footer.copyright", { year: currentYear })}
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-white">
          <Text variant="body-12" as="span">
            {t("footer.copyright", { year: currentYear })}{" "}
            {t("footer.all_rights_reserved")}
          </Text>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
          {legalLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              <LocalizedLink
                href={link.href}
                className="text-white hover:text-brand-green transition-colors"
              >
                <Text variant="body-12" as="span">
                  {link.label}
                </Text>
              </LocalizedLink>
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
