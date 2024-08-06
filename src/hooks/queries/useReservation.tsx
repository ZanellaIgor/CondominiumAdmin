import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { IReservationPageProps } from '../../pages/Reservation/Reservation.Interface';

interface IGetReservationParams {
  page: number;
  limit: number;
}

const getReservation = async ({
  page,
  limit,
}: IGetReservationParams): Promise<IReservationPageProps> => {
  try {
    const response = await api.get(`/reservation`, {
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

export const useFindManyReservation = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<IReservationPageProps> => {
  return useQuery<IReservationPageProps>({
    queryKey: [EnumQueries.RESERVATION, page, limit],
    queryFn: () => getReservation({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
