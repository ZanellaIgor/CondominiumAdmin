import { ICondominiumPageProps } from '@src/pages/Condominium/Condominium.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersCondominium {
  name?: string;
  userId?: number;
}
interface IGetCondominiumParams {
  page: number;
  limit: number;
  filters?: IFiltersCondominium | null;
}

const getCondominium = async ({
  page,
  limit,
  filters,
}: IGetCondominiumParams): Promise<ICondominiumPageProps> => {
  try {
    const response = await api.get(`/condominium`, {
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
    throw new Error(`Error fetching condominium: ${errorMessage}`);
  }
};

export const useFindManyCondominium = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersCondominium | null;
}): UseQueryResult<ICondominiumPageProps> => {
  return useQuery<ICondominiumPageProps>({
    queryKey: [EnumQueries.CONDOMINUM, page, limit, filters],
    queryFn: () => getCondominium({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
