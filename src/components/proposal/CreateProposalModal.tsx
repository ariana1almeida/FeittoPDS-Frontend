import {useState, useEffect} from "react";
import Input from "../common/Input.tsx";
import Textarea from "../common/Textarea.tsx";
import ModalHeader from "../common/ModalHeader.tsx";
import type {ProposalEntity} from "../../types/ProposalEntity.ts";

interface ProposalModalProps {
    isOpen: boolean;
    onSubmit: (proposalData: Omit<ProposalEntity, 'id'>) => void;
    onClose: () => void;
    serviceId: string;
    providerId: string;
    serviceTitle?: string;
    loading?: boolean;
}

const CreateProposalModal = ({
                           isOpen,
                           onSubmit,
                           onClose,
                           serviceId,
                           providerId,
                           serviceTitle,
                           loading = false
                       }: ProposalModalProps) => {
    const [formData, setFormData] = useState<Omit<ProposalEntity, 'id'>>({
        serviceId: serviceId,
        providerId: providerId,
        estimatedPrice: 0,
        estimatedDays: 0,
        description: "",
        accepted: false,
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                serviceId: serviceId,
                providerId: providerId,
            }));
        }
    }, [isOpen, serviceId, providerId]);

    const validateProposalForm = (data: typeof formData) => {
        const validationErrors: Record<string, boolean> = {};

        if (!data.estimatedDays || data.estimatedDays <= 0) {
            validationErrors.estimatedDays = true;
        }
        if (!data.estimatedPrice || data.estimatedPrice <= 0) {
            validationErrors.value = true;
        }

        return validationErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        console.log('chamou o handle submit');
        e.preventDefault();

        const validationErrors = validateProposalForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("CHAMOU O ONSUBMIT DO MODAL COM OS DADOS:", formData);
            onSubmit(formData);
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: false}));
        }
    };

    const handleClose = () => {
        setFormData({
            serviceId: serviceId,
            providerId: providerId,
            estimatedPrice: 0,
            estimatedDays: 0,
            description: "",
            accepted: false
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <ModalHeader
                        title="Enviar Proposta"
                        onClose={handleClose}
                        disabled={loading}
                    />

                    {serviceTitle && (
                        <p className="text-sm text-primary-dark mb-4">
                            Para: <span className="font-semibold">{serviceTitle}</span>
                        </p>
                    )}

                    <form className="space-y-4">
                        <Input
                            name="tempoEstimado"
                            label="Tempo Estimado"
                            type="number"
                            placeholder="Ex: 5"
                            value={formData.estimatedDays}
                            onChange={(e) => {
                                const val = (e.target as HTMLInputElement).valueAsNumber;
                                handleInputChange("estimatedDays", Number.isFinite(val) ? val : 0);
                            }}
                            error={errors.estimatedDays}
                            required
                        />

                        <Input
                            name="valor"
                            label="Valor (R$)"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Ex: 150.00"
                            value={formData.estimatedPrice}
                            onChange={(e) => {
                                const val = (e.target as HTMLInputElement).valueAsNumber;
                                handleInputChange("estimatedPrice", Number.isFinite(val) ? val : 0);
                            }}
                            error={errors.estimatedPrice}
                            required
                        />

                        <Textarea
                            name="descricao"
                            label="Descrição da Proposta"
                            placeholder="Descreva como pretende realizar o serviço"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            error={errors.description}
                            rows={4}
                            className="text-sm"
                        />

                        <div className="flex flex-row justify-between gap-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-40 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold text-sm
                            hover:bg-gray-50 transition-all duration-200 mt-6 shadow-sm hover:shadow-md
                            focus:ring-2 focus:ring-gray-300/20 focus:outline-none">
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`w-40 bg-accent-yellow text-primary-dark py-3 px-6 rounded-lg font-semibold text-sm
                                hover:bg-accent-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200 mt-6 shadow-sm hover:shadow-md 
                                focus:ring-2 focus:ring-accent-yellow/20 focus:outline-none`}
                            >
                                Enviar Proposta

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProposalModal;
