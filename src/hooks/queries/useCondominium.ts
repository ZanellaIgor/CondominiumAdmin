import { ICondominiumPageProps } from '@src/pages/Condominium/Condominium.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IFilters {
  name?: string;
  userId?: number;
}
interface IGetCondominiumParams {
  page: number;
  limit: number;
  filter?: IFilters;
}

const getCondominium = async ({
  page,
  limit,
  filter,
}: IGetCondominiumParams): Promise<ICondominiumPageProps> => {
  try {
    const response = await api.get(`/condominium`, {
      params: {
        page,
        limit,
        ...filter,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching Condominium');
  }
};

export const useFindManyCondominium = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFilters;
}): UseQueryResult<ICondominiumPageProps> => {
  return useQuery<ICondominiumPageProps>({
    queryKey: [EnumQueries.CONDOMINUM, page, limit, filters],
    queryFn: () => getCondominium({ page, limit, filter: filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
