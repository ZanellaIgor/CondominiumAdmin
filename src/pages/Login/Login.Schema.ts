import { z } from 'zod';

export const LoginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export type ILoginFormProps = z.infer<typeof LoginSchema>;
