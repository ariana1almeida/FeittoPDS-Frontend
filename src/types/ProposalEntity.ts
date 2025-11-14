export interface ProposalEntity {
    id?: string;
    serviceId: string;
    providerId: string;
    estimatedPrice: number;
    estimatedDays: number;
    description: string;
    accepted?: boolean;
    service?:{
        title: string;
        picture: string;
        description: string;
    };
    provider?:{
        name: string;
        picture?: string;
        averageRating: number;
        numberOfRatings: number;
    }
}