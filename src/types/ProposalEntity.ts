export interface ProposalEntity {
    id?: string;
    serviceId: string;
    providerId: string;
    estimatedPrice: number;
    estimatedDays: number;
    description: string;
    accepted?: boolean;
    service?:{
        clientId: string
        title: string;
        picture: string;
        description: string;
        status: string;
    };
    provider?:{
        firstName: string;
        lastName: string;
        name: string;
        picture?: string;
        phone: string;
        averageRating: number;
        numberOfRatings: number;
        providerData?:{
            id: string;
            professions?: string[];
            userId: string;
        }
    }
}