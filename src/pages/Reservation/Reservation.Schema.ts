import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import { z } from 'zod';

export const reservationsSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  created_at: z.string().optional(),
  dateReservation: z.date().optional(),
  spaceReservationId: z.number(),
  condominiumId: z.number(),
  userId: z.number().optional(),
});

export type IReservationsFormProps = z.infer<typeof reservationsSchema> & {
  userId: number;
  id?: number;
  status: boolean;
  situation: EnumSituationReservation;
};
