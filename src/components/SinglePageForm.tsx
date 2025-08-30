import { useState } from "react";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import { api } from "../services/api";
import type { FormData } from "../types/form";

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

export default function SinglePageForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "CLIENT",
    clientData: {
      street: "",
      houseNumber: "",
      reference: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    providerData: {
      profession: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const { firstName, lastName, email, phone, password } = formData;
    const commonFieldsValid = !!(
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      password.trim()
    );

    if (!commonFieldsValid) return false;

    if (formData.userType === "CLIENT") {
      const { street, houseNumber, neighborhood, city, state } =
        formData.clientData;
      return !!(
        street.trim() &&
        houseNumber.trim() &&
        neighborhood.trim() &&
        city &&
        state
      );
    } else {
      const { profession, neighborhood, city, state } = formData.providerData;
      return !!(profession && neighborhood.trim() && city && state);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setUserType = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      userType: e.target.value as "CLIENT" | "PROVIDER",
    });

  const setClient = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFormData({
      ...formData,
      clientData: { ...formData.clientData, [e.target.name]: e.target.value },
    });

  const setProvider = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setFormData({
      ...formData,
      providerData: {
        ...formData.providerData,
        [e.target.name]: e.target.value,
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setShowValidation(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType,
        data:
          formData.userType === "CLIENT"
            ? formData.clientData
            : formData.providerData,
      };
      const response = await api.post("/users", payload);
      setSuccess("Usuário cadastrado com sucesso!");
      setError("");
      setShowValidation(false);
      console.log(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
          ? (err.response.data as { error: string }).error
          : "Erro inesperado";
      setError(errorMessage);
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Cadastro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Informações Pessoais
          </h2>

          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Primeiro Nome"
            label="Primeiro Nome"
            required
            error={showValidation && !formData.firstName.trim()}
          />

          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Sobrenome"
            label="Sobrenome"
            required
            error={showValidation && !formData.lastName.trim()}
          />

          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            label="E-mail"
            required
            error={showValidation && !formData.email.trim()}
          />

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefone"
            label="Telefone"
            required
            error={showValidation && !formData.phone.trim()}
          />

          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            label="Senha"
            required
            error={showValidation && !formData.password.trim()}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Tipo de Conta
          </h2>

          <RadioGroup
            name="userType"
            selected={formData.userType}
            onChange={setUserType}
            options={[
              { label: "Cliente", value: "CLIENT" },
              { label: "Prestador", value: "PROVIDER" },
            ]}
          />
        </div>

        {formData.userType === "CLIENT" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Informações de Endereço
            </h2>

            <Input
              name="street"
              label="Rua"
              value={formData.clientData.street}
              onChange={setClient}
              required
              error={showValidation && !formData.clientData.street.trim()}
            />

            <Input
              name="houseNumber"
              label="Número da Casa"
              value={formData.clientData.houseNumber}
              onChange={setClient}
              required
              error={showValidation && !formData.clientData.houseNumber.trim()}
            />

            <Input
              name="reference"
              label="Referência"
              value={formData.clientData.reference}
              onChange={setClient}
            />

            <Input
              name="neighborhood"
              label="Bairro"
              value={formData.clientData.neighborhood}
              onChange={setClient}
              required
              error={showValidation && !formData.clientData.neighborhood.trim()}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Cidade
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="city"
                  value={formData.clientData.city}
                  onChange={setClient}
                  className={`w-full rounded border p-2 ${
                    showValidation && !formData.clientData.city
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Selecione uma cidade</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Estado
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="state"
                  value={formData.clientData.state}
                  onChange={setClient}
                  className={`w-full rounded border p-2 ${
                    showValidation && !formData.clientData.state
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Selecione um estado</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {formData.userType === "PROVIDER" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Informações Profissionais
            </h2>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Profissão
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="profession"
                value={formData.providerData.profession}
                onChange={setProvider}
                className={`w-full rounded border p-2 ${
                  showValidation && !formData.providerData.profession
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Selecione uma profissão</option>
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
              value={formData.providerData.neighborhood}
              onChange={setProvider}
              required
              error={
                showValidation && !formData.providerData.neighborhood.trim()
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Cidade
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="city"
                  value={formData.providerData.city}
                  onChange={setProvider}
                  className={`w-full rounded border p-2 ${
                    showValidation && !formData.providerData.city
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Selecione uma cidade</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Estado
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="state"
                  value={formData.providerData.state}
                  onChange={setProvider}
                  className={`w-full rounded border p-2 ${
                    showValidation && !formData.providerData.state
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Selecione um estado</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
