import { ISpaceReservationDataProps } from './SpaceReservation.Interface';

export function spaceReservationHelper(
  data: Partial<ISpaceReservationDataProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? undefined,
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
