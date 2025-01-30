import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { z } from 'zod';

export const surveyFormModalSchema = z
  .object({
    text: z.string().min(2),
    type: z.nativeEnum(EnumQuestionType),
    options: z
      .array(
        z.object({
          text: z.string().min(2),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === EnumQuestionType.OPTIONAL) {
        return data.options && data.options.length > 0;
      }
      return true;
    },
    {
      message: "As questões são obrigatórias quando tipo for 'Lista de Opções'",
      path: ['options'],
    }
  );

export type ISurveyFormModalProps = z.infer<typeof surveyFormModalSchema> & {
  id?: number;
};
