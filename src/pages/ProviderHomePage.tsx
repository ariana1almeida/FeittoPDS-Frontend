import Header from '../components/common/Header.tsx';
import Footer from '../components/common/Footer.tsx';
import {useCallback, useEffect, useState} from "react";
import type {ServiceEntity} from "../types/ServiceEntity.ts";
import {ServiceService} from "../services/ServiceService.ts";
import CreateProposalModal from '../components/proposal/CreateProposalModal.tsx';
import {ListBulletsIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {ProposalService} from "../services/ProposalService.ts";
import {useAuth} from "../hooks/useAuth.ts";
import ProviderServiceCard from "../components/service/ProviderServiceCard.tsx";

interface ProposalType {
    serviceId: string;
    providerId: string;
    estimatedDays: number;
    estimatedPrice: number;
    description: string;
    accepted?: boolean;
}

export default function ProviderHomePage() {
    const auth = useAuth();
    const serviceService = ServiceService.getInstance();
    const proposalService = ProposalService.getInstance();
    const navigate = useNavigate();
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceEntity | null>(null);
    const [submittingProposal, setSubmittingProposal] = useState(false);

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

    const handleOpenProposal = (service: ServiceEntity) => {
        setSelectedService(service);
        setIsProposalModalOpen(true);
    };

    const handleCloseProposal = () => {
        setIsProposalModalOpen(false);
        setSelectedService(null);
    };

    const handleSubmitProposal = async (proposalData: ProposalType) => {
        try {
            setSubmittingProposal(true);
            await proposalService.createProposal(proposalData);
            handleCloseProposal();
        } catch (error) {
            console.error('Erro ao enviar proposta:', error);
        } finally {
            setSubmittingProposal(false);
        }
    };

    const handleViewProposals = () => {
        navigate('/provider/proposals');
    };

    useEffect(() => {
        if (services.length === 0) {
            loadServices();
        }
    }, [loadServices, serviceService, services]);

    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <Header/>
            <div className="flex-1 px-4 py-6">

                <div className="w-full max-w-2xl mx-auto mt-4">
                    <button
                        onClick={handleViewProposals}
                        className="w-full bg-accent-yellow text-primary-dark font-semibold px-6 py-3 rounded-lg hover:bg-accent-yellow-hover transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                    >
                        <ListBulletsIcon size={20} className="text-primary-dark"/>
                        <span>Ver Minhas Propostas</span>
                    </button>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-6">
                    {loadingServices ? (
                        <div className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                            <p className="mt-2 text-neutral-medium">Carregando serviços...</p>
                        </div>
                    ) : services.length > 0 ? (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary-dark mb-4">
                                Serviços Disponíveis ({services.length})
                            </h3>
                            {services.map((service) => (
                                <ProviderServiceCard
                                    key={service.id}
                                    service={service}
                                    onSendProposal={(serviceId) => {
                                        const service = services.find(s => s.id === serviceId);
                                        if (service) {
                                            handleOpenProposal(service);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500">
                                Nenhum serviço disponível no momento.
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Novos serviços aparecerão aqui quando forem criados.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <CreateProposalModal
                isOpen={isProposalModalOpen}
                onSubmit={handleSubmitProposal}
                onClose={handleCloseProposal}
                serviceId={selectedService?.id || ''}
                providerId={auth.authData?.id || ''}
                serviceTitle={selectedService?.title}
                loading={submittingProposal}
            />

            <Footer/>
        </div>
    );
}