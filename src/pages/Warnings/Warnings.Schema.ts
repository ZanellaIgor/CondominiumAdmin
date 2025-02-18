import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { z } from 'zod';

export const warningsSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.nativeEnum(EnumCategory),
  situation: z.nativeEnum(EnumSituation),
  condominiumId: z.number().optional(),
});

export type IWarningFormProps = z.infer<typeof warningsSchema>;
