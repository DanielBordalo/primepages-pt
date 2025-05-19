import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Componente para o cabeçalho da página de exemplos
const Header = () => (
  <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Exemplos de Landing Pages</h1>
    <p className="text-xl max-w-3xl mx-auto">
      Explore estes exemplos para ver como o PrimePages PT pode ajudar a criar landing pages profissionais para diferentes setores.
    </p>
  </header>
);

// Componente para o cartão de exemplo
const ExampleCard = ({ title, description, image, sector, link }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative h-48 w-full">
      <Image 
        src={image} 
        alt={title} 
        fill 
        style={{objectFit: 'cover'}}
        className="transition-transform duration-500 hover:scale-105"
      />
    </div>
    <div className="p-6">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
        {sector}
      </span>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        href={link} 
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Ver Exemplo
      </Link>
    </div>
  </div>
);

// Componente para a seção de recursos
const FeaturesSection = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Recursos Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Galeria de Imagens</h3>
          <p className="text-gray-600">Carregue até 10 imagens e organize-as facilmente com a funcionalidade de arrastar e largar.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Descrição Falada</h3>
          <p className="text-gray-600">Dite a descrição e deixe a IA melhorar automaticamente o texto para um tom profissional.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Personalização Visual</h3>
          <p className="text-gray-600">Escolha manualmente as cores ou deixe o sistema gerar automaticamente uma paleta harmoniosa.</p>
        </div>
      </div>
    </div>
  </section>
);

// Componente para a seção de CTA
const CTASection = () => (
  <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Comece a Criar a Sua Landing Page</h2>
      <p className="text-xl mb-8">Registe-se gratuitamente e crie a sua primeira landing page em minutos.</p>
      <Link 
        href="/auth/login" 
        className="inline-block px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
      >
        Começar Agora
      </Link>
    </div>
  </section>
);

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExampleCard 
            title="Coaching de Vida" 
            description="Landing page para serviços de coaching pessoal e profissional, com design minimalista e foco em resultados."
            image="/exemplos/coaching.jpg"
            sector="Coaching"
            link="/exemplos/coaching"
          />
          
          <ExampleCard 
            title="Restaurante Italiano" 
            description="Apresentação elegante de um restaurante italiano, com galeria de pratos e sistema de reservas integrado."
            image="/exemplos/restaurante.jpg"
            sector="Restauração"
            link="/exemplos/restaurante"
          />
          
          <ExampleCard 
            title="Serviços de Limpeza" 
            description="Landing page para empresa de limpeza doméstica, com lista de serviços e formulário de orçamento."
            image="/exemplos/limpeza.jpg"
            sector="Serviços Locais"
            link="/exemplos/limpeza"
          />
        </div>
      </main>
      
      <FeaturesSection />
      <CTASection />
      
      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p>© 2025 PrimePages PT. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
