import { z } from 'zod';
export const surveySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type SurveyForm = z.infer<typeof surveySchema>;
