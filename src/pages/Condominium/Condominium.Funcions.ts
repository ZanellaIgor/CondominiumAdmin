import { IApartamentDataProps } from '../Apartament/Apartament.Interface';

export function condominiumSchemaHelper(
  data: Partial<IApartamentDataProps> | undefined
) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? undefined,
  };

  return data;
}
