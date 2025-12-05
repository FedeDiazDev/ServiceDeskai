import { Schema, model, Document, Types } from 'mongoose';

export interface Ioffice extends Document{
    name: string;
    location: string;
    phone: string;
}
const officeSchema = new Schema<Ioffice>({
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    phone: { type: String, required: true }
}, { timestamps: true });

export const OfficeModel = model<Ioffice>('Office', officeSchema);