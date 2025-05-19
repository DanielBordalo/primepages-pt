"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Componente para o botão de copiar link
function CopyLinkButton() {
  const [pageUrl, setPageUrl] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

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

  if (!pageUrl) return null;

  return (
    <div className="my-8 text-center">
      <button 
        onClick={handleCopyLink}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Copiar Link da Página
      </button>
    </div>
  );
}

// Componente para o formulário de contacto
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
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
    
    try {
      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("A sua mensagem foi enviada com sucesso! Entraremos em contacto em breve.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-12 bg-gray-50 p-6 md:p-8 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">Agende a Sua Sessão</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="O seu nome" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Endereço de E-mail <span className="text-red-500">*</span></label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="email@exemplo.com" 
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone (Opcional)</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="O seu contacto telefónico" 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem <span className="text-red-500">*</span></label>
          <textarea 
            name="message" 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={4} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="Descreva brevemente o que procura no coaching..."
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "A Enviar..." : "Agendar Consulta Inicial"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function CoachingExample() {
  // Simulação de dados de uma landing page
  const coachingData = {
    title: "Coaching de Vida & Carreira",
    description: "Transforme a sua vida e carreira com sessões de coaching personalizadas. Descubra o seu potencial máximo e alcance os seus objetivos com orientação profissional e estratégias comprovadas. O nosso método único combina técnicas de desenvolvimento pessoal, gestão de tempo e planeamento estratégico para resultados duradouros.",
    benefits: [
      { icon: "✨", text: "Clareza nos objetivos pessoais e profissionais" },
      { icon: "🚀", text: "Aumento de produtividade e foco" },
      { icon: "🔄", text: "Equilíbrio entre vida pessoal e profissional" },
      { icon: "💪", text: "Desenvolvimento de confiança e autoestima" },
      { icon: "🧠", text: "Estratégias para superar bloqueios mentais" },
      { icon: "🌱", text: "Crescimento contínuo e sustentável" }
    ],
    testimonials: [
      { name: "Ana Silva", role: "Gestora de Marketing", text: "As sessões de coaching transformaram completamente a minha abordagem profissional. Consegui uma promoção em apenas 3 meses!" },
      { name: "João Pereira", role: "Empreendedor", text: "Finalmente consegui equilibrar o crescimento do meu negócio com tempo de qualidade para a família. Recomendo vivamente." }
    ],
    colorPalette: {
      primary: "#6366F1",   // Indigo
      secondary: "#4338CA", // Indigo escuro
      accent: "#EC4899"     // Rosa
    }
  };

  // Aplicar cores da paleta
  const { primary, secondary, accent } = coachingData.colorPalette;

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        :root {
          --color-primary: ${primary};
          --color-secondary: ${secondary};
          --color-accent: ${accent};
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

      <header className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/exemplos/coaching-header.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{coachingData.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">Descubra o seu potencial máximo</p>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8">
        <CopyLinkButton />

        <section className="mb-12 prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: secondary }}>Sobre o Nosso Coaching</h2>
          {coachingData.description.split('. ').map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-gray-700">
              {paragraph.trim() + (paragraph.endsWith('.') ? '' : '.')}
            </p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: secondary }}>Galeria de Imagens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg" style={{ borderColor: `${primary}30`, borderWidth: "1px" }}>
                <div className="relative w-full h-48">
                  <Image 
                    src={`/exemplos/coaching-${num}.jpg`} 
                    alt={`Imagem de coaching ${num}`} 
                    fill
                    style={{objectFit: 'cover'}}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: secondary }}>Vídeo Introdutório</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ borderColor: `${primary}30`, borderWidth: "1px" }}>
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Vídeo Introdutório de Coaching" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: secondary }}>Benefícios do Coaching</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachingData.benefits.map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md flex items-start space-x-4" style={{ backgroundColor: "white", borderColor: `${primary}30`, borderWidth: "1px" }}>
                <span className="text-3xl" style={{ color: primary }}>{benefit.icon}</span> 
                <p className="text-gray-700">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: secondary }}>Testemunhos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachingData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md" style={{ backgroundColor: `${primary}10` }}>
                <p className="italic text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3" style={{ backgroundColor: `${primary}30` }}>
                    <span className="text-lg font-bold" style={{ color: primary }}>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: secondary }}>{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactForm />

        <section className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: secondary }}>Agende Diretamente</h2>
          <a 
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block font-bold py-3 px-8 rounded-lg text-lg shadow-md transition duration-150 ease-in-out"
            style={{ 
              backgroundColor: accent,
              color: "white"
            }}
          >
            Reservar no Calendly
          </a>
        </section>
      </div>

      <footer className="text-center text-sm py-6 border-t" style={{ borderColor: `${secondary}20`, color: "#6B7280" }}>
        <p>Landing Page criada com PrimePages PT.</p>
        <p>Data de Criação: {new Date().toLocaleDateString("pt-PT", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="mt-4">
          <Link href="/exemplos" className="text-indigo-600 hover:text-indigo-800">← Voltar aos Exemplos</Link>
        </div>
      </footer>
    </div>
  );
}
