import { useState } from "react";
import Input from "../common/Input.tsx";
import Textarea from "../common/Textarea.tsx";
import CustomSelect from "../common/CustomSelect.tsx";
import ModalHeader from "../common/ModalHeader.tsx";
import ModalActions from "../common/ModalActions.tsx";
import { getServiceCategoryOptions } from "../../constants/formData.ts";
import type {ServiceType} from "../../types/ServiceType.ts";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (serviceData: ServiceType) => void;
  loading?: boolean;
}

const CreateServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}: CreateServiceModalProps) => {
  const [formData, setFormData] = useState<ServiceType>({
    picture: "",
    title: "",
    description: "",
    category: ""
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const professionOptions = getServiceCategoryOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateServiceForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const validateServiceForm=(formData: ServiceType) => {
        const errors: Record<string, boolean> = {};

      if (!formData?.title?.trim()) {
          errors.title = true;
      }
      if (!formData?.description?.trim()) {
          errors.description = true;
      }
      if (!formData?.category?.trim()) {
          errors.category = true;
      }
      if (!formData?.picture?.trim()) {
          errors.picture = true;
      }

        return errors;
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ?? null;
    handleInputChange("category", value);
  };

  const handleClose = () => {
    setErrors({});
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

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Input
              name="foto"
              label="URL da Foto"
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              value={formData.picture}
              onChange={(e) => handleInputChange("picture", e.target.value)}
              error={errors.picture}
              required
            />

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
