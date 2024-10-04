import { z } from 'zod';

export const apartamentSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string(),
  condominiumId: z.number(),
  userId: z.number(),
});

export type IApartamentFormProps = z.infer<typeof apartamentSchema>;
