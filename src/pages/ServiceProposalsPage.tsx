import {useState, useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import BackButton from "../components/common/BackButton";
import ProposalCard from "../components/proposal/ProposalCard";
import {AcceptedProposalModal} from "../components/proposal/AcceptedProposalModal";
import ConfirmAcceptProposal from "../components/proposal/ConfirmAcceptProposal";
import type {ProposalEntity} from "../types/ProposalEntity";
import type {ServiceEntity} from "../types/ServiceEntity";
import {ProposalService} from "../services/ProposalService.ts";
import {ServiceService} from "../services/ServiceService.ts";
import {ServiceConclusionModal} from "../components/proposal/ServiceConclusionModal.tsx";
import { RatingService } from "../services/RatingService";

export default function ServiceProposalsPage() {
    const {serviceId} = useParams<{ serviceId: string }>();
    const [service, setService] = useState<ServiceEntity | null>(null);
    const [proposals, setProposal] = useState<ProposalEntity[]>([]);
    const [selectedProposal, setSelectedProposal] = useState<ProposalEntity | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isConclusionModalOpen, setIsConclusionModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const proposalService = ProposalService.getInstance();
    const serviceService = ServiceService.getInstance();
    const ratingService = RatingService.getInstance();

    const loadServiceAndProposals = useCallback(async () => {
        try {
            setLoading(true);
            const proposalEntities = await proposalService.getAllProposalsByServiceId(serviceId);
            const service = await serviceService.getServiceById(serviceId);
            setProposal(proposalEntities);
            setService(service);
        } catch (error) {
            console.error("Erro ao carregar propostas:", error);
        } finally {
            setLoading(false);
        }
    }, [proposalService, serviceService, serviceId]);

    useEffect(() => {
        loadServiceAndProposals();
    }, [loadServiceAndProposals]);

    // When the user clicks 'Aceitar Proposta' in a card, open the contact/confirm modal
    const handleAcceptProposal = (proposal: ProposalEntity | undefined) => {
        if (!proposal) return;
        setIsConfirmOpen(true)
        setSelectedProposal(proposal);
    };

    const openChatModal = (proposal: ProposalEntity | undefined) => {
        if (!proposal) return;
        setSelectedProposal(proposal);
        setIsModalOpen(true);
    }

    const openServiceConclusionModal = (proposal: ProposalEntity | undefined) => {
        if (!proposal) return;
        setSelectedProposal(proposal);
        setIsConclusionModalOpen(true)
    }

    const toggleProposalAccept = async (proposal: ProposalEntity | undefined) => {
        if (!proposal || !proposal?.id) return;
        await proposalService.updateProposal(proposal?.id, {accepted: false});
        await loadServiceAndProposals();
    }

    const handleConfirm = async () => {
        const id = selectedProposal?.id;
        if (!id) return;

        try {
            await proposalService.updateProposal(id, {accepted: true});
            await serviceService.updateServiceStatus(selectedProposal?.serviceId, 'IN_PROGRESS');
            setIsConfirmOpen(false);
            await loadServiceAndProposals();
        } catch (error) {
            console.error("Erro ao aceitar proposta:", error);
            alert("Erro ao aceitar proposta. Tente novamente.");
        }
    };

    const handleSubmitConclusion = async (payload: Partial<{ rating?: number; review?: string; description?: string; }>) => {
        if (!selectedProposal?.id) return;
        try {
            const ratedById = service?.client?.id;
            if (!ratedById) {
                alert('Não foi possível determinar o cliente responsável pela solicitação.');
                return;
            }

            const ratedUserId = selectedProposal.providerId;
            const score = payload.rating ?? 0;
            const comment = payload.review ?? payload.description ?? '';
            const serviceId = selectedProposal.serviceId;

            await ratingService.createOrUpdateRating({
                ratedById,
                ratedUserId,
                score,
                comment,
                serviceId
            });

            await serviceService.updateServiceStatus(selectedProposal.serviceId, 'COMPLETED');
            await proposalService.deleteAllProposalsFromServiceOtherThanAccepted(selectedProposal.serviceId);

            setIsConclusionModalOpen(false);
            await loadServiceAndProposals();
        } catch (err) {
            console.error('Erro ao enviar feedback da proposta', err);
            alert('Erro ao enviar avaliação. Tente novamente.');
        }
    }

    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <div className="flex-1 px-4 py-6">
                <div className="w-full max-w-2xl mx-auto">
                    <BackButton/>

                    <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                        <h1 className="text-xl font-normal text-primary-dark mb-2">
                            Propostas Recebidas
                        </h1>
                        <p className="text-neutral-medium mb-1">{service?.title}</p>
                        <p className="inline-block text-sm text-primary-dark bg-primary-dark/10 rounded-lg font-semibold px-1 py-0.5">
                            {proposals.length} proposta(s)
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                            <p className="mt-2 text-neutral-medium">Carregando propostas...</p>
                        </div>
                    ) : proposals.length > 0 ? (
                        <div className="space-y-4 mt-6">
                            {proposals.map((proposal) => (
                                <ProposalCard
                                    key={proposal.id}
                                    proposal={proposal}
                                    service={service!}
                                    onCancel={toggleProposalAccept}
                                    onAccept={handleAcceptProposal}
                                    onClickChat={openChatModal}
                                    onServiceConclusion={openServiceConclusionModal}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 mt-6">
                            <p className="text-gray-500">
                                Nenhuma proposta recebida ainda.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmAcceptProposal
                isOpen={isConfirmOpen}
                onConfirm={handleConfirm}
                onCancel={() => setIsConfirmOpen(false)}
            />

            <AcceptedProposalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                proposal={selectedProposal ?? undefined}
            />

            <ServiceConclusionModal
                isOpen={isConclusionModalOpen}
                onClose={()=> setIsConclusionModalOpen(false)}
                proposal={selectedProposal ?? undefined}
                subject="prestador"
                onSubmit={handleSubmitConclusion}
            />
        </div>
    );
}
