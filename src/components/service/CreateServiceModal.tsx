import {useState, useRef} from "react";
import Input from "../common/Input.tsx";
import Textarea from "../common/Textarea.tsx";
import CustomSelect from "../common/CustomSelect.tsx";
import ModalHeader from "../common/ModalHeader.tsx";
import ModalActions from "../common/ModalActions.tsx";
import {getServiceCategoryOptions} from "../../constants/formData.ts";
import type {ServiceType} from "../../types/ServiceType.ts";
import {CameraIcon, ImageSquareIcon} from "@phosphor-icons/react";
import {convertImageToBase64} from "../common/utils.ts";
import type {CreateServiceData} from "../../services/ServiceService.ts";

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (serviceData: CreateServiceData) => void;
    loading?: boolean;
}

const CreateServiceModal = ({
                                isOpen,
                                onClose,
                                onSubmit,
                                loading = false
                            }: CreateServiceModalProps) => {
    const [formData, setFormData] = useState<Omit<ServiceType, 'picture'> & { picture: string | null }>({
        picture: null,
        title: "",
        description: "",
        category: ""
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="overflow-y-auto pr-2 max-h-[90vh]">
                    <div className="p-6">
                        <ModalHeader
                            title="Criar Novo Serviço"
                            onClose={handleClose}
                            disabled={loading}
                        />

                        <Input
                            name="titulo"
                            label="Título"
                            type="text"
                            placeholder="Digite o título do serviço"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            error={errors.title}
                            required
                        />

                        <Textarea
                            name="descricao"
                            label="Descrição"
                            placeholder="Descreva detalhadamente o serviço"
                            value={formData?.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            error={errors.description}
                            rows={4}
                            required
                        />

                        <CustomSelect
                            label="Categoria"
                            name="categoria"
                            options={professionOptions}
                            value={formData.category}
                            onChange={handleSelectChange}
                            placeholder="Selecione a categoria"
                            error={errors.category}
                        />
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-primary-dark">
                                    Foto do Serviço <span className="text-status-error ml-1">*</span>
                                </label>
                                <div
                                    className={`relative w-full h-48 rounded-lg flex items-center justify-center cursor-pointer
                  ${errors.picture ? 'border-2 border-status-error bg-red-50' : 'border-2 border-dashed border-neutral-medium bg-neutral-light'}
                  hover:border-accent-yellow hover:bg-neutral-100 transition-colors`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Pré-visualização"
                                             className="w-full h-full object-cover rounded-lg"/>
                                    ) : (
                                        <div className="text-center text-neutral-dark">
                                            <ImageSquareIcon size={48} className="mx-auto"/>
                                            <p>Clique para adicionar uma imagem</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    {imagePreview && (
                                        <div
                                            className="absolute bottom-2 right-2 bg-accent-yellow rounded-full p-2 shadow-lg">
                                            <CameraIcon className="h-5 w-5 text-white"/>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ModalActions
                                onCancel={handleClose}
                                submitLabel="Criar Serviço"
                                submittingLabel="Criando..."
                                isSubmitting={loading}
                                disabled={loading}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateServiceModal;
