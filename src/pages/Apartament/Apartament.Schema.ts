import { z } from 'zod';

export const apartamentSchema = z.object({
  name: z.string(),
  condominiumId: z.number(),
});

export type IApartamentFormProps = z.infer<typeof apartamentSchema>;
