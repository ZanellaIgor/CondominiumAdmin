import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const maintenanceSchema = z.object({
  title: z.string().min(1, msgRequired),
  description: z.string().min(1, msgRequired),
  situation: z.nativeEnum(EnumSituation).optional(),
  category: z.nativeEnum(EnumCategory),
  condominiumId: z.number().optional(),
});

export type IMaintenanceFormProps = z.infer<typeof maintenanceSchema>;
