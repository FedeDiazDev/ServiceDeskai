import axiosInstance from '../api/client';
import { Ticket, Geolocation, TicketPriority } from '../types/ticket';

export interface CreateTicketData {
    title: string;
    description: string;
    priority: TicketPriority;
    tags: string[];
    attachments?: string[];
    workstation?: string;
    geolocation?: Geolocation;
}

export const ticketService = {
    // Get all tickets
    getAll: async (): Promise<Ticket[]> => {
        const response = await axiosInstance.get<Ticket[]>('/tickets');
        return response.data;
    },

    // Get ticket by ID
    getById: async (id: string): Promise<Ticket> => {
        const response = await axiosInstance.get<Ticket>(`/tickets/${id}`);
        return response.data;
    },

    // Create a ticket
    create: async (ticketData: CreateTicketData): Promise<Ticket> => {
        const response = await axiosInstance.post<Ticket>('/tickets/create', ticketData);
        return response.data;
    },

    // Update a ticket
    update: async (id: string, ticketData: Partial<Ticket>): Promise<Ticket> => {
        const response = await axiosInstance.put<Ticket>(`/tickets/${id}`, ticketData);
        return response.data;
    },

    // Patch status
    patchStatus: async (id: string, status: string): Promise<Ticket> => {
        const response = await axiosInstance.patch<Ticket>(`/tickets/${id}/status`, { status });
        return response.data;
    },

    // Delete a ticket
    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/tickets/${id}`);
    },
};
