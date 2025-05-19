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
        style={{ backgroundColor: "#D97706", color: "white" }}
      >
        Copiar Link da Página
      </button>
    </div>
  );
}

// Componente para o formulário de reserva
function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    if (!name.trim() || !email.trim() || !phone.trim() || !date || !time) {
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
      toast.success("A sua reserva foi recebida com sucesso! Enviaremos uma confirmação por e-mail em breve.");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("2");
      setMessage("");
    } catch (error) {
      toast.error("Ocorreu um erro ao processar a sua reserva. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-12 bg-amber-50 p-6 md:p-8 rounded-lg border border-amber-200">
      <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-6 text-center">Faça a Sua Reserva</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-amber-800">Nome Completo <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
            placeholder="O seu nome" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-800">E-mail <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
              placeholder="email@exemplo.com" 
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-amber-800">Telefone <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
              placeholder="O seu contacto telefónico" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-amber-800">Data <span className="text-red-500">*</span></label>
            <input 
              type="date" 
              name="date" 
              id="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-amber-800">Hora <span className="text-red-500">*</span></label>
            <input 
              type="time" 
              name="time" 
              id="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-amber-800">Nº de Pessoas <span className="text-red-500">*</span></label>
            <select 
              name="guests" 
              id="guests" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'pessoa' : 'pessoas'}</option>
              ))}
              <option value="9+">Mais de 8 pessoas</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-amber-800">Pedidos Especiais</label>
          <textarea 
            name="message" 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={3} 
            className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" 
            placeholder="Alergias, preferências, ocasiões especiais..."
          ></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "A Processar..." : "Reservar Mesa"}
          </button>
        </div>
      </form>
    </section>
  );
}

// Componente para o menu
function MenuSection() {
  const menuCategories = [
    {
      name: "Entradas",
      items: [
        { name: "Bruschetta Clássica", description: "Tomate, manjericão, alho e azeite extra virgem", price: "6,50€" },
        { name: "Carpaccio di Manzo", description: "Finas fatias de carne crua com rúcula, parmesão e alcaparras", price: "9,90€" },
        { name: "Burrata Fresca", description: "Com tomate cherry, rúcula e redução de balsâmico", price: "10,50€" }
      ]
    },
    {
      name: "Massas",
      items: [
        { name: "Spaghetti alla Carbonara", description: "Receita tradicional romana com guanciale, ovo, pecorino e pimenta preta", price: "13,90€" },
        { name: "Tagliatelle al Ragù", description: "Molho de carne lentamente cozinhado à moda de Bolonha", price: "14,50€" },
        { name: "Ravioli di Ricotta e Spinaci", description: "Recheados com ricotta e espinafres, servidos com manteiga e sálvia", price: "15,90€" }
      ]
    },
    {
      name: "Pizzas",
      items: [
        { name: "Margherita", description: "Molho de tomate, mozzarella fior di latte e manjericão fresco", price: "10,90€" },
        { name: "Diavola", description: "Molho de tomate, mozzarella e salame picante", price: "12,90€" },
        { name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, parmesão e fontina", price: "13,90€" }
      ]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">O Nosso Menu</h2>
      
      <div className="space-y-8">
        {menuCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-xl font-semibold mb-4 text-amber-800 border-b border-amber-200 pb-2">{category.name}</h3>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-amber-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <span className="font-semibold text-amber-700">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function RestauranteExample() {
  // Simulação de dados de uma landing page
  const restauranteData = {
    title: "Trattoria Bella Italia",
    description: "Autêntica cozinha italiana no coração de Lisboa. A Trattoria Bella Italia oferece uma experiência gastronómica única, com receitas tradicionais preparadas com ingredientes frescos e de alta qualidade. O nosso chef, com mais de 20 anos de experiência em restaurantes de Nápoles e Roma, traz para Portugal os verdadeiros sabores da Itália.",
    features: [
      { icon: "🍕", text: "Pizzas em forno a lenha" },
      { icon: "🍝", text: "Massas frescas feitas diariamente" },
      { icon: "🍷", text: "Carta de vinhos italianos selecionados" },
      { icon: "🌿", text: "Ingredientes frescos e sazonais" },
      { icon: "👨‍🍳", text: "Chef italiano com 20 anos de experiência" },
      { icon: "🏆", text: "Premiado como melhor restaurante italiano da cidade" }
    ],
    horarios: [
      { dia: "Segunda-feira", horas: "Fechado" },
      { dia: "Terça a Quinta", horas: "12h00 - 15h00, 19h00 - 23h00" },
      { dia: "Sexta e Sábado", horas: "12h00 - 15h00, 19h00 - 00h00" },
      { dia: "Domingo", horas: "12h00 - 15h00, 19h00 - 22h00" }
    ],
    colorPalette: {
      primary: "#D97706",   // Amber-600
      secondary: "#92400E", // Amber-800
      accent: "#DC2626"     // Red-600
    }
  };

  // Aplicar cores da paleta
  const { primary, secondary, accent } = restauranteData.colorPalette;

  return (
    <div className="min-h-screen bg-amber-50">
      <style jsx global>{`
        :root {
          --color-primary: ${primary};
          --color-secondary: ${secondary};
          --color-accent: ${accent};
        }
      `}</style>

      <header className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/exemplos/restaurante-header.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{restauranteData.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">Autêntica cozinha italiana no coração de Lisboa</p>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8">
        <CopyLinkButton />

        <section className="mb-12 prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-amber-900">Sobre o Nosso Restaurante</h2>
          {restauranteData.description.split('. ').map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-gray-700">
              {paragraph.trim() + (paragraph.endsWith('.') ? '' : '.')}
            </p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">Galeria de Pratos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg border border-amber-200">
                <div className="relative w-full h-48">
                  <Image 
                    src={`/exemplos/restaurante-${num}.jpg`} 
                    alt={`Prato italiano ${num}`} 
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
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">Vídeo do Nosso Chef</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-lg overflow-hidden border border-amber-200">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Vídeo do Chef" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">Especialidades da Casa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restauranteData.features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md flex items-start space-x-4 bg-white border border-amber-200">
                <span className="text-3xl">{feature.icon}</span> 
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <MenuSection />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">Horário de Funcionamento</h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-amber-200">
            <table className="w-full">
              <tbody>
                {restauranteData.horarios.map((horario, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : ''}>
                    <td className="py-2 px-4 font-medium text-amber-900">{horario.dia}</td>
                    <td className="py-2 px-4 text-gray-700">{horario.horas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ReservationForm />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-amber-900">Localização</h2>
          <div className="bg-white p-4 rounded-lg shadow-md border border-amber-200">
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
              <p className="text-gray-700">Rua da Gastronomia, 123, Lisboa</p>
              <p className="text-gray-700">Tel: +351 912 345 678</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-sm py-6 border-t bg-amber-100" style={{ borderColor: `${secondary}20`, color: "#6B7280" }}>
        <p>Landing Page criada com PrimePages PT.</p>
        <p>Data de Criação: {new Date().toLocaleDateString("pt-PT", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="mt-4">
          <Link href="/exemplos" className="text-amber-700 hover:text-amber-900">← Voltar aos Exemplos</Link>
        </div>
      </footer>
    </div>
  );
}
