import Input from "../Input";
import FormSection from "../FormSection";
import CustomSelect from "../CustomSelect";
import type { ProviderData } from "../../types/form";
import { CITIES, STATES, getProfessionOptions } from "../../constants/formData";

interface ProviderFormProps {
  formData: ProviderData;
  onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  showValidation: boolean;
}

export default function ProviderForm({
                                       formData,
                                       onChange,
                                       showValidation,
                                     }: ProviderFormProps) {
  return (
      <FormSection title="Dados Profissionais">
        <CustomSelect
            label="Profissão"
            name="profession"
            value={formData.profession}
            options={getProfessionOptions()}
            placeholder="Selecione a profissão"
            onChange={onChange}
            error={showValidation && !formData.profession}
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
              placeholder="Selecione a cidade"
              onChange={onChange}
              error={showValidation && !formData.city}
          />

          <CustomSelect
              label="Estado"
              name="state"
              value={formData.state}
              options={STATES}
              placeholder="Selecione o estado"
              onChange={onChange}
              error={showValidation && !formData.state}
          />
        </div>
      </FormSection>
  );
}