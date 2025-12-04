import { Request, Response } from 'express';
import { userService } from '../services/user.service';


export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
        return;
    } catch (error: any) {
        if (error.message === 'USER_NOT_FOUND') {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const tickets = await userService.getAllUsers();
        res.status(200).json(tickets);
        return;
    } catch (error: any) {
        if (error.message === 'USERS_NOT_FOUND') {
            res.status(404).json({ message: 'No users found' })
            return;
        }
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;


    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => { };

export const changeUserRole = async (req: Request, res: Response): Promise<void> => { };

export const resetUserPassword = async (req: Request, res: Response): Promise<void> => { };

export const deleteUser = async (req: Request, res: Response): Promise<void> => { };
