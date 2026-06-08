"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import i18nConfig from "@/i18nConfig";
import {
  getTranslatedPaths,
  subscribeToTranslatedPaths,
} from "@/components/TranslatedSlugProvider";

const { locales, defaultLocale, prefixDefault } = i18nConfig;

/** Extracts the active locale from the pathname. */
function localeFromPath(pathname: string): string {
  const segment = pathname.split("/")[1];
  return locales.includes(segment) ? segment : defaultLocale;
}

/** Strips any locale prefix from the pathname. */
function stripLocale(pathname: string, locale: string): string {
  if (locale === defaultLocale && !prefixDefault) return pathname;
  return pathname.replace(new RegExp(`^/${locale}`), "") || "/";
}

/** Builds the full target path for a new locale. */
function buildPath(rawPath: string, newLocale: string): string {
  if (newLocale === defaultLocale && !prefixDefault) return rawPath;
  return `/${newLocale}${rawPath === "/" ? "" : rawPath}`;
}

export default function LanguageSwitcher({
  isDarkBg = false,
}: {
  isDarkBg?: boolean;
}) {
  const pathname = usePathname();

  // Derive locale purely from the URL — no i18next dependency.
  const currentLocale = localeFromPath(pathname);

  // Subscribe to the module-level translated-paths store reactively.
  // This works across the layout/page boundary (unlike React Context).
  const translatedPaths = useSyncExternalStore(
    subscribeToTranslatedPaths,
    getTranslatedPaths,
    () => null, // server snapshot
  );

  const handleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Persist locale preference in cookie (used by next-i18n-router middleware)
    const expires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Use full page reload instead of router.push() to ensure the
    // next-i18n-router middleware runs and serves the correct locale.
    // Client-side navigation (router.push) skips middleware on production
    // builds, causing the locale switch to silently fail.
    if (translatedPaths?.[newLocale]) {
      window.location.href = translatedPaths[newLocale];
      return;
    }

    // For all other pages, swap the locale prefix in the URL.
    const rawPath = stripLocale(pathname, currentLocale);
    window.location.href = buildPath(rawPath, newLocale);
  };

  const btnClass = (locale: string) => {
    const isActive = currentLocale === locale;
    if (isActive) return "text-brand-green";
    return isDarkBg
      ? "text-white/80 hover:text-white transition-colors"
      : "text-slate-500 hover:text-slate-700 transition-colors";
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button onClick={() => handleChange("bg")} className={btnClass("bg")}>
        BG
      </button>
      <span className={isDarkBg ? "text-white/30" : "text-slate-300"}>|</span>
      <button onClick={() => handleChange("en")} className={btnClass("en")}>
        EN
      </button>
      <span className={isDarkBg ? "text-white/30" : "text-slate-300"}>|</span>
      <button onClick={() => handleChange("fr")} className={btnClass("fr")}>
        FR
      </button>
    </div>
  );
}
