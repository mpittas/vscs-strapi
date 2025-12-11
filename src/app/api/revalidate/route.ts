import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Strapi Webhook Handler for On-Demand Revalidation
 * 
 * This endpoint receives webhooks from Strapi when content is created,
 * updated, or deleted, and triggers Next.js to regenerate affected pages.
 */

// Secret token for webhook security (set in Strapi webhook config)
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-token';

interface StrapiWebhookPayload {
  event: string;
  model: string;
  uid: string;
  entry: {
    id: number;
    documentId?: string;
    slug?: string;
    title?: string;
    publishedAt?: string;
    [key: string]: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== REVALIDATE_SECRET) {
      console.warn('Revalidation webhook: Invalid or missing secret token');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload: StrapiWebhookPayload = await request.json();
    console.log('Strapi webhook received:', payload.event, payload.model);

    // Determine which paths to revalidate based on the content type
    const pathsToRevalidate: string[] = [];

    switch (payload.model) {
      case 'blog-post':
        // Always revalidate the blog listing page
        pathsToRevalidate.push('/blog');
        
        // If we have a slug, revalidate the specific post page
        if (payload.entry?.slug) {
          pathsToRevalidate.push(`/blog/${payload.entry.slug}`);
        }
        
        // Also revalidate homepage (if it shows recent posts)
        pathsToRevalidate.push('/');
        break;

      // Add more content types as needed
      default:
        // For unknown content types, revalidate common pages
        pathsToRevalidate.push('/');
        break;
    }

    // Revalidate all affected paths
    const results: { path: string; revalidated: boolean; error?: string }[] = [];
    
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        results.push({ path, revalidated: true });
        console.log(`Revalidated: ${path}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ path, revalidated: false, error: errorMessage });
        console.error(`Failed to revalidate ${path}:`, errorMessage);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Revalidation triggered',
      event: payload.event,
      model: payload.model,
      results,
    });

  } catch (error) {
    console.error('Revalidation webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Strapi revalidation webhook is ready',
    timestamp: new Date().toISOString(),
  });
}
