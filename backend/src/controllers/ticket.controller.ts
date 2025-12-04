import { Request, Response } from "express";
import { ticketService } from "../services/ticket.service";

export const createTicket = async (req: Request, res: Response) => {
    const { title, description, priority, tags, attachments } = req.body;
    const createdBy = (req.user as { id: string }).id;

    if (!title || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
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
        return res.status(201).json(newTicket);
    }catch(error:any){
        if (error.message === 'TICKET_CREATION_FAILED') {
            return res.status(400).json({ message: 'Ticket creation failed' });
        }
        console.error('Error in ticket creation:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 };

export const getTickets = async (req: Request, res: Response) => { };

export const getTicketById = async (req: Request, res: Response) => { };


export const updateTicket = async (req: Request, res: Response) => { };

export const deleteTicket = async (req: Request, res: Response) => { };