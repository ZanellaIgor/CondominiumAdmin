import { z } from 'zod';
import { surveyFormModalSchema } from './Survey.Form.Modal.Schema';

export const surveySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
  validFrom: z.date(),
  validTo: z.date(),
  questions: z.array(surveyFormModalSchema),
});

export type ISurveyForm = z.infer<typeof surveySchema>;
