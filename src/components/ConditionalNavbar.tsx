"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Don't render Navbar here for homepage - it's handled by HeroHeader
  if (isHomePage) {
    return null;
  }

  return <Navbar />;
}
