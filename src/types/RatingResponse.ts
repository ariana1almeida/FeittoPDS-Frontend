import type {ProfileResponse} from "./ProfileResponse.ts";

export interface RatingResponse {
    id?: string;
    ratedById?: string;
    ratedBy?: ProfileResponse;
    ratedUserId?: string;
    ratedUser?: ProfileResponse;
    serviceId?: string;
    score?: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}