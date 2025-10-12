import { useState } from "react";
import Input from "../common/Input.tsx";
import { useAuth } from "../../hooks/useAuth";
import SubmitButton from "../common/SubmitButton.tsx";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
      <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary-dark">
          Entrar
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              label="E-mail"
              required
              error={!email && !!error}
          />
          <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
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
              onClick={() => navigateTo('/register')}
              className="text-primary-medium font-medium hover:underline bg-transparent border-none cursor-pointer"
          >
            Cadastre-se
          </button>
        </p>
      </div>
  );
}