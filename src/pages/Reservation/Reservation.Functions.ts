import { ChipProps } from '@mui/material/Chip';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import { IReservationsFormProps } from './Reservation.Schema';

export function mapperReservation(
  data: Partial<IReservationsFormProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    situation: data?.situation ?? '',
    dateReservation: data?.dateReservation ?? new Date(),
    endDateTime: data?.endDateTime ? new Date(data?.endDateTime) : undefined,
    startDateTime: data?.startDateTime
      ? new Date(data?.startDateTime)
      : undefined,
    spaceReservationId: data?.spaceReservationId ?? undefined,
    status: data?.status ?? true,
  };

  return data;
}

export function reservationChipTableCategory(
  value: EnumSituationReservation | undefined
): {
  label: string;
  color: ChipProps['color'];
} {
  switch (value) {
    case EnumSituationReservation.ABERTO:
      return { label: 'Alta', color: 'primary' };
    case EnumSituationReservation.ANALISE:
      return { label: 'Crítica', color: 'warning' };
    case EnumSituationReservation.CONFIRMADO:
      return { label: 'Média', color: 'success' };

    default:
      return { label: 'Não informado', color: 'primary' };
  }
}
