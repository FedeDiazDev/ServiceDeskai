import { z } from 'zod';

export const createOfficeSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    city: z.string().min(2, { message: 'City must be at least 2 characters' }),
    location: z.string().min(2, { message: 'Location must be at least 2 characters' }),
    phone: z.string().min(6, { message: 'Phone must be at least 6 characters' })
});
export type CreateOfficeInput = z.infer<typeof createOfficeSchema>;

export const updateOfficeSchema = createOfficeSchema.partial();
export type UpdateOfficeInput = z.infer<typeof updateOfficeSchema>;
