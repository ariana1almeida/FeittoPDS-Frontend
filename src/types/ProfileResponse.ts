import type {UserType} from "./form.ts";

export interface ProfileResponse {
    city?: string;
    state?: string;
    firstName?: string;
    lastName?: string;
    neighborhood?: string;
    phone?: string;
    userType?: UserType;
    userData?: UserDataDto;
}

interface UserDataDto {
    street?: string;
    houseNumber?: number;
    reference?: string;
    profession?: string;
}