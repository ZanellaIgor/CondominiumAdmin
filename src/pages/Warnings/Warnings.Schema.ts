import { z } from 'zod';
export const WarningsSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  title: z.string(),
  category: z.string(),
  severity: z.string(),
  status: z.boolean(),
  created_at: z.string().optional(),
});
export type WarningRegisterProps = z.infer<typeof WarningsSchema>;
