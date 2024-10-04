import { IApartamentPageProps } from '@src/pages/Apartament/Apartament.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IGetApartamentParams {
  page: number;
  limit: number;
}

const getApartament = async ({
  page,
  limit,
}: IGetApartamentParams): Promise<IApartamentPageProps> => {
  try {
    const response = await api.get(`/apartament`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching apartament');
  }
};

export const useFindManyApartament = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<IApartamentPageProps> => {
  return useQuery<IApartamentPageProps>({
    queryKey: [EnumQueries.APARTAMENT, page, limit],
    queryFn: () => getApartament({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
