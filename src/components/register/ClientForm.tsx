import Input from "../common/Input.tsx";
import FormSection from "../common/FormSection.tsx";
import type {FormData} from "../../types/form";
import CustomSelect from "../common/CustomSelect.tsx";
import {CITIES, STATES} from "../../constants/formData";

interface ClientFormProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showValidation: boolean;
}

export default function ClientForm({
                                       formData, onChange, showValidation,
                                   }: ClientFormProps) {
    return (<FormSection title="Endereço:">
            <div className="flex gap-4 my-6">
                <div className="flex-1">
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
                <div className="flex-1">
                    <CustomSelect
                        label="Cidade"
                        name="city"
                        value={formData.city}
                        options={CITIES}
                        placeholder="Cidade"
                        onChange={onChange}
                        error={showValidation && !formData.city}
                    />
                </div>
            </div>
            <Input
                name="neighborhood"
                label="Bairro"
                placeholder="Bairro"
                value={formData.neighborhood}
                onChange={onChange}
                required
                error={showValidation && !formData.neighborhood.trim()}
            />
            <div className="flex gap-4 my-6">
                <div className="flex-1">
                    <Input
                        name="clientData.street"
                        label="Rua"
                        placeholder="Rua"
                        value={formData.clientData.street}
                        onChange={onChange}
                        required
                        error={showValidation && !formData.clientData.street.trim()}
                    />
                </div>
                <div className="flex-1">
                    <Input
                        name="clientData.houseNumber"
                        type="number"
                        label="Nº da Casa"
                        placeholder="000"
                        value={formData.clientData.houseNumber}
                        onChange={onChange}
                        required
                        error={showValidation && !formData.clientData.houseNumber}
                    />
                </div>
            </div>

            <Input
                name="clientData.reference"
                label="Referência"
                placeholder="Referência"
                value={formData.clientData.reference}
                onChange={onChange}
            />
        </FormSection>);
}