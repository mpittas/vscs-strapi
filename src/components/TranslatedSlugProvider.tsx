"use client";

import { createContext, useContext } from "react";

/**
 * A map of locale → absolute path (without domain)
 * e.g. { bg: "/blog/my-slug", en: "/en/blog/my-en-slug" }
 */
export type LocalePathMap = Record<string, string>;

const TranslatedSlugContext = createContext<LocalePathMap | null>(null);

export function TranslatedSlugProvider({
  paths,
  children,
}: {
  paths: LocalePathMap;
  children: React.ReactNode;
}) {
  return (
    <TranslatedSlugContext.Provider value={paths}>
      {children}
    </TranslatedSlugContext.Provider>
  );
}

export function useTranslatedSlug(): LocalePathMap | null {
  return useContext(TranslatedSlugContext);
}
