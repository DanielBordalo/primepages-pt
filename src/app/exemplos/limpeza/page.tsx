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
        className="font-bold py-3 px-6 rounded-lg text-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ backgroundColor: "#10B981", color: "white" }}
      >
        Copiar Link da Página
      </button>
    </div>
  );
}

// Componente para o formulário de orçamento
function QuoteForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const [frequency, setFrequency] = useState("única");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !service) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
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
      toast.success("O seu pedido de orçamento foi enviado com sucesso! Entraremos em contacto em breve.");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setService("");
      setFrequency("única");
      setMessage("");
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-12 bg-green-50 p-6 md:p-8 rounded-lg border border-green-200">
      <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6 text-center">Peça um Orçamento Gratuito</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-green-800">Nome Completo <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
            placeholder="O seu nome" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-800">E-mail <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
              placeholder="email@exemplo.com" 
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-green-800">Telefone <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
              placeholder="O seu contacto telefónico" 
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-green-800">Morada <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="address" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
            placeholder="Rua, número, código postal e localidade" 
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-green-800">Serviço Pretendido <span className="text-red-500">*</span></label>
          <select 
            name="service" 
            id="service" 
            value={service} 
            onChange={(e) => setService(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
          >
            <option value="">Selecione um serviço</option>
            <option value="limpeza_regular">Limpeza Regular</option>
            <option value="limpeza_profunda">Limpeza Profunda</option>
            <option value="limpeza_pos_obra">Limpeza Pós-Obra</option>
            <option value="limpeza_vidros">Limpeza de Vidros</option>
            <option value="limpeza_estofos">Limpeza de Estofos</option>
            <option value="outro">Outro (especificar na mensagem)</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-green-800">Frequência</label>
          <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="frequency" 
                value="única" 
                checked={frequency === "única"} 
                onChange={() => setFrequency("única")} 
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-green-300" 
              />
              <span className="text-sm text-gray-700">Única</span>
            </label>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="frequency" 
                value="semanal" 
                checked={frequency === "semanal"} 
                onChange={() => setFrequency("semanal")} 
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-green-300" 
              />
              <span className="text-sm text-gray-700">Semanal</span>
            </label>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="frequency" 
                value="quinzenal" 
                checked={frequency === "quinzenal"} 
                onChange={() => setFrequency("quinzenal")} 
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-green-300" 
              />
              <span className="text-sm text-gray-700">Quinzenal</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-green-800">Detalhes Adicionais</label>
          <textarea 
            name="message" 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={3} 
            className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
            placeholder="Dimensões do espaço, necessidades específicas, etc."
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "A Processar..." : "Solicitar Orçamento"}
          </button>
        </div>
      </form>
    </section>
  );
}

// Componente para os serviços
function ServicesSection() {
  const services = [
    {
      title: "Limpeza Regular",
      description: "Serviço de limpeza periódica para manter a sua casa ou escritório sempre impecável.",
      icon: "🧹",
      features: ["Limpeza de pó", "Aspiração e lavagem de pavimentos", "Limpeza de casas de banho", "Limpeza de cozinha"]
    },
    {
      title: "Limpeza Profunda",
      description: "Limpeza intensiva e detalhada para espaços que necessitam de cuidados especiais.",
      icon: "✨",
      features: ["Limpeza de interior de armários", "Limpeza de eletrodomésticos", "Remoção de manchas", "Limpeza de rodapés e cantos"]
    },
    {
      title: "Limpeza Pós-Obra",
      description: "Remoção de resíduos de construção e limpeza completa após obras ou renovações.",
      icon: "🏗️",
      features: ["Remoção de poeira de construção", "Limpeza de resíduos de tinta", "Limpeza de vidros e caixilhos", "Tratamento de pavimentos"]
    },
    {
      title: "Limpeza de Vidros",
      description: "Limpeza especializada de janelas, montras e superfícies de vidro para máxima transparência.",
      icon: "🪟",
      features: ["Limpeza de janelas interiores e exteriores", "Limpeza de montras", "Remoção de manchas difíceis", "Limpeza de caixilhos"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">Os Nossos Serviços</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{service.icon}</span>
              <h3 className="text-xl font-semibold text-green-700">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LimpezaExample() {
  // Simulação de dados de uma landing page
  const limpezaData = {
    title: "EcoLimpa - Serviços de Limpeza",
    description: "A EcoLimpa oferece serviços de limpeza profissionais para residências e escritórios em toda a área de Lisboa. Com mais de 10 anos de experiência, a nossa equipa qualificada utiliza produtos ecológicos e técnicas eficientes para garantir resultados impecáveis. Comprometemo-nos com a sustentabilidade, a qualidade e a satisfação total dos nossos clientes.",
    features: [
      { icon: "♻️", text: "Produtos de limpeza ecológicos e biodegradáveis" },
      { icon: "👥", text: "Equipa profissional, formada e de confiança" },
      { icon: "⏱️", text: "Pontualidade e eficiência garantidas" },
      { icon: "🔍", text: "Atenção meticulosa aos detalhes" },
      { icon: "💯", text: "Satisfação garantida ou devolvemos o seu dinheiro" },
      { icon: "🌱", text: "Compromisso com práticas sustentáveis" }
    ],
    testimonials: [
      { name: "Maria Carvalho", location: "Cascais", text: "Serviço impecável! A minha casa nunca esteve tão limpa e o cheiro a fresco é maravilhoso. Recomendo vivamente." },
      { name: "Pedro Santos", location: "Lisboa", text: "Contratei para o meu escritório e fiquei impressionado com a qualidade e profissionalismo. Agora tenho um contrato mensal." },
      { name: "Sofia Martins", location: "Oeiras", text: "Adoro que usem produtos ecológicos. Sinto-me bem por ter uma casa limpa sem prejudicar o ambiente." }
    ],
    colorPalette: {
      primary: "#10B981",   // Emerald-500
      secondary: "#065F46", // Emerald-800
      accent: "#F59E0B"     // Amber-500
    }
  };

  // Aplicar cores da paleta
  const { primary, secondary, accent } = limpezaData.colorPalette;

  return (
    <div className="min-h-screen bg-green-50">
      <style jsx global>{`
        :root {
          --color-primary: ${primary};
          --color-secondary: ${secondary};
          --color-accent: ${accent};
        }
      `}</style>

      <header className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/exemplos/limpeza-header.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{limpezaData.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">Limpeza profissional, ecológica e de confiança</p>
          <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-colors">
            Contacte-nos Hoje
          </button>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8">
        <CopyLinkButton />

        <section className="mb-12 prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Sobre a EcoLimpa</h2>
          {limpezaData.description.split('. ').map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-gray-700">
              {paragraph.trim() + (paragraph.endsWith('.') ? '' : '.')}
            </p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">Galeria de Trabalhos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg border border-green-200">
                <div className="relative w-full h-48">
                  <Image 
                    src={`/exemplos/limpeza-${num}.jpg`} 
                    alt={`Exemplo de limpeza ${num}`} 
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
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">Vídeo Demonstrativo</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-lg overflow-hidden border border-green-200">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Vídeo Demonstrativo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">Porquê Escolher-nos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limpezaData.features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md flex items-start space-x-4 bg-white border border-green-200">
                <span className="text-3xl">{feature.icon}</span> 
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <ServicesSection />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">O Que Dizem os Nossos Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {limpezaData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md bg-white border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                    <span className="text-lg font-bold text-green-700">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="italic text-gray-700">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        <QuoteForm />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-green-800">Áreas de Serviço</h2>
          <div className="bg-white p-4 rounded-lg shadow-md border border-green-200">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.0671023486795!2d-9.1483757!3d38.7100649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347f7c4d0875%3A0x694e8c3e7b5e0030!2sLisbon%2C%20Portugal!5e0!3m2!1sen!2sus!4v1621345678901!5m2!1sen!2sus" 
                width="600" 
                height="450" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                className="w-full h-full rounded"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-700">Servimos Lisboa, Cascais, Oeiras, Sintra e arredores</p>
              <p className="text-gray-700">Tel: +351 912 345 678 | Email: info@ecolimpa.pt</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-sm py-6 border-t bg-green-100" style={{ borderColor: `${secondary}20`, color: "#6B7280" }}>
        <p>Landing Page criada com PrimePages PT.</p>
        <p>Data de Criação: {new Date().toLocaleDateString("pt-PT", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="mt-4">
          <Link href="/exemplos" className="text-green-700 hover:text-green-900">← Voltar aos Exemplos</Link>
        </div>
      </footer>
    </div>
  );
}
