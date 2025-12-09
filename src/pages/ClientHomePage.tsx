import {useCallback, useEffect, useState} from "react";
import CreateServiceModal from "../components/service/CreateServiceModal.tsx";
import ServiceCard from "../components/service/ServiceCard.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {type CreateServiceData, ServiceService} from "../services/ServiceService.ts";
import type {ServiceEntity} from "../types/ServiceEntity.ts";
import {PlusIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import {UserService} from "../services/UserService.ts";

export default function ClientHomePage() {
    const serviceService = ServiceService.getInstance();
    const {authData} = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<ServiceEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const userService = UserService.getInstance();
    const [activeFilter, setActiveFilter] = useState<'todos' | 'abertos' | 'em_andamento' | 'concluidos'>('todos');
    const navigate = useNavigate();

    const getProfileData = async () => {
        if (authData?.token) {
            try{
                setUserData(await userService.getUserProfileInformation(authData.id))
            }catch (e: any) {
                console.error('Error fetching user data:', e);
            }
        }
    };
    useEffect(() => {
        getProfileData();
    }, [authData?.token]);

    const firstName = userData?.firstName?.split(' ')[0] || authData?.userType;

    const filteredServices = services.filter(service => {
        if (activeFilter === 'todos') return true;
        if (activeFilter === 'abertos') return service.status === 'OPEN';
        if (activeFilter === 'em_andamento') return service.status === 'IN_PROGRESS';
        if (activeFilter === 'concluidos') return service.status === 'COMPLETED';
        return true;
    });

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
                ...serviceData, firebaseUid: authData.uid,
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

    return (<div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <div className="flex-1 px-4 py-6">
                <div className="max-w-6xl mx-auto justify-center items-center">
                    <div className="py-8 text-start flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col flex-1">
                            <h1 className="text-5xl font-black">Olá, {firstName} </h1>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-6 sm:items-center">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => setActiveFilter('todos')}
                                className={`px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeFilter === 'todos' ? 'bg-primary-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/70'}`}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setActiveFilter('abertos')}
                                className={`px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeFilter === 'abertos' ? 'bg-primary-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/70'}`}
                            >
                                Abertos
                            </button>
                            <button
                                onClick={() => setActiveFilter('em_andamento')}
                                className={`px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeFilter === 'em_andamento' ? 'bg-primary-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/70'}`}
                            >
                                Em Andamento
                            </button>
                            <button
                                onClick={() => setActiveFilter('concluidos')}
                                className={`px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${activeFilter === 'concluidos' ? 'bg-primary-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/60'}`}
                            >
                                Concluídos
                            </button>
                        </div>
                        <div className="flex sm:flex-1 sm:justify-end">
                            <button
                                onClick={handleNewServiceRequest}
                                className="w-full sm:w-fit bg-primary-dark text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-primary-medium transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                            >
                                <PlusIcon size={16} className="text-white"/>
                                <span className="hidden sm:inline">Solicitar Novo Serviço</span>
                                <span className="sm:hidden">Novo Serviço</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-6">
                        {loadingServices ? (<div className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                            <p className="mt-2 text-neutral-medium">Carregando serviços...</p>
                        </div>) : services.length > 0 ? (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-neutral-medium mb-4 pt-4">
                                    {filteredServices.length} {filteredServices.length === 1 ? 'serviço ativo' : 'serviços ativos'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                                    {filteredServices.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            onView={handleViewService}
                                            onDelete={handleDeleteService}
                                            onViewProposals={handleViewProposals}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (<div className="text-center py-8 bg-white rounded-lg">
                            <p className="text-gray-500">
                                Você ainda não criou nenhum serviço.
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Clique no botão acima para criar seu primeiro serviço.
                            </p>
                        </div>)}
                    </div>
                    <CreateServiceModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateService}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}