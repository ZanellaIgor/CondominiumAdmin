import { z } from 'zod';
export const reservationsSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  title: z.string(),
  description: z.string(),
  situation: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  created_at: z.string().optional(),
  dateReservation: z.date().optional(),
  spaceReservationId: z.number().optional(),
});
export type ReservationsFormProps = z.infer<typeof reservationsSchema> & {
  apartmentId: number;
  condominiumId: number;
  userId: number;
};
