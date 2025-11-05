export type UserType = "CLIENT" | "PROVIDER";

export interface ClientData {
  street: string;
  houseNumber: number | string;
  reference: string;
}

export interface ProviderData {
  profession: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  neighborhood: string;
  city: string;
  state: string;
  userType: UserType;
  clientData: ClientData;
  providerData: ProviderData;
}

export interface StepFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}