import { TicketModel, ITicket } from "../models/Ticket";

type CreateTicketDTO = Pick<ITicket, 'title' | 'description' | 'priority' | 'tags' | 'attachments'> & {
    createdBy: string;
};

export class TicketService {

    async createTicket(ticketData: CreateTicketDTO): Promise<ITicket> {
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

    async updateTicket(ticketId: string, updateData: Partial<ITicket>): Promise<ITicket> {
        const updatedTicket : ITicket | null = await TicketModel.findByIdAndUpdate(ticketId, updateData, { new: true });
        if (!updatedTicket) {
            throw new Error('TICKET_UPDATE_FAILED');
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