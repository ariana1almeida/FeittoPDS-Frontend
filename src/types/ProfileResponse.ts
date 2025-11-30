import type {UserType} from "./form.ts";

export interface ProfileResponse {
    id?: string;
    city?: string;
    state?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    neighborhood?: string;
    phone?: string;
    userType?: UserType;
    userData?: UserDataDto;
    averageRating?: number;
    totalRatings?: number;
    numberOfRatings?: number;
}

export interface UserDataDto {
    street?: string;
    houseNumber?: number;
    reference?: string;
    professions?: string[];
}