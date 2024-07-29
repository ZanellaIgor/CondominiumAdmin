import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { z } from 'zod';
export const WarningsSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  title: z.string(),
  description: z.string(),
  category: z.nativeEnum(EnumCategory),
  situation: z.nativeEnum(EnumSituation),
  created_at: z.string().optional(),
});
export type WarningRegisterProps = z.infer<typeof WarningsSchema> & {
  userId: number;
  condominiumId: number;
};
