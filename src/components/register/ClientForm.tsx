import Input from "../Input";
import FormSection from "../FormSection";
import type { ClientData } from "../../types/form";
import CustomSelect from "../CustomSelect";
import { CITIES, STATES } from "../../constants/formData";

interface ClientFormProps {
    formData: ClientData;
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
                name="street"
                label="Rua"
                placeholder="Rua"
                value={formData.street}
                onChange={onChange}
                required
                error={showValidation && !formData.street.trim()}
            />

            <Input
                name="houseNumber"
                type="number"
                label="Número da Casa"
                placeholder="Número da Casa"
                value={formData.houseNumber}
                onChange={onChange}
                required
                error={showValidation && !formData.houseNumber}
            />

            <Input
                name="reference"
                label="Referência"
                placeholder="Referência"
                value={formData.reference}
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