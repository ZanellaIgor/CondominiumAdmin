import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const warningsSchema = z.object({
  title: z.string().min(1, msgRequired),
  description: z.string().min(1, msgRequired),
  category: z.nativeEnum(EnumCategory),
  situation: z.nativeEnum(EnumSituation),
  condominiumId: z.number({ message: msgRequired }),
});

export type IWarningFormProps = z.infer<typeof warningsSchema>;
