export interface LoginResponse {
    id: string;
    token: string;
    refreshToken: string;
    expiresIn: string;
    uid: string;
    userType: "CLIENT" | "PROVIDER";
}