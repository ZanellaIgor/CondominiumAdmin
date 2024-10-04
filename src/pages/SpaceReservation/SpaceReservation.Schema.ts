import { z } from 'zod';

export const spaceReservationSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string(),
  condominiumId: z.number(),
});

export type ISpaceReservationFormProps = z.infer<typeof spaceReservationSchema>;
