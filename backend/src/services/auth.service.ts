import { UserModel, IUser, UserResponse, toUserResponse } from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';

export class AuthService {

    private generateToken(userId: string, role: string): string {
        const secret = process.env.JWT_SECRET as string;
        return jwt.sign({ id: userId, role }, secret, { expiresIn: '7d' });
    }

    async registerUser(userData: RegisterInput): Promise<UserResponse> {
        const { name, surname, email, password, role } = userData;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('USER_ALREADY_EXISTS');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser: IUser | null = await UserModel.create({
            name,
            surname,
            email,
            password: hashedPassword,
            role
        });
        return toUserResponse(newUser);
    }

    async loginUser(userData: LoginInput): Promise<{ token: string; user: UserResponse }> {
        const { email, password } = userData;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const token = this.generateToken(existingUser._id.toString(), existingUser.role);
        return { token, user: toUserResponse(existingUser) };
    }

    async me(userId: string): Promise<UserResponse> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return toUserResponse(user);
    }
}

export const authService = new AuthService();