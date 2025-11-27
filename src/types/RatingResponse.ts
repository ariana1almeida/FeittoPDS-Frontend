export interface RatingResponse {
    id?: string;
    ratedById?: string;
    ratedUserId?: string;
    serviceId?: string;
    score?: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}