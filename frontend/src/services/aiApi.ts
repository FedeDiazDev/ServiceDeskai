import { api } from './api';
import { TicketPriority } from '../types/ticket';


export interface GeneratedTicketData {
  title: string;
  description: string;
  priority: TicketPriority;
  tags: string[];
}

export interface AnalyzeImageResponse {
  success: boolean;
  isValid: boolean;
  data?: GeneratedTicketData;
  message?: string;
}

export class ImageRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageRejectedError';
  }
}

export const aiApi = api.injectEndpoints({
  endpoints: (build) => ({
    analyzeImage: build.mutation<AnalyzeImageResponse, { image: string; mimeType: string }>({
      query: (body) => ({ url: '/ai/analyze', method: 'POST', body }),
    }),
  }),
});

export const { useAnalyzeImageMutation } = aiApi;

