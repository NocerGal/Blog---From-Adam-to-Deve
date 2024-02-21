import { ZodType, z } from 'zod';

export type ModifyPostFormSchema = {
  title: string;
  postDescription: string;
  content: string;
};

export const zodModifyPostFormSchema: ZodType<ModifyPostFormSchema> = z.object({
  title: z.string().min(8).max(100),
  postDescription: z.string().min(20).max(500),
  content: z.string().min(10),
});
