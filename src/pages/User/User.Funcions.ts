export function userHelper(data: any) {
  data = {
    id: data?.id ?? undefined,
    name: data?.name ?? '',
    email: data?.email ?? '',
    status: data?.id ? data.status : true,
  };
  return data;
}
