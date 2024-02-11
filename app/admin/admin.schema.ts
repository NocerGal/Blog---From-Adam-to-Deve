import { ZodType, z } from 'zod';

export type AdminFormSchema = {
  selfDescription?: string;
  name: string;
  image?: string;
};

export const zodAdminFormSchema: ZodType<AdminFormSchema> = z.object({
  selfDescription: z.string().min(10).optional(),
  name: z.string().min(2),
  image: z.string().url().optional(),
});
