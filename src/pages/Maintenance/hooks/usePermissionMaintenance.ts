import { usePermissionRole } from '@src/hooks/permission/use-permission-role';
import { useAuth } from '@src/hooks/useAuth';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';

export const usePermissionMaintenance = () => {
  const { userInfo } = useAuth();
  const { validateRole } = usePermissionRole();

  const validadeUpdateMaintenance = ({
    userId,
    situation,
  }: {
    userId: number;
    situation: EnumSituation;
  }) => {
    if (validateRole([EnumRoles.ADMIN, EnumRoles.MASTER])) return true;
    if (userInfo?.userId === userId && situation === EnumSituation.ABERTO)
      return true;

    return false;
  };

  return { validadeUpdateMaintenance };
};
