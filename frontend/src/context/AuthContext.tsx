import axios from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/client';

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('...');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/auth/me');
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axiosInstance.post('/auth/login', { email, password });
        setUser(response.data.user);
    };

    const logout = async () => {
        await axiosInstance.post('/auth/logout');
        setUser(null);
    };

    const hasRole = (roles: string[]) => {
        return user ? roles.includes(user.role) : false;
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};