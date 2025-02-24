import { IApartmentPageProps } from '@src/pages/Apartment/Apartment.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IFiltersApartment {
  condominiumIds?: number[];
  name?: string;
  userId?: number;
}
interface IGetApartmentParams {
  page: number;
  limit: number;
  filters?: IFiltersApartment;
}

const getApartment = async ({
  page,
  limit,
  filters,
}: IGetApartmentParams): Promise<IApartmentPageProps> => {
  try {
    const response = await api.get(`/apartment`, {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching apartment');
  }
};

export const useFindManyApartment = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersApartment;
}): UseQueryResult<IApartmentPageProps> => {
  return useQuery<IApartmentPageProps>({
    queryKey: [EnumQueries.APARTMENT, page, limit, filters],
    queryFn: () => getApartment({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
