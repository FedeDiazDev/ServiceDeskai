import { z } from 'zod';
import { objectIdSchema } from './common.schema';

const geolocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracy: z.number().optional(),
  address: z.string().optional(),
});

export const createTicketSchema = z.object({
  title: z.string().min(3, { message: 'Title is required and must be at least 3 characters' }),
  description: z.string().min(6, { message: 'Description must be at least 6 characters' }),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  office: objectIdSchema.optional(),
  workstation: z.string().optional(),
  geolocation: geolocationSchema.optional(),
});

export const updateTicketSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(6).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  office: objectIdSchema.optional(),
  workstation: z.string().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['open', 'assigned', 'in_progress', 'resolved', 'closed']),
});

export const assignTicketSchema = z.object({
  assignedTo: objectIdSchema,
});

export const listTicketsQuery = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  status: z.enum(['open', 'assigned', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type AssignTicketInput = z.infer<typeof assignTicketSchema>;
export type ListTicketsQuery = z.infer<typeof listTicketsQuery>;
