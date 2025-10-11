import React, { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import type {AuthContextType} from "../types/AuthContextType.ts";
import type {LoginResponse} from "../types/LoginResponse.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "authData";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);

                const isTokenValid = Date.now() < (parseInt(parsed.expiresIn, 10) * 1000 + Date.now());
                if (isTokenValid) {
                    setData(parsed);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }

        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
        setLoading(false);
    }, []);

    //TODO: verificar se o memoized do useCallback pode dar problema
    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await api.post<LoginResponse>("/login", { email, password });

            setData(res.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
            navigate("/");

            return true;
        } catch {
            console.error("Erro ao fazer login");
            return false;
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setData(null);
        localStorage.removeItem(STORAGE_KEY);
        navigate("/");
    }, [navigate]);

    return (
        <AuthContext.Provider
            value={{
                authData:data || null,
                token: data?.token || null,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
