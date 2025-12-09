import RadioGroup from "../common/RadioGroup.tsx";
import FormSection from "../common/FormSection.tsx";
import type {UserType} from "../../types/form";

interface UserTypeSelectorProps {
    selectedType: UserType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserTypeSelector({
                                             selectedType, onChange,
                                         }: UserTypeSelectorProps) {
    return (<FormSection title="Você é:">
            <div className="my-6">
                <RadioGroup
                    name="userType"
                    selected={selectedType}
                    onChange={onChange}
                    options={[{
                        label: "Cliente",
                        value: "CLIENT",
                        description: "Preciso de serviços"
                    }, {label: "Prestador", value: "PROVIDER", description: "Quero oferecer serviços"},]}
                />
            </div>
        </FormSection>);
}
