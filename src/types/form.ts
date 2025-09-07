export interface ClientData {
  street: string;
  houseNumber: string | number;
  reference: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ProviderData {
  profession: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export type UserType = "CLIENT" | "PROVIDER";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  userType: UserType;
  clientData: ClientData;
  providerData: ProviderData;
}

export interface StepFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}
