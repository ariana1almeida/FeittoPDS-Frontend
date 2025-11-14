import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/common/Input";
import SubmitButton from "../components/common/SubmitButton";
import { LockIcon } from "@phosphor-icons/react";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!password || !confirmPassword) {
            setError("Por favor, preencha todos os campos");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        if (!token) {
            setError("Token inválido ou expirado");
            return;
        }

        setLoading(true);
        try {
            await api.post("/reset-password", { token, password });
            setMessage("Senha alterada com sucesso!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao alterar senha. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-light min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 text-center text-primary-dark">
                    Redefinir senha
                </h1>
                <p className="text-lg mb-4 font-light text-center text-primary-dark">
                    Digite sua nova senha
                </p>
                <form onSubmit={handleChangePassword} className="space-y-6">
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        showPasswordToggle={true}
                        icon={<LockIcon size={20} />}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua nova senha"
                        label="Nova senha"
                        required
                        error={!password && !!error}
                    />

                    <Input
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        showPasswordToggle={true}
                        icon={<LockIcon size={20} />}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua nova senha"
                        label="Confirmar senha"
                        required
                        error={!confirmPassword && !!error}
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
                        defaultLabel="Alterar senha"
                        submittingLabel="Alterando..."
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