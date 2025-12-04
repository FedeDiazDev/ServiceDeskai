import { UserModel, IUser } from "../models/User";



export class UserService {
    async getUserById(userId: string): Promise<IUser> {
        const user: IUser | null = await UserModel.findById(userId);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return user;
    }
    async getAllUsers(): Promise<IUser[]> {
        const users: IUser[] | null = await UserModel.find();
        if (!users) {
            throw new Error('USERS_NOT_FOUND');
        }
        return users;
    }

    async updateUser(userId: string, updatedData: Partial<IUser>): Promise<IUser> {
        const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            throw new Error('USER_UPDATED_FAILED');
        }
        return updatedUser;
    }
    async changeUserRole(userId: string, newRole: IUser['role']): Promise<IUser> { 
        const updatedUser : IUser | null = await UserModel.findByIdAndUpdate(userId, { role: newRole },{ new: true });
        if (!updatedUser) {
            throw new Error('USER_NOT_FOUND');
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<IUser> {
        const deletedUser : IUser | null = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser){
            throw new Error('USER_DELETION_FAILED');
        }
        return deletedUser;
     }
}

export const userService = new UserService();