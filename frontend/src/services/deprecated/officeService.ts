import axiosInstance from '../../api/client';

export interface Office {
    _id: string;
    name: string;
    address?: string;
    createdAt: string;
}

export const officeService = {
    getAll: async (): Promise<Office[]> => {
        const response = await axiosInstance.get<Office[]>('/offices');
        return response.data;
    },
};
