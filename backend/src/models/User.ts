import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;    
    surname: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'service';
    office?: Types.ObjectId;
    avatarUrl?: string;
}

export interface UserResponse {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: 'admin' | 'user' | 'service';
    office?: string;
    avatarUrl?: string;
}

export const toUserResponse = (user: IUser): UserResponse => ({
    id: user._id.toString(),
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    office: user.office?.toString(),
    avatarUrl: user.avatarUrl
});
const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true,trim: true },    
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user', 'service'], lowercase: true, trim: true, default: 'user' },
    office: { type: Schema.Types.ObjectId, ref: 'Office' },
    avatarUrl: { type: String }
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);
