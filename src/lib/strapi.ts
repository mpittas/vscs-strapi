import { getStrapiMedia } from "./media";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchStrapi(
  path: string,
  tags: string[] = ["strapi"],
): Promise<any> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { tags },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function resolveImage(item: any) {
  if (!item?.featuredImage?.url) return null;
  return getStrapiMedia(item.featuredImage.url);
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

export async function getBlogPost(slug: string, locale = "bg") {
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
}

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

export async function getProjects(locale = "bg") {
  try {
    const { data } = await fetchStrapi(
      `/projects?populate=featuredImage&sort=publishedAt:desc&locale=${locale}`,
      ["strapi", "projects"],
    );
    return data.map((p: any) => ({ ...p, featuredImage: resolveImage(p) }));
  } catch (e) {
    console.error("Error fetching projects:", e);
    return [];
  }
}

export async function getPaginatedProjects(
  page = 1,
  pageSize = 6,
  country?: string,
  locale = "bg",
) {
  try {
    let path = `/projects?populate=featuredImage&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`;
    if (country && country !== "all") {
      path += `&filters[country][$eq]=${encodeURIComponent(country)}`;
    }

    const res = await fetchStrapi(path, ["strapi", "projects"]);
    return {
      data: res.data.map((p: any) => ({
        ...p,
        featuredImage: resolveImage(p),
      })),
      meta: res.meta,
    };
  } catch (e) {
    console.error("Error fetching paginated projects:", e);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize, pageCount: 0, total: 0 } },
    };
  }
}

export async function getProject(slug: string, locale = "bg") {
  try {
    const { data } = await fetchStrapi(
      `/projects?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=gallery&populate[2]=localizations&locale=${locale}`,
      ["strapi", "projects", `project-${slug}`],
    );
    if (!data?.length) return null;

    const p = data[0];
    return {
      ...p,
      featuredImage: resolveImage(p),
      gallery: p.gallery?.map((img: any) => ({
        url: getStrapiMedia(img.url),
        alt: img.alternativeText || p.title,
      })),
    };
  } catch (e) {
    console.error("Error fetching project:", e);
    return null;
  }
}

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

export async function getCareer(slug: string, locale = "bg") {
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
}
