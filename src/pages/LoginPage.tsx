import LoginForm from "../components/auth/LoginForm";
import Header from "../components/common/Header.tsx";
import Footer from "../components/common/Footer.tsx";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-accent-yellow flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}