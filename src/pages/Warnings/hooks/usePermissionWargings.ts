import { usePermissionRole } from '@src/hooks/permission/use-permission-role';
import { useAuth } from '@src/hooks/useAuth';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';

export const usePermissionWargings = () => {
  const { userInfo } = useAuth();
  const { validateRole } = usePermissionRole();

  const validadeUpdateWarning = ({
    userId,
    statusWarning,
  }: {
    userId: number;
    statusWarning: EnumSituation;
  }) => {
    if (validateRole([EnumRoles.ADMIN, EnumRoles.MASTER])) return true;
    if (userInfo?.userId === userId && statusWarning === EnumSituation.ABERTO)
      return true;

    return false;
  };

  return { validadeUpdateWarning };
};
