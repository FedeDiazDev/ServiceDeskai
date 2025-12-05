import axiosInstance from '../api/client';
import { Ticket } from '../types/ticket';

export interface TicketsResponse {
    success: boolean;
    data: Ticket[];
    total?: number;
}

export interface TicketResponse {
    success: boolean;
    data: Ticket;
}

export const ticketService = {
    // Obtener todos los tickets
    getAll: async (): Promise<Ticket[]> => {
        const response = await axiosInstance.get<TicketsResponse>('/tickets');
        return response.data.data;
    },

    // Obtener un ticket por ID
    getById: async (id: string): Promise<Ticket> => {
        const response = await axiosInstance.get<TicketResponse>(`/tickets/${id}`);
        return response.data.data;
    },

    // Crear un ticket
    create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
        const response = await axiosInstance.post<TicketResponse>('/tickets', ticketData);
        return response.data.data;
    },

    // Actualizar un ticket
    update: async (id: string, ticketData: Partial<Ticket>): Promise<Ticket> => {
        const response = await axiosInstance.put<TicketResponse>(`/tickets/${id}`, ticketData);
        return response.data.data;
    },

    // Eliminar un ticket
    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/tickets/${id}`);
    },
};
