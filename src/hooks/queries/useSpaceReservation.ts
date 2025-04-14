import { ISpaceReservationPageProps } from '@src/pages/SpaceReservation/SpaceReservation.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersSpaceReservation {
  name?: string;
  condominiumId?: number;
}

interface IGetSpaceReservationParams {
  page: number;
  limit: number;
  filters?: IFiltersSpaceReservation | null;
}

const getSpaceReservation = async ({
  page,
  limit,
  filters,
}: IGetSpaceReservationParams): Promise<ISpaceReservationPageProps> => {
  try {
    const response = await api.get(`/space-reservation`, {
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
    throw new Error(`Error fetching space reservations: ${errorMessage}`);
  }
};

export const useFindManySpaceReservation = ({
  page = 1,
  limit = paginationTake,
  filters,
  disabled,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersSpaceReservation | null;
  disabled?: boolean;
}): UseQueryResult<ISpaceReservationPageProps> => {
  return useQuery<ISpaceReservationPageProps>({
    queryKey: [EnumQueries.SPACE_RESERVATION, page, limit, filters],
    queryFn: () => getSpaceReservation({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
    enabled: !disabled,
  });
};
