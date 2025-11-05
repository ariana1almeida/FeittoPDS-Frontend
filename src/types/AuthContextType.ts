import type {LoginResponse} from "./LoginResponse.ts";

export interface AuthContextType {
    authData: LoginResponse | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}