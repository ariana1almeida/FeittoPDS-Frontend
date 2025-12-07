import {useState, useEffect, useCallback} from "react";
import CreateServiceModal from "../components/service/CreateServiceModal.tsx";
import ServiceCard from "../components/service/ServiceCard.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {type CreateServiceData, ServiceService} from "../services/ServiceService.ts";
import type {ServiceEntity} from "../types/ServiceEntity.ts";
import {PlusIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

export default function ClientHomePage() {
    const serviceService = ServiceService.getInstance();
    const {authData} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const navigate = useNavigate();

    const loadServices = useCallback(async () => {
        if (!authData?.uid) return;

        try {
            setLoadingServices(true);
            const userServices = await serviceService.getServicesByClient(authData.id);
            setServices(userServices);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        } finally {
            setLoadingServices(false);
        }
    }, [authData?.uid, serviceService]);

    useEffect(() => {
        if (authData?.uid) {
            loadServices();
        }
    }, [authData?.uid, loadServices]);

    const handleNewServiceRequest = () => {
        setIsModalOpen(true);
    };

    const handleCreateService = async (serviceData: CreateServiceData) => {
        if (!authData?.uid) return;

        try {
            setLoading(true);
            const newService = await serviceService.createService({
                ...serviceData,
                firebaseUid: authData.uid,
            });

            setServices(prev => [newService, ...prev]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar serviço:", error);
            alert("Erro ao criar serviço. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewProposals = (serviceId: string) => {
        navigate(`/service/${serviceId}/proposals`);
    };

    const handleViewService = (serviceId: string) => {
        console.log("Visualizar serviço:", serviceId);
    };

    const handleDeleteService = async (serviceId: string) => {
        if (!confirm("Tem certeza que deseja excluir este serviço?")) {
            return;
        }

        try {
            await serviceService.deleteService(serviceId);
            setServices(prev => prev.filter(service => service.id !== serviceId));
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            alert("Erro ao excluir serviço. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">

            <div className="flex-1 px-4 py-6">
                <div className="w-full max-w-2xl mx-auto mt-4">
                    <button
                        onClick={handleNewServiceRequest}
                        className="w-full bg-accent-yellow text-primary-dark font-semibold px-6 py-3 rounded-lg hover:bg-accent-yellow-hover transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                    >
                        <PlusIcon size={20} className="text-primary-dark"/>
                        <span>Solicitar Novo Serviço</span>
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
                                Meus Serviços ({services.length})
                            </h3>
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onView={handleViewService}
                                    onDelete={handleDeleteService}
                                    onViewProposals={handleViewProposals}/>
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
            </div>
            <CreateServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateService}
                loading={loading}
            />
        </div>
    );
}