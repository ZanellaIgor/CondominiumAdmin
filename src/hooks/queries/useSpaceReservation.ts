import { ISpaceReservationPageProps } from '@src/pages/SpaceReservation/SpaceReservation.Interface';
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
  condominiumId?: number;
}

interface IGetSpaceReservationParams {
  page: number;
  limit: number;
  filter?: IFilters;
}

const getSpaceReservation = async ({
  page,
  limit,
  filter,
}: IGetSpaceReservationParams): Promise<ISpaceReservationPageProps> => {
  try {
    const response = await api.get(`/space-reservation`, {
      params: {
        page,
        limit,
        ...filter,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching space reservation');
  }
};

export const useFindManySpaceReservation = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFilters;
}): UseQueryResult<ISpaceReservationPageProps> => {
  return useQuery<ISpaceReservationPageProps>({
    queryKey: [EnumQueries.SPACE_RESERVATION, page, limit, filters],
    queryFn: () => getSpaceReservation({ page, limit, filter: filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
