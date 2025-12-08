import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request<{}, {}, RegisterInput>, res: Response): Promise<void> => {
    const { name, surname, email, password, role } = req.body;
    try {
        const newUser = await authService.registerUser({ name, surname, email, password, role });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser.id,
                email: newUser.email,
            },
        });
    } catch (error: any) {
        if (error.message === 'USER_ALREADY_EXISTS') {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req: Request<{}, {}, LoginInput>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.loginUser({ email, password });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, user });
    } catch (error: any) {
        if (error.message === 'INVALID_CREDENTIALS' || error.message === 'USER_NOT_FOUND') {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const me = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
        const user = await authService.me(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ user });
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token');
    res.send('Logged out successfully');
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
        const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};