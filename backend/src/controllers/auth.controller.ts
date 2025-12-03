import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { authService } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {

    const { name, surname, email, password, role } = req.body;
    if (!name || !surname || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newUser = await authService.registerUser({ name, surname, email, password, role });
        return res.status(201).json({
            success: true, message: 'User registered successfully', data: {
                id: newUser._id,
                email: newUser.email
            }
        });
    } catch (error: any) {
        if (error.message === 'USER_ALREADY_EXISTS') {
            return res.status(400).json({ message: 'User already exists' });
        }
        console.error('Error in registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

export const loginUser = async (req: Request, res: Response) => { };