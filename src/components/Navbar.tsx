"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Text } from "./ui/Typography";
import Button from "./ui/Button";
import { useLenis } from "./SmoothScrollProvider";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import i18nConfig from "@/i18nConfig";

const { locales } = i18nConfig;

const navInnerClasses = "mx-auto w-full max-w-[1900px] px-12";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" || locales.map((l) => `/${l}`).includes(pathname);
  const lenis = useLenis();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/za-nas" },
    { name: t("nav.services"), href: "/uslugi" },
    { name: t("nav.projects"), href: "/proekti" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.careers"), href: "/karieri" },
    { name: t("nav.contacts"), href: "/kontakti" },
  ];

  useEffect(() => {
    // Handler for scroll events
    const handleScroll = (scrollY: number) => {
      setIsScrolled(scrollY > 50);
    };

    // If Lenis is available, use its scroll events
    if (lenis) {
      const onLenisScroll = ({ scroll }: { scroll: number }) => {
        handleScroll(scroll);
      };

      lenis.on("scroll", onLenisScroll);

      // Check initial scroll position
      handleScroll(lenis.scroll);

      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    } else {
      // Fallback to native scroll for pages without Lenis
      const onNativeScroll = () => {
        handleScroll(window.scrollY);
      };

      // Check initial scroll position
      onNativeScroll();

      window.addEventListener("scroll", onNativeScroll);
      return () => window.removeEventListener("scroll", onNativeScroll);
    }
  }, [lenis]);

  /* 
     Use consistent positioning to prevent layout shifts (jumping).
     Homepage: fixed (overlay for transparent effect, stays for sticky)
     Other pages: sticky (standard behavior)
     All use py-4 for consistent height across pages/states.
  */
  const navClasses = isHomePage
    ? // HOMEPAGE: Fixed overlay header
      `fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white border-slate-200" // HOMEPAGE SCROLLED: White bg with border
          : "bg-transparent border-transparent border-b border-white/5" // HOMEPAGE DEFAULT: Transparent overlay
      }`
    : // OTHER PAGES: Sticky white header (always scrolled style)
      `sticky top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-white border-b border-slate-200`;

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (!isHomePage || isScrolled)
      return "text-slate-900 hover:text-brand-green";
    return "text-white hover:text-brand-green";
  };

  // Determine logo to show
  const getLogoSrc = () => {
    if (!isHomePage || isScrolled) return "/logo/vscs-bg-logo-dark.svg";
    return "/logo/vscs-bg-logo-light.svg";
  };

  const menuButtonColor =
    !isHomePage || isScrolled ? "text-slate-700" : "text-white";

  return (
    <nav className={navClasses}>
      <div className={cn(navInnerClasses, "flex items-center justify-between")}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Mobile Logo - Symbol only */}
          <div className="block sm:hidden">
            <Image
              src="/logo/vscs-logo-symbol.svg"
              alt="VSCS Logo"
              width={40}
              height={40}
              className="h-9 w-auto"
            />
          </div>
          {/* Desktop Logo - Full horizontal */}
          <div className="hidden sm:block">
            <Image
              src={getLogoSrc()}
              alt="VSCS Logo"
              width={190}
              height={52}
              className="h-12 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6">
          <div className="flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-colors relative group",
                  getTextColor(),
                )}
              >
                <Text variant="body-16" as="span" className={getTextColor()}>
                  {link.name}
                </Text>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
          <LanguageSwitcher isTransparent={isHomePage && !isScrolled} />
          <Button href="/konsultatsiya" size="sm" variant="primary">
            {t("nav.book_consultation")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${menuButtonColor}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white transition-all duration-300 origin-top py-4 ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className={cn(navInnerClasses, "flex flex-col gap-4 py-6")}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-900 hover:text-brand-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Text
                variant="body-16"
                as="span"
                className="text-slate-900 hover:text-brand-green"
              >
                {link.name}
              </Text>
            </Link>
          ))}
          <div className="py-2">
            <LanguageSwitcher />
          </div>
          <Button href="/konsultatsiya" fullWidth>
            {t("nav.book_consultation")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
