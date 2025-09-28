import { z } from 'zod';

export const ticketSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters long' }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters long',
    }),
    priority: z.enum(['low', 'medium', 'high'], {
        message: 'Priority must be one of: low, medium, high',
    }),
    status: z.enum(['open', 'in_progress', 'closed'], {
        message: 'Status must be one of: open, in_progress, closed',
    }),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
