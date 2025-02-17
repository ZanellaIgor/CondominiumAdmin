export function mapperUser(data: any) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? '',
    email: data?.email ?? '',
    status: data?.id ? data.status : true,
    condominiumIds: data?.condominiumIds ?? [],
    apartmentIds: data?.apartmentIds ?? [],
  };
  return data;
}
