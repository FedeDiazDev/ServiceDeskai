import { createContext, useContext, useState, ReactNode } from 'react';
import { useGetMeQuery, useLoginMutation, useLogoutMutation } from '../services/authApi';
import { User as ServiceUser } from '../services/userService';

type User = ServiceUser;

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
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [localUser, setLocalUser] = useState<User | null | undefined>(undefined);
    const { data, isLoading: isQueryLoading } = useGetMeQuery();
    const [loginMutation] = useLoginMutation();
    const [logoutMutation] = useLogoutMutation();

    const user = localUser !== undefined ? localUser : (data?.user ?? null);

    const isLoading = isQueryLoading && localUser === undefined;

    const login = async (email: string, password: string) => {
        const response = await loginMutation({ email, password }).unwrap();
        setLocalUser(response.user);
    };

    const logout = async () => {
        await logoutMutation().unwrap();
        setLocalUser(null);
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