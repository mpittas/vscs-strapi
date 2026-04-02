/**
 * Strapi Media Utilities
 * Helper functions for handling Strapi media URLs with Next.js
 */

/**
 * Get the base Strapi URL
 */
export function getStrapiURL(): string {
  return (
    process.env.STRAPI_API_URL ||
    process.env.STRAPI_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337"
  );
}

/**
 * Convert a Strapi media URL (which might be relative) to a full URL
 * @param url - The URL from Strapi media object (can be relative or absolute)
 * @returns Full URL to the media file, or null if no URL provided
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  // Return as-is if it's already an absolute URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Prepend Strapi URL for relative paths
  return `${getStrapiURL()}${url}`;
}

/**
 * Get image props for Next.js Image component from Strapi media
 * @param media - Strapi media object with url and alternativeText
 * @param fallbackAlt - Fallback alt text if not provided
 * @returns Object with src and alt properties, or null if no media
 */
export function getStrapiImageProps(
  media: { url?: string; alternativeText?: string } | null | undefined,
  fallbackAlt: string = "Image",
): { src: string; alt: string } | null {
  if (!media?.url) {
    return null;
  }

  const src = getStrapiMedia(media.url);

  if (!src) {
    return null;
  }

  return {
    src,
    alt: media.alternativeText || fallbackAlt,
  };
}
