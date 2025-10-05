import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const spaceReservationSchema = z.object({
  name: z.string().min(1, msgRequired),
  condominiumId: z.number({ message: msgRequired }),
});

export type ISpaceReservationFormProps = z.infer<typeof spaceReservationSchema>;
