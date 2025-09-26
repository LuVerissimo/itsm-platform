import { z } from 'zod';

export const userSchema = z.object({
     name: z.string().min(2, { message: "Name must be at least 2 characters long"}),
     email: z.email({ message: "Invalid email address"}),
     role: z.string().min(1, { message: "Role is required"}),
});

export type UserFormData = z.infer<typeof userSchema>;