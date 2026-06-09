"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import i18nConfig from "@/i18nConfig";
import {
  getTranslatedPaths,
  subscribeToTranslatedPaths,
} from "@/components/TranslatedSlugProvider";

const { locales, defaultLocale, prefixDefault } = i18nConfig;

const LOCALE_META: Record<
  string,
  { label: string; Flag: () => ReactNode }
> = {
  bg: { label: "BG", Flag: BulgarianFlag },
  en: { label: "EN", Flag: EnglishFlag },
  fr: { label: "FR", Flag: FrenchFlag },
};

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

function FlagCircle({ children }: { children: ReactNode }) {
  return (
    <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
      {children}
    </span>
  );
}

function BulgarianFlag() {
  return (
    <FlagCircle>
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
        <rect width="24" height="8" y="0" fill="#fff" />
        <rect width="24" height="8" y="8" fill="#00966E" />
        <rect width="24" height="8" y="16" fill="#D62612" />
      </svg>
    </FlagCircle>
  );
}

function EnglishFlag() {
  return (
    <FlagCircle>
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
        <rect width="24" height="24" fill="#B22234" />
        <rect width="24" height="1.85" y="1.85" fill="#fff" />
        <rect width="24" height="1.85" y="5.55" fill="#fff" />
        <rect width="24" height="1.85" y="9.25" fill="#fff" />
        <rect width="24" height="1.85" y="13" fill="#fff" />
        <rect width="24" height="1.85" y="16.7" fill="#fff" />
        <rect width="24" height="1.85" y="20.4" fill="#fff" />
        <rect width="9.6" height="12.9" fill="#3C3B6E" />
      </svg>
    </FlagCircle>
  );
}

function FrenchFlag() {
  return (
    <FlagCircle>
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
        <rect width="8" height="24" fill="#002395" />
        <rect width="8" height="24" x="8" fill="#fff" />
        <rect width="8" height="24" x="16" fill="#ED2939" />
      </svg>
    </FlagCircle>
  );
}

export default function LanguageSwitcher({
  isTransparent = false,
}: {
  isTransparent?: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = localeFromPath(pathname);
  const currentMeta = LOCALE_META[currentLocale] ?? LOCALE_META.bg;

  const translatedPaths = useSyncExternalStore(
    subscribeToTranslatedPaths,
    getTranslatedPaths,
    () => null,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    const expires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (translatedPaths?.[newLocale]) {
      window.location.href = translatedPaths[newLocale];
      return;
    }

    const rawPath = stripLocale(pathname, currentLocale);
    window.location.href = buildPath(rawPath, newLocale);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all",
          isTransparent
            ? "border-white/25 bg-white/10 text-white shadow-none backdrop-blur-sm hover:bg-white/15"
            : "border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-md",
        )}
      >
        <currentMeta.Flag />
        <span>{currentMeta.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isTransparent ? "text-white/70" : "text-slate-500",
            isOpen && "rotate-180",
          )}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Languages"
          className={cn(
            "absolute right-0 z-50 mt-2 min-w-[10.5rem] overflow-hidden rounded-2xl border py-1.5 shadow-lg",
            isTransparent
              ? "border-white/25 bg-white/10 backdrop-blur-md"
              : "border-slate-100 bg-white",
          )}
        >
          {locales.map((locale) => {
            const meta = LOCALE_META[locale];
            if (!meta) return null;

            const isActive = locale === currentLocale;

            return (
              <li key={locale} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => handleChange(locale)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "text-brand-green"
                      : isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-slate-900 hover:bg-slate-50",
                  )}
                >
                  <meta.Flag />
                  <span>{meta.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
