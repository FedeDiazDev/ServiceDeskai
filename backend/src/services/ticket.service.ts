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

    async getTicketById(ticketId : string){
        const ticket = await TicketModel.findById(ticketId);
        if (!ticket){
            throw new Error('TICKET_NOT_FOUND');
        }
        return ticket;
    }

    async updateTicket(ticketId: string, updateData: Partial<ITicket>){
        const updatedTicket = await TicketModel.findByIdAndUpdate(ticketId, updateData, { new: true });
        if (!updatedTicket){
            throw new Error('TICKET_UPDATE_FAILED');
        }
        return updatedTicket;
    }
    async deleteTicket (ticketId: string){
        const deletedTicket = await TicketModel.findByIdAndDelete(ticketId);
        if (!deletedTicket){
            throw new Error('TICKET_DELETION_FAILED');
        }
        return deletedTicket;
    }
}

export const ticketService = new TicketService();