import type {ProfileResponse} from "../types/ProfileResponse.ts";
import {api} from "./api.ts";
import type {RatingResponse} from "../types/RatingResponse.ts";

export interface CreateOrUpdateRatingInput {
    ratedById: string;
    ratedUserId: string;
    score: number;
    comment: string;
    serviceId?: string;
}

export class RatingService {
    private static instance: RatingService;

    private constructor() {}

    static getInstance(): RatingService {
        if (!RatingService.instance) {
            RatingService.instance = new RatingService();
        }
        return RatingService.instance;
    }

    createOrUpdateRating = async (data: CreateOrUpdateRatingInput): Promise<ProfileResponse> => {
        const res = await api.put(`/ratings`, data);
        return res.data as ProfileResponse;
    }

    getRatingByPairedIds = async (ratedById: string, ratedUserId: string): Promise<RatingResponse> => {
        const res = await api.get(`/ratings/${ratedById}/${ratedUserId}`);
        return res.data as RatingResponse;
    }
}
