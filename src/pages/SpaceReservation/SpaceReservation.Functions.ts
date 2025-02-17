import { ISpaceReservationDataProps } from './SpaceReservation.Interface';

export function mapperSpaceReservation(
  data: Partial<ISpaceReservationDataProps> | undefined
) {
  data = {
    name: data?.name ?? '',
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
