import Input from "../common/Input.tsx";
import FormSection from "../common/FormSection.tsx";
import CustomSelect from "../common/CustomSelect.tsx";
import type { FormData } from "../../types/form";
import {CITIES, STATES, getProfessionOptions, PROFESSION_ICONS} from "../../constants/formData";

interface ProviderFormProps {
  formData: FormData;
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
  const professionsSelected = formData.providerData.professions || [];

  return (
      <FormSection title="Dados Profissionais">
          <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-primary-dark">Profissões <span className="text-status-error">*</span></p>
              <div className="grid grid-cols-2 gap-2">
                  {getProfessionOptions().map((opt) => {
                      const Icon = PROFESSION_ICONS[opt.value as keyof typeof PROFESSION_ICONS];
                      return (
                          <div className="flex items-center border-2 border-neutral-medium rounded-lg" key={opt.value}>
                              <label className="flex items-center gap-2 text-sm text-primary-dark font-bold">
                                  <input
                                      type="checkbox"
                                      name="providerData.professions"
                                      value={opt.value}
                                      checked={professionsSelected.includes(opt.value)}
                                      onChange={onChange}
                                      className="h-4 w-4 rounded-lg border-neutral-medium accent-accent-yellow cursor-pointer ml-2"
                                  />
                                  {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                                  {opt.label}
                              </label>
                          </div>
                      );
                  })}
              </div>
          {showValidation && professionsSelected.length === 0 && (
              <p className="text-status-error text-xs mt-1">Selecione ao menos uma profissão.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
              label="Estado"
              name="state"
              value={formData.state}
              options={STATES}
              placeholder="Selecione o estado"
              onChange={onChange}
              error={showValidation && !formData.state}
          />
          <CustomSelect
              label="Cidade"
              name="city"
              value={formData.city}
              options={CITIES}
              placeholder="Selecione a cidade"
              onChange={onChange}
              error={showValidation && !formData.city}
          />
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
      </FormSection>
  );
}