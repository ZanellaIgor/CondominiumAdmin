import { IDashboardDataProps } from "@src/pages/Dashboard/Dashboard.Interface";
import { api } from "@src/services/api.service";

import { EnumQueries } from "@src/utils/enum/queries.enum";
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

const getDashboard = async (): Promise<IDashboardDataProps> => {
  try {
    const response = await api.get(`/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching dashboard");
  }
};

export const useDashboard = (): UseQueryResult<IDashboardDataProps> => {
  return useQuery<IDashboardDataProps>({
    queryKey: [EnumQueries.DASHBOARD],
    queryFn: () => getDashboard(),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
