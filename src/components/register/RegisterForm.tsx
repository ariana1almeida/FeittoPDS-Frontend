import { useState } from "react";
import { api } from "../../services/api";
import type { FormData } from "../../types/form";
import PersonalInfoForm from "./PersonalInfoForm";
import UserTypeSelector from "./UserTypeSelector";
import ClientForm from "./ClientForm";
import ProviderForm from "./ProviderForm";
import SubmitButton from "./SubmitButton";

export default function RegisterForm() {
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
      const houseNumberValid =
        typeof houseNumber === "string"
          ? houseNumber.trim() !== ""
          : houseNumber > 0;
      return !!(
        street.trim() &&
        houseNumberValid &&
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
  ) => {
    const { name, value } = e.target;
    const processedValue =
      name === "houseNumber"
        ? value === ""
          ? ""
          : parseInt(value) || ""
        : value;

    setFormData({
      ...formData,
      clientData: { ...formData.clientData, [name]: processedValue },
    });
  };

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
            ? {
                ...formData.clientData,
                houseNumber:
                  typeof formData.clientData.houseNumber === "string"
                    ? parseInt(formData.clientData.houseNumber) || 0
                    : formData.clientData.houseNumber,
              }
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
    <div className="max-w-md mx-auto p-6 bg-amber-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-600">Cadastre-se</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PersonalInfoForm
          formData={formData}
          onChange={handleChange}
          showValidation={showValidation}
        />

        <UserTypeSelector
          selectedType={formData.userType}
          onChange={setUserType}
        />

        {formData.userType === "CLIENT" && (
          <ClientForm
            formData={formData.clientData}
            onChange={setClient}
            showValidation={showValidation}
          />
        )}

        {formData.userType === "PROVIDER" && (
          <ProviderForm
            formData={formData.providerData}
            onChange={setProvider}
            showValidation={showValidation}
          />
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
