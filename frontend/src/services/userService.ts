import axiosInstance from '../api/client';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'service' | 'admin';
    office?: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export const userService = {
    getAll: async (): Promise<User[]> => {
        const response = await axiosInstance.get<User[]>('/users');
        return response.data;
    },
};
