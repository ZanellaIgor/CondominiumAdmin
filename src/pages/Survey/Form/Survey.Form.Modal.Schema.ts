import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { z } from 'zod';

export const surveyFormModalSchema = z.object({
  text: z.string(),
  type: z.nativeEnum(EnumQuestionType),
  options: z
    .array(
      z.object({
        text: z.string(),
      })
    )
    .optional(),
});

export type ISurveyFormModalProps = z.infer<typeof surveyFormModalSchema> & {
  id?: number;
};
