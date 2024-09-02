import { ReservationsFormProps } from './Reservation.Schema';

export function reservationHelper(
  data: Partial<ReservationsFormProps> | undefined
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
  };

  return data;
}
