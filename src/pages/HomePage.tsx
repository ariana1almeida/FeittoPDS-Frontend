import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const { user, logout } = useAuth();

  const handleSearch = (query: string) => {
    console.log('Pesquisando por:', query);
    // Implementar lógica de pesquisa aqui
  };

  return (
    <div className="min-h-screen w-full bg-accent-yellow flex flex-col">
      <Header />

      {/* Barra de Pesquisa */}
      <div className="px-4 py-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Pesquisar serviços, profissionais..."
        />
      </div>

      <div className="flex-1 px-4 py-4 text-white flex flex-col items-center">
        <div className="max-w-md w-full bg-neutral-light rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl text-primary-dark font-bold mb-4">Home</h1>
          <p className="mb-6 text-primary-dark text-sm">
            Usuário logado: <span className="font-mono">{user?.uid}</span>
          </p>
          <button
            onClick={logout}
            className="bg-accent-yellow text-primary-dark font-semibold px-5 py-2 rounded-lg hover:bg-accent-yellow-hover text-sm"
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}