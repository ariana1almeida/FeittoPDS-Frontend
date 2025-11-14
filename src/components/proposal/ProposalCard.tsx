import {
    StarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    CheckCircleIcon
} from "@phosphor-icons/react";
import type {ProposalEntity} from "../../types/ProposalEntity";
import {Avatar} from "../common/Avatar";

interface ProposalCardProps {
    proposal: ProposalEntity;
    onAccept: (proposalId: string | undefined) => void;
}

export default function ProposalCard({proposal, onAccept}: ProposalCardProps) {
    return (
        <div
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200">

            {/* Provider Info */}
            <div className="flex items-center gap-3">
                <Avatar
                    image={''}
                    alt={proposal?.provider?.name}
                    size="md"
                    fallbackText={proposal?.provider?.name}
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800">
                        {proposal?.provider?.name || 'Prestador'}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <StarIcon size={16} weight="fill" className="text-yellow-400"/>
                            <span className="font-bold text-gray-700">{proposal?.provider?.averageRating.toFixed(1)}</span>
                            <span>({proposal?.provider?.numberOfRatings} avaliações)</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200"/>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                        <CurrencyDollarIcon size={20} className="text-yellow-600"/>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="font-bold text-gray-800">R$ {proposal.estimatedPrice.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                        <ClockIcon size={20} className="text-indigo-600"/>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Prazo</p>
                        <p className="font-bold text-gray-800">{proposal.estimatedDays} dias</p>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-xs text-gray-500 mb-1">Descrição:</h4>
                <p className="text-sm text-gray-700 line-clamp-3">
                    {proposal.description}
                </p>
            </div>
            <hr className="border-gray-200"/>
            <div className="flex">
                <button
                    onClick={() => onAccept(proposal.id || '')}
                    className="flex-1 bg-yellow-400 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm font-bold flex items-center justify-center gap-2"
                >
                    <CheckCircleIcon size={20}/>
                    Aceitar Proposta
                </button>
            </div>
        </div>
    );
}
