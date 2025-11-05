import {PROFESSION_LABELS} from "../../constants/formData.ts";
import {CalendarBlankIcon, EyeIcon, TrashIcon} from "@phosphor-icons/react";
import type {ServiceEntity} from "../../types/ServiceEntity.ts";

interface ServiceCardProps {
    service: ServiceEntity;
    onView: (serviceId: string) => void;
    onDelete: (serviceId: string) => void;
    onViewProposals: (serviceId: string) => void;
}

const ServiceCard = ({
                         service,
                         onView,
                         onDelete,
                         onViewProposals
                     }: ServiceCardProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'Aberto';
            case 'IN_PROGRESS':
                return 'Em Andamento';
            case 'COMPLETED':
                return 'Concluído';
            case 'CANCELLED':
                return 'Cancelado';
            default:
                return status;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={service.picture}
                        alt={service.title}
                        className="w-48 h-48 object-cover rounded-lg"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/64x64?text=Foto";
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-primary-dark truncate">
                                {service.title}
                            </h3>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                                {getStatusLabel(service.status)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {service.description}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-sm text-primary-dark mb-2">
                            <span className="bg-blue-100 px-2 py-1 rounded">
                                {PROFESSION_LABELS[service.category] || service.category}
                            </span>
                            <span className="flex justify-center items-center gap-1 ml-4">
                                <CalendarBlankIcon size={18}/> {formatDate(service.createdAt)}
                            </span>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button
                                onClick={() => onViewProposals(service.id)}
                                className="flex-1 bg-primary-dark text-white py-2 px-3 rounded-lg hover:bg-primary-medium transition-colors duration-200 text-sm font-medium"
                            >
                                Ver Propostas
                            </button>
                            <button
                                onClick={() => onView(service.id)}
                                className="border border-status-success text-status-success py-2 px-3 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm font-medium"
                            >
                                <EyeIcon size={18} weight="light"/>
                            </button>
                            <button
                                onClick={() => onDelete(service.id)}
                                className="border border-red-500 text-red-500 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                            >
                                <TrashIcon size={18} weight="light"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
