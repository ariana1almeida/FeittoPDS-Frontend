import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen w-full bg-accent-yellow px-4 py-10 text-white flex flex-col items-center">
      <div className="max-w-md w-full bg-neutral-light rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl text-primary-dark font-bold mb-4">Home</h1>
        <p className="mb-6 text-primary-dark text-sm">
          Usuário logado: <span className="font-mono">{user?.uid}</span>
        </p>
        <button
          onClick={logout}
          className="bg-accent-yellow text-primary-dark font-semibold px-5 py-2 rounded-lg hover:bg-accent-yellow-hover text-sm"
        >
          Sair
        </button>
      </div>
    </div>
  );
}