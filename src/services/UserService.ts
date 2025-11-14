import { api } from "./api";
import type {UserType} from "../types/form.ts";
import type {ProfileResponse, UserDataDto} from "../types/ProfileResponse.ts";

export interface UserUpdateInput{
    city?: string;
    state?: string;
    firstName?: string;
    lastName?: string;
    neighborhood?: string;
    phone?: string;
    userType?: UserType;
    userData?: UserDataDto;
}

export class UserService {
    private static instance: UserService;

    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    updateUserInformation = async (firebaseUid: string, userData: UserUpdateInput): Promise<ProfileResponse> => {
        const res = await api.put(`/users/${firebaseUid}`, userData);
        return res.data as ProfileResponse;
    }

    getUserProfileInformation = async (firebaseUid: string): Promise<ProfileResponse> => {
        const res = await api.get(`/users/${firebaseUid}`);
        return res.data as ProfileResponse;
    }
}
