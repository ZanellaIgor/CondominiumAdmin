import { EnumRoles } from '@src/utils/enum/role.enum';
import { msgRequired } from '@src/utils/messages/messages';
import { z } from 'zod';

export const userSchema = z.object({
  id: z
    .number()
    .transform((value) => Number(value))
    .optional(),
  name: z.string().min(1, msgRequired),
  email: z.string().min(1, msgRequired),
  password: z.string().min(1, msgRequired),
  profilePhoto: z.string().optional(),
  apartmentIds: z
    .union([z.number(), z.array(z.number())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .optional()
    .default([]),
  condominiumIds: z
    .union([z.number(), z.array(z.number())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .optional()
    .default([]),
  role: z.nativeEnum(EnumRoles),
  status: z.boolean(),
});

export type IUserFormProps = z.infer<typeof userSchema> & {
  condominiumIds: number[];
};
