import { z } from 'zod';

export const articleSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters long' }),
    content: z
        .string()
        .min(10, { message: 'Content must be at least 10 characters long' }),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
