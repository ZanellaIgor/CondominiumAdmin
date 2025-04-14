import { IWarningPageProps } from '@src/pages/Warnings/Warnings.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumCategory } from '@src/utils/enum/category.enum';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumSituation } from '@src/utils/enum/situation.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersWarning {
  category?: EnumCategory;
  situation?: EnumSituation;
  condominiumId?: number;
  name?: string;
}

interface IGetWarningsParams {
  page: number;
  limit: number;
  filters?: IFiltersWarning | null;
}

const getWarnings = async ({
  page,
  limit,
  filters,
}: IGetWarningsParams): Promise<IWarningPageProps> => {
  try {
    const response = await api.get(`/warnings`, {
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
    throw new Error(`Error fetching warnings: ${errorMessage}`);
  }
};

export const useFindManyWarnings = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersWarning | null;
}): UseQueryResult<IWarningPageProps> => {
  return useQuery<IWarningPageProps>({
    queryKey: [EnumQueries.WARNING, page, limit, filters],
    queryFn: () => getWarnings({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
