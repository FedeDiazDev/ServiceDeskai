import {Schema, model, Types, Document } from "mongoose";

export interface ITicket extends Document{
    title: string;
    description: string;
    status:'open' | 'assigned' | 'in_progrsess' | 'resolved' | 'closed';
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    tags: string[];
    attachments: string[];
}

const ticketSchema = new Schema<ITicket>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'assigned', 'in_progrsess', 'resolved', 'closed'], default: 'open' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    tags: [{ type: String }],
    attachments: [{ type: String }]
}, { timestamps: true });

export const TicketModel = model<ITicket>('Ticket', ticketSchema);