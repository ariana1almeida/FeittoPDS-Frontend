import React, {useState} from "react";
import {api} from "../../services/api";
import type {FormData} from "../../types/form";
import PersonalInfoForm from "./PersonalInfoForm";
import UserTypeSelector from "./UserTypeSelector";
import ClientForm from "./ClientForm";
import ProviderForm from "./ProviderForm";
import SubmitButton from "../common/SubmitButton.tsx";
import BackButton from "../common/BackButton.tsx";

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
            street: "", houseNumber: "", reference: "",
        },
        providerData: {
            professions: [],
        },
    });

    const [error, setError] = useState("");
    const [success] = useState("");
    const [showValidation, setShowValidation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const validateForm = (): boolean => {
        const {firstName, lastName, email, phone, password, neighborhood, city, state} = formData;
        const commonFieldsValid = !!(firstName.trim() && lastName.trim() && email.trim() && phone.trim() && password.trim() && neighborhood.trim() && city && state);

        if (!commonFieldsValid) return false;

        if (formData.userType === "CLIENT") {
            const {street, houseNumber} = formData.clientData;
            const houseNumberValid = typeof houseNumber === "string" ? houseNumber.trim() !== "" : houseNumber > 0;
            return !!(street.trim() && houseNumberValid);
        } else {
            const {professions} = formData.providerData;
            return professions && professions.length > 0;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const setUserType = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({
        ...formData, userType: e.target.value as "CLIENT" | "PROVIDER",
    });

    const setClient = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name.startsWith('clientData.')) {
            const fieldName = name.replace('clientData.', '');
            const processedValue = fieldName === "houseNumber" ? value === "" ? "" : parseInt(value) || "" : value;

            setFormData({
                ...formData, clientData: {...formData.clientData, [fieldName]: processedValue},
            });
        } else {
            setFormData({
                ...formData, [name]: value,
            });
        }
    };

    const setProvider = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name.startsWith('providerData.')) {
            const fieldName = name.replace('providerData.', '');
            if (fieldName === 'professions' && e.target instanceof HTMLInputElement) {
                const checked = e.target.checked;
                const current = formData.providerData.professions || [];
                const updated = checked ? [...current, value] : current.filter(p => p !== value);
                setFormData({
                    ...formData, providerData: {...formData.providerData, professions: updated},
                });
            } else {
                setFormData({
                    ...formData, providerData: {
                        ...formData.providerData, [fieldName]: value,
                    },
                });
            }
        } else {
            setFormData({
                ...formData, [name]: value,
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

        if (!acceptedTerms) {
            setError("Você precisa aceitar os termos de uso e políticas de privacidade");
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
                data: formData.userType === "CLIENT" ? {
                    ...formData.clientData,
                    houseNumber: typeof formData.clientData.houseNumber === "string" ? parseInt(formData.clientData.houseNumber) || 0 : formData.clientData.houseNumber,
                } : formData.providerData,
            };
            await api.post("/users", payload);

            window.location.hash = "#/login";

        } catch {
            /**/
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<div className="w-full min-h-screen">
            <div className="max-w-7xl px-8 py-12 h-16 flex items-center justify-start">
                <BackButton/>
            </div>
            <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md my-6">
                <h1 className="text-2xl font-bold mb-2 text-center text-neutral-dark">Criar conta</h1>
                <p className="text-neutral-medium text-center mb-4">Preencha seus dados para começar</p>

                <UserTypeSelector
                    selectedType={formData.userType}
                    onChange={setUserType}
                />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <PersonalInfoForm
                        formData={formData}
                        onChange={handleChange}
                        showValidation={showValidation}
                    />

                    {formData.userType === "CLIENT" && (<ClientForm
                            formData={formData}
                            onChange={setClient}
                            showValidation={showValidation}
                        />)}

                    {formData.userType === "PROVIDER" && (<ProviderForm
                            formData={formData}
                            onChange={setProvider}
                            showValidation={showValidation}
                        />)}

                    <div className="flex items-center gap-2 my-6">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-medium accent-primary-dark cursor-pointer flex-shrink-0"
                        />
                        <label htmlFor="terms" className="text-sm text-neutral-dark cursor-pointer leading-tight">
                            Eu li e aceito os{" "}
                            <a href="#/terms" className="text-primary-dark font-medium hover:underline">
                                termos de uso
                            </a>{" "}
                            e{" "}
                            <a href="#/terms" className="text-primary-dark font-medium hover:underline">
                                políticas de privacidade
                            </a>
                        </label>
                    </div>

                    {error && <p className="text-status-error text-sm mt-2">{error}</p>}
                    {success && <p className="text-status-success text-sm mt-2">{success}</p>}

                    <SubmitButton
                        isSubmitting={isSubmitting}
                        defaultLabel="Cadastrar"
                        submittingLabel="Cadastrando..."
                    />
                </form>
            </div>
        </div>);
}