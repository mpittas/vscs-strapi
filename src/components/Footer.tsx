"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { Text } from "@/components/ui/Typography";
import FooterBottom from "./FooterBottom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

// Social icon components
const FacebookIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const { t } = useTranslation("common");

  // Footer link data
  const quickLinks = useMemo(
    () => [
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.services"), href: "/services" },
      { label: t("nav.projects"), href: "/projects" },
      { label: t("nav.careers"), href: "/careers" },
      { label: t("nav.contacts"), href: "/contact" },
    ],
    [t],
  );

  const servicesLinks = useMemo(
    () => [
      { label: t("footer.services_links.design"), href: "/services/design" },
      {
        label: t("footer.services_links.installation"),
        href: "/services/installation",
      },
      {
        label: t("footer.services_links.electrical"),
        href: "/services/electrical",
      },
      {
        label: t("footer.services_links.maintenance"),
        href: "/services/maintenance",
      },
      {
        label: t("footer.services_links.consulting"),
        href: "/services/consulting",
      },
    ],
    [t],
  );

  const contactInfo = {
    address: "Враца, България",
    phone: "+359 877 15 98 58",
    email: "office@vscs-bg.com",
  };

  return (
    <footer className="bg-[#040A03] text-white">
      {/* Logo Section - Top */}
      <div className="pt-8 pb-4 lg:pt-12 lg:pb-12">
        <Container>
          <Link href="/" className="inline-block">
            <Image
              src="/logo/vscs-bg-logo-light.svg"
              alt="VSCS BG Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </Container>
      </div>

      {/* Main Footer Content */}
      <div>
        <Container>
          <div className="py-8 lg:py-12 border-y border-white/5">
            <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-8">
              {/* Brand Column - Tagline & Social */}
              <div className="col-span-2 lg:col-span-4">
                <Text
                  variant="body-16"
                  className="text-white mb-6 lg:max-w-xs text-left"
                >
                  {t("footer.tagline")}
                </Text>
                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-dark-green bg-brand-green hover:bg-brand-green/80 transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-dark-green bg-brand-green hover:bg-brand-green/80 transition-all"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-span-1 lg:col-span-2">
                <Text variant="small-title" className="text-brand-green mb-3">
                  {t("footer.quick_links")}
                </Text>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href} className="mb-1 md:mb-2">
                      <Link
                        href={link.href}
                        className="text-white hover:text-brand-green transition-colors"
                      >
                        <Text
                          variant="body-14"
                          as="span"
                          className="text-white"
                        >
                          {link.label}
                        </Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div className="col-span-1 lg:col-span-3">
                <Text variant="small-title" className="text-brand-green mb-3">
                  {t("footer.design")}
                </Text>
                <ul className="space-y-2">
                  {servicesLinks.map((link) => (
                    <li key={link.href} className="mb-1 md:mb-2">
                      <Link
                        href={link.href}
                        className="text-white hover:text-brand-green transition-colors"
                      >
                        <Text
                          variant="body-14"
                          as="span"
                          className="text-white"
                        >
                          {link.label}
                        </Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-span-1 lg:col-span-3">
                <Text variant="small-title" className="text-brand-green mb-3">
                  {t("footer.contact_info")}
                </Text>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <Text variant="body-14" className="text-white">
                      {contactInfo.address}
                    </Text>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="text-white hover:text-brand-green transition-colors"
                    >
                      <Text variant="body-14" as="span" className="text-white">
                        {contactInfo.phone}
                      </Text>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white hover:text-brand-green transition-colors"
                    >
                      <Text variant="body-14" as="span" className="text-white">
                        {contactInfo.email}
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Info (Mobile only) */}
              <FooterBottom isMobile className="col-span-1 lg:hidden" />
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar (Desktop only) */}
      <div className="hidden lg:block py-6">
        <Container>
          <FooterBottom />
        </Container>
      </div>
    </footer>
  );
}
