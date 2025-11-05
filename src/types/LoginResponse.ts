export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiresIn: string;
    uid: string;
    userType: "CLIENT" | "PROVIDER";
    redirectUrl: string;
}