import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { z } from 'zod';

export const maintenanceSchema = z.object({
  title: z.string(),
  description: z.string(),
  situation: z.nativeEnum(EnumSituation).optional(),
  category: z.nativeEnum(EnumCategory),
  condominiumId: z.number().optional(),
});

export type IMaintenanceFormProps = z.infer<typeof maintenanceSchema>;
