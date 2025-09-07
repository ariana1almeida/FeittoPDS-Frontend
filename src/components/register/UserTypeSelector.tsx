import RadioGroup from "../RadioGroup";
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
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Tipo de Conta
      </h2>

      <RadioGroup
        name="userType"
        selected={selectedType}
        onChange={onChange}
        options={[
          { label: "Cliente", value: "CLIENT" },
          { label: "Prestador", value: "PROVIDER" },
        ]}
      />
    </div>
  );
}
