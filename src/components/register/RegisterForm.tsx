import React, { useState } from "react";
import { api } from "../../services/api";
import type { FormData } from "../../types/form";
import PersonalInfoForm from "./PersonalInfoForm";
import UserTypeSelector from "./UserTypeSelector";
import ClientForm from "./ClientForm";
import ProviderForm from "./ProviderForm";
import SubmitButton from "../common/SubmitButton.tsx";

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "CLIENT",
    neighborhood: "",
    city: "",
    state: "",
    clientData: {
      street: "",
      houseNumber: "",
      reference: "",
    },
    providerData: {
      profession: "",
    },
  });

  const [error, setError] = useState("");
  const [success] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const { firstName, lastName, email, phone, password, neighborhood, city, state } = formData;
    const commonFieldsValid = !!(
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        phone.trim() &&
        password.trim() &&
        neighborhood.trim() &&
        city &&
        state
    );

    if (!commonFieldsValid) return false;

    if (formData.userType === "CLIENT") {
      const { street, houseNumber } = formData.clientData;
      const houseNumberValid =
          typeof houseNumber === "string"
              ? houseNumber.trim() !== ""
              : houseNumber > 0;
      return !!(street.trim() && houseNumberValid);
    } else {
      const { profession } = formData.providerData;
      return !!(profession.trim());
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

    if (name.startsWith('clientData.')) {
      const fieldName = name.replace('clientData.', '');
      const processedValue =
          fieldName === "houseNumber"
              ? value === ""
                  ? ""
                  : parseInt(value) || ""
              : value;

      setFormData({
        ...formData,
        clientData: { ...formData.clientData, [fieldName]: processedValue },
      });
    } else {
      // Para campos diretos como neighborhood, city, state
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const setProvider = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('providerData.')) {
      const fieldName = name.replace('providerData.', '');
      setFormData({
        ...formData,
        providerData: {
          ...formData.providerData,
          [fieldName]: value,
        },
      });
    } else {
      // Para campos diretos como neighborhood, city, state
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

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
        city: formData.city,
        neighborhood: formData.neighborhood,
        state: formData.state,
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
      await api.post("/users", payload);

      window.location.hash = "#/login";

    } catch{
      /**/
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary-dark">Cadastre-se</h1>

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
                  formData={formData}
                  onChange={setClient}
                  showValidation={showValidation}
              />
          )}

          {formData.userType === "PROVIDER" && (
              <ProviderForm
                  formData={formData}
                  onChange={setProvider}
                  showValidation={showValidation}
              />
          )}

          {error && <p className="text-status-error text-sm mt-2">{error}</p>}
          {success && <p className="text-status-success text-sm mt-2">{success}</p>}

          <SubmitButton
              isSubmitting={isSubmitting}
              defaultLabel="Cadastrar"
              submittingLabel="Cadastrando..."
          />
        </form>
      </div>
  );
}