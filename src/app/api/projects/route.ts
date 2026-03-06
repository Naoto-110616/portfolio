import { NextResponse } from "next/server";
import { fetchPortfolioProjects } from "@/lib/contentful-queries";

export async function GET() {
  const projects = await fetchPortfolioProjects();
  return NextResponse.json({ projects });
}
