import { z } from 'zod';
import { surveyFormModalSchema } from './Survey.Form.Modal.Schema';
export const surveySchema = z.object({
  title: z.string(),
  description: z.string(),
  validFrom: z.string(),
  validTo: z.string(),
  questions: z.array(surveyFormModalSchema),
});

export type ISurveyForm = z.infer<typeof surveySchema>;
