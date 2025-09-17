import Header from "../components/Header.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Footer from "../components/Footer.tsx";

export default function ClientHomePage() {

  const handleSearch = (query: string) => {
    console.log('Pesquisando por:', query);
  };

  const handleNewServiceRequest = () => {
    console.log('Solicitar novo serviço');
  };

  return (
      <div className="min-h-screen w-full bg-accent-yellow flex flex-col">
        <Header/>

        <div className="flex-1 px-4 py-6">
          <SearchBar
              onSearch={handleSearch}
              placeholder="Pesquisar serviços, profissionais..."
          />

          <div className="w-full max-w-2xl mx-auto mt-4">
            <button
              onClick={handleNewServiceRequest}
              className="w-full bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark/90 transition-colors duration-200 shadow-md"
            >
              Solicitar Novo Serviço
            </button>
          </div>
        </div>
        
        <Footer/>
      </div>
  );
}