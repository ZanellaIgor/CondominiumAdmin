import { ISpaceReservationDataProps } from './SpaceReservation.Interface';

export function spaceReservationHelper(
  data: Partial<ISpaceReservationDataProps> | undefined
) {
  data = {
    name: data?.name ?? '',
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
