import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumSituationReservation } from '@src/utils/enum/situationReservation.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { IReservationPageProps } from '../../pages/Reservation/Reservation.Interface';

export interface IFiltersReservation {
  situation?: EnumSituationReservation;
  title?: string;
}

interface IGetReservationParams {
  page: number;
  limit?: number;
  filters?: IFiltersReservation | null;
}

const getReservation = async ({
  page,
  limit,
  filters,
}: IGetReservationParams): Promise<IReservationPageProps> => {
  try {
    const response = await api.get(`/reservation`, {
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
    throw new Error(`Error fetching reservations: ${errorMessage}`);
  }
};

export const useFindManyReservation = ({
  page = 1,
  limit = paginationTake,
  filters,
}: IGetReservationParams): UseQueryResult<IReservationPageProps> => {
  return useQuery<IReservationPageProps>({
    queryKey: [EnumQueries.RESERVATION, page, limit, filters],
    queryFn: () => getReservation({ page, limit, filters: filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
