import { IWarningPageProps } from '@src/pages/Warnings/Warnings.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface GetWarningsParams {
  page: number;
  limit: number;
}

const getWarnings = async ({
  page,
  limit,
}: GetWarningsParams): Promise<IWarningPageProps> => {
  try {
    const response = await api.get(`/warnings`, {
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

export const useFindManyWarnings = ({
  page = 1,
  limit = paginationTake,
}): UseQueryResult<IWarningPageProps> => {
  return useQuery<IWarningPageProps>({
    queryKey: [EnumQueries.WARNING, page, limit],
    queryFn: () => getWarnings({ page, limit }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
