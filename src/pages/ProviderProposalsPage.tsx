import {useCallback, useEffect, useState} from "react";
import {ProposalService} from "../services/ProposalService.ts";
import type {ProposalEntity} from "../types/ProposalEntity.ts";
import BackButton from "../components/common/BackButton.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {ClockIcon, MoneyIcon} from "@phosphor-icons/react";
import {ServiceConclusionModal} from "../components/proposal/ServiceConclusionModal";
import {RatingService} from "../services/RatingService";
import {ServiceService} from "../services/ServiceService";

const STATUS_LABELS: Record<string, string> = {
    OPEN: 'Aberto', IN_PROGRESS: 'Em andamento', COMPLETED: 'Concluído', CANCELLED: 'Cancelado'
};
const STATUS_CLASSES: Record<string, string> = {
    OPEN: 'bg-gray-100 text-gray-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
};

export default function ProviderProposalsPage() {
    const auth = useAuth();
    const proposalService = ProposalService.getInstance();
    const ratingService = RatingService.getInstance();
    const [proposals, setProposals] = useState<ProposalEntity[]>([]);
    const [loadingProposals, setLoadingProposals] = useState(true);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<ProposalEntity | null>(null);
    const [selectedClientId, setSelectedClientId] = useState<string | undefined>(undefined);

    const loadProposals = useCallback(async () => {
        if (!auth.authData?.id) return;
        try {
            setLoadingProposals(true);
            const allProposals = await proposalService.getAllProposalsByProviderId(auth.authData.id);
            setProposals(allProposals);
        } catch (error) {
            console.error("Erro ao carregar propostas:", error);
        } finally {
            setLoadingProposals(false);
        }
    }, [proposalService, auth.authData?.id]);

    useEffect(() => {
        loadProposals();
    }, [loadProposals]);

    const handleUpdateProposal = (proposalId: string | undefined) => {
        if (!proposalId) {
            return;
        }
        // TODO: Implementar lógica de atualização
        console.log("Atualizar proposta:", proposalId);
    };

    const handleDeleteProposal = async (proposalId: string | undefined) => {
        if (!proposalId) {
            return;
        }
        await proposalService.deleteProposal(proposalId)
            .then(async () => {
                await loadProposals();
            });
    };

    const openRatingModal = (proposal: ProposalEntity) => {
        // fetch the full service to obtain client data, then open modal with provider set to client
        (async () => {
            try {
                const serviceService = ServiceService.getInstance();
                const fullService = await serviceService.getServiceById(proposal.serviceId);

                const proposalForModal: ProposalEntity = {
                    ...proposal,
                    provider: fullService.client ? {
                        firstName: fullService.client.firstName,
                        lastName: fullService.client.lastName,
                        name: `${fullService.client.firstName} ${fullService.client.lastName}`,
                        picture: undefined,
                        phone: '',
                        averageRating: fullService.client.averageRating ?? 0,
                        numberOfRatings: fullService.client.numberOfRatings ?? 0,
                        providerData: undefined
                    } : proposal.provider
                };

                setSelectedProposal(proposalForModal);
                setSelectedClientId(fullService.client?.id);
                setRatingModalOpen(true);
            } catch (err) {
                console.error('Erro ao buscar service para abrir modal de avaliação', err);
                // fallback: open with original proposal if fetch fails
                setSelectedProposal(proposal);
                setSelectedClientId(undefined);
                setRatingModalOpen(true);
            }
        })();
    };

    const closeRatingModal = () => {
        setSelectedProposal(null);
        setRatingModalOpen(false);
    };

    const handleSubmitRating = async (payload: Partial<{ rating?: number; review?: string; description?: string }>) => {
        if (!selectedProposal) return;
        const clientId = selectedClientId;
        if (!clientId) {
            console.error('Client id not available for the selected proposal');
            return;
        }

        await ratingService.createOrUpdateRating({
            ratedById: auth.authData?.id ?? '',
            ratedUserId: clientId,
            score: payload.rating ?? 0,
            comment: payload.review ?? payload.description ?? '',
            serviceId: selectedProposal.serviceId,
        });

        await loadProposals();
        closeRatingModal();
    };

    return (<div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <div className="max-w-7xl px-8 py-12 h-16 flex items-center justify-start">
                <BackButton/>
            </div>
            <div className="flex-1 w-full max-w-4xl mx-auto mt-6 px-4">
                {loadingProposals ? (<div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                        <p className="mt-2 text-neutral-medium">Carregando propostas...</p>
                    </div>) : proposals.length > 0 ? (<div className="space-y-6">
                        <h3 className="text-xl font-medium text-primary-dark mb-4">
                            Minhas propostas ({proposals.length})
                        </h3>
                        {proposals.map((proposal) => {
                            const svcStatus = proposal.service?.status;
                            const statusLabel = svcStatus ? (STATUS_LABELS[svcStatus] ?? svcStatus) : undefined;
                            const hideActions = svcStatus === 'IN_PROGRESS' || svcStatus === 'COMPLETED';

                            return (<div key={proposal.id}
                                         className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-2">
                                    <div className="flex items-start">
                                        <img src={proposal.service?.picture} alt={proposal.service?.title}
                                             className="w-60 h-60 rounded-lg object-cover"/>
                                        <div className="flex-1 m-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-primary-dark m-2">{proposal.service?.title}</h3>
                                                {statusLabel && (
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${svcStatus ? STATUS_CLASSES[svcStatus] ?? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700'}`}>
                                                        {statusLabel}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-neutral-medium mt-1 m-2">{proposal.service?.description}</p>

                                            <div className="flex flex-row flex-grow justify-between my-4">
                                                <div className="flex items-center space-x-3 p-3">
                                                    <div className="bg-yellow-100 p-2 rounded-full">
                                                        <MoneyIcon size={24} className="text-accent-yellow"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Valor</p>
                                                        <p className="font-semibold text-primary-dark">R$ {proposal.estimatedPrice.toFixed(2).replace('.', ',')}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-3">
                                                    <div className="bg-indigo-100 p-2 rounded-full">
                                                        <ClockIcon size={24} className="text-indigo-500"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Prazo</p>
                                                        <p className="font-semibold text-primary-dark">{proposal.estimatedDays} dia(s)</p>
                                                    </div>
                                                </div>

                                                <div>

                                                </div>
                                            </div>


                                            <div className="m-2">
                                                <p className="text-sm font-semibold text-neutral-dark">Descrição da
                                                    proposta:</p>
                                                <p className="text-sm text-neutral-medium mt-1">{proposal.description}</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        {!hideActions && (<>
                                                <button
                                                    onClick={() => handleUpdateProposal(proposal.id)}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-dark rounded-md hover:bg-primary-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                                    Atualizar Proposta
                                                </button>
                                                <button
                                                    onClick={async () => handleDeleteProposal(proposal.id)}
                                                    className="px-4 py-2 text-sm font-medium text-neutral-dark bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                                    Excluir Proposta
                                                </button>
                                            </>)}

                                        {svcStatus === 'COMPLETED' && (<button
                                                onClick={() => openRatingModal(proposal)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium text-primary-darl bg-accent-yellow hover:bg-accent-yellow-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200">
                                                Avaliar Cliente
                                            </button>)}
                                    </div>
                                </div>)
                        })}
                    </div>) : (<div className="text-center py-8 ">
                        <p className="text-gray-500">Você ainda não fez nenhuma proposta.</p>
                    </div>)}
            </div>

            <ServiceConclusionModal
                isOpen={ratingModalOpen}
                onClose={closeRatingModal}
                proposal={selectedProposal ?? undefined}
                subject="cliente"
                onSubmit={handleSubmitRating}
            />
        </div>);
}
