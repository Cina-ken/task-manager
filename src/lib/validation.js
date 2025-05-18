
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High']).default('Low'),
  status: z.enum(['To-Do', 'Done']).default('To-Do'),
});