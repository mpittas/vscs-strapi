// Strapi 5 API client configuration

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Generic fetch function for Strapi API
 * Uses Next.js cache tags for on-demand revalidation
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  tags: string[] = ['strapi']
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
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
    }>('/blog-posts?populate=featuredImage&sort=publishedAt:desc', {}, ['strapi', 'blog-posts']);

    return response.data.map((post) => ({
      id: post.id,
      documentId: post.documentId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publishedAt: post.publishedAt,
      featuredImage: post.featuredImage?.url
        ? `${STRAPI_URL}${post.featuredImage.url}`
        : null,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
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
        publishedAt: string;
        featuredImage?: {
          url: string;
          alternativeText?: string;
        };
      }>;
    }>(`/blog-posts?filters[slug][$eq]=${slug}&populate=featuredImage`, {}, ['strapi', 'blog-posts', `blog-post-${slug}`]);

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
      publishedAt: post.publishedAt,
      featuredImage: post.featuredImage?.url
        ? `${STRAPI_URL}${post.featuredImage.url}`
        : null,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Check if Strapi is available
 */
export async function checkStrapiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/_health`, {
      method: 'HEAD',
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}
