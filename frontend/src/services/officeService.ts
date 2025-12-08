import axiosInstance from '../api/client';

export interface Office {
    _id: string;
    name: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
}

console.warn('[deprecated] frontend/src/services/officeService.ts moved to frontend/src/services/deprecated/officeService.ts — use RTK Query hooks instead');
export * from './deprecated/officeService';
