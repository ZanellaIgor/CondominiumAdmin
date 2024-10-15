import { z } from 'zod';

export const condominiumSchema = z.object({
  name: z.string(),
});

export type ICondominiumFormProps = z.infer<typeof condominiumSchema>;
