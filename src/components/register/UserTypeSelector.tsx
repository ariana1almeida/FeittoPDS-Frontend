import RadioGroup from "../RadioGroup";
import FormSection from "../FormSection";
import type { UserType } from "../../types/form";

interface UserTypeSelectorProps {
  selectedType: UserType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserTypeSelector({
  selectedType,
  onChange,
}: UserTypeSelectorProps) {
  return (
    <FormSection title="Tipo de Conta">
      <RadioGroup
        name="userType"
        selected={selectedType}
        onChange={onChange}
        options={[
          { label: "Cliente", value: "CLIENT" },
          { label: "Prestador", value: "PROVIDER" },
        ]}
      />
    </FormSection>
  );
}
