import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const apartmentSchema = z.object({
  name: z.string().min(1, msgRequired),
  condominiumId: z.number({ message: msgRequired }),
});

export type IApartmentFormProps = z.infer<typeof apartmentSchema>;
