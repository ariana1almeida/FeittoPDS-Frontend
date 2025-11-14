import Header from "../components/common/Header.tsx";
import {useCallback, useEffect, useState} from "react";
import {ProposalService} from "../services/ProposalService.ts";
import type {ProposalEntity} from "../types/ProposalEntity.ts";
import Footer from "../components/common/Footer.tsx";
import BackButton from "../components/common/BackButton.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {ClockIcon, MoneyIcon} from "@phosphor-icons/react";

export default function ProviderProposalsPage() {
    const auth = useAuth();
    const proposalService = ProposalService.getInstance();
    const [proposals, setProposals] = useState<ProposalEntity[]>([]);
    const [loadingProposals, setLoadingProposals] = useState(true);

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


    return (
        <div className="min-h-screen w-full bg-neutral-light flex flex-col">
            <Header/>
            <div className="max-w-7xl px-8 py-12 h-16 flex items-center justify-start">
                <BackButton/>
            </div>
            <div className="flex-1 w-full max-w-4xl mx-auto mt-6 px-4">
                {loadingProposals ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark mx-auto"></div>
                        <p className="mt-2 text-gray-600">Carregando propostas...</p>
                    </div>
                ) : proposals.length > 0 ? (
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">
                            Minhas propostas ({proposals.length})
                        </h3>
                        {proposals.map((proposal) => (
                            <div key={proposal.id}
                                 className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-2">
                                <div className="flex items-start">
                                    <img src={proposal.service?.picture} alt={proposal.service?.title}
                                         className="w-60 h-60 rounded-lg object-cover"/>
                                    <div className="flex-1 m-2">
                                        <h3 className="text-lg font-bold text-gray-800 m-2">{proposal.service?.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1 m-2">{proposal.service?.description}</p>

                                        <div className="flex flex-row flex-grow justify-between my-4">
                                            <div className="flex items-center space-x-3 p-3">
                                                <div className="bg-yellow-100 p-2 rounded-full">
                                                    <MoneyIcon size={24} className="text-yellow-500"/>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Valor</p>
                                                    <p className="font-semibold text-gray-800">R$ {proposal.estimatedPrice.toFixed(2).replace('.', ',')}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3 p-3">
                                                <div className="bg-indigo-100 p-2 rounded-full">
                                                    <ClockIcon size={24} className="text-indigo-500"/>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Prazo</p>
                                                    <p className="font-semibold text-gray-800">{proposal.estimatedDays} dia(s)</p>
                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>


                                        <div className="m-2">
                                            <p className="text-sm font-semibold text-gray-700">Descrição da proposta:</p>
                                            <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => handleUpdateProposal(proposal.id)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-primary-dark rounded-md hover:bg-primary-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Atualizar Proposta
                                    </button>
                                    <button
                                        onClick={async () => handleDeleteProposal(proposal.id)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                        Excluir Proposta
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 ">
                        <p className="text-gray-500">Você ainda não fez nenhuma proposta.</p>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}
