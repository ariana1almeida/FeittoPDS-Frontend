import Input from "../Input";
import type { ClientData } from "../../types/form";

const CITIES = [
  "CAPAO_DA_CANOA",
  "XANGRI_LA",
  "TRAMANDAI",
  "IMBE",
  "CURUMIM",
] as const;
const STATES = ["RS"] as const;

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
    <div>

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
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Cidade
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={onChange}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              showValidation && !formData.city
                ? "bg-red-50 border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "bg-stone-200 border-2 border-transparent focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            } text-gray-700 placeholder-gray-500 focus:outline-none cursor-pointer`}
          >
            <option value="">Cidade</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Estado
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={onChange}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              showValidation && !formData.state
                ? "bg-red-50 border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "bg-stone-200 border-2 border-transparent focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            } text-gray-900 focus:outline-none appearance-none cursor-pointer`}
          >
            <option value="">Estado</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
