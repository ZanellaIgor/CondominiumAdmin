import { ChipProps } from '@mui/material/Chip';
import { IUser } from '@src/contexts/AuthContext';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import { IReservationDataProps } from './Reservation.Interface';
import { IReservationsFormProps } from './Reservation.Schema';

export function mapperReservation(
  data: Partial<IReservationDataProps> | undefined,
  userInfo: IUser | undefined
): Partial<IReservationsFormProps> {
  return {
    title: data?.title ?? '',
    endDateTime: data?.endDateTime ? new Date(data?.endDateTime) : undefined,
    startDateTime: data?.startDateTime
      ? new Date(data?.startDateTime)
      : undefined,
    spaceReservationId: data?.spaceReservationId ?? undefined,
    userId: data?.userId ?? userInfo?.userId,
    condominiumId: data?.condominiumId ?? userInfo?.condominiumIds?.[0],
    situation: data?.situation,
    apartmentId: data?.apartament?.id ?? undefined,
    description: data?.description ?? '',
  };
}

export function reservationChipTableCategory(
  value: EnumSituationReservation | undefined
): {
  label: string;
  color: ChipProps['color'];
} {
  switch (value) {
    case EnumSituationReservation.ABERTO:
      return { label: 'Aberto', color: 'primary' };
    case EnumSituationReservation.ANALISE:
      return { label: 'Análise', color: 'warning' };
    case EnumSituationReservation.CONFIRMADO:
      return { label: 'Confirmado', color: 'success' };
    case EnumSituationReservation.REPROVADO:
      return { label: 'Reprovado', color: 'success' };

    default:
      return { label: 'Não informado', color: 'primary' };
  }
}
