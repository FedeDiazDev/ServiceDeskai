import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'service';
    office?: Types.ObjectId;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'service'], default: 'user' },
    office: { type: Schema.Types.ObjectId, ref: 'Office' },
    avatarUrl: { type: String }
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);
