import { Request, Response } from "express";
import { ticketService } from "../services/ticket.service";

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority, tags, attachments } = req.body;
    const createdBy = (req.user as { id: string }).id;

    if (!title || !description) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const newTicket = await ticketService.createTicket({
            title,
            description,
            priority,
            tags,
            attachments,
            createdBy
        });
        res.status(201).json(newTicket);
        return;
    } catch (error: any) {
        if (error.message === 'TICKET_CREATION_FAILED') {
            res.status(400).json({ message: 'Ticket creation failed' });
            return;
        }
        console.error('Error in ticket creation:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const tickets = await ticketService.getTickets();
        res.status(200).json(tickets);
        return;
    } catch (error: any) {
        if (!error.message) {
            res.status(404).json({ message: 'No tickets found' });
            return;
        }
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
        return ; 
    }
};

export const getTicketById = async (req: Request, res: Response) : Promise<void>=> {
    const ticketId = req.params.id;
    try {
        const ticket = await ticketService.getTicketById(ticketId);
        res.status(200).json(ticket);
        return ;
    } catch (error: any) {
        if (error.message === 'TICKET_NOT_FOUND') {
            res.status(404).json({ message: 'Ticket not found' });
            return ;
        }
        console.error('Error fetching ticket by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
        return ;
    }
};


export const updateTicket = async (req: Request, res: Response) : Promise<void>=> {
    const ticketId = req.params.id;
    const updateData = req.body;
    try {
        const updatedTicket = await ticketService.updateTicket(ticketId, updateData);
        res.status(200).json(updatedTicket);
        return ;
    } catch (error: any) {
        if (error.message === 'TICKET_UPDATE_FAILED') {
            res.status(404).json({ message: 'Ticket update failed' });
            return ;
        }
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
        return ;
    }
};

export const deleteTicket = async (req: Request, res: Response) : Promise<void>=> {
    const ticketId = req.params.id;
    try {
        const deletedTicket = await ticketService.deleteTicket(ticketId);
        res.status(200).json(deletedTicket);
        return ;
    } catch (error: any) {
        if (error.message === 'TICKET_DELETION_FAILED') {
            res.status(404).json({ message: 'Ticket deletion failed' });
            return ;
        }
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
        return ;
    }
};