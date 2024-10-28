import { IApartamentPageProps } from '@src/pages/Apartament/Apartament.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IFiltersApartament {
  condominiumIds?: number[];
  name?: string;
}
interface IGetApartamentParams {
  page: number;
  limit: number;
  filters?: IFiltersApartament;
}

const getApartament = async ({
  page,
  limit,
  filters,
}: IGetApartamentParams): Promise<IApartamentPageProps> => {
  try {
    const response = await api.get(`/apartament`, {
      params: {
        page,
        limit,
        ...filters,
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
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersApartament;
}): UseQueryResult<IApartamentPageProps> => {
  return useQuery<IApartamentPageProps>({
    queryKey: [EnumQueries.APARTAMENT, page, limit, filters],
    queryFn: () => getApartament({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
