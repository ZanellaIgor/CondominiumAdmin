import { z } from 'zod';

export const LoginSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

export type ILoginFormProps = z.infer<typeof LoginSchema>;
