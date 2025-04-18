import { api } from '@src/services/api.service';
import { EnumQueries } from '@src/utils/enum/queries.enum';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export interface ISurveyByIdProps {
  title: string;
  description?: string;
  status: boolean;
  validFrom: string;
  validTo?: string;
  condominiumId: number;
  questions: {
    id: number;
    text: string;
    type: EnumQuestionType;
    surveyId: number;
    options: {
      id?: number;
      text: string;
      surveyId?: number;
    }[];
  }[];
}

interface IGetSurveyParams {
  id?: number | null;
}

const getSurveyId = async ({
  id,
}: IGetSurveyParams): Promise<ISurveyByIdProps> => {
  try {
    const response = await api.get(`/survey/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error fetching surveysId: ${errorMessage}`);
  }
};

export const useFindOneSurvey = (
  id: number | null
): UseQueryResult<ISurveyByIdProps> => {
  return useQuery({
    queryKey: [EnumQueries.SURVEY, id],
    queryFn: () => getSurveyId({ id }),
    enabled: !!id,
    staleTime: 10000 * 60,
    placeholderData: keepPreviousData,
  });
};
