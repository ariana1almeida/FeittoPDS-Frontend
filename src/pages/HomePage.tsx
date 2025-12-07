import {useAuth} from "../hooks/useAuth";
import ClientHomePage from "./ClientHomePage";
import ProviderHomePage from "./ProviderHomePage";
import welcomeImage from "../assets/homeImages/CleaningImage.png";
import kitchenImage from "../assets/homeImages/KitchenImage.png";
import {ArrowRightIcon, UsersIcon} from "lucide-react";
import {LightningIcon, MapPinIcon} from "@phosphor-icons/react";

export function HomePage() {
    const {authData} = useAuth();

    const navigateTo = (path: string) => {
        window.location.hash = path;
    };

    return (<div className="min-h-screen w-full bg-neutral-light flex flex-col">
        <div className="mt-6 text-white flex flex-col items-center">
            {!authData ? (<div className="w-full ">
                <div className="max-w-6xl mx-auto justify-center items-center">
                    <div className="p-8 text-start flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col flex-1">
                            <h1 className="text-6xl text-neutral-dark font-black mb-4">
                                Resolva problemas domésticos em minutos
                            </h1>
                            <p className="text-xl font-normal text-neutral-medium mb-6">
                                Conecte-se com profissionais do litoral norte gaúcho sem complicações!
                            </p>
                            <div className="flex py-8 justify-start gap-4 max-w-sm">
                                <button
                                    onClick={() => navigateTo('/register')}
                                    className="text-white bg-primary-dark font-bold px-6 py-4 rounded-2xl hover:bg-primary-medium transition-colors flex flex-row items-center justify-center gap-2 min-w-30 flex-1"
                                >
                                    Comece agora <ArrowRightIcon size={16}/>
                                </button>
                                <button
                                    onClick={() => navigateTo('/login')}
                                    className="bg-accent-green text-neutral-dark font-bold px-6 py-4 rounded-2xl hover:bg-accent-green-hover transition-colors min-w-30 flex-1"
                                >
                                    Já tenho conta
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-white p-6 rounded-lg">
                                <img src={welcomeImage} alt="Ilustração de boas-vindas"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="servicos" className="text-center w-full flex flex-col bg-white py-12 gap-6">
                    <h2 className="text-neutral-dark mb-4 text-4xl font-black">
                        Nossos serviços
                    </h2>
                    <p className="text-neutral-medium max-w-2xl mx-auto text-lg font-normal">
                        Profissionais especializados para qualquer necessidade
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-8 px-4">
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    🎨
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Pintura</h3>
                            </div>
                        </div>
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    ⚡
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Elétrica</h3>
                            </div>
                        </div>
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    🔧
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Hidráulica</h3>
                            </div>
                        </div>
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    ✨
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Limpeza</h3>
                            </div>
                        </div>
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    🪓
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Marcenaria</h3>
                            </div>
                        </div>
                        <div className="bg-neutral-light w-42 h-42 p-4 rounded-xl border-2 border-neutral-medium/5">
                            <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                                <div
                                    className="w-16 h-16 text-4xl bg-accent-yellow rounded-full mb-3 flex items-center justify-center">
                                    🌿
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-dark">Jardinagem</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="funciona" className="w-full bg-neutral-light text-center py-12">
                    <div className="max-w-6xl mx-auto px-8">
                        <h2 className="text-neutral-dark mb-6 pt-8 text-4xl font-black">
                            Como funciona
                        </h2>
                        <p className="text-neutral-medium mx-auto mb-6 text-lg font-normal">
                            Simples, rápido e transparente
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 my-6 pb-8">
                            <div
                                className="bg-white rounded-xl p-4 sm:p-6 border-2 border-neutral-medium/10 aspect-square flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                                <div>
                                    <div
                                        className="bg-primary-dark text-white font-black text-xl h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center mb-2">
                                        01
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark text-start mb-1">Crie
                                        seu serviço</h3>
                                </div>
                                <p className="text-sm sm:text-base text-neutral-medium text-start">
                                    Descreva o que você precisa em poucos cliques
                                </p>
                            </div>

                            <div
                                className="bg-white rounded-xl p-4 sm:p-6 border-2 border-neutral-medium/10 aspect-square flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                                <div>
                                    <div
                                        className="bg-primary-dark text-white font-black text-xl h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center mb-2">
                                        02
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark text-start mb-1">Receba
                                        propostas</h3>
                                </div>
                                <p className="text-sm sm:text-base text-neutral-medium text-start">
                                    Profissionais qualificados enviam propostas
                                </p>
                            </div>

                            <div
                                className="bg-white rounded-xl p-4 sm:p-6 border-2 border-neutral-medium/10 aspect-square flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                                <div>
                                    <div
                                        className="bg-primary-dark text-white font-black text-xl h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center mb-2">
                                        03
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark text-start mb-1">Escolha
                                        o Melhor</h3>
                                </div>
                                <p className="text-sm sm:text-base text-neutral-medium text-start">
                                    Compare e selecione quem preferir
                                </p>
                            </div>

                            <div
                                className="bg-white rounded-xl p-4 sm:p-6 border-2 border-neutral-medium/10 aspect-square flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
                                <div>
                                    <div
                                        className="bg-primary-dark text-white font-black text-xl h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center mb-2">
                                        04
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark text-start mb-1">Avalie</h3>
                                </div>
                                <p className="text-sm sm:text-base text-neutral-medium text-start">
                                    Finalize e deixe seu feedback
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="motivos" className=" bg-white w-full">
                    <div className="max-w-6xl mx-auto justify-center items-center">
                        <div className="p-8 text-start flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex flex-col flex-1 gap-6 my-4">
                                <h1 className="text-4xl text-neutral-dark font-black">
                                    Por que escolher a FEITTO?
                                </h1>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-primary-dark w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPinIcon size={24} className="text-white"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-neutral-dark mb-1">Profissionais
                                            Daqui</h3>
                                        <p className="text-sm text-neutral-medium">
                                            Somos focados no litoral norte gaúcho, ajudando a reduzir a informalidade da
                                            prestação de serviços local
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-primary-dark w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <LightningIcon size={24} className="text-white"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-neutral-dark mb-1">Respostas em
                                            Minutos</h3>
                                        <p className="text-sm text-neutral-medium">
                                            Receba múltiplas propostas rapidamente e escolha a melhor
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="bg-primary-dark w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UsersIcon size={24} className="text-white"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-neutral-dark mb-1">Rede Qualificada</h3>
                                        <p className="text-sm text-neutral-medium">
                                            Todos os profissionais são avaliados, para você escolher o melhor para a sua
                                            necessidade
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-white p-6 rounded-lg">
                                    <img src={kitchenImage} alt="Ilustração de boas-vindas"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-primary-dark w-full text-center py-14">
                    <h1 className="text-4xl text-white font-black mb-4">
                        Pronto para começar?
                    </h1>
                    <p className="text-white text-lg font-extralight mb-6">
                        Cadastre-se agora e resolva seu problema em minutos
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigateTo('/register')}
                            className="text-primary-dark bg-white font-bold px-6 py-4 rounded-2xl hover:bg-neutral-light transition-colors flex flex-row items-center justify-center gap-2"
                        >
                            Criar conta grátis <ArrowRightIcon size={16}/>
                        </button>
                    </div>
                </div>
            </div>) : (<>
                {authData.userType === "CLIENT" && <ClientHomePage/>}
                {authData.userType === "PROVIDER" && <ProviderHomePage/>}
            </>)}
        </div>
    </div>);
}