import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';
import SearchBar from "../components/common/SearchBar.tsx";
import {useCallback, useEffect, useState} from "react";
import type {ServiceEntity} from "../types/ServiceEntity.ts";
import {ServiceService} from "../services/ServiceService.ts";
import ServiceCard from "../components/service/ServiceCard.tsx";

export default function ProviderHomePage() {
    const serviceService = ServiceService.getInstance();
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const handleSearch = (query: string) => {
        console.log('Pesquisando por:', query);
    };
    const loadServices = useCallback(async () => {

        try {
            setLoadingServices(true);
            const allServices = await serviceService.getAllServices();
            setServices(allServices);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        } finally {
            setLoadingServices(false);
        }
    }, [serviceService]);

    useEffect(() => {
        if (services.length === 0) {
            loadServices();
        }
    }, [loadServices, serviceService, services]);
    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <Header/>
            <div className="flex-1 px-4 py-6">
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Pesquisar serviços, categorias..."
                />
            </div>
            <div className="w-full max-w-2xl mx-auto mt-6">
                {loadingServices ? (
                    <div className="text-center py-8">
                        <div
                            className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                        <p className="mt-2 text-gray-600">Carregando serviços...</p>
                    </div>
                ) : services.length > 0 ? (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Meus Serviços ({services.length})
                        </h3>
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service} onView={function (): void {
                                throw new Error("Function not implemented.");
                            }} onDelete={function (): void {
                                throw new Error("Function not implemented.");
                            }} onViewProposals={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            Você ainda não criou nenhum serviço.
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Clique no botão acima para criar seu primeiro serviço.
                        </p>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};
