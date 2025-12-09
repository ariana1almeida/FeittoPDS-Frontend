import {useRef, useState} from "react";
import Input from "../common/Input.tsx";
import Textarea from "../common/Textarea.tsx";
import CustomSelect from "../common/CustomSelect.tsx";
import {getServiceCategoryOptions} from "../../constants/formData.ts";
import type {ServiceType} from "../../types/ServiceType.ts";
import {convertImageToBase64} from "../common/utils.ts";
import type {CreateServiceData} from "../../services/ServiceService.ts";
import {CameraIcon, ImageSquareIcon, XIcon} from "@phosphor-icons/react";

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (serviceData: CreateServiceData) => void;
    loading?: boolean;
}

const CreateServiceModal = ({
                                isOpen, onClose, onSubmit, loading = false
                            }: CreateServiceModalProps) => {
    const [formData, setFormData] = useState<Omit<ServiceType, 'picture'> & { picture: string | null }>({
        picture: null, title: "", description: "", category: ""
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const professionOptions = getServiceCategoryOptions();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateServiceForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0 && formData.picture) {
            onSubmit(formData as Omit<ServiceType, 'picture'> & { picture: string });
        }
    };

    const validateServiceForm = (data: typeof formData) => {
        const errors: Record<string, boolean> = {};

        if (!data?.title?.trim()) {
            errors.title = true;
        }
        if (!data?.description?.trim()) {
            errors.description = true;
        }
        if (!data?.category?.trim()) {
            errors.category = true;
        }
        if (!data.picture) {
            errors.picture = true;
        }

        return errors;
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: false}));
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64Image = await convertImageToBase64(file);

            setFormData(prev => ({...prev, picture: base64Image}));
            setImagePreview(base64Image);
            if (errors.picture) {
                setErrors(prev => ({...prev, picture: false}));
            }
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ?? null;
        handleInputChange("category", value);
    };

    const handleClose = () => {
        setErrors({});
        setFormData({picture: null, title: "", description: "", category: ""});
        setImagePreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (<div className="fixed inset-0 bg-neutral-dark/20 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-neutral-dark">Criar Novo Serviço</h2>
                            <p className="text-xs sm:text-sm text-neutral-medium mt-1">
                                Descreva o serviço que precisa e receba propostas
                            </p>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={loading}
                            className="text-gray-400 hover:text-neutral-medium transition-colors disabled:opacity-50"
                        >
                            <XIcon size={20} className="sm:w-6 sm:h-6"/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4 sm:mt-6">
                        <div>
                            <Input
                                name="titulo"
                                label="Título do serviço"
                                type="text"
                                placeholder="Ex: Instalação de ar condicionado"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                error={errors.title}
                                required
                            />
                            {errors.title && (
                                <p className="text-status-error text-sm mt-1">Por favor, insira um título para o
                                    serviço</p>)}
                        </div>

                        <div>
                            <CustomSelect
                                label="Categoria"
                                name="categoria"
                                options={professionOptions}
                                value={formData.category}
                                onChange={handleSelectChange}
                                placeholder="Selecione uma categoria"
                                error={errors.category}
                            />
                            {errors.category && (
                                <p className="text-status-error text-sm mt-1">Por favor, selecione uma categoria</p>)}
                        </div>

                        <div>
                            <Textarea
                                name="descricao"
                                label="Descrição detalhada"
                                placeholder="Descreva o serviço que você precisa com o máximo de detalhes possível (ex.: informar voltagens, necessidade de comprar materiais, etc."
                                value={formData?.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                error={errors.description}
                                rows={4}
                                required
                            />
                            {errors.description && (
                                <p className="text-status-error text-sm mt-1">Por favor, insira uma descrição
                                    detalhada</p>)}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-neutral-dark">
                                Foto do Serviço <span className="text-status-error ml-1">*</span>
                            </label>
                            <div
                                className={`relative w-full h-40 sm:h-48 rounded-lg flex items-center justify-center cursor-pointer
                                    ${errors.picture ? 'border-2 border-status-error bg-red-50' : 'border-2 border-dashed border-neutral-medium bg-neutral-light'}
                                    hover:border-primary-dark hover:bg-neutral-100 transition-colors`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? (<img src={imagePreview} alt="Pré-visualização"
                                                      className="w-full h-full object-cover rounded-lg"/>) : (
                                    <div className="text-center text-neutral-medium p-4">
                                        <ImageSquareIcon size={40} className="mx-auto sm:w-12 sm:h-12"/>
                                        <p className="text-xs sm:text-sm mt-2">Clique para adicionar uma imagem</p>
                                    </div>)}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {imagePreview && (<div
                                        className="absolute bottom-2 right-2 bg-primary-dark rounded-full p-2 shadow-lg">
                                        <CameraIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white"/>
                                    </div>)}
                            </div>
                            {errors.picture && (
                                <p className="text-status-error text-sm mt-1">Por favor, adicione uma foto do
                                    serviço</p>)}
                        </div>

                        <div
                            className="bg-accent-green-hover/10 rounded-lg border-2 border-accent-green p-3 sm:p-4 space-y-2">
                            <p className="font-semibold text-sm text-accent-green-hover">Como funciona?</p>
                            <ol className="space-y-1 text-sm text-neutral-dark">
                                <li className="flex items-start">
                                    <span className="text-accent-green-hover font-semibold mr-2">1.</span>
                                    Você publica seu serviço gratuitamente
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent-green-hover font-semibold mr-2">2.</span>
                                    Prestadores qualificados enviam propostas
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent-green-hover font-semibold mr-2">3.</span>
                                    Você escolhe a melhor proposta e contrata
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent-green-hover font-semibold mr-2">4.</span>
                                    Após o serviço, você avalia o prestador
                                </li>
                            </ol>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-primary-dark text-white rounded-lg hover:bg-primary-medium transition-colors disabled:opacity-50"
                            >
                                {loading ? "Criando..." : "Criar Serviço"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};

export default CreateServiceModal;
