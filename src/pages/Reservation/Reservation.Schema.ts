import { z } from 'zod';

export const reservationsSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  title: z.string(),
  description: z.string(),
  situation: z.string().optional(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  created_at: z.string().optional(),
  dateReservation: z.date().optional(),
  spaceReservationId: z.number(),
});

export type IReservationsFormProps = z.infer<typeof reservationsSchema> & {
  apartmentId: number;
  condominiumId: number;
  userId: number;
  status: boolean;
};
