import {useState} from "react";
import Input from "../common/Input.tsx";
import {useAuth} from "../../hooks/useAuth";
import SubmitButton from "../common/SubmitButton.tsx";
import {useNavigate} from "react-router-dom";
import {EnvelopeIcon, LockSimpleIcon} from "@phosphor-icons/react";

export default function LoginForm() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Preencha todos os campos");
            return;
        }
        setLoading(true);
        const ok = await login(email, password);
        setLoading(false);
        if (!ok) {
            setError("Email ou senha inválidos");
            return;
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-center text-primary-dark">
                Bem-vindo de volta!
            </h1>
            <p className="text-lg mb-4 font-light text-center text-primary-dark">
                Entre na sua conta para continuar
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    name="email"
                    type="email"
                    value={email}
                    icon={<EnvelopeIcon size={20} />}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    label="E-mail"
                    required
                    error={!email && !!error}
                />
                <Input
                    name="password"
                    type="password"
                    value={password}
                    showPasswordToggle={true}
                    icon={<LockSimpleIcon size={20}/>}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    label="Senha"
                    required
                    error={!password && !!error}
                />
                {error && (
                    <p className="text-status-error text-sm mt-2" role="alert">
                        {error}
                    </p>
                )}

                <SubmitButton
                    isSubmitting={loading}
                    defaultLabel="Entrar"
                    submittingLabel="Entrando..."
                    className="mt-4"
                />
            </form>
            <p className="text-center text-sm text-neutral-dark mt-6">
                Não possui conta?{" "}
                <button
                    onClick={() => navigate('/register')}
                    className="text-primary-medium font-medium hover:underline bg-transparent border-none cursor-pointer"
                >
                    Cadastre-se gratuitamente
                </button>
            </p>
        </div>
    );
}