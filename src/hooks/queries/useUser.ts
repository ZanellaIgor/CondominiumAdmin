import { IUserPageProps } from '@src/pages/User/User.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface GetUsersParams {
  page: number;
  limit: number;
}

const getWarnings = async ({
  page,
  limit,
}: GetUsersParams): Promise<IUserPageProps> => {
  try {
    const response = await api.get(`/user`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching warnings');
  }
};

export const useFindManyUsers = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<IUserPageProps> => {
  return useQuery<IUserPageProps>({
    queryKey: [EnumQueries.USER, page, limit],
    queryFn: () => getWarnings({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
