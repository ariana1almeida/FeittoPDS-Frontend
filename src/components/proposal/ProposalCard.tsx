import {
    StarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    CheckCircleIcon, WhatsappLogoIcon, MedalIcon, XCircleIcon
} from "@phosphor-icons/react";
import type {ProposalEntity} from "../../types/ProposalEntity";
import {Avatar} from "../common/Avatar";
import type {ServiceEntity} from "../../types/ServiceEntity.ts";
import {RatingService} from "../../services/RatingService.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import type {RatingResponse} from "../../types/RatingResponse.ts";
import {useEffect, useState} from "react";

interface ProposalCardProps {
    proposal: ProposalEntity;
    service: ServiceEntity;
    onAccept: (proposal: ProposalEntity) => void;
    onCancel: (proposal: ProposalEntity) => void;
    onClickChat: (proposal: ProposalEntity) => void;
    onServiceConclusion: (proposal: ProposalEntity) => void;
}

export default function ProposalCard({proposal, service, onAccept, onCancel, onClickChat, onServiceConclusion}: ProposalCardProps) {
    const auth = useAuth();
    const ratingService = RatingService.getInstance();
    const [serviceRating, setServiceRating] = useState<RatingResponse | null>(null);

    // Load the rating only when the service has been completed.
    // Use a mounted flag to avoid setting state after unmount.
    useEffect(() => {
        let mounted = true;

        const loadServiceRating = async () => {
            if (service?.status !== 'COMPLETED') return;

            const clientId = service?.client?.id;
            const providerId = proposal?.providerId;
            if (!clientId || !providerId) return;

            try {
                const rating = await (auth.authData?.userType === 'CLIENT'
                    ? ratingService.getRatingByPairedIds(clientId, providerId)
                    : ratingService.getRatingByPairedIds(providerId, clientId));

                if (mounted) setServiceRating(rating ?? null);
            } catch (error) {
                console.error("Erro ao carregar avaliação do serviço:", error);
            }
        };

        loadServiceRating();

        return () => { mounted = false; };
    }, [service?.status, service?.client?.id, proposal?.providerId, auth.authData?.userType, ratingService]);

    // derive numeric score and number of stars to render
    const ratingScore = serviceRating ? (typeof serviceRating.score === 'number' ? serviceRating.score : Number(serviceRating.score) || 0) : 0;
    const starsCount = Math.min(5, Math.max(0, Math.round(ratingScore)));


    return (
        <div
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200">

            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                    <Avatar
                        image={proposal?.provider?.picture || ''}
                        alt={proposal?.provider?.firstName}
                        size="md"
                        fallbackText={proposal?.provider?.name}
                        className="w-12 h-12 rounded-full"
                    />

                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-800">
                            {`${proposal?.provider?.firstName || ''} ${proposal?.provider?.lastName || 'Prestador'}`}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {proposal?.provider?.providerData?.professions?.join(" | ") || 'Profissão não informada'}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <StarIcon size={16} weight="fill" className="text-yellow-400"/>
                                <span className="font-bold text-gray-700">{proposal?.provider?.averageRating.toFixed(1)}</span>
                                <span>({proposal?.provider?.numberOfRatings} avaliações)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {proposal.accepted ?
                    <div className="self-start bg-green-300 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        <div className="flex items-center gap-2">
                            <CheckCircleIcon size={16} />
                            <h1 className="text-sm">
                                Aceita
                            </h1>
                        </div>
                    </div>
                    :
                    <div className="hidden"></div>
                }
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
            {(service.status !== 'COMPLETED') ? (
                proposal.accepted ? (
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 border-green-400 bg-green-400 text-white hover:bg-white hover:text-green-400 transition-colors duration-200 text-sm"
                            onClick={() => onClickChat(proposal)}>
                            <WhatsappLogoIcon size={16}/>
                            <span>Conversar no whatsapp </span>
                        </button>

                        <button
                            className="flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-white transition-colors duration-200 text-sm"
                            onClick={() => onServiceConclusion(proposal)}>
                            <MedalIcon size={16}/>
                            <span>Confirmar serviço e avaliar</span>
                        </button>

                        <button
                            className="flex items-center gap-2 rounded-lg border-2  px-3 py-1.5 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm"
                            onClick={() => onCancel(proposal)}>
                            <XCircleIcon size={16}/>
                            <span>Cancelar</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onAccept(proposal)}
                        className="flex-1 bg-yellow-400 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-200 text-sm font-bold flex items-center justify-center gap-2"
                    >
                        <CheckCircleIcon size={20}/>
                        Aceitar Proposta
                    </button>
                )
            ) : (
                <div>
                    {/* render a div with the rating that was given when this service was concluded */}
                    {serviceRating ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-start gap-2 bg-blue-100 rounded-lg p-3">
                                <h1 className="text-xl">Sua avaliação:</h1>

                                <div className="flex items-center gap-2">
                                    {/* render N filled stars according to the rounded score (max 5) */}
                                    {Array.from({length: starsCount}).map((_, i) => (
                                        <StarIcon key={i} size={16} weight="fill" className="text-yellow-400" />
                                    ))}
                                    <span className="ml-2 font-bold text-gray-800">{ratingScore.toFixed(1)}</span>
                                </div>

                                {serviceRating.comment ? (
                                    <blockquote className="text-sm text-gray-700 italic mt-2">“{serviceRating.comment}”</blockquote>
                                ) : (
                                    <span className="text-sm text-gray-500 mt-2">— Sem comentário</span>
                                )}
                            </div>
                            <hr className="border-gray-200"/>
                            <p className="text-center text-sm text-gray-600">Serviço concluído e avaliado ✓</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Nenhuma avaliação encontrada.</p>
                    )}
                </div>
             )
             }
         </div>
     );
 }
