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
      <FormSection title="Categorias de Serviços:">
          <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-neutral-dark">
                  Profissões <span className="text-status-error">*</span>
              </p>
              <p className="text-sm font-normal text-neutral-medium mb-4">Selecione as áreas em que você atua (pode escolher mais de uma)</p>
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                  {getProfessionOptions().map((opt) => {
                      const Icon = PROFESSION_ICONS[opt.value as keyof typeof PROFESSION_ICONS];
                      return (
                          <label
                              key={opt.value}
                              className="flex items-center gap-2 border-2 border-neutral-medium/5 rounded-xl px-4 py-3 cursor-pointer hover:border-neutral-medium/20 transition-colors md:flex-1 md:basis-[calc(33.333%-0.5rem)]"
                          >
                              <input
                                  type="checkbox"
                                  name="providerData.professions"
                                  value={opt.value}
                                  checked={professionsSelected.includes(opt.value)}
                                  onChange={onChange}
                                  className="h-4 w-4 rounded border-neutral-medium accent-accent-yellow cursor-pointer"
                              />
                              {Icon && <Icon size={18} className="text-neutral-dark" aria-hidden="true" />}
                              <span className="text-sm font-medium text-neutral-dark">{opt.label}</span>
                          </label>
                      );
                  })}
              </div>

              {showValidation && professionsSelected.length === 0 && (
                  <p className="text-status-error text-xs mt-1">Selecione ao menos uma profissão.</p>
              )}
          </div>

        <div className="grid grid-cols-2 gap-4 my-6">
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