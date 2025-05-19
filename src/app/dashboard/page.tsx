import Link from "next/link";

export default function DashboardPage() {
  // TODO: Fetch and display user's landing pages
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel de Controlo</h1>
        <Link href="/dashboard/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Criar Nova Landing Page
          </button>
        </Link>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">As Minhas Landing Pages</h2>
        {/* Placeholder for listing landing pages */}
        <p className="text-gray-600">Ainda não criou nenhuma landing page. <Link href="/dashboard/create" className="text-blue-500 hover:underline">Crie a sua primeira agora!</Link></p>
        {/* Example of a listed page (to be replaced with dynamic data) */}
        {/* <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold">Título da Landing Page Exemplo</h3>
          <p className="text-gray-500 text-sm">Criada em: DD/MM/AAAA</p>
          <div className="mt-4 flex space-x-2">
            <Link href="#" className="text-blue-500 hover:underline">Ver</Link>
            <Link href="#" className="text-green-500 hover:underline">Editar</Link>
            <button className="text-red-500 hover:underline">Apagar</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

