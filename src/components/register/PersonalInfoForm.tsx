import Input from "../common/Input.tsx";
import FormSection from "../common/FormSection.tsx";
import type {FormData} from "../../types/form";

interface PersonalInfoFormProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showValidation: boolean;
}

export default function PersonalInfoForm({
                                             formData, onChange, showValidation,
                                         }: PersonalInfoFormProps) {
    return (<FormSection>
            <div className="my-6">
                <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChange}
                    placeholder="Primeiro Nome"
                    label="Primeiro Nome"
                    required
                    error={showValidation && !formData.firstName.trim()}
                />
            </div>
        <div className="my-6">

                <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChange}
                    placeholder="Sobrenome"
                    label="Sobrenome"
                    required
                    error={showValidation && !formData.lastName.trim()}
                />
        </div>
        <div className="my-6">
                <Input
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder="DDD + Telefone"
                    label="Telefone"
                    required
                    error={showValidation && !formData.phone.trim()}
                />
        </div>
        <div className="my-6">

                <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="E-mail"
                    label="E-mail"
                    required
                    error={showValidation && !formData.email.trim()}
                />
        </div>
        <div className="my-6">

                <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Senha"
                    label="Senha"
                    required
                    error={showValidation && !formData.password.trim()}
                />
            </div>
        </FormSection>);
}
