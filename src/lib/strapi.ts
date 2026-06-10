import { cache } from "react";
import { getStrapiMedia, STRAPI_URL } from "./media";

// Default ISR window (seconds). Strapi webhook will invalidate on demand via tags.
const DEFAULT_REVALIDATE = 3600;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchStrapi(
  path: string,
  tags: string[] = ["strapi"],
): Promise<any> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: DEFAULT_REVALIDATE, tags },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Picks an appropriately-sized URL from a Strapi media object.
 *
 * Strapi auto-generates responsive `formats` (thumbnail/small/medium/large).
 * We feed Next.js' image optimizer one of those instead of the multi-MB
 * original upload, so on-demand optimization stays fast. Falls back to the
 * original only when no formats exist (e.g. small source images).
 */
function pickMediaUrl(
  media: any,
  preferred: Array<"large" | "medium" | "small" | "thumbnail"> = [
    "large",
    "medium",
    "small",
  ],
): string | null {
  if (!media?.url) return null;
  const formats = media.formats ?? {};
  for (const key of preferred) {
    if (formats[key]?.url) return getStrapiMedia(formats[key].url);
  }
  return getStrapiMedia(media.url);
}

function resolveImage(item: any) {
  return pickMediaUrl(item?.featuredImage);
}

/**
 * Builds a locale → absolute URL path map from an item's localizations array.
 * The item itself provides the current locale + slug.
 *
 * @param item       - the Strapi item (must have `locale` and `slug`)
 * @param basePath   - e.g. "blog", "proekti", "karieri"
 * @param defaultLocale - the locale that has no prefix (e.g. "bg")
 */
export function buildLocalePaths(
  item: any,
  basePath: string,
  defaultLocale = "bg",
): Record<string, string> {
  const paths: Record<string, string> = {};

  // Add the current item's own path
  const currentLocale: string = item.locale ?? defaultLocale;
  const currentSlug: string = item.slug ?? "";
  paths[currentLocale] =
    currentLocale === defaultLocale
      ? `/${basePath}/${currentSlug}`
      : `/${currentLocale}/${basePath}/${currentSlug}`;

  // Add each localization
  const localizations: any[] = item.localizations ?? [];
  for (const loc of localizations) {
    const locLocale: string = loc.locale ?? "";
    const locSlug: string = loc.slug ?? "";
    if (!locLocale || !locSlug) continue;
    paths[locLocale] =
      locLocale === defaultLocale
        ? `/${basePath}/${locSlug}`
        : `/${locLocale}/${basePath}/${locSlug}`;
  }

  return paths;
}

// ── Blog ─────────────────────────────────────────────

export async function getBlogPosts(locale = "bg") {
  try {
    const { data } = await fetchStrapi(
      `/blog-posts?populate=featuredImage&sort=publishedAt:desc&locale=${locale}`,
      ["strapi", "blog-posts"],
    );
    return data.map((p: any) => ({ ...p, featuredImage: resolveImage(p) }));
  } catch (e) {
    console.error("Error fetching blog posts:", e);
    return [];
  }
}

export const getBlogPost = cache(async (slug: string, locale = "bg") => {
  try {
    const { data } = await fetchStrapi(
      `/blog-posts?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=localizations&locale=${locale}`,
      ["strapi", "blog-posts", `blog-post-${slug}`],
    );
    if (!data?.length) return null;
    const post = data[0];
    return { ...post, featuredImage: resolveImage(post) };
  } catch (e) {
    console.error("Error fetching blog post:", e);
    return null;
  }
});

export async function getPaginatedData(
  endpoint: string,
  page = 1,
  pageSize = 6,
  tags: string[] = [],
  locale = "bg",
) {
  try {
    const res = await fetchStrapi(
      `/${endpoint}?populate=featuredImage&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`,
      tags,
    );
    return { data: res.data ?? [], meta: res.meta };
  } catch (e) {
    console.error(`Error fetching paginated ${endpoint}:`, e);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize, pageCount: 0, total: 0 } },
    };
  }
}

// ── Projects ─────────────────────────────────────────

export interface ProjectGalleryImage {
  url: string | null;
  alt: string;
}

export interface Project {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  location: string;
  client?: string;
  year?: string;
  content: string;
  energy: string;
  services?: string;
  featuredImage?: string | null;
  gallery?: ProjectGalleryImage[];
  locale?: string;
  localizations?: Array<{ locale?: string; slug?: string }>;
  publishedAt?: string;
}

function mapProjectListItem(p: any): Project {
  return { ...p, featuredImage: resolveImage(p) };
}

function mapProjectDetail(p: any): Project {
  return {
    ...p,
    featuredImage: resolveImage(p),
    gallery: p.gallery?.map((img: any) => ({
      url: pickMediaUrl(img),
      alt: img.alternativeText || p.title,
    })),
  };
}

export async function getProjects(locale = "bg"): Promise<Project[]> {
  try {
    const { data } = await fetchStrapi(
      `/projects?populate=featuredImage&sort=publishedAt:desc&locale=${locale}`,
      ["strapi", "projects"],
    );
    return data.map((p: any) => mapProjectListItem(p));
  } catch (e) {
    console.error("Error fetching projects:", e);
    return [];
  }
}

export const getProject = cache(
  async (slug: string, locale = "bg"): Promise<Project | null> => {
    try {
      const { data } = await fetchStrapi(
        `/projects?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=gallery&populate[2]=localizations&locale=${locale}`,
        ["strapi", "projects", `project-${slug}`],
      );
      if (!data?.length) return null;

      return mapProjectDetail(data[0]);
    } catch (e) {
      console.error("Error fetching project:", e);
      return null;
    }
  },
);

// ── Careers ──────────────────────────────────────────

export async function getCareers(locale = "bg") {
  try {
    const { data } = await fetchStrapi(
      `/careers?sort=publishedAt:desc&locale=${locale}`,
      ["strapi", "careers"],
    );
    return data.map((c: any) => ({
      ...c,
      shortDescription: c.short_description,
      sidebarInfo: c.sidebar_info,
      mainContent: c.main_content,
    }));
  } catch (e) {
    console.error("Error fetching careers:", e);
    return [];
  }
}

export const getCareer = cache(async (slug: string, locale = "bg") => {
  try {
    const { data } = await fetchStrapi(
      `/careers?filters[slug][$eq]=${slug}&populate=localizations&locale=${locale}`,
      ["strapi", "careers", `career-${slug}`],
    );
    if (!data?.length) return null;

    const c = data[0];
    return {
      ...c,
      shortDescription: c.short_description,
      sidebarInfo: c.sidebar_info,
      mainContent: c.main_content,
    };
  } catch (e) {
    console.error("Error fetching career:", e);
    return null;
  }
});
