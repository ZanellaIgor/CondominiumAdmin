import { IApartamentDataProps } from './Apartament.Interface';

export function apartamentSchemaHelper(
  data: Partial<IApartamentDataProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? undefined,
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
