import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-neutral-light flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <LoginForm />
      </div>
    </div>
  );
}