import {type JSX, useEffect, useState} from "react";
import LoginPage from "./pages/LoginPage";
import {HomePage} from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ClientHomePage from "./pages/ClientHomePage";
import ProviderHomePage from "./pages/ProviderHomePage";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const {user, loading} = useAuth();
  const [route, setRoute] = useState<string>(
      typeof window !== "undefined" && window.location.hash
          ? window.location.hash.replace("#", "")
          : "/"
  );

  useEffect(() => {
    const handler = () => setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    if (!loading && user && route === "/") {
      const redirectPath = user.userType === "CLIENT" ? "/cliente/home" : "/prestador/home";
      window.location.hash = redirectPath;
      setRoute(redirectPath);
    }
  }, [user, loading, route]);

  if (loading) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-neutral-light text-primary-dark">Carregando...</div>
    );
  }

  let element: JSX.Element;
  switch (route) {
    case "/":
      if (user) {
        element = user.userType === "CLIENT" ? <ClientHomePage/> : <ProviderHomePage/>;
      } else {
        element = <HomePage/>;
      }
      break;
    case "/login":
      element = <LoginPage/>;
      break;
    case "/register":
      element = <RegisterPage/>;
      break;
    case "/cliente/home":
      element = user && user.userType === "CLIENT" ? <ClientHomePage/> : <LoginPage/>;
      break;
    case "/prestador/home":
      element = user && user.userType === "PROVIDER" ? <ProviderHomePage/> : <LoginPage/>;
      break;
    default:
      element = <HomePage/>;
  }

  return element;
}