import axiosInstance from '../api/client';
import { TicketPriority } from '../types/ticket';

export interface GeneratedTicketData {
    title: string;
    description: string;
    priority: TicketPriority;
    tags: string[];
}

interface AnalyzeImageResponse {
    success: boolean;
    isValid: boolean;
    message?: string;
    data?: GeneratedTicketData;
}

export class ImageRejectedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ImageRejectedError';
    }
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const aiService = {
    analyzeImage: async (file: File): Promise<GeneratedTicketData> => {
        const image = await fileToBase64(file);
        const mimeType = file.type;

        try {
            const response = await axiosInstance.post<AnalyzeImageResponse>('/ai/analyze', {
                image,
                mimeType,
            });

            if (!response.data.data) {
                throw new Error('Invalid response');
            }

            return response.data.data;
        } catch (error: any) {
            // Check if it's a rejection from AI (400 with isValid: false)
            if (error.response?.status === 400 && error.response?.data?.isValid === false) {
                throw new ImageRejectedError(error.response.data.message);
            }
            throw error;
        }
    },
};
