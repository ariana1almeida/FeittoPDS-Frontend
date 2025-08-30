import type { ChangeEvent } from "react";
import Input from "../Input";
import type { StepFormProps } from "../../types/form";

interface StepCommonProps extends StepFormProps {
  showValidation?: boolean;
}

export default function StepCommon({
  formData,
  setFormData,
  showValidation = false,
}: StepCommonProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Common Information</h2>
      <Input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        label="First Name"
        required
        error={showValidation && !formData.firstName.trim()}
      />
      <Input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        label="Last Name"
        required
        error={showValidation && !formData.lastName.trim()}
      />
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
        required
        error={showValidation && !formData.email.trim()}
      />
      <Input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        label="Phone"
        required
        error={showValidation && !formData.phone.trim()}
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        label="Password"
        required
        error={showValidation && !formData.password.trim()}
      />
    </>
  );
}
