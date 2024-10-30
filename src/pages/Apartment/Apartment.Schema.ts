import { z } from 'zod';

export const apartmentSchema = z.object({
  name: z.string(),
  condominiumId: z.number(),
});

export type IApartmentFormProps = z.infer<typeof apartmentSchema>;
