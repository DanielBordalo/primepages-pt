"use client";

import { notFound } from "next/navigation";
import PublicLandingPageClient from "./client";
import { getlandingpagebyslug } from "@/lib/getlandingpagebyslug";

export default async function PublicLandingPage({ params }: { params: { slug: string } }) {
  const pageData = await getlandingpagebyslug(params.slug);

  if (!pageData) {
    notFound();
  }

  return <PublicLandingPageClient pageData={pageData} />;
}
