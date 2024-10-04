import { z } from 'zod';

export const condominiumSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string(),
});

export type ICondominiumFormProps = z.infer<typeof condominiumSchema>;
