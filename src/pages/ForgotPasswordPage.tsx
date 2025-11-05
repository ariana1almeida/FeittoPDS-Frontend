import {useState} from "react";
import {api} from "../services/api";
import {useNavigate} from "react-router-dom";
import Input from "../components/common/Input";
import SubmitButton from "../components/common/SubmitButton";
import {EnvelopeIcon} from "@phosphor-icons/react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Por favor, digite seu e-mail");
            return;
        }

        setLoading(true);
        try {
            await api.post("/forgot-password", {email});
            setMessage("E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao enviar e-mail. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-light min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 text-center text-primary-dark">
                    Recuperar senha
                </h1>
                <p className="text-lg mb-4 font-light text-center text-primary-dark">
                    Digite seu e-mail para receber instruções de redefinição
                </p>
                <form onSubmit={handleReset} className="space-y-6">
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        icon={<EnvelopeIcon size={20}/>}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        label="E-mail"
                        required
                        error={!email && !!error}
                    />

                    {error && (
                        <p className="text-status-error text-sm" role="alert">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-status-success text-sm" role="alert">
                            {message}
                        </p>
                    )}

                    <SubmitButton
                        isSubmitting={loading}
                        defaultLabel="Enviar e-mail"
                        submittingLabel="Enviando..."
                    />
                </form>

                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-primary-medium hover:underline bg-transparent border-none cursor-pointer"
                    >
                        Voltar para login
                    </button>
                </div>
            </div>
        </div>
    );
}
