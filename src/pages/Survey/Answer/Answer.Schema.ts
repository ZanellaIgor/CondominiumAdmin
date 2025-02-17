import { z } from 'zod';

export const answerSchema = z.object({
  surveyId: z.number(),
  questions: z.array(
    z.object({
      questionId: z.number(),
      answer: z.union([z.string(), z.number()]),
    })
  ),
});
