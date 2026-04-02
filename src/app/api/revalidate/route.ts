import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Strapi Webhook Handler for On-Demand Revalidation
 *
 * This endpoint receives webhooks from Strapi when content is created,
 * updated, or deleted, and triggers Next.js to regenerate affected pages.
 */

// Secret token for webhook security (set in Strapi webhook config)
// Secret token for webhook security (set in Strapi webhook config)
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "your-secret-token";

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
    // Verify the secret token (supports both header and query param)
    const authHeader = request.headers.get("authorization");
    const headerToken = authHeader?.replace("Bearer ", "");
    const queryToken = request.nextUrl.searchParams.get("secret");

    const token = headerToken || queryToken;

    if (token !== REVALIDATE_SECRET) {
      console.warn("Revalidation webhook: Invalid or missing secret token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse the webhook payload
    const payload: StrapiWebhookPayload = await request.json();
    console.log("Strapi webhook received:", JSON.stringify(payload, null, 2));

    // Extract model name - Strapi might send it as "project", "api::project.project", etc.
    let modelName = payload.model?.toLowerCase() || "";

    // If uid is provided, try to extract model name from it (format: "api::project.project")
    if (payload.uid) {
      const uidMatch = payload.uid.match(/api::([^.]+)\./);
      if (uidMatch) {
        modelName = uidMatch[1].toLowerCase();
      }
    }

    console.log("Resolved model name:", modelName);

    // Revalidate both locale versions: bg (default, no prefix) and en (/en/...)
    const basePaths = ["/", "/proekti", "/karieri", "/blog", "/kontakti"];

    if (payload.entry?.slug) {
      switch (modelName) {
        case "blog-post":
          basePaths.push(`/blog/${payload.entry.slug}`);
          break;
        case "project":
          basePaths.push(`/proekti/${payload.entry.slug}`);
          break;
        case "career":
          basePaths.push(`/karieri/${payload.entry.slug}`);
          break;
      }
    }

    const locales = ["bg", "en"];
    const pathsToRevalidate: string[] = [];
    for (const p of basePaths) {
      for (const locale of locales) {
        pathsToRevalidate.push(locale === "bg" ? p : `/en${p}`);
      }
    }

    // Revalidate all affected paths
    const results: { path: string; revalidated: boolean; error?: string }[] =
      [];

    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        results.push({ path, revalidated: true });
        console.log(`Revalidated: ${path}`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        results.push({ path, revalidated: false, error: errorMessage });
        console.error(`Failed to revalidate ${path}:`, errorMessage);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Revalidation triggered",
      event: payload.event,
      model: payload.model,
      results,
    });
  } catch (error) {
    console.error("Revalidation webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Strapi revalidation webhook is ready",
    timestamp: new Date().toISOString(),
  });
}
