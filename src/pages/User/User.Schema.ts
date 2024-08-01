import { z } from 'zod';
export const userSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export type IUserFormProps = z.infer<typeof userSchema> & {
  userId: number;
  condominiumId: number;
  status: boolean;
};
