import { ISurveyPageProps } from '@src/pages/Survey/Survey.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IFilters {
  title?: string | null;
  description?: string | null;
}

interface IGetSurveyParams {
  page: number;
  limit: number;
  filter?: IFilters | null;
}

const getSurvey = async ({
  page,
  limit,
  filter,
}: IGetSurveyParams): Promise<ISurveyPageProps> => {
  try {
    const response = await api.get(`/survey`, {
      params: {
        page,
        limit,
        ...filter,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching surveys');
  }
};

export const useFindManySurvey = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFilters | null;
}): UseQueryResult<ISurveyPageProps> => {
  return useQuery({
    queryKey: [EnumQueries.SURVEY, `page: ${page} - ${limit}`, filters],
    queryFn: () => getSurvey({ page, limit, filter: filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
