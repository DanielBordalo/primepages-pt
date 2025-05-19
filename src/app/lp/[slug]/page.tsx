"use client";

import { notFound } from "next/navigation";
import PublicLandingPageClient from "./client";
import { getLandingPageBySlug } from "@/lib/getLandingPageBySlug";

export default async function PublicLandingPage({ params }: { params: { slug: string } }) {
  const pageData = await getLandingPageBySlug(params.slug);

  if (!pageData) {
    notFound();
  }

  return <PublicLandingPageClient pageData={pageData} />;
}
