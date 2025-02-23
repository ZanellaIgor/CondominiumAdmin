import { EnumRoles } from '@src/utils/enum/role.enum';
import { useAuth } from '../useAuth';

export const usePermissionRole = () => {
  const { userInfo } = useAuth();

  const validateRole = (roles: EnumRoles[]): boolean =>
    userInfo?.role ? roles.includes(userInfo.role) : false;

  return { validateRole };
};
