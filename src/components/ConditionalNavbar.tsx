"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import i18nConfig from "@/i18nConfig";

const { locales } = i18nConfig;

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Don't render Navbar here for homepage - it's handled by Hero component
  const isHomePage =
    pathname === "/" || locales.map((l) => `/${l}`).includes(pathname);

  if (isHomePage) {
    return null;
  }

  return <Navbar />;
}
