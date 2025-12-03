import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded as { id: string; role: 'admin' | 'user' | 'service_desk'; email?: string } | jwt.JwtPayload;
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Access denied, no token provided' });
    }
}