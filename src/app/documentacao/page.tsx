import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DocumentacaoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentação PrimePages PT</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Guia completo para criar e personalizar landing pages profissionais em português
        </p>
      </header>

      <main className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Introdução</h2>
          <p className="text-gray-700 mb-4">
            O PrimePages PT é uma aplicação SaaS que permite criar facilmente landing pages personalizadas, 
            de forma intuitiva e 100% em português de Portugal. Esta documentação vai guiá-lo através das 
            principais funcionalidades e ajudá-lo a tirar o máximo proveito da plataforma.
          </p>
          <p className="text-gray-700 mb-4">
            Seja para promover imóveis, produtos, serviços, cursos ou eventos, o PrimePages PT oferece 
            todas as ferramentas necessárias para criar landing pages profissionais sem necessidade de 
            conhecimentos técnicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Primeiros Passos</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Crie uma conta utilizando o seu e-mail ou a sua conta Google</li>
              <li>Aceda ao seu painel pessoal</li>
              <li>Clique em "Criar Nova Landing Page"</li>
              <li>Preencha os detalhes básicos (título e descrição)</li>
              <li>Personalize a sua landing page seguindo os passos do assistente</li>
            </ol>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Funcionalidades Principais</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Criação de conta e login (e-mail ou Google)</li>
              <li>Painel pessoal com lista de landing pages</li>
              <li>Criação de landing page com título e descrição</li>
              <li>Galeria de imagens com drag & drop</li>
              <li>Inserção de vídeo (YouTube/Vimeo ou ficheiro)</li>
              <li>Secção "Benefícios / Características"</li>
              <li>Call to Action com formulário de contacto</li>
              <li>Personalização visual (paleta de cores)</li>
              <li>Descrição falada com melhoria por IA</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Guia Detalhado</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Criação de Landing Page</h3>
            <p className="text-gray-700 mb-4">
              Para criar uma nova landing page, aceda ao seu painel e clique no botão "Criar Nova Landing Page". 
              Preencha o título e a descrição da sua página. Pode utilizar a funcionalidade de descrição falada 
              clicando no ícone do microfone para ditar o texto, que será automaticamente melhorado pela IA.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Dica: Prepare antecipadamente um esboço do que pretende comunicar na sua landing page para 
                tornar o processo de criação mais eficiente.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Galeria de Imagens</h3>
            <p className="text-gray-700 mb-4">
              Carregue até 10 imagens (formatos .jpg, .jpeg, .png, máximo 3MB cada) para a sua galeria. 
              Pode reorganizá-las facilmente arrastando e largando na ordem desejada. As imagens são 
              automaticamente otimizadas para carregamento rápido.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Dica: Utilize imagens de alta qualidade e relevantes para o seu conteúdo. Imagens com 
                proporção 4:3 funcionam melhor na galeria.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Vídeo</h3>
            <p className="text-gray-700 mb-4">
              Adicione um vídeo à sua landing page de duas formas: inserindo um URL do YouTube ou Vimeo, 
              ou carregando um ficheiro .mp4 (máximo 50MB). O vídeo será exibido numa secção dedicada 
              da sua landing page.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Benefícios / Características</h3>
            <p className="text-gray-700 mb-4">
              Adicione pelo menos 5 benefícios ou características do seu produto/serviço. Cada item pode 
              incluir um ícone opcional e uma frase curta. Se necessário, pode adicionar mais itens 
              clicando no botão "Adicionar mais".
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Call to Action</h3>
            <p className="text-gray-700 mb-4">
              Personalize o texto do botão de Call to Action e configure o formulário de contacto. 
              Quando os visitantes preencherem o formulário, os dados serão enviados para o e-mail 
              associado à sua conta.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Personalização Visual</h3>
            <p className="text-gray-700 mb-4">
              Escolha a paleta de cores para a sua landing page. Pode selecionar manualmente as cores 
              primária, secundária e de destaque, ou optar pela geração automática de uma paleta 
              harmoniosa. As cores serão aplicadas a todos os elementos da página.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Dica: Escolha cores que reflitam a identidade da sua marca ou que estejam alinhadas 
                com o tema do seu produto/serviço.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Descrição Falada</h3>
            <p className="text-gray-700 mb-4">
              Utilize a funcionalidade de descrição falada clicando no ícone do microfone junto ao 
              campo de descrição. Fale naturalmente e o sistema transcreverá o seu discurso. Em seguida, 
              a IA melhorará automaticamente o texto para um tom mais profissional e adequado a uma 
              landing page.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Publicação e Partilha</h3>
            <p className="text-gray-700 mb-4">
              Após concluir a criação da sua landing page, clique em "Publicar". A página ficará 
              imediatamente disponível através de um link único. Utilize o botão "Copiar Link" para 
              partilhar a sua landing page nas redes sociais, e-mail ou mensagens.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Exemplos e Inspiração</h2>
          <p className="text-gray-700 mb-4">
            Explore os nossos exemplos de landing pages para diferentes setores e inspire-se para 
            criar a sua própria página:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Link href="/exemplos/coaching" className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-40 bg-indigo-100 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Coaching</h3>
                <p className="text-sm text-gray-600">Exemplo para serviços de coaching pessoal e profissional</p>
              </div>
            </Link>
            <Link href="/exemplos/restaurante" className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-40 bg-amber-100 flex items-center justify-center">
                <span className="text-3xl">🍝</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Restaurante</h3>
                <p className="text-sm text-gray-600">Exemplo para restaurante italiano com sistema de reservas</p>
              </div>
            </Link>
            <Link href="/exemplos/limpeza" className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-40 bg-green-100 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Serviços de Limpeza</h3>
                <p className="text-sm text-gray-600">Exemplo para empresa de limpeza doméstica</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quantas landing pages posso criar?</h3>
              <p className="text-gray-700">
                Na versão atual, pode criar um número ilimitado de landing pages.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Posso editar uma landing page após a publicação?</h3>
              <p className="text-gray-700">
                Sim, pode editar qualquer aspeto da sua landing page a qualquer momento. As alterações 
                serão imediatamente refletidas na página pública.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Como funciona o formulário de contacto?</h3>
              <p className="text-gray-700">
                Quando um visitante preenche o formulário de contacto na sua landing page, os dados são 
                enviados diretamente para o e-mail associado à sua conta.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Posso utilizar o meu próprio domínio?</h3>
              <p className="text-gray-700">
                Esta funcionalidade está planeada para futuras atualizações. Atualmente, todas as landing 
                pages são acessíveis através de um subdomínio do PrimePages PT.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Como funciona a melhoria de descrição por IA?</h3>
              <p className="text-gray-700">
                A funcionalidade utiliza inteligência artificial para reformular o texto ditado ou escrito, 
                melhorando a clareza, o tom profissional e a estrutura, mantendo a mensagem original.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p className="mb-2">© 2025 PrimePages PT. Todos os direitos reservados.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/exemplos" className="text-blue-300 hover:text-blue-100">
            Ver Exemplos
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/" className="text-blue-300 hover:text-blue-100">
            Página Inicial
          </Link>
        </div>
      </footer>
    </div>
  );
}
