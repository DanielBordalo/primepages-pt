export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export type LandingPage = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  description_professional_ai: string | null;
  images_gallery: { path: string; name: string; size: number; type: string; order: number }[] | null;
  video_embed_url: string | null;
  video_storage_path: string | null;
  benefits_features: { icon?: string; text: string }[] | null;
  cta_button_text: string | null;
  cta_contact_form_enabled: boolean;
  calendly_link: string | null;
  color_palette: ColorPalette | null;
  created_at: string;
  supabasePublicUrl: string;
};
