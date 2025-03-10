import { usePermissionRole } from '@src/hooks/permission/use-permission-role';
import { useAuth } from '@src/hooks/useAuth';
import { EnumRoles } from '@src/utils/enum/role.enum';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';

export const usePermissionReservation = () => {
  const { userInfo } = useAuth();
  const { validateRole } = usePermissionRole();

  const validadeUpdateReservation = ({
    userId,
    statusReservation,
  }: {
    userId: number;
    statusReservation: EnumSituationReservation;
  }) => {
    if (validateRole([EnumRoles.ADMIN, EnumRoles.MASTER])) return true;
    if (
      userInfo?.userId === userId &&
      statusReservation === EnumSituationReservation.ABERTO
    )
      return true;

    return false;
  };

  return { validadeUpdateReservation };
};
