import type {ProposalEntity} from "../types/ProposalEntity.ts";
import {api} from "./api.ts";

export class ProposalService {
    private static instance: ProposalService;

    private constructor() {
    }

    static getInstance(): ProposalService {
        if (!ProposalService.instance) {
            ProposalService.instance = new ProposalService();
        }
        return ProposalService.instance;
    }

    createProposal = async (proposalData: ProposalEntity): Promise<ProposalEntity> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {service, provider ,...payload} = proposalData;
        const response = await api.post("/proposal", payload);
        return response.data as ProposalEntity;
    };

    updateProposal = async (proposalId: string, proposalData: Partial<ProposalEntity>): Promise<ProposalEntity> => {
        const response = await api.put(`/proposal/${proposalId}`, proposalData);
        return response.data as ProposalEntity;
    };

    deleteProposal = async (proposalId: string): Promise<void> => {
        await api.delete(`/proposal/${proposalId}`);
    }

    getAllProposalsByServiceId = async (serviceId: string | undefined): Promise<ProposalEntity[]> => {
        const response = await api.get(`/proposal/${serviceId}`);
        return response.data as ProposalEntity[];
    }

    getAllProposalsByProviderId = async (providerId: string | undefined): Promise<ProposalEntity[]> => {
        const response = await api.get(`/proposal/provider/${providerId}`);
        return response.data as ProposalEntity[];
    };

    deleteAllProposalsFromServiceOtherThanAccepted = async (serviceId: string): Promise<void> => {
        await api.delete(`/proposal/service/${serviceId}`);
    }
}