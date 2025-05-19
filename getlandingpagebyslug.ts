"use server";

import { createClient } from "@/lib/supabase/server";
import { LandingPage } from "@/app/lp/[slug]/types";

export async function getlandingpagebyslug(slug: string): Promise<LandingPage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select(
      "id, user_id, title, description, description_professional_ai, images_gallery, video_embed_url, video_storage_path, benefits_features, cta_button_text, cta_contact_form_enabled, calendly_link, color_palette, created_at"
    )
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (error) {
    console.error("Erro ao carregar landing page:", error);
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabasePublicUrl = `${supabaseUrl}/storage/v1/object/public/landing_page_assets/`;

  return { ...data, supabasePublicUrl };
}
