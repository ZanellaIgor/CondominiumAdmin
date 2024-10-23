import { IApartamentDataProps } from './Apartament.Interface';

export function apartamentHelper(
  data: Partial<IApartamentDataProps> | undefined
) {
  data = {
    name: data?.name ?? undefined,
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
