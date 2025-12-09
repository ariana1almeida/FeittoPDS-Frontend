// src/components/service/ProviderServiceCard.tsx
import {CalendarBlankIcon, MapPinIcon, PaperPlaneTiltIcon, StarIcon} from "@phosphor-icons/react";
import type {ServiceEntity} from "../../types/ServiceEntity";
import {getProfessionBadgeClass, PROFESSION_LABELS} from "../../constants/formData";

interface ProviderServiceCardProps {
    service: ServiceEntity;
    onSendProposal: (serviceId: string) => void;
}

export default function ProviderServiceCard({service, onSendProposal}: ProviderServiceCardProps) {
    const isDisabled = service.status === 'COMPLETED' || service.status === 'CANCELLED';

    const STATUS_LABELS: Record<string, string> = {
        OPEN: 'Aberto', IN_PROGRESS: 'Em andamento', COMPLETED: 'Concluído', CANCELLED: 'Cancelado',
    };

    const STATUS_CLASSES: Record<string, string> = {
        OPEN: 'bg-gray-100 text-gray-700',
        IN_PROGRESS: 'bg-blue-100 text-blue-800',
        COMPLETED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
    };

    const formatCityName = (city: string) => {
        return city
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const statusLabel = STATUS_LABELS[service.status] ?? service.status;
    const statusClass = STATUS_CLASSES[service.status] ?? 'bg-gray-100 text-gray-700';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const professionBadgeClass = getProfessionBadgeClass(service.category);

    const locationText = service.client?.city && service.client?.neighborhood ? `${service.client.neighborhood} - ${formatCityName(service.client.city)}` : 'Localização não informada';

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
                {service.picture && (
                    <img
                        src={service.picture}
                        alt={'Imagem do serviço'}
                        className="w-full sm:w-48 h-48 sm:min-h-full object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/112x112?text=Foto";
                            target.classList.add('bg-gray-200');
                        }}
                    />
                )}
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-gray-800 text-lg pr-2">{service.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                <p className="font-semibold text-xs text-gray-800 sm:pr-2">
                                    {`${service.client.firstName} ${service.client.lastName}`}
                                </p>
                                <div className="flex items-center gap-1">
                                    <StarIcon size={14} weight="fill" className="text-yellow-400"/>
                                    <span className="font-semibold text-xs text-gray-700">
                                    {service.client?.averageRating.toFixed(1)}
                                </span>
                                    <span className="font-semibold text-xs">
                                    ({service.client?.numberOfRatings} avaliações)
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-1">
                        <span className={`${statusClass} px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap`}>
                            {statusLabel}
                        </span>
                            <span className={`${professionBadgeClass} px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap`}>
                            {PROFESSION_LABELS[service.category] || service.category}
                        </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex-grow">{service.description}</p>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-500 mt-3">
                        <div className="flex items-center gap-1.5">
                            <MapPinIcon size={16} className="text-primary-dark" weight="fill"/>
                            <span className="break-words">{locationText}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarBlankIcon size={16}/>
                            <span>{formatDate(service.createdAt)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => !isDisabled && onSendProposal(service.id)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        className={"w-full bg-primary-dark text-white font-semibold text-sm py-1.5 mt-4 rounded-xl transition-colors flex items-center justify-center gap-2 " + (isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark/90')}
                    >
                        <PaperPlaneTiltIcon size={18} weight="regular"/>
                        {isDisabled ? 'Envio indisponível' : 'Enviar Proposta'}
                    </button>
                </div>
            </div>
        </div>
    );

}
