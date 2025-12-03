import { Schema, model, Document, Types } from 'mongoose';

interface Ioffice extends Document{
    name: string;
    location: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
const officeSchema = new Schema<Ioffice>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

export const OfficeModel = model<Ioffice>('Office', officeSchema);