import {type JSX, useEffect, useState} from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading } = useAuth();
  const [route, setRoute] = useState<string>(
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace("#", "")
      : "/login"
  );

  useEffect(() => {
    const handler = () => setRoute(window.location.hash.replace("#", "") || "/login");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light text-primary-dark">Carregando...</div>
    );
  }

  let element: JSX.Element;
  switch (route) {
    case "/login":
      element = <LoginPage />;
      break;
    case "/register":
      element = <RegisterPage />;
      break;
    case "/home":
      element = user ? <HomePage /> : <LoginPage />;
      break;
    default:
      element = <LoginPage />;
  }

  return element;
}