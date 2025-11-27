import {useAuth} from "../hooks/useAuth";
import Header from "../components/common/Header.tsx";
import Footer from "../components/common/Footer.tsx";
import ClientHomePage from "./ClientHomePage";
import ProviderHomePage from "./ProviderHomePage";
import {DevicesIcon, HandshakeIcon, StarIcon} from "@phosphor-icons/react";
import {HowItWorks} from "../components/home/HowItWorks.tsx";

export function HomePage() {
    const {authData} = useAuth();

    const navigateTo = (path: string) => {
        window.location.hash = path;
    };

    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <Header/>

            <div className="mt-6 text-white flex flex-col items-center">
                {!authData ? (
                    <div className="max-w-4xl w-full space-y-8">
                        <div className="p-8 text-center">
                            <h1 className="text-4xl text-primary-dark font-medium mb-4">
                                Bem-vindo ao FEITTO
                            </h1>
                            <p className="text-lg text-primary-dark mb-6">
                                Conectamos você aos melhores prestadores de serviços do litoral norte gaúcho
                            </p>
                            <div className="flex py-8 justify-center gap-4">
                                <button
                                    onClick={() => navigateTo('/login')}
                                    className="text-primary-dark font-semibold px-6 py-3 rounded-4xl hover:bg-primary-dark hover:text-white transition-colors"
                                >
                                    Comece agora
                                </button>
                                <button
                                    onClick={() => navigateTo('/register')}
                                    className="bg-accent-yellow text-primary-dark font-semibold px-6 py-3 rounded-4xl hover:bg-accent-yellow-hover transition-colors"
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
                                <p className="text-neutral-medium text-center">
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
                                <p className="text-neutral-medium text-center">
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
                                <p className="text-neutral-medium text-center">
                                    Você pode acessar nossos serviços de qualquer dispositivo
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center">
                            <div>
                                <div>
                                    <HowItWorks/>
                                </div>
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
            <Footer/>
        </div>
    );
}