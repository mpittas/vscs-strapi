// Strapi 5 API client configuration
import { getStrapiMedia } from "./media";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Generic fetch function for Strapi API
 * Uses Next.js cache tags for on-demand revalidation
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  tags: string[] = ["strapi"],
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags, // Enable tag-based revalidation
    },
  };

  const res = await fetch(url, { ...defaultOptions, ...options });

  if (!res.ok) {
    console.error(`Strapi API error: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches all blog posts from Strapi
 */
export async function getBlogPosts() {
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
    }>("/blog-posts?populate=featuredImage&sort=publishedAt:desc", {}, [
      "strapi",
      "blog-posts",
    ]);

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
      `/${endpoint}?populate=featuredImage&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
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
export async function getBlogPost(slug: string) {
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
    }>(`/blog-posts?filters[slug][$eq]=${slug}&populate=featuredImage`, {}, [
      "strapi",
      "blog-posts",
      `blog-post-${slug}`,
    ]);

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
export async function getProjects() {
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
    }>("/projects?populate=featuredImage&sort=publishedAt:desc", {}, [
      "strapi",
      "projects",
    ]);

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
 * Fetches a single project by slug from Strapi
 */
export async function getProject(slug: string) {
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
      `/projects?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=gallery`,
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
