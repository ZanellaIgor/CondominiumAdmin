export function userHelper(data: any) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? '',
    email: data?.email ?? '',
  };
  return data;
}
