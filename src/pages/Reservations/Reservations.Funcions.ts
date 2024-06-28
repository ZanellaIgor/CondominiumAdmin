import { ReservationsRegisterProps } from './Reservations.Schema';

export function reservationHelper(data: ReservationsRegisterProps | undefined) {
  data = {
    id: data?.id ?? undefined,
    title: data?.title ?? '',
    category: data?.category ?? '',
    severity: data?.severity ?? '',
    status: data?.status ?? false,
    created_at: data?.created_at ?? '',
  };
  return data;
}
