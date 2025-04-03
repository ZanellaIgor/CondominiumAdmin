import { api } from "@src/services/api.service";

import { EnumQueries } from "@src/utils/enum/queries.enum";
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

const getDashboard = async (): Promise<any> => {
  try {
    const response = await api.get(`/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching dashboard");
  }
};

export const useDashboard = (): UseQueryResult<any> => {
  return useQuery<any>({
    queryKey: [EnumQueries.DASHBOARD],
    queryFn: () => getDashboard(),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
