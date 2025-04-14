import { IUserPageProps } from '@src/pages/User/User.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersUser {
  name?: string;
  condominiunsId?: number[];
}

interface IGetUsersParams {
  page: number;
  limit: number;
  filters?: IFiltersUser | null;
}

const getWarnings = async ({
  page,
  limit,
  filters,
}: IGetUsersParams): Promise<IUserPageProps> => {
  try {
    const response = await api.get(`/user`, {
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
    throw new Error(`Error fetching users: ${errorMessage}`);
  }
};

export const useFindManyUsers = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersUser | null;
}): UseQueryResult<IUserPageProps> => {
  return useQuery<IUserPageProps>({
    queryKey: [EnumQueries.USER, page, limit, filters],
    queryFn: () => getWarnings({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
