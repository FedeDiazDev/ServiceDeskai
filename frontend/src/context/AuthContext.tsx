import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    if (!context) throw new Error('...');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { data, isFetching } = useGetMeQuery();
    const [loginMutation] = useLoginMutation();
    const [logoutMutation] = useLogoutMutation();

    useEffect(() => {
        setUser(data?.user ?? null);
    }, [data]);

    const isLoading = isFetching;

    const login = async (email: string, password: string) => {
        const response = await loginMutation({ email, password }).unwrap();
        setUser(response.user);
    };

    const logout = async () => {
        await logoutMutation().unwrap();
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