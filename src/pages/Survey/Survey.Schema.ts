import { z } from 'zod';
export const surveySchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  title: z.string(),
  category: z.string(),
  severity: z.string(),
  status: z.boolean(),
  created_at: z.string().optional(),
  dateReservation: z.string().optional(),
});
export type SurveyRegisterProps = z.infer<typeof surveySchema>;
