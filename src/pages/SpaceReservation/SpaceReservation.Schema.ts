import { z } from 'zod';

export const spaceReservationSchema = z.object({
  name: z.string(),
  condominiumId: z.number(),
});

export type ISpaceReservationFormProps = z.infer<typeof spaceReservationSchema>;
