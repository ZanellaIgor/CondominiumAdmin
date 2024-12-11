import { ISurveyPageProps } from '@src/pages/Survey/Survey.Interface';
import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

interface IGetSurveyParams {
  id?: number | null;
}

const getSurveyId = async ({
  id,
}: IGetSurveyParams): Promise<ISurveyPageProps> => {
  try {
    const response = await api.get(`/survey/${id}`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching surveys');
  }
};

export const useFindOneSurvey = (
  id: number | null
): UseQueryResult<ISurveyPageProps> => {
  return useQuery<ISurveyPageProps>({
    queryKey: [EnumQueries.SURVEY],
    queryFn: () => getSurveyId({ id }),
    enabled: !!id,
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
