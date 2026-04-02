// Strapi 5 API client configuration
import { getStrapiMedia } from "./media";

type NextFetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const STRAPI_URL =
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);

function mergeFetchOptions(
  options: NextFetchOptions,
  tags: string[],
): NextFetchOptions {
  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: options.cache ?? "force-cache",
    next: {
      ...options.next,
      tags: options.next?.tags
        ? [...new Set([...options.next.tags, ...tags])]
        : tags,
    },
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generic fetch function for Strapi API
 * Uses Next.js cache tags for on-demand revalidation
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: NextFetchOptions = {},
  tags: string[] = ["strapi"],
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const requestOptions = mergeFetchOptions(options, tags);
  const method = (requestOptions.method || "GET").toUpperCase();
  const canRetry = method === "GET" || method === "HEAD";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        const shouldRetry =
          canRetry && RETRYABLE_STATUS_CODES.has(res.status) && attempt < 3;

        if (shouldRetry) {
          await wait(attempt * 500);
          continue;
        }

        console.error(
          `Strapi API error: ${res.status} ${res.statusText} (${url})`,
        );
        throw new Error(
          `Failed to fetch from Strapi: ${res.status} ${res.statusText}`,
        );
      }

      return res.json();
    } catch (error) {
      const isRetriableNetworkError =
        canRetry &&
        attempt < 3 &&
        !(
          error instanceof Error &&
          error.message.startsWith("Failed to fetch from Strapi:")
        );

      if (!isRetriableNetworkError) {
        throw error;
      }

      await wait(attempt * 500);
    }
  }

  throw new Error(`Failed to fetch from Strapi: ${endpoint}`);
}

/**
 * Fetches all blog posts from Strapi
 */
export async function getBlogPosts(locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        author: string;
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
      }>;
    }>(
      `/blog-posts?populate=featuredImage&sort=publishedAt:desc&locale=${locale}`,
      {},
      ["strapi", "blog-posts"],
    );

    return response.data.map((post) => ({
      id: post.id,
      documentId: post.documentId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publishedAt: post.publishedAt,
      featuredImage: getStrapiMedia(post.featuredImage?.url),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Generic function to fetch paginated data from Strapi
 */
export async function getPaginatedData<T>(
  endpoint: string,
  page = 1,
  pageSize = 6,
  tags: string[] = [],
  locale = "bg",
) {
  try {
    const response = await fetchAPI<{
      data: T[];
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    }>(
      `/${endpoint}?populate=featuredImage&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`,
      {},
      tags,
    );

    return {
      data: response.data,
      meta: response.meta,
    };
  } catch (error) {
    console.error(`Error fetching paginated data for ${endpoint}:`, error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

/**
 * Fetches a single blog post by slug from Strapi
 */
export async function getBlogPost(slug: string, locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        author: string;
        category?: string;
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
      }>;
    }>(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=featuredImage&locale=${locale}`,
      {},
      ["strapi", "blog-posts", `blog-post-${slug}`],
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const post = response.data[0];
    return {
      id: post.id,
      documentId: post.documentId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      publishedAt: post.publishedAt,
      featuredImage: getStrapiMedia(post.featuredImage?.url),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

/**
 * Check if Strapi is available
 */
export async function checkStrapiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/_health`, {
      method: "HEAD",
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetches all projects from Strapi
 */
export async function getProjects(locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        location: string;
        category: string;
        projectStatus: string;
        year: string;
        country: string;
        energy: string;
        services: string;
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
      }>;
    }>(
      `/projects?populate=featuredImage&sort=publishedAt:desc&locale=${locale}`,
      {},
      ["strapi", "projects"],
    );

    return response.data.map((project) => ({
      id: project.id,
      documentId: project.documentId,
      title: project.title,
      slug: project.slug,
      excerpt: project.excerpt,
      content: project.content,
      location: project.location,
      category: project.category,
      projectStatus: project.projectStatus,
      year: project.year,
      country: project.country,
      energy: project.energy,
      services: project.services,
      publishedAt: project.publishedAt,
      featuredImage: getStrapiMedia(project.featuredImage?.url),
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Fetches paginated projects from Strapi with optional country filter
 */
export async function getPaginatedProjects(
  page = 1,
  pageSize = 6,
  country?: string,
  locale = "bg",
) {
  try {
    let endpoint = `/projects?populate=featuredImage&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`;

    // Add country filter if specified and not "all"
    if (country && country !== "all") {
      endpoint += `&filters[country][$eq]=${encodeURIComponent(country)}`;
    }

    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        location: string;
        category: string;
        projectStatus: string;
        year: string;
        country: string;
        energy: string;
        services: string;
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
      }>;
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    }>(endpoint, {}, ["strapi", "projects"]);

    return {
      data: response.data.map((project) => ({
        id: project.id,
        documentId: project.documentId,
        title: project.title,
        slug: project.slug,
        excerpt: project.excerpt,
        content: project.content,
        location: project.location,
        category: project.category,
        projectStatus: project.projectStatus,
        year: project.year,
        country: project.country,
        energy: project.energy,
        services: project.services,
        publishedAt: project.publishedAt,
        featuredImage: getStrapiMedia(project.featuredImage?.url),
      })),
      meta: response.meta,
    };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

/**
 * Fetches a single project by slug from Strapi
 */
export async function getProject(slug: string, locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        location: string;
        category: string;
        projectStatus: string;
        year: string;
        country: string;
        energy: string;
        services: string;
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
        gallery?: Array<{
          url: string;
          alternativeText?: string;
        }>;
      }>;
    }>(
      `/projects?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=gallery&locale=${locale}`,
      {},
      ["strapi", "projects", `project-${slug}`],
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const project = response.data[0];
    return {
      id: project.id,
      documentId: project.documentId,
      title: project.title,
      slug: project.slug,
      excerpt: project.excerpt,
      content: project.content,
      location: project.location,
      category: project.category,
      projectStatus: project.projectStatus,
      year: project.year,
      country: project.country,
      energy: project.energy,
      services: project.services,
      publishedAt: project.publishedAt,
      featuredImage: getStrapiMedia(project.featuredImage?.url),
      gallery: project.gallery?.map((img) => ({
        url: getStrapiMedia(img.url),
        alt: img.alternativeText || project.title,
      })),
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

/**
 * Fetches all careers from Strapi
 */
export async function getCareers(locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        location: string;
        short_description: string;
        sidebar_info: string;
        main_content: string;
        publishedAt: string;
      }>;
    }>(`/careers?sort=publishedAt:desc&locale=${locale}`, {}, [
      "strapi",
      "careers",
    ]);

    return response.data.map((career) => ({
      id: career.id,
      documentId: career.documentId,
      title: career.title,
      slug: career.slug,
      location: career.location,
      shortDescription: career.short_description,
      sidebarInfo: career.sidebar_info,
      mainContent: career.main_content,
      publishedAt: career.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching careers:", error);
    return [];
  }
}

/**
 * Fetches a single career by slug from Strapi
 */
export async function getCareer(slug: string, locale = "bg") {
  try {
    const response = await fetchAPI<{
      data: Array<{
        id: number;
        documentId: string;
        title: string;
        slug: string;
        location: string;
        short_description: string;
        sidebar_info: string;
        main_content: string;
        publishedAt: string;
      }>;
    }>(`/careers?filters[slug][$eq]=${slug}&locale=${locale}`, {}, [
      "strapi",
      "careers",
      `career-${slug}`,
    ]);

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const career = response.data[0];
    return {
      id: career.id,
      documentId: career.documentId,
      title: career.title,
      slug: career.slug,
      location: career.location,
      shortDescription: career.short_description,
      sidebarInfo: career.sidebar_info,
      mainContent: career.main_content,
      publishedAt: career.publishedAt,
    };
  } catch (error) {
    console.error("Error fetching career:", error);
    return null;
  }
}
