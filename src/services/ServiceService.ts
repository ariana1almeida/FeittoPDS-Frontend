import { api } from "./api";
import type {ServiceType} from "../types/ServiceType.ts";
import type {ServiceEntity} from "../types/ServiceEntity.ts";

export class ServiceService {
    private static instance: ServiceService;

    private constructor() {}

    static getInstance(): ServiceService {
        if (!ServiceService.instance) {
            ServiceService.instance = new ServiceService();
        }
        return ServiceService.instance;
    }

    createService = async (serviceData: ServiceType): Promise<ServiceEntity> => {
        const response = await api.post("/services", serviceData);
        return response.data as ServiceEntity;
    };

    getServicesByClient = async (clientId: string): Promise<ServiceEntity[]> => {
        const response = await api.get(`/services/client/${clientId}`);
        return response.data as ServiceEntity[];
    };
    getAllServices = async (): Promise<ServiceEntity[]> => {
        const response = await api.get("/services");
        return response.data as ServiceEntity[];
    }

    deleteService = async (serviceId: string): Promise<void> => {
        await api.delete(`/services/${serviceId}`);
    };
}
