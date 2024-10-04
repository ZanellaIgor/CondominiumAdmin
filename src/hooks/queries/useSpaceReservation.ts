import { ISpaceReservationPageProps } from '@src/pages/SpaceReservation/SpaceReservation.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IGetSpaceReservationParams {
  page: number;
  limit: number;
}

const getSpaceReservation = async ({
  page,
  limit,
}: IGetSpaceReservationParams): Promise<ISpaceReservationPageProps> => {
  try {
    const response = await api.get(`/space-reservation`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching reservations');
  }
};

export const useFindManySpaceReservation = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<ISpaceReservationPageProps> => {
  return useQuery<ISpaceReservationPageProps>({
    queryKey: [EnumQueries.RESERVATION, page, limit],
    queryFn: () => getSpaceReservation({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
