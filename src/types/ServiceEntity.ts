export interface ServiceEntity {
    id: string;
    picture: string;
    title: string;
    description: string;
    category: string;
    status: string;
    createdAt: string;
    client: {
        id: string;
        firstName: string;
        lastName: string;
        userType: string;
        averageRating: number;
        numberOfRatings: number;
        neighborhood?: string;
        city?: string;
    };
}