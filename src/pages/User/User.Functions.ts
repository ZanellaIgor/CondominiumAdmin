import { IUserPageDataProps } from './User.Interface';
import { IUserFormProps } from './User.Schema';

export function mapperUser(
  data: Partial<IUserPageDataProps> | undefined
): Partial<IUserFormProps> {
  return {
    name: data?.name ?? '',
    email: data?.email ?? '',
    role: data?.role,
    status: data?.id ? data.status : true,
    condominiumIds: data?.condominiums?.map((c) => c.id) ?? [],
    apartmentIds: data?.apartments?.map((a) => a.id) ?? [],
  };
}
