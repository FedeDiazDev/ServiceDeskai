import { TicketModel, ITicket } from "../models/Ticket";
import { CreateTicketInput, UpdateTicketInput } from '../schemas/ticket.schema';

export class TicketService {

    async createTicket(ticketData: CreateTicketInput): Promise<ITicket> {
        const { title, description, priority, tags, attachments, createdBy } = ticketData;

        const newTicket : ITicket | null = await TicketModel.create({
            title,
            description,
            priority,
            tags,
            attachments,
            createdBy
        });
        if (!newTicket) {
            throw new Error('TICKET_CREATION_FAILED');
        }
        return newTicket;
    }

    async getTickets(): Promise<ITicket[]> {
        const tickets : ITicket[] | null = await TicketModel.find();
        if (!tickets) {
            throw new Error('TICKETS_NOT_FOUND');
        }
        return tickets;
    }

    async getTicketById(ticketId: string): Promise<ITicket> {
        const ticket : ITicket | null = await TicketModel.findById(ticketId);
        if (!ticket) {
            throw new Error('TICKET_NOT_FOUND');
        }
        return ticket;
    }

    async updateTicket(ticketId: string, updateData: UpdateTicketInput): Promise<ITicket> {
        const updatedTicket : ITicket | null = await TicketModel.findByIdAndUpdate(ticketId, updateData as any, { new: true });
        if (!updatedTicket) {
            throw new Error('TICKET_UPDATE_FAILED');
        }
        return updatedTicket;
    }

    async updateTicketStatus(ticketId: string, status: ITicket['status']): Promise<ITicket> {
        const validStatuses: ITicket['status'][] = ['open', 'assigned', 'in_progress', 'resolved', 'closed'];
        if (!validStatuses.includes(status)) {
            throw new Error('INVALID_STATUS');
        }

        const updatedTicket: ITicket | null = await TicketModel.findByIdAndUpdate(
            ticketId,
            { status },
            { new: true }
        );
        if (!updatedTicket) {
            throw new Error('TICKET_NOT_FOUND');
        }
        return updatedTicket;
    }

    async deleteTicket(ticketId: string): Promise<ITicket> {
        const deletedTicket : ITicket | null = await TicketModel.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            throw new Error('TICKET_DELETION_FAILED');
        }
        return deletedTicket;
    }
}

export const ticketService = new TicketService();