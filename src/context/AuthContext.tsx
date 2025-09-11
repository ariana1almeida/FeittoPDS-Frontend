import React, { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

interface AuthData {
  token: string;
  refreshToken: string;
  expiresAt: number;
  uid: string;
}

interface AuthContextType {
  user: { uid: string } | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "authData";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: AuthData = JSON.parse(raw);
        if (parsed.expiresAt > Date.now()) {
          setData(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });
      const { token, refreshToken, expiresIn, uid } = res.data as {
        token: string; refreshToken: string; expiresIn: string; uid: string;
      };
      const expiresAt = Date.now() + parseInt(expiresIn, 10) * 1000;
      const authData: AuthData = { token, refreshToken, uid, expiresAt };
      setData(authData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      return true;
    } catch{
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setData(null);
    localStorage.removeItem(STORAGE_KEY);
    window.location.hash = "#/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data ? { uid: data.uid } : null,
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

