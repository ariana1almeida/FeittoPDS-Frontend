import { useState } from "react";
import StepCommon from "./StepCommon";
import StepUserType from "./StepUserType";
import StepNavigation from "./StepNavigation";
import { api } from "../../services/api";
import type { FormData } from "../../types/form";

export default function StepForm() {
  const [step, setStep] = useState(1);
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
  const [showStep2Validation, setShowStep2Validation] = useState(false);

  const validateStep1 = (): boolean => {
    const { firstName, lastName, email, phone, password } = formData;
    return !!(
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      password.trim()
    );
  };

  const validateStep2 = (): boolean => {
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

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      setError("Please fill in all required fields");
      setShowValidation(true);
      return;
    }
    setError("");
    setShowValidation(false);
    setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => {
    setError("");
    setShowValidation(false);
    setShowStep2Validation(false);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep2()) {
      setError("Please fill in all required fields");
      setShowStep2Validation(true);
      return;
    }

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
      setSuccess("User registered successfully!");
      setError("");
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
          : "Unexpected error";
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div>
      {step === 1 && (
        <StepCommon
          formData={formData}
          setFormData={setFormData}
          showValidation={showValidation}
        />
      )}
      {step === 2 && (
        <StepUserType
          formData={formData}
          setFormData={setFormData}
          showValidation={showStep2Validation}
        />
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      <StepNavigation
        step={step}
        onNext={step === 2 ? handleSubmit : nextStep}
        onBack={step > 1 ? prevStep : undefined}
      />
    </div>
  );
}
