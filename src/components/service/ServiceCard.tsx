// src/components/service/ServiceCard.tsx
import { PROFESSION_LABELS } from "../../constants/formData";
import { CalendarBlankIcon, TrashIcon } from "@phosphor-icons/react";
import type { ServiceEntity } from "../../types/ServiceEntity";

interface ServiceCardProps {
    service: ServiceEntity;
    onView: (serviceId: string) => void;
    onDelete: (serviceId: string) => void;
    onViewProposals: (serviceId: string) => void;
}

const ServiceCard = ({
                         service,
                         onDelete,
                         onViewProposals
                     }: ServiceCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-lime-200 text-neutral-dark';
            case 'IN_PROGRESS':
                return 'bg-yellow-200 text-neutral-dark';
            case 'COMPLETED':
                return 'bg-emerald-200 text-neutral-dark';
            case 'CANCELLED':
                return 'bg-red-200 text-neutral-dark';
            default:
                return 'bg-gray-200 text-neutral-dark';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'ABERTO';
            case 'IN_PROGRESS':
                return 'EM ANDAMENTO';
            case 'COMPLETED':
                return 'CONCLUÍDO';
            case 'CANCELLED':
                return 'CANCELADO';
            default:
                return status;
        }
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 max-w-[296px] min-h-[4.5rem] w-full flex flex-col">
            <div className="relative">
                <img
                    src={service.picture}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/256x192?text=Foto";
                    }}
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {PROFESSION_LABELS[service.category] || service.category}
                </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(service.status)}`}>
                    {getStatusLabel(service.status)}
                </span>
                </div>

                <h3 className="text-base font-semibold text-neutral-dark line-clamp-1">
                    {service.title}
                </h3>

                <p className="text-sm text-neutral-medium mb-4 line-clamp-3 flex-grow">
                    {service.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                    <button
                        onClick={() => onViewProposals(service.id)}
                        className="text-sm text-primary-dark font-medium hover:text-primary-medium transition-colors duration-200 flex items-center gap-1"
                    >
                        <CalendarBlankIcon size={16} weight="bold" />
                        Ver Propostas
                    </button>
                    <button
                        onClick={() => onDelete(service.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                        <TrashIcon size={18} weight="regular"/>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default ServiceCard;
