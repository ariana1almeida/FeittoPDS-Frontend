import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import CustomSelect from "./CustomSelect";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";
import { getServiceCategoryOptions } from "../constants/formData";
import { initialServiceFormData, validateServiceForm } from "../utils/formUtils";
import type { ServiceFormData } from "../utils/formUtils";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (serviceData: ServiceFormData) => void;
  loading?: boolean;
}

const CreateServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}: CreateServiceModalProps) => {
  const [formData, setFormData] = useState<ServiceFormData>(initialServiceFormData);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleInputChange("categoria", value);
  };

  const handleClose = () => {
    setFormData(initialServiceFormData);
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
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              error={errors.titulo}
              required
            />

            <Textarea
              name="descricao"
              label="Descrição"
              placeholder="Descreva detalhadamente o serviço"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              error={errors.descricao}
              rows={4}
              required
            />

            <CustomSelect
              label="Categoria"
              name="categoria"
              options={professionOptions}
              value={formData.categoria}
              onChange={handleSelectChange}
              placeholder="Selecione a categoria"
              error={errors.categoria}
            />

            <Input
              name="foto"
              label="URL da Foto"
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              value={formData.foto}
              onChange={(e) => handleInputChange("foto", e.target.value)}
              error={errors.foto}
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
