import {api} from "./api";
import type {ServiceEntity} from "../types/ServiceEntity.ts";

export interface CreateServiceData {
    picture?: string;
    title?: string;
    description?: string;
    category?: string;
    firebaseUid?: string;
}

export class ServiceService {
    private static instance: ServiceService;

    private constructor() {}

    static getInstance(): ServiceService {
        if (!ServiceService.instance) {
            ServiceService.instance = new ServiceService();
        }
        return ServiceService.instance;
    }

    createService = async (serviceData: CreateServiceData): Promise<ServiceEntity> => {
        const response = await api.post("/services", serviceData);
        return response.data as ServiceEntity;
    };

    getServicesByClient = async (clientId: string): Promise<ServiceEntity[]> => {
        const response = await api.get(`/services/client/${clientId}`);
        return response.data as ServiceEntity[];
    };

    getServiceById = async (serviceId: string | undefined): Promise<ServiceEntity> => {
        const response = await api.get(`/services/${serviceId}`);
        return response.data as ServiceEntity;
    }

    updateServiceStatus = async (serviceId: string, status: string): Promise<ServiceEntity> => {
        const response = await api.patch(`/services/${serviceId}/status`, { status });
        return response.data as ServiceEntity;
    }

    getAllServices = async (): Promise<ServiceEntity[]> => {
        const response = await api.get("/services");
        return response.data as ServiceEntity[];
    };

    deleteService = async (serviceId: string): Promise<void> => {
        await api.delete(`/services/${serviceId}`);
    };
}
