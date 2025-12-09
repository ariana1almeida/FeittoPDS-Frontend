import {
    ClockIcon,
    CurrencyDollarIcon, StarIcon,
    WhatsappLogoIcon,
    XIcon
} from "@phosphor-icons/react";
import type {ProposalEntity} from "../../types/ProposalEntity";
import {Avatar} from "../common/Avatar.tsx";

interface AcceptedProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposal?: ProposalEntity;
}

export const AcceptedProposalModal = ({isOpen, onClose, proposal}: AcceptedProposalModalProps) => {
    if (!isOpen) return null;
    const providerName = `${proposal?.provider?.firstName} ${proposal?.provider?.lastName}`;

    const handleWhatsAppClick = () => {
        const rawPhone = proposal?.provider?.phone;

        if (!rawPhone) {
            alert('Telefone do prestador não disponível.');
            return;
        }

        let sanitizedPhoneNumber = rawPhone.replace(/\D/g, '');

        // Adiciona o código do país (55 para Brasil) se não estiver presente
        if (sanitizedPhoneNumber.length <= 11 && !sanitizedPhoneNumber.startsWith('55')) {
            sanitizedPhoneNumber = `55${sanitizedPhoneNumber}`;
        }

        const serviceTitle = proposal?.service?.title || '';
        const providerName = `${proposal?.provider?.firstName ?? ''} ${proposal?.provider?.lastName ?? ''}`.trim();
        const message = `Olá ${providerName || ''}, gostaria de falar sobre a proposta ${serviceTitle ? ` para o serviço "${serviceTitle}". A oferta foi de R$${proposal?.estimatedPrice}, e o tempo estimado foi de ${proposal?.estimatedDays} dia(s)` : ''}.`;
        const encoded = encodeURIComponent(message);

        const whatsappUrl = `https://wa.me/${sanitizedPhoneNumber}?text=${encoded}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-neutral-medium/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-xl">
                <div className="p-6 relative">
                    <button onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-dark hover:text-neutral-medium">
                        <XIcon size={20}/>
                    </button>

                    <h2 className="text-xl font-bold neutral-dark">Contato do Prestador</h2>
                    <p className="text-sm text-neutral-dark mb-6">Entre em contato com {providerName} pelo WhatsApp</p>

                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar
                            image={proposal?.provider?.picture || ''}
                            alt={proposal?.provider?.firstName}
                            size="md"
                            fallbackText={proposal?.provider?.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                        />
                        <div>
                            <h3 className="font-semibold text-neutral-dark">{providerName}</h3>
                            <div className="flex items-center text-sm text-neutral-dark mt-1">
                                <StarIcon weight="fill" className="text-yellow-500 mr-1"/>
                                <span className="font-bold">{proposal?.provider?.averageRating}</span>
                                <span className="ml-1">({proposal?.provider?.numberOfRatings} avaliações)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 text-neutral-dark mb-6">
                        <div className="flex items-center">
                            <CurrencyDollarIcon size={24} className="text-neutral-dark mr-3"/>
                            <span>Valor: <span className="font-bold">R$ { proposal?.estimatedPrice?.toFixed(2)}</span></span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon size={24} className="text-neutral-dark mr-3"/>
                            <span>Prazo: <span className="font-bold">{ proposal?.estimatedDays} dia(s)</span></span>
                        </div>
                    </div>

                    <div className="bg-accent-green/50 border border-accent-green rounded-lg p-4 text-center">
                        <p className="text-sm text-neutral-dark mb-3">
                            Clique no botão abaixo para iniciar uma conversa no WhatsApp com o prestador.
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-status-success text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
                        >
                            <WhatsappLogoIcon size={24} weight="fill"/>
                            <span>Abrir WhatsApp</span>
                        </button>
                    </div>

                    <p className="text-xs text-neutral-dark text-center mt-4">
                        Uma mensagem automática será enviada para {providerName}
                    </p>
                </div>
            </div>
        </div>
    );
};
