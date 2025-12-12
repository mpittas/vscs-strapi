'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from './ui/Button';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-transparent py-4"
      }`}
    >
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
              src={isScrolled ? "/logo/vscs-logo-full-hor-dark-green.svg" : "/logo/vscs-logo-full-hor.svg"}
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
              className={`text-sm font-medium transition-colors relative group ${
                isScrolled 
                  ? 'text-slate-600 hover:text-solar-orange' 
                  : 'text-white/90 hover:text-white'
              }`}
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
          className={`md:hidden p-2 ${isScrolled ? 'text-slate-600' : 'text-white'}`}
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
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 origin-top ${
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
          <Button href="/contact" className="w-full justify-center">
            Свържете се
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
