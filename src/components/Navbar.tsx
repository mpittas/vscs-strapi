"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const navLinks = [
  { name: "Начало", href: "/" },
  { name: "За Нас", href: "/about" },
  { name: "Услуги", href: "/services" },
  { name: "Проекти", href: "/projects" },
  { name: "Контакти", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = isHomePage
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? "bg-white py-3" : "bg-transparent py-4"
      }`
    : `sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white py-3 border-b border-slate-200 shadow-xl/3`;

  // Determine text color based on page and scroll state
  const getTextColor = (baseColor: string, hoverColor: string) => {
    if (!isHomePage || isScrolled)
      return "text-slate-600 hover:text-solar-orange";
    return "text-white/90 hover:text-white";
  };

  // Determine logo to show
  const getLogoSrc = () => {
    if (!isHomePage || isScrolled)
      return "/logo/vscs-logo-full-hor-dark-green.svg";
    return "/logo/vscs-logo-full-hor.svg";
  };

  const menuButtonColor =
    !isHomePage || isScrolled ? "text-slate-600" : "text-white";

  return (
    <nav className={navClasses}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Mobile Logo - Symbol only */}
          <div className="block sm:hidden">
            <Image
              src="/logo/vscs-logo-symbol.svg"
              alt="VSCS Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          {/* Desktop Logo - Full horizontal */}
          <div className="hidden sm:block">
            <Image
              src={getLogoSrc()}
              alt="VSCS Logo"
              width={180}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-normal transition-colors relative group ${getTextColor(
                "text-slate-600",
                "text-solar-orange"
              )}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-solar-orange transition-all group-hover:w-full" />
            </Link>
          ))}
          <Button href="/contact" size="sm">
            Свържете се
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
        className={`md:hidden absolute top-full left-0 right-0 bg-white transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-slate-600 hover:text-solar-orange transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button href="/contact" fullWidth>
            Свържете се
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
