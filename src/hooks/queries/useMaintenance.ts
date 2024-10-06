import { IMaintenancePageProps } from '@src/pages/Maintenance/Maintenance.Inteface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IGetMaintenanceParams {
  page: number;
  limit: number;
}

const getApartament = async ({
  page,
  limit,
}: IGetMaintenanceParams): Promise<IMaintenancePageProps> => {
  try {
    const response = await api.get(`/maintenance`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching maintenance');
  }
};

export const useFindManyMaintenance = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<IMaintenancePageProps> => {
  return useQuery<IMaintenancePageProps>({
    queryKey: [EnumQueries.APARTAMENT, page, limit],
    queryFn: () => getApartament({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
