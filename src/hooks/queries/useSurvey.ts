import { ISurveyPageProps } from '@src/pages/Survey/Survey.Interface';
import { api } from '@src/services/api.service';
import { paginationTake } from '@src/utils/const/paginationTake';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface IFiltersSurvey {
  title?: string | null;
  description?: string | null;
}

interface IGetSurveyParams {
  page: number;
  limit: number;
  filters?: IFiltersSurvey | null;
}

const getSurvey = async ({
  page,
  limit,
  filters,
}: IGetSurveyParams): Promise<ISurveyPageProps> => {
  try {
    const response = await api.get(`/survey`, {
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
    throw new Error(`Error fetching surveys: ${errorMessage}`);
  }
};

export const useFindManySurvey = ({
  page = 1,
  limit = paginationTake,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: IFiltersSurvey | null;
}): UseQueryResult<ISurveyPageProps> => {
  return useQuery({
    queryKey: [EnumQueries.SURVEY, `page: ${page} - ${limit}`, filters],
    queryFn: () => getSurvey({ page, limit, filters }),
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
