"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from 'react-hot-toast';

// Interface para a paleta de cores
interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

// Define a type for the landing page data for better type safety
type LandingPage = {
  id: string;
  user_id: string; // To know who to send the contact email to
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
  // Supabase public URL for assets
  supabasePublicUrl: string;
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  page_owner_id: string;
  page_title: string;
  page_slug: string;
}

function ContactForm({ pageTitle, pageSlug, pageOwnerId, ctaButtonText, colorPalette }: {
  pageTitle: string;
  pageSlug: string;
  pageOwnerId: string;
  ctaButtonText: string;
  colorPalette: ColorPalette | null;
}) {
  const supabase = createClientComponentClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Definir cores padrão ou usar as da paleta personalizada
  const primaryColor = colorPalette?.primary || "#3B82F6";
  const secondaryColor = colorPalette?.secondary || "#1E3A8A";
  const accentColor = colorPalette?.accent || "#EF4444";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!name.trim() || !email.trim() || !message.trim()) {
        toast.error("Por favor, preencha todos os campos obrigatórios: Nome, Email e Mensagem.");
        setIsSubmitting(false);
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast.error("Por favor, insira um endereço de e-mail válido.");
        setIsSubmitting(false);
        return;
    }
    const formData: ContactFormData = { name, email, phone, message, page_owner_id: pageOwnerId, page_title: pageTitle, page_slug: pageSlug };
    try {
      console.log("Dados do formulário de contacto a enviar:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("A sua mensagem foi enviada com sucesso! Entraremos em contacto em breve.");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (error: any) {
      console.error("Erro ao enviar formulário de contacto:", error);
      toast.error(`Ocorreu um erro ao enviar a sua mensagem: ${error.message || "Tente novamente."}`);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mb-12 p-6 md:p-8 rounded-lg" style={{ backgroundColor: `${secondaryColor}10` }}>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: secondaryColor }}>{ctaButtonText || "Entre em Contacto"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: secondaryColor }}>Nome Completo <span style={{ color: accentColor }}>*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm" 
            style={{ 
              borderColor: `${primaryColor}40`
            }}
            placeholder="O seu nome" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium" style={{ color: secondaryColor }}>Endereço de E-mail <span style={{ color: accentColor }}>*</span></label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm" 
            style={{ 
              borderColor: `${primaryColor}40`
            }}
            placeholder="email@exemplo.com" 
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium" style={{ color: secondaryColor }}>Telefone (Opcional)</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm" 
            style={{ 
              borderColor: `${primaryColor}40`
            }}
            placeholder="O seu contacto telefónico" 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium" style={{ color: secondaryColor }}>Mensagem <span style={{ color: accentColor }}>*</span></label>
          <textarea 
            name="message" 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={4} 
            required 
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm" 
            style={{ 
              borderColor: `${primaryColor}40`
            }}
            placeholder="Escreva a sua mensagem aqui..."
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50"
            style={{ 
              backgroundColor: isSubmitting ? "#9CA3AF" : primaryColor,
              borderColor: "transparent"
            }}
          >
            {isSubmitting ? "A Enviar..." : (ctaButtonText || "Enviar Mensagem")}
          </button>
        </div>
      </form>
    </section>
  );
}

function CopyLinkButton({ colorPalette }: { colorPalette: ColorPalette | null }) {
  const pathname = usePathname();
  const [pageUrl, setPageUrl] = useState("");

  // Definir cores padrão ou usar as da paleta personalizada
  const primaryColor = colorPalette?.primary || "#3B82F6";
  const secondaryColor = colorPalette?.secondary || "#1E3A8A";

  useEffect(() => {
    // Ensure window is defined (runs on client-side)
    if (typeof window !== "undefined") {
      setPageUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  const handleCopyLink = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      toast.success("Link copiado para a área de transferência!");
    } catch (err) {
      console.error("Falha ao copiar o link: ", err);
      toast.error("Não foi possível copiar o link. Por favor, tente manualmente.");
    }
  };

  if (!pageUrl) return null; // Don't render button if URL is not yet available

  return (
    <div className="my-8 text-center">
      <button 
        onClick={handleCopyLink}
        className="font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          backgroundColor: primaryColor,
          color: "white"
        }}
      >
        Copiar Link da Página
      </button>
    </div>
  );
}

// Componente para carregar dados da landing page
export default function PublicLandingPage({ pageData }: { pageData: LandingPage }) {
  if (!pageData) {
    return <div>Carregando...</div>;
  }

  // Definir cores padrão ou usar as da paleta personalizada
  const colorPalette = pageData.color_palette || {
    primary: "#3B82F6", // Azul como cor primária padrão
    secondary: "#1E3A8A", // Azul escuro como cor secundária padrão
    accent: "#EF4444"    // Vermelho como cor de destaque padrão
  };

  const getPublicUrl = (filePath: string | null | undefined) => {
    if (!filePath) return null;
    return `${pageData.supabasePublicUrl}${filePath}`;
  };

  // Escolher qual descrição mostrar, priorizando a versão profissional se existir
  const displayDescription = pageData.description_professional_ai || pageData.description;

  return (
    <div className="container mx-auto p-4 md:p-8 antialiased">
      <style jsx global>{`
        :root {
          --color-primary: ${colorPalette.primary};
          --color-secondary: ${colorPalette.secondary};
          --color-accent: ${colorPalette.accent};
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: var(--color-secondary);
        }
        
        a {
          color: var(--color-primary);
        }
        
        a:hover {
          color: var(--color-secondary);
        }
        
        .accent-text {
          color: var(--color-accent);
        }
        
        .primary-bg {
          background-color: var(--color-primary);
        }
        
        .secondary-bg {
          background-color: var(--color-secondary);
        }
        
        .accent-bg {
          background-color: var(--color-accent);
        }
      `}</style>

      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold" style={{ color: colorPalette.secondary }}>{pageData.title}</h1>
      </header>

      <CopyLinkButton colorPalette={colorPalette} />

      {displayDescription && (
        <section className="mb-12 prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colorPalette.secondary }}>Sobre</h2>
          {displayDescription.split("\n").map((paragraph, index) => (
            <p key={index} className="leading-relaxed" style={{ color: "#4B5563" }}>{paragraph}</p>
          ))}
        </section>
      )}

      {pageData.images_gallery && pageData.images_gallery.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: colorPalette.secondary }}>Galeria de Imagens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {pageData.images_gallery.sort((a,b) => a.order - b.order).map((image, index) => (
              <div key={index} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg" style={{ borderColor: `${colorPalette.primary}30`, borderWidth: "1px" }}>
                <img src={getPublicUrl(image.path) || "/placeholder-image.svg"} alt={image.name || `Imagem da galeria ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {(pageData.video_embed_url || pageData.video_storage_path) && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: colorPalette.secondary }}>Vídeo</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ borderColor: `${colorPalette.primary}30`, borderWidth: "1px" }}>
            {pageData.video_embed_url && (
              <iframe 
                src={pageData.video_embed_url.includes("youtu.be") ? pageData.video_embed_url.replace("youtu.be/", "youtube.com/embed/") : pageData.video_embed_url.replace("vimeo.com/", "player.vimeo.com/video/")} 
                title="Vídeo da Landing Page" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
            {!pageData.video_embed_url && pageData.video_storage_path && (
              <video controls src={getPublicUrl(pageData.video_storage_path) || ""} className="w-full h-full object-contain">
                O seu navegador não suporta o elemento de vídeo.
              </video>
            )}
          </div>
        </section>
      )}

      {pageData.benefits_features && pageData.benefits_features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: colorPalette.secondary }}>Benefícios / Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.benefits_features.map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md flex items-start space-x-4" style={{ backgroundColor: "white", borderColor: `${colorPalette.primary}30`, borderWidth: "1px" }}>
                {benefit.icon && <span className="text-3xl" style={{ color: colorPalette.primary }}>{benefit.icon}</span>} 
                <p style={{ color: "#4B5563" }}>{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {pageData.cta_contact_form_enabled && (
         <ContactForm 
            pageTitle={pageData.title}
            pageSlug="example-slug" 
            pageOwnerId={pageData.user_id} 
            ctaButtonText={pageData.cta_button_text || "Enviar Mensagem"} 
            colorPalette={colorPalette}
        />
      )}

      {pageData.calendly_link && (
        <section className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: colorPalette.secondary }}>Agende uma Reunião</h2>
          <a 
            href={pageData.calendly_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block font-bold py-3 px-8 rounded-lg text-lg shadow-md transition duration-150 ease-in-out"
            style={{ 
              backgroundColor: colorPalette.accent,
              color: "white"
            }}
          >
            Agendar Agora
          </a>
        </section>
      )}

      <footer className="text-center text-sm mt-12 py-6 border-t" style={{ borderColor: `${colorPalette.secondary}20`, color: "#6B7280" }}>
        <p>Landing Page criada com PrimePages PT.</p>
        <p>Data de Criação: {new Date(pageData.created_at).toLocaleDateString("pt-PT", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </footer>
    </div>
  );
}
