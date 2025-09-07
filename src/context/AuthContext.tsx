import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type User } from "./AuthContextDefinition";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export type { User } from "./AuthContextDefinition";
