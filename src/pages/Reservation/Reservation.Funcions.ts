import { ReservationsFormProps } from './Reservation.Schema';

export function reservationHelper(
  data: Partial<ReservationsFormProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    situation: data?.situation ?? '',
    dateReservation: data?.dateReservation ?? new Date(),
    endDateTime: data?.endDateTime ?? undefined,
    startDateTime: data?.startDateTime ?? undefined,
    spaceReservationId: data?.spaceReservationId ?? undefined,
  };
  return data;
}
