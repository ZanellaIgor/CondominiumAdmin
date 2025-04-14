import { IMaintenancePageProps } from '@src/pages/Maintenance/Maintenance.Inteface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersMaintenance {
  title?: string;
  situation?: EnumSituation;
}

interface IGetMaintenanceParams {
  page: number;
  limit?: number;
  filters?: IFiltersMaintenance | null;
}

const getMaintenance = async ({
  page,
  limit,
  filters,
}: IGetMaintenanceParams): Promise<IMaintenancePageProps> => {
  try {
    const response = await api.get(`/maintenance`, {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error fetching maintenances: ${errorMessage}`);
  }
};

export const useFindManyMaintenance = ({
  page = 1,
  limit = paginationTake,
  filters,
}: IGetMaintenanceParams): UseQueryResult<IMaintenancePageProps> => {
  return useQuery<IMaintenancePageProps>({
    queryKey: [EnumQueries.MAINTENANCE, page, limit, filters],
    queryFn: () => getMaintenance({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
