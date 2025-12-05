import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type UserRole = 'admin' | 'user' | 'service';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded as { id: string; role: UserRole; email?: string } | jwt.JwtPayload;
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

export const requireRole = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as { id: string; role: UserRole } | undefined;

        if (!user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};


export const requireOwnershipOrAdmin = (paramName: string = 'id') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as { id: string; role: UserRole } | undefined;
        const resourceId = req.params[paramName];

        if (!user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (user.role === 'admin') {
            return next();
        }

        if (user.id !== resourceId) {
            return res.status(403).json({ message: 'Access denied. You can only access your own data.' });
        }

        next();
    };
};

export const requireStaff = requireRole(['admin', 'service']);