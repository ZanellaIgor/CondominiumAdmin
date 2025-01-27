import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { z } from 'zod';

export const surveyFormModalSchema = z.object({
  text: z.string().min(2),
  type: z.nativeEnum(EnumQuestionType),
  options: z.array(
    z.object({
      text: z.string().min(2),
    })
  ),
});

export type ISurveyFormModalProps = z.infer<typeof surveyFormModalSchema> & {
  id?: number;
};
