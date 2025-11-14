import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";
import ProposalCard from "../components/proposal/ProposalCard";
import type {ProposalEntity} from "../types/ProposalEntity";
import type {ServiceEntity} from "../types/ServiceEntity";
import {ProposalService} from "../services/ProposalService.ts";

export default function ServiceProposalsPage() {
    const {serviceId} = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [service] = useState<ServiceEntity | null>(null);
    const [proposals, setProposal] = useState<ProposalEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const proposalService = ProposalService.getInstance();

    useEffect(() => {
        loadServiceAndProposals();
    }, [serviceId]);

    const loadServiceAndProposals = async () => {
        try {
            setLoading(true);
            const proposalEntities = await proposalService.getAllProposalsByServiceId(serviceId);
            setProposal(proposalEntities);
        } catch (error) {
            console.error("Erro ao carregar propostas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptProposal = async (proposalId: string | undefined) => {
        if (!confirm("Deseja aceitar esta proposta?") || !proposalId) {
            return;
        }

        try {

            await proposalService.updateProposal(proposalId, {accepted: true});
            alert("Proposta aceita com sucesso!");
            navigate("/client/home");
        } catch (error) {
            console.error("Erro ao aceitar proposta:", error);
            alert("Erro ao aceitar proposta. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <Header/>

            <div className="flex-1 px-4 py-6">
                <div className="w-full max-w-2xl mx-auto">
                    <BackButton/>

                    <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
                        <h1 className="text-xl font-normal text-primary-dark mb-2">
                            Propostas Recebidas
                        </h1>
                        <p className="text-gray-600 mb-1">{service?.title}</p>
                        <p className="inline-block text-sm text-primary-dark bg-primary-dark/10 rounded-lg font-semibold px-1 py-0.5">
                            {proposals.length} proposta(s)
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                            <p className="mt-2 text-gray-600">Carregando propostas...</p>
                        </div>
                    ) : proposals.length > 0 ? (
                        <div className="space-y-4 mt-6">
                            {proposals.map((proposal) => (
                                <ProposalCard
                                    key={proposal.id}
                                    proposal={proposal}
                                    onAccept={handleAcceptProposal}
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

            <Footer/>
        </div>
    );
}