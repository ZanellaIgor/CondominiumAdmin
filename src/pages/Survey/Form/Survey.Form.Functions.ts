import { ISurveyByIdProps } from '@src/hooks/queries/useSurveyId';
import { EnumQuestionType } from '@src/utils/enum/typeQuestion.enum';
import { ISurveyFormModalProps } from './Survey.Form.Modal.Schema';
import { ISurveyForm } from './Survey.Form.Schema';

export const mapperSurvey = (
  data: ISurveyByIdProps | undefined
): ISurveyForm => {
  const formattedValues = {
    title: data?.title ?? '',
    description: data?.description ?? '',
    validFrom: data?.validFrom ? new Date(data.validFrom) : null,
    validTo: data?.validTo ? new Date(data.validTo) : null,
    status: data?.status ?? true,
    questions:
      data?.questions?.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        options:
          question.options?.map((option) => ({
            id: option.id,
            text: option.text,
            surveyId: option.surveyId,
          })) ?? [],
      })) ?? [],
  };
  return formattedValues as ISurveyForm;
};

export const mapperSurveyFormQuestions = (
  values: ISurveyFormModalProps | null
): Partial<ISurveyFormModalProps> => {
  const formattedValues = {
    id: values?.id ? Number(values.id) : undefined,
    text: values?.text ?? '',
    type: values?.type ?? EnumQuestionType.TEXT,
    options: (values?.options?.length ?? 0) > 0 ? values?.options : [],
  };
  return formattedValues;
};
