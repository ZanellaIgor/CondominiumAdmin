import { ReservationsFormProps } from './Reservation.Schema';

export function reservationHelper(
  data: Partial<ReservationsFormProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    situation: data?.situation ?? '',
    dateReservation: data?.dateReservation ?? new Date(),
    endTime: data?.endTime ?? undefined,
    startTime: data?.startTime ?? undefined,
    spaceReservationId: data?.spaceReservationId ?? undefined,
  };
  return data;
}
