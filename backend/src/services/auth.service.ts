import { UserModel, IUser } from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


type RegisterUserDTO = Pick<IUser, 'name' | 'surname' | 'email' | 'password'> & {
    role?: IUser['role'];
};

type LoginUserDTO = {
    email: string;
    password: string;
};

export class AuthService {

    private generateToken(userId: string): string {
        const secret = process.env.JWT_SECRET as string;
        return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
    }

    async registerUser(userData: RegisterUserDTO): Promise<IUser> {
        const { name, surname, email, password, role } = userData;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('USER_ALREADY_EXISTS');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password as string, salt);

        const newUser = await UserModel.create({
            name,
            surname,
            email,
            password: hashedPassword,
            role
        });

        return newUser;
    }

    async loginUser(userData: LoginUserDTO): Promise<string> {
        const { email, password } = userData;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const token = this.generateToken(existingUser._id.toString());
        return token;
    }


}

export const authService = new AuthService();