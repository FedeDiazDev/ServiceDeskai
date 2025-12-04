import { TicketModel, ITicket } from "../models/Ticket";


type CreateTicketDTO = Pick<ITicket, 'title' | 'description' | 'priority' | 'tags' | 'attachments'> & {
    createdBy: string;
};
export class TicketService {

    async createTicket ( ticketData: CreateTicketDTO) {
        const { title, description, priority, tags, attachments, createdBy } = ticketData;

        const newTicket = await TicketModel.create({
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

    async getTickets(){
        const tickets = await TicketModel.find();
        if (!tickets) {
            throw new Error('TICKETS_NOT_FOUND');
        }
        return tickets;
    }
}

export const ticketService = new TicketService();