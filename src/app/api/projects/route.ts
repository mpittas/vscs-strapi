import { NextRequest, NextResponse } from "next/server";
import { getPaginatedProjects } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);
  const country = searchParams.get("country") || undefined;

  try {
    const result = await getPaginatedProjects(page, pageSize, country);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in projects API:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
