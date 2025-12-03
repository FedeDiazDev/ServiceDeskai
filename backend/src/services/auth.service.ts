import { UserModel, IUser } from "../models/User";
import bcrypt from 'bcryptjs';


type RegisterUserDTO = Pick<IUser, 'name' | 'surname' | 'email' | 'password'> & {
  role?: IUser['role'];
};


export class AuthService {

    async registerUser(userData : RegisterUserDTO) {
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
}

export const authService = new AuthService();