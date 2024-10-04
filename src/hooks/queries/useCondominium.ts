import { ICondominiumPageProps } from '@src/pages/Condominium/Condominium.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IGetCondominiumParams {
  page: number;
  limit: number;
}

const getCondominium = async ({
  page,
  limit,
}: IGetCondominiumParams): Promise<ICondominiumPageProps> => {
  try {
    const response = await api.get(`/condominium`, {
      params: {
        page,
        limit,
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
}): UseQueryResult<ICondominiumPageProps> => {
  return useQuery<ICondominiumPageProps>({
    queryKey: [EnumQueries.CONDOMINUM, page, limit],
    queryFn: () => getCondominium({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
