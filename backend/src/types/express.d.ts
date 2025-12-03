//* Extend Express Request interface to include user property for authenticated user information
//* Before (req): body, params, query
//* After (req): body, params, query, user
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'admin' | 'user' | 'service_desk';
        email?: string;
      } | JwtPayload; 
    }
  }
}

export {};