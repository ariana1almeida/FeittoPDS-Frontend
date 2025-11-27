import {
    ClockIcon,
    CurrencyDollarIcon, StarIcon,
    WhatsappLogoIcon,
    XIcon
} from "@phosphor-icons/react";
import type {ProposalEntity} from "../../types/ProposalEntity";

interface AcceptedProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposal?: ProposalEntity;
}

export const AcceptedProposalModal = ({isOpen, onClose, proposal}: AcceptedProposalModalProps) => {
    if (!isOpen) return null;
    const providerName = `${proposal?.provider?.firstName} ${proposal?.provider?.lastName}`;
    const providerProfession = proposal?.provider?.providerData?.profession;
    const providerInitials = providerName.split(' ').map(n => n[0]).join('').substring(0, 2);

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
        const message = `Olá ${providerName || ''}, gostaria de falar sobre a proposta${serviceTitle ? ` para o serviço "${serviceTitle}"` : ''}.`;
        const encoded = encodeURIComponent(message);

        const whatsappUrl = `https://wa.me/${sanitizedPhoneNumber}?text=${encoded}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
                <div className="p-6 relative">
                    <button onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-dark hover:text-primary-dark">
                        <XIcon size={20}/>
                    </button>

                    <h2 className="text-xl font-bold text-primary-dark">Contato do Prestador</h2>
                    <p className="text-sm text-neutral-dark mb-6">Entre em contato com {providerName} pelo WhatsApp</p>

                    <div className="flex items-center space-x-4 mb-6">
                        <div
                            className="w-14 h-14 rounded-full bg-primary-dark flex items-center justify-center text-white font-bold text-xl">
                            {providerInitials}
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary-dark">{providerName}</h3>
                            <p className="text-sm text-neutral-dark">{providerProfession}</p>
                            <div className="flex items-center text-sm text-neutral-dark mt-1">
                                <StarIcon weight="fill" className="text-accent-yellow mr-1"/>
                                <span className="font-bold">{proposal?.provider?.averageRating}</span>
                                <span className="ml-1">({proposal?.provider?.numberOfRatings} avaliações)</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200 my-4"/>

                    <div className="space-y-3 text-primary-dark mb-6">
                        <div className="flex items-center">
                            <CurrencyDollarIcon size={24} className="text-neutral-dark mr-3"/>
                            <span>Valor: <span className="font-bold">R$ { proposal?.estimatedPrice?.toFixed(2)}</span></span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon size={24} className="text-neutral-dark mr-3"/>
                            <span>Prazo: <span className="font-bold">{ proposal?.estimatedDays}</span></span>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
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
