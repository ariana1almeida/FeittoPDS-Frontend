import Input from "../Input";
import type { ProviderData } from "../../types/form";

const CITIES = [
  "CAPAO_DA_CANOA",
  "XANGRI_LA",
  "TRAMANDAI",
  "IMBE",
  "CURUMIM",
] as const;
const STATES = ["RS"] as const;
const PROFESSIONS = [
  "ELECTRICIAN",
  "PLUMBER",
  "CARPENTER",
  "PAINTER",
  "MASON",
  "OTHER",
] as const;

const PROFESSION_LABELS = {
  ELECTRICIAN: "Eletricista",
  PLUMBER: "Encanador",
  CARPENTER: "Carpinteiro",
  PAINTER: "Pintor",
  MASON: "Pedreiro",
  OTHER: "Outros",
} as const;

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
    <div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Profissão
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          name="profession"
          value={formData.profession}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg transition-all duration-200 ${
            showValidation && !formData.profession
              ? "bg-red-50 border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "bg-stone-200 border-2 border-transparent focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          } text-gray-700 focus:outline-none appearance-none cursor-pointer`}
        >
          <option value="">Profissão</option>
          {PROFESSIONS.map((p) => (
            <option key={p} value={p}>
              {PROFESSION_LABELS[p]}
            </option>
          ))}
        </select>
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
            } text-gray-900 focus:outline-none appearance-none cursor-pointer`}
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
