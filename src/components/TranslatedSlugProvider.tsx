"use client";

import { useEffect } from "react";

/**
 * A map of locale → absolute path (without domain)
 * e.g. { bg: "/blog/my-slug", en: "/en/blog/my-en-slug" }
 */
export type LocalePathMap = Record<string, string>;

/**
 * Module-level store — the simplest possible global state.
 * Because this module is a singleton on the client, any component
 * that imports it reads/writes the same value.
 *
 * Detail pages register their translated paths here on mount.
 * The LanguageSwitcher reads from here when navigating.
 */
let _translatedPaths: LocalePathMap | null = null;
const _listeners = new Set<() => void>();

export function setTranslatedPaths(paths: LocalePathMap | null) {
  _translatedPaths = paths;
  _listeners.forEach((fn) => fn());
}

export function getTranslatedPaths(): LocalePathMap | null {
  return _translatedPaths;
}

export function subscribeToTranslatedPaths(fn: () => void): () => void {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

/**
 * Drop this component anywhere inside a detail page (server or client).
 * It registers the translated paths on mount and clears them on unmount
 * so that list/other pages don't accidentally inherit stale detail paths.
 */
export function TranslatedSlugProvider({
  paths,
}: {
  paths: LocalePathMap;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    setTranslatedPaths(paths);
    return () => setTranslatedPaths(null);
  }, [paths]);

  return null;
}

// Keep the hook for any component that wants to subscribe reactively.
export function useTranslatedSlug(): LocalePathMap | null {
  return getTranslatedPaths();
}
