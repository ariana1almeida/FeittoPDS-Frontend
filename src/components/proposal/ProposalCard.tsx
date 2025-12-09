import {
    CheckCircleIcon,
    ClockIcon,
    MedalIcon,
    StarIcon,
    WhatsappLogoIcon,
    XCircleIcon
} from "@phosphor-icons/react";
import type {ProposalEntity} from "../../types/ProposalEntity";
import {Avatar} from "../common/Avatar";
import type {ServiceEntity} from "../../types/ServiceEntity.ts";
import {RatingService} from "../../services/RatingService.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import type {RatingResponse} from "../../types/RatingResponse.ts";
import {useEffect, useState} from "react";
import {ThumbsUpIcon} from "lucide-react";

interface ProposalCardProps {
    proposal: ProposalEntity;
    service: ServiceEntity;
    onAccept: (proposal: ProposalEntity) => void;
    onCancel: (proposal: ProposalEntity) => void;
    onClickChat: (proposal: ProposalEntity) => void;
    onServiceConclusion: (proposal: ProposalEntity) => void;
}

export default function ProposalCard({
                                         proposal, service, onAccept, onCancel, onClickChat, onServiceConclusion
                                     }: ProposalCardProps) {
    const auth = useAuth();
    const ratingService = RatingService.getInstance();
    const [serviceRating, setServiceRating] = useState<RatingResponse | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadServiceRating = async () => {
            if (service?.status !== 'COMPLETED') return;

            const clientId = service?.client?.id;
            const providerId = proposal?.providerId;
            if (!clientId || !providerId) return;

            try {
                const rating = await (auth.authData?.userType === 'CLIENT' ? ratingService.getRatingByPairedIds(clientId, providerId) : ratingService.getRatingByPairedIds(providerId, clientId));

                if (mounted) setServiceRating(rating ?? null);
            } catch (error) {
                console.error("Erro ao carregar avaliação do serviço:", error);
            }
        };

        loadServiceRating();

        return () => {
            mounted = false;
        };
    }, [service?.status, service?.client?.id, proposal?.providerId, auth.authData?.userType, ratingService]);

    const ratingScore = serviceRating ? (typeof serviceRating.score === 'number' ? serviceRating.score : Number(serviceRating.score) || 0) : 0;
    const starsCount = Math.min(5, Math.max(0, Math.round(ratingScore)));


    return (<div
        className="bg-white rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-2 sm:gap-3 flex-1">
                <Avatar
                    image={proposal?.provider?.picture || ''}
                    alt={proposal?.provider?.firstName}
                    size="md"
                    fallbackText={proposal?.provider?.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                />

                <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
                    <div className="flex flex-col">
                        <p className="text-neutral-dark text-base sm:text-lg font-black mb-1 sm:mb-2">
                            {`${proposal?.provider?.firstName || ''} ${proposal?.provider?.lastName || 'Prestador'}`}
                        </p>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-medium">
                            <div className="flex items-center gap-1">
                                <StarIcon size={14} weight="fill" className="text-yellow-400 sm:w-4 sm:h-4"/>
                                <span
                                    className="font-bold text-gray-700">{proposal?.provider?.averageRating.toFixed(1)}</span>
                                <span className="text-xs sm:text-sm">({proposal?.provider?.numberOfRatings} avaliações)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 sm:gap-3">
                        {proposal.accepted && <div
                            className="bg-green-200 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <CheckCircleIcon size={14} className="sm:w-4 sm:h-4"/>
                                <h1 className="text-xs sm:text-sm">
                                    Aceita
                                </h1>
                            </div>
                        </div>}
                        <div className="flex items-center gap-3">
                            <div className="flex justify-end flex-col">
                                <p className="font-black text-xl sm:text-2xl text-neutral-dark">R$ {proposal.estimatedPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <p className="text-xs sm:text-sm text-neutral-medium line-clamp-3">
                {proposal.description}
            </p>
        </div>
        <div className="flex items-center gap-1">
            <div className="rounded-lg">
                <ClockIcon size={12}/>
            </div>
            <div>
                <p className="font-semibold text-xs sm:text-sm text-neutral-medium">Tempo
                    estimado: {proposal.estimatedDays} dia(s)</p>
            </div>
        </div>
        {(service.status !== 'COMPLETED') ? (proposal.accepted ? (<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
            <button
                className="flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 sm:py-3 w-full bg-primary-dark text-white hover:bg-primary-medium transition-colors duration-200 text-xs sm:text-sm"
                onClick={() => onServiceConclusion(proposal)}>
                <MedalIcon size={16} className="flex-shrink-0"/>
                <span className="whitespace-nowrap">Confirmar serviço e avaliar</span>
            </button>
            <button
                className="flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 sm:py-3 w-full sm:w-auto border-green-400 bg-green-20 text-green-600 hover:bg-white hover:text-green-800 transition-colors duration-200 text-xs sm:text-sm"
                onClick={() => onClickChat(proposal)}>
                <WhatsappLogoIcon size={16} className="flex-shrink-0"/>
                <span className="whitespace-nowrap">Conversar no whatsapp</span>
            </button>

            <button
                className="flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 sm:py-3 w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                onClick={() => onCancel(proposal)}>
                <XCircleIcon size={16} className="flex-shrink-0"/>
                <span>Cancelar</span>
            </button>
        </div>) : (<button
            onClick={() => onAccept(proposal)}
            className="w-full bg-primary-dark text-white py-2.5 px-4 rounded-2xl hover:bg-primary-medium transition-colors duration-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
        >
            <ThumbsUpIcon size={16}/>
            Aceitar Proposta
        </button>)) : (<div>
            {serviceRating ? (<div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-2 bg-blue-100 rounded-lg p-3">
                    <h1 className="text-base sm:text-xl">Sua avaliação:</h1>

                    <div className="flex items-center gap-2">
                        {Array.from({length: starsCount}).map((_, i) => (
                            <StarIcon key={i} size={14} weight="fill" className="text-yellow-400 sm:w-4 sm:h-4"/>))}
                        <span className="ml-2 font-bold text-gray-800 text-sm sm:text-base">{ratingScore.toFixed(1)}</span>
                    </div>

                    {serviceRating.comment ? (<blockquote
                        className="text-xs sm:text-sm text-gray-700 italic mt-2">"{serviceRating.comment}"</blockquote>) : (
                        <span className="text-xs sm:text-sm text-gray-500 mt-2">— Sem comentário</span>)}
                </div>
                <hr className="border-gray-200"/>
                <p className="text-center text-xs sm:text-sm text-gray-600">Serviço concluído e avaliado ✓</p>
            </div>) : (<p className="text-xs sm:text-sm text-gray-500">Nenhuma avaliação encontrada.</p>)}
        </div>)}
    </div>);
}
