import i18nConfig from "@/i18nConfig";

const { locales, defaultLocale, prefixDefault } = i18nConfig;

/** Extracts the active locale from the pathname. */
export function localeFromPathname(pathname: string): string {
  const segment = pathname.split("/")[1];
  return locales.includes(segment) ? segment : defaultLocale;
}

/** Returns true when the path already includes a locale prefix. */
function isAlreadyLocalized(path: string): boolean {
  const segment = path.split("/")[1];
  return locales.includes(segment);
}

/**
 * Prefixes an internal path with the locale segment when needed.
 * Default locale (bg) uses unprefixed paths when prefixDefault is false.
 */
export function localizedPath(path: string, locale: string = defaultLocale): string {
  if (!path.startsWith("/")) return path;
  if (isAlreadyLocalized(path)) return path;

  if (locale === defaultLocale && !prefixDefault) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
