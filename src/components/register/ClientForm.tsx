import Input from "../common/Input.tsx";
import FormSection from "../common/FormSection.tsx";
import type { FormData } from "../../types/form";
import CustomSelect from "../common/CustomSelect.tsx";
import { CITIES, STATES } from "../../constants/formData";

interface ClientFormProps {
    formData: FormData;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    showValidation: boolean;
}

export default function ClientForm({
                                       formData,
                                       onChange,
                                       showValidation,
                                   }: ClientFormProps) {
    return (
        <FormSection title="Dados do Endereço">
            <Input
                name="clientData.street"
                label="Rua"
                placeholder="Rua"
                value={formData.clientData.street}
                onChange={onChange}
                required
                error={showValidation && !formData.clientData.street.trim()}
            />

            <Input
                name="clientData.houseNumber"
                type="number"
                label="Número da Casa"
                placeholder="Número da Casa"
                value={formData.clientData.houseNumber}
                onChange={onChange}
                required
                error={showValidation && !formData.clientData.houseNumber}
            />

            <Input
                name="clientData.reference"
                label="Referência"
                placeholder="Referência"
                value={formData.clientData.reference}
                onChange={onChange}
            />

            <Input
                name="neighborhood"
                label="Bairro"
                placeholder="Bairro"
                value={formData.neighborhood}
                onChange={onChange}
                required
                error={showValidation && !formData.neighborhood.trim()}
            />

            <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                    label="Cidade"
                    name="city"
                    value={formData.city}
                    options={CITIES}
                    placeholder="Cidade"
                    onChange={onChange}
                    error={showValidation && !formData.city}
                />

                <CustomSelect
                    label="Estado"
                    name="state"
                    value={formData.state}
                    options={STATES}
                    placeholder="Estado"
                    onChange={onChange}
                    error={showValidation && !formData.state}
                />
            </div>
        </FormSection>
    );
}