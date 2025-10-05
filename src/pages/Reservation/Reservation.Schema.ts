import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const reservationsSchema = z.object({
  title: z.string().min(1, msgRequired),
  description: z.string().min(1, msgRequired),
  startDateTime: z.date({ message: msgRequired }),
  endDateTime: z.date({ message: msgRequired }),
  created_at: z.string().optional(),
  dateReservation: z.date().optional(),
  spaceReservationId: z.number({ message: msgRequired }),
  condominiumId: z.number({ message: msgRequired }),
  userId: z.number().optional(),
  apartmentId: z.number().optional(),
  situation: z.nativeEnum(EnumSituationReservation).optional(),
});

export type IReservationsFormProps = z.infer<typeof reservationsSchema> & {
  userId: number;
  id?: number;
  situation: EnumSituationReservation;
};
