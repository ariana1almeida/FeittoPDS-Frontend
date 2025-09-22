import { api } from "./api";

export interface Service {
  id: string;
  foto: string;
  titulo: string;
  descricao: string;
  categoria: string;
  status: string;
  createdAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
}

export interface CreateServiceData {
  foto: string;
  titulo: string;
  descricao: string;
  categoria: string;
  clientId: string;
}

export const createService = async (serviceData: CreateServiceData): Promise<Service> => {
  const response = await api.post("/services", serviceData);
  return response.data as Service;
};

export const getServicesByClient = async (clientId: string): Promise<Service[]> => {
  const response = await api.get(`/services/client/${clientId}`);
  return response.data as Service[];
};

export const deleteService = async (serviceId: string): Promise<void> => {
  await api.delete(`/services/${serviceId}`);
};
