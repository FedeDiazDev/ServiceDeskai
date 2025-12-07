import axiosInstance from '../api/client';
import { Ticket } from '../types/ticket';

export const ticketService = {
    // Obtener todos los tickets
    getAll: async (): Promise<Ticket[]> => {
        const response = await axiosInstance.get<Ticket[]>('/tickets');
        return response.data;
    },

    // Obtener un ticket por ID
    getById: async (id: string): Promise<Ticket> => {
        const response = await axiosInstance.get<Ticket>(`/tickets/${id}`);
        return response.data;
    },

    // Crear un ticket
    create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
        const response = await axiosInstance.post<Ticket>('/tickets/create', ticketData);
        return response.data;
    },

    // Actualizar un ticket
    update: async (id: string, ticketData: Partial<Ticket>): Promise<Ticket> => {
        const response = await axiosInstance.put<Ticket>(`/tickets/${id}`, ticketData);
        return response.data;
    },

    // Eliminar un ticket
    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/tickets/${id}`);
    },
};
