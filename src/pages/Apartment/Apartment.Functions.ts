import { IApartmentDataProps } from './Apartment.Interface';

export function mapperApartment(
  data: Partial<IApartmentDataProps> | undefined
) {
  data = {
    name: data?.name ?? undefined,
    condominiumId: data?.condominiumId ?? undefined,
  };

  return data;
}
