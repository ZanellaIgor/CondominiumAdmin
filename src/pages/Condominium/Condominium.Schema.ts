import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const condominiumSchema = z.object({
  name: z.string().min(1, msgRequired),
});

export type ICondominiumFormProps = z.infer<typeof condominiumSchema>;
