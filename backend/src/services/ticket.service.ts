import { TicketModel, ITicket } from "../models/Ticket";
import { CreateTicketInput, UpdateTicketInput } from '../schemas/ticket.schema';
import { UserModel } from '../models/User';

interface CreateTicketData extends CreateTicketInput {
    createdBy: string;
}

interface TicketFilters {
    status?: string;
    priority?: string;
    createdBy?: string;
}


export class TicketService {

    private async findLeastBusyServiceUser(): Promise<string | null> {
        const serviceUsers = await UserModel.find({ role: 'service' }).select('_id');

        if (serviceUsers.length === 0) {
            return null;
        }

        const ticketCounts = await Promise.all(
            serviceUsers.map(async (user) => {
                const count = await TicketModel.countDocuments({
                    assignedTo: user._id,
                    status: { $nin: ['resolved', 'closed'] }
                });
                return { userId: user._id.toString(), count };
            })
        );

        ticketCounts.sort((a, b) => a.count - b.count);
        return ticketCounts[0].userId;
    }

    async createTicket(ticketData: CreateTicketData): Promise<ITicket> {
        const { title, description, priority, tags, attachments, createdBy, office, workstation, geolocation } = ticketData;

        const assignedTo = await this.findLeastBusyServiceUser();

        const newTicket: ITicket | null = await TicketModel.create({
            title,
            description,
            priority,
            tags,
            attachments,
            createdBy,
            office,
            workstation,
            geolocation,
            ...(assignedTo && { assignedTo }),
            status: assignedTo ? 'assigned' : 'open'
        });
        if (!newTicket) {
            throw new Error('TICKET_CREATION_FAILED');
        }
        // devolver ticket poblado para frontend
        const populated = await TicketModel.findById(newTicket._id)
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');
        return populated as ITicket;
    }

    async getTickets(filters?: TicketFilters): Promise<ITicket[]> {
        const query: any = {};
        if (filters?.status) query.status = filters.status;
        if (filters?.priority) query.priority = filters.priority;
        if (filters?.createdBy) query.createdBy = filters.createdBy;
        const tickets: ITicket[] | null = await TicketModel.find(query)
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');

        if (!tickets) {
            return [];
        }
        return tickets;
    }

    async getTicketById(ticketId: string): Promise<ITicket> {
        const ticket: ITicket | null = await TicketModel.findById(ticketId)
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');
        if (!ticket) {
            throw new Error('TICKET_NOT_FOUND');
        }
        return ticket;
    }

    async updateTicket(ticketId: string, updateData: UpdateTicketInput): Promise<ITicket> {
        const updatedTicket: ITicket | null = await TicketModel.findByIdAndUpdate(ticketId, updateData as any, { new: true });
        if (!updatedTicket) {
            throw new Error('TICKET_UPDATE_FAILED');
        }
        const populated = await TicketModel.findById(updatedTicket._id)
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');
        return populated as ITicket;
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
        const populated = await TicketModel.findById(updatedTicket._id)
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');
        return populated as ITicket;
    }

    async deleteTicket(ticketId: string): Promise<ITicket> {
        const deletedTicket: ITicket | null = await TicketModel.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            throw new Error('TICKET_DELETION_FAILED');
        }
        return deletedTicket;
    }

    async assignTicket(ticketId: string, assignedTo: string): Promise<ITicket> {
        const ticket = await TicketModel.findByIdAndUpdate(
            ticketId,
            { assignedTo, status: 'assigned' },
            { new: true }
        );
        if (!ticket) {
            throw new Error('TICKET_NOT_FOUND');
        }
        const populated = await TicketModel.findById(ticket._id)
            .populate('createdBy', 'name surname')
            .populate('assignedTo', 'name surname')
            .populate('office', 'name');
        return populated as ITicket;
    }
}

export const ticketService = new TicketService();