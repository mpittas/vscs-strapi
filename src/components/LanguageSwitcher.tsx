"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";

// Detail page patterns that have locale-specific slugs
// When on these pages, we redirect to the parent list instead of keeping the wrong slug
const DETAIL_PATTERNS = [
  /^\/blog\/[^\/]+$/, // /blog/slug
  /^\/proekti\/[^\/]+$/, // /proekti/slug
  /^\/karieri\/[^\/]+$/, // /karieri/slug
  /^\/en\/blog\/[^\/]+$/, // /en/blog/slug
  /^\/en\/proekti\/[^\/]+$/, // /en/proekti/slug
  /^\/en\/karieri\/[^\/]+$/, // /en/karieri/slug
];

function isDetailPage(path: string): boolean {
  return DETAIL_PATTERNS.some((pattern) => pattern.test(path));
}

function getParentListPath(path: string): string {
  // Remove slug to get parent list path
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "en") {
    return "/en/" + parts[1]; // /en/blog, /en/proekti, /en/karieri
  }
  return "/" + parts[0]; // /blog, /proekti, /karieri
}

export default function LanguageSwitcher({
  isDarkBg = false,
}: {
  isDarkBg?: boolean;
}) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // If on a detail page, redirect to parent list since slugs are locale-specific
    const targetPath = isDetailPage(currentPathname)
      ? getParentListPath(currentPathname)
      : currentPathname;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + targetPath);
    } else {
      router.push(targetPath.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button
        onClick={() => handleChange("bg")}
        className={`transition-colors ${
          currentLocale === "bg"
            ? "text-brand-green"
            : isDarkBg
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        }`}
      >
        BG
      </button>
      <span className={isDarkBg ? "text-white/30" : "text-slate-300"}>|</span>
      <button
        onClick={() => handleChange("en")}
        className={`transition-colors ${
          currentLocale === "en"
            ? "text-brand-green"
            : isDarkBg
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        }`}
      >
        EN
      </button>
    </div>
  );
}
