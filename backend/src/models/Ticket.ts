import {Schema, model, Types, Document } from "mongoose";

export interface IGeolocation {
    latitude: number;
    longitude: number;
    accuracy?: number;
    address?: string;
}

export interface ITicket extends Document{
    title: string;
    description: string;
    status:'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    office?: Types.ObjectId;
    workstation?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    tags: string[];
    attachments: string[];
    geolocation?: IGeolocation;
}

const geolocationSchema = new Schema<IGeolocation>({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    accuracy: { type: Number },
    address: { type: String }
}, { _id: false });

const ticketSchema = new Schema<ITicket>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'assigned', 'in_progress', 'resolved', 'closed'], default: 'open' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    office: { type: Schema.Types.ObjectId, ref: 'Office' },
    workstation: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    tags: [{ type: String }],
    attachments: [{ type: String }],
    geolocation: { type: geolocationSchema }
}, { timestamps: true });

export const TicketModel = model<ITicket>('Ticket', ticketSchema);