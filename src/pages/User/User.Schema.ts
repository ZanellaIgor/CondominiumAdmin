import { z } from 'zod';
export const userSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  profilePhoto: z.string().optional(),
  apartmentIds: z.array(z.number()).optional(),
  condominiumIds: z.array(z.number()).optional(),
});

export type IUserFormProps = z.infer<typeof userSchema> & {
  role: string;
};
