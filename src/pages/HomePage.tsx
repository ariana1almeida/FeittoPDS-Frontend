import { useAuth } from "../hooks/useAuth";
import Header from "../components/common/Header.tsx";
import Footer from "../components/common/Footer.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import ClientHomePage from "./ClientHomePage";
import ProviderHomePage from "./ProviderHomePage";
import {DevicesIcon, HandshakeIcon, StarIcon} from "@phosphor-icons/react";

export function HomePage() {
    const {authData} = useAuth();

    const handleSearch = (query: string) => {
        console.log('Pesquisando por:', query);
    };

    const navigateTo = (path: string) => {
        window.location.hash = path;
    };

    return (
        <div className="min-h-screen w-full bg-accent-yellow flex flex-col">
            <Header/>

            <div className="flex-1 px-4 py-6">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Pesquisar serviços, profissionais..."
                />

                <div className="mt-4 text-white flex flex-col items-center">
                    {!authData ? (
                        <div className="max-w-4xl w-full space-y-8">
                            <div className="bg-neutral-light rounded-lg p-8 shadow-lg text-center">
                                <h1 className="text-3xl text-primary-dark font-bold mb-4">
                                    Bem-vindo ao FEITTO
                                </h1>
                                <p className="text-lg text-primary-dark mb-6">
                                    Conectamos você aos melhores prestadores de serviços da sua região
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => navigateTo('/register')}
                                        className="bg-accent-yellow text-primary-dark font-semibold px-6 py-3 rounded-lg hover:bg-accent-yellow-hover transition-colors"
                                    >
                                        Comece agora
                                    </button>
                                    <button
                                        onClick={() => navigateTo('/login')}
                                        className="border-2 border-primary-dark text-primary-dark font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark hover:text-white transition-colors"
                                    >
                                        Já tenho conta
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-lg">
                                    <div className="text-center mb-4">
                                        <div
                                            className="w-16 h-16 bg-accent-yellow rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <HandshakeIcon size={32} className="text-primary-dark" weight="fill"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary-dark">Qualidade Garantida</h3>
                                    </div>
                                    <p className="text-gray-600 text-center">
                                        Todos os prestadores são avaliados pelos clientes
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-lg">
                                    <div className="text-center mb-4">
                                        <div
                                            className="w-16 h-16 bg-accent-yellow rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <StarIcon size={32} className="text-primary-dark" weight="fill"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary-dark">Fácil de Usar</h3>
                                    </div>
                                    <p className="text-gray-600 text-center">
                                        Encontre, agende e avalie serviços em poucos cliques
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-lg">
                                    <div className="text-center mb-4">
                                        <div
                                            className="w-16 h-16 bg-accent-yellow rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <DevicesIcon size={32} className="text-primary-dark" weight="fill"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary-dark">Na palma da mão</h3>
                                    </div>
                                    <p className="text-gray-600 text-center">
                                        Você pode acessar nossos serviços de qualquer dispositivo
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {authData.userType === "CLIENT" && <ClientHomePage/>}
                            {authData.userType === "PROVIDER" && <ProviderHomePage/>}
                            {!authData.userType && (
                                <div className="max-w-md w-full bg-neutral-light rounded-lg p-6 shadow-lg">
                                    <h1 className="text-2xl text-primary-dark font-bold mb-4">Bem-vindo!</h1>
                                    <p className="mb-6 text-primary-dark text-sm">
                                        Complete seu perfil para ter acesso completo à plataforma.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer/>
        </div>
    );
}